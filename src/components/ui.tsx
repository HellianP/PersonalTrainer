import type { ReactNode } from "react";
import { WhatsAppIcon } from "./Icons";
import { Reveal } from "./Reveal";

export function SectionHead({ tag, title, subtitle, center = true }: { tag?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <Reveal className={`section-head${center ? " center" : ""}`}>
      {tag && <span className="eyebrow">{tag}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </Reveal>
  );
}

export function PageHero({ tag, title, subtitle, children }: { tag?: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="container">
        {tag && <span className="eyebrow">{tag}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

export function WaButton({ href, children, variant = "whatsapp" }: { href: string; children: ReactNode; variant?: "whatsapp" | "primary" }) {
  return (
    <a className={`btn btn-${variant}`} href={href} target="_blank" rel="noopener noreferrer">
      <WhatsAppIcon />
      {children}
    </a>
  );
}

export const DISCLAIMER = "Resultados individuais variam. Cada caso depende de rotina, alimentação, genética e dedicação. Imagens publicadas com autorização por escrito dos alunos.";
