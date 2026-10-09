import Image from 'next/image';
import { notFound } from 'next/navigation';
import { bookingCopy } from '@/content/booking';
import { teamMembers } from '@/content/team';
import { getLang } from '@/lib/i18n';
import Header from '@/components/Header';
import Effects from '@/components/Effects';
import VisitForm from '@/components/VisitForm';
import cfg from '@/site.config';

export function generateStaticParams() {
  return ['fr', 'en'].flatMap(lang => teamMembers.map(member => ({ lang, slug: member.slug })));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { lang: string; slug: string } }) {
  const member = teamMembers.find(person => person.slug === params.slug);
  if (!member) return {};
  const lang = getLang(params.lang);
  return {
    title: `${member.name} · ${member.role[lang]} | ONYX Club`,
    description: member.bio[lang]
  };
}

export default function CoachProfile({ params }: { params: { lang: string; slug: string } }) {
  const member = teamMembers.find(person => person.slug === params.slug);
  if (!member) notFound();

  const lang = getLang(params.lang);
  const fr = lang === 'fr';
  const copy = bookingCopy[lang];
  const activities = copy.activities.filter(item => member.activities.some(activity => activity.slug === item.slug));
  const formCopy = { ...copy, activities };
  const nav = fr
    ? ['LE CONCEPT', 'ACTIVITÉS', 'ÉVÉNEMENT', 'ÉQUIPE', 'AVIS', 'MILKSHAKES', 'CLIENTÈLE', 'RÉSERVER']
    : ['CONCEPT', 'ACTIVITIES', 'EVENT', 'TEAM', 'REVIEWS', 'SHAKES', 'COMMUNITY', 'BOOK'];
  const defaultActivity = member.activities.length === 1 ? member.activities[0].slug : undefined;

  return <><Effects/><Header lang={lang} nav={nav} cta={fr ? 'RÉSERVER UNE SÉANCE' : 'BOOK A SESSION'}/><main className="coach-profile">
    <section className="coach-profile-hero">
      <div className="coach-profile-photo">
        <Image src={member.image} alt={`${member.name} · ${member.role[lang]}`} fill priority sizes="(max-width: 760px) 100vw, 48vw" unoptimized/>
      </div>
      <div className="coach-profile-intro">
        <p className="lab">{fr ? 'COACH ONYX' : 'ONYX COACH'}</p>
        <h1>{member.name}</h1>
        <p className="coach-profile-role">{member.role[lang]}</p>
        <p className="mut lead">{member.bio[lang]}</p>
        {member.instagramUrl && member.instagram
          ? <a className="text-link" href={member.instagramUrl} target="_blank" rel="noreferrer">Instagram · {member.instagram} ↗</a>
          : <p className="mut coach-instagram-pending">{fr ? 'Instagram à confirmer' : 'Instagram to be confirmed'}</p>}
        <a className="btn coach-book-cta" href="#booking">{fr ? 'DEMANDER UNE SÉANCE' : 'REQUEST A SESSION'} ↓</a>
      </div>
    </section>

    <section className="sec coach-sessions">
      <p className="lab">{fr ? 'AVEC ' + member.name.toUpperCase() : 'TRAIN WITH ' + member.name.toUpperCase()}</p>
      <h2>{fr ? 'Activités & horaires' : 'Activities & schedule'}</h2>
      <p className="mut coach-schedule-note">{fr ? 'Choisissez votre date et votre horaire préféré dans le formulaire. L’équipe ONYX confirmera le créneau disponible.' : 'Choose your preferred date and time in the form. The ONYX team will confirm an available session.'}</p>
      <div className="coach-session-list">{member.activities.map(activity => <article className="coach-session-card" key={activity.slug}>
        <div><p className="lab">{fr ? 'ACTIVITÉ' : 'ACTIVITY'}</p><h3>{activity.label[lang]}</h3><p>{fr ? 'Horaire à convenir sur demande' : 'Time arranged by request'}</p></div>
        <a className="text-link" href={`/${lang}/activites/${activity.slug}/`}>{fr ? 'DÉTAILS' : 'DETAILS'} ↗</a>
      </article>)}</div>
    </section>

    <section className="sec alt coach-booking" id="booking">
      <p className="lab">{fr ? 'RÉSERVATION PERSONNALISÉE' : 'PERSONALISED BOOKING'}</p>
      <h2>{fr ? `Réserver avec ${member.name}` : `Book with ${member.name}`}</h2>
      <p className="mut booking-intro">{fr ? 'Votre demande est transmise avec le nom du coach et l’activité sélectionnée.' : 'Your request includes this coach and your selected activity.'}</p>
      <VisitForm key={member.slug} t={formCopy} defaultActivity={defaultActivity} defaultCoach={member.name} endpoint={cfg.formEndpoint} to={cfg.email}/>
    </section>
  </main><footer className="ft"><a className="footer-logo-link" href={`/${lang}/`} aria-label="Onyx Club home"><Image className="footer-logo-image" src="/images/brand-onyx.png" alt="Onyx Club" width={1000} height={1000} unoptimized/></a><p>{member.name} · {member.role[lang]} · <a href={`/${lang}/equipe/`}>{fr ? 'TOUTE L’ÉQUIPE' : 'MEET THE TEAM'}</a></p><p className="mut">{cfg.address} · <a href={`mailto:${cfg.email}`}>{cfg.email}</a></p></footer></>;
}
