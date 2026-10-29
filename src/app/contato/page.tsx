import type { Metadata } from "next";
import { site } from "@/config/site";
import { waMessages, whatsappUrl } from "@/lib/whatsapp";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icons";
import { PageHero, WaButton } from "@/components/ui";

export const metadata: Metadata = { title: "Contato", description: "Fale com Adilson Gomes pelo WhatsApp ou envie uma mensagem." };

export default function Contato() {
  return (
    <>
      <PageHero tag="Contato" title="Vamos conversar?" subtitle="A forma mais rápida é pelo WhatsApp. Se preferir, deixe uma mensagem." />
      <section className="section">
        <div className="container grid g2 contact-grid">
          <div className="card contact-card">
            <div className="contact-row"><Icon name="phone" /><div><b>WhatsApp</b><span>{site.whatsappDisplay}</span></div></div>
            <div className="contact-row"><Icon name="instagram" /><div><b>Instagram</b><a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">{site.instagram}</a></div></div>
            <div className="contact-row"><Icon name="pin" /><div><b>Presença</b><span>{site.cities}</span><span>Consultoria online para todo o Brasil</span></div></div>
            <div className="contact-row"><Icon name="shield" /><div><b>Registro</b><span>{site.cref}</span></div></div>
            <div className="contact-actions"><WaButton href={whatsappUrl(waMessages.geral)}>Chamar no WhatsApp</WaButton></div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
