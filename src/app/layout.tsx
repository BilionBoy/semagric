import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "../../styles/globals.css";
import { Toaster } from "../components/ui/toaster";
import { Montserrat } from "next/font/google";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "AGROTEC PVH 2025 - Plataforma de Gestão",
  description:
    "Sistema de gestão para expositores e administração da feira AGROTEC PVH 2025",
  themeColor: "#0052A0",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <head>
        {/* ⛔ SEM ISSO O PWA NUNCA FUNCIONA CORRETAMENTE */}
        <link rel="manifest" href="/manifest.json" />

        {/* Ícones do PWA */}
        <link rel="apple-touch-icon" href="/imagem-pwa.png" />
        <meta name="theme-color" content="#0052A0" />
      </head>

      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
