export type TeamLanguage = 'fr' | 'en';

export type TeamMember = {
  name: string;
  role: Record<TeamLanguage, string>;
  bio: Record<TeamLanguage, string>;
  image: string;
  instagram: string;
  instagramUrl: string;
  activities: { label: Record<TeamLanguage, string>; slug: string }[];
};

export const teamMembers: TeamMember[] = [
  {
    name: 'Coach 01', role: { fr: 'Entraînement privé', en: 'Personal training' },
    bio: { fr: 'Renforcement, forme et progression à votre rythme.', en: 'Strength, fitness and progress at your pace.' },
    image: '/images/team/coach-01.jpg', instagram: '@coach_01_demo', instagramUrl: 'https://www.instagram.com/coach_01_demo/',
    activities: [{ label: { fr: 'Entraînement privé', en: 'Private training' }, slug: 'entrainement-prive' }]
  },
  {
    name: 'Coach 02', role: { fr: 'Yoga & Pilates', en: 'Yoga & Pilates' },
    bio: { fr: 'Mouvement, respiration et équilibre.', en: 'Movement, breath and balance.' },
    image: '/images/team/coach-02.jpg', instagram: '@coach_02_demo', instagramUrl: 'https://www.instagram.com/coach_02_demo/',
    activities: [{ label: { fr: 'Yoga & Pilates', en: 'Yoga & Pilates' }, slug: 'yoga-pilates' }]
  },
  {
    name: 'Coach 03', role: { fr: 'Coaching sportif', en: 'Strength coaching' },
    bio: { fr: 'Un accompagnement individuel pour développer force et confiance.', en: 'One-to-one support to build strength and confidence.' },
    image: '/images/team/coach-03.jpg', instagram: '@coach_03_demo', instagramUrl: 'https://www.instagram.com/coach_03_demo/',
    activities: [{ label: { fr: 'Entraînement privé', en: 'Private training' }, slug: 'entrainement-prive' }]
  },
  {
    name: 'Coach 04', role: { fr: 'Yoga & mobilité', en: 'Yoga & mobility' },
    bio: { fr: 'Des séances pour gagner en mobilité et retrouver de l’énergie.', en: 'Sessions to improve mobility and restore energy.' },
    image: '/images/team/coach-04.jpg', instagram: '@coach_04_demo', instagramUrl: 'https://www.instagram.com/coach_04_demo/',
    activities: [{ label: { fr: 'Stretching', en: 'Stretching' }, slug: 'stretching' }]
  },
  {
    name: 'Coach 05', role: { fr: 'Conditionnement physique', en: 'Functional training' },
    bio: { fr: 'Entraînement dynamique axé sur la force et l’endurance.', en: 'Dynamic training focused on strength and endurance.' },
    image: '/images/team/coach-05.jpg', instagram: '@coach_05_demo', instagramUrl: 'https://www.instagram.com/coach_05_demo/',
    activities: [{ label: { fr: 'Strong Nation / Circle Mobility', en: 'Strong Nation / Circle Mobility' }, slug: 'strong-nation' }]
  },
  {
    name: 'Coach 06', role: { fr: 'Boxe & sports de combat', en: 'Boxing & combat sports' },
    bio: { fr: 'Technique, intensité maîtrisée et progression.', en: 'Technique, controlled intensity and steady progress.' },
    image: '/images/team/coach-06.jpg', instagram: '@coach_06_demo', instagramUrl: 'https://www.instagram.com/coach_06_demo/',
    activities: [{ label: { fr: 'Sports de combat', en: 'Combat sports' }, slug: 'boxe' }]
  }
];
