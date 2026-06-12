const siteUrl = "https://temmotorrs.com";

export const metadata = {
  title: "The 9-Minute EV | 300 km Electric Bike — Tirupam by TEM Motorrs",
  description:
    "The Tirupam is India's 9-minute EV — a 300 km range electric motorcycle with CCS2 fast charging, AI-driven ARAS safety, structural sodium-ion battery, and rare-earth-free PCB motor. The fastest-charging electric bike in India. ₹2.25 lakh.",
  keywords: [
    "the 9 minute EV",
    "9 minute EV bike",
    "300 km EV bike",
    "300 km range electric motorcycle India",
    "fastest charging electric bike India",
    "Tirupam electric bike",
    "9 minute charging electric bike",
    "electric motorcycle specifications India",
    "AI safety electric bike",
    "best electric bike India 2025",
    "structural battery electric motorcycle",
    "magnetless motor electric two-wheeler",
    "TEM Motorrs bike specs",
  ],
  alternates: { canonical: `${siteUrl}/bike` },
  openGraph: {
    title: "The 9-Minute EV | 300 km Electric Bike | TEM Motorrs Tirupam",
    description:
      "India's 9-minute EV. 300 km range electric motorcycle with AI-driven safety, structural sodium-ion battery, rare-earth-free PCB motor. ₹2.25 lakh.",
    url: `${siteUrl}/bike`,
    images: [{ url: "/images/tem-logo.png", width: 1200, height: 630, alt: "Tirupam Electric Bike by TEM Motorrs" }],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Tirupam Electric Bike",
  brand: { "@type": "Brand", name: "TEM Motorrs" },
  manufacturer: {
    "@type": "Organization",
    name: "TEM Motorrs",
    url: siteUrl,
  },
  description:
    "The Tirupam is a premium Indian electric motorcycle with 300km structural battery range, 9-minute CCS2 fast charging, AI-driven ARAS rider safety, rare-earth-free magnetless PCB motor, and an integrated BMS-charger for home 3-pin socket charging.",
  category: "Electric Motorcycle",
  url: `${siteUrl}/bike`,
  image: `${siteUrl}/images/tem-logo.png`,
  offers: {
    "@type": "Offer",
    price: "225000",
    priceCurrency: "INR",
    availability: "https://schema.org/PreOrder",
    url: `${siteUrl}/pre-order`,
    priceValidUntil: "2028-12-31",
    seller: { "@type": "Organization", name: "TEM Motorrs" },
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Range", value: "300 km", unitCode: "KMT" },
    { "@type": "PropertyValue", name: "Fast Charging Time", value: "9 minutes" },
    { "@type": "PropertyValue", name: "Home Charging", value: "Standard 3-pin socket" },
    { "@type": "PropertyValue", name: "Motor Type", value: "Magnetless PCB Motor (rare-earth-free)" },
    { "@type": "PropertyValue", name: "Battery Technology", value: "Structural Sodium-Ion Battery" },
    { "@type": "PropertyValue", name: "Safety System", value: "AI-Driven ARAS (Adaptive Rider Assistance System)" },
    { "@type": "PropertyValue", name: "Patents", value: "24 patents filed" },
    { "@type": "PropertyValue", name: "Market", value: "India" },
    { "@type": "PropertyValue", name: "Segment", value: "Urban Premium" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "The Bike", item: `${siteUrl}/bike` },
  ],
};

export default function BikeLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
