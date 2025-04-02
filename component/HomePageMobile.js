'use client'; // Marque ce composant comme un Client Component

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Fonction pour récupérer les images
async function fetchImages() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_FETCH_IMAGE;
    if (!apiUrl) throw new Error("L'URL de l'API est manquante");

    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Erreur lors de la récupération des produits");

    const fetchedImages = await response.json();
    return fetchedImages;
  } catch (error) {
    console.error(error);
    return [];
  }
}
async function fetchMenus() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_FETCH_MENUS_URL;
    if (!apiUrl) throw new Error("L'URL de l'API est manquante");

    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Erreur lors de la récupération des menus");

    const fetchedMenus = await response.json();
    return fetchedMenus.slice(0, 3); // Prendre uniquement les 3 premiers menus
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function HomePageMobile() {
  const [images, setImages] = useState([]);
  const [menus, setMenus] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = await fetchImages();
      setImages(fetchedImages.map(item => item.images[0])); // On garde la première image de chaque produit
    };

    const loadMenus = async () => {
      const fetchedMenus = await fetchMenus();
      setMenus(fetchedMenus);
    };
    loadMenus();
    loadImages();

    // Changer l'image toutes les 5 secondes
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5000 ms = 5 secondes

    // Nettoyer l'intervalle à la destruction du composant
    return () => clearInterval(intervalId);
  }, [images.length]); // On dépend de `images.length` pour éviter les appels multiples

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return <div>Chargement...</div>; // Affiche un message de chargement si aucune image n'est encore chargée
  }
  return (
    <div className="w-full max-w-3xl mx-auto min-h-screen flex flex-col">
      {/* Partie image + indicateurs */}
      <div className="h-1/2 flex flex-col justify-center relative">
        {/* Image */}
        <div className="w-full h-full flex items-center justify-center">
          {images.length > 0 && (
            <Image
              src={images[currentIndex]}
              alt="Product Image"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          )}
        </div>
  
        {/* Indicateurs de navigation (positionnés en bas au centre) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                currentIndex === index ? "bg-red-900 scale-110" : "bg-gray-100"
              }`}
            ></div>
          ))}
        </div>
      </div>
  
      {/* Partie texte + boutons */}
      <div className="flex flex-col justify-center items-center px-4 text-center gap-y-4 mb-8">
          <h1 className="text-4xl text-black font-medium font-Mont pt-16 pb-8">
            L’excellence pour nos <strong className="text-rose ">profes</strong>
            <strong className="bg-rose text-white">sionnels</strong>
          </h1>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/produits">
              <p className="bg-rose text-white px-6 py-3 rounded-lg shadow-lg text-sm 
                  hover:bg-rouge hover:scale-105 hover:shadow-2xl 
                  transition-all duration-300 ease-in-out cursor-pointer">
                Tous nos produits
              </p>
            </Link>
            <Link href="/contact">
              <p className="bg-rose text-white px-6 py-3 rounded-lg shadow-lg text-sm 
                  hover:bg-rouge hover:scale-105 hover:shadow-2xl 
                  transition-all duration-300 ease-in-out cursor-pointer">
                Nous contacter
              </p>
            </Link>
          </div>
        </div>
        {/* Section Nos Catégories Phares */}
<div className="bg-rose w-full py-20">
  <div className="w-full max-w-[1350px] mx-auto h-auto flex flex-col gap-y-12 px-6">
    <div className="text-center">
      <h2 className="text-4xl font-bold">
        <span className="bg-black font-Mont text-white px-4 py-2 rounded-lg shadow-lg inline-block transform hover:rotate-2 transition animate-shake">
          Nos catégories
        </span>

        <span className="text-black px-4 font-medium font-Mont">phares</span>
      </h2>
    </div>

    {/* Grid des catégories */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {menus.map((menu, index) => (
        <Link key={index} href={`/${menu.id}`} passHref>
          <div
            className={`relative p-6 text-center text-lg font-semibold rounded-xl shadow-md h-48 
                      hover:bg-gray-700 transition duration-300 cursor-pointer transform hover:scale-105 text-white`}
            style={{
              backgroundImage: menu.image
                ? `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 100%), url(${menu.image})`
                : 'none',
              backgroundColor: !menu.image ? 'black' : 'transparent',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Texte en bas de l'image */}
            <span className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 text-white z-10 font-medium text-2xl font-Mont bg-black bg-opacity-50 px-2 py-1 rounded-lg">
              {menu.nom}
            </span>
          </div>
        </Link>
      ))}
    </div>
  </div>
</div>
    </div>
  );
}  