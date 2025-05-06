export async function GET() {
  const API_URL = process.env.API_URLP;
  const API_TOKEN = process.env.TOKEN;
  const PAGE_SIZE = 100; // Nombre de produits par page
  let produits = [];
  let currentPage = 1;

  try {
    while (true) {
      // Ajoutez les paramètres de pagination à l'URL de l'API
      const response = await fetch(`${API_URL}?page=${currentPage}&size=${PAGE_SIZE}`, {
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

      if (data.results.length === 0) {
        break; // Si la réponse est vide, sortir de la boucle
      }

      const nouveauxProduits = data.results.map((produit) => ({
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

      produits = [...produits, ...nouveauxProduits];

      // Si le nombre de produits récupérés est inférieur à la taille de la page, on peut arrêter.
      if (data.results.length < PAGE_SIZE) {
        break;
      }

      // Passer à la page suivante
      currentPage++;
    }

    return new Response(JSON.stringify(produits), { status: 200 });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
