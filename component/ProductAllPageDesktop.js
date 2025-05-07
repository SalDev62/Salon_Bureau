'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProduitsPage() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    async function fetchProduits() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_ALL}?page=${currentPage}&size=${pageSize}`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des produits');

        const data = await response.json();
        setProduits(data.produits);
        setTotalItems(data.total);

        const uniqueMenus = [...new Set(data.produits.flatMap(product => product.menuName))];
        setMenus(uniqueMenus);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduits();
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (selectedMenu) {
      const relatedCategories = [...new Set(produits.filter(product => product.menuName.includes(selectedMenu)).flatMap(product => product.categorieName))];
      setCategories(relatedCategories);
    } else {
      setCategories([]);
    }
    setSelectedCategorie('');
  }, [selectedMenu, produits]);

  const filteredProduits = produits.filter(product =>
    (selectedMenu ? product.menuName.includes(selectedMenu) : true) &&
    (selectedCategorie ? product.categorieName.includes(selectedCategorie) : true)
  );

  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Ajout du scroll vers le haut
    }
  };
  

  const generatePageNumbers = () => {
    const range = [];
    const rangeSize = 5;
    let start = Math.max(currentPage - Math.floor(rangeSize / 2), 1);
    let end = Math.min(start + rangeSize - 1, totalPages);
    if (end - start < rangeSize - 1) {
      start = Math.max(end - rangeSize + 1, 1);
    }
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  if (loading) {
    return <p className="text-center text-lg font-semibold">Chargement des produits...</p>;
  }

  return (
    <div className="p-6 max-w-[1350px] mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Tous nos produits</h1>
      <div className='w-full h-0.5 bg-rose mb-8'></div>

      {/* Filtres */}
      <div className="flex gap-4 mb-8">
        <select
          value={selectedMenu}
          onChange={(e) => setSelectedMenu(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Sélectionner un menu</option>
          {menus.map(menu => (
            <option key={menu} value={menu}>{menu}</option>
          ))}
        </select>

        {selectedMenu && (
          <select
            value={selectedCategorie}
            onChange={(e) => setSelectedCategorie(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map(categorie => (
              <option key={categorie} value={categorie}>{categorie}</option>
            ))}
          </select>
        )}
      </div>

      {/* Affichage des produits sans animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProduits.map((product) => (
          <div
            key={`${product.id}-${selectedCategorie}`}
          >
            <Link href={`/${product.menuId}/${product.categorieId}/${product.id}`} className="hover:scale-105 transition duration-500 relative block">
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
          </div>
        ))}
      </div>

      
    </div>
  );
}
