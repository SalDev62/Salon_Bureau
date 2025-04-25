import "./globals.css";
import NavBarDesktop from "../component/NavBarDesktop";
import NavBarMobile from "../component/NavBarMobile";
import Footer from "@/component/Footer";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import ScrollToTopButton from "../component/ScrollToTopButton";
import Head from "next/head";
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <Head>
        <link rel="icon" href="https://salon-bureau.fr/logo.ico" sizes="any" />
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
      </Head>
      <body className="min-h-screen flex flex-col">
        <header>
          {/* NavBarMobile pour petits écrans */}
          <div className="lg:hidden">
            <NavBarMobile />
          </div>

          {/* NavBarDesktop pour grands écrans */}
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

        <main className="flex-1">{children}</main>

        <footer className="mt-auto">
          <Footer />
        </footer>

        <ScrollToTopButton />
      </body>
    </html>
  );
}
