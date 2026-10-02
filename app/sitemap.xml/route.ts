import cfg from '@/site.config';
import { slugs } from '@/content/activities';
const pages=['','tarifs','milkshakes','equipe','galerie','blog','faq','contact','mentions-legales',...(cfg.event.visible?['evenement']:[])];
export function GET(){const urls=pages.flatMap(p=>['fr','en'].map(l=>`${cfg.domain}/${l}/${p?p+'/':''}`)).concat(slugs.flatMap(s=>['fr','en'].map(l=>`${cfg.domain}/${l}/activites/${s}/`)));const xml=`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(loc=>`<url><loc>${loc}</loc></url>`).join('')}</urlset>`;return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8'}})}
