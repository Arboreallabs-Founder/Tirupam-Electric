const siteUrl = "https://temmotorrs.com";

export const metadata = {
  title: "Pre-Order | Reserve the TEM Electric Bike | ₹2.25 Lakh",
  description:
    "Reserve your TEM Motorrs Tirupam electric motorcycle today. Be among India's first owners of a 300km-range, 9-minute charging, AI-safety electric bike priced at ₹2.25 lakh. Limited early-adopter slots available.",
  keywords: [
    "pre-order electric bike India",
    "book electric motorcycle India 2025",
    "TEM Motorrs reservation",
    "Tirupam electric bike pre-order",
    "electric motorcycle under 3 lakh India",
    "best electric bike pre-order India",
    "buy premium electric motorcycle India",
    "early adopter electric bike India",
  ],
  alternates: { canonical: `${siteUrl}/pre-order` },
  openGraph: {
    title: "Pre-Order TEM Motorrs | India's Most Advanced Electric Bike",
    description:
      "Reserve your spot. 300km range. 9-minute charging. AI safety. ₹2.25 lakh. Limited early-adopter slots.",
    url: `${siteUrl}/pre-order`,
    images: [{ url: "/images/tem-logo.png", width: 1200, height: 630, alt: "Pre-Order TEM Motorrs Electric Bike" }],
  },
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  itemOffered: {
    "@type": "Product",
    name: "Tirupam Electric Bike",
    brand: { "@type": "Brand", name: "TEM Motorrs" },
    description: "Premium Indian electric motorcycle with 300km range, 9-minute fast charging, AI-driven ARAS safety, structural battery, and magnetless PCB motor.",
  },
  price: "225000",
  priceCurrency: "INR",
  availability: "https://schema.org/PreOrder",
  url: `${siteUrl}/pre-order`,
  seller: {
    "@type": "Organization",
    name: "TEM Motorrs",
    url: siteUrl,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Pre-Order", item: `${siteUrl}/pre-order` },
  ],
};

export default function PreOrderLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
