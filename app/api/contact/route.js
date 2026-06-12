import { NextResponse } from "next/server";
import {
  sanitizeContact,
  validateContact,
  postToFormsWebhook,
} from "@/lib/formSubmit";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  /* Honeypot — leave field hidden in UI; bots often fill it */
  if (body.website || body.url) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const data = sanitizeContact(body);
  const err = validateContact(data);
  if (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }

  const result = await postToFormsWebhook({
    form: "contact",
    ...data,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error || "Submission failed." },
      { status: result.error?.includes("not configured") ? 503 : 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
