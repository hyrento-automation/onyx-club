'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Effects(){
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer=window.matchMedia('(pointer: fine)').matches;
  const progress=document.querySelector<HTMLElement>('.scroll-progress');let lenis:Lenis|undefined;let progressFrame=0;
  const tick=(time:number)=>lenis?.raf(time*1000);
  const update=()=>{
   if(progressFrame)return;
   progressFrame=requestAnimationFrame(()=>{
    progressFrame=0;
    const max=document.documentElement.scrollHeight-window.innerHeight;
    if(progress)progress.style.transform=`scaleX(${max>0?window.scrollY/max:0})`;
   });
  };
  gsap.registerPlugin(ScrollTrigger);
  if(!reduced&&finePointer){lenis=new Lenis({duration:.85,smoothWheel:true,touchMultiplier:1,anchors:true});lenis.on('scroll',()=>{ScrollTrigger.update();update()});gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);
   const context=gsap.context(()=>{
    if(document.querySelector('.hero-video'))gsap.to('.hero-video',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
    gsap.utils.toArray<HTMLElement>('.activity-image,.feature-image').forEach((image)=>gsap.fromTo(image,{backgroundPositionY:'42%'},{backgroundPositionY:'58%',ease:'none',scrollTrigger:{trigger:image,start:'top bottom',end:'bottom top',scrub:true}}));
   });
   window.addEventListener('scroll',update,{passive:true});update();
   return()=>{context.revert();gsap.ticker.remove(tick);lenis?.destroy();window.removeEventListener('scroll',update);cancelAnimationFrame(progressFrame)};
  }
  window.addEventListener('scroll',update,{passive:true});update();return()=>{window.removeEventListener('scroll',update);cancelAnimationFrame(progressFrame)};
 },[]);
 return <div className="scroll-progress" aria-hidden="true"/>;
}
