import Image from 'next/image';

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
  activities: { label: string; slug: string }[];
};

export default function TeamProfiles({ members, lang }: { members: TeamMember[]; lang: string }) {
  const french = lang === 'fr';

  return <div className="team-grid">
    {members.map((member, index) => <article className={`team-card team-card-${index + 1}`} key={member.name}>
      <div className="team-photo-wrap">
        <Image className="team-photo-image" src={member.image} alt={member.imageAlt} width={1200} height={900} unoptimized/>
        <span className="team-photo-shade"/>
        <span className="team-role">{member.role}</span>
      </div>
      <div className="team-card-copy">
        <h2>{member.name}</h2>
        <p className="mut">{member.bio}</p>
        <p className="team-activities-label">{french ? 'ACTIVITÉS ENSEIGNÉES' : 'ACTIVITIES TAUGHT'}</p>
        <div className="team-activity-list">
          {member.activities.map(activity => <a href={`/${lang}/activites/${activity.slug}/`} key={activity.slug}>
            {activity.label}<span aria-hidden="true">↗</span>
          </a>)}
        </div>
      </div>
    </article>)}
  </div>;
}
