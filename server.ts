import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // API Route for sending wishes
  app.post("/api/wish", async (req, res) => {
    try {
      const { wish, timestamp, userAgent } = req.body;

      if (!wish || typeof wish !== "string" || !wish.trim()) {
        return res.status(400).json({ success: false, error: "Wish cannot be empty" });
      }

      console.log("🎂 Received a new Birthday Wish:", { wish, timestamp, userAgent });

      const host = process.env.SMTP_HOST || "smtp.gmail.com";
      const portStr = process.env.SMTP_PORT || "465";
      const port = parseInt(portStr, 10);
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;

      const emailBody = `New Birthday Wish

Wish:
${wish}

Time:
${timestamp}

Device:
${userAgent}
`;

      if (user && pass) {
        // Create actual nodemailer transporter
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465, // true for 465, false for 587 / other ports
          auth: {
            user,
            pass,
          },
        });

        await transporter.sendMail({
          from: `"Elena's Birthday Stars" <${user}>`,
          to: "kkssathiyamoorthi@gmail.com",
          subject: "🎂 New Birthday Wish",
          text: emailBody,
        });

        console.log("✨ Wish email sent successfully to kkssathiyamoorthi@gmail.com via SMTP.");
      } else {
        console.log("⚠️ SMTP credentials (SMTP_USER and SMTP_PASS) not configured in environment variables.");
        console.log("Printed Wish details for development testing:\n", emailBody);
      }

      return res.json({ success: true });
    } catch (error: any) {
      console.error("❌ Error sending wish email:", error);
      // Return a successful status but with error info, or 500. Let's return success: false with detail so the UI can inform.
      return res.status(500).json({ success: false, error: error?.message || "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Full-stack dev server running on http://localhost:${PORT}`);
  });
}

startServer();
