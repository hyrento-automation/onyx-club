# SEO + GEO Specification: onyxclub.ch

**Read this file fully before touching the code. It is the single source of truth for search (SEO) and AI-answer visibility (GEO: Generative Engine Optimization).**
Project: static Next.js 14 (App Router, `output: 'export'`), French default + English, hosted on Vercel.

---

## 0. GOAL AND RULES

**Goal:** make onyxclub.ch index within days and win local, long-tail Geneva/Cologny searches within weeks, and be cited by Google AI Overviews, ChatGPT, Perplexity, Claude and Gemini when people ask about private sport clubs, yoga, boxing and coaching around Geneva.

**Rules (non-negotiable):**
- White-hat only. No fake reviews, no `AggregateRating` or `Review` markup unless the reviews are real and visible on the page, no keyword stuffing, no hidden text, no doorway pages, no copied content.
- Every page needs unique, genuinely useful content in **both** languages (no machine-looking literal translation; Swiss French tone).
- Facts must be identical everywhere (NAP: Name, Address, Phone). One source: `site.config.ts`. Never hardcode facts in components.
- Unknown facts stay as `TODO` placeholders in `site.config.ts` and are listed in section 14. Never invent coordinates, hours, ratings, awards or credentials.
- Search guidelines change. Prefer fundamentals (fast, crawlable, accurate, useful) over tricks.

---

## 1. ENTITY FACTS (single source of truth)

Put all of this in `site.config.ts` and read it everywhere (metadata, JSON-LD, footer, llms.txt).

| Field | Value |
|---|---|
| Name | Onyx Club |
| Tagline | Sport · Lifestyle · Zen sur le lac Léman |
| Domain | https://onyxclub.ch (canonical). `www.onyxclub.ch` and `onyxclub.com` must 301 to it |
| Type | Private sport and wellness club (health club) |
| Address | Chemin du Nant-d'Argent 1, Cologny (Geneva), Switzerland. `TODO:` confirm postal code (likely 1223) |
| Phone | 078 613 70 21 (schema format: `+41 78 613 70 21`) |
| Emails | contact@onyxclub.ch, info@onyxclub.ch |
| Hours | `TODO` (client to confirm) |
| Geo coordinates | `TODO` (take from the verified Google Business Profile) |
| Currency / price range | CHF, premium |
| Languages | fr, en |
| Socials | `TODO` (Instagram, Facebook, LinkedIn, YouTube) |
| Services | Yoga & Pilates, Boxing (Boxe Technic, Boxe Fitness, Muay Thaï, Sparring), Private training (Personal, Duo), Running Club (lake shore), Personal development / mental preparation, Bootcamp, Strong Nation / Circle Mobility, Stretching, Free Access membership, Protein milkshake bar |
| Prices | Group class 35 CHF · Private 1h 120 CHF · Free Access 120 CHF/month, 320 CHF/3 months · Personal Training 120/1h, 1100/10h · Duo 150/1h, 1350/10h · 10-class card 350 CHF · -10% for new members |
| Differentiators | Private club feel, lake and mountain views, outdoor yoga facing the lake, community, personalised coaching, nutrition bar |

---

## 2. KNOWN ISSUES IN THE CURRENT CODE (fix first)

1. `app/page.tsx` redirects with client-side JS. Replace with a server-level **301 `/` → `/fr/`** in `vercel.json` (section 5) and delete the page. Search engines must not depend on JS redirects.
2. `app/layout.tsx` hardcodes `<html lang="fr">`, so English pages declare the wrong language. Make `app/[lang]/layout.tsx` the **root layout** (it renders `<html lang={lang}>` and `<body>`), delete `app/layout.tsx`, and move the global CSS import there.
3. `.rv` (scroll reveal) sets `opacity: 0` until JS runs. Add `<noscript><style>.rv{opacity:1!important;transform:none!important}</style></noscript>` in the layout `<head>`, and make sure no content is hidden for crawlers. The preloader must never block rendering of HTML content (it overlays only; keep it under 1.8s and skip it for bots/reduced motion).
4. The three reviews on the home page are **placeholders**. Do not ship them as real. Either remove the section until real reviews exist or label it as a template and exclude it from JSON-LD.
5. `generateMetadata` lacks canonical, Open Graph, Twitter and hreflang. Replace with the helper in section 4.
6. No `<img>`/alt text exists yet. All images need descriptive FR/EN `alt` (section 8).

