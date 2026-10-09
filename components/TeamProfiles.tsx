'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { TeamLanguage, TeamMember } from '@/content/team';

export default function TeamProfiles({ members, lang, compact = false }: { members: TeamMember[]; lang: TeamLanguage; compact?: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const fr = lang === 'fr';

  function updateTrack() {
    const element = track.current;
    if (!element) return;
    const first = element.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(element).columnGap || '0');
    const step = first ? first.offsetWidth + gap : element.clientWidth;
    setActive(step ? Math.min(members.length - 1, Math.round(element.scrollLeft / step)) : 0);
    setAtStart(element.scrollLeft <= 2);
    setAtEnd(element.scrollLeft + element.clientWidth >= element.scrollWidth - 2);
  }

  function move(direction: -1 | 1) {
    const element = track.current;
    const first = element?.firstElementChild as HTMLElement | null;
    if (!element || !first) return;
    const gap = parseFloat(getComputedStyle(element).columnGap || '0');
    element.scrollBy({ left: direction * (first.offsetWidth + gap), behavior: 'smooth' });
  }

  return <div className={`team-carousel${compact ? ' team-carousel-compact' : ''}`} role="region" aria-roledescription={fr ? 'carrousel' : 'carousel'} aria-label={fr ? 'Les coachs ONYX' : 'ONYX coaches'}>
    <div className="team-carousel-controls">
      <span className="team-carousel-count" aria-live="polite">{String(active + 1).padStart(2, '0')} <i>/</i> {String(members.length).padStart(2, '0')}</span>
      <button type="button" className="team-carousel-arrow" aria-label={fr ? 'Coach précédent' : 'Previous coach'} onClick={() => move(-1)} disabled={atStart}>←</button>
      <button type="button" className="team-carousel-arrow" aria-label={fr ? 'Coach suivant' : 'Next coach'} onClick={() => move(1)} disabled={atEnd}>→</button>
    </div>
    <div className="team-carousel-track" ref={track} onScroll={updateTrack}>
      {members.map((member, index) => {
        const isExpanded = expanded === member.name;
        return <article className={`team-card${isExpanded ? ' is-open' : ''}`} key={member.name} role="group" aria-roledescription={fr ? 'diapositive' : 'slide'} aria-label={`${member.name}, ${index + 1} ${fr ? 'sur' : 'of'} ${members.length}`}>
          <div className="team-photo-wrap">
            <Image className="team-photo-image" src={member.image} alt={`${member.role[lang]} · ${member.name}`} fill sizes="(max-width: 700px) 88vw, (max-width: 1100px) 48vw, 34vw" unoptimized/>
            <span className="team-photo-shade"/>
            <div className="team-slide-details">
              <p className="team-role">{member.role[lang]}</p>
              <h3>{member.name}</h3>
              <p className="team-slide-bio">{member.bio[lang]}</p>
              <div className="team-slide-links">
                {member.instagramUrl && member.instagram
                  ? <a href={member.instagramUrl} target="_blank" rel="noreferrer">{member.instagram} ↗</a>
                  : <span className="team-instagram-pending">{fr ? 'Instagram à confirmer' : 'Instagram to be confirmed'}</span>}
                {member.activities.map(activity => <a href={`/${lang}/activites/${activity.slug}/`} key={activity.slug}>{activity.label[lang]} ↗</a>)}
                <a href={`/${lang}/equipe/${member.slug}/`}>{fr ? 'Profil & réservation' : 'Profile & booking'} ↗</a>
              </div>
            </div>
            <button type="button" className="team-reveal" aria-expanded={isExpanded} onClick={() => setExpanded(isExpanded ? null : member.name)}>
              {isExpanded ? (fr ? 'FERMER' : 'CLOSE') : (fr ? 'VOIR LE PROFIL' : 'VIEW PROFILE')} <span aria-hidden="true">↗</span>
            </button>
          </div>
        </article>;
      })}
    </div>
    {!compact && <p className="team-carousel-hint">{fr ? 'Survolez un portrait ou touchez « Voir le profil ».' : 'Hover over a portrait or tap “View profile”.'}</p>}
  </div>;
}
