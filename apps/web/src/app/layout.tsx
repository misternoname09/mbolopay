import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Mbolo Pay | La Solidarité à la Sénégalaise",
  description: "Collectez des fonds pour vos projets, événements ou causes sociales en toute sécurité via Wave, Orange Money et Carte Bancaire. Zéro commission.",
  openGraph: {
    title: "Mbolo Pay | La Solidarité à la Sénégalaise",
    description: "La plateforme 100% locale pour vos cagnottes en ligne. Wave, Orange Money, Carte Bancaire. Zéro commission.",
    images: ["/og-image.jpg"],
    locale: "fr_SN",
    type: "website",
    siteName: "Mbolo Pay"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mbolo Pay",
    description: "Collectez des fonds en toute confiance au Sénégal.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
