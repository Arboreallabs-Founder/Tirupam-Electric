import { Sora, Outfit } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://temmotorrs.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tem Motorrs | Built To Think",
    template: "%s | Tem Motorrs",
  },
  description:
    "Premium electric two-wheeler with AI safety, structural battery, magnetless motor, and 9 mins fast charging with BMS charger. 300km range. 24 patents. The future rides here.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tem Motorrs | Built To Think",
    description:
      "Premium electric two-wheeler. AI safety. 300km range. 9 mins fast charging. BMS charger.",
    type: "website",
    url: siteUrl,
    siteName: "Tem Motorrs",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tem Motorrs | Built To Think",
    description:
      "Premium electric two-wheeler. AI safety. 300km range. 9 mins fast charging. BMS charger.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
