/* eslint react/no-unescaped-entities: "off" */

import React from "react";

const MentionLegal = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Mentions Légales</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Informations générales</h2>
        <p>Propriétaire : Salon</p>
        <p>Adresse : 4P Route de Blendecques - 62219 - Longunesse CEDEX.</p>
        <p>Directeur de publication du site : Matthieu SALON.</p>
        <p>RCS : Saint Omer B 385 184 387</p>
        <p>CNIL : En cours</p>
        <p>TVA : FR 30 385 184 387</p>
        <p>Dénomination : Salon</p>
        <p>Capital : 196 000 €</p>
        <p>Forme Juridique : SARL</p>
        <p>Ce site a été créé et est maintenu par : Salon SARL</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Contenu du site</h2>
        <p>Le contenu du site inclut la structure générale, les textes, les images animées ou non, et les sons.</p>
        <p>Salon se réserve le droit de modifier ou de corriger le contenu de ce site à tout moment et sans préavis.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Conception technique du site</h2>
        <p>Ce site est optimisé pour Firefox 4 ou supérieur, ainsi que Google Chrome 2 ou supérieur.</p>
        <p>Résolution optimale : 1024*768 en milliers de couleurs.</p>
        <p>Javascript doit être activé pour certaines fonctionnalités.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Décharge de responsabilité</h2>
        <p>Salon ne peut être tenu responsable des erreurs ou omissions dans les informations fournies.</p>
        <p>L'usage des liens hypertextes peut diriger vers des sites tiers hors du contrôle de Salon.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Droits de propriété intellectuelle</h2>
        <p>Tous les éléments du site sont protégés par le droit d’auteur et la législation sur les marques.</p>
        <p>Aucune reproduction, modification ou utilisation sans autorisation n'est permise.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Protection des données personnelles</h2>
        <p>Les utilisateurs ont un droit d'accès et de rectification conformément à la loi Informatique et Libertés.</p>
        <p>Les informations collectées sont utilisées pour répondre aux demandes et envoyer des newsletters.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Sécurité</h2>
        <p>Nous prenons toutes les précautions pour protéger les données contre les accès non autorisés.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Limitation de responsabilité</h2>
        <p>Salon n'est pas responsable des dommages directs ou indirects liés à l'utilisation du site.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Mise à jour</h2>
        <p>Les mentions légales peuvent être modifiées sans préavis. Il est recommandé de les consulter régulièrement.</p>
      </section>
    </div>
  );
};

export default MentionLegal;
