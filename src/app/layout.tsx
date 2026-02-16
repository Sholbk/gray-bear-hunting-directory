import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ThemeProvider from "@/components/ThemeProvider";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gray Bear Hunting Directory",
  description:
    "Find your optimal hunt. Browse verified guides, outfitters, and charters filtered by success rates, price, physical intensity, and honest reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body
        className={`${workSans.variable} antialiased min-h-screen flex flex-col font-[family-name:var(--font-work-sans)]`}
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
