"use client";

import { useMemo, useState } from "react";
import { modules as initial, type ModuleDef, type ModuleKey } from "@/config/modules";
import { cases, plans, weeklyAvailability } from "@/data/content";
import { Icon } from "./Icons";

type Role = "super" | "client";

const PLANS = {
  assistido: { label: "Plano Assistido", editable: ["plans", "availability_calendar"] as ModuleKey[] },
  autonomo: { label: "Plano Autônomo", editable: ["plans", "availability_calendar", "before_after", "quiz", "impact_numbers", "blog"] as ModuleKey[] },
};
const DAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

/** Painel DEMONSTRATIVO: nada é salvo e o site público não é alterado. */
export function AdminDemo() {
  const [role, setRole] = useState<Role>("super");
  const [mods, setMods] = useState<ModuleDef[]>(initial);
  const [consent, setConsent] = useState<Record<string, boolean>>(Object.fromEntries(cases.map((c) => [c.id, c.consent])));
  const [toast, setToast] = useState("");

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 2400);
  };

  const enabled = (k: ModuleKey): boolean => {
    const m = mods.find((x) => x.key === k);
    return !!m && (k === "core" || (m.enabled && m.requires.every(enabled)));
  };

  const update = (k: ModuleKey, patch: Partial<ModuleDef>) => {
    const m = mods.find((x) => x.key === k)!;
    if (patch.enabled && !m.requires.every(enabled)) {
      flash(`Ative primeiro: ${m.requires.filter((r) => !enabled(r)).join(", ")}`);
      return;
    }
    setMods(mods.map((x) => (x.key === k ? { ...x, ...patch } : x)));
    flash("Alteração salva (demonstração)");
  };

  const applyPlan = (p: keyof typeof PLANS) => {
    setMods(mods.map((m) => ({ ...m, client_editable: m.key === "core" || PLANS[p].editable.includes(m.key) })));
    flash(`${PLANS[p].label} aplicado`);
  };

  const clientMenu = useMemo(() => mods.filter((m) => enabled(m.key) && m.client_editable), [mods]);
  const can = (k: ModuleKey) => clientMenu.some((m) => m.key === k);

  return (
    <div className="admin">
      <div className="admin-bar">
        <div>
          <span className="eyebrow">Demonstração</span>
          <h1>Painel administrativo</h1>
          <p className="muted">Protótipo visual: mostra o que o Adilson poderá editar e como os planos funcionam. Nenhum dado é salvo.</p>
        </div>
        <div className="seg" role="tablist" aria-label="Visão do painel">
          <button role="tab" aria-selected={role === "super"} className={role === "super" ? "on" : ""} onClick={() => setRole("super")}>Super admin</button>
          <button role="tab" aria-selected={role === "client"} className={role === "client" ? "on" : ""} onClick={() => setRole("client")}>Admin do cliente</button>
        </div>
      </div>

      {role === "super" ? (
        <>
          <div className="card">
            <h2>Planos de acesso</h2>
            <p className="muted">Aplica de uma vez o que o cliente poderá editar.</p>
            <div className="plan-row">
              <button className="btn btn-outline" onClick={() => applyPlan("assistido")}>Aplicar Plano Assistido</button>
              <button className="btn btn-primary" onClick={() => applyPlan("autonomo")}>Aplicar Plano Autônomo</button>
            </div>
          </div>
          <div className="card">
            <h2>Módulos</h2>
            <div className="mod-table">
              {mods.map((m) => (
                <div key={m.key} className="mod-row">
                  <div>
                    <b>{m.label}</b> {m.premium && <span className="badge">Premium</span>}
                    <p className="muted">{m.description}</p>
                    {m.requires.length > 0 && <p className="muted small">Depende de: {m.requires.join(", ")}</p>}
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={m.key === "core" || m.enabled} disabled={m.key === "core"} onChange={(e) => update(m.key, { enabled: e.target.checked })} />
                    <span>No site</span>
                  </label>
                  <label className="switch">
                    <input type="checkbox" checked={m.client_editable} disabled={m.key === "core"} onChange={(e) => update(m.key, { client_editable: e.target.checked })} />
                    <span>Cliente edita</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="admin-client">
          <aside className="card">
            <h2>Menu do cliente</h2>
            <p className="muted">Só aparece o que está ligado e liberado.</p>
            <ul className="client-menu">
              {clientMenu.map((m) => (
                <li key={m.key}><Icon name="settings" /> {m.label}</li>
              ))}
            </ul>
          </aside>
          <div className="admin-stack">
            {can("plans") && (
              <div className="card">
                <h2>Planos e valores</h2>
                {plans.map((p) => (
                  <div key={p.slug} className="mod-row">
                    <div><b>{p.name}</b><p className="muted">{p.duration} · {p.price}</p></div>
                    <button className="btn btn-outline btn-sm" onClick={() => flash("Em produção, abriria o formulário de edição")}>Editar</button>
                  </div>
                ))}
              </div>
            )}
            {can("availability_calendar") && (
              <div className="card">
                <h2>Disponibilidade semanal</h2>
                {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                  <div key={d} className="mod-row">
                    <div><b>{DAYS[d]}</b><p className="muted">{(weeklyAvailability[d] ?? []).join(" · ") || "Sem horários"}</p></div>
                    <button className="btn btn-outline btn-sm" onClick={() => flash("Em produção, editaria os horários do dia")}>Editar</button>
                  </div>
                ))}
              </div>
            )}
            {can("before_after") && (
              <div className="card">
                <h2>Antes e depois</h2>
                <p className="muted">Só aparece no site quando o consentimento do aluno estiver registrado.</p>
                {cases.map((c) => (
                  <div key={c.id} className="mod-row">
                    <div><b>{c.name}</b><p className="muted">{c.objective} · {c.weightBefore} → {c.weightAfter} kg · {c.months} meses</p></div>
                    <label className="switch">
                      <input type="checkbox" checked={consent[c.id]} onChange={(e) => { setConsent({ ...consent, [c.id]: e.target.checked }); flash("Alteração salva (demonstração)"); }} />
                      <span>Consentimento</span>
                    </label>
                    <button className="btn btn-outline btn-sm" onClick={() => flash("Em produção, abriria upload das fotos")}>Fotos</button>
                  </div>
                ))}
              </div>
            )}
            {!can("plans") && !can("availability_calendar") && !can("before_after") && <div className="card"><p className="muted">Nenhum módulo editável liberado.</p></div>}
          </div>
        </div>
      )}
      <div className={`toast${toast ? " show" : ""}`} role="status">{toast}</div>
    </div>
  );
}
