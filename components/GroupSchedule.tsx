const timetable = [
  { day: { fr: 'Lundi', en: 'Monday' }, sessions: [['Pilates', '09:30'], ['Strong Mobility', '16:00'], ['Coaching mental', '18:00']] },
  { day: { fr: 'Mardi', en: 'Tuesday' }, sessions: [['Coaching mental', '09:30'], ['Boxe', '12:30'], ['Zumba', '18:00']] },
  { day: { fr: 'Mercredi', en: 'Wednesday' }, sessions: [['Yoga', '09:30'], ['Boxe Kids', '14:00'], ['Danse Disco', '19:00']] },
  { day: { fr: 'Jeudi', en: 'Thursday' }, sessions: [['Stretching', '10:30'], ['Running', '18:00']] },
  { day: { fr: 'Vendredi', en: 'Friday' }, sessions: [['Pilates', '09:30'], ['Strong Mobility', '15:00']] },
  { day: { fr: 'Samedi', en: 'Saturday' }, sessions: [['Cardio', '09:00'], ['Danse Salsa', '10:30']] },
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
        <ul>{sessions.map(([name, time]) => <li key={`${name}-${time}`}>
          <span>{name}</span><time>{time}</time>
        </li>)}</ul>
      </section>)}
    </div>
    <div className="group-schedule-footer">
      <div><b>{fr ? '40 CHF' : 'CHF 40'}</b><span>{fr ? 'par cours · 1 heure' : 'per class · 1 hour'}</span></div>
      <p>{fr ? 'À partir de 3 participants · 8 personnes maximum' : 'At least 3 participants · maximum 8 people'}</p>
      <a className="btn" href={`/${lang}/contact/`}>{fr ? 'RÉSERVER UN COURS' : 'BOOK A CLASS'} ↗</a>
    </div>
  </section>;
}
