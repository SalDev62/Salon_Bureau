export async function GET(req) {
  const API_URL = "https://api.baserow.io/api/database/rows/table/465189/?user_field_names=true";
  const API_TOKEN = process.env.TOKEN;

  const SIZE = 100; // Taille max autorisée par Baserow
  let page = 1;
  let totalPages = 1;
  let allProduits = [];

  try {
    while (page <= totalPages) {
      const requestUrl = `${API_URL}&page=${page}&size=${SIZE}`;

      const response = await fetch(requestUrl, {
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

      // Calcul du nombre total de pages une seule fois (à la première requête)
      if (page === 1) {
        const total = data.count || 0;
        totalPages = Math.ceil(total / SIZE);
        console.log(`Total de produits: ${total}, nombre de pages: ${totalPages}`);
      }

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

      allProduits = allProduits.concat(produits);
      page++;
    }

    // On retourne tous les produits
    return new Response(
      JSON.stringify({
        total: allProduits.length,
        produits: allProduits,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur serveur :", error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
