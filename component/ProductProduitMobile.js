"use client"
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ErrorProduit from './ErrorProduit';
const apiUrl = process.env.NEXT_PUBLIC_FETCH_ALL;

async function fetchProductById(productId) {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du produit');
  }
  const data = await response.json();
  return data.find(product => product.id === Number(productId));
}

export default function ProductProduitMobile() {
  const { produit } = useParams(); 

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    produit: "", // Initialisé vide, mis à jour avec le produit
  });

  useEffect(() => {
    if (produit) {
      setLoading(true);
      fetchProductById(produit)
        .then((product) => {
          setProduct(product);
          setLoading(false);
          if (product) {
            setFormData((prev) => ({ ...prev, produit: product.nom })); // Mise à jour automatique
          }
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [produit]);

  if (loading) return <div>Chargement du produit...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!product) {
    return (
      <ErrorProduit
        message="Produit introuvable"
        linkText="Retour à l'accueil"
        linkHref="/"
      />
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch("/api/contactproduit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      setFormData({ name: "", company: "", email: "", phone: "", message: "", produit: product.nom });
      setSuccessMessage("Votre message a été envoyé avec succès ! Nous vous répondrons dès que possible.");
      setTimeout(() => setSuccessMessage(""), 5000); // Efface le message après 5 secondes
    } else {
      console.error("Erreur d'envoi:", data.error);
    }
  };

  return (
    <div>
        <div className="p-2 text-gray-600 text-sm">
  {/* Lien vers le menu */}
  <Link href={`/${product.menuId}`} className="underline">
    {product.menuName}
  </Link> 
  {" / "}  

  {/* Lien vers la catégorie */}
  {product.categorieName.map((categorie, index) => (
    <span key={index}>
      <Link href={`/${product.menuId}/${product.categorieId}`} className="underline">
        {categorie}
      </Link>
      {index < product.categorieName.length - 1 && " / "}
    </span>
  ))} 
  {" / "}  

  {/* Nom du produit (non cliquable) */}
  <span className="font-semibold">{product.nom}</span>
</div>

      {product.images.length > 0 ? (
        <div>{product.images.map((image, index) => (
          <img key={index} src={image} alt={product.nom} className="w-full h-auto" />
        ))}</div>
      ) : <p>Aucune image disponible</p>}

      <div className='p-2'>
        <h3 className='text-2xl'>{product.nom}</h3>
        <p className='text-sm font-light '>{product.categorieName.join(', ')}</p>
      </div>
      
      <div className='p-2 text-md'>
        <p>{product.description || 'Pas de description disponible'}</p>
      </div>
<div>

        <div>{product.images2.map((image, index) => (
          <img key={index} src={image} alt={product.nom} className="w-full h-auto" />
        ))}</div>
     


        <div>{product.images3.map((image, index) => (
          <img key={index} src={image} alt={product.nom} className="w-full h-auto" />
        ))}</div>
   

</div>
      <div className='p-4'>
        <p className='text-center text-xl mb-4'>Nous contacter pour ce produit ?</p>
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="produit" value={formData.produit} readOnly className="w-full p-2 border rounded bg-gray-100 text-gray-700" />
          <input type="text" name="name" placeholder="Nom *" required value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="company" placeholder="Nom de société (facultatif)" value={formData.company} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="Email *" required value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="tel" name="phone" placeholder="Numéro de téléphone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
          <textarea name="message" placeholder="Votre message" value={formData.message} onChange={handleChange} className="w-full p-2 border rounded" />
          
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
