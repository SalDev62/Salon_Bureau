'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProduitsPageMobile() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('');

  useEffect(() => {
    async function fetchProduits() {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_FETCH_ALL);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }
        const data = await response.json();
        setProduits(data);
        
        // Extraction des menus uniques
        const uniqueMenus = [...new Set(data.flatMap(product => product.menuName))];
        setMenus(uniqueMenus);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduits();
  }, []);

  useEffect(() => {
    if (selectedMenu) {
      const relatedCategories = [...new Set(produits.filter(product => product.menuName.includes(selectedMenu)).flatMap(product => product.categorieName))];
      setCategories(relatedCategories);
    } else {
      setCategories([]);
    }
    setSelectedCategorie(''); // Réinitialiser la catégorie lors du changement de menu
  }, [selectedMenu, produits]);

  const filteredProduits = produits.filter(product => 
    (selectedMenu ? product.menuName.includes(selectedMenu) : true) &&
    (selectedCategorie ? product.categorieName.includes(selectedCategorie) : true)
  );

  if (loading) {
    return <p className="text-center text-lg font-semibold">Chargement des produits...</p>;
  }

  return (
    <div className="p-6 max-w-[1350px] mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Tous nos produits</h1>
      <div className='w-full h-0.5 bg-rose mb-8'></div>
      
      {/* Filtres */}
      <div className="flex flex-col gap-4 mb-8">
        <select 
          value={selectedMenu} 
          onChange={(e) => setSelectedMenu(e.target.value)}
          className="p-2 border rounded text-center text-gray-700"
        >
          <option value="">-- Filtrer par catégories --</option>
          {menus.map(menu => (
            <option key={menu} value={menu}>{menu}</option>
          ))}
        </select>

        {selectedMenu && (
  <select 
    value={selectedCategorie} 
    onChange={(e) => setSelectedCategorie(e.target.value)}
    className="p-2 border rounded text-center text-gray-700"
  > 
    <option value="">-- Filtrer {selectedMenu} --</option>
    {categories.map(categorie => (
      <option key={categorie} value={categorie}>{categorie}</option>
    ))}
  </select>
)}
      </div>
      
      {/* Affichage des produits avec animation */}
      <motion.div 
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
  layout
>
  <AnimatePresence mode="sync"> 
    {filteredProduits.map((product) => (
      <motion.div
        key={`${product.id}-${selectedCategorie}`} 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }} 
        transition={{ duration: 0.4 }}
        layout="position" 
      >
        <Link href={`/${product.menuId}/${product.categorieId}/${product.id}`} className="hover:scale-105 transition duration-500 relative">
          <div className="relative w-full h-[244px] hover:scale-105 transition duration-500">
            <img 
              src={product.images} 
              alt={product.nom} 
              className="absolute w-full h-full object-cover transition-opacity duration-500 hover:opacity-0"
            />
            <img 
              src={product.images2} 
              alt={`${product.nom} - deuxième image`} 
              className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 hover:opacity-100"
            />
          </div>
          <h3 className="text-lg font-semibold">{product.nom}</h3>
          <p className="text-sm text-gray-500">{product.categorieName.join(", ")}</p>
          <p className="text-sm text-gray-500">{product.menuName.join(", ")}</p>
        </Link>
      </motion.div>
    ))}
  </AnimatePresence>
</motion.div>
    </div>
  );
}
