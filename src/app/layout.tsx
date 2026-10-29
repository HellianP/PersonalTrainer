import type { Metadata, Viewport } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import { Header, type NavItem } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppIcon } from "@/components/Icons";
import { site } from "@/config/site";
import { isModuleEnabled } from "@/config/modules";
import { asset } from "@/lib/base";
import { waMessages, whatsappUrl } from "@/lib/whatsapp";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Barlow_Condensed({ subsets: ["latin"], variable: "--font-heading", weight: ["600", "700", "800"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Consultoria de Treino Online`, template: `%s | ${site.name}` },
  description: "Consultoria de treino online para o Brasil inteiro com Adilson Gomes, Bacharel em Educação Física (CREF 015474-G/CE). Treino individualizado e acompanhamento de perto.",
  openGraph: { type: "website", locale: "pt_BR", siteName: site.fullName },
  icons: { icon: asset("/img/favicon.svg") },
};

export const viewport: Viewport = { themeColor: "#0f1115" };

function buildNav(): NavItem[] {
  const nav: NavItem[] = [{ href: "/sobre", label: "Sobre" }];
  if (isModuleEnabled("before_after")) nav.push({ href: "/resultados", label: "Resultados" });
  if (isModuleEnabled("plans")) nav.push({ href: "/planos", label: "Planos" });
  if (isModuleEnabled("availability_calendar")) nav.push({ href: "/agenda", label: "Agenda" });
  nav.push({ href: "/contato", label: "Contato" });
  return nav;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Bacharel em Educação Física",
  description: `${site.role}. ${site.cref}.`,
  url: site.url,
  sameAs: [site.instagramUrl],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = buildNav();
  return (
    <html lang="pt-BR" className={`${inter.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <Header nav={nav} />
        <main id="conteudo">{children}</main>
        <Footer nav={nav} />
        <a className="wa-float" href={whatsappUrl(waMessages.geral)} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
          <WhatsAppIcon />
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
