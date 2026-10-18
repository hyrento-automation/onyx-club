# Onyx Club · onyxclub.ch

Bilingual French/English website for Onyx Club in Cologny, built with Next.js App Router, TypeScript, GSAP/ScrollTrigger, Lenis, and Framer Motion.

## Run locally

```sh
npm install
npm run dev
```

Use `npm run build` to create the production build.

## Content and media

- Homepage and navigation copy: `content/fr.json` and `content/en.json`.
- Secondary pages: `content/pages.fr.json` and `content/pages.en.json`.
- Activity details: `content/activities.ts`.
- Club details, rates, event visibility, and form endpoint: `site.config.ts`.
- Site images: `public/images/`; videos: `public/video/`.

## Public enquiry and booking forms

Visitors can submit booking and contact forms without logging in. The frontend posts the form to `POST /api/contact`; the server validates the input and sends the enquiry to the owner through Resend. The endpoint includes a honeypot, a 32 KB request limit, a field allowlist, input length limits, email validation, and HTML escaping. It does not currently implement application-level rate limiting.

The Resend credentials are read only by server route handlers. Do not rename them with a `NEXT_PUBLIC_` prefix or put their values in frontend code, source control, or this README.

Configure these variables in Vercel Project Settings → Environment Variables:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Server-side Resend API access for outbound enquiry email and inbound forwarding. |
| `RESEND_FROM_EMAIL` | Verified sender, for example `Onyx Club <contact@onyxclub.ch>`. |
| `OWNER_EMAIL` | Destination for website enquiries and forwarded inbound mail. |
| `RESEND_WEBHOOK_SECRET` | Verifies signed inbound Resend webhook requests. |

The Vercel project currently has these variables configured for Production, Preview, and Development. `RESEND_API_KEY` and `RESEND_WEBHOOK_SECRET` are encrypted and server-only, but Vercel flags them as `readable-secret`: authorized project members can still reveal ordinary encrypted variables in the dashboard or CLI. For write-only storage, rotate and recreate these as Sensitive variables for Production and Preview; use a separate local Development value because Sensitive variables cannot target Development. Redeploy after changing environment variables.

### Contact form rate limiting

The contact endpoint currently has no shared rate limiter, and the Vercel project has no active Firewall configuration. Avoid an in-memory counter: Vercel Functions scale across instances, so a process-local limit is not reliable. Use a shared limiter such as a Vercel Firewall custom rule for `POST /api/contact` (keyed by client IP), or a shared Redis-backed limiter if per-route custom limits are needed.

For Vercel Firewall, start with a logging rule for the `POST /api/contact` route and review its matches before enforcing a limit. A reasonable initial enforcement setting is 10 requests per IP per minute with a `429` rate-limit response. Firewall rule changes are staged; review the diff and publish them in Vercel after confirming the rule only matches the contact endpoint. Check the project's Firewall availability and permissions before relying on this control.

### Inbound email forwarding

`POST /api/email/inbound` receives Resend webhooks. It verifies the signature with `RESEND_WEBHOOK_SECRET` and forwards supported messages sent to `contact@onyxclub.ch` to `OWNER_EMAIL`. Configure the matching Resend inbound webhook and its signing secret in Vercel.

## Deploy

The project uses Next.js server routes for forms and inbound email, so deploy the Next.js app to Vercel rather than exporting it as a static-only site. Set the server environment variables in the Vercel project before deploying.

## Event updates

Update `event.date`, `event.status`, and `event.visible` in `site.config.ts` when a new edition is announced. Update the event content in both `content/pages.fr.json` and `content/pages.en.json` as needed. Set `visible` to `false` to hide the page.
