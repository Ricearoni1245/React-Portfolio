import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { config } from "./config.js";
import { sendContactEmail, verifyMailerConnection } from "./mailer.js";
import { verifyTurnstileToken } from "./turnstile.js";
import { contactRequestSchema } from "./validation.js";

type ApiErrorResponse = {
  ok: false;
  error: string;
};

const app = express();
app.set("trust proxy", 1);

const normalizeOrigin = (value: string): string => {
  const cleaned = value
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\/+$/g, "");

  // Some clients can emit explicit default ports. URL.origin normalizes them.
  try {
    return new URL(cleaned).origin.toLowerCase();
  } catch {
    return cleaned.toLowerCase();
  }
};

const allowedOrigins = config.CONTACT_ALLOWED_ORIGIN
  .split(",")
  .map(normalizeOrigin)
  .filter((value, index, all) => value.length > 0 && all.indexOf(value) === index);

app.use(
  pinoHttp({
    level: config.NODE_ENV === "production" ? "info" : "debug",
    redact: {
      paths: ["req.headers.authorization"],
      remove: true,
    },
  }),
);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      const normalizedOrigin = normalizeOrigin(origin);
      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json({ limit: "16kb" }));

app.use((err: Error, _req: Request, res: Response<ApiErrorResponse>, next: NextFunction) => {
  if (err.message === "Origin not allowed") {
    res.status(403).json({ ok: false, error: "Origin not allowed." });
    return;
  }

  next(err);
});

const contactLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: "Too many requests. Please try again later.",
  },
});

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.post("/contact", contactLimiter, async (req: Request, res: Response) => {
  const body = (req.body ?? {}) as Record<string, unknown>;

  const honeypotRaw = body[config.HONEYPOT_FIELD];
  if (typeof honeypotRaw === "string" && honeypotRaw.trim().length > 0) {
    req.log.warn({ event: "contact_honeypot_triggered" }, "Contact form blocked by honeypot field");
    res.status(400).json({ ok: false, error: "Invalid submission." });
    return;
  }

  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < config.MIN_SUBMIT_TIME_MS) {
    req.log.warn({ event: "contact_submit_too_fast" }, "Contact form rejected by min submit time");
    res.status(400).json({ ok: false, error: "Please wait a moment and try again." });
    return;
  }

  const parsed = contactRequestSchema.safeParse(body);
  if (!parsed.success) {
    req.log.warn({ event: "contact_validation_failed", issues: parsed.error.issues }, "Invalid contact payload");
    res.status(400).json({ ok: false, error: "Please review your form entries and try again." });
    return;
  }

  try {
    const turnstileResult = await verifyTurnstileToken(parsed.data.turnstileToken, req.ip);
    if (!turnstileResult.ok) {
      req.log.warn(
        { event: "turnstile_failed", reason: turnstileResult.reason },
        "Turnstile verification failed",
      );
      res.status(403).json({ ok: false, error: "Human verification failed. Please try again." });
      return;
    }
  } catch (error) {
    req.log.error({ err: error }, "Turnstile verification request failed");
    res.status(502).json({ ok: false, error: "Unable to verify your request right now." });
    return;
  }

  try {
    await sendContactEmail(parsed.data, req.ip ?? "");
    req.log.info({ event: "contact_sent" }, "Contact email sent");
    res.status(200).json({ ok: true, message: "Message sent." });
  } catch (error) {
    req.log.error({ err: error }, "Failed to send contact email");
    res.status(502).json({ ok: false, error: "Unable to send message. Please try again soon." });
  }
});

app.use((err: Error, req: Request, res: Response<ApiErrorResponse>, _next: NextFunction) => {
  void _next;
  req.log.error({ err }, "Unhandled contact-api error");
  res.status(500).json({ ok: false, error: "Internal server error." });
});

const startServer = async (): Promise<void> => {
  await verifyMailerConnection();

  app.listen(config.PORT, () => {
    console.log(`contact-api listening on port ${config.PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start contact-api", error);
  process.exit(1);
});
