/** @type {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const base = "https://temmotorrs.com";
  const now = new Date();

  const paths = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/bike", priority: 0.9, changeFrequency: "weekly" },
    { path: "/technology", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.85, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
    { path: "/pre-order", priority: 0.9, changeFrequency: "monthly" },
    { path: "/pre-order/success", priority: 0.3, changeFrequency: "yearly" },
  ];

  return paths.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
