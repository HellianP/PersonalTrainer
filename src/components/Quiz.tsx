"use client";

import { useState } from "react";
import { plans, quiz } from "@/data/content";
import { whatsappUrl } from "@/lib/whatsapp";
import { Icon, WhatsAppIcon } from "./Icons";

/** Quiz de objetivo: não coleta dados de saúde nem nada pessoal. Só sugere o plano e abre o WhatsApp. */
export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const done = step >= quiz.length;
  const q = quiz[step];

  const pick = (opt: string) => {
    setAnswers([...answers, opt]);
    setStep(step + 1);
  };

  if (done) {
    const days = answers[2];
    const plan = days === "5 ou mais dias" ? plans[2] : days === "4 dias" ? plans[1] : plans[0];
    const msg = `Olá, Adilson! Respondi o quiz do site. Objetivo: ${answers[0]}. Rotina: ${answers[1]}. Posso treinar ${answers[2]}, ${answers[3]?.toLowerCase()}. Vi o plano ${plan.name} e gostaria de conversar.`;
    return (
      <div className="card quiz-result" role="status">
        <span className="eyebrow">Sugestão para você</span>
        <h3>Plano {plan.name}</h3>
        <p className="muted">{plan.duration} · {plan.price} <small>({plan.priceNote})</small></p>
        <ul className="tick-list">{plan.items.map((i) => <li key={i}><Icon name="check" /> {i}</li>)}</ul>
        <p className="muted small">É só uma sugestão inicial. O plano ideal é definido na conversa com o Adilson.</p>
        <div className="quiz-actions">
          <a className="btn btn-whatsapp" href={whatsappUrl(msg)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Conversar sobre este plano</a>
          <button type="button" className="btn btn-outline" onClick={() => { setStep(0); setAnswers([]); }}>Refazer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card quiz">
      <div className="quiz-progress" aria-hidden><span style={{ width: `${(step / quiz.length) * 100}%` }} /></div>
      <p className="muted small">Pergunta {step + 1} de {quiz.length}</p>
      <h3>{q.q}</h3>
      <div className="quiz-options">
        {q.options.map((o) => (
          <button key={o} type="button" className="quiz-opt" onClick={() => pick(o)}>{o}</button>
        ))}
      </div>
      {step > 0 && <button type="button" className="link-btn" onClick={() => { setStep(step - 1); setAnswers(answers.slice(0, -1)); }}>← Voltar</button>}
    </div>
  );
}
