export async function GET() {
  const API_URL = process.env.API_URLP;
  const API_TOKEN = process.env.TOKEN;
  const PAGE_SIZE = 200; // Nombre d'articles par page (200 est le max recommandé)
  
  try {
    let allResults = [];
    let next = `${API_URL}?size=${PAGE_SIZE}`; // Baserow utilise "size" et "offset"

    while (next) {
      const response = await fetch(next, {
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
        description: produit.Description,
        menuId: produit.Menus?.map((menu) => menu.ids?.database_table_465663) || [],
        menuName: produit.Menus?.map((menu) => menu.value) || [],
        images: [
          ...(produit.Image1 ? produit.Image1.map((img) => img.url) : []),
          ...(produit.ImageUrl1 ? [produit.ImageUrl1] : []),
        ],
        images2: [
          ...(produit.Image2 ? produit.Image2.map((img) => img.url) : []),
          ...(produit.ImageUrl2 ? [produit.ImageUrl2] : []),
        ],
        images3: [
          ...(produit.Image3 ? produit.Image3.map((img) => img.url) : []),
          ...(produit.ImageUrl3 ? [produit.ImageUrl3] : []),
        ],
      }));

      allResults = [...allResults, ...produits];

      // Si "next" est fourni dans la réponse, on continue
      next = data.next;
    }

    return new Response(JSON.stringify(allResults), { status: 200 });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
