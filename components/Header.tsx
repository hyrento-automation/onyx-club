'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
const destinations = ['concept','activites','evenement','equipe','avis','milkshakes','clientele','reserver'];
const sectionDestinations:Record<string,string>={concept:'concept',activites:'activites',avis:'avis',clientele:'clientele',reserver:'reserver'};
export default function Header({ lang, nav, cta }: { lang: string; nav: string[]; cta: string }) {
  const [scrolled,setScrolled]=useState(false); const [open,setOpen]=useState(false);
  useEffect(()=>{const f=()=>setScrolled(window.scrollY>32);window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[]);
  const path=usePathname() || `/${lang}/`;
  useEffect(()=>setOpen(false),[path]);
  useEffect(()=>{
    if(!open)return;
    const previousOverflow=document.documentElement.style.overflow;
    document.documentElement.style.overflow='hidden';
    return()=>{document.documentElement.style.overflow=previousOverflow};
  },[open]);
  const other=path.replace(`/${lang}/`,`/${lang==='fr'?'en':'fr'}/`);
  const section=(id:string)=>path===`/${lang}/`?`#${id}`:`/${lang}/#${id}`;
  const links=nav.map((n,i)=>{const dest=destinations[i];const anchor=sectionDestinations[dest];return <a key={n} href={anchor?section(anchor):`/${lang}/${dest}/`} onClick={()=>setOpen(false)}>{n}</a>});
  return <>
    <header className={`hd${scrolled?' sc':''}`}>
      <a href={`/${lang}/`} className="brand" aria-label="Onyx Club home"><Image className="brand-logo" src="/images/brand-onyx.png" alt="ONYX Club · Sport · Lifestyle · Zen" width={1311} height={1223} unoptimized/></a>
      <nav className="desktop-nav" aria-label={lang==='fr'?'Navigation principale':'Main navigation'}>{links}</nav>
      <div className="hr"><a className="language" href={other} aria-label={lang==='fr'?'Switch language to English':'Passer le site en français'} title={lang==='fr'?'English':'Français'}>{lang==='fr'?'🇫🇷':'🇬🇧'}</a><a className="btn sm" href={`/${lang}/contact/`}>{cta}</a><button className={`menu-toggle${open?' open':''}`} aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}><span/><span/></button></div>
    </header>
    <nav id="mobile-menu" className={`mobile-menu${open?' open':''}`} aria-label={lang==='fr'?'Navigation mobile':'Mobile navigation'} aria-hidden={!open}>{links}</nav>
  </>;
}
