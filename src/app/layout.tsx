import type { Metadata } from "next";
import { Fraunces, Figtree } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
      "Psicóloga no Ipiranga e Online · Terapia Individual e de Casal | Marília Santos",
    template: "%s · Marília Santos Psicóloga",
  },
  description:
    "Psicóloga clínica no Ipiranga (São Paulo) e online para todo o Brasil. Terapia individual, terapia de casal e grupos terapêuticos com Marília Santos, CRP 06/110313. Agende pelo WhatsApp.",
  keywords: [
    "psicóloga",
    "psicólogo Ipiranga",
    "psicóloga Ipiranga",
    "psicóloga São Paulo",
    "psicóloga online",
    "terapia online",
    "terapia de casal",
    "terapia de casal Ipiranga",
    "terapia para relacionamentos",
    "psicoterapia",
    "dependência emocional",
    "grupos terapêuticos",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Marília Santos · Psicóloga",
    title: "Psicóloga no Ipiranga e Online · Terapia Individual e de Casal",
    description:
      "Psicoterapia para relações mais conscientes e saudáveis. Presencial no Ipiranga (SP) e online para todo o Brasil — CRP 06/110313.",
    images: [{ url: "/images/marilia.jpg", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Psicóloga no Ipiranga e Online | Marília Santos",
    description:
      "Terapia individual, terapia de casal e grupos terapêuticos — presencial no Ipiranga (SP) e online.",
    images: ["/images/marilia.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: "Marília Santos · Psicóloga",
      alternateName: "Psicóloga Marília Santos",
      inLanguage: "pt-BR",
      publisher: { "@id": `${site.url}/#psicologa` },
    },
    {
      "@type": "Psychologist",
      "@id": `${site.url}/#psicologa`,
      name: "Marília Santos — Psicóloga Clínica",
      description:
        "Psicoterapia para relações mais conscientes e saudáveis. Terapia individual, terapia de casal e grupos terapêuticos — presencial no Ipiranga (São Paulo) e online para todo o Brasil.",
      url: site.url,
      telephone: "+5511996864135",
      image: `${site.url}/images/marilia.jpg`,
      logo: `${site.url}/images/logo.png`,
      identifier: "CRP 06/110313",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.endereco.rua,
        addressLocality: "São Paulo",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      areaServed: [
        { "@type": "City", name: "São Paulo" },
        { "@type": "Country", name: "Brasil" },
      ],
      priceRange: "$$",
      knowsAbout: [
        "Terapia de casal",
        "Terapia para relacionamentos",
        "Dependência emocional",
        "Terapia Cognitivo-Comportamental",
        "Grupos terapêuticos",
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Terapia individual",
            description:
              "Sessões de 50 minutos, presenciais no Ipiranga ou online.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Terapia de casal (terapia para relacionamentos)",
            description:
              "Sessões de 1h20 para casais e vínculos, presenciais ou online.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Grupos terapêuticos",
            description:
              "Encontros em grupo sobre vínculos, pertencimento e padrões relacionais.",
          },
        },
      ],
    },
  ],
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
        <Analytics />
      </body>
    </html>
  );
}
