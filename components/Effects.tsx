'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Effects(){
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress=document.querySelector<HTMLElement>('.scroll-progress');let lenis:Lenis|undefined;
  const tick=(time:number)=>lenis?.raf(time*1000);
  gsap.registerPlugin(ScrollTrigger);
  if(!reduced){lenis=new Lenis({duration:1.15,smoothWheel:true,touchMultiplier:1.5});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);
   const context=gsap.context(()=>{
    if(document.querySelector('.hero-video'))gsap.to('.hero-video',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
    gsap.utils.toArray<HTMLElement>('.activity-image,.feature-image').forEach((image)=>gsap.fromTo(image,{backgroundPositionY:'42%'},{backgroundPositionY:'58%',ease:'none',scrollTrigger:{trigger:image,start:'top bottom',end:'bottom top',scrub:true}}));
   });
   const update=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;if(progress)progress.style.transform=`scaleX(${max>0?window.scrollY/max:0})`};window.addEventListener('scroll',update,{passive:true});update();
   return()=>{context.revert();gsap.ticker.remove(tick);lenis?.destroy();window.removeEventListener('scroll',update)};
  }
  const update=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;if(progress)progress.style.transform=`scaleX(${max>0?window.scrollY/max:0})`};window.addEventListener('scroll',update,{passive:true});update();return()=>window.removeEventListener('scroll',update);
 },[]);
 return <div className="scroll-progress" aria-hidden="true"/>;
}
