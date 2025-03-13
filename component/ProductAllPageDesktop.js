'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Importation du composant Image de Next.js

export default function ProduitsPage() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduits() {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_FETCH_ALL);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }
        const data = await response.json();
        setProduits(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduits();
  }, []);

  if (loading) {
    return <p className="text-center text-lg font-semibold">Chargement des produits...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">All</h1>
      <div className='w-full h-0.5 bg-gray-200 mb-4'></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produits.map((produit) => (
          <Link key={produit.id} href={`/${produit.menuId}/${produit.categorieId}/${produit.id}`} className="block">
            <div key={produit.id} className="w-full">
              {produit.images.length > 0 ? (
                <Image 
                  src={produit.images[0]} // L'URL de l'image
                  alt={produit.nom} 
                  width={400} // Largeur de l'image
                  height={300} // Hauteur de l'image
                  className="w-full h-auto object-cover mt-2"
                  priority={true} // Priorité pour la première image
                />
              ) : (
                <p className="text-gray-500 mt-2">Aucune image disponible</p>
              )}
              <h2 className="text-xl font-semibold mb-2">{produit.nom}</h2>
              <p className="text-gray-700">Catégorie: {produit.categorieName.join(', ')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
