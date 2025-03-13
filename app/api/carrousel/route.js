
export async function GET() {
    const API_URL =  process.env.API_URLI;
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
  
      const images = data.results.map((image) => ({
        id: image.id,
        images: [
          ...(image.ImageCarrousel ? image.ImageCarrousel.map((img) => img.url) : []), // Récupère les images stockées
        ],
      }));
  
      return new Response(JSON.stringify(images), { status: 200 });
    } catch (error) {
      console.error("Erreur serveur :", error);
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
  }
  