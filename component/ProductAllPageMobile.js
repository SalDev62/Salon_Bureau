'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default function ProductAllPageMobile() {
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
      <h1 className="text-2xl text-center font-bold mb-4">All</h1>
      <div className='w-full h-0.5 bg-gray-200'></div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 pt-4 pb-4">
        {produits.map((produit) => (
          <Link key={produit.id} href={`/${produit.menuId}/${produit.categorieId}/${produit.id}`} className="block">
            <div className="flex flex-col items-start">
              {produit.images.length > 0 ? (
                <img 
                  src={produit.images[0]} 
                  alt={produit.nom} 
                  className="w-full h-24 object-cover"
                />
              ) : (
                <div className="w-full h-24 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Aucune image</p>
                </div>
              )}
              <h2 className="text-xl font-semibold mt-2">{produit.nom}</h2>
              <p className="text-gray-500 text-sm">{produit.categorieName.join(', ')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}