export function GET() {
  const expires = '2027-10-18T00:00:00.000Z';
  const body = [
    'Contact: mailto:contact@onyxclub.ch',
    `Expires: ${expires}`,
    'Preferred-Languages: fr, en',
    'Canonical: https://onyxclub.ch/.well-known/security.txt',
    '',
  ].join('\n');
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
