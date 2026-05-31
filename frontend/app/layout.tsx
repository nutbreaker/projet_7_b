import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import "./globals.css";

// I've no words for this...
// From css @import to js...
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700"]
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "Abricot.co",
  description: "Gestion de Projet Collaboratif",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
