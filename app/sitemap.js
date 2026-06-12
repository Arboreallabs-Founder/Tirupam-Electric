/** @type {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const base = "https://temmotorrs.com";

  return [
    { url: `${base}`,              lastModified: "2026-06-13", changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/bike`,         lastModified: "2026-06-13", changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/technology`,   lastModified: "2026-06-13", changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/pre-order`,    lastModified: "2026-06-13", changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`,        lastModified: "2026-06-13", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`,      lastModified: "2026-06-13", changeFrequency: "monthly", priority: 0.8 },
  ];
}
