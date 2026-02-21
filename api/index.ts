import express from "express";
import cors from "cors";
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { z } from "zod";

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Database schema
const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  identityImageUrl: text("identity_image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Database connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema: { contactMessages } });

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  subject: z.string().min(1),
  message: z.string().min(10),
  identityImageBase64: z.string().min(1),
});

// Email sending function with dynamic import
async function sendEmail(data: any) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email credentials not configured, skipping email');
    return;
  }

  try {
    // Dynamic import with correct destructuring
    const { default: nodemailer } = await import('nodemailer');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header with brand color -->
          <div style="background: linear-gradient(135deg, #4788c8 0%, #3a6fa8 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
              قيادة الأمن الداخلي - جبل باشان
            </h1>
            <p style="margin: 10px 0 0 0; color: #ffffff; opacity: 0.9; font-size: 14px;">
              Internal Security Command
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="background-color: #f0f7ff; border-right: 4px solid #4788c8; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
              <h2 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 20px;">
                📩 رسالة جديدة من موقع التواصل
              </h2>
              <p style="margin: 0; color: #666; font-size: 14px;">
                تم استلام رسالة جديدة من نموذج "اتصل بنا"
              </p>
            </div>

            <!-- Contact Details -->
            <div style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 25px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <strong style="color: #4788c8; font-size: 14px;">👤 الاسم:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; text-align: left;">
                    <span style="color: #2c3e50; font-size: 15px;">${data.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <strong style="color: #4788c8; font-size: 14px;">📧 البريد الإلكتروني:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; text-align: left;">
                    <a href="mailto:${data.email}" style="color: #4788c8; text-decoration: none; font-size: 15px;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <strong style="color: #4788c8; font-size: 14px;">📱 رقم الهاتف:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; text-align: left; direction: ltr;">
                    <a href="tel:${data.phone}" style="color: #4788c8; text-decoration: none; font-size: 15px;">${data.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #4788c8; font-size: 14px;">🏷️ الموضوع:</strong>
                  </td>
                  <td style="padding: 12px 0; text-align: left;">
                    <span style="color: #2c3e50; font-size: 15px;">${data.subject}</span>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Message Content -->
            <div style="background-color: #fafafa; border-radius: 8px; padding: 25px; margin-bottom: 20px;">
              <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 16px; border-bottom: 2px solid #4788c8; padding-bottom: 10px;">
                💬 نص الرسالة
              </h3>
              <p style="margin: 0; color: #555; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${data.message}</p>
            </div>

            <!-- Identity Image Content -->
            <div style="background-color: #fafafa; border-radius: 8px; padding: 25px; margin-bottom: 20px;">
              <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 16px; border-bottom: 2px solid #4788c8; padding-bottom: 10px;">
                📸 صورة الهوية المرفقة
              </h3>
              <div style="text-align: center; margin-top: 15px;">
                <img src="${data.identityImageUrl}" alt="صورة الهوية" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
                <p style="margin: 10px 0 0 0; font-size: 13px;">
                  <a href="${data.identityImageUrl}" target="_blank" style="color: #4788c8; text-decoration: none;">📄 عرض الصورة بالحجم الكامل</a>
                </p>
              </div>
            </div>

            <!-- Reply Button -->
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #4788c8 0%, #3a6fa8 100%); color: #ffffff; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(71, 136, 200, 0.3);">
                الرد على الرسالة
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0; color: #888; font-size: 12px;">
              تم إرسال هذا البريد تلقائياً من نظام "اتصل بنا" في موقع قيادة الأمن الداخلي - جبل باشان
            </p>
            <p style="margin: 10px 0 0 0; color: #888; font-size: 12px;">
              © 2026 ISC Bashan - Internal Security Command
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"قيادة الأمن الداخلي - جبل باشان" <${process.env.EMAIL_USER}>`,
      to: 'I.s.c.bashan@gmail.com',
      bcc: 'bashan.isc@gmail.com',
      subject: `📩 رسالة جديدة من الموقع: ${data.subject}`,
      html: emailHtml,
      replyTo: data.email,
    });

    console.log('Email sent successfully to both addresses');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

// Handle OPTIONS for CORS preflight
app.options("/api/contact", (req, res) => {
  res.status(200).end();
});

// Handle POST
app.post("/api/contact", async (req, res) => {
  try {
    const validatedData = contactFormSchema.parse(req.body);

    let identityImageUrl = "";

    // Process and upload the base64 image to Supabase Storage
    if (validatedData.identityImageBase64) {
      if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
        throw new Error("Supabase credentials not configured for image storage");
      }

      const base64Data = validatedData.identityImageBase64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');

      // Determine mime type from base64 string
      const mimeMatch = validatedData.identityImageBase64.match(/^data:(image\/\w+);base64,/);
      const contentType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      const fileExtension = contentType.split('/')[1] || 'jpg';
      const fileName = `identity_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;

      // Upload using native fetch to Supabase Storage REST API
      const storageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/identity_images/${fileName}`;

      const uploadResponse = await fetch(storageUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'apikey': process.env.SUPABASE_ANON_KEY,
          'Content-Type': contentType,
        },
        body: buffer,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("Storage upload error:", errorText);
        throw new Error(`Failed to upload image: ${uploadResponse.statusText}`);
      }

      // Generate the public URL
      identityImageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/identity_images/${fileName}`;
    }

    const sanitizedData = {
      name: validatedData.name.trim().slice(0, 100),
      email: validatedData.email.trim().toLowerCase().slice(0, 100),
      phone: validatedData.phone.replace(/[^\d+\-\s()]/g, '').slice(0, 20),
      subject: validatedData.subject.trim().slice(0, 50),
      message: validatedData.message.trim().slice(0, 1000),
      identityImageUrl: identityImageUrl,
    };

    // Save to database
    const [message] = await db.insert(contactMessages).values(sanitizedData).returning();

    console.log('Contact message saved:', message.id);

    // Send email notification (blocking to ensure execution in serverless)
    try {
      console.log('Attempting to send email...');
      await sendEmail(sanitizedData);
      console.log('Email process completed');
    } catch (err) {
      console.error('Email error:', err);
      // We don't fail the request if email fails, but we log it
    }

    res.status(201).json({ success: true, id: message.id });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(400).json({ success: false, error: "Invalid form data" });
  }
});

export default app;
