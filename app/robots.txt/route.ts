import cfg from '@/site.config';
export function GET(){return new Response(`User-agent: *\nAllow: /\nSitemap: ${cfg.domain}/sitemap.xml\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}})}
