import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mabres Imobiliária | Sorocaba",
  description: "Compra, venda e locação em Sorocaba. Atendimento rápido pelo WhatsApp.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Mabres Imobiliária | Sorocaba",
    description: "Imóveis em Sorocaba: casas, apartamentos, terrenos e comercial.",
    images: ["/brand/logo.jpg"],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="container" style={{ padding: "22px 0 64px" }}>
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
