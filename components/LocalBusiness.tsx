import cfg from '@/site.config';

export default function LocalBusiness() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    '@id': `${cfg.domain}/#club`,
    name: cfg.name,
    url: cfg.domain,
    image: `${cfg.domain}/images/og-onyx-club.jpg`,
    telephone: '+41786137021',
    email: cfg.email,
    priceRange: 'CHF 40–150',
    currenciesAccepted: 'CHF',
    areaServed: ['Cologny', 'Geneva'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: "Chemin du Nant-d'Argent 1",
      addressLocality: 'Cologny',
      addressRegion: 'Geneva',
      addressCountry: 'CH',
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
