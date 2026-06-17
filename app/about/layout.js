const siteUrl = "https://temmotorrs.com";

export const metadata = {
  title: "About | India's Premium EV Startup | Bhanu Marwaha, Ayush Singh",
  description:
    "TEM Motorrs (Tirupam Electric Mobility) is a New Delhi-based electric two-wheeler startup. Founded by Bhanu Marwaha (ex-Simple Energy, ISRO) and Ayush Singh, building India's most innovative electric motorcycle with 24 patents filed and 13 granted.",
  keywords: [
    "TEM Motorrs founders",
    "Bhanu Marwaha TEM Motorrs",
    "Tirupam Electric Mobility",
    "Indian EV startup founders",
    "electric bike startup India",
    "Simple Energy alumni startup",
    "electric motorcycle company India",
    "EV startup New Delhi",
    "Tirupam Electric Motorrs team",
  ],
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About TEM Motorrs | Built To Think — Indian EV Startup",
    description:
      "Meet the team behind India's most innovative electric motorcycle startup. 24 patents filed, 13 granted, and founders from Simple Energy, ISRO, Emflux Motors.",
    url: `${siteUrl}/about`,
    images: [{ url: "/images/tem-logo.png", width: 1200, height: 630, alt: "About TEM Motorrs" }],
  },
};

const personSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bhanu Marwaha",
    jobTitle: "Co-Founder & CEO",
    worksFor: { "@type": "Organization", name: "TEM Motorrs", url: siteUrl },
    description:
      "Co-Founder and CEO of TEM Motorrs with 10+ years in the EV and energy industry. Previously COO at Webber ElectroCorp, Charger & Battery Lead at Simple Energy, and engineer at ISRO.",
    knowsAbout: ["Electric Vehicles", "Battery Engineering", "EV Charging Systems", "Startup Operations"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ayush Singh",
    jobTitle: "Co-Founder & CMO",
    worksFor: { "@type": "Organization", name: "TEM Motorrs", url: siteUrl },
    description:
      "Co-Founder and CMO of TEM Motorrs. Previously in strategic sales and business development at Vecmocon Technologies and Webber Electrocorp. Co-Chairman of T.E.S.L.A. at NIT Goa.",
    knowsAbout: ["EV Sales", "Business Development", "Electric Vehicle Marketing"],
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
  ],
};

export default function AboutLayout({ children }) {
  return (
    <>
      {personSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
