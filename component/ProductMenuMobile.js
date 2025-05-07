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

    const fetchedData = await response.json(); // On récupère la réponse complète, qui est un objet

    // Vérifie que fetchedData contient la clé 'produits' et si oui, récupère-la
    const fetchedProducts = fetchedData.produits || [];  // Utilisation de 'produits' dans l'objet

    // Filtrer les produits en fonction de menuId (qui est un tableau dans la réponse)
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

export default function ProductMenuDesktop() {
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

  if (loading) return <SkeletonLoader type="category"/>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (products.length === 0) {
    return <ErrorProduit message="Aucun produit trouvé pour cette catégorie." linkText="Retour à l'accueil" linkHref="/" />;
  }

  return (
    <div className="p-6 max-w-[1350px] mx-auto">
  {products.length > 0 && (
    <h1 className="text-3xl font-semibold mb-6 text-gray-800">{products[0].menuName}</h1>
  )}

  {/* Affichage des sous-catégories uniquement si des produits existent */}
  {products.length > 0 && menu.length > 0 && (
    <div>
      <div className="pb-6">
     
        <ul className="flex flex-wrap gap-4">
          {/* Bouton "Tous" pour réinitialiser la sélection */}
          <li
            className={`cursor-pointer text-sm font-medium py-2 px-4 border-1 transition-all duration-300 hover:bg-rouge hover:text-white hover:border-none
            ${selectedCategory === null ? "bg-rose text-white" : "bg-white text-black border-gray-900"}`} 
            onClick={() => setSelectedCategory(null)}
          >
            Tous
          </li>

          {menu.map((subCategory) => (
            <li
              key={subCategory.id}
              className={`cursor-pointer text-sm font-medium py-2 px-4  border-1 transition-all duration-300  hover:bg-rouge hover:text-white hover:border-none
              ${selectedCategory === subCategory.id ? "bg-rose text-white" : "bg-white text-black border-gray-900"}`}
              onClick={() => setSelectedCategory(subCategory.id)}
            >
              {subCategory.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )}

      {/* Affichage des produits filtrés */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-24 gap-x-6 pb-16">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <Link
        key={product.id}
        href={`/${slug}/${product.categorieId}/${product.id}`}
        className="hover:scale-105 transition duration-500 relative"
      >
        <div className="relative w-full h-auto aspect-[367/244]">
          {/* Image principale */}
          <img
            src={product.images}
            alt={product.nom}
            className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-0"
          />
          {/* Deuxième image qui apparaît au survol */}
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
    ))
  ) : (
    <p>Aucun produit trouvé</p>
  )}
</div>

    </div>
  );
}

