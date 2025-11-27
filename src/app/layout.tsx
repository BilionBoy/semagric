import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "../../styles/globals.css";
import { Toaster } from "../components/ui/toaster";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "AGROTEC PVH 2025 - Plataforma de Gestão",
  description:
    "Sistema de gestão para expositores e administração da feira AGROTEC PVH 2025",
  generator: "v0.app",
  // FAVICON REMOVIDO
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
