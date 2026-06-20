# Local SEO Analysis — temmotorrs.com

_Generated 2026-06-20 · Analysis of local codebase (app/ + components/), not a live crawl._

## Local SEO Score: 28 / 100

| Dimension | Weight | Score | Notes |
|-----------|--------|-------|-------|
| GBP Signals | 25% | 4 / 25 | No GBP embed, no map, no place reference, likely unclaimed |
| Reviews & Reputation | 20% | 1 / 20 | Pre-launch — no reviews, no `aggregateRating` |
| Local On-Page SEO | 20% | 8 / 20 | NAP **not visible** on page; no `tel:` link; no map; good titles |
| NAP Consistency & Citations | 15% | 6 / 15 | NAP only in schema/meta; social + domain inconsistencies; no citations |
| Local Schema Markup | 10% | 7 / 10 | Strong Organization schema, but generic type, no `geo`, no hours |
| Local Link & Authority | 10% | 2 / 10 | No chamber/BBB/press/community signals on page |

> **Important context:** TEM Motorrs is a **pre-launch national EV manufacturer/startup**, not a foot-traffic retail business. A low *local* score is expected and not alarming on its own. The genuine value of "local" signals here is **(a) NAP/entity consistency for the Google Knowledge Graph, (b) Bing/Apple presence that feeds ChatGPT/Copilot/Siri, and (c) GBP for the New Delhi HQ**. Treat the "map pack ranking" framing as low priority; treat the **entity-consistency and AI-citation** findings as the real wins.

---

## Business Type & Vertical

- **Business type:** Brick-and-mortar HQ (physical address present in schema) — but **no retail storefront / no service-area language**. Effectively a *manufacturer HQ*, not a classic local business.
- **Industry vertical:** **Automotive** (electric two-wheeler manufacturer). Note: this is a *manufacturer*, not an `AutoDealer`/dealership, so dealer-specific local checks (inventory, VIN, test-drive schema) do **not** apply.
- **Address on file (schema only):** A1/19B, First Floor, Paschim Vihar, New Delhi, Delhi 110063, IN
- **Phone on file (schema/meta only):** +91-7986604025
- **Public email:** finance@temmotorrs.com

---

## Key Findings (ranked)

### 🔴 Critical

1. **NAP is invisible to users and crawlers' rendered text.** The address and phone exist **only** inside JSON-LD (`app/layout.js`) and the contact-page meta description. Neither the [footer](components/Footer.js) nor the [contact page](app/contact/page.js) displays the street address or phone anywhere. Google strongly weights *visible, consistent* NAP. → Add a visible NAP block to the footer and contact page.

2. **No click-to-call.** The phone number never appears as a `tel:` link anywhere on the site. 76% of mobile "near me" searches and a large share of EV-buyer intent convert via tap-to-call. → Render `+91-7986604025` as `<a href="tel:+917986604025">`.

3. **Canonical domain is split between www and non-www.**
   - [app/layout.js](app/layout.js) `metadataBase` / canonical / all schema URLs → `https://temmotorrs.com` (**non-www**)
   - [app/robots.js](app/robots.js) declares sitemap at `https://temmotorrs.com/sitemap.xml` (**non-www**)
   - [app/sitemap.js](app/sitemap.js) emits every URL as `https://www.temmotorrs.com` (**www**)
   - Visible links (contact page, footer) point to `https://www.temmotorrs.com`

   The recent commit "update sitemap base URL to www … to match canonical domain" actually **introduced** the mismatch — the canonical is still non-www. Pick **one** host, use it everywhere, and 301 the other. Mixed signals here dilute entity consolidation and confuse citation matching.

### 🟠 High

4. **`sameAs` social profiles in schema don't match the real profiles.** `app/layout.js` org schema lists:
   - `instagram.com/temmotorrs` → actual is `instagram.com/tem_motorrs` (**underscore**)
   - `youtube.com/@temmotorrs` → **no YouTube link exists** on the site
   - `linkedin.com/company/temmotorrs` → actual is a **personal** profile `linkedin.com/in/tem-motorrs-3626543b8`
   - **Missing** from `sameAs`: the real Facebook page and X/Twitter (`x.com/Tem_motorrs`) that *are* linked in the footer/contact page.

   `sameAs` is a primary entity-disambiguation signal for Google's Knowledge Graph and for AI engines. Broken/mismatched URLs actively weaken entity recognition. → Make `sameAs` exactly mirror the live, correct profile URLs.

5. **No Google Business Profile signals.** No Maps embed, place ID, or reviews widget detectable. For a New Delhi HQ this is a quick win for branded "TEM Motorrs" map presence and verification trust. → Claim GBP for the HQ (suggested primary category: **Motor vehicle manufacturer** or **Electric motor vehicle dealer**; secondary: *Electric vehicle charging station*, *Motorcycle dealer*).

6. **Brand-name capitalization inconsistency.** Schema/metadata use **"TEM Motorrs"**; the [footer](components/Footer.js) brand and copyright use **"Tem Motorrs"**; the contact page investor box uses **"Tem Motorrs"** too. Standardize on one canonical brand string everywhere (entity + citation matching is case/format sensitive).

### 🟡 Medium

7. **Schema is `Organization`, not a local subtype, and is missing local properties.** No `geo` coordinates (Google recommends ≥5 decimal places), no `openingHoursSpecification`. The full `PostalAddress` and `contactPoint` are good. → Add `geo` and hours (see fix below).

8. **Bing Places & Apple Business Connect absent.** These feed **ChatGPT, Copilot, Alexa (Bing)** and **Siri/Apple Maps**. With 45% of users now using AI for recommendations, and ChatGPT sourcing from the Bing index (not GBP), these are disproportionately valuable for an AI-forward EV brand. → Claim both.

9. **No local authority signals on page** — no press mentions, "as featured in," chamber/industry-association badges, or accelerator/incubator affiliations. The investors/about pages mention notable founder pedigree (Simple Energy, ISRO, Emflux) — surface logos/press as trust + link-magnet signals.

### 🟢 Low / Informational

10. **Reviews:** none expected pre-launch. When pre-orders ship, plan a review-generation cadence (Sterling Sky's 18-day rule) on Google + Trustpilot. Add `aggregateRating` only when genuine reviews exist (never fabricate — FTC + Google policy).

---

## NAP Consistency Audit

| Source | Name | Address | Phone |
|--------|------|---------|-------|
| Org JSON-LD (`layout.js`) | TEM Motorrs | A1/19B, First Floor, Paschim Vihar, New Delhi 110063 | +91-7986604025 |
| Contact meta description | TEM Motorrs | "New Delhi, India" (no street) | +91-7986604025 |
| Footer (visible) | **Tem Motorrs** | ❌ none | ❌ none |
| Contact page (visible) | TEM Motorrs / **Tem Motorrs** | ❌ none | ❌ none |

**Discrepancies:** (a) name casing TEM vs Tem; (b) street address never shown to users; (c) phone never shown to users; (d) `sameAs` profile URLs don't match live links. **Action: make the visible footer the single source of truth and mirror it in schema.**

---

## Citation Presence

Cannot verify live directory listings from the codebase. Recommended baseline to claim/verify (in priority order for an AI-forward EV brand):
1. **Google Business Profile** (HQ)
2. **Bing Places** (powers ChatGPT/Copilot/Alexa)
3. **Apple Business Connect** (Siri/Maps)
4. Justdial / IndiaMART / Sulekha (India Tier-1 local directories)
5. Crunchbase / LinkedIn company page / Tracxn / YourStory (startup-relevant, double as authority links)

---

## Ready-to-use Schema Fix

Replace the `address`/add-on block in [app/layout.js](app/layout.js) `orgSchema` with a richer, consistent version. Keep type `Organization` (correct for a manufacturer) but add local properties and fix `sameAs`:

```js
// app/layout.js — orgSchema additions/fixes
address: {
  "@type": "PostalAddress",
  streetAddress: "A1/19B, First Floor, Paschim Vihar",
  addressLocality: "New Delhi",
  addressRegion: "Delhi",
  postalCode: "110063",
  addressCountry: "IN",
},
geo: {
  "@type": "GeoCoordinates",
  latitude: 28.66880,   // ← replace with exact HQ coordinates (≥5 decimals)
  longitude: 77.10250,  // ← replace with exact HQ coordinates
},
openingHoursSpecification: {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
  opens: "10:00",
  closes: "18:00",
},
sameAs: [
  "https://www.instagram.com/tem_motorrs",
  "https://x.com/Tem_motorrs",
  "https://www.facebook.com/profile.php?id=61579456566288",
  "https://www.linkedin.com/in/tem-motorrs-3626543b8",
  // add YouTube ONLY if a channel actually exists
],
```

> ⚠️ The `geo` coordinates above are **placeholders for Paschim Vihar** — replace with the precise pin from Google Maps before shipping. And resolve the www / non-www decision *first* so every `siteUrl` is consistent.

---

## Top 10 Prioritized Actions

| # | Priority | Action |
|---|----------|--------|
| 1 | 🔴 Critical | Resolve www vs non-www; use one host across `layout.js`, `robots.js`, `sitemap.js`, and all visible links |
| 2 | 🔴 Critical | Add a **visible NAP block** (name, full address, phone) to the footer and contact page |
| 3 | 🔴 Critical | Make the phone a `tel:` click-to-call link |
| 4 | 🟠 High | Fix `sameAs` to exactly match the live, correct social URLs; drop the dead YouTube link |
| 5 | 🟠 High | Standardize brand string to "TEM Motorrs" everywhere (footer + copyright) |
| 6 | 🟠 High | Claim & optimize the **Google Business Profile** for the HQ (correct primary category) |
| 7 | 🟡 Medium | Add `geo` (exact coords) + `openingHoursSpecification` to org schema |
| 8 | 🟡 Medium | Claim **Bing Places** + **Apple Business Connect** (AI/Siri/Copilot reach) |
| 9 | 🟡 Medium | List on Crunchbase, IndiaMART/Justdial, YourStory/Tracxn (citations + authority) |
| 10 | 🟢 Low | Add a press/"as featured in" + affiliations strip; plan post-launch review cadence |

---

## Limitations

This analysis read the local codebase only. It could **not** assess: live geo-grid map-pack rankings or proximity performance; Domain Authority or a full backlink profile; whether a GBP exists/its category/insights; live citation accuracy across directories; real review counts/velocity; or rendered-DOM output of the deployed site. Fill these gaps with: Google Business Profile dashboard, BrightLocal or Whitespark (citation + geo-grid), Ahrefs/Semrush (backlinks/DA), and DataForSEO (live local pack + business listings).

**Next step for AI search visibility** (high ROI for this brand): run `/seo geo https://www.temmotorrs.com` for citability scoring, llms.txt, and brand-mention auditing across AI engines.
