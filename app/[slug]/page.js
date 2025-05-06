import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductMenuDesktop from "@/component/ProductMenuDesktop";

// 🔁 Cette fonction est appelée automatiquement côté serveur
export async function generateMetadata({ params }) {
  const { slug } = params;
  const formattedSlug = slug.replace(/-/g, " ");

  return {
    title: `Mobilier ${formattedSlug} professionnel | Salon Bureau`,
    description: `Découvrez notre sélection de mobilier ${formattedSlug} ergonomique pour professionnels à Saint-Omer.`,
    keywords: ["mobilier", "bureau", "professionnel", formattedSlug, "saint-omer", "ergonomique"],
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

export default async function Page({ params }) {
  const { slug } = params;

  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <ProductMenuDesktop slug={slug} />
    </Suspense>
  );
}
