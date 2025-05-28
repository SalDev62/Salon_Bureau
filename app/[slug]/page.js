import ProductMenuDesktop from "@/component/ProductMenuDesktop";
import ProductMenuMobile from "@/component/ProductMenuMobile";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// 🔁 Cette fonction est appelée automatiquement côté serveur
export async function generateMetadata({ params }) {
  const { slug } = params;
  const formattedSlug = slug.replace(/-/g, " ");

  return {
    title: `Mobilier ${formattedSlug} professionnel | Salon Bureau`,
    description: `Découvrez notre sélection de mobilier ${formattedSlug} ergonomique pour professionnels à Saint-Omer.`,
    keywords: ["mobilier", "bureau", "professionnel", formattedSlug, "saint-omer", "ergonomique", "Haut de France", "Nord", "Pas De Calais"],
    alternates: {
      canonical: `https://salon-bureau.fr/${slug}`,
    },
    openGraph: {
      title: `Mobilier ${formattedSlug} professionnel | Salon Bureau`,
      description: `Découvrez notre sélection de mobilier ${formattedSlug} ergonomique pour professionnels à Saint-Omer.`,
      url: `https://salon-bureau.fr/${slug}`,
      type: "website",
      images: [
        {
          url: "/logo.jpg",
          width: 800,
          height: 600,
          alt: "Salon Bureau",
        },
      ],
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}


// Le composant de la page
export default function Page({ params }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      {isMobile ? <ProductMenuMobile /> : <ProductMenuDesktop />}
    </>
  );
}
