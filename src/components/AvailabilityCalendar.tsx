"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/config/site";
import { weeklyAvailability } from "@/data/content";
import { waSlot } from "@/lib/whatsapp";
import { Icon, WhatsAppIcon } from "./Icons";

const WEEK = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
/** Marca alguns horários como ocupados (determinístico) para a demonstração. */
const taken = (d: Date, t: string) => (d.getDate() + parseInt(t, 10)) % 4 === 0;

/**
 * Agenda de disponibilidade: calcula no navegador os próximos 60 dias a partir de hoje.
 * Horários exibidos em horário de Brasília. O pedido de horário abre o WhatsApp.
 */
export function AvailabilityCalendar() {
  const [today, setToday] = useState<Date | null>(null);
  const [cursor, setCursor] = useState<{ y: number; m: number } | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setToday(t);
    setCursor({ y: t.getFullYear(), m: t.getMonth() });
  }, []);

  const free = useMemo(() => {
    const map = new Map<string, { date: Date; slots: string[] }>();
    if (!today) return map;
    for (let i = 1; i <= 60; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const slots = (weeklyAvailability[d.getDay()] ?? []).filter((t) => !taken(d, t));
      if (slots.length) map.set(iso(d), { date: d, slots });
    }
    return map;
  }, [today]);

  if (!today || !cursor) return <div className="card" aria-busy>Carregando agenda…</div>;

  const first = new Date(cursor.y, cursor.m, 1);
  const days = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const cells: (string | null)[] = [...Array(first.getDay()).fill(null)];
  for (let d = 1; d <= days; d++) cells.push(`${cursor.y}-${pad(cursor.m + 1)}-${pad(d)}`);

  const move = (delta: number) => {
    const d = new Date(cursor.y, cursor.m + delta, 1);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
    setSelected(null);
  };
  const label = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(first);
  const sel = selected ? free.get(selected) : undefined;
  const selLabel = sel ? new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" }).format(sel.date) : "";

  return (
    <div className="calendar">
      <p className="tz-note"><Icon name="clock" /> Horários em <b>{site.timeZoneLabel}</b>. Se você mora em outro fuso, confirme a conversão na conversa.</p>
      <div className="cal-head">
        <button type="button" className="icon-btn" onClick={() => move(-1)} aria-label="Mês anterior"><Icon name="chevronLeft" /></button>
        <h2 className="cal-month" aria-live="polite">{label}</h2>
        <button type="button" className="icon-btn" onClick={() => move(1)} aria-label="Próximo mês"><Icon name="chevron" /></button>
      </div>
      <div className="cal-grid" role="group" aria-label={`Calendário de ${label}`}>
        {WEEK.map((w) => <div key={w} className="cal-dow" aria-hidden>{w}</div>)}
        {cells.map((key, i) => {
          if (!key) return <div key={`e${i}`} className="cal-cell empty" />;
          const info = free.get(key);
          const day = Number(key.slice(8));
          return (
            <button
              key={key}
              type="button"
              disabled={!info}
              className={`cal-cell${info ? " has-event" : ""}${selected === key ? " is-selected" : ""}`}
              onClick={() => setSelected(key)}
              aria-label={info ? `${day}: ${info.slots.length} horários livres` : `${day}: sem horários`}
            >
              <span className="cal-day">{day}</span>
              {info && <span className="cal-count">{info.slots.length} livres</span>}
            </button>
          );
        })}
      </div>

      {sel && (
        <div className="cal-detail" role="region" aria-label="Horários do dia">
          <h3 className="cap">{selLabel}</h3>
          <p className="muted small">Escolha um horário para pedir pelo WhatsApp:</p>
          <div className="slots">
            {sel.slots.map((t) => (
              <a key={t} className="slot" href={waSlot(selLabel, t)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> {t}
              </a>
            ))}
          </div>
        </div>
      )}
      <p className="muted small">Agenda de demonstração: horários ilustrativos, editáveis no painel do Adilson.</p>
    </div>
  );
}
