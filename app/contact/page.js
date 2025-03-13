"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    comapgny: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Envoi des données au backend
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      // Message envoyé avec succès
      setSuccess("Votre message a été envoyé avec succès !");
      setFormData({ name: "", comapgny: "", email: "", phone: "", message: "" }); // Réinitialise le formulaire
    } else {
      // En cas d'erreur
      setError(data.error || "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6  rounded-lg ">
      <h2 className="text-2xl font-semibold mb-4">Contactez-nous</h2>
      
      {/* Affichage du message d'erreur */}
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Affichage du message de succès */}
      {success && <p className="text-green-500">{success}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Champ Nom */}
        <input
          type="text"
          name="name"
          placeholder="Nom *"
          required
          value={formData.nom}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        
        {/* Champ Société */}
        <input
          type="text"
          name="company"
          placeholder="Nom de société (facultatif)"
          value={formData.societe}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        
        {/* Champ Email */}
        <input
          type="email"
          name="email"
          placeholder="Email *"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        
        {/* Champ Téléphone */}
        <input
          type="tel"
          name="phone"
          placeholder="Numéro de téléphone"
          value={formData.telephone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        
        {/* Champ Message */}
        <textarea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        
        {/* Bouton d'envoi */}
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