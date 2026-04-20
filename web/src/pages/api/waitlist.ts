import type { APIRoute } from "astro";
import { EmailClient } from "@cdv2/email";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimit = new Map<string, number>();

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function prune(now: number) {
  for (const [ip, ts] of rateLimit) {
    if (now - ts > RATE_LIMIT_WINDOW_MS) rateLimit.delete(ip);
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      case "'": return "&#39;";
      default: return c;
    }
  });
}

function confirmationEmail(email: string): { subject: string; html: string; text: string } {
  const safeEmail = escapeHtml(email);
  const subject = "You're on the list.";
  const html = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>${subject}</title></head>
  <body style="margin:0;padding:0;background:#f6f2ea;font-family:Georgia,'Iowan Old Style',serif;color:#1f1b17;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f2ea;padding:48px 16px;">
      <tr><td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" style="max-width:520px;width:100%;background:#f4efe6;">
          <tr><td style="padding:56px 48px;">
            <div style="font-family:Georgia,serif;font-weight:400;font-size:14px;letter-spacing:0.28em;text-transform:uppercase;color:#7a5a26;margin-bottom:24px;">Hearth&nbsp;Press</div>
            <div style="width:44px;height:1.5px;background:#7a5a26;margin-bottom:40px;"></div>
            <p style="font-family:Georgia,serif;font-style:italic;font-size:24px;line-height:1.45;color:#1f1b17;margin:0 0 24px;">You're on the list.</p>
            <p style="font-family:Georgia,serif;font-size:15px;line-height:1.7;color:#6c6457;margin:0 0 24px;">
              Thank you for reserving your place. The first volume of Hearth is being typeset, bound,
              and readied for a small iOS launch. We'll write when it ships — no sooner, no noise.
            </p>
            <p style="font-family:Georgia,serif;font-style:italic;font-size:15px;line-height:1.7;color:#6c6457;margin:0 0 48px;">
              If you didn't sign up, you can safely ignore this note — we won't write again unless it matters.
            </p>
            <div style="font-family:Georgia,serif;font-size:13px;color:#7c7465;border-top:1px solid rgba(31,27,23,0.08);padding-top:24px;">
              Hearth Press &nbsp;·&nbsp; Est. MMXXVI<br />
              <span style="font-style:italic;">— ${safeEmail} —</span>
            </div>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  const text = [
    "HEARTH PRESS",
    "",
    "You're on the list.",
    "",
    "Thank you for reserving your place. The first volume of Hearth is being",
    "typeset, bound, and readied for a small iOS launch. We'll write when it",
    "ships — no sooner, no noise.",
    "",
    "If you didn't sign up, you can safely ignore this note — we won't write",
    "again unless it matters.",
    "",
    "—",
    "Hearth Press · Est. MMXXVI",
    email,
  ].join("\n");

  return { subject, html, text };
}

function notificationEmail(details: {
  email: string;
  timestamp: string;
  userAgent: string | null;
  referer: string | null;
  ip: string;
}): { subject: string; text: string } {
  const subject = `New waitlist reservation — ${details.email}`;
  const text = [
    `New waitlist reservation.`,
    ``,
    `Email:      ${details.email}`,
    `Timestamp:  ${details.timestamp}`,
    `IP:         ${details.ip}`,
    `User-Agent: ${details.userAgent ?? "(unknown)"}`,
    `Referer:    ${details.referer ?? "(none)"}`,
  ].join("\n");
  return { subject, text };
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.CDV2_EMAIL_API_KEY;
  const baseUrl = import.meta.env.CDV2_EMAIL_BASE_URL;
  const fromAddress = import.meta.env.CDV2_FROM_ADDRESS;
  const notifyAddress = import.meta.env.CDV2_NOTIFY_ADDRESS;

  if (!apiKey || !baseUrl || !fromAddress || !notifyAddress) {
    return json(500, { error: { message: "The press isn't open yet — email isn't configured." } });
  }

  let email: string;
  try {
    const body = (await request.json()) as { email?: unknown };
    if (typeof body.email !== "string") {
      return json(400, { error: { message: "That email doesn't look right — please check it." } });
    }
    email = body.email.trim().toLowerCase();
  } catch {
    return json(400, { error: { message: "We couldn't read that submission." } });
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return json(400, { error: { message: "That email doesn't look right — please check it." } });
  }

  const now = Date.now();
  prune(now);
  const ip = clientIp(request);
  const lastHit = rateLimit.get(ip);
  if (lastHit && now - lastHit < RATE_LIMIT_WINDOW_MS) {
    return json(429, { error: { message: "One at a time — please wait a moment and try again." } });
  }
  rateLimit.set(ip, now);

  const client = new EmailClient({ apiKey, baseUrl });

  const confirm = confirmationEmail(email);
  const notify = notificationEmail({
    email,
    timestamp: new Date(now).toISOString(),
    userAgent: request.headers.get("user-agent"),
    referer: request.headers.get("referer"),
    ip,
  });

  const [confirmResult, notifyResult] = await Promise.all([
    client.send({
      from: fromAddress,
      to: email,
      subject: confirm.subject,
      html: confirm.html,
      text: confirm.text,
      replyTo: notifyAddress,
    }),
    client.send({
      from: fromAddress,
      to: notifyAddress,
      subject: notify.subject,
      text: notify.text,
      replyTo: email,
    }),
  ]);

  if (confirmResult.error || notifyResult.error) {
    console.error("[waitlist] send failure", {
      confirm: confirmResult.error?.message ?? null,
      notify: notifyResult.error?.message ?? null,
      email,
    });
    return json(502, { error: { message: "Something didn't take. Try again?" } });
  }

  return json(200, { ok: true });
};

export const GET: APIRoute = () =>
  json(405, { error: { message: "Method not allowed." } });
