export type TeamLanguage = 'fr' | 'en';

export type TeamMember = {
  slug: string;
  name: string;
  role: Record<TeamLanguage, string>;
  bio: Record<TeamLanguage, string>;
  image: string;
  instagram?: string;
  instagramUrl?: string;
  activities: { label: Record<TeamLanguage, string>; slug: string }[];
};

export const teamMembers: TeamMember[] = [
  {
    slug: 'sylvain', name: 'Sylvain', role: { fr: 'Stretching & entraînement privé', en: 'Stretching & personal training' },
    bio: { fr: 'Stretching et entraînement personnel adaptés à vos objectifs.', en: 'Stretching and personal training tailored to your goals.' },
    image: '/images/team/coach-01.jpg', instagram: '@sylvain.coach.sportif', instagramUrl: 'https://www.instagram.com/sylvain.coach.sportif/',
    activities: [
      { label: { fr: 'Stretching', en: 'Stretching' }, slug: 'stretching' },
      { label: { fr: 'Entraînement privé', en: 'Personal training' }, slug: 'entrainement-prive' }
    ]
  },
  {
    slug: 'halim', name: 'Halim', role: { fr: 'Boxe', en: 'Boxing' },
    bio: { fr: 'Séances de boxe axées sur la technique et la progression.', en: 'Boxing sessions focused on technique and progress.' },
    image: '/images/team/coach-03.jpg', instagram: '@urbanboxing.gva', instagramUrl: 'https://www.instagram.com/urbanboxing.gva/',
    activities: [{ label: { fr: 'Boxe', en: 'Boxing' }, slug: 'boxe' }]
  },
  {
    slug: 'marjorie', name: 'Marjorie', role: { fr: 'Zumba & Strong Mobility', en: 'Zumba & Strong Mobility' },
    bio: { fr: 'Des séances rythmées qui associent énergie et mobilité.', en: 'Music-led sessions combining energy and mobility.' },
    image: '/images/team/coach-05.jpg', instagram: '@mayuratas.rojas', instagramUrl: 'https://www.instagram.com/mayuratas.rojas/',
    activities: [{ label: { fr: 'Zumba / Strong Mobility', en: 'Zumba / Strong Mobility' }, slug: 'strong-nation' }]
  },
  {
    slug: 'sabrina', name: 'Sabrina', role: { fr: 'Développement personnel', en: 'Personal development' },
    bio: { fr: 'Ateliers et accompagnement en développement personnel.', en: 'Workshops and personal development coaching.' },
    image: '/images/team/coach-04.jpg', instagram: '@phoenix_onyxcoach', instagramUrl: 'https://www.instagram.com/phoenix_onyxcoach/',
    activities: [{ label: { fr: 'Développement personnel', en: 'Personal development' }, slug: 'developpement-personnel' }]
  },
  {
    slug: 'melanie', name: 'Melanie', role: { fr: 'Pilates', en: 'Pilates' },
    bio: { fr: 'Séances de Pilates guidées pour renforcer et équilibrer le corps.', en: 'Guided Pilates sessions to strengthen and balance the body.' },
    image: '/images/team/coach-02.jpg',
    activities: [{ label: { fr: 'Pilates', en: 'Pilates' }, slug: 'yoga-pilates' }]
  }
];
