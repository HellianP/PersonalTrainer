/**
 * Módulos do site (feature flags). Mesma interface do modelo da clínica:
 * na versão com backend estes valores virão do banco.
 */
export type ModuleKey =
  | "core"
  | "before_after"
  | "availability_calendar"
  | "plans"
  | "quiz"
  | "impact_numbers"
  | "blog";

export interface ModuleDef {
  key: ModuleKey;
  label: string;
  description: string;
  premium: boolean;
  requires: ModuleKey[];
  enabled: boolean;
  client_editable: boolean;
}

export const modules: ModuleDef[] = [
  { key: "core", label: "Núcleo do site", description: "Home, sobre, contato e privacidade.", premium: false, requires: [], enabled: true, client_editable: true },
  { key: "before_after", label: "Antes e depois", description: "Slider de fotos com peso e tempo de acompanhamento. Exige consentimento do aluno.", premium: true, requires: ["core"], enabled: true, client_editable: true },
  { key: "availability_calendar", label: "Agenda de disponibilidade", description: "Dias e horários livres, com pedido de horário por WhatsApp.", premium: true, requires: ["core"], enabled: true, client_editable: true },
  { key: "plans", label: "Planos de consultoria", description: "Cards de planos com valores e o que está incluso.", premium: false, requires: ["core"], enabled: true, client_editable: true },
  { key: "quiz", label: "Quiz de objetivo", description: "4 perguntas que sugerem o plano ideal.", premium: true, requires: ["plans"], enabled: true, client_editable: false },
  { key: "impact_numbers", label: "Números de impacto", description: "Contadores animados editáveis.", premium: true, requires: ["core"], enabled: true, client_editable: false },
  { key: "blog", label: "Blog / dicas", description: "Artigos com SEO e tempo de leitura.", premium: true, requires: ["core"], enabled: false, client_editable: false },
];

const byKey = new Map(modules.map((m) => [m.key, m]));

export function isModuleEnabled(key: ModuleKey): boolean {
  const mod = byKey.get(key);
  if (!mod) return false;
  if (key === "core") return true;
  return mod.enabled && mod.requires.every(isModuleEnabled);
}

export function isModuleEditable(key: ModuleKey): boolean {
  const mod = byKey.get(key);
  return !!mod && isModuleEnabled(key) && mod.client_editable;
}
