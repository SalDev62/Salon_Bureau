// app/api/sitemap/route.js

export async function GET(req) {
    const baseUrl = "https://salon-bureau.fr";
  
    // Liste des pages de ton site à inclure dans le sitemap
    const pages = ["/", "/produits", "/contact"];
  
    // Générer le sitemap en XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => `<url><loc>${baseUrl}${page}</loc></url>`)
        .join("")}
    </urlset>`;
  
    // Répondre avec le sitemap en XML
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",  // Utiliser 'application/xml' au lieu de 'text/xml'
      },
    });
}
