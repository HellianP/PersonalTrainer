import type { Metadata } from "next";
import { requireModule } from "@/lib/modules";
import { Quiz } from "@/components/Quiz";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Descubra seu plano", description: "Responda 4 perguntas rápidas e veja o plano de consultoria mais indicado." };

export default function QuizPage() {
  requireModule("quiz");
  return (
    <>
      <PageHero tag="Quiz" title="Descubra o plano ideal" subtitle="4 perguntas rápidas. Não pedimos dados pessoais nem informações de saúde." />
      <section className="section">
        <div className="container narrow"><Quiz /></div>
      </section>
    </>
  );
}
