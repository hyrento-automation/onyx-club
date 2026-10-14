import { Resend } from 'resend';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  if (!apiKey || !webhookSecret) {
    return Response.json({ error: 'Inbound email is not configured.' }, { status: 503 });
  }

  let event;
  try {
    const resend = new Resend(apiKey);
    event = resend.webhooks.verify({
      payload: await request.text(),
      headers: {
        id: request.headers.get('svix-id') || '',
        timestamp: request.headers.get('svix-timestamp') || '',
        signature: request.headers.get('svix-signature') || '',
      },
      webhookSecret,
    });
  } catch {
    return Response.json({ error: 'Invalid webhook signature.' }, { status: 400 });
  }

  if (event.type !== 'email.received') return Response.json({ ok: true });

  const { email_id: emailId, to = [], received_for: receivedFor = [] } = event.data;
  const recipients = [...to, ...receivedFor].map((address) => address.toLowerCase());
  if (!recipients.includes('contact@onyxclub.ch')) return Response.json({ ok: true });

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.receiving.forward({
    emailId,
    from: process.env.RESEND_FROM_EMAIL || 'Onyx Club <contact@onyxclub.ch>',
    to: process.env.OWNER_EMAIL || 'Cleopatrefoodtruck@gmail.com',
  }, { idempotencyKey: `forward-inbound-${emailId}` });

  if (error) {
    console.error('Resend could not forward an inbound email:', error.name, error.message);
    return Response.json({ error: 'Inbound email forwarding failed.' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
