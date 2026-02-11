import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, message, toEmail, subject } = req.body;

  // 1. Create a transporter using Gmail SMTP
  // These credentials should be set in Vercel Environment Variables
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address (e.g., your-app@gmail.com)
      pass: process.env.EMAIL_PASS, // Your Gmail App Password (16 characters)
    },
  });

  try {
    // 2. Send the email
    await transporter.sendMail({
      from: `"${name} (عبر الموقع)" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: subject || `رسالة جديدة من ${name}`,
      html: `
        <div style="direction: rtl; font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #f15a24;">رسالة جديدة من الموقع الرسمي</h2>
          <hr>
          <p><strong>الاسم:</strong> ${name}</p>
          <p><strong>البريد الإلكتروني:</strong> ${email}</p>
          <p><strong>الهاتف:</strong> ${phone || "غير محدد"}</p>
          <p><strong>الرسالة:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${message}
          </div>
          <hr>
          <footer style="font-size: 12px; color: #888;">
            هذه الرسالة تم إرسالها تلقائياً من تطبيق Al-Samer Logistics.
          </footer>
        </div>
      `,
    });

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (err: any) {
    console.error("Nodemailer error:", err);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: err.message,
    });
  }
}
