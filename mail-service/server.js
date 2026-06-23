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

const ink = '#1a1a1a';
const accent = '#4c5ef7';

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const logoPortfolio = 'https://isaure-lohest.com/assets/media/common/images/email-logo-portfolio.png';
const logoAi = 'https://isaure-lohest.com/assets/media/common/images/email-logo-ai.png';

const renderSignature = (source) => {
  const isAi = source === 'ai.isaure-lohest.com';
  const siteUrl = isAi ? 'https://ai.isaure-lohest.com' : 'https://isaure-lohest.com';
  const siteLabel = isAi ? 'ai.isaure-lohest.com' : 'isaure-lohest.com';
  const logo = isAi ? logoAi : logoPortfolio;
  return `
<div style="border-top:1px solid #e0e0e0;padding-top:16px;margin-top:24px;">
  <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
    <tr>
      <td style="width:72px;padding-right:14px;vertical-align:middle;">
        <img src="${logo}" alt="Isaure Lohest" width="72" height="72"
             style="display:block;width:72px;height:72px;object-fit:contain;" />
      </td>
      <td style="font-size:12px;line-height:1.7;vertical-align:middle;color:#555;">
        <div style="font-size:13px;font-weight:600;color:${ink};margin-bottom:2px;">Isaure Lohest</div>
        <div style="margin-bottom:2px;">Creative web developer &amp; designer</div>
        <div><a href="mailto:hello@isaure-lohest.com" style="color:#555;text-decoration:none;">hello@isaure-lohest.com</a></div>
        <div><a href="${siteUrl}" style="color:#555;text-decoration:none;">${siteLabel}</a></div>
      </td>
    </tr>
  </table>
</div>`.trim();
};

const wrap = (content) => `
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:14px;line-height:1.7;color:${ink};max-width:560px;">
  ${content}
</div>`.trim();

const renderOwnerEmail = ({ name, email, additionalInfo, source }) => wrap(`
  <p style="margin:0 0 20px;font-size:16px;font-weight:600;">New contact message</p>
  <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;font-size:14px;border-collapse:collapse;margin-bottom:20px;">
    <tr><td style="padding:6px 0;width:100px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Name</td><td style="padding:6px 0;">${esc(name) || '—'}</td></tr>
    <tr><td style="padding:6px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Email</td><td style="padding:6px 0;"><a href="mailto:${esc(email)}" style="color:${accent};">${esc(email)}</a></td></tr>
    <tr><td style="padding:6px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Source</td><td style="padding:6px 0;">${esc(source) || '—'}</td></tr>
  </table>
  <div style="border-top:1px solid #e0e0e0;padding-top:16px;white-space:pre-wrap;">${esc(additionalInfo) || '—'}</div>
  ${renderSignature(source)}
`);

const renderConfirmationEmail = ({ name, source }) => {
  const isAi = source === 'ai.isaure-lohest.com';
  const siteUrl = isAi ? 'https://ai.isaure-lohest.com' : 'https://isaure-lohest.com';
  return wrap(`
  <p style="margin:0 0 16px;">Hi${name ? ` ${esc(name)}` : ''},</p>
  <p style="margin:0 0 16px;">Thank you for reaching out and for your interest in working together.<br/>I've received your message and I'll get back to you as soon as possible.</p>
  <p style="margin:0 0 24px;">In the meantime, feel free to have a look at my latest projects.</p>
  <p style="margin:0 0 24px;">
    <a href="${siteUrl}" style="display:inline-block;padding:10px 18px;border:1px solid ${ink};color:${ink};text-decoration:none;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">
      Visit my portfolio
    </a>
  </p>
  ${renderSignature(source)}
`);
};

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
    const mails = [
      transporter.sendMail({
        from: `"Portfolio contact" <${SMTP_USER}>`,
        to: OWNER_EMAIL || SMTP_USER,
        replyTo: email,
        subject: `New contact message from ${name || email}`,
        text: `Name: ${name}\nEmail: ${email}\nSource: ${source}\n\n${additionalInfo}`,
        html: renderOwnerEmail({ name, email, additionalInfo, source }),
      }),
      transporter.sendMail({
        from: `"Isaure Lohest" <${SMTP_USER}>`,
        to: email,
        subject: `Thank you for reaching out${name ? `, ${name}` : ''}`,
        text: `Hi${name ? ` ${name}` : ''},\n\nThank you for reaching out and for your interest in working together.\nI've received your message and I'll get back to you as soon as possible.\n\nBest,\nIsaure Lohest`,
        html: renderConfirmationEmail({ name, source }),
      }),
    ];
    await Promise.all(mails);
    return res.json({ ok: true });
  } catch (err) {
    console.error('[mail-service] send failed:', err);
    return res.status(500).json({ error: 'send failed' });
  }
});

app.listen(Number(PORT), () => console.log(`[mail-service] listening on :${PORT}`));
