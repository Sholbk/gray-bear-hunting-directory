import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Gray Bear Hunting Directory",
  description:
    "The Trusted Directory for Hunting & Fishing Resources. Find verified guides, outfitters, and charters filtered by success rates, price, physical intensity, and honest reviews.",
  openGraph: {
    title: "Gray Bear Hunting Directory",
    description:
      "The Trusted Directory for Hunting & Fishing Resources. Find verified guides, outfitters, and charters filtered by success rates, price, physical intensity, and honest reviews.",
    images: [
      {
        url: "/images/og-logo.png",
        width: 1200,
        height: 630,
        alt: "Gray Bear Hunting Directory",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gray Bear Hunting Directory",
    description:
      "The Trusted Directory for Hunting & Fishing Resources. Find verified guides, outfitters, and charters filtered by success rates, price, physical intensity, and honest reviews.",
    images: ["/images/og-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased min-h-screen flex flex-col font-[family-name:var(--font-inter)]`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1 pb-20 lg:pb-0">{children}</main>
          <Footer />
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
