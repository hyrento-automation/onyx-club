'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
const destinations = ['concept','activites','evenement','equipe','avis','galerie','milkshakes','clientele','reserver'];
const sectionDestinations:Record<string,string>={concept:'concept',activites:'activites',avis:'avis',clientele:'clientele',reserver:'reserver'};
export default function Header({ lang, nav, cta }: { lang: string; nav: string[]; cta: string }) {
  const [scrolled,setScrolled]=useState(false); const [hidden,setHidden]=useState(false); const [open,setOpen]=useState(false);
  useEffect(()=>{let previous=window.scrollY;const f=()=>{const y=window.scrollY;setScrolled(y>32);setHidden(y>220&&y>previous+3);if(y<80||y<previous-3)setHidden(false);previous=y};window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[]);
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
    <header className={`hd${scrolled?' sc':''}${hidden&&!open?' hide':''}`}>
      <a href={`/${lang}/`} className="brand" aria-label="Onyx Club home"><Image className="brand-mark" src="/images/brand-onyx-mark.png" alt="" aria-hidden="true" width={563} height={563} unoptimized/><span>ONYX<small>CLUB</small></span></a>
      <nav className="desktop-nav" aria-label={lang==='fr'?'Navigation principale':'Main navigation'}>{links}</nav>
      <div className="hr"><a className="language" href={other}>{lang==='fr'?'EN':'FR'}</a><a className="btn sm" href={`/${lang}/contact/`}>{cta}</a><button aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}><span/><span/></button></div>
    </header>
    <nav id="mobile-menu" className={`mobile-menu${open?' open':''}`} aria-label={lang==='fr'?'Navigation mobile':'Mobile navigation'} aria-hidden={!open}>{links}</nav>
  </>;
}
