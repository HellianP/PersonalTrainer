import { site } from "@/config/site";

export function whatsappUrl(message: string): string {
  return `https://api.whatsapp.com/send?phone=${site.whatsappRaw}&text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  geral: "Olá, Adilson! Vim pelo seu site e gostaria de conhecer a consultoria.",
  avaliacao: "Olá, Adilson! Quero agendar uma avaliação inicial. Podemos conversar?",
} as const;

export function waPlan(plan: string): string {
  return whatsappUrl(`Olá, Adilson! Tenho interesse no plano ${plan}. Podemos conversar?`);
}

export function waSlot(dateLabel: string, time: string): string {
  return whatsappUrl(`Olá, Adilson! Gostaria de agendar uma avaliação em ${dateLabel} às ${time} (${site.timeZoneLabel}). Está disponível?`);
}
