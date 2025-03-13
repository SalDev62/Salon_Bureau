
export async function GET() {
  const API_URL =  process.env.API_URLP;
  const API_TOKEN =  process.env.TOKEN; // Remplace par ton token réel

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
      description: produit.Description || "Pas de description",
      categorie: produit.Catégorie?.map((cat) => cat.value) || [],
      menu: produit.Menus?.map((menu) => menu.value) || [],
      images: [
        ...(produit.Image1 ? produit.Image1.map((img) => img.url) : []), // Récupère les images stockées
        ...(produit.ImageUrl ? [produit.ImageUrl] : []), // Ajoute les images en URL directe
      ],
    }));

    return new Response(JSON.stringify(produits), { status: 200 });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
