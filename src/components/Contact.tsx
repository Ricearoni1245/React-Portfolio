import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type ToastTone = "info" | "success" | "error";

type ToastState = {
  id: number;
  tone: ToastTone;
  message: string;
};

type ContactApiResponse = {
  ok: boolean;
  message?: string;
  error?: string;
};

const TURNSTILE_ACTION = "contact_form";
const HONEYPOT_FIELD = "website";
const API_URL = import.meta.env.VITE_CONTACT_API_URL || "/api/contact";
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

const initialForm: FormState = {
  name: "",
  email: "",
  message: "",
  website: "",
};

const validateForm = (form: FormState): string | null => {
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (name.length < 2 || name.length > 80) {
    return "Please enter a name between 2 and 80 characters.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address.";
  }

  if (message.length < 20 || message.length > 2000) {
    return "Your message should be between 20 and 2000 characters.";
  }

  return null;
};

const toastToneClasses: Record<ToastTone, string> = {
  info: "border-primary/60",
  success: "border-primary/70",
  error: "border-contrast/80",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [token, setToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);

  const startedAtRef = useRef<number>(Date.now());
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | number | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = (tone: ToastTone, message: string): void => {
    setToast({ id: Date.now(), tone, message });
  };

  const resetTurnstile = (): void => {
    setToken("");

    if (window.turnstile && turnstileWidgetIdRef.current !== null) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }
  };

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileContainerRef.current) {
      return;
    }

    let cancelled = false;

    const renderTurnstile = (): void => {
      if (cancelled || !turnstileContainerRef.current || turnstileWidgetIdRef.current !== null) {
        return;
      }

      if (!window.turnstile) {
        window.setTimeout(renderTurnstile, 120);
        return;
      }

      const widgetId = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        action: TURNSTILE_ACTION,
        callback: (value: string) => {
          setToken(value);
        },
        "expired-callback": () => {
          setToken("");
        },
        "error-callback": () => {
          setToken("");
        },
      });

      turnstileWidgetIdRef.current = widgetId;
      setTurnstileReady(true);
    };

    renderTurnstile();

    return () => {
      cancelled = true;

      if (window.turnstile && turnstileWidgetIdRef.current !== null) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }

    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 5000);

    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, [toast]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.currentTarget;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    if (!TURNSTILE_SITE_KEY) {
      showToast("error", "Turnstile is not configured yet.");
      return;
    }

    const validationError = validateForm(form);
    if (validationError) {
      showToast("error", validationError);
      return;
    }

    if (!token) {
      showToast("error", "Please complete human verification before submitting.");
      return;
    }

    setSubmitting(true);
    showToast("info", "Sending your message...");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      [HONEYPOT_FIELD]: form.website,
      startedAt: startedAtRef.current,
      turnstileToken: token,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let responseBody: ContactApiResponse | null = null;
      try {
        responseBody = (await response.json()) as ContactApiResponse;
      } catch {
        responseBody = null;
      }

      if (!response.ok || !responseBody?.ok) {
        throw new Error(responseBody?.error || "Unable to send message right now.");
      }

      setForm(initialForm);
      startedAtRef.current = Date.now();
      resetTurnstile();
      showToast("success", responseBody.message || "Message sent.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send message right now.";
      showToast("error", message);
      resetTurnstile();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:py-24 anim-fade-in">
      <div className="mb-8 text-center">
        <h2 className="font-title text-3xl md:text-4xl font-extrabold tracking-wide text-text">
          Contact
        </h2>
        <p className="mt-2 text-text/75 font-main text-sm md:text-base">
          Send me a message and I&apos;ll reply from my personal inbox.
        </p>
      </div>

      <div className="mx-auto max-w-3xl rounded-2xl border border-secondary bg-secondary/20 p-5 md:p-8 backdrop-blur">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-text/90">Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                maxLength={80}
                required
                className="w-full rounded-lg border border-secondary bg-bg/70 px-4 py-3 text-text placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 anim-base"
                placeholder="Your name"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-text/90">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                maxLength={320}
                required
                className="w-full rounded-lg border border-secondary bg-bg/70 px-4 py-3 text-text placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 anim-base"
                placeholder="you@domain.com"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-text/90">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              minLength={20}
              maxLength={2000}
              required
              className="min-h-[160px] w-full rounded-lg border border-secondary bg-bg/70 px-4 py-3 text-text placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 anim-base"
              placeholder="How can I help?"
            />
          </label>

          <label className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
            Website
            <input
              type="text"
              name={HONEYPOT_FIELD}
              value={form.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>

          <div className="space-y-2">
            <div ref={turnstileContainerRef} className="min-h-[66px]" />
            
            {TURNSTILE_SITE_KEY && !turnstileReady && (
              <p className="text-xs text-text/65">Loading human verification...</p>
            )}
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-text/65">Protected by Turnstile, rate limits, and server-side validation.</p>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg border border-primary bg-primary/15 px-5 py-2.5 text-sm font-semibold text-text hover:bg-primary/25 disabled:cursor-not-allowed disabled:opacity-60 anim-base"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>

      {toast && (
        <div className="fixed bottom-5 right-5 z-[80] max-w-sm">
          <div
            className={`rounded-xl border bg-secondary/95 px-4 py-3 text-sm text-text shadow-xl backdrop-blur ${toastToneClasses[toast.tone]} anim-pop-in`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-main leading-snug">{toast.message}</p>
              <button
                type="button"
                onClick={() => setToast(null)}
                className="rounded px-2 text-text/70 hover:text-primary anim-base"
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
