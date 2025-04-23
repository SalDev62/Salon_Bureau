import HomeClient from "@/component/HomeClinet";
export const metadata = {
  title: "Vente de mobilier pour professionnel à Saint-Omer | Salon Bureau",
  description:
    "Découvrez nos mobiliers professionnels à Saint-Omer. Mobilier design, ergonomique et de qualité pour les professionnels. Livraison rapide.",
  keywords: [
    "bureau Saint-Omer",
    "mobilier Saint-Omer",
    "mobilier professionnel",
    "bureau professionnel",
    "Saint-Omer",
    "meuble entreprise",
    "bureau design",
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
    title: "Vente de mobilier pour professionnel à Saint-Omer | Salon Bureau",
    description:
      "Mobilier professionnel à Saint-Omer : bureaux, chaises, rangements et bien d'autres. Pour entreprise, professions libérales, coworking...",
    url: "https://salon-bureau.fr/",
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
        alt: "Mobilier Saint-Omer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vente de mobilier pour professionnel à Saint-Omer | Salon Bureau",
    description:
      "Bureaux et mobilier professionnel disponibles à Saint-Omer. Livraison rapide, design et qualité.",
    images: ["/logo.jpg"],
  },
};


export default function Home() {
  return <HomeClient />;
}
