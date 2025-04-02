// app/api/sitemap/route.js

export async function GET(req) {
    const baseUrl = "https://salon-bureau.fr";
  
    // Ajoute toutes tes pages ici
    const pages = ["/", "/produits", "/contact"];
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => `<url><loc>${baseUrl}${page}</loc></url>`)
        .join("")}
    </urlset>`;
  
    // Répondre avec le sitemap
    return new Response(sitemap, {
      headers: {
        "Content-Type": "text/xml",
      },
    });
  }
  