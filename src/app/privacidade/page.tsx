import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Política de privacidade" };

export default function Privacidade() {
  return (
    <>
      <PageHero tag="LGPD" title="Política de privacidade" subtitle="Texto-modelo para a demonstração. Deve ser revisado por um profissional jurídico antes da publicação." />
      <section className="section">
        <div className="container narrow prose">
          <h2>Quais dados coletamos</h2>
          <p>Apenas o mínimo necessário para retornar seu contato: nome, e-mail ou telefone e, se você quiser, uma mensagem.</p>
          <h2>O que não coletamos</h2>
          <p>Este site não coleta dados de saúde. Pedimos que não envie informações como doenças, medicamentos ou exames em formulários.</p>
          <h2>Fotos de alunos</h2>
          <p>Imagens de antes e depois só são publicadas com autorização por escrito do aluno, que pode pedir a remoção a qualquer momento.</p>
          <h2>Seus direitos</h2>
          <p>Você pode solicitar acesso, correção ou exclusão dos seus dados pelo contato {site.email}.</p>
        </div>
      </section>
    </>
  );
}