---

## 3. URL STRUCTURE AND PAGE PLAN

Rules: lowercase, hyphenated, trailing slash (matches `trailingSlash: true`), localized slugs, one canonical URL per page, reciprocal hreflang between FR and EN.

| Page | FR URL | EN URL | Primary keyword (FR) | Primary keyword (EN) |
|---|---|---|---|---|
| Home | `/fr/` | `/en/` | club de sport privé Genève Cologny | private sports club Geneva |
| Yoga & Pilates | `/fr/activites/yoga-pilates/` | `/en/activities/yoga-pilates/` | yoga en plein air Genève lac | outdoor yoga Geneva lake |
| Boxe | `/fr/activites/boxe/` | `/en/activities/boxing/` | cours de boxe Genève | boxing classes Geneva |
| Entraînement privé | `/fr/activites/entrainement-prive/` | `/en/activities/private-training/` | coach sportif privé Genève | personal trainer Geneva |
| Course à pied | `/fr/activites/course-a-pied/` | `/en/activities/running-club/` | running club Genève lac | running club Geneva lake |
| Développement personnel | `/fr/activites/developpement-personnel/` | `/en/activities/personal-development/` | préparation mentale Genève | mental coaching Geneva |
| Bootcamp | `/fr/activites/bootcamp/` | `/en/activities/bootcamp/` | bootcamp Genève | bootcamp Geneva |
| Strong Nation | `/fr/activites/strong-nation/` | `/en/activities/strong-nation/` | Strong Nation Genève | Strong Nation Geneva |
| Stretching | `/fr/activites/stretching/` | `/en/activities/stretching/` | stretching et mobilité Genève | stretching mobility Geneva |
| Tarifs | `/fr/tarifs/` | `/en/pricing/` | tarifs club de sport Genève | sports club prices Geneva |
| Milkshakes | `/fr/milkshakes/` | `/en/milkshakes/` | milkshake protéiné Genève | protein shake bar Geneva |
| Événement | `/fr/evenement/` | `/en/event/` | journée sportive bien-être Cologny | wellness sports day Cologny |
| Équipe | `/fr/equipe/` | `/en/team/` | coachs sportifs Genève | coaches Geneva |
| Blog | `/fr/blog/` + `/fr/blog/[slug]/` | `/en/blog/` | (see section 9) | |
| FAQ | `/fr/faq/` | `/en/faq/` | questions fréquentes club de sport | sports club FAQ |
| Contact / Réserver | `/fr/contact/` | `/en/contact/` | réserver séance d'essai Genève | book a trial session Geneva |
| Legal | `/fr/mentions-legales/` | `/en/legal-notice/` | noindex not needed | |

Implement slugs as a typed map in `lib/routes.ts` (one entry per page with `fr` and `en` slugs) so the language switcher, sitemap, hreflang and internal links all derive from it.

**Secondary keyword clusters** (weave naturally into the right pages, never stuff):
- Local: club de sport Cologny, salle de sport Cologny, sport Genève rive gauche, club de sport au bord du lac Genève, coaching sportif Cologny, yoga Cologny, pilates Genève
- Audience: salle de sport pour frontaliers Genève, sport pour cadres et entrepreneurs Genève, team building sportif Genève (companies), club de sport famille Genève, sport seniors actifs Genève
- Commercial: abonnement club de sport Genève, prix coach sportif Genève, séance d'essai gratuite sport Genève, première session offerte
- Nutrition: bar à protéines Genève, smoothie protéiné après entraînement, milkshake matcha protéiné

---

## 4. ON-PAGE AND METADATA

**Per page:** one `<h1>` containing the primary keyword naturally, logical `h2/h3` hierarchy, primary keyword in the first 100 words, unique title and description in each language, one clear CTA.

**Title formulas** (max ~60 characters, brand last):
- Home FR: `Club de sport privé à Cologny, Genève | Onyx Club`
- Home EN: `Private Sports Club in Cologny, Geneva | Onyx Club`
- Activity FR: `Cours de boxe à Genève, au bord du lac | Onyx Club`
- Pricing FR: `Tarifs : coaching, cours et Free Access | Onyx Club`

**Meta descriptions** (max ~155 characters): lead with the benefit and location, include a differentiator and a CTA. Example FR home: `Club privé sur le lac Léman à Cologny : yoga, boxe, coaching, bootcamp et milkshakes protéinés. Première session offerte. Réservez.`

**Helper (`lib/seo.ts`)**, used by every page's `generateMetadata`:

```ts
import type { Metadata } from 'next';
import cfg from '@/site.config';

export const SITE = 'https://onyxclub.ch';

export function buildMeta(opts: {
  lang: 'fr' | 'en';
  paths: { fr: string; en: string }; // e.g. { fr: '/fr/tarifs/', en: '/en/pricing/' }
  title: string;
  description: string;
  image?: string; // /images/og/xxx.jpg, 1200x630
}): Metadata {
  const url = SITE + opts.paths[opts.lang];
  const img = SITE + (opts.image ?? '/images/og/default.jpg');
  return {
    metadataBase: new URL(SITE),
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: url,
      languages: { fr: SITE + opts.paths.fr, en: SITE + opts.paths.en, 'x-default': SITE + opts.paths.fr },
    },
    openGraph: {
      type: 'website', url, siteName: cfg.name, title: opts.title, description: opts.description,
      locale: opts.lang === 'fr' ? 'fr_CH' : 'en_GB', alternateLocale: opts.lang === 'fr' ? ['en_GB'] : ['fr_CH'],
      images: [{ url: img, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: { card: 'summary_large_image', title: opts.title, description: opts.description, images: [img] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  };
}
```

Also: set `themeColor` `#070707`, add `manifest.webmanifest`, 1200x630 OG images per page type (dark copper, brand ring, page title) saved as static files.

---

## 5. TECHNICAL SEO (static export on Vercel)

**`app/robots.ts`** (add `export const dynamic = 'force-static'`):

```ts
import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';
export const dynamic = 'force-static';

const AI_BOTS = ['GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','Claude-SearchBot','Claude-User',
  'PerplexityBot','Perplexity-User','Google-Extended','Applebot-Extended','CCBot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }, ...AI_BOTS.map((userAgent) => ({ userAgent, allow: '/' }))],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
```
Decision: **allow all AI crawlers**. For a local business, being cited and recommended matters more than protecting content.

