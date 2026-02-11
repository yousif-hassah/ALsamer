import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, message, toEmail, subject } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      from: "Al-Samer Logistics <onboarding@resend.dev>", // Change to your verified domain later
      to: [toEmail || "controlcode11@gmail.com"],
      subject: subject || `رسالة جديدة من ${name}`,
      reply_to: email,
      html: `
        <h2>رسالة جديدة من الموقع</h2>
        <p><strong>الاسم:</strong> ${name}</p>
        <p><strong>الإيميل:</strong> ${email}</p>
        <p><strong>الهاتف:</strong> ${phone || "غير محدد"}</p>
        <p><strong>الرسالة:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return res.status(400).json(error);
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
