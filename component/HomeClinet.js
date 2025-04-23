"use client";

import { useState, useEffect } from "react";
import HomePageDesktop from "@/component/HomePageDesktop";
import HomePageMobile from "@/component/HomePageMobile";

export default function HomeClient() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // JSON-LD SEO local
  const seoStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Salon Bureau",
    image: "https://salon-bureau.fr/logo.jpg",
    url: "https://salon-bureau.fr",
    telephone: "+33321391611",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Votre adresse ici", // 🔁 Remplace par ton adresse exacte
      addressLocality: "Saint-Omer",
      postalCode: "62500",
      addressCountry: "FR",
    },
    sameAs: [], // tu peux mettre ici une page Facebook/LinkedIn si tu en as
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seoStructuredData),
        }}
      />
      {isMobile ? <HomePageMobile /> : <HomePageDesktop />}
    </>
  );
}
