export async function GET() {
    const API_URL = process.env.API_URLP;
    const API_TOKEN = process.env.TOKEN; // Remplace par ton token réel
  
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
  
      const produits = data.results.map((produit) => ({
        id: produit.id,
        nom: produit.Nom || "Sans nom",
        categorieId: produit.Catégorie?.map((cat) => cat.id) || [],
        categorieName: produit.Catégorie?.map((cat) => cat.value) || [],
        description : produit.Description,
        menuId: produit.Menus?.map((menu) => menu.ids?.database_table_465663) || [],
        menuName: produit.Menus?.map((menu) => menu.value) || [],
        images: [
          ...(produit.Image1 ? produit.Image1.map((img) => img.url) : []), // Récupère les images stockées
          ...(produit.ImageUrl1 ? [produit.ImageUrl1] : []), // Ajoute les images en URL directe
        ],
        images2: [
          ...(produit.Image2 ? produit.Image2.map((img) => img.url) : []), // Récupère les images stockées
          ...(produit.ImageUrl2 ? [produit.ImageUrl2] : []), // Ajoute les images en URL directe
        ],
        images3: [
          ...(produit.Image3 ? produit.Image3.map((img) => img.url) : []), // Récupère les images stockées
          ...(produit.ImageUrl3 ? [produit.ImageUrl3] : []), // Ajoute les images en URL directe
        ],
      }));
  
      return new Response(JSON.stringify(produits), { status: 200 });
    } catch (error) {
      console.error("Erreur serveur :", error);
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
  }
  