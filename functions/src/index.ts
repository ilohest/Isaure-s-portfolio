/* eslint-disable */

import * as admin from "firebase-admin";
import nodemailer from "nodemailer";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

admin.initializeApp();

interface ContactMessagePayload {
  name: string;
  email: string;
  additionalInfo: string;
  source: string;
}

const DEFAULT_SMTP_PORT = 465;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;

const toStringValue = (value: unknown): string =>
  typeof value === "string" ? value : "";

const toSmtpPort = (value: string | undefined): number => {
  if (!isNonEmptyString(value)) {
    return DEFAULT_SMTP_PORT;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    console.error("Invalid SMTP_PORT value. Falling back to default port 465.");
    return DEFAULT_SMTP_PORT;
  }

  return parsed;
};

const parseContactMessagePayload = (raw: unknown): ContactMessagePayload => {
  const data = isRecord(raw) ? raw : {};

    return {
      name: toStringValue(data.name),
      email: toStringValue(data.email),
      additionalInfo: toStringValue(data.additionalInfo),
      source: toStringValue(data.source),
    };
};

// Config SMTP depuis functions/.env
const smtpHost = process.env.SMTP_HOST;
const smtpPort = toSmtpPort(process.env.SMTP_PORT);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const ownerEmail = process.env.OWNER_EMAIL || smtpUser;

if (!smtpHost || !smtpUser || !smtpPass || !ownerEmail) {
  console.error("SMTP config is incomplete. Check SMTP_HOST, SMTP_USER, SMTP_PASS, OWNER_EMAIL.");
}

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
const primaryColor = "#302b29";
const linkColor = "#4c5ef7";
const pageBgColor = "#ece7e1";
const cardBgColor = "#f8f8f6";
const signatureImagePortfolio =
  "https://isaure-lohest.com/assets/media/common/images/email-logo-portfolio.png";
const signatureImageAi =
  "https://isaure-lohest.com/assets/media/common/images/email-logo-ai.png";

const emailFontStack =
  "'Red Hat Text', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const displayFontStack = "'ABCSynt', Georgia, serif";

const escapeHtml = (value: unknown): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderEmailSignature = (source: string) => {
  const isAi = source === "ai.isaure-lohest.com";
  const siteUrl = isAi ? "https://ai.isaure-lohest.com" : "https://isaure-lohest.com";
  const siteLabel = isAi ? "ai.isaure-lohest.com" : "isaure-lohest.com";
  const logoUrl = isAi ? signatureImageAi : signatureImagePortfolio;

  return `
<div style="
  border-top:1px solid ${primaryColor};
  padding-top:18px;
">
  <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse; width:100%;">
    <tr>
      <td style="width:84px; padding-right:16px; vertical-align:top;">
        <div style="
          width:84px;
          height:84px;
          border:1px solid ${primaryColor};
          border-radius:0;
          overflow:hidden;
          background:${pageBgColor};
        ">
          <img
            src="${logoUrl}"
            alt="Isaure Lohest"
            width="84"
            height="84"
            style="display:block; width:84px; height:84px; object-fit:contain; padding:8px;"
          />
        </div>
      </td>
      <td style="font-size:12px; line-height:1.65; vertical-align:top;">
        <div style="
          font-family:${displayFontStack};
          text-transform:uppercase;
          letter-spacing:0.12em;
          font-size:13px;
          color:${linkColor};
          margin-bottom:6px;
        ">
          Isaure Lohest
        </div>
        <div style="margin-bottom:4px;">Creative web developer & designer</div>
        <div style="margin-bottom:2px;">
          <a href="mailto:isaure.lohest@gmail.com"
             style="color:${primaryColor}; text-decoration:none;">
            isaure.lohest@gmail.com
          </a>
        </div>
        <div style="margin-bottom:2px;">
          <a href="${siteUrl}"
             style="color:${primaryColor}; text-decoration:none;">
            ${siteLabel}
          </a>
        </div>
      </td>
    </tr>
  </table>
</div>
`.trim();
};

