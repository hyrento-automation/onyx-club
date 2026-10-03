export type BookingActivity = {
  slug: string;
  label: string;
  formats: string[];
};

export const homeLeadCopy = {
  fr: {
    name: 'NOM COMPLET',
    namePh: 'Prénom Nom',
    email: 'E-MAIL',
    emailPh: 'vous@exemple.com',
    send: 'ÊTRE RECONTACTÉ',
    ok: 'Merci. L’équipe ONYX vous recontactera bientôt.'
  },
  en: {
    name: 'FULL NAME',
    namePh: 'First Last',
    email: 'EMAIL',
    emailPh: 'you@example.com',
    send: 'REQUEST A CALL BACK',
    ok: 'Thank you. The ONYX team will be in touch soon.'
  }
} as const;

export const bookingCopy = {
  fr: {
    name: 'NOM COMPLET',
    namePh: 'Prénom Nom',
    email: 'E-MAIL',
    phone: 'TÉLÉPHONE',
    activity: 'ACTIVITÉ',
    activityPlaceholder: 'Choisissez une activité',
    format: 'SÉANCE SOUHAITÉE',
    formatPlaceholder: 'Choisissez un format',
    sessionType: 'TYPE DE SÉANCE',
    sessionTypeOptions: ['Cours collectif', 'Séance individuelle', 'Duo', 'À définir avec le club'],
    date: 'DATE SOUHAITÉE',
    time: 'HORAIRE SOUHAITÉ',
    timeOptions: ['Matin · 08h00–12h00', 'Midi · 12h00–14h00', 'Après-midi · 14h00–18h00', 'Soir · après 18h00', 'Flexible'],
    level: 'VOTRE NIVEAU',
    levelOptions: ['Débutant', 'Intermédiaire', 'Avancé', 'Je reprends le sport', 'Sans préférence'],
    goals: 'VOTRE OBJECTIF',
    goalsPh: 'Que souhaitez-vous travailler ?',
    message: 'INFORMATIONS COMPLÉMENTAIRES',
    messagePh: 'Une préférence, une question ou un besoin particulier ?',
    send: 'DEMANDER UNE RÉSERVATION',
    ok: 'Merci. L’équipe ONYX vous recontactera pour confirmer le créneau demandé.',
    note: 'Votre demande sera confirmée par l’équipe ONYX selon les disponibilités.',
    activities: [
      { slug: 'yoga-pilates', label: 'Yoga & Pilates', formats: ['Yoga', 'Pilates', 'Yoga aérien'] },
      { slug: 'boxe', label: 'Sports de combat', formats: ['Boxe Technic', 'Boxe Fitness', 'Muay Thaï', 'Sparring'] },
      { slug: 'entrainement-prive', label: 'Entraînement privé', formats: ['Personal Training', 'Duo Training'] },
      { slug: 'course-a-pied', label: 'Running & endurance en intérieur', formats: ['Cardio et endurance en salle', 'Préparation running en intérieur'] },
      { slug: 'developpement-personnel', label: 'Développement personnel', formats: ['Atelier de développement personnel', 'Préparation mentale individuelle · 1h'] },
      { slug: 'bootcamp', label: 'Bootcamp', formats: ['Bootcamp collectif'] },
      { slug: 'strong-nation', label: 'Strong Nation / Circle Mobility', formats: ['Strong Nation', 'Circle Mobility'] },
      { slug: 'stretching', label: 'Stretching', formats: ['Stretching et récupération'] }
    ] as BookingActivity[]
  },
  en: {
    name: 'FULL NAME',
    namePh: 'First Last',
    email: 'EMAIL',
    phone: 'PHONE',
    activity: 'ACTIVITY',
    activityPlaceholder: 'Choose an activity',
    format: 'SESSION FORMAT',
    formatPlaceholder: 'Choose a format',
    sessionType: 'SESSION TYPE',
    sessionTypeOptions: ['Group class', 'One-to-one', 'Duo', 'To discuss with the club'],
    date: 'PREFERRED DATE',
    time: 'PREFERRED TIME',
    timeOptions: ['Morning · 08:00–12:00', 'Midday · 12:00–14:00', 'Afternoon · 14:00–18:00', 'Evening · after 18:00', 'Flexible'],
    level: 'YOUR EXPERIENCE',
    levelOptions: ['Beginner', 'Intermediate', 'Advanced', 'Returning to exercise', 'No preference'],
    goals: 'YOUR GOAL',
    goalsPh: 'What would you like to work on?',
    message: 'ADDITIONAL DETAILS',
    messagePh: 'Any preference, question or specific need?',
    send: 'REQUEST A BOOKING',
    ok: 'Thank you. The ONYX team will contact you to confirm your requested time.',
    note: 'The ONYX team will confirm your requested time based on availability.',
    activities: [
      { slug: 'yoga-pilates', label: 'Yoga & Pilates', formats: ['Yoga', 'Pilates', 'Aerial yoga'] },
      { slug: 'boxe', label: 'Combat sports', formats: ['Technical boxing', 'Boxing fitness', 'Muay Thai', 'Sparring'] },
      { slug: 'entrainement-prive', label: 'Private training', formats: ['Personal training', 'Duo training'] },
      { slug: 'course-a-pied', label: 'Indoor running & endurance', formats: ['Indoor cardio and endurance', 'Indoor running preparation'] },
      { slug: 'developpement-personnel', label: 'Personal development', formats: ['Personal development workshop', 'One-to-one mental preparation · 1h'] },
      { slug: 'bootcamp', label: 'Bootcamp', formats: ['Group bootcamp'] },
      { slug: 'strong-nation', label: 'Strong Nation / Circle Mobility', formats: ['Strong Nation', 'Circle Mobility'] },
      { slug: 'stretching', label: 'Stretching', formats: ['Stretching and recovery'] }
    ] as BookingActivity[]
  }
} as const;
