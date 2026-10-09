'use client';

import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { TeamLanguage, TeamMember } from '@/content/team';

export default function TeamProfiles({ members, lang, compact = false }: { members: TeamMember[]; lang: TeamLanguage; compact?: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(members.length);
  const updateFrame = useRef<number | null>(null);
  const fr = lang === 'fr';

  useLayoutEffect(() => {
    const element = track.current;
    const initialCard = element?.children[members.length] as HTMLElement | undefined;
    if (!element || !initialCard) return;
    const align = getComputedStyle(initialCard).scrollSnapAlign;
    const rect = initialCard.getBoundingClientRect();
    const trackRect = element.getBoundingClientRect();
    const target = align.includes('center') ? trackRect.left + element.clientWidth / 2 : trackRect.left + rect.width / 2;
    element.scrollLeft += rect.left + rect.width / 2 - target;
  }, [members.length]);

  useEffect(() => () => {
    if (updateFrame.current !== null) cancelAnimationFrame(updateFrame.current);
  }, []);

  function updateTrack() {
    const element = track.current;
    if (!element || updateFrame.current !== null) return;
    updateFrame.current = requestAnimationFrame(() => {
      updateFrame.current = null;
      const cards = Array.from(element.children) as HTMLElement[];
      if (!cards.length) return;
      const firstRect = cards[0].getBoundingClientRect();
      const trackRect = element.getBoundingClientRect();
      const align = getComputedStyle(cards[0]).scrollSnapAlign;
      const target = align.includes('center') ? trackRect.left + element.clientWidth / 2 : trackRect.left + firstRect.width / 2;
      let closest = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - target);
        if (distance < closestDistance) {
          closest = index;
          closestDistance = distance;
        }
      });
      let recycled = closest;
      if (closest < members.length) recycled = closest + members.length;
      else if (closest >= members.length * 2) recycled = closest - members.length;
      if (recycled !== closest) {
        const snap = element.style.scrollSnapType;
        element.style.scrollSnapType = 'none';
        element.scrollLeft += cards[recycled].offsetLeft - cards[closest].offsetLeft;
        requestAnimationFrame(() => { element.style.scrollSnapType = snap; });
      }
      setActiveSlide(current => current === recycled ? current : recycled);
    });
  }

  function move(direction: -1 | 1) {
    const element = track.current;
    const first = element?.children[activeSlide] as HTMLElement | undefined;
    if (!element || !first) return;
    const gap = parseFloat(getComputedStyle(element).columnGap || '0');
    element.scrollBy({ left: direction * (first.offsetWidth + gap), behavior: 'smooth' });
  }

  return <div className={`team-carousel${compact ? ' team-carousel-compact' : ''}`} role="region" aria-roledescription={fr ? 'carrousel' : 'carousel'} aria-label={fr ? 'Les coachs ONYX' : 'ONYX coaches'}>
    <div className="team-carousel-controls">
      <span className="team-carousel-count" aria-live="polite">{String((activeSlide % members.length) + 1).padStart(2, '0')} <i>/</i> {String(members.length).padStart(2, '0')}</span>
      <button type="button" className="team-carousel-arrow" aria-label={fr ? 'Coach précédent' : 'Previous coach'} onClick={() => move(-1)}>←</button>
      <button type="button" className="team-carousel-arrow" aria-label={fr ? 'Coach suivant' : 'Next coach'} onClick={() => move(1)}>→</button>
    </div>
    <div className="team-carousel-track" ref={track} onScroll={updateTrack} onTouchEnd={updateTrack}>
      {[0, 1, 2].flatMap(copy => members.map((member, memberIndex) => {
        const index = copy * members.length + memberIndex;
        const isActive = index === activeSlide;
        const isPreview = index === activeSlide + 1;
        return <article className={`team-card${isActive ? ' is-active' : ''}${isPreview ? ' is-preview' : ''}`} key={`${copy}-${member.slug}`} role="group" aria-roledescription={fr ? 'diapositive' : 'slide'} aria-label={`${member.name}, ${memberIndex + 1} ${fr ? 'sur' : 'of'} ${members.length}`}>
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
            <a className="team-reveal" href={`/${lang}/equipe/${member.slug}/`}>
              {fr ? 'VOIR LE PROFIL' : 'VIEW PROFILE'} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>;
      }))}
    </div>
    <p className="team-carousel-hint">{fr ? 'Faites glisser pour découvrir chaque coach · Touchez « Voir le profil ».' : 'Swipe to discover each coach · Tap “View profile”.'}</p>
  </div>;
}
