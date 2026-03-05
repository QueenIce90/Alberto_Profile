import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* Middleware */
app.use(cors({
  origin: "http://localhost:5173", // Vite frontend
}));
app.use(express.json());

/* Utils */
function isEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

/* Routes */
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, company, title, message } = req.body;

    if (!name || !email || !company || !title || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Contact — ${company} (${title})`,
      html: `
        <h2>New Portfolio Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Position:</b> ${title}</p>
        <hr/>
        <p>${message}</p>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("MAIL ERROR:", err);
    res.status(500).json({ error: "Email failed to send" });
  }
});

/* Health check */
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

/* Start server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
