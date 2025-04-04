// app/sitemap.xml/route.js
export async function GET() {
    const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://salon-bureau.fr/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <!-- Ajoute ici toutes tes autres URLs dynamiques -->
    </urlset>`;
  
    return new Response(body, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
  