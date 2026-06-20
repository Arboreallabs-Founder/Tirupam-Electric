/** @type {import('next').MetadataRoute.Robots} */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/pre-order/success", "/api/"],
      },
    ],
    sitemap: "https://www.temmotorrs.com/sitemap.xml",
  };
}
