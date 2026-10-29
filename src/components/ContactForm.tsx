"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "./Icons";

/** Protótipo do formulário de contato (não envia dados). */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="card" role="status">
        <h3>Mensagem recebida (demonstração)</h3>
        <p>Na versão final, a equipe responderá o mais breve possível.</p>
      </div>
    );
  }
  return (
    <form
      className="card form"
      onSubmit={(e) => {
        e.preventDefault();
        if (new FormData(e.currentTarget).get("website")) return;
        setSent(true);
      }}
    >
      <h3>Envie uma mensagem</h3>
      <label>
        Nome
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        E-mail ou telefone
        <input name="contact" required />
      </label>
      <label>
        Mensagem
        <textarea name="message" rows={4} required />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />
      <p className="notice"><Icon name="shield" /> Por favor, não envie informações de saúde (doenças, medicamentos, exames) por aqui. Esse assunto é tratado diretamente na conversa com o Adilson.</p>
      <label className="check">
        <input type="checkbox" required />
        <span>Concordo com o uso dos meus dados para retorno do contato, conforme a <Link href="/privacidade">política de privacidade</Link>.</span>
      </label>
      <button className="btn btn-primary" type="submit">Enviar mensagem</button>
    </form>
  );
}
