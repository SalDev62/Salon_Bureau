"use client";
import { useParams } from 'next/navigation';  // Importation de useParams
import { useState, useEffect } from 'react';
import Link from 'next/link';  // Importation de Link pour la navigation
import ErrorProduit from './ErrorProduit';  // Importation du composant d'erreur

const apiUrl = process.env.NEXT_PUBLIC_FETCH_ALL;

async function fetchProductsByCategory(categoryId) {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des produits');
  }
  const data = await response.json();

  // Filtrer les produits par catégorie
  const products = data.filter(product =>
    product.categorieId.includes(Number(categoryId)) // Vérifie si le produit appartient à la catégorie
  );
  
  return products;
}

export default function ProductCategorieMobile() {
  const { slug, categorie } = useParams(); // Utilisation de useParams pour récupérer les paramètres dans l'URL
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categorie) {
      setLoading(true);
      fetchProductsByCategory(categorie)
        .then((products) => {
          setProducts(products);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [categorie]);

  if (loading) {
    return <div>Chargement des produits...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (products.length === 0) {
    return <ErrorProduit message="Aucun produit trouvé pour cette catégorie." linkText="Retour à l'accueil" linkHref="/" />;
  }

  return (
    <div className="p-6">
      {products.length > 0 && (
        <div className="p-2 text-gray-600 text-sm">
          {/* Lien vers le menu */}
          <Link href={`/${products[0].menuId}`} className="underline">
            {products[0].menuName}
          </Link>
          {" / "}
          
          {/* Lien vers la catégorie */}
          <span>{products[0].categorieName}</span> 
        </div>
      )}
      
      {products.length > 0 && <h1 className="text-2xl font-bold mb-4">{products[0].categorieName}</h1>}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/${slug}/${categorie}/${product.id}`}>
            <div className="">
              <img 
                src={product.images.length > 0 ? product.images[0] : '/placeholder.png'} 
                className="w-full h-24 object-cover" 
                alt={product.nom} 
              />
              <h3 className="text-lg font-semibold">{product.nom}</h3>
              <p className="text-sm text-gray-500">Catégorie : {product.categorieName.join(", ")}</p>
              <p className="text-sm text-gray-500">Menu : {product.menuName ? product.menuName.join(", ") : "Non spécifié"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
