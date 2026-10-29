import type { Metadata } from "next";
import { requireModule } from "@/lib/modules";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Agenda", description: "Dias e horários disponíveis para avaliação e acompanhamento." };

export default function Agenda() {
  requireModule("availability_calendar");
  return (
    <>
      <PageHero tag="Agenda" title="Horários disponíveis" subtitle="Toque em um dia marcado, escolha o horário e peça pelo WhatsApp." />
      <section className="section">
        <div className="container"><AvailabilityCalendar /></div>
      </section>
    </>
  );
}
