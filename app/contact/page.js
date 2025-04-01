"use client";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!captchaToken) {
      setError("Veuillez valider le reCAPTCHA.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, captcha: captchaToken }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setSuccess("Votre message a été envoyé avec succès !");
      setFormData({ name: "", company: "", email: "", phone: "", message: "" });
      setCaptchaToken(null);
    } else {
      setError(data.error || "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Contactez-nous</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Nom *"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="company"
          placeholder="Nom de société (facultatif)"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email *"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Numéro de téléphone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="message"
          placeholder="Votre message"
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* reCAPTCHA */}
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_TA_CLE_SITE} // Remplace avec ta clé
          onChange={setCaptchaToken}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
    </div>
  );
}
