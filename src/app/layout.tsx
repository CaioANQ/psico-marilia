import type { Metadata } from "next";
import { Fraunces, Figtree } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Marília Santos · Psicóloga Clínica no Ipiranga e Online | CRP 06/110313",
    template: "%s · Marília Santos Psicóloga",
  },
  description:
    "Psicoterapia para relações mais conscientes e saudáveis. Terapia individual, terapia para relacionamentos e grupos terapêuticos — presencial no Ipiranga (São Paulo) e online para todo o Brasil.",
  keywords: [
    "psicóloga",
    "psicóloga Ipiranga",
    "psicóloga São Paulo",
    "terapia online",
    "terapia de casal",
    "terapia para relacionamentos",
    "psicoterapia",
    "dependência emocional",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Marília Santos · Psicóloga",
    title: "Marília Santos · Psicóloga Clínica | Relações mais conscientes",
    description:
      "Psicoterapia para relações mais conscientes e saudáveis — presencial no Ipiranga (SP) e online.",
    images: [{ url: "/images/marilia.jpg", width: 1024, height: 1024 }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Psychologist",
  name: "Marília Santos — Psicóloga Clínica",
  description:
    "Psicoterapia para relações mais conscientes e saudáveis. Atendimento presencial no Ipiranga (São Paulo) e online.",
  url: site.url,
  telephone: "+55 11 99686-4135",
  image: `${site.url}/images/marilia.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.endereco.rua,
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  areaServed: "BR",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${figtree.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
