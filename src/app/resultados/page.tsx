import type { Metadata } from "next";
import { requireModule } from "@/lib/modules";
import { cases } from "@/data/content";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Reveal } from "@/components/Reveal";
import { DISCLAIMER, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Resultados", description: "Comparativos de antes e depois de alunos, com autorização, peso e tempo de acompanhamento." };

export default function Resultados() {
  requireModule("before_after");
  const shown = cases.filter((c) => c.consent);
  return (
    <>
      <PageHero tag="Resultados" title="Arraste a linha e compare" subtitle="Em cada caso você vê o peso antes e depois e o tempo de acompanhamento." />
      <section className="section">
        <div className="container grid g3">
          {shown.map((c, i) => (
            <Reveal key={c.id} delay={i * 80}><BeforeAfter item={c} /></Reveal>
          ))}
        </div>
        <div className="container"><p className="disclaimer">{DISCLAIMER}</p></div>
      </section>
    </>
  );
}
