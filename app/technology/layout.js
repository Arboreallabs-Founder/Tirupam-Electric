const siteUrl = "https://www.temmotorrs.com";

export const metadata = {
  title: "How the 9-Minute EV Works | TEM Motorrs Technology",
  description:
    "How India's 9-minute EV achieves 300 km range: six patented breakthrough technologies — structural sodium-ion battery, CCS2 fast charging, AI-driven ARAS safety, rare-earth-free magnetless PCB motor, and integrated BMS-charger. TEM Motorrs Tirupam.",
  keywords: [
    "the 9 minute EV technology",
    "how 9 minute EV charging works",
    "300 km EV battery technology",
    "structural battery electric vehicle",
    "9 minute electric bike charging",
    "magnetless PCB motor EV",
    "AI safety electric motorcycle India",
    "ARAS ADAS electric two-wheeler",
    "how structural battery works",
    "electric bike fast charging technology",
    "rare earth free electric motor India",
    "BMS charger electric bike",
    "sodium ion battery electric bike",
    "CCS2 fast charging two-wheeler",
  ],
  alternates: { canonical: `${siteUrl}/technology` },
  openGraph: {
    title: "How India's 9-Minute EV Works | TEM Motorrs Technology",
    description:
      "The technology behind India's 9-minute EV: structural sodium-ion battery, CCS2 fast charging, AI safety, rare-earth-free PCB motor. Six innovations, 24 patents.",
    url: `${siteUrl}/technology`,
    images: [{ url: "/images/tem-logo.png", width: 1200, height: 630, alt: "TEM Motorrs Technology — 6 Innovations" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does 9-minute electric bike charging work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TEM Motorrs achieves 9-minute fast charging using a high-voltage sodium-ion battery stack combined with CCS2 fast-charging protocol. The integrated BMS (Battery Management System) charger manages thermal load and cell health during rapid charging cycles, enabling consistent 9-minute full charges without battery degradation. The bike can also charge overnight via any standard 3-pin household socket.",
      },
    },
    {
      "@type": "Question",
      name: "What is a structural battery in an electric vehicle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A structural battery integrates the battery cells into the vehicle's load-bearing chassis, so the battery simultaneously stores energy and provides structural rigidity. In the TEM Motorrs electric bike, the battery IS the frame — this eliminates the weight of a separate chassis, enables a larger battery pack, improves crash safety by distributing impact across the battery structure, and directly enables the 300km range target.",
      },
    },
    {
      "@type": "Question",
      name: "What is ARAS and how does it keep riders safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ARAS (Adaptive Rider Assistance System) is TEM Motorrs' AI-driven safety layer. It continuously processes rider behavior, road conditions, and environmental data in real-time to provide proactive safety interventions — responding before you perceive danger. Unlike static ADAS systems, ARAS uses fleet-wide machine learning: every TEM on the road contributes data that makes every other TEM safer over time.",
      },
    },
    {
      "@type": "Question",
      name: "What is a magnetless PCB motor and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A magnetless PCB (Printed Circuit Board) motor eliminates the rare-earth permanent magnets found in conventional EV motors. TEM Motorrs' design uses printed circuit board coil technology instead, removing dependence on rare-earth materials like neodymium (mainly sourced from China). This provides supply-chain independence, lighter weight, and consistent torque — without sacrificing performance.",
      },
    },
    {
      "@type": "Question",
      name: "Can I charge the TEM electric bike at home without a special charger?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The TEM Motorrs bike features an integrated BMS-charger that connects directly to any standard 3-pin household socket in India. No home charger installation, no proprietary charging dock, and no expensive charging infrastructure is required. Simply plug in overnight for a full charge.",
      },
    },
    {
      "@type": "Question",
      name: "How many patents does TEM Motorrs have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TEM Motorrs has filed 24 patents covering vehicle design, the magnetless PCB motor, the structural battery architecture, suspension systems, and the integrated BMS-charger. 13 patents have been granted by the Indian Patent Office.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Technology", item: `${siteUrl}/technology` },
  ],
};

export default function TechnologyLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
