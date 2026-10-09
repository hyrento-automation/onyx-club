const cfg = {
  name: 'Onyx Club',
  domain: 'https://onyxclub.ch',
  phone: '078 613 70 21',
  email: 'contact@onyxclub.ch',
  secondaryEmail: 'info@onyxclub.ch',
  address: "Chemin du Nant-d'Argent 1, Cologny (Genève)",
  currency: 'CHF',
  prices: { group: 40, single: 120 },
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || '',
  event: { date: '2026-09-27', status: 'past' as 'upcoming' | 'past', visible: true },
  hours: 'Sur réservation',
};
export default cfg;
