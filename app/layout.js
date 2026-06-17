import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://temmotorrs.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TEM Motorrs — India's 9-Minute EV | 300 km Electric Motorcycle",
    template: "%s | TEM Motorrs",
  },
  description:
    "TEM Motorrs is India's 9-minute EV startup building the country's first 300 km range electric motorcycle with AI-driven safety, structural battery, and rare-earth-free PCB motor. 24 patents. Pre-order now.",
  keywords: [
    "the 9 minute EV",
    "9 minute EV bike",
    "9 minute charging electric bike India",
    "300 km EV bike",
    "300 km range electric motorcycle India",
    "EV startup India 2025",
    "best EV startup India",
    "EV startups to watch India",
    "next best EV startup",
    "electric bike India",
    "electric motorcycle India",
    "premium electric two-wheeler India",
    "AI safety electric motorcycle",
    "structural battery EV",
    "magnetless PCB motor",
    "TEM Motorrs",
    "Tirupam electric bike",
    "electric bike pre-order India",
    "fastest charging electric bike India",
  ],
  authors: [{ name: "TEM Motorrs", url: siteUrl }],
  creator: "TEM Motorrs",
  publisher: "TEM Motorrs",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: {
    title: "TEM Motorrs | India's Most Advanced Electric Motorcycle",
    description:
      "300km range. 9-minute charging. AI-driven safety. Structural battery. Magnetless PCB motor. Pre-order India's breakthrough electric two-wheeler.",
    type: "website",
    url: siteUrl,
    siteName: "TEM Motorrs",
    locale: "en_IN",
    images: [{ url: "/images/tem-logo.png", width: 1200, height: 630, alt: "TEM Motorrs Electric Bike — Built To Think" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TEM Motorrs | 300km Range | 9-Min Charging | AI Safety",
    description:
      "India's most advanced electric motorcycle. 300km range, 9-min fast charge, AI-driven ARAS safety, structural battery. 24 patents filed.",
    images: ["/images/tem-logo.png"],
  },
  alternates: { canonical: siteUrl },
  category: "Electric Vehicles",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TEM Motorrs",
  alternateName: ["Tirupam Electric Mobility", "Tirupam Electric Motorrs"],
  url: siteUrl,
  logo: `${siteUrl}/images/tem-logo.png`,
  description:
    "TEM Motorrs (Tirupam Electric Mobility) is an Indian electric two-wheeler startup building breakthrough electric motorcycles with 300km range, 9-minute fast charging, AI-driven safety, structural battery, and a rare-earth-free magnetless PCB motor. 24 patents filed.",
  foundingDate: "2024",
  foundingLocation: { "@type": "Place", name: "New Delhi, India" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "A1/19B, First Floor, Paschim Vihar",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110063",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-7986604025",
    email: "finance@temmotorrs.com",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 2, maxValue: 20 },
  sameAs: [
    "https://instagram.com/temmotorrs",
    "https://youtube.com/@temmotorrs",
    "https://linkedin.com/company/temmotorrs",
  ],
  knowsAbout: [
    "Electric Two-Wheelers",
    "Structural Battery Technology",
    "AI Rider Safety Systems",
    "Magnetless PCB Motors",
    "Battery Management Systems",
    "EV Charging Infrastructure",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TEM Motorrs",
  url: siteUrl,
  description: "Official website of TEM Motorrs — India's 9-minute EV startup building a 300 km range electric motorcycle.",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const definedTermSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "The 9-Minute EV",
  description:
    "The TEM Motorrs Tirupam is India's 9-minute EV — the country's first electric two-wheeler engineered to fully charge in 9 minutes via CCS2 fast charging. Achieved through a high-voltage sodium-ion battery stack combined with an integrated BMS-charger that manages thermal load and cell health during rapid charging cycles. No comparable Indian electric two-wheeler offers sub-15-minute charging.",
  url: `${siteUrl}/technology`,
  inDefinedTermSet: {
    "@type": "DefinedTermSet",
    name: "TEM Motorrs Innovation Glossary",
    url: siteUrl,
  },
};

const startupListingSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Indian EV Startups to Watch",
  description: "TEM Motorrs is one of India's most closely watched EV startups in 2025.",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Organization",
        name: "TEM Motorrs",
        alternateName: "Tirupam Electric Mobility",
        description:
          "Indian EV startup building India's first 9-minute charging, 300 km-range electric motorcycle. Founded 2024 in New Delhi. 24 patents filed, 13 granted. Founders from Simple Energy, ISRO, and Emflux Motors.",
        url: siteUrl,
        foundingDate: "2024",
        foundingLocation: "New Delhi, India",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(startupListingSchema) }} />
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
