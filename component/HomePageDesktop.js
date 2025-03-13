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

export default function HomePageDesktop() {
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
      setCurrentIndex((prevIndex) => (prevIndex + 2) % images.length); // Change de 2 images à la fois
    }, 5000); // 5000 ms = 5 secondes

    // Nettoyer l'intervalle à la destruction du composant
    return () => clearInterval(intervalId);
  }, [images.length]); // On dépend de `images.length` pour éviter les appels multiples

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % images.length); // Passe à l'image suivante en sautant de 2
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 2 + images.length) % images.length); // Retour à l'image précédente en sautant de 2
  };

  if (images.length === 0) {
    return <div>Chargement...</div>; // Affiche un message de chargement si aucune image n'est encore chargée
  }

  return (
    <div className="w-full max-w-[1350] mx-auto h-auto flex flex-col gap-y-8">
      {/* Partie texte + boutons */}
      <div className="flex flex-col justify-center items-center px-4 text-center gap-y-4 mb-8">
        <h1 className="text-2xl font-bold">L’excellence pour nos professionnels</h1>
        <div className="mt-0 flex justify-center space-x-4">
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

      {/* Partie image + indicateurs */}
      <div className="flex flex-col justify-center relative mt-0">
        {/* Image avec 2 images côte à côte */}
        <div className="w-full h-full flex items-center ">
          {images.length > 0 && (
            <div className="flex w-full space-x-2">
                <div className="w-1/2">
              <Image
                src={images[currentIndex]}
                alt="Product Image"
                width={600}
                height={400}
                className="object-cover w-auto h-auto" // Chaque image prend 50% de la largeur
              />
              </div>
              <div className="w-1/2">
              <Image
                src={images[(currentIndex + 1) % images.length]} // La prochaine image (si présente)
                alt="Product Image"
                width={600}
                height={400}
                className="object-cover w-auto h-auto" // Chaque image prend 50% de la largeur
              />
              </div>
            </div>
          )}
        </div>

       
       
      </div>
    </div>
  );
}
