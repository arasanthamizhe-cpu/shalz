export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const htmlBody = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px;background:#fdf6ee;border-radius:12px;color:#1a1008;">
      <h2 style="font-size:1.4rem;color:#c9965a;margin-bottom:4px;">New message for Shalz ✦</h2>
      <p style="font-size:0.8rem;color:#8a7a6a;margin-bottom:24px;border-bottom:1px solid rgba(201,150,90,0.2);padding-bottom:16px;">
        via <strong>ennodu inainthiru</strong> website
      </p>
      <table style="width:100%;font-size:0.9rem;line-height:1.8;">
        <tr>
          <td style="color:#8a7a6a;width:80px;vertical-align:top;padding:4px 0;">Name</td>
          <td style="color:#1a1008;font-weight:600;padding:4px 0;">${name}</td>
        </tr>
        <tr>
          <td style="color:#8a7a6a;vertical-align:top;padding:4px 0;">From</td>
          <td style="color:#c9965a;padding:4px 0;"><a href="mailto:${email}" style="color:#c9965a;">${email}</a></td>
        </tr>
      </table>
      <div style="margin-top:20px;padding:16px;background:#ffffff;border-radius:8px;border-left:3px solid #c9965a;">
        <p style="font-size:0.85rem;color:#8a7a6a;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
        <p style="color:#1a1008;line-height:1.8;white-space:pre-wrap;">${message}</p>
      </div>
      <p style="margin-top:24px;font-size:0.8rem;color:#8a7a6a;font-style:italic;">
        Reply directly to this email to respond to ${name}.
      </p>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Shalz Website <onboarding@resend.dev>',
        to: ['ramachndranshalini@gmail.com'],
        reply_to: email,
        subject: `✦ New message from ${name} — ennodu inainthiru`,
        html: htmlBody,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
