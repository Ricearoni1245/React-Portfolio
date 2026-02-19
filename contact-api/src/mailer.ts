import nodemailer from "nodemailer";
import { config } from "./config.js";
import type { ContactRequest } from "./validation.js";

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_SECURE,
  requireTLS: config.SMTP_REQUIRE_TLS,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const newlineToBreaks = (value: string): string =>
  escapeHtml(value).replace(/\n/g, "<br>");

export async function verifyMailerConnection(): Promise<void> {
  await transporter.verify();
}

export async function sendContactEmail(payload: ContactRequest, sourceIp: string): Promise<void> {
  const receivedAt = new Date().toISOString();
  const subject = `${config.MAIL_SUBJECT_PREFIX} ${payload.name}`;

  const textBody = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Source IP: ${sourceIp || "unknown"}`,
    `Received At: ${receivedAt}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const htmlBody = `
    <h2>Portfolio Contact Submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Source IP:</strong> ${escapeHtml(sourceIp || "unknown")}</p>
    <p><strong>Received At:</strong> ${escapeHtml(receivedAt)}</p>
    <p><strong>Message:</strong><br>${newlineToBreaks(payload.message)}</p>
  `;

  await transporter.sendMail({
    from: `"${config.MAIL_FROM_NAME}" <${config.MAIL_FROM_ADDRESS}>`,
    to: config.MAIL_TO_ADDRESS,
    replyTo: payload.email,
    subject,
    text: textBody,
    html: htmlBody,
  });
}