const renderEmailShell = (content: string) => `
<div style="background:${pageBgColor}; padding:24px;">
  <div style="
    max-width:640px;
    margin:0 auto;
    background:${cardBgColor};
    border:1px solid ${primaryColor};
    border-radius:0;
    padding:28px 24px;
    font-family:${emailFontStack};
    font-size:14px;
    line-height:1.6;
    color:${primaryColor};
  ">
    ${content}
  </div>
</div>
`.trim();

// Trigger Firestore v2 sur contactMessages
export const sendContactEmails = onDocumentCreated(
  {
    document: "contactMessages/{messageId}",
    region: "europe-west1",
  },
  async (event) => {
    const snap = event.data;
    const messageId = event.params.messageId;

    if (!snap) {
      console.error("No document data for event", messageId);
      return;
    }

    const payload = parseContactMessagePayload(snap.data());

    const name = payload.name;
    const email = payload.email;
    const additionalInfo = payload.additionalInfo;
    const source = payload.source;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSource = escapeHtml(source);
    const safeAdditionalInfo = escapeHtml(additionalInfo).replace(/\n/g, "<br />");

    // ---------- Mail POUR TOI ----------
    const ownerMail = {
      from: `"Portfolio contact" <${smtpUser}>`,
      to: ownerEmail,
      subject: `New contact request from ${name || "Unknown visitor"}`,
      text: `
New contact request from your portfolio:

Name: ${name || "N/A"}
Email: ${email || "N/A"}
Source: ${source || "isaure-lohest.com"}

Message:
${additionalInfo || "N/A"}
      `.trim(),
      html: renderEmailShell(`
    <p style="margin:0 0 14px 0;">
      <strong>New contact request from your portfolio</strong>
    </p>

    <p style="margin:0 0 10px 0;">
      <strong>Name:</strong> ${safeName || "N/A"}<br/>
      <strong>Email:</strong> ${safeEmail || "N/A"}<br/>
      <strong>Source:</strong> ${safeSource || "isaure-lohest.com"}
    </p>

    <p style="margin:0 0 28px 0;">
      <strong>Message:</strong><br/>
      ${safeAdditionalInfo || "N/A"}
    </p>

    ${renderEmailSignature(source)}
      `),
    };

    const promises: Array<Promise<unknown>> = [];

    // ---------- Mail POUR LA PERSONNE ----------
    if (email) {
      const replyName = name || "";
      const safeReplyName = escapeHtml(replyName);

      const userMail = {
        from: `"Isaure Lohest" <${smtpUser}>`,
        to: email,
        subject: `Thank you for reaching out${replyName ? `, ${replyName}` : ""}`,
        text: `
Hi${replyName ? ` ${replyName}` : ""},

Thank you for reaching out and for your interest in working together.

I’ve received your message and I’ll come back to you as soon as possible to discuss your project in more detail.

Best regards,
Isaure Lohest
Web design & development
        `.trim(),
        html: renderEmailShell(`
    <p style="margin:0 0 14px 0;">
      Hi${safeReplyName ? ` ${safeReplyName}` : ""},
    </p>

    <p style="margin:0 0 14px 0;">
      Thank you for reaching out and for your interest in working together.<br />
      I’ve received your message and I’ll get back to you as soon as possible to talk about your project in more detail.
    </p>

    <p style="margin:0 0 22px 0;">
      In the meantime, feel free to have a look at my latest projects on my website.
    </p>

    <p style="margin:0 0 28px 0;">
      <a href="${source === "ai.isaure-lohest.com" ? "https://ai.isaure-lohest.com" : "https://isaure-lohest.com"}"
         style="
           display:inline-block;
           padding:10px 16px;
           border-radius:0;
           border:1px solid ${primaryColor};
           color:${primaryColor};
           text-decoration:none;
           font-family:${displayFontStack};
           font-size:13px;
           font-weight:400;
           text-transform:uppercase;
           letter-spacing:0.09em;
           background:${cardBgColor};
         ">
        Visit my portfolio
      </a>
    </p>

    ${renderEmailSignature(source)}
        `),
      };

      promises.push(transporter.sendMail(userMail));
    }

    // Envoi du mail pour toi
    promises.push(transporter.sendMail(ownerMail));

    try {
      await Promise.all(promises);
      console.log("Emails sent for contact message", messageId);
    } catch (err) {
      console.error("Error sending contact emails:", err);
    }
  },
);
