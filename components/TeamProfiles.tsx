import Image from 'next/image';
import type { TeamLanguage, TeamMember } from '@/content/team';

export default function TeamProfiles({ members, lang }: { members: TeamMember[]; lang: TeamLanguage }) {
  return <div className="team-grid">
    {members.map((member, index) => <article className={`team-card team-card-${index + 1}`} key={member.name}>
      <div className="team-photo-wrap">
        <Image className="team-photo-image" src={member.image} alt={`${member.role[lang]} · ${member.name}`} width={1200} height={1400} unoptimized/>
        <span className="team-photo-shade"/>
        <span className="team-role">{member.role[lang]}</span>
      </div>
      <div className="team-card-copy">
        <h2>{member.name}</h2>
        <p className="mut">{member.bio[lang]}</p>
        <a className="team-instagram" href={member.instagramUrl} target="_blank" rel="noreferrer">{member.instagram} ↗</a>
        <p className="team-activities-label">{lang === 'fr' ? 'ACTIVITÉS ENSEIGNÉES' : 'ACTIVITIES TAUGHT'}</p>
        <div className="team-activity-list">
          {member.activities.map(activity => <a href={`/${lang}/activites/${activity.slug}/`} key={activity.slug}>
            {activity.label[lang]}<span aria-hidden="true">↗</span>
          </a>)}
        </div>
      </div>
    </article>)}
  </div>;
}
