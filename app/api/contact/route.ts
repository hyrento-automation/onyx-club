import { Resend } from 'resend';

export const runtime = 'nodejs';

const ownerEmail = process.env.OWNER_EMAIL || 'Cleopatrefoodtruck@gmail.com';
const sender = process.env.RESEND_FROM_EMAIL || 'Onyx Club <contact@onyxclub.ch>';
const allowedFields = new Set([
  'name',
  'email',
  'phone',
  'coach',
  'activity',
  'session_format',
  'session_type',
  'preferred_date',
  'preferred_time',
  'experience_level',
  'goal',
  'preferred_sessions',
  'message',
]);

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]!);
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const requestHost = new URL(request.url).host;
  const fetchSite = request.headers.get('sec-fetch-site');
  let originHost: string | undefined;
  try {
    originHost = origin ? new URL(origin).host : undefined;
  } catch {
    return Response.json({ error: 'Invalid form origin.' }, { status: 403 });
  }
  if ((originHost && originHost !== requestHost) || fetchSite === 'cross-site') {
    return Response.json({ error: 'Cross-origin form submissions are not accepted.' }, { status: 403 });
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.startsWith('multipart/form-data') && !contentType.startsWith('application/x-www-form-urlencoded')) {
    return Response.json({ error: 'Invalid form submission.' }, { status: 415 });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: 'Email service is not configured.' }, { status: 503 });
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 32_000) {
    return Response.json({ error: 'Form is too large.' }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: 'Invalid form submission.' }, { status: 400 });
  }

  if (form.get('website')) return Response.json({ ok: true });

  const values = new Map<string, string>();
  form.forEach((value, key) => {
    if (!allowedFields.has(key) || typeof value !== 'string') return;
    const previous = values.get(key);
    values.set(key, `${previous ? `${previous}, ` : ''}${value.trim()}`.slice(0, 2000));
  });

  const name = values.get('name');
  const email = values.get('email');
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Name and a valid email are required.' }, { status: 400 });
  }

  const coachOrActivity = values.get('coach') || values.get('activity') || 'Website enquiry';
  const subject = `Onyx Club · ${coachOrActivity.replace(/[\r\n]/g, ' ').slice(0, 100)}`;
  const rows = Array.from(values.entries()).map(([key, value]) =>
    `<tr><th style="padding:8px;text-align:left;vertical-align:top">${escapeHtml(key)}</th><td style="padding:8px">${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`,
  ).join('');

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: sender,
    to: [ownerEmail],
    replyTo: email,
    subject,
    html: `<div style="font-family:Arial,sans-serif;color:#21180f"><h2>New website enquiry</h2><table style="border-collapse:collapse">${rows}</table></div>`,
    text: Array.from(values.entries()).map(([key, value]) => `${key}: ${value}`).join('\n'),
  });

  if (error) {
    console.error('Resend could not deliver a website enquiry:', error.name, error.message);
    return Response.json({ error: 'Email could not be sent.' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
