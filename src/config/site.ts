/**
 * Configuração do cliente: marca, contatos e disponibilidade.
 * Trocar de cliente = trocar este arquivo, o tema (globals.css) e os arquivos em /data.
 */
export const site = {
  name: "Adilson Gomes",
  fullName: "Adilson Gomes | Consultoria Online em Educação Física",
  tagline: "Consultoria de treino online para o Brasil inteiro.",
  mission: "Treino individualizado, acompanhamento de perto e resultado que se sustenta.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.github.io/adilson-gomes",
  cities: "Juazeiro do Norte - CE / Senhor do Bonfim - BA",
  role: "Bacharel em Educação Física · Professor/Terapeuta",
  cref: "CREF 015474-G/CE",
  // TROCAR pelos dados reais do Adilson
  whatsappRaw: "5500000000000",
  whatsappDisplay: "(00) 00000-0000",
  email: "contato@exemplo.com",
  instagram: "@adilsongomes",
  instagramUrl: "https://www.instagram.com/",
  timeZone: "America/Fortaleza",
  timeZoneLabel: "horário de Brasília",
};

export type Site = typeof site;
