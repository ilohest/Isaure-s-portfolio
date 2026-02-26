/* eslint-disable */

import * as admin from "firebase-admin";
import nodemailer from "nodemailer";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

admin.initializeApp();

interface ContactMessagePayload {
  name: string;
  email: string;
  phoneNumber: string;
  contactMethod: string;
  projectType: string;
  numberOfPages: string;
  features: string[];
  featuresOther: string;
  visualIdentity: string;
  deadline: string;
  additionalInfo: string;
}

const DEFAULT_SMTP_PORT = 465;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;

const toStringValue = (value: unknown): string =>
  typeof value === "string" ? value : "";

const toStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

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
    phoneNumber: toStringValue(data.phoneNumber),
    contactMethod: toStringValue(data.contactMethod),
    projectType: toStringValue(data.projectType),
    numberOfPages: toStringValue(data.numberOfPages),
    features: toStringArray(data.features),
    featuresOther: toStringValue(data.featuresOther),
    visualIdentity: toStringValue(data.visualIdentity),
    deadline: toStringValue(data.deadline),
    additionalInfo: toStringValue(data.additionalInfo),
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
const primaryColor = "#4c5ef7";
const accentColor = "#a6ff00";
const pageBgColor = "#ece7e1";
const cardBgColor = "#ffffff";
const signatureImageUrl =
  "https://isaure-lohest.com/assets/media/pages/home/sticker-isaure-v2-noQR-640.png";

const escapeHtml = (value: unknown): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

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
    const phoneNumber = payload.phoneNumber;
    const contactMethod = payload.contactMethod;
    const projectType = payload.projectType;
    const numberOfPages = payload.numberOfPages;
    const features = payload.features;
    const featuresOther = payload.featuresOther;
    const visualIdentity = payload.visualIdentity;
    const deadline = payload.deadline;
    const additionalInfo = payload.additionalInfo;

    const featuresText = [...features, featuresOther ? `Other: ${featuresOther}` : ""]
      .filter(isNonEmptyString)
      .join(", ");
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhoneNumber = escapeHtml(phoneNumber);
    const safeContactMethod = escapeHtml(contactMethod);
    const safeProjectType = escapeHtml(projectType);
    const safeNumberOfPages = escapeHtml(numberOfPages);
    const safeFeaturesText = escapeHtml(featuresText);
    const safeVisualIdentity = escapeHtml(visualIdentity);
    const safeDeadline = escapeHtml(deadline);
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
Phone: ${phoneNumber || "N/A"}
Preferred contact method: ${contactMethod || "N/A"}

Project type: ${projectType || "N/A"}
Number of pages: ${numberOfPages || "N/A"}
Features: ${featuresText || "N/A"}
Visual identity: ${visualIdentity || "N/A"}
Deadline: ${deadline || "N/A"}

Additional info:
${additionalInfo || "N/A"}
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
      <strong>Name:</strong> ${safeName || "N/A"}<br/>
      <strong>Email:</strong> ${safeEmail || "N/A"}<br/>
      <strong>Phone:</strong> ${safePhoneNumber || "N/A"}<br/>
      <strong>Preferred contact:</strong> ${safeContactMethod || "N/A"}
    </p>

    <p style="margin:0 0 8px 0;">
      <strong>Project type:</strong> ${safeProjectType || "N/A"}<br/>
      <strong>Number of pages:</strong> ${safeNumberOfPages || "N/A"}<br/>
      <strong>Features:</strong> ${safeFeaturesText || "N/A"}<br/>
      <strong>Visual identity:</strong> ${safeVisualIdentity || "N/A"}<br/>
      <strong>Deadline:</strong> ${safeDeadline || "N/A"}
    </p>

    <p style="margin:12px 0 0 0;">
      <strong>Additional info:</strong><br/>
      ${safeAdditionalInfo || "N/A"}
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
      Hi${safeReplyName ? ` ${safeReplyName}` : ""},
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
      console.log("Emails sent for contact message", messageId);
    } catch (err) {
      console.error("Error sending contact emails:", err);
    }
  },
);
