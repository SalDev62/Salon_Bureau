'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Fonction pour récupérer les menus depuis l'API
async function fetchMenus() {
  const response = await fetch(process.env.NEXT_PUBLIC_FETCH_MENUS_URL);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des menus');
  }
  return await response.json();
}

export default function NavBarMobile() {
  const [menus, setMenus] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Récupérer les menus lorsque le composant est monté
    fetchMenus()
      .then((data) => setMenus(data))
      .catch((err) => {
        console.error('Erreur lors de la récupération des menus:', err);
        setMenus([]); // Si une erreur se produit, on assigne un tableau vide
      });
  }, []);

  useEffect(() => {
    // Empêcher le scroll du body lorsque le menu est ouvert
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCategories = (menuId) => {
    setOpenMenuId(openMenuId === menuId ? null : menuId);
  };

  // Fermer le menu quand on clique sur un élément
  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenMenuId(null);
  };

  if (!isMounted) return null;

  return (
    <nav className="w-full flex justify-between items-center p-2 bg-white shadow-md relative">
      <div className="flex flex-row w-full justify-between">
        <Link href="/">
          <img
            src="/logo.jpg"
            alt="Logo"
            width={100}
            height={100}
            className="w-24 h-auto"
          />
        </Link>

        {/* Bouton Menu */}
        <button
          className="p-2 rounded-md focus:outline-none text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* Menu plein écran */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white flex flex-col items-end justify-start z-50 p-4">
          <button
            className="text-black text-2xl"
            onClick={toggleMenu}
            aria-label="Close Menu"
          >
            ✖
          </button>

          {/* Conteneur avec scroll uniquement dans le menu */}
          <div className="w-full h-full overflow-y-auto max-h-full">
            <ul className="w-full text-left pt-4">
              {menus.map((menu) => (
                <li key={menu.id}>
                  <div className="flex justify-between items-center px-4 pt-8 py-2 text-black text-xl hover:bg-red-600 cursor-pointer">
                    {/* Lien sur le nom du menu */}
                    <Link
                      href={`/${menu.id}`} // Remplacez ce chemin par celui qui correspond à votre route
                      className="text-black"
                      onClick={closeMenu} // Ferme le menu au clic
                    >
                      {menu.nom}
                    </Link>

                    {/* Flèche uniquement pour ouvrir/fermer les sous-menus */}
                    <span
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Empêche le clic de se propager au parent
                        toggleCategories(menu.id); // Ouvre/ferme les catégories
                      }}
                    >
                      {openMenuId === menu.id ? '▲' : '▼'}
                    </span>
                  </div>
                  {openMenuId === menu.id && (
                    <ul className="pl-4">
                      {menu.categorieName.map((cat, index) => (
                        <li key={menu.categorieId[index]}>
                          <Link
                            href={`/${menu.id}/${menu.categorieId[index]}`}
                            className="block px-4 py-2 text-black hover:bg-gray-300 pt-4"
                            onClick={closeMenu} // Ferme le menu au clic
                          >
                            {cat}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
