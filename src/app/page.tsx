import Link from "next/link";
import { site } from "@/config/site";
import { isModuleEnabled } from "@/config/modules";
import { cases, faq, impact, plans, specialties, steps } from "@/data/content";
import { waMessages, waPlan, whatsappUrl } from "@/lib/whatsapp";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Icon } from "@/components/Icons";
import { Counter, Reveal } from "@/components/Reveal";
import { DISCLAIMER, SectionHead, WaButton } from "@/components/ui";

export default function Home() {
  const shown = cases.filter((c) => c.consent);
  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="pill"><i /> Consultoria online · Brasil inteiro</span>
            <h1>Treino <em>individualizado</em>, com alguém que acompanha de perto.</h1>
            <p>
              Sou o Adilson Gomes, Bacharel em Educação Física. Monto seu treino, ajusto conforme sua evolução e te acompanho para você manter a constância, de onde estiver.
            </p>
            <div className="hero-cta">
              <WaButton href={whatsappUrl(waMessages.avaliacao)} variant="primary">Quero começar</WaButton>
              {isModuleEnabled("quiz") && <Link href="/quiz" className="btn btn-ghost">Descobrir meu plano <Icon name="arrow" /></Link>}
            </div>
            <ul className="hero-points">
              <li><Icon name="check" /> {site.cref}</li>
              <li><Icon name="check" /> Atendimento 100% online</li>
              <li><Icon name="check" /> Sem promessas milagrosas</li>
            </ul>
          </div>
          <div className="hero-visual" aria-hidden>
            <div className="hero-ring" />
            <div className="hero-badge"><Icon name="dumbbell" /><b>CREF</b><span>015474-G/CE</span></div>
            <div className="float f1"><b>100%</b> online<br />e individual</div>
            <div className="float f2"><b>27</b> estados<br />atendidos</div>
          </div>
        </div>
      </section>

      {isModuleEnabled("impact_numbers") && (
        <section className="impact" aria-label="Números">
          <div className="container impact-grid">
            {impact.map((n) => (
              <Reveal key={n.label} className="impact-item">
                <strong><Counter value={n.value} prefix={n.prefix} /></strong>
                <span>{n.label}</span>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <SectionHead tag="Como funciona" title="Da primeira conversa ao resultado" subtitle="Consultoria simples: você treina, eu acompanho." />
          <div className="grid g3">
            {steps.map((s, i) => (
              <Reveal key={s.title} className="card step" delay={i * 80}>
                <span className="step-n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p className="muted">{s.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="chips">
            {specialties.map((s) => <span key={s} className="chip">{s}</span>)}
          </div>
        </div>
      </section>

      {isModuleEnabled("before_after") && shown.length > 0 && (
        <section className="section dark">
          <div className="container">
            <SectionHead tag="Resultados" title="Arraste e veja a evolução" subtitle="Casos reais de alunos, com autorização. Mova a linha para comparar antes e depois." />
            <div className="ba-featured"><BeforeAfter item={shown[0]} /></div>
            <p className="disclaimer">{DISCLAIMER}</p>
            <div className="center-cta"><Link href="/resultados" className="btn btn-primary">Ver todos os resultados <Icon name="arrow" /></Link></div>
          </div>
        </section>
      )}

      {isModuleEnabled("plans") && (
        <section className="section">
          <div className="container">
            <SectionHead tag="Planos" title="Escolha o acompanhamento ideal" subtitle="Valores de exemplo para a demonstração." />
            <div className="grid g3">
              {plans.map((p, i) => (
                <Reveal key={p.slug} as="article" className={`card plan${p.highlight ? " plan-hi" : ""}`} delay={i * 80}>
                  {p.highlight && <span className="plan-flag">Mais escolhido</span>}
                  <h3>{p.name}</h3>
                  <p className="muted">{p.duration}</p>
                  <div className="plan-price"><strong>{p.price}</strong><small>{p.priceNote}</small></div>
                  <ul className="tick-list">{p.items.map((it) => <li key={it}><Icon name="check" /> {it}</li>)}</ul>
                  <a className={`btn ${p.highlight ? "btn-primary" : "btn-outline"}`} href={waPlan(p.name)} target="_blank" rel="noopener noreferrer">Quero este plano</a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {isModuleEnabled("availability_calendar") && (
        <section className="section tinted">
          <div className="container narrow center-text">
            <SectionHead tag="Agenda" title="Veja os horários livres" subtitle="Escolha o melhor dia para a sua avaliação inicial." />
            <Link href="/agenda" className="btn btn-primary"><Icon name="calendar" /> Abrir agenda</Link>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container narrow">
          <SectionHead tag="Dúvidas" title="Perguntas frequentes" />
          <div className="faq">
            {faq.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
