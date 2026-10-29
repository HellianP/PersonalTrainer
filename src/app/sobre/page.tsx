import type { Metadata } from "next";
import { site } from "@/config/site";
import { specialties } from "@/data/content";
import { waMessages, whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { PageHero, WaButton } from "@/components/ui";

export const metadata: Metadata = { title: "Sobre", description: "Conheça Adilson Gomes, Bacharel em Educação Física, Professor/Terapeuta (CREF 015474-G/CE)." };

export default function Sobre() {
  return (
    <>
      <PageHero tag="Sobre" title="Adilson Gomes" subtitle={`${site.role} · ${site.cref}`} />
      <section className="section">
        <div className="container narrow prose">
          <Reveal>
            <p>Atuo em {site.cities} e atendo alunos de todo o Brasil de forma online. Meu trabalho é montar um treino que cabe na sua rotina e acompanhar a evolução de perto, com ajustes e conversa de verdade.</p>
            <p><i>Texto de exemplo: o Adilson pode enviar a própria história e a trajetória profissional para substituir este trecho.</i></p>
            <h2>Áreas de atuação</h2>
            <ul className="tick-list">{specialties.map((s) => <li key={s}><Icon name="check" /> {s}</li>)}</ul>
            <h2>Compromisso</h2>
            <p>Sem promessas de resultado rápido e sem fórmulas prontas. Cada plano é pensado para a pessoa, respeitando seus limites e seu momento.</p>
          </Reveal>
          <WaButton href={whatsappUrl(waMessages.geral)}>Falar com o Adilson</WaButton>
        </div>
      </section>
    </>
  );
}
