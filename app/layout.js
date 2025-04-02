import "./globals.css";
import NavBarDesktop from "../component/NavBarDesktop";
import NavBarMobile from "../component/NavBarMobile";
import Footer from "@/component/Footer";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";  // Import des icônes
import ScrollToTopButton from "../component/ScrollToTopButton"  // Import du composant ScrollToTop

export const metadata = {
  title: "Salon Bureau - Mobilier de Qualité",
  description: "Découvrez nos mobiliers pour professionnels.",
  keywords: ["salon", "bureau", "meubles", "décoration", "moderne","professionnel","mobilier"],
  openGraph: {
    title: "Salon Bureau - Mobilier de Qualité",
    description: "Découvrez nos mobiliers pour professionnels.",
    images: ["public/logo.png"],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
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

        {/* Contenu principal qui prend toute la hauteur disponible */}
        <main className="flex-1">{children}</main>

        {/* Footer toujours en bas */}
        <footer className="mt-auto">
          <Footer />
        </footer>

        {/* Composant bouton ScrollToTop (Client Component) */}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
