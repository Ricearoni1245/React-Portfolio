import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const boolFromEnv = z
  .enum(["true", "false"])
  .transform((value) => value === "true");

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(8787),
  // Comma-separated list of allowed browser origins, e.g.
  // https://jodyholt.com,https://www.jodyholt.com
  CONTACT_ALLOWED_ORIGIN: z.string().min(1),
  TURNSTILE_SECRET_KEY: z.string().min(1),
  TURNSTILE_EXPECTED_HOSTNAME: z.string().min(1),
  TURNSTILE_EXPECTED_ACTION: z.string().min(1).default("contact_form"),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_SECURE: boolFromEnv.default("false"),
  SMTP_REQUIRE_TLS: boolFromEnv.default("true"),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  MAIL_FROM_NAME: z.string().min(1).default("Portfolio Contact"),
  MAIL_FROM_ADDRESS: z.string().email(),
  MAIL_TO_ADDRESS: z.string().email(),
  MAIL_SUBJECT_PREFIX: z.string().min(1).default("[Portfolio Contact]"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(600000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
  HONEYPOT_FIELD: z.string().min(1).default("website"),
  MIN_SUBMIT_TIME_MS: z.coerce.number().int().nonnegative().default(3000),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid contact-api environment configuration:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = parsed.data;
