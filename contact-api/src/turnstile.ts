import { config } from "./config.js";

type TurnstileVerifyResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

const normalizeHostname = (value: string): string =>
  value
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\.+$/g, "")
    .toLowerCase();

const expectedHostnames = config.TURNSTILE_EXPECTED_HOSTNAME
  .split(",")
  .map(normalizeHostname)
  .filter((value, index, all) => value.length > 0 && all.indexOf(value) === index);

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<{ ok: boolean; reason?: string }> {
  const body = new URLSearchParams({
    secret: config.TURNSTILE_SECRET_KEY,
    response: token,
  });

  if (remoteIp) {
    body.append("remoteip", remoteIp);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });

  if (!response.ok) {
    return { ok: false, reason: `turnstile_http_${response.status}` };
  }

  const result = (await response.json()) as TurnstileVerifyResponse;

  if (!result.success) {
    const codes = result["error-codes"]?.join(",") ?? "verification_failed";
    return { ok: false, reason: codes };
  }

  if (!result.hostname || !expectedHostnames.includes(normalizeHostname(result.hostname))) {
    return { ok: false, reason: "hostname_mismatch" };
  }

  if (result.action !== config.TURNSTILE_EXPECTED_ACTION) {
    return { ok: false, reason: "action_mismatch" };
  }

  return { ok: true };
}
