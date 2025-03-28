"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ErrorProduit from "./ErrorProduit";
import SkeletonLoader from "./SkeletonLoader";
// Fonction pour récupérer les produits par catégorie
async function fetchProductsByCategory(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_FETCH_ALL;
    if (!apiUrl) throw new Error("L'URL de l'API est manquante");

    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Erreur lors de la récupération des produits");

    const fetchedProducts = await response.json();
    return fetchedProducts.filter((product) => product.menuId.includes(parseInt(slug)));
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fonction pour récupérer les catégories associées à un slug
async function fetchCategoriesBySlug(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_FETCH_MENUS_URL;
    if (!apiUrl) throw new Error("L'URL de l'API pour les menus est manquante");

    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Erreur lors de la récupération des catégories");

    const fetchedCategories = await response.json();
    const category = fetchedCategories.find((category) => category.id === parseInt(slug));

    if (!category) return [];

    return category.categorieName.map((catName, index) => ({
      id: category.categorieId[index],
      name: catName,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function ProductMenuMobile() {
  const params = useParams(); // ✅ Utilisation correcte de useParams()
  const slug = params?.slug; // ✅ Sécurisation de l'accès aux params

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchData() {
      try {
        setLoading(true);

        const productsData = await fetchProductsByCategory(slug);
        const menuData = await fetchCategoriesBySlug(slug);

        setProducts(productsData);
        setMenu(menuData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  // Filtrage des produits selon la sous-catégorie sélectionnée
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categorieId.includes(selectedCategory))
    : products;

  if (loading) return <SkeletonLoader type="category" />;
  if (error) return <p className="text-red-500">{error}</p>;

  // Ne pas afficher les filtres s'il n'y a pas de produits
  if (products.length === 0) {
    return (
      <ErrorProduit message="Aucun produit trouvé pour cette catégorie." linkText="Retour à l'accueil" linkHref="/" />
    );
  }

  return (
    <div className="p-6">
      {/* Affichage du nom du menu */}
      {products.length > 0 && <h1 className="text-2xl font-bold mb-4">{products[0].menuName}</h1>}

      {/* Affichage des sous-catégories uniquement s'il y a des produits */}
      {products.length > 0 && (
        <div>
          {menu.length > 0 ? (
            <div className="pb-4">
              <h2 className="text-xl font-semibold mb-2">Filtrer par catégorie</h2>
              <ul className="flex flex-row space-x-4 space-y-2 flex-wrap">
                {/* Bouton "Tous" pour réinitialiser la sélection */}
                <li
                  className={`cursor-pointer text-sm text-gray-700 border rounded-lg p-2 ${
                    selectedCategory === null ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  Tous
                </li>

                {menu.map((subCategory) => (
                  <li
                    key={subCategory.id}
                    className={`cursor-pointer text-sm text-gray-700 border rounded-lg p-2 ${
                      selectedCategory === subCategory.id ? "bg-blue-500 text-white" : ""
                    }`}
                    onClick={() => setSelectedCategory(subCategory.id)}
                  >
                    {subCategory.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ErrorProduit message="Aucune catégorie trouvée." linkText="Retour à l'accueil" linkHref="/" />
          )}
        </div>
      )}

      {/* Affichage des produits filtrés */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link key={product.id} href={`/${slug}/${product.categorieId}/${product.id}`}>
              <div className=" ">
                <img src={product.images} className="w-full h-24 object-cover" />
                <h3 className="text-lg font-semibold">{product.nom}</h3>
                <p className="text-sm text-gray-500">Catégorie : {product.categorieName.join(", ")}</p>
                <p className="text-sm text-gray-500">Menu : {product.menuName.join(", ")}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Aucun produit trouvé pour cette catégorie.</p>
        )}
      </div>
    </div>
  );
}
