import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/components/site/I18nProvider";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Marruecos Viajes Auténticos — Packs, Riads y Experiencias",
  description:
    "Viajes todo incluido por Marruecos: traslados, riads tradicionales, hoteles boutique, hammams, desierto del Sahara y experiencias auténticas.",
  authors: [{ name: "Marruecos Viajes" }],
  openGraph: {
    title: "Marruecos Viajes Auténticos",
    description: "Descubre Marruecos como nunca antes con paquetes a medida.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <I18nProvider>
          <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
