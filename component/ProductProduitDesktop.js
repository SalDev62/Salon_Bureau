"use client"
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ErrorProduit from './ErrorProduit';
import { RotateCw } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

const apiUrl = process.env.NEXT_PUBLIC_FETCH_ALL;

async function fetchProductById(productId) {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du produit');
  }
  const data = await response.json();
  return data.find(product => product.id === Number(productId));
}

export default function ProductProduitDesktop() {
  const { produit } = useParams(); 

  const [product, setProduct] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [captchaToken, setCaptchaToken] = useState(null);
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
            // Définir les images initiales à partir de product.images
            setCurrentImages(product.images); // ou product.images3
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
    const handleImageSwitch = () => {
      if (currentImages === product.images) {
        setCurrentImages(product.images3);
        setCurrentIndex(0); // Réinitialise l'index pour éviter un décalage
      } else {
        setCurrentImages(product.images);
        setCurrentIndex(0);
      }
    };
    

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      console.error("reCAPTCHA non validé !");
      return;
    }

    const res = await fetch("/api/contactproduit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, captcha: captchaToken }),
    });

    const data = await res.json();

    if (res.ok) {
      setFormData({ name: "", company: "", email: "", phone: "", message: "", produit: product.nom });
      setCaptchaToken(null);
      setSuccessMessage("Votre message a été envoyé avec succès ! Nous vous répondrons dès que possible.");
      setTimeout(() => setSuccessMessage(""), 5000); // Efface le message après 5 secondes
    } else {
      console.error("Erreur d'envoi:", data.error);
    }
  };

  return (
    <div>
    <div className='max-w-[1350] mx-auto'>
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
      <div className='p-2'>
        <h3 className='text-4xl'>{product.nom}</h3>
        <p className='text-sm font-light '>{product.categorieName.join(', ')}</p>
      </div>
      {/* Bloc global des visuels + description */}
<div className="w-full flex flex-col gap-0">
  {/* Image1 et Image2 côte à côte */}
  <div className="flex flex-row w-full">
    <div className="w-1/2">
      {product.images2[0] && (
        <img src={product.images2[0]} alt={`${product.nom} image 1`} className="w-full h-auto" />
      )}
    </div>
    <div className="w-1/2">
      {product.images[0] && (
        <img src={product.images[0]} alt={`${product.nom} image 2`} className="w-full h-auto" />
      )}
    </div>
  </div>

  {/* Image3 et description côte à côte */}
  <div className="flex flex-row w-full">
    <div className="w-1/2">
      {product.images3[0] && (
        <img src={product.images3[0]} alt={`${product.nom} image 3`} className="w-full h-auto" />
      )}
    </div>
    <div className="w-1/2 bg-white text-black text-sm flex items-center justify-center">
      <p className="m-4">{product.description || null}</p>
    </div>
  </div>
</div>

      

      
          

         
      
    </div>
    <div className=''>
          <div>
            <p className='text-center text-4xl mb-4 pt-16 pb-16'><strong className='font-medium bg-rose text-white p-2 rounded-lg'>Nous contacter</strong> pour ce <strong className='font-medium text-rose'>produit </strong>?</p>
          </div>
            <div className='w-full '> 
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 pt-8 pb-16 text-center">
  <input
    type="text"
    name="produit"
    value={formData.produit}
    readOnly
    className="w-3/4 mx-auto p-2 border rounded bg-white text-gray-700 text-center"
  />
  
  {/* Section "Nom et Nom de société" */}
  <div className="flex justify-between w-3/4 mx-auto gap-x-2">
    <input
      type="text"
      name="name"
      placeholder="Nom *"
      required
      value={formData.name}
      onChange={handleChange}
      className="w-1/2 p-2 border rounded bg-white text-gray-700"
    />
    <input
      type="text"
      name="company"
      placeholder="Nom de société (facultatif)"
      value={formData.company}
      onChange={handleChange}
      className="w-1/2 p-2 border rounded bg-white text-gray-700"
    />
  </div>
  
  {/* Section "Email et Numéro de téléphone" */}
  <div className="flex justify-between w-3/4 mx-auto gap-x-2">
    <input
      type="email"
      name="email"
      placeholder="Email *"
      required
      value={formData.email}
      onChange={handleChange}
      className="w-1/2 p-2 border rounded bg-white text-gray-700"
    />
    <input
      type="tel"
      name="phone"
      placeholder="Numéro de téléphone *"
      value={formData.phone}
      onChange={handleChange}
      className="w-1/2 p-2 border rounded bg-white text-gray-700"
    />
  </div>

  {/* Message */}
  <textarea
    name="message"
    placeholder="Votre message *"
    value={formData.message}
    onChange={handleChange}
    className="w-3/4 mx-auto p-2 border rounded bg-white text-gray-700"
  />

{/* reCAPTCHA */}
<ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_TA_CLE_SITE} // Remplace avec ta clé
          onChange={setCaptchaToken}
          className="w-3/4 mx-auto"
        />
  {/* Bouton */}
  <button
    type="submit"
    className="w-3/4 mx-auto bg-rose text-white p-2 rounded hover:bg-rouge transition duration-300 cursor-pointer"
  >
    Envoyer
  </button>
  {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
</form>

        
        </div>
        
          
      </div>
      </div>
  );
}
