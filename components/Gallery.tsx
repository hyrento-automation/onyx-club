'use client';
import { useState } from 'react';
type Props={filters:string[];lang:string};
type MediaItem={title:string;category:string;video?:string;image?:string;poster?:string;fit?:'contain'|'cover'};
export default function Gallery({filters,lang}:Props){
  const[active,setActive]=useState(filters[0]);
  const[selected,setSelected]=useState<MediaItem|null>(null);
  const photos:MediaItem[]=lang==='fr' ? [
    {title:'Le studio ONYX',category:'Club',image:'/images/club/club-training-studio.jpg'},
    {title:'La villa ONYX',category:'Club',image:'/images/club/club-exterior.jpg'},
    {title:'Le salon d’accueil',category:'Club',image:'/images/club/club-lounge.jpg'},
    {title:'L’entrée du club',category:'Club',image:'/images/club/club-entrance.jpg'},
    {title:'Les vestiaires',category:'Club',image:'/images/club/club-locker-room.jpg'},
    {title:'Les douches',category:'Club',image:'/images/club/club-showers.jpg'},
    {title:'La salle de soins',category:'Club',image:'/images/club/club-vanity.jpg'},
    {title:'Boxe au club',category:'Activités',image:'/images/club/activity-boxing-coaching.jpg'},
    {title:'Coaching privé',category:'Activités',image:'/images/club/activity-personal-training.jpg'},
    {title:'Yoga en studio',category:'Activités',image:'/images/club/activity-yoga.jpg'},
    {title:'Pilates en studio',category:'Activités',image:'/images/club/activity-pilates.jpg'},
    {title:'Cours collectif',category:'Activités',image:'/images/club/activity-group-fitness.jpg'},
    {title:'Étirements guidés',category:'Activités',image:'/images/club/activity-stretching.jpg'},
    {title:'Préparation mentale',category:'Activités',image:'/images/club/activity-personal-development.jpg'},
    {title:'La communauté ONYX',category:'Événements',image:'/images/club/club-terrace-community.jpg'},
    {title:'L’espace détente',category:'Club',image:'/images/club/club-window-seating.jpg'},
    {title:'Boxe technique',category:'Activités',image:'/images/club/activity-boxing-technique.jpg'},
    {title:'Boxe avec coach',category:'Activités',image:'/images/club/activity-boxing-session.jpg'}
  ] : [
    {title:'The ONYX studio',category:'Club',image:'/images/club/club-training-studio.jpg'},
    {title:'The ONYX villa',category:'Club',image:'/images/club/club-exterior.jpg'},
    {title:'Reception lounge',category:'Club',image:'/images/club/club-lounge.jpg'},
    {title:'Club entrance',category:'Club',image:'/images/club/club-entrance.jpg'},
    {title:'Changing room',category:'Club',image:'/images/club/club-locker-room.jpg'},
    {title:'Private showers',category:'Club',image:'/images/club/club-showers.jpg'},
    {title:'Club washroom',category:'Club',image:'/images/club/club-vanity.jpg'},
    {title:'Boxing at ONYX',category:'Activities',image:'/images/club/activity-boxing-coaching.jpg'},
    {title:'Personal training',category:'Activities',image:'/images/club/activity-personal-training.jpg'},
    {title:'Yoga in the studio',category:'Activities',image:'/images/club/activity-yoga.jpg'},
    {title:'Pilates in the studio',category:'Activities',image:'/images/club/activity-pilates.jpg'},
    {title:'Group class',category:'Activities',image:'/images/club/activity-group-fitness.jpg'},
    {title:'Guided stretching',category:'Activities',image:'/images/club/activity-stretching.jpg'},
    {title:'Mental preparation',category:'Activities',image:'/images/club/activity-personal-development.jpg'},
    {title:'The ONYX community',category:'Events',image:'/images/club/club-terrace-community.jpg'},
    {title:'Window-side lounge',category:'Club',image:'/images/club/club-window-seating.jpg'},
    {title:'Boxing technique',category:'Activities',image:'/images/club/activity-boxing-technique.jpg'},
    {title:'Coach-led boxing',category:'Activities',image:'/images/club/activity-boxing-session.jpg'}
  ];
  const videos:MediaItem[]=lang==='fr' ? [
    {title:'Cours en action',category:'Activités',video:'/video/studio-class.mp4',poster:'/images/gallery/studio-class.jpg'},
    {title:'Pilates au studio',category:'Activités',video:'/video/studio-pilates.mp4',poster:'/images/gallery/studio-pilates.jpg'},
    {title:'Les espaces du club',category:'Club',video:'/video/club-interior.mp4',poster:'/images/gallery/club-interior.jpg'}
  ] : [
    {title:'A class in motion',category:'Activities',video:'/video/studio-class.mp4',poster:'/images/gallery/studio-class.jpg'},
    {title:'Pilates in the studio',category:'Activities',video:'/video/studio-pilates.mp4',poster:'/images/gallery/studio-pilates.jpg'},
    {title:'Inside the club',category:'Club',video:'/video/club-interior.mp4',poster:'/images/gallery/club-interior.jpg'}
  ];
  const media=[...photos,...videos];
  const shown=active===filters[0]?media:media.filter(item=>item.category===active);
  return <>
    <div className="gallery-filters" role="group" aria-label={lang==='fr'?'Filtrer la galerie':'Filter the gallery'}>{filters.map(filter=><button type="button" key={filter} className={active===filter?'selected':''} onClick={()=>setActive(filter)}>{filter}</button>)}</div>
    <div className="gallery-grid">{shown.map((item,i)=>{
      const video=item.video;
      const bg=item.image||item.poster;
      return <button type="button" key={`${item.category}-${item.title}`} className={`gallery-tile gallery-tile-${i%6}${bg?' gallery-image':''}${video?' gallery-video':''}`} style={bg?{backgroundImage:`linear-gradient(0deg,#070707bb,#07070718),url(${bg})`,backgroundSize:item.fit||'cover',backgroundRepeat:'no-repeat',backgroundColor:item.fit==='contain'?'#12100e':undefined}:undefined} onClick={()=>setSelected(item)} aria-label={`${lang==='fr'?'Afficher':'View'} ${item.title}`}>
        <span>{item.category}</span><strong>{item.title}</strong>{video&&<small className="gallery-play">▶ {lang==='fr'?'VOIR LA VIDÉO':'PLAY VIDEO'}</small>}
      </button>;
    })}</div>
    {selected&&<div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onClick={()=>setSelected(null)}>
      <button className="lightbox-close" type="button" onClick={()=>setSelected(null)} aria-label={lang==='fr'?'Fermer':'Close'}>×</button>
      {selected.video?<video className="gallery-player" src={selected.video} controls autoPlay playsInline onClick={event=>event.stopPropagation()} />:<div className="lightbox-photo" style={selected.image?{backgroundImage:`linear-gradient(0deg,#070707aa,#07070712),url(${selected.image})`,backgroundSize:selected.fit||'cover',backgroundRepeat:'no-repeat',backgroundColor:selected.fit==='contain'?'#12100e':undefined}:undefined} onClick={event=>event.stopPropagation()}><small>{selected.category}</small><h2>{selected.title}</h2></div>}
    </div>}
  </>;
}
