'use client';
import { useState } from 'react';
export default function PassTicket({ lang,eventDate='2026-09-27' }: { lang: string;eventDate?:string }) {
  const [flip, setFlip] = useState(false);
  const en = lang === 'en';
  const date=new Date(`${eventDate}T12:00:00Z`).toLocaleDateString(en?'en-GB':'fr-CH',{day:'2-digit',month:'2-digit',year:'numeric'}).replaceAll('/','.');
  return <button type="button" className={`ticket ${flip ? 'flipped' : ''}`} onClick={() => setFlip(!flip)} aria-label={en ? 'Flip event pass' : 'Retourner le pass événement'}>
    <span className="ticket-inner"><span className="ticket-face ticket-front"><small>ONYX CLUB · GENÈVE</small><b>PASS VIP</b><span>{en ? 'PRIVILEGED ACCESS' : 'ACCÈS PRIVILÉGIÉ'} <strong>{date}</strong></span><span className="ticket-code">▦ ▦ ▦ ▦ ▦ ▦ ▦</span><em>{en ? 'Tap to see the programme' : 'Toucher pour voir le programme'}</em></span>
    <span className="ticket-face ticket-back"><small>{en ? 'YOUR EXPERIENCE STARTS HERE' : 'VOTRE EXPÉRIENCE COMMENCE ICI'}</small><b>{en ? 'DAY PROGRAMME' : 'PROGRAMME'}</b>{(en ? [['09:30 – 10:30','Pilates'],['11:00 – 12:00','Yoga'],['12:00 – 13:00','Personal development'],['13:00 – 14:00','Boxing'],['14:00 – 14:45','Strong Nation / Circle Mobility'],['16:00 – 17:00','Stretching']] : [['09h30 – 10h30','Pilates'],['11h00 – 12h00','Yoga'],['12h00 – 13h00','Développement personnel'],['13h00 – 14h00','Boxe'],['14h00 – 14h45','Strong Nation / Circle Mobility'],['16h00 – 17h00','Stretching']]).map(([time, activity]) => <span key={time}><i>{time}</i>{activity}</span>)}<em>{en ? 'Tap to return' : 'Toucher pour retourner'}</em></span></span>
  </button>;
}
