"use client";  // Indiquer que c'est un composant client

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";  // Import de l'icône

const ScrollToTopButton = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 100); // Affiche si on scrolle plus de 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-4 bg-red-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition z-50"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
