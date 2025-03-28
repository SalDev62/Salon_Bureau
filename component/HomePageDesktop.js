'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

async function fetchImages() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_FETCH_IMAGE;
    if (!apiUrl) throw new Error("L'URL de l'API est manquante");

    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Erreur lors de la récupération des images");

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

export default function HomePageDesktop() {
  const [images, setImages] = useState([]);
  const [menus, setMenus] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [fade2, setFade2] = useState(true);
  const [currentIndex3, setCurrentIndex3] = useState(0);
  const [fade3, setFade3] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = await fetchImages();
      setImages(fetchedImages.map(item => item.images[0]));
    };

    const loadMenus = async () => {
      const fetchedMenus = await fetchMenus();
      setMenus(fetchedMenus);
    };

    loadImages();
    loadMenus();

    const intervalId1 = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500);
    }, 12500);

    const intervalId2 = setInterval(() => {
      setFade2(false);
      setTimeout(() => {
        setCurrentIndex2((prevIndex) => (prevIndex + 1) % images.length);
        setFade2(true);
      }, 500);
    }, 8500);

    const intervalId3 = setInterval(() => {
      setFade3(false);
      setTimeout(() => {
        setCurrentIndex3((prevIndex) => (prevIndex + 1) % images.length);
        setFade3(true);
      }, 500);
    }, 4500);

    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
      clearInterval(intervalId3);
    };
  }, [images.length]);

  if (images.length === 0 || menus.length === 0) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <div className="w-full max-w-[1350px] mx-auto h-auto flex flex-col gap-y-8">
        <div className="flex flex-col justify-center items-center px-4 text-center gap-y-4 mb-8">
          <h1 className="text-6xl text-black font-medium font-Mont pt-8 pb-8">
            L’excellence pour nos <strong className="text-rose ">profes</strong>
            <strong className="bg-rose text-white">sionnels</strong>
          </h1>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/produits">
              <p className="bg-rose text-white px-6 py-3 rounded-lg shadow-lg 
                  hover:bg-rouge hover:scale-105 hover:shadow-2xl 
                  transition-all duration-300 ease-in-out cursor-pointer">
                Tous nos produits
              </p>
            </Link>
            <Link href="/contact">
              <p className="bg-rose text-white px-6 py-3 rounded-lg shadow-lg 
                  hover:bg-rouge hover:scale-105 hover:shadow-2xl 
                  transition-all duration-300 ease-in-out cursor-pointer">
                Nous contacter
              </p>
            </Link>
          </div>
        </div>

        {/* Partie image + grille */}
        <div className="grid grid-cols-3 gap-6 w-full pb-16">
          <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-lg">
            <Image
              src={images[currentIndex]}
              alt="Product Image"
              width={600}
              height={400}
              className={`object-cover w-full rounded-lg h-full transition-all duration-500 ease-in-out 
                ${fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"} 
                group-hover:scale-105`}
            />
          </div>

          <div className="relative group overflow-hidden rounded-lg">
            <Image
              src={images[(currentIndex2 + 1) % images.length]}
              alt="Product Image"
              width={400}
              height={300}
              className={`object-cover w-full h-full rounded-lg transition-all duration-500 ease-in-out 
                ${fade2 ? "opacity-100" : "opacity-0"}
                group-hover:scale-105`}
            />
          </div>

          <div className="relative group overflow-hidden rounded-lg">
            <Image
              src={images[(currentIndex3 + 2) % images.length]}
              alt="Product Image"
              width={400}
              height={300}
              className={`object-cover w-full h-full rounded-lg transition-all duration-500 ease-in-out 
                ${fade3 ? "opacity-100" : "opacity-0"}
                group-hover:scale-105`}
            />
          </div>
        </div>
      </div>

      {/* Section Nos Catégories Phares */}
<div className="bg-rose w-full py-20">
  <div className="w-full max-w-[1350px] mx-auto h-auto flex flex-col gap-y-12 px-6">
    <div className="text-center">
      <h2 className="text-5xl font-bold">
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
                ? `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.7) 100%), url(${menu.image})`
                : 'none',
              backgroundColor: !menu.image ? 'black' : 'transparent',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Texte en bas de l'image */}
            <span className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white z-10 font-bold">
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
