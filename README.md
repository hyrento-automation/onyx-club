# Onyx Club · onyxclub.ch

A bilingual (French/English), static Next.js 14 website for Onyx Club in Cologny. It uses the App Router, TypeScript, Tailwind-ready styling, Lenis, GSAP/ScrollTrigger and Framer Motion dependencies, with static export enabled.

## Run locally

```sh
npm install
npm run dev
```

Run `npm run build` to generate the production static export in `/out`.

## Edit content and details

- Homepage and navigation copy: `content/fr.json` and `content/en.json`.
- Secondary pages: `content/pages.fr.json` and `content/pages.en.json`.
- Activity detail copy: `content/activities.ts`.
- Club details, rates, currency, event date/status/visibility and form endpoint: `site.config.ts`.
- Set `NEXT_PUBLIC_FORM_ENDPOINT` to a form provider endpoint. Without it, forms open a prefilled email to `contact@onyxclub.ch`.
- Update contact details in `site.config.ts` if the club information changes.

## Replace the media placeholders

Temporary generated visuals are currently wired into the hero and activity cards (`hero-lake-generated.jpg`, `yoga-generated.jpg`, `boxing-generated.jpg`). Replace them with official imagery when ready: show the ONYX building interior and indoor sessions for every activity; the hero may include the lake through the club windows. Milkshakes should be presented in elegant glass bottles and supplied as transparent-background product cutouts. Four supplied videos are included in `public/video/` and appear in the gallery; the shake-serving video also appears on the milkshake page. Add future activity photography or official posters to `public/images/posters/` using the names `boxe`, `yoga`, `developpement-personnel`, `activites-exception`, `journee-sportive-copper`, `journee-sportive-gold`, `pass-27`, and `offres-liste` (include the appropriate image extension). The site uses dark copper CSS compositions if official files are absent.

## Event updates

Update `event.date`, `event.status`, and `event.visible` in `site.config.ts` when a new edition is announced. Then update the event title, intro and programme in both `content/pages.*.json` files and the displayed pass copy in `components/PassTicket.tsx` if the date or programme changes. Set `visible` to `false` to hide the page.

## Deploy

Deploy the generated `/out` directory to Vercel or another static host. The site does not use a database, analytics, cookies, or API routes. Configure a form provider endpoint in the deployment environment if you want enquiries delivered without opening the visitor’s email app.
