import cfg from '@/site.config';
import { slugs } from '@/content/activities';
import { teamMembers } from '@/content/team';

const indexablePages = ['', 'tarifs', 'milkshakes', 'equipe', 'faq', 'contact', 'mentions-legales', ...(cfg.event.visible ? ['evenement'] : [])];

export function GET() {
  const paths = [
    ...indexablePages.flatMap(page => ['fr', 'en'].map(lang => `/${lang}/${page ? `${page}/` : ''}`)),
    ...slugs.flatMap(slug => ['fr', 'en'].map(lang => `/${lang}/activites/${slug}/`)),
    ...teamMembers.flatMap(member => ['fr', 'en'].map(lang => `/${lang}/equipe/${member.slug}/`)),
  ];
  const urls = paths.map(path => {
    const translation = path.startsWith('/fr/') ? path.replace('/fr/', '/en/') : path.replace('/en/', '/fr/');
    return `<url><loc>${cfg.domain}${path}</loc><xhtml:link rel="alternate" hreflang="fr-CH" href="${cfg.domain}${path.startsWith('/fr/') ? path : translation}"/><xhtml:link rel="alternate" hreflang="en" href="${cfg.domain}${path.startsWith('/en/') ? path : translation}"/><xhtml:link rel="alternate" hreflang="x-default" href="${cfg.domain}${path.startsWith('/fr/') ? path : translation}"/></url>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
