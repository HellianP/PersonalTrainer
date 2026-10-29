import type { Metadata } from "next";
import { requireModule } from "@/lib/modules";
import { plans } from "@/data/content";
import { waPlan } from "@/lib/whatsapp";
import { Icon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Planos", description: "Planos de consultoria de treino online: mensal, trimestral e semestral." };

export default function Planos() {
  requireModule("plans");
  return (
    <>
      <PageHero tag="Planos" title="Escolha o acompanhamento ideal" subtitle="Valores de exemplo para a demonstração. Todos incluem avaliação inicial e treino individualizado." />
      <section className="section">
        <div className="container grid g3">
          {plans.map((p, i) => (
            <Reveal key={p.slug} as="article" className={`card plan${p.highlight ? " plan-hi" : ""}`} delay={i * 80}>
              {p.highlight && <span className="plan-flag">Mais escolhido</span>}
              <h2>{p.name}</h2>
              <p className="muted">{p.duration}</p>
              <div className="plan-price"><strong>{p.price}</strong><small>{p.priceNote}</small></div>
              <ul className="tick-list">{p.items.map((it) => <li key={it}><Icon name="check" /> {it}</li>)}</ul>
              <a className={`btn ${p.highlight ? "btn-primary" : "btn-outline"}`} href={waPlan(p.name)} target="_blank" rel="noopener noreferrer">Quero este plano</a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
