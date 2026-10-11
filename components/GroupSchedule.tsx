const timetable = [
  { day: { fr: 'Lundi', en: 'Monday' }, sessions: [
    { name: { fr: 'Strong Mobility', en: 'Strong Mobility' }, time: '10:30' },
    { name: { fr: 'Pilates', en: 'Pilates' }, time: '11:30' },
    { name: { fr: 'Coaching mental', en: 'Mental Coaching' }, time: '18:00' },
  ] },
  { day: { fr: 'Mardi', en: 'Tuesday' }, sessions: [
    { name: { fr: 'Pilates', en: 'Pilates' }, time: '09:30' },
    { name: { fr: 'Boxe', en: 'Boxing' }, time: '12:30' },
  ] },
  { day: { fr: 'Mercredi', en: 'Wednesday' }, sessions: [
    { name: { fr: 'Yoga', en: 'Yoga' }, time: '09:30' },
    { name: { fr: 'Boxe Kids', en: 'Kids Boxing' }, time: '14:00' },
    { name: { fr: 'Danse Disco', en: 'Disco Dance' }, time: '19:00' },
  ] },
  { day: { fr: 'Jeudi', en: 'Thursday' }, sessions: [
    { name: { fr: 'Zumba', en: 'Zumba' }, time: '09:30' },
    { name: { fr: 'Stretching', en: 'Stretching' }, time: '10:30' },
    { name: { fr: 'Running', en: 'Running' }, time: '18:00' },
  ] },
  { day: { fr: 'Vendredi', en: 'Friday' }, sessions: [
    { name: { fr: 'Pilates', en: 'Pilates' }, time: '09:30' },
    { name: { fr: 'Strong Mobility', en: 'Strong Mobility' }, time: '11:00' },
  ] },
  { day: { fr: 'Samedi', en: 'Saturday' }, sessions: [
    { name: { fr: 'Cardio', en: 'Cardio' }, time: '09:00' },
    { name: { fr: 'Danse Salsa', en: 'Salsa Dance' }, time: '10:30' },
  ] },
] as const;

export default function GroupSchedule({ lang }: { lang: 'fr' | 'en' }) {
  const fr = lang === 'fr';
  return <section className="group-schedule" id="planning-collectif" aria-labelledby="group-schedule-title">
    <header className="group-schedule-heading">
      <p className="lab">{fr ? 'COURS COLLECTIFS' : 'GROUP CLASSES'}</p>
      <h2 id="group-schedule-title">{fr ? 'Le planning de la semaine.' : 'Your weekly class schedule.'}</h2>
      <p className="mut">{fr ? 'Des séances en petit groupe, dans les espaces ONYX.' : 'Small-group sessions, held inside ONYX.'}</p>
    </header>
    <div className="group-schedule-grid">
      {timetable.map(({ day, sessions }) => <section className="group-schedule-day" key={day.en} aria-label={day[lang]}>
        <h3>{day[lang]}</h3>
        <ul>{sessions.map(({ name, time }) => <li key={`${name.en}-${time}`}>
          <span>{name[lang]}</span><time>{time}</time>
        </li>)}</ul>
      </section>)}
    </div>
    <div className="group-schedule-footer">
      <div><b>{fr ? '40 CHF' : 'CHF 40'}</b><span>{fr ? 'par cours' : 'per class'}</span></div>
      <p>{fr ? 'À partir de 3 participants · 8 personnes maximum' : 'At least 3 participants · maximum 8 people'}</p>
      <a className="btn" href={`/${lang}/contact/`}>{fr ? 'RÉSERVER UN COURS' : 'BOOK A CLASS'} ↗</a>
    </div>
  </section>;
}
