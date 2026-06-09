import express from 'express';
import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT = '465',
  SMTP_USER,
  SMTP_PASS,
  OWNER_EMAIL,
  PORT = '8787',
  ALLOWED_ORIGIN = '',
} = process.env;

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.error('[mail-service] SMTP config incomplete (SMTP_HOST, SMTP_USER, SMTP_PASS required).');
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

// DA email (reprise des couleurs du portfolio)
const ink = '#302b29';
const link = '#4c5ef7';
const pageBg = '#ece7e1';
const cardBg = '#f8f8f6';

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const renderEmail = ({ name, email, additionalInfo, source }) => `
<div style="background:${pageBg};padding:24px;font-family:'Red Hat Text',system-ui,-apple-system,'Segoe UI',sans-serif;color:${ink};">
  <div style="max-width:560px;margin:0 auto;background:${cardBg};border:1px solid ${ink};padding:28px;">
    <h1 style="margin:0 0 18px;font-size:18px;text-transform:uppercase;letter-spacing:0.08em;color:${ink};">
      New contact message
    </h1>
    <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;font-size:14px;line-height:1.6;">
      <tr><td style="padding:4px 0;width:120px;color:${link};text-transform:uppercase;font-size:12px;">Name</td><td style="padding:4px 0;">${esc(name) || '—'}</td></tr>
      <tr><td style="padding:4px 0;color:${link};text-transform:uppercase;font-size:12px;">Email</td><td style="padding:4px 0;"><a href="mailto:${esc(email)}" style="color:${ink};">${esc(email)}</a></td></tr>
      <tr><td style="padding:4px 0;color:${link};text-transform:uppercase;font-size:12px;">Source</td><td style="padding:4px 0;">${esc(source) || '—'}</td></tr>
    </table>
    <div style="margin-top:18px;border-top:1px solid ${ink};padding-top:18px;white-space:pre-wrap;font-size:14px;line-height:1.6;">${esc(additionalInfo) || '—'}</div>
  </div>
</div>`.trim();

const app = express();
app.use(express.json({ limit: '64kb' }));

// CORS optionnel (utile si le service est sur un sous-domaine ; inutile derrière
// un reverse-proxy same-origin via Apache).
app.use((req, res, next) => {
  if (ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  return next();
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/api/contact', async (req, res) => {
  const { name = '', email = '', additionalInfo = '', source = '' } = req.body ?? {};

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'invalid email' });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio contact" <${SMTP_USER}>`,
      to: OWNER_EMAIL || SMTP_USER,
      replyTo: email,
      subject: `New contact message from ${name || email}`,
      text: `Name: ${name}\nEmail: ${email}\nSource: ${source}\n\n${additionalInfo}`,
      html: renderEmail({ name, email, additionalInfo, source }),
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error('[mail-service] send failed:', err);
    return res.status(500).json({ error: 'send failed' });
  }
});

app.listen(Number(PORT), () => console.log(`[mail-service] listening on :${PORT}`));
