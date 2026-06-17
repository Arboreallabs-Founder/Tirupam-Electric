const siteUrl = "https://temmotorrs.com";

export const metadata = {
  title: "Investors | TEM Motorrs — Early-Stage EV Opportunity",
  description:
    "TEM Motorrs is raising early-stage capital to bring India's 9-minute EV to market. 24 patents filed, 13 granted, and a founding team with deep EV domain expertise. Learn about the opportunity.",
  alternates: { canonical: `${siteUrl}/investors` },
  robots: { index: false, follow: false }, // keep off search while in early raise
};

export default function InvestorsLayout({ children }) {
  return children;
}
