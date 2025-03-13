export async function GET() {
    const API_URL = process.env.API_URLC
    const API_TOKEN = process.env.TOKEN; // Mets ici ton vrai Token API
  
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Token ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        console.error("Erreur API Baserow :", response.status, await response.text());
        throw new Error("Erreur lors de la récupération des produits");
      }
  
      const data = await response.json();
  
      // On extrait bien les URLs des images
      const produits = data.results.map((produit) => ({
        id: produit.id,
        nom: produit.Nom,
        menus: produit.MenusAssocié?.map((cat) => cat.value) || [],
        produits: produit.Produits?.map((cat) => cat.value) || [],
      }));
  
      return new Response(JSON.stringify(produits), { status: 200 });
    } catch (error) {
      console.error("Erreur serveur :", error);
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
  }
  