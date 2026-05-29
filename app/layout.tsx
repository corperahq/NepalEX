import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/site-chrome";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nepalex.com"),
  title: {
    default: "NepalEX — Nepal's #1 Courier & Logistics Network",
    template: "%s | NepalEX",
  },
  description:
    "NepalEX (Nepal Express Parcel and Logistics) — fast, reliable domestic and international courier, air cargo, sea cargo and ecommerce logistics. Serving Nepal since 2012.",
  keywords: [
    "courier Nepal",
    "cargo Nepal",
    "logistics Nepal",
    "air cargo",
    "sea cargo",
    "parcel delivery",
    "NepalEX",
    "Nepal Express",
  ],
  openGraph: {
    title: "NepalEX — Nepal's #1 Courier & Logistics Network",
    description:
      "Fast, reliable domestic and international courier, cargo and logistics. Serving Nepal since 2012.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
