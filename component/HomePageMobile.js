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

export default function HomePageMobile() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = await fetchImages();
      setImages(fetchedImages.map(item => item.images[0])); // On garde la première image de chaque produit
    };

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
    <div className="w-full max-w-3xl mx-auto h-screen flex flex-col">
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
      <div className="h-1/3 flex flex-col justify-center items-center px-4 text-center gap-y-4">
        <h1 className="text-2xl font-bold">L’excellence pour nos professionnels</h1>
        <div className="mt-6 flex justify-center space-x-4 ">
          <Link href="/produits">
            <p className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
              Tous nos produits
            </p>
          </Link>
          <Link href="/contact">
            <p className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
              Nous contacter
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}  