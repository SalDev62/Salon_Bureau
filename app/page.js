import HomeClient from "@/component/HomeClinet";
// app/page.js
export const metadata = {
  title: "Salon Bureau - Mobilier pour professionnel",
  description:
    "Découvrez notre sélection de mobilier design et ergonomique pour les professionnels : bureaux, chaises, rangements, et plus encore.",
  keywords: ["salon", "bureau", "meubles", "mobilier", "professionnel", "saint-omer"],
  metadataBase: new URL("https://salon-bureau.fr"), // <-- Ajout de metadataBase
  openGraph: {
    title: "Salon Bureau - Mobilier pour professionnel",
    description: "Découvrez nos mobiliers pour professionnels.",
    image: "/logo.jpg", // Assure-toi que l'image existe et est accessible
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon Bureau - Mobilier pour professionnel",
    description: "Découvrez notre sélection de mobilier design et ergonomique pour les professionnels.",
    image: "/logo.jpg", // Vérifie l'accessibilité de l'image
  },
};


export default function Home() {
  return <HomeClient />;
}