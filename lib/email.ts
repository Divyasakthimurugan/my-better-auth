import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
 host: process.env.SMTP_HOST!,
 port: Number(process.env.SMTP_PORT!),
 auth: {
  user: process.env.SMTP_USER!,
  pass: process.env.SMTP_PASS!,
 },

});
 export async function sendMagicLinkEmail({
  email,
  url,
  token,
 }: {
  email: string;
  url:string;
  token: string;
 }) {
  const magicLinkURL = `${url}?token=${token}`;

  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}`,
    to: email,
    subject: 'Your Magic Link Login',
    html: `
    <p>Hello,</p>
    <p>Click the link below to sign in:</p>
    <a href="${magicLinkURL}" style="color: #1a73e8">Sign in </a>
    <p>This link will expire in 10 minutes.</p>
    `,
  });
 }
