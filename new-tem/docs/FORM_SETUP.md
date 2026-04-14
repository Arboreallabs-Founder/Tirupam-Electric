# Contact & pre-order → Google Sheet + email

The site sends submissions to **your** Google Sheet (live Excel in the browser) and emails **your team** plus a **confirmation to the user**.  
This uses **Google Apps Script** (free) as a small backend. Your Next.js API routes call it from the server so browser CORS is not an issue.

## What you need

1. A Google account for Tirupam / Tem Motorrs.
2. A new Google Sheet with two tabs named exactly **`Contact`** and **`PreOrder`** (or let the script create them — see below).
3. Apps Script project linked to that sheet (or standalone with Sheet ID).

## 1. Create the spreadsheet

- [Google Sheets](https://sheets.google.com) → Blank spreadsheet.
- Name it e.g. `Tem Motorrs — Website leads`.
- Copy the **Spreadsheet ID** from the URL:  
  `https://docs.google.com/spreadsheets/d/`**`THIS_PART_IS_THE_ID`**`/edit`

## 2. Apps Script code

1. Open the sheet → **Extensions** → **Apps Script**.
2. Replace `Code.gs` with the contents of **`docs/google-apps-script/Code.gs`** in this repo (same folder as this file).
3. In that script, set:
   - `SHEET_ID` — your spreadsheet ID.
   - `SECRET` — same value you will put in `.env.local` as `FORMS_WEBHOOK_SECRET` (long random string).
   - `TEAM_EMAIL` — e.g. `finance@temmotorrs.com` (receives every lead).

4. **Save** the project.

## 3. Deploy as Web App

1. In Apps Script: **Deploy** → **New deployment**.
2. Type: **Web app**.
3. **Execute as:** Me.
4. **Who has access:** **Anyone** (required so your website server can POST without Google login).

5. **Deploy**, authorize the script when prompted, then copy the **Web app URL** (ends with `/exec`).

Put that URL in `.env.local`:

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
FORMS_WEBHOOK_SECRET=the-exact-same-secret-as-in-Code.gs
```

Restart `npm run dev` after changing env vars.

## 4. Test

- Submit the **Contact** and **Pre-order** forms on your site.
- Check the **Contact** and **PreOrder** sheets for new rows.
- Check **inbox** (team + user).

## GoDaddy hosting note

- **If GoDaddy runs Node.js** and you deploy the full Next.js app (`next build` + `next start`), the `/api/contact` and `/api/pre-order` routes work as implemented.
- **If GoDaddy only serves static files** (no Node), API routes will not run. Options:
  - Host the app on **Vercel** / **Netlify** / **Cloudflare Pages** (free tiers) and point **temmotorrs.com** DNS to it, **or**
  - Use a form SaaS (Formspree, Getform, etc.) and connect to Google Sheets via Zapier/Make.

## Limits & security

- Google **MailApp** has daily sending quotas; for very high volume use a transactional provider later.
- `FORMS_WEBHOOK_SECRET` is not perfect security but stops trivial abuse; for stronger protection add reCAPTCHA or similar later.
- The hidden **honeypot** field (`website`) blocks some bots.
