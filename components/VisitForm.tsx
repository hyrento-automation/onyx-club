'use client';
import { useState } from 'react';
import type { BookingActivity } from '@/content/booking';

type T = {
  name:string;namePh?:string;email:string;emailPh?:string;phone?:string;phoneRequired?:boolean;activity?:string;message?:string;send:string;ok:string;
  activityPlaceholder?:string;activities?:readonly BookingActivity[];format?:string;formatPlaceholder?:string;
  sessionType?:string;sessionTypeOptions?:readonly string[];date?:string;time?:string;timeOptions?:readonly string[];
  level?:string;levelOptions?:readonly string[];goals?:string;goalsPh?:string;messagePh?:string;note?:string;
  choicesLabel?:string;choices?:readonly string[];
};

export default function VisitForm({t,endpoint,to,defaultActivity,defaultCoach}:{t:T;endpoint:string;to:string;defaultActivity?:string;defaultCoach?:string}){
  const [status,setStatus]=useState('');
  const [activity,setActivity]=useState(defaultActivity||'');
  const formats=t.activities?.find(item=>item.slug===activity)?.formats||[];
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const form=e.currentTarget;
    const data=new FormData(form);
    if(data.get('website'))return;
    const chosenActivity=t.activities?.find(item=>item.slug===data.get('activity'));
    if(chosenActivity)data.set('activity',chosenActivity.label);
    if(!endpoint){
      const lines:string[]=[];
      data.forEach((value,key)=>{if(key!=='website')lines.push(`${key}: ${value}`)});
      const coach=data.get('coach');
      const subject=[coach,chosenActivity?.label].filter(Boolean).join(' — ')||'Onyx Club';
      window.location.href=`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      return;
    }
    try{
      const response=await fetch(endpoint,{method:'POST',body:data,headers:{Accept:'application/json'}});
      setStatus(response.ok?'ok':'err');
    }catch{setStatus('err')}
  }

  if(status==='ok')return <p className="ok" role="status">{t.ok}</p>;
  return <form onSubmit={submit} className={t.activities||t.choices?'booking-form':''}>
    {defaultCoach&&<input type="hidden" name="coach" value={defaultCoach}/>}
    <label>{t.name}<input name="name" required placeholder={t.namePh||(t.name==='NOM'?'Prénom Nom':'First Last')} autoComplete="name"/></label>
    <label>{t.email}<input name="email" type="email" required placeholder={t.emailPh||(t.email==='E-MAIL'?'vous@exemple.com':'you@example.com')} autoComplete="email"/></label>
    {t.phone&&<label>{t.phone}<input name="phone" type="tel" autoComplete="tel" required={!!t.activities||!!t.phoneRequired}/></label>}
    {t.activities&&<div className="booking-details">
      <label>{t.activity}<select name="activity" value={activity} onChange={event=>setActivity(event.target.value)} required><option value="">{t.activityPlaceholder}</option>{t.activities.map(item=><option value={item.slug} key={item.slug}>{item.label}</option>)}</select></label>
      <label>{t.format}<select key={activity} name="session_format" defaultValue="" required disabled={!activity}><option value="">{t.formatPlaceholder}</option>{formats.map(format=><option value={format} key={format}>{format}</option>)}</select></label>
      {t.sessionType&&<label>{t.sessionType}<select name="session_type" defaultValue=""><option value="">—</option>{t.sessionTypeOptions?.map(option=><option key={option}>{option}</option>)}</select></label>}
      {t.date&&<label>{t.date}<input name="preferred_date" type="date" required/></label>}
      {t.time&&<label>{t.time}<select name="preferred_time" defaultValue=""><option value="">—</option>{t.timeOptions?.map(option=><option key={option}>{option}</option>)}</select></label>}
      {t.level&&<label>{t.level}<select name="experience_level" defaultValue=""><option value="">—</option>{t.levelOptions?.map(option=><option key={option}>{option}</option>)}</select></label>}
      {t.goals&&<label className="booking-wide">{t.goals}<input name="goal" placeholder={t.goalsPh}/></label>}
    </div>}
    {t.choices&&<fieldset className="booking-details booking-choice-list"><legend>{t.choicesLabel}</legend>{t.choices.map(choice=><label className="booking-choice" key={choice}><input type="checkbox" name="preferred_sessions" value={choice}/><span>{choice}</span></label>)}</fieldset>}
    {t.message&&<label>{t.message}<textarea name="message" rows={4} placeholder={t.messagePh}/></label>}
    {t.note&&<p className="booking-note">{t.note}</p>}
    <label className="hp" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <button className="btn" type="submit">{t.send}</button>
    {status==='err'&&<p className="err" role="alert">{t.name==='NOM'?'Une erreur est survenue. Réessayez.':'Something went wrong. Please try again.'}</p>}
  </form>;
}
