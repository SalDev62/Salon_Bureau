export default function JsonLd() {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Salon Bureau",
            "url": "https://salon-bureau.fr",
            "logo": "https://salon-bureau.fr/logo.jpg"
          }),
        }}
      />
    );
  }
  