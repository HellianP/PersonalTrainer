/** Conteúdo editável do site (futuramente vindo do banco). Tudo aqui é EXEMPLO para a demonstração. */

export interface TransformCase {
  id: string;
  name: string;
  objective: string;
  months: number;
  weightBefore: number;
  weightAfter: number;
  /** Fotos de exemplo (ilustrações). Em produção: fotos reais enviadas pelo admin. */
  before: string;
  after: string;
  note: string;
  /** Consentimento por escrito do aluno registrado? Só exibe se true. */
  consent: boolean;
}

export const cases: TransformCase[] = [
  { id: "c1", name: "Aluno(a) exemplo A.", objective: "Emagrecimento", months: 6, weightBefore: 92, weightAfter: 78, before: "/img/exemplo-antes.svg", after: "/img/exemplo-depois.svg", note: "Treino 4x por semana e ajustes quinzenais.", consent: true },
  { id: "c2", name: "Aluno(a) exemplo B.", objective: "Ganho de massa", months: 8, weightBefore: 64, weightAfter: 72, before: "/img/exemplo-antes.svg", after: "/img/exemplo-depois.svg", note: "Progressão de carga com acompanhamento semanal.", consent: true },
  { id: "c3", name: "Aluno(a) exemplo C.", objective: "Condicionamento", months: 4, weightBefore: 81, weightAfter: 75, before: "/img/exemplo-antes.svg", after: "/img/exemplo-depois.svg", note: "Treino em casa, com poucos equipamentos.", consent: true },
];

export interface Plan {
  slug: string;
  name: string;
  duration: string;
  price: string;
  priceNote: string;
  highlight?: boolean;
  items: string[];
}

export const plans: Plan[] = [
  { slug: "mensal", name: "Mensal", duration: "1 mês", price: "R$ 197", priceNote: "valor de exemplo", items: ["Avaliação inicial online", "Treino individualizado no aplicativo", "Ajustes semanais", "Suporte por WhatsApp em horário comercial"] },
  { slug: "trimestral", name: "Trimestral", duration: "3 meses", price: "R$ 497", priceNote: "valor de exemplo · economia de 16%", highlight: true, items: ["Tudo do plano Mensal", "Reavaliação a cada 30 dias", "Vídeos de correção de execução", "Orientação de rotina e hábitos"] },
  { slug: "semestral", name: "Semestral", duration: "6 meses", price: "R$ 897", priceNote: "valor de exemplo · economia de 24%", items: ["Tudo do plano Trimestral", "Chamada de vídeo mensal", "Planejamento de metas por ciclo", "Prioridade nos horários de agenda"] },
];

export const steps = [
  { title: "Conversa e avaliação", text: "Você conta seu objetivo, sua rotina e onde treina. Sem compromisso e sem pressa." },
  { title: "Treino montado para você", text: "Receba seu plano no aplicativo, com vídeos de execução e a carga certa para o seu nível." },
  { title: "Acompanhamento de perto", text: "Check-ins, ajustes e suporte para você manter a constância, onde quer que esteja no Brasil." },
];

export const faq = [
  { q: "Como funciona a consultoria online?", a: "Depois da avaliação, você recebe seu treino em um aplicativo, com vídeos de execução. Os ajustes acontecem conforme sua evolução, com contato direto por WhatsApp." },
  { q: "Preciso de academia?", a: "Não necessariamente. O treino é montado para o que você tem: academia, casa ou condomínio." },
  { q: "Atende o Brasil inteiro?", a: "Sim. O atendimento é online e os horários da agenda aparecem em horário de Brasília." },
  { q: "Em quanto tempo vejo resultado?", a: "Cada pessoa responde de um jeito. Por isso não prometemos prazos: o plano é ajustado à sua rotina, alimentação e histórico." },
  { q: "Posso treinar com alguma lesão ou condição de saúde?", a: "O ideal é ter liberação do seu médico. Essa conversa acontece diretamente com o profissional, não por formulários do site." },
];

export const impact = [
  { value: 150, prefix: "+", label: "alunos atendidos (exemplo)" },
  { value: 10, prefix: "+", label: "anos de experiência (exemplo)" },
  { value: 27, prefix: "", label: "estados com alunos (exemplo)" },
  { value: 98, prefix: "", label: "% de alunos que recomendam (exemplo)" },
];

export const specialties = ["Emagrecimento", "Hipertrofia", "Condicionamento físico", "Treino em casa", "Reeducação do movimento", "Qualidade de vida"];

export const quiz = [
  { id: "goal", q: "Qual é o seu principal objetivo?", options: ["Emagrecer", "Ganhar massa muscular", "Ter mais condicionamento", "Qualidade de vida"] },
  { id: "level", q: "Como está sua rotina de treino hoje?", options: ["Sou sedentário(a)", "Treino de vez em quando", "Treino com regularidade"] },
  { id: "days", q: "Quantos dias por semana pode treinar?", options: ["2 a 3 dias", "4 dias", "5 ou mais dias"] },
  { id: "where", q: "Onde você vai treinar?", options: ["Academia", "Em casa", "Ao ar livre"] },
];

export const weeklyAvailability: Record<number, string[]> = {
  1: ["08:00", "09:00", "10:00", "14:00", "15:00", "19:00"],
  2: ["08:00", "09:00", "10:00", "14:00", "15:00", "19:00"],
  3: ["08:00", "09:00", "10:00", "14:00", "15:00"],
  4: ["08:00", "09:00", "10:00", "14:00", "15:00", "19:00"],
  5: ["08:00", "09:00", "10:00", "14:00"],
  6: ["08:00", "09:00", "10:00"],
};
