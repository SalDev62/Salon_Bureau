import HomeClient from "@/component/HomeClinet";
export const metadata = {
  title: "Salon Bureau - Mobilier pour professionnel",
  description:
    "Découvrez notre sélection de mobilier design et ergonomique pour les professionnels : bureaux, chaises, rangements, et plus encore.",
  keywords: [
    "salon",
    "Salon Bureau",
    "Salon",
    "Bureau",
    "bureau",
    "meubles",
    "mobilier",
    "professionnel",
    "saint-omer",
  ],
  metadataBase: new URL("https://salon-bureau.fr"),
  alternates: {
    canonical: "https://salon-bureau.fr/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Salon Bureau - Mobilier pour professionnel",
    description:
      "Découvrez notre sélection de mobilier design et ergonomique pour les professionnels.",
    url: "https://salon-bureau.fr/",
    type: "website",
    images: [
      {
        url: "/logo.jpg", // ✅ Change ça si tu veux une autre image
        width: 800,
        height: 600,
        alt: "Salon Bureau",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon Bureau - Mobilier pour professionnel",
    description:
      "Découvrez notre sélection de mobilier design et ergonomique pour les professionnels.",
    images: ["/logo.jpg"], // ✅ Idem ici si besoin
  },
};

export default function Home() {
  return <HomeClient />;
}
