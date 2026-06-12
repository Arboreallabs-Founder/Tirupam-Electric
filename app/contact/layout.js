const siteUrl = "https://temmotorrs.com";

export const metadata = {
  title: "Contact | Invest, Partner, or Pre-Order the TEM Electric Bike",
  description:
    "Get in touch with TEM Motorrs for pre-orders, investment inquiries, strategic partnerships, or media requests. Email: finance@temmotorrs.com. Phone: +91-7986604025. New Delhi, India.",
  keywords: [
    "TEM Motorrs contact",
    "electric bike pre-order India contact",
    "invest in EV startup India",
    "TEM Motorrs investor relations",
    "electric motorcycle partnership India",
    "Tirupam Electric Mobility contact",
  ],
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact TEM Motorrs | Pre-Order, Invest, Partner",
    description:
      "Reach TEM Motorrs for pre-orders, investment, partnerships, or media. India's premium electric motorcycle startup.",
    url: `${siteUrl}/contact`,
    images: [{ url: "/images/tem-logo.png", width: 1200, height: 630, alt: "Contact TEM Motorrs" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` },
  ],
};

export default function ContactLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
