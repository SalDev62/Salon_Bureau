export async function GET() {
  const baseUrl = "https://salon-bureau.fr";

  // Pages statiques
  const staticPages = [
    "",
    "a-propos",
    "contact",
    "mention-legal",
    "produits",
  ];

  // Pages dynamiques (exemple)
  const slugs = ["bureau", "chaise", "armoire"]; // 👉 À générer dynamiquement depuis ta DB si possible
  const categories = ["direction", "réunion"];
  const produits = ["bureau-en-bois", "chaise-ergonomique"];

  const dynamicUrls = [];

  for (const slug of slugs) {
    dynamicUrls.push(`${slug}`);
    for (const cat of categories) {
      dynamicUrls.push(`${slug}/${cat}`);
      for (const prod of produits) {
        dynamicUrls.push(`${slug}/${cat}/${prod}`);
      }
    }
  }

  const urls = [...staticPages, ...dynamicUrls];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (path) => `
    <url>
      <loc>${baseUrl}/${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`
      )
      .join("")}
  </urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
