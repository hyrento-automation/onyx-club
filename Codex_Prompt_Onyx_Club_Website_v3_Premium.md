# Codex Prompt v3: Onyx Club, High-End Experience (onyxclub.ch)

Copy everything below this line into Codex.

---

## ROLE AND GOAL
You are a world-class creative developer and art director. Build a **luxury, award-level website** for **Onyx Club**, a private sport, lifestyle and wellness club on Lake Geneva (Cologny, Geneva). It must look and feel like a **USD 10,000+ custom agency build**: cinematic, smooth, tactile, with refined motion everywhere, yet fast and fully static.

Tagline: **SPORT • LIFESTYLE • ZEN | SUR LE LAC LÉMAN**
Brand lines: *Bougez. Respirez. Évoluez.* · *Plus qu'un club, un art de vivre* · *Stronger Happier You* · *Corps · Esprit · Équilibre · Communauté · Résultats* · *Discipline aujourd'hui, résultats demain* · *Mind · Body · Life*

Languages: **French (default) and English**.

## TECH STACK (strict)
- Next.js 14 (App Router), TypeScript strict, Tailwind CSS
- **Fully static**: `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true`. No API routes, no database.
- Routes under `/fr` (default, root redirects) and `/en` via `generateStaticParams`
- Motion: **GSAP + ScrollTrigger**, **Lenis** (smooth scroll), **Framer Motion** (page and UI transitions)
- `lucide-react` icons. Fonts via `next/font`: **Cormorant Garamond** (display), **Inter** (body), optional **Italiana** for the logo-style wordmark
- All copy in `/content/fr.json` and `/content/en.json`. No hardcoded text in components.

## DESIGN SYSTEM: BLACK AND COPPER
Dark, editorial, quiet luxury. Think private members' club, not gym.

| Token | Value |
|---|---|
| `--black` | `#070707` page background |
| `--surface` | `#12100E` cards and sections |
| `--surface-2` | `#1A1613` raised / hover |
| `--copper` | `#B87333` primary accent |
| `--copper-light` | `#E0A06A` highlights |
| `--copper-deep` | `#7A4219` borders / shadows |
| `--text` | `#F2EBE3` main text |
| `--muted` | `#A89F96` secondary text |

- **Copper foil gradient** for headings accents, prices and buttons: `linear-gradient(120deg, #7A4219, #B87333 30%, #F0B27A 50%, #B87333 70%, #7A4219)`, animated as a slow light sweep
- Section labels: small uppercase, wide tracking, copper, format `01 / NOTRE CONCEPT`
- Huge serif display type with fluid sizing (`clamp`), generous whitespace, 1px low-opacity copper hairlines, thin vertical side rails with brand lines (as on the club flyers)
- Subtle film-grain/noise overlay and soft vignette on dark sections; faint dark marble texture behind some blocks
- Radius 12-20px, glassmorphism cards (`backdrop-blur`, 1px copper border at 20-30% opacity)
- WCAG AA contrast, visible focus rings, mobile-first, fully responsive

## SIGNATURE EFFECTS (implement all, tastefully)
1. **Preloader:** the open copper ring draws itself (SVG stroke animation), "ONYX" letters fade in with wide tracking, then the curtain lifts into the hero. Show once per session.
2. **Hero:** full-screen looping background video of Lake Geneva (placeholder file path, poster image fallback) with dark gradient overlay, slow parallax, headline **"Un club à part."** revealed line by line (mask reveal), animated scroll indicator
3. **Smooth scrolling** (Lenis) with scroll-linked parallax on images and a thin copper scroll-progress bar
4. **Custom cursor** (copper dot + trailing ring) that expands on links and shows "VOIR" on image cards. Disabled on touch devices.
5. **Magnetic buttons** with a copper light-sweep on hover
6. **Split-text reveals** for headlines (per line/word), image **clip-path mask reveals** on scroll
7. **Horizontal scroll showcase** for the activities section (pinned with ScrollTrigger on desktop, swipe carousel on mobile)
8. **3D tilt and cursor-follow spotlight glow** on poster and activity cards
9. **Infinite marquee** strips with brand words (SPORT • LIFESTYLE • ZEN • BOUGEZ • RESPIREZ • ÉVOLUEZ) in outlined copper type
10. **Animated counters** (members, classes per week, years) in the clientele or concept section
11. **Interactive "Pass 27" ticket** (event page): a dark marble ticket with QR and barcode styling that **flips in 3D** between recto (access pass) and verso (programme)
12. **Page transitions** between routes (copper wipe) and **sticky stacked sections** on the concept block
13. **Before/after style image sliders** or hover-zoom galleries with a lightbox
14. Everything must respect `prefers-reduced-motion` (fall back to simple fades) and stay at 60fps. Lazy-load media, use `will-change` sparingly, no layout shift.

## LOGO
Reusable SVG: an open brushed-copper ring with the wordmark **ONYX** and small **CLUB** beneath, plus the line "SPORT · LIFESTYLE · ZEN". Used in the header, footer, preloader and favicon.

## HEADER AND FOOTER
- Header: logo, menu **LE CONCEPT · ACTIVITÉS · ÉVÉNEMENT · AVIS · MILKSHAKES · CLIENTÈLE · RÉSERVER**, FR/EN switcher, CTA **DEVENIR MEMBRE**. Transparent over the hero, blurs to solid on scroll, hides on scroll-down and shows on scroll-up. Mobile: full-screen overlay menu with staggered link animation.
- Footer: large ONYX wordmark, links **SUR LE LAC LÉMAN • GENÈVE • MENTIONS LÉGALES**, address, phone, emails, hours, social icons, newsletter-style "Première visite" mini form, small mountain-and-lake silhouette line art

## HOME PAGE (one cinematic scroll; exact French copy, natural English for `/en`)

**HERO:** SPORT • LIFESTYLE • ZEN | SUR LE LAC LÉMAN · **Un club à part.** · button DÉCOUVRIR

**01 / NOTRE CONCEPT:** badge card SPORT LIFESTYLE ZEN · **Un club privé. Rien de plus.** · Sport, détente et vue panoramique au bord du lac Léman. · 6-item icon grid: STYLE UNIQUE · COMMUNAUTÉ · COACHING PERSONNALISÉ · VUE UNIQUE · SOIN ET RÉCUPÉRATION · NUTRITION & BIEN-ÊTRE

**02 / NOS ACTIVITÉS:** **Des activités d'exception.** · Choisissez votre rythme. Horizontal showcase of 6 numbered activities, each linking to its detail page:
`01` YOGA & PILATES · `02` SPORTS DE COMBAT · `03` ENTRAÎNEMENT PRIVÉ · `04` COURSE À PIED · `05` DÉVELOPPEMENT PERSONNEL · `06` BOOTCAMP
Plus category chips: YOGA (Yoga Sunrise, Pilates, Méditation, Cardio) · HIIT (Coaching Express, Circuit Training) · BOXE (Boxe Fitness, Muay Thaï, Sparring, Bootcamp) · BIEN-ÊTRE (Yoga Outdoor, Remise en forme au lac, Événements sportifs, Nutrition)
Price strip: `35 CHF` Cours collectif 1h · `120 CHF` Individuel 1h · button RÉSERVER UNE SÉANCE

**03 / NOS OFFRES EN IMAGE:** **Nos offres en image.** · Coaching privé personnalisé, programme adapté, activités, alimentation, bien-être. Tilt-card gallery of the official posters (Boxe, Yoga, Développement personnel, Nos activités d'exception, Journée Sportive & Bien-être) with lightbox.

**BOXE feature block** (split layout, big poster image with parallax): **Maîtrise de soi & force.** · `35 CHF` / `120 CHF` · RÉSERVER UNE SÉANCE

**ÉVÉNEMENT teaser:** "La Journée Sportive & Bien-être" with the Pass 27 ticket preview and link to `/evenement`

**AVIS:** **Ils sont devenus membres.** · testimonial carousel (3 clearly marked placeholder reviews)

**04 / NUTRITION BAR:** **ONYX MILKSHAKES.** · Protéines Clean Label, superaliments, goûts uniques pour booster vos performances. · 4 shake cards with floating hover effect · button DÉCOUVRIR LE BAR

**05 / NOTRE CLIENTÈLE:** **Un club pour des vies en mouvement.** · 7 tiles: `01` CADRES & ENTREPRENEURS · `02` RÉSIDENTS DE COLOGNY · `03` ENTREPRISES · `04` FAMILLES · `05` FRONTALIERS · `06` SPORTIFS · `07` SENIORS ACTIFS

**06 / PREMIÈRE VISITE:** **Entrer chez ONYX.** · Laissez vos coordonnées. Nous vous recontacterons. Démonstration sans paiement. · Form: NOM ("Prénom Nom"), EMAIL ("vous@exemple.com"), button ENVOYER. Validation, honeypot, success/error states. Posts to `NEXT_PUBLIC_FORM_ENDPOINT`, fallback `mailto:`. Floating WhatsApp button and click-to-call.

## ACTIVITY DETAIL PAGES (`/activites/[slug]`, FR and EN)
Each page: full-bleed hero with parallax image, title, 4 benefit bullets, "what to expect", who it is for, prices, schedule note, related activities, big CTA "Réserver une séance". Use this data:

1. **Yoga & Pilates** (`yoga-pilates`): *Yoga en plein air, face au lac* and *Pilates spécial récupération*. Tagline "Activité sereine". Benefits: Équilibre intérieur & flexibilité · Respiration consciente · Union du corps et de l'esprit · Réduction du stress & paix. Mention aerial/suspended yoga as a signature visual.
2. **Sports de combat / Boxe** (`boxe`): *Boxe Technic / Boxe*, also Boxe Fitness, Muay Thaï, Sparring. Tagline "Activité Boxe". Benefits: Maîtrise de soi & force · Agilité & endurance décuplées · Précision de l'action · Résilience & équilibre.
3. **Entraînement privé** (`entrainement-prive`): *Personal Training, séance sur mesure*, Duo Training, Coaching sportif. Prices on the tarifs page.
4. **Course à pied** (`course-a-pied`): *Running Club, rives du lac*.
5. **Développement personnel** (`developpement-personnel`): *Ateliers de développement personnel* and *séance individuelle : préparation mentale 1h*. Headline "Réservez votre équilibre". Benefits: Libérez-vous de vos blocages · Performance maximisée · Clarté d'esprit · Confiance décuplée.
6. **Bootcamp** (`bootcamp`): *Séances de bootcamp intensif*.
7. **Strong Nation / Circle Mobility** (`strong-nation`): music-led, mobility-focused session (short descriptive copy).
8. **Stretching** (`stretching`): recovery and flexibility, sunset-style session (short descriptive copy).

Prices on every relevant page: `35.00 CHF` cours collectif · `120.00 CHF` cours individuel.

## EVENT PAGE (`/evenement`): "La Journée Sportive & Bien-être"
- Headline: **La Journée Sportive & Bien-être.** · Une expérience unique pour booster votre corps, apaiser votre esprit et révéler le meilleur de vous-même.
- Info bar: **Dimanche 27 septembre** · Chemin du Nant-d'Argent 1, Cologny · 8h00 – 16h00
- Perks: Votre 1ère session offerte · Communauté inspirante · Inscription obligatoire: **078 613 70 21**
- **Interactive Pass 27 ticket** (3D flip). Recto: "ONYX CLUB · GENÈVE", **PASS 27**, Accès privilégié, Entrée 27.09.2026, Destination Bien-être & Sport, N° invitation 027, QR and barcode. Verso, "Votre expérience commence ici, programme officiel de la journée":
  - 09h30 – 10h30 Pilates
  - 11h00 – 12h00 Yoga
  - 12h00 – 13h00 Développement personnel
  - 13h00 – 14h00 Boxe
  - 14h00 – 14h45 Strong Nation / Circle Mobility
  - 16h00 – 17h00 Stretching
- The 27 September 2026 date has already passed, so build the page as **"Revivez la journée"** (recap gallery, programme, highlights) plus a **"Prochaine édition: inscrivez-vous"** waitlist form. Make the event date, status (upcoming/past) and visibility configurable in `site.config.ts` so the next edition only needs a data change.

## OTHER PAGES
- `/tarifs`: elegant pricing tables with copper highlights. Free Access 120 / month, 320 / 3 months · Personal Training 120 / 1h, 1100 / 10h · Duo Training 150 / 1h, 1350 / 10h · Group classes 35 / class, 350 for 10 classes · Banner **-10% pour les nouveaux membres**. Currency configurable (default CHF).
- `/milkshakes`: full dark luxury menu. Onyx Protein (black sesame, cacao, banana, oat milk, vanilla whey · énergie & récupération · 400 kcal) · Mocha Protein (espresso, cacao, banana, almond butter, chocolate whey · focus & performance · 410 kcal) · Matcha Protein (matcha, vanilla, banana, oat milk, vanilla whey · équilibre & antioxydant · 390 kcal) · 4th shake: **Blue Léman Protein** (blue spirulina, coconut, pineapple, coconut milk, vanilla whey · hydratation & vitalité · 395 kcal), editable to "Acai Protein Shake" in the content file. 30g protein each. Badges: ingrédients naturels et premium · conçus pour la performance et le bien-être · faits maison avec passion.
- `/equipe`: coach cards (photo, name, speciality, short bio; placeholders) with hover reveal
- `/galerie`: masonry gallery with lightbox, category filters (Club, Activités, Événements, Bar)
- `/blog`: static articles (JSON/Markdown), list and detail pages
- `/faq`: accessible accordion
- `/contact` (RÉSERVER): form (name, email, phone, activity, message), map placeholder, hours, WhatsApp, call button
- `/mentions-legales`: privacy and terms (placeholder text)

## ASSETS
The official posters and flyers are provided by the client. Reference them from `/public/images/posters/` (boxe, yoga, developpement-personnel, activites-exception, journee-sportive-copper, journee-sportive-gold, pass-27, offres-liste) and use gradient placeholders if a file is missing. Use `/public/video/hero-lake.mp4` plus a poster image. Bilingual `alt` text everywhere.

## FEATURES AND SEO
- Language switcher keeps the equivalent page; `hreflang`, localized metadata, Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD (`HealthClub` / `LocalBusiness`, `Event` for the event page)
- Cookie-free, no tracking scripts
- Active-section highlighting in the menu, smooth anchor scrolling
- Targets: Lighthouse 90+ Performance and 95+ Accessibility, Best Practices and SEO, despite the effects (compress media, lazy-load, dynamic-import GSAP-heavy components)

## FILE STRUCTURE
```
/app/[lang]/page.tsx (home)
/app/[lang]/activites/[slug]/page.tsx
/app/[lang]/(evenement|tarifs|milkshakes|equipe|galerie|blog|faq|contact|mentions-legales)
/components/ui (Button, MagneticButton, Cursor, Preloader, SplitText, Marquee, Counter, TiltCard, Lightbox)
/components/sections (Hero, Concept, ActivitiesShowcase, Offers, BoxeBlock, EventTeaser, Testimonials, Bar, Clientele, VisitForm)
/components/event (PassTicket3D, Programme)
/content/fr.json, /content/en.json, /content/activities.ts
/lib (i18n.ts, seo.ts, motion.ts)
site.config.ts (name, phone, emails, address, hours, socials, currency, form endpoint, event config)
```
Site details for `site.config.ts`: address Chemin du Nant-d'Argent 1, Cologny (Geneva), phone 078 613 70 21, emails `contact@onyxclub.ch` and `info@onyxclub.ch`. Posters mention onyxclub.com; the live domain is **onyxclub.ch**.

## DELIVERABLES
1. Working project: `npm install && npm run dev`
2. Successful `npm run build` (static output in `/out`)
3. `README.md`: edit content, swap images and video, set form endpoint, update the event, deploy to Vercel
4. Zero TypeScript and ESLint errors

## WORKING METHOD
Build in this order, confirming each step compiles: (1) config, tokens, fonts, Lenis/GSAP setup, (2) i18n and content, (3) shared UI and effects components, (4) home sections in order, (5) activity and event pages, (6) remaining pages, (7) SEO, accessibility and performance pass, (8) final build. Do not ask questions; use sensible placeholders where information is missing and list them in your final message.
