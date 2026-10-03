import Image from 'next/image';
import type { TeamLanguage, TeamMember } from '@/content/team';

export default function TeamPreview({ members, lang }: { members: TeamMember[]; lang: TeamLanguage }) {
  return <div className="home-team-grid">
    {members.map(member => <article className="home-team-card" key={member.name}>
      <Image src={member.image} alt={`${member.role[lang]} · ${member.name}`} fill sizes="(max-width: 760px) 90vw, 30vw" className="home-team-photo" unoptimized/>
      <span className="home-team-shade"/>
      <div className="home-team-copy">
        <p className="home-team-role">{member.role[lang]}</p>
        <h3>{member.name}</h3>
        <div className="home-team-links">
          <a href={member.instagramUrl} target="_blank" rel="noreferrer">{member.instagram} ↗</a>
          {member.activities.map(activity => <a href={`/${lang}/activites/${activity.slug}/`} key={activity.slug}>{activity.label[lang]} ↗</a>)}
        </div>
      </div>
    </article>)}
  </div>;
}
