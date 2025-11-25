// functions/index.js
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
    };

    const promises = [];

    if (email) {
      const userMail = {
        from: `"Isaure Lohest" <${smtpUser}>`,
        to: email,
        subject: `Thank you for reaching out${name ? `, ${name}` : ''}`,
        text: `
Hi${name ? ` ${name}` : ''},

Thank you for reaching out and for your interest in working together.

I’ve received your message and I’ll come back to you as soon as possible to discuss your project in more detail.

Best regards,
Isaure Lohest
Web design & development
        `.trim(),
      };

      promises.push(transporter.sendMail(userMail));
    }

    promises.push(transporter.sendMail(ownerMail));

    try {
      await Promise.all(promises);
      console.log('Emails sent for contact message', messageId);
    } catch (err) {
      console.error('Error sending contact emails:', err);
    }
  },
);
