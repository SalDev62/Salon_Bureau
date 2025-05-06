import Link from "next/link";
import Image from "next/image";
import ErrorProduit from "./ErrorProduit";
import SkeletonLoader from "./SkeletonLoader";

// Fonction serveur pour récupérer les produits
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

// Fonction serveur pour récupérer les catégories
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

export default async function ProductMenuDesktop({ slug }) {
  const products = await fetchProductsByCategory(slug);
  const menu = await fetchCategoriesBySlug(slug);

  if (products.length === 0) {
    return <ErrorProduit message="Aucun produit trouvé pour cette catégorie." linkText="Retour à l'accueil" linkHref="/" />;
  }

  return (
    <div className="p-6 max-w-[1350px] mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">{products[0]?.menuName}</h1>

      {/* Menu des sous-catégories désactivé ici (à activer côté client si nécessaire) */}

      {/* Affichage des produits */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-24 gap-x-6 pb-16">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/${slug}/${product.categorieId}/${product.id}`}
            className="hover:scale-105 transition duration-500 relative"
          >
            <div className="relative w-full h-auto aspect-[367/244]">
              <img
                src={product.images}
                alt={product.nom}
                className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-0"
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
        ))}
      </div>
    </div>
  );
}