**`app/sitemap.ts`** (`export const dynamic = 'force-static'`): list every URL from `lib/routes.ts` for both languages, each with `lastModified` (build date or the content's real date), `alternates.languages` (fr, en), sensible `priority` (home 1, activities 0.8, blog 0.6). Exclude legal pages from priority boosting, never list redirects or 404s.

**`vercel.json`** (server-level redirects, required because static export has no server):

```json
{
  "cleanUrls": false,
  "trailingSlash": true,
  "redirects": [
    { "source": "/", "destination": "/fr/", "permanent": true },
    { "source": "/(.*)", "has": [{ "type": "host", "value": "www.onyxclub.ch" }], "destination": "https://onyxclub.ch/$1", "permanent": true },
    { "source": "/(.*)", "has": [{ "type": "host", "value": "onyxclub.com" }], "destination": "https://onyxclub.ch/$1", "permanent": true },
    { "source": "/(.*)", "has": [{ "type": "host", "value": "www.onyxclub.com" }], "destination": "https://onyxclub.ch/$1", "permanent": true }
  ],
  "headers": [
    { "source": "/(.*)", "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
    ]},
    { "source": "/_next/static/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/images/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=2592000" }] }
  ]
}
```

Also required:
- `app/not-found.tsx`: branded 404 (FR/EN links), returns real 404 status.
- No `noindex` anywhere except staging. Add a build-time guard: if `NEXT_PUBLIC_ENV !== 'production'`, emit `noindex` and a disallow-all robots.
- HTTPS only, one canonical host, trailing-slash consistency (links, canonicals, sitemap all end with `/`).
- No orphan pages: every page reachable within 3 clicks from home; footer links to all main pages.
- No duplicate content between `/fr` and `/en`; they are alternates, not duplicates.

---

## 6. PERFORMANCE (Core Web Vitals are a ranking input)

Targets (mobile, p75): **LCP < 2.0s, INP < 200ms, CLS < 0.05**, Lighthouse 95+ SEO/Accessibility/Best Practices, 90+ Performance.

- The hero must render as plain HTML/CSS first. The LCP element is the H1 or a single preloaded poster image. Background video: `preload="none"`, poster image, loaded only after `requestIdleCallback`, **disabled on mobile data-saver and `prefers-reduced-motion`**.
- Images: AVIF/WebP, explicit `width`/`height`, `loading="lazy"` except the LCP image (`fetchpriority="high"`), responsive `srcset` generated at build time (`next/image` is unoptimized in static export, so pre-generate sizes with a script using `sharp`).
- Fonts: `next/font` with `display: 'swap'`, only needed weights, `subsets: ['latin']`.
- Dynamic-import heavy animation code (GSAP, Lenis) and only after first paint. No animation library on pages that do not need it.
- No layout shift: reserve space for every media element; the preloader must not shift content.
- JS budget: aim < 150 KB gzipped first load per page. Zero third-party scripts at launch.

---

## 7. STRUCTURED DATA (JSON-LD)

Create `components/JsonLd.tsx` and render one `<script type="application/ld+json">` per entity, generated from `site.config.ts` and the content files (never hand-typed duplicates). Validate everything with the Rich Results Test and the Schema.org validator.

```tsx
export default function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

**Site-wide (every page):** `Organization` + `WebSite` (with `inLanguage`) + the main entity below.

**`HealthClub` (home, contact, about)** with a stable `@id` (`https://onyxclub.ch/#club`):

```ts
{
  '@context': 'https://schema.org',
  '@type': 'HealthClub',
  '@id': 'https://onyxclub.ch/#club',
  name: 'Onyx Club',
  alternateName: 'Onyx Club Genève',
  url: 'https://onyxclub.ch/',
  logo: 'https://onyxclub.ch/images/logo.png',
  image: ['https://onyxclub.ch/images/og/default.jpg'],
  description: lang === 'fr'
    ? 'Club privé de sport, lifestyle et bien-être au bord du lac Léman à Cologny : yoga, pilates, boxe, coaching, bootcamp.'
    : 'Private sport, lifestyle and wellness club on Lake Geneva in Cologny: yoga, pilates, boxing, coaching, bootcamp.',
  telephone: '+41 78 613 70 21',
  email: 'contact@onyxclub.ch',
  address: { '@type': 'PostalAddress', streetAddress: "Chemin du Nant-d'Argent 1", addressLocality: 'Cologny',
             postalCode: cfg.postalCode /* TODO */, addressRegion: 'GE', addressCountry: 'CH' },
  geo: { '@type': 'GeoCoordinates', latitude: cfg.lat, longitude: cfg.lng }, // TODO real values
  openingHoursSpecification: cfg.hoursSpec,                                   // TODO real values
  priceRange: 'CHF 35 - CHF 1350',
  currenciesAccepted: 'CHF',
  areaServed: ['Cologny','Genève','Vandoeuvres','Collonge-Bellerive','Chêne-Bougeries','Genthod','Pregny-Chambésy'],
  knowsLanguage: ['fr','en'],
  sameAs: cfg.socials, // only real, verified profile URLs
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Lake view', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Protein bar', value: true },
  ],
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Services', itemListElement: [ /* one Offer + Service per activity */ ] },
}
```

**Other schemas:**
- `BreadcrumbList` on every inner page.
- `Service` (with `provider: {'@id': '.../#club'}`, `areaServed`, `offers`) on each activity page.
- `Offer` / `PriceSpecification` on `/tarifs/` mirroring the visible price table exactly.
- `Product` with `nutrition: { '@type': 'NutritionInformation', calories: '400 kcal', proteinContent: '30 g' }` for each milkshake.
- `Event` on `/evenement/` (name, startDate, endDate, `eventStatus`, `eventAttendanceMode`, `location` Place, `organizer`, `offers` with price 0 for the free first session). When the date is past, update `eventStatus` or hide the schema; never leave a past event marked as scheduled.
- `FAQPage` on `/faq/` and activity pages that have FAQs. Google limits FAQ rich results for most sites, but the markup still helps machines understand Q&A, so keep it, matching visible content exactly.
- `Person` for coaches (name, jobTitle, `worksFor`, `knowsAbout`, `image`) once real bios exist.
- `Article`/`BlogPosting` on posts (headline, `datePublished`, `dateModified`, author `Person`, image, `inLanguage`).
- **No `AggregateRating`/`Review` until real, visible reviews exist** (and then only if they comply with Google's review snippet policy).

---

## 8. CONTENT QUALITY, E-E-A-T AND IMAGES

- Show real expertise: coach cards with certifications, years of experience and specialities (client supplies the facts). Add an "À propos" block: who runs the club, why it exists, where it is.
- Show real experience: photos from the club and events, real testimonials with first name and context, event recaps.
- Show trust: full address, phone, email, hours, privacy and legal pages, transparent prices, clear cancellation and trial-session rules.
- Every activity page minimum 500 words of unique copy: what it is, who it is for, what to expect, benefits, level, duration, price, how to book, 4-6 FAQs, links to related activities and to pricing.
- Image rules: descriptive filenames (`yoga-plein-air-lac-leman-cologny.avif`), FR/EN `alt` that describes the scene (not "image1"), no text baked into images that carries key information (put it in HTML), original photography preferred over stock.
- Use Swiss French conventions and CHF. Mention Cologny, Genève, Lac Léman, Rive gauche naturally and accurately. Do not claim distances, parking or transport lines unless the client confirms them.

---

## 9. CONTENT PLAN TO RANK FAST (long-tail first)

Low-competition, high-intent local topics rank first. Publish **12 launch articles** (FR first, EN versions for the top 6), 700-1,200 words each, with an answer-first intro, a visible "last updated" date, internal links to the relevant activity page and a booking CTA:

1. Club de sport privé à Genève : à quoi s'attendre (et combien ça coûte)
2. Yoga en plein air au bord du lac Léman : guide pour débutants
3. Cours de boxe à Genève : par où commencer, quel équipement, quels bénéfices
4. Coach sportif privé à Genève : tarifs, durée, comment choisir
5. Préparation mentale : comment elle améliore la performance sportive
6. Pilates de récupération : pour qui et à quelle fréquence
7. Salle de sport pour frontaliers à Genève : horaires et formules
8. Running Club au bord du lac : parcours et conseils (once the routes are confirmed)
9. Bootcamp à Genève : à quoi ressemble une séance intensive
10. Milkshakes protéinés après l'entraînement : nos 4 recettes (macros réelles)
11. Team building sportif pour entreprises à Genève
12. Journée Sportive & Bien-être à Cologny : le récit en images

**Local landing pages** (only if each has unique, useful content, never copy-paste with a swapped town name): `/fr/sport-cologny/`, `/fr/sport-vandoeuvres/`, `/fr/sport-collonge-bellerive/`. Content: how to get there (confirmed facts only), who lives nearby, activities, a map. Skip any page that would be thin.

**Freshness:** one new post or event update every 1-2 weeks for the first 3 months. Show `dateModified` and keep it truthful.

**Internal linking:** each blog post links to 2+ service pages; each service page links to pricing, related services, 2 relevant posts and contact. Use descriptive anchor text.

---

## 10. GEO: BEING CITED BY AI ANSWER ENGINES

AI systems pick sources that are clear, consistent, specific and easy to quote. Implement:

1. **Answer capsules.** Under each important heading, open with a 40-60 word direct answer, then expand. Example (FR): *« Onyx Club est un club de sport privé situé à Cologny, sur le lac Léman, à Genève. Il propose yoga, pilates, boxe, bootcamp, coaching privé et préparation mentale. Un cours collectif coûte 35 CHF, une séance individuelle 120 CHF, et la première session est offerte. »*
2. **"Onyx Club en bref" fact box** on the home page and `/contact/` (semantic `<dl>`): name, location, services, prices, languages, hours, phone, how to book. This is the block assistants quote.
3. **Q&A format.** Real questions people ask ("Combien coûte un coach sportif à Genève ?", "Y a-t-il des cours en anglais ?", "Peut-on essayer gratuitement ?"), each with a short, factual, self-contained answer. Mirror them in `FAQPage` JSON-LD.
4. **Tables for facts.** Prices, schedules, class comparisons as real HTML `<table>`s, not images.
5. **Specifics beat adjectives.** Prices, durations, class sizes, levels, addresses, dates, calories. Avoid vague marketing language in factual sections.
6. **Consistency.** Same NAP, services and prices on the site, Google Business Profile, directories, socials and posters. Conflicting facts reduce citations.
7. **`/llms.txt` and `/llms-full.txt`** in `/public`: a concise markdown summary of the club, services, prices, address, languages, key page URLs and the FAQ. Generate them from `site.config.ts` and the content files in a build script (`scripts/generate-llms.ts`) so they never drift. These files are a low-cost convention; no engine has confirmed they affect ranking, so treat them as a helpful extra, not a strategy.
8. **Crawl access.** Keep AI search crawlers allowed in `robots.ts` (section 5). Keep all key content in server-rendered HTML (this static build already does), not behind JS or tabs that require interaction.
9. **Freshness and authorship.** Visible `dateModified`, named authors with `Person` schema, sources cited for any health or nutrition claim (link to reputable bodies). No medical promises.
10. **Brand and entity signals (off-site, section 11).** AI answers lean heavily on what the wider web says about the brand: Google Business Profile, directories, news mentions and reviews. Make the brand name unambiguous ("Onyx Club Genève" / "Onyx Club Cologny") because "Onyx" alone is generic.
11. **Prompt coverage.** Make sure the site answers, in plain language, these prompts: "meilleur club de sport privé à Genève", "où faire du yoga au bord du lac à Genève", "cours de boxe Genève", "coach sportif Cologny", "salle de sport pour frontaliers Genève", "milkshake protéiné Genève", "sports club Geneva English-speaking". Add a monthly checklist task to test these prompts in major assistants and log which sources are cited.

---

## 11. OFF-SITE AND LOCAL SEO (the biggest levers for fast local ranking)

Code alone will not rank a local business fast. Deliver these as a launch checklist for the client and the owner (Codex: generate `docs/LAUNCH_CHECKLIST.md` from this section).

**Week 0 (before or on launch day)**
- **Google Business Profile**: create and verify. Primary category "Club de sport" (add "Studio de yoga", "Studio de pilates", "Club de boxe", "Coach sportif" as secondary if available). Complete every field: address, hours, phone, website `https://onyxclub.ch/fr/`, services with descriptions and prices, attributes, 15+ real photos (exterior, view, studios, classes, bar), logo, cover, products (milkshakes), booking link.
- **Bing Places**, **Apple Business Connect**, and map listings (Waze, Apple Maps).
- Swiss directories: **local.ch**, **search.ch**, plus Yelp, Foursquare, Cylex and relevant Geneva tourism or sport listings. Identical NAP everywhere.
- Social profiles with the exact name, link to the site, same bio, the Pass 27 event highlights.
- Search Console (Domain property via DNS) and Bing Webmaster Tools; submit `sitemap.xml`; request indexing for the home page and top activity pages. Add **IndexNow** (key file in `/public`, a `scripts/indexnow.ts` that pings all sitemap URLs after each production deploy).

**Weeks 1-4**
- **Reviews:** a short review link/QR (poster, WhatsApp, email after each session). Target 10+ genuine Google reviews in month one, reply to every review. Never buy or fabricate reviews.
- **GBP posts** weekly (events, offers, new classes) and Q&A seeded with real answers.
- **Local backlinks:** the Cologny commune and local association pages, Geneva event agendas (list the next event), partner businesses, coaches' own sites and socials, local blogs and press, sports federations, wellness and lifestyle media. Quality over quantity.
- Publish the event recap and the next edition announcement; ask attendees to tag the club.
- Short video content (Reels/Shorts) embedded and linked to the matching pages.

**Ongoing**
- Monitor GSC queries monthly; rewrite titles/descriptions for pages with impressions but low CTR; expand pages that rank 8-20.
- Refresh pricing, hours and events the day they change (site, GBP, directories).

---

## 12. MULTILINGUAL RULES

- Separate URLs per language (already `/fr/` and `/en/`). Never auto-redirect by IP or browser language; offer a visible language switcher that links to the **equivalent page**, not the home page.
- Reciprocal `hreflang` (fr, en, `x-default` → FR) on every page, using absolute URLs (section 4 helper), matching the sitemap alternates.
- `<html lang>` must match the page language (fix in section 2).
- Translate titles, descriptions, alt text, JSON-LD text fields, OG tags and error pages.
- FR is the primary market (Geneva); EN serves expats and international members. Keep EN genuinely useful, not an afterthought.

---

## 13. ANALYTICS, PRIVACY AND MEASUREMENT

- Privacy-first, cookie-free analytics (Plausible or Umami, `defer`, loaded after consent-free interaction) to avoid cookie banners and protect Core Web Vitals. GA4 only if the client requires it, behind consent (Swiss nLPD and GDPR for cross-border visitors).
- Track conversions as events: form submit, phone tap, WhatsApp tap, "Réserver une séance" click, pricing page view.
- Privacy policy (`/mentions-legales/`) must describe form data handling accurately.
- Search Console is the source of truth for rankings and indexing; log weekly clicks, impressions, average position and indexed pages.

---

## 14. BUILD DELIVERABLES (what Codex must produce)

Files to add or change:

```
lib/seo.ts                  buildMeta(), SITE, helpers
lib/routes.ts               typed FR/EN slug map used everywhere
lib/schema.ts               JSON-LD builders (club, org, website, breadcrumb, service, event, faq, product, article, person)
components/JsonLd.tsx
components/Breadcrumbs.tsx  visible breadcrumbs + schema
components/FactBox.tsx      "Onyx Club en bref" semantic <dl>
app/robots.ts               (section 5)
app/sitemap.ts              (section 5)
app/[lang]/layout.tsx       root layout with <html lang>, noscript style, metadata
app/not-found.tsx
public/llms.txt, public/llms-full.txt    generated by scripts/generate-llms.ts
public/<indexnow-key>.txt, scripts/indexnow.ts
public/images/og/*.jpg      1200x630 per page type
public/manifest.webmanifest, favicon.ico, apple-touch-icon.png
vercel.json                 (section 5)
docs/LAUNCH_CHECKLIST.md    from section 11
site.config.ts              add: siteUrl, postalCode, lat, lng, hoursSpec, socials, locality list
```

**`TODO` values to hand back to the owner when finished** (list them in the final message): postal code, coordinates, opening hours, social URLs, real testimonials, coach bios and credentials, real photos with captions, confirmed class schedule, transport/parking info, Google Business Profile URL, review link.

---

## 15. ACCEPTANCE CHECKLIST (all must pass before launch)

- [ ] `npm run build` succeeds; view-source of every page shows full content, correct `<html lang>`, `<title>`, description, canonical, hreflang (fr, en, x-default), OG/Twitter tags, JSON-LD
- [ ] Rich Results Test and Schema validator: zero errors on home, an activity page, pricing, event, FAQ
- [ ] `/robots.txt`, `/sitemap.xml`, `/llms.txt` return 200 and list correct URLs; sitemap alternates are reciprocal
- [ ] `/` → `/fr/` 301; `www` and `onyxclub.com` → `https://onyxclub.ch` 301; one canonical host; HTTPS only
- [ ] No page is `noindex` in production; staging is `noindex`
- [ ] Every page has exactly one H1; no broken links; no orphan pages; all images have FR/EN alt
- [ ] Content visible with JavaScript disabled
- [ ] Lighthouse mobile: Performance 90+, SEO/Accessibility/Best Practices 95+; LCP < 2.0s, CLS < 0.05
- [ ] NAP in footer, JSON-LD, llms.txt, contact page and config are identical
- [ ] No fake ratings or placeholder reviews anywhere in markup or visible copy
- [ ] Launch checklist (section 11) delivered as `docs/LAUNCH_CHECKLIST.md`

**Realistic expectations:** indexing typically takes days; Google local pack visibility from a verified, fully completed and reviewed Business Profile often takes weeks; non-branded organic rankings for competitive Geneva terms usually take months. Fast results come from low-competition long-tail pages, a strong Business Profile, genuine reviews and local backlinks, not from on-page tricks.
