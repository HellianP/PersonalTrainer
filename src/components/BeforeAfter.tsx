"use client";

import { useState } from "react";
import { asset } from "@/lib/base";
import type { TransformCase } from "@/data/content";
import { Icon } from "./Icons";

/** Slider antes/depois: o range nativo cobre a imagem (mouse, toque e teclado funcionam e é acessível). */
export function BeforeAfter({ item }: { item: TransformCase }) {
  const [pos, setPos] = useState(50);
  const diff = item.weightAfter - item.weightBefore;

  return (
    <figure className="ba-card">
      <div className="ba" style={{ "--pos": `${pos}%` } as React.CSSProperties}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ba-img" src={asset(item.after)} alt={`Depois: ${item.name}, após ${item.months} meses`} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ba-img ba-before" src={asset(item.before)} alt={`Antes: ${item.name}`} draggable={false} />
        <div className="ba-line" aria-hidden>
          <span className="ba-handle"><Icon name="chevronLeft" /><Icon name="chevron" /></span>
        </div>
        <input
          className="ba-range"
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Comparar antes e depois de ${item.name}`}
        />
      </div>
      <figcaption>
        <div className="ba-meta">
          <b>{item.name}</b>
          <span className="badge">{item.objective}</span>
        </div>
        <ul className="ba-stats">
          <li><small>Peso antes</small><strong>{item.weightBefore} kg</strong></li>
          <li><small>Peso depois</small><strong>{item.weightAfter} kg</strong></li>
          <li><small>Variação</small><strong>{diff > 0 ? "+" : ""}{diff} kg</strong></li>
          <li><small>Tempo</small><strong>{item.months} meses</strong></li>
        </ul>
        <p className="muted small">{item.note}</p>
      </figcaption>
    </figure>
  );
}
