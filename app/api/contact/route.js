import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, company, email, phone, message, recaptcha } = await req.json();

    if (!name || !email || !phone) {
      return Response.json({ error: "Veuillez remplir les champs obligatoires." }, { status: 400 });
    }

    // Vérification du reCAPTCHA
    const recaptchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: recaptcha,
      }),
    });

    const recaptchaData = await recaptchaRes.json();
    if (!recaptchaData.success) {
      return Response.json({ error: "reCAPTCHA invalide, veuillez réessayer." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const { v4: uuidv4 } = require('uuid');

    const mailOptions = {
      from: `${name} <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `Nouveau message de ${name} - Ticket #${uuidv4().slice(0, 8)}`,
      html: `
        <html>
          <head></head>
          <body>
            <div style="text-align: center;">
              <h1>Message de ${name}</h1>
              <p><strong>Nom:</strong> ${name}</p>
              <p><strong>Société:</strong> ${company || "Non spécifié"}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Téléphone:</strong> ${phone}</p>
              <p><strong>Message:</strong><br />${message}</p>
            </div>
          </body>
        </html>
      `,
      messageId: `<${uuidv4()}@tondomaine.com>`,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: "Message envoyé avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'envoi du mail :", error);
    return Response.json({ error: `Erreur lors de l'envoi du message: ${error.message}` }, { status: 500 });
  }
}
