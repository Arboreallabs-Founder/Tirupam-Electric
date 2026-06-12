/**
 * Server-side form forwarding to Google Apps Script (or compatible webhook).
 * Keeps secrets off the client.
 */

const MAX_LEN = {
  name: 120,
  email: 254,
  subject: 200,
  message: 8000,
  phone: 40,
  city: 120,
};

function trim(str) {
  return typeof str === "string" ? str.trim() : "";
}

export function isValidEmail(email) {
  const e = trim(email);
  if (!e || e.length > MAX_LEN.email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export function sanitizeContact(body) {
  return {
    name: trim(body.name).slice(0, MAX_LEN.name),
    email: trim(body.email).slice(0, MAX_LEN.email),
    subject: trim(body.subject).slice(0, MAX_LEN.subject),
    message: trim(body.message).slice(0, MAX_LEN.message),
  };
}

export function sanitizePreOrder(body) {
  return {
    name: trim(body.name).slice(0, MAX_LEN.name),
    email: trim(body.email).slice(0, MAX_LEN.email),
    phone: trim(body.phone).slice(0, MAX_LEN.phone),
    city: trim(body.city).slice(0, MAX_LEN.city),
  };
}

export function validateContact(s) {
  if (!s.name || !s.email || !s.subject || !s.message) {
    return "All fields are required.";
  }
  if (!isValidEmail(s.email)) return "Invalid email address.";
  return null;
}

export function validatePreOrder(s) {
  if (!s.name || !s.email || !s.phone || !s.city) {
    return "All fields are required.";
  }
  if (!isValidEmail(s.email)) return "Invalid email address.";
  return null;
}

/**
 * POST JSON to Google Apps Script web app URL.
 * @returns {{ ok: boolean, error?: string }}
 */
export async function postToFormsWebhook(payload) {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.FORMS_WEBHOOK_SECRET;

  if (!url || !secret) {
    return { ok: false, error: "Forms are not configured on the server." };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, secret }),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return { ok: false, error: "Unexpected response from form handler." };
    }

    if (!res.ok || data.ok === false) {
      return {
        ok: false,
        error: typeof data.error === "string" ? data.error : "Submission failed.",
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
