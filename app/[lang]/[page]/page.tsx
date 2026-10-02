import Image from 'next/image';
import { notFound } from 'next/navigation';
import { bookingCopy } from '@/content/booking';
import { getLang } from '@/lib/i18n';
import fr from '@/content/pages.fr.json';
import en from '@/content/pages.en.json';
import Header from '@/components/Header';
import VisitForm from '@/components/VisitForm';
import PassTicket from '@/components/PassTicket';
import Gallery from '@/components/Gallery';
import TeamProfiles from '@/components/TeamProfiles';
import EventSchema from '@/components/EventSchema';
import Effects from '@/components/Effects';
import cfg from '@/site.config';

const pages = ['tarifs','milkshakes','equipe','galerie','blog','faq','contact','mentions-legales','evenement'] as const;
type PageKey = typeof pages[number];
export function generateStaticParams() { return ['fr','en'].flatMap(lang => pages.map(page => ({lang,page}))); }
export const dynamicParams = false;

export default function ContentPage({params}:{params:{lang:string;page:string}}) {
  if (!pages.includes(params.page as PageKey)) notFound();
  if(params.page==='evenement'&&!cfg.event.visible) notFound();
  const lang = getLang(params.lang); const d = lang === 'fr' ? fr : en;
  const page = d[params.page as PageKey] as any;
  const nav = lang === 'fr' ? ['LE CONCEPT','ACTIVITÉS','ÉVÉNEMENT','ÉQUIPE','AVIS','GALERIE','MILKSHAKES','CLIENTÈLE','RÉSERVER'] : ['CONCEPT','ACTIVITIES','EVENT','TEAM','REVIEWS','GALLERY','SHAKES','COMMUNITY','BOOK'];
  return <><Effects/>{params.page==='evenement'&&<EventSchema lang={lang}/>}<Header lang={lang} nav={nav} cta={lang==='fr'?'DEVENIR MEMBRE':'BECOME A MEMBER'}/><main className="interior"><section className="page-hero"><p className="lab">{page.label}</p><h1>{page.title}</h1><p className="mut lead">{page.intro}</p><span className="hero-orbit"/></section>
    {params.page==='evenement' ? <><section className="sec event-layout"><div><p className="lab">{new Date(`${cfg.event.date}T12:00:00Z`).toLocaleDateString(lang==='fr'?'fr-CH':'en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).toUpperCase()} · COLOGNY</p><h2>{cfg.event.status==='past'?(lang==='fr'?'Revivez la journée.':'Relive the day.'):(lang==='fr'?'La prochaine édition.':'The next edition.')}</h2><p className="mut">{lang==='fr'?'Chemin du Nant-d’Argent 1 · 8h00 – 16h00':'Chemin du Nant-d’Argent 1 · 8:00 – 16:00'}</p><p className="event-note">{lang==='fr'?'Votre première session offerte · Communauté inspirante · Inscription obligatoire':'Your first session is complimentary · Inspiring community · Registration required'}</p></div><PassTicket lang={lang} eventDate={cfg.event.date}/></section><section className="sec alt"><p className="lab">{lang==='fr'?'LE PROGRAMME':'THE PROGRAMME'}</p><div className="schedule">{page.cards.map((c:string[])=> <div className="schedule-row" key={c[0]}><b>{c[0]}</b><span>{c[1]}</span></div>)}</div></section><section className="sec waitlist"><p className="lab">{lang==='fr'?'PROCHAINE ÉDITION':'NEXT EDITION'}</p><h2>{lang==='fr'?'Soyez parmi les premiers informés.':'Be the first to hear about it.'}</h2><VisitForm t={page.form} endpoint={cfg.formEndpoint} to={cfg.email}/></section></> : <section className="sec alt content-cards">{page.banner&&<div className="promo foil">{page.banner}</div>}{page.note&&<p className="mut note">{page.note}</p>}{params.page==='galerie'?<Gallery filters={page.filters} lang={lang}/>:params.page==='equipe'?<TeamProfiles members={page.cards} lang={lang}/>:params.page==='faq'?<div className="faq-list">{page.cards.map((c:string[]) => <details key={c[0]}><summary>{c[0]}</summary><p className="mut">{c[1]}</p></details>)}</div>:<div className={`grid g3${params.page==='milkshakes'?' milkshake-cards':''}`}>{page.cards.map((c:string[],i:number)=><article className={`card content-card tone-${i%4}`} key={c[0]}>{params.page==='milkshakes'&&<Image className="milkshake-card-product" src={`/images/club/${['shake-onyx','shake-mocha','shake-matcha','shake-blue-leman'][i]}.jpg`} alt={c[0]} width={900} height={1200} unoptimized/>}<h2>{c[0]}</h2>{c.slice(1).map((line:string,j:number)=><p className={j===0&&params.page==='tarifs'?'foil price':'mut'} key={j}>{line}</p>)}</article>)}</div>}{params.page==='contact'&&<VisitForm t={bookingCopy[lang]} endpoint={cfg.formEndpoint} to={cfg.email}/>}</section>}
    {params.page==='milkshakes'&&<section className="sec shake-film"><div><p className="lab">{lang==='fr'?'LE RITUEL ONYX':'THE ONYX RITUAL'}</p><h2>{lang==='fr'?'Un shake, préparé à la minute.':'A shake, made to order.'}</h2><p className="mut">{lang==='fr'?'Des ingrédients premium, réunis avec soin après votre séance.':'Premium ingredients, carefully blended after your session.'}</p></div><video src="/video/shake-service.mp4" poster="/images/gallery/shake-service.jpg" controls playsInline preload="none" aria-label={lang==='fr'?'Préparation d’un milkshake ONYX':'An ONYX shake being prepared'}/></section>}
    </main><footer className="ft"><a className="footer-logo-link" href={`/${lang}/`} aria-label="Onyx Club home"><Image className="footer-logo-image" src="/images/brand-onyx.png" alt="Onyx Club · Sport · Lifestyle · Zen · Sur le lac Léman" width={1000} height={1000} unoptimized/></a><p>{lang==='fr'?'SUR LE LAC LÉMAN · GENÈVE':'ON LAKE GENEVA · GENEVA'} · <a href={`/${lang}/mentions-legales/`}>{lang==='fr'?'MENTIONS LÉGALES':'LEGAL NOTICE'}</a></p><p className="mut">{cfg.address} · <a href={`tel:+41786137021`}>{cfg.phone}</a> · <a href={`mailto:${cfg.email}`}>{cfg.email}</a></p></footer></>;
}
