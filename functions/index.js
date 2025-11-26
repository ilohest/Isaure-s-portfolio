/* eslint-disable */

const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');

admin.initializeApp();

// Config SMTP depuis functions/.env
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const ownerEmail = process.env.OWNER_EMAIL || smtpUser;

// Transporteur SMTP
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

// DA mail
const primaryColor = '#4c5ef7';
const accentColor = '#a6ff00';
const pageBgColor = '#ece7e1';
const cardBgColor = '#ffffff';
const signatureImageUrl =
  'https://isaure-lohest.com/assets/img/Pages/sticker-isaure-v2-noQR-640.png';

// Trigger Firestore v2 sur contactMessages
exports.sendContactEmails = onDocumentCreated(
  {
    document: 'contactMessages/{messageId}',
    region: 'europe-west1',
  },
  async (event) => {
    const snap = event.data;
    const messageId = event.params.messageId;

    if (!snap) {
      console.error('No document data for event', messageId);
      return;
    }

    const data = snap.data() || {};

    const name = data.name || '';
    const email = data.email || '';
    const phoneNumber = data.phoneNumber || '';
    const contactMethod = data.contactMethod || '';
    const projectType = data.projectType || '';
    const numberOfPages = data.numberOfPages || '';
    const features = Array.isArray(data.features) ? data.features : [];
    const featuresOther = data.featuresOther || '';
    const visualIdentity = data.visualIdentity || '';
    const deadline = data.deadline || '';
    const additionalInfo = data.additionalInfo || '';

    const featuresText = [...features, featuresOther ? `Other: ${featuresOther}` : null]
      .filter(Boolean)
      .join(', ');

    // ---------- Mail POUR TOI ----------
    const ownerMail = {
      from: `"Portfolio contact" <${smtpUser}>`,
      to: ownerEmail,
      subject: `New contact request from ${name || 'Unknown visitor'}`,
      text: `
New contact request from your portfolio:

Name: ${name || 'N/A'}
Email: ${email || 'N/A'}
Phone: ${phoneNumber || 'N/A'}
Preferred contact method: ${contactMethod || 'N/A'}

Project type: ${projectType || 'N/A'}
Number of pages: ${numberOfPages || 'N/A'}
Features: ${featuresText || 'N/A'}
Visual identity: ${visualIdentity || 'N/A'}
Deadline: ${deadline || 'N/A'}

Additional info:
${additionalInfo || 'N/A'}
      `.trim(),
      html: `
<div style="background:${pageBgColor}; padding:24px ;">
  <div style="
    max-width:640px;
    margin:0 auto;
    background:${cardBgColor};
    border-radius:16px;
    padding:24px 20px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size:14px;
    line-height:1.6;
    color:#0f172a;
  ">
    <p style="margin:0 0 12px 0;">
      <strong>New contact request from your portfolio</strong>
    </p>

    <p style="margin:0 0 8px 0;">
      <strong>Name:</strong> ${name || 'N/A'}<br/>
      <strong>Email:</strong> ${email || 'N/A'}<br/>
      <strong>Phone:</strong> ${phoneNumber || 'N/A'}<br/>
      <strong>Preferred contact:</strong> ${contactMethod || 'N/A'}
    </p>

    <p style="margin:0 0 8px 0;">
      <strong>Project type:</strong> ${projectType || 'N/A'}<br/>
      <strong>Number of pages:</strong> ${numberOfPages || 'N/A'}<br/>
      <strong>Features:</strong> ${featuresText || 'N/A'}<br/>
      <strong>Visual identity:</strong> ${visualIdentity || 'N/A'}<br/>
      <strong>Deadline:</strong> ${deadline || 'N/A'}
    </p>

    <p style="margin:12px 0 0 0;">
      <strong>Additional info:</strong><br/>
      ${additionalInfo || 'N/A'}
    </p>

    <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;" />

    <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding-right:12px; vertical-align:top;">
          <img
            src="${signatureImageUrl}"
            alt="Isaure Lohest"
            width="80"
            style="display:block; border-radius:16px;"
          />
        </td>
        <td style="font-size:12px; line-height:1.5; vertical-align:middle;">
          <div style="
            text-transform:uppercase;
            letter-spacing:0.16em;
            font-weight:600;
            color:${primaryColor};
            margin-bottom:4px;
          ">
            Isaure Lohest
          </div>
          <div style="margin-bottom:4px;">
            Creative web developer & designer
          </div>
          <div style="margin-bottom:2px;">
            <a href="mailto:isaure.lohest@gmail.com"
               style="color:#0f172a; text-decoration:none;">
              isaure.lohest@gmail.com
            </a>
          </div>
          <div style="margin-bottom:2px;">
            <a href="https://isaure-lohest.com"
               style="color:#0f172a; text-decoration:none;">
              isaure-lohest.com
            </a>
          </div>
        </td>
      </tr>
    </table>
  </div>
</div>
      `.trim(),
    };

    const promises = [];

    // ---------- Mail POUR LA PERSONNE ----------
    if (email) {
      const safeName = name || '';

      const userMail = {
        from: `"Isaure Lohest" <${smtpUser}>`,
        to: email,
        subject: `Thank you for reaching out${safeName ? `, ${safeName}` : ''}`,
        text: `
Hi${safeName ? ` ${safeName}` : ''},

Thank you for reaching out and for your interest in working together.

I’ve received your message and I’ll come back to you as soon as possible to discuss your project in more detail.

Best regards,
Isaure Lohest
Web design & development
        `.trim(),
        html: `
<div style="background:${pageBgColor}; padding:24px ;">
  <div style="
    max-width:640px;
    margin:0 auto;
    background:${cardBgColor};
    border-radius:16px;
    padding:24px 20px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size:14px;
    line-height:1.6;
    color:#0f172a;
  ">
    <p style="margin:0 0 12px 0;">
      Hi${safeName ? ` ${safeName}` : ''},
    </p>

    <p style="margin:0 0 12px 0;">
      Thank you for reaching out and for your interest in working together.<br />
      I’ve received your message and I’ll get back to you as soon as possible to talk about your project in more detail.
    </p>

    <p style="margin:0 0 16px 0;">
      In the meantime, feel free to have a look at my latest projects on my website.
    </p>

    <p style="margin:0 0 24px 0;">
      <a href="https://isaure-lohest.com"
         style="
           display:inline-block;
           padding:10px 18px;
           border-radius:999px;
           border:2px solid ${accentColor};
           color:${primaryColor};
           text-decoration:none;
           font-size:13px;
           font-weight:600;
           text-transform:uppercase;
           letter-spacing:0.08em;
         ">
        Visit my portfolio
      </a>
    </p>

    <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;" />

    <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding-right:12px; vertical-align:top;">
          <img
            src="${signatureImageUrl}"
            alt="Isaure Lohest"
            width="96"
            style="display:block; border-radius:16px;"
          />
        </td>
        <td style="font-size:12px; line-height:1.5; vertical-align:middle;">
          <div style="
            text-transform:uppercase;
            letter-spacing:0.16em;
            font-weight:600;
            color:${primaryColor};
            margin-bottom:4px;
          ">
            Isaure Lohest
          </div>
          <div style="margin-bottom:4px;">
            Creative web developer & designer
          </div>
          <div style="margin-bottom:2px;">
            <a href="mailto:isaure.lohest@gmail.com"
               style="color:#0f172a; text-decoration:none;">
              isaure.lohest@gmail.com
            </a>
          </div>
          <div style="margin-bottom:2px;">
            <a href="https://isaure-lohest.com"
               style="color:#0f172a; text-decoration:none;">
              isaure-lohest.com
            </a>
          </div>
        </td>
      </tr>
    </table>
  </div>
</div>
        `.trim(),
      };

      promises.push(transporter.sendMail(userMail));
    }

    // Envoi du mail pour toi
    promises.push(transporter.sendMail(ownerMail));

    try {
      await Promise.all(promises);
      console.log('Emails sent for contact message', messageId);
    } catch (err) {
      console.error('Error sending contact emails:', err);
    }
  },
);
