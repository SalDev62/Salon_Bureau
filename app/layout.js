import "./globals.css";
import NavBarDesktop from "../component/NavBarDesktop";
import NavBarMobile from "../component/NavBarMobile";
import Footer from "@/component/Footer";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";  // Import des icônes
import ScrollToTopButton from "../component/ScrollToTopButton";  // Import du composant ScrollToTop

export const metadata = {
  title: "Salon Bureau - Mobilier de Qualité",
  description: "Découvrez nos mobiliers pour professionnels.",
  keywords: ["salon", "bureau", "meubles", "décoration", "moderne", "professionnel", "mobilier"],
  openGraph: {
    title: "Salon Bureau - Mobilier de Qualité",
    description: "Découvrez nos mobiliers pour professionnels.",
    image: ["public/logo.png"], // Peut-être une image plus grande pour OpenGraph (suggestion)
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Meta charset pour la compatibilité avec tous les navigateurs */}
        <meta charSet="UTF-8" />
        
        {/* Viewport pour la compatibilité mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Title pour l'optimisation SEO */}
        <title>Salon Bureau - Mobilier de Qualité</title>
        
        {/* Description pour les moteurs de recherche */}
        <meta name="description" content="Découvrez nos mobiliers." />
        
        {/* Mots-clés pour le SEO */}
        <meta name="keywords" content="salon, bureau, meubles, décoration, moderne, mobilier, professionnel, saint-omer" />
        
        {/* Meta Robots pour indiquer aux moteurs de recherche de suivre et indexer la page */}
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph pour le partage sur les réseaux sociaux */}
        <meta property="og:title" content="Salon Bureau - Mobilier de Qualité" />
        <meta property="og:description" content="Découvrez nos meubles pour salons et bureaux modernes." />
        <meta property="og:image" content="public/logo.png" />  {/* Assure-toi que l'image est accessible */}
        <meta property="og:type" content="website" />
        
        {/* Favicons pour le site */}
        <link rel="icon" href="logo.png" />
        
        {/* Autres liens pour l'optimisation SEO */}
        <link rel="canonical" href="https://salon-bureau.fr" />
      </head>
      <body className="min-h-screen flex flex-col">
        <header>
          {/* NavBarMobile pour les petits écrans */}
          <div className="lg:hidden">
            <NavBarMobile />
          </div>

          {/* NavBarDesktop pour les grands écrans */}
          <div className="hidden lg:block">
            <NavBarDesktop />
          </div>

          {/* Icônes Email et Téléphone */}
          <div className="flex gap-4 flex-col right-0 mr-4 pt-4 fixed z-40">
            <Link href="mailto:contactsalonbureau@gmail.com">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition">
                <Mail className="text-white w-4 h-4" />
              </div>
            </Link>
            <Link href="tel:+33321391611">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition">
                <Phone className="text-white w-4 h-4" />
              </div>
            </Link>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="mt-auto">
          <Footer />
        </footer>

        {/* ScrollToTopButton */}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
