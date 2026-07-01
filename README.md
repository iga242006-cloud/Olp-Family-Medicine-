# Olp Family Medicine — Pavlina Demo Site

A multi-page static demo website for **Olp Family Medicine**, a Direct Primary Care practice in Carmel, Indiana. Built to showcase all three Pavlina services:

1. **Website Optimization** — conversion-first layout, one primary CTA per page, sticky nav with persistent CTA, click-to-call on mobile, semantic HTML, per-page meta titles/descriptions, LocalBusiness/Physician JSON-LD, fully responsive, no frameworks or build tools.
2. **Google Reviews** — homepage review section styled as Google review cards (labeled as sample content), aggregate 5.0 rating badge in the hero, "Leave us a review" CTA block.
3. **ARIA (AI receptionist)** — floating chat widget on every page with scripted keyword-matched responses, quick-reply chips, and a lead-capture fallback flow. Vanilla JS, no API.

## Structure

```
olp-demo/
├── index.html      # Home — hero, value props, pricing, add-ons, reviews, join CTA
├── about.html      # Dr. Olp's story + team bios (Molly, Candi)
├── benefits.html   # Member benefits, DPC explained, add-ons, FAQ
├── contact.html    # Address, phone, hours, demo form, map placeholder
├── css/styles.css
└── js/
    ├── main.js     # Nav, scroll reveal, demo form
    └── aria.js     # ARIA chat widget (self-injecting)
```

## Deploy

Plain static files — no build step. Drag the `olp-demo` folder onto [Netlify Drop](https://app.netlify.com/drop) (or any static host) and it's live.

## Notes

- Demo pricing and review content are illustrative and labeled as such on the site.
- The contact form and review button are intentionally non-functional (demo).
- Photos are CSS gradient placeholders — swap in real imagery for production.
