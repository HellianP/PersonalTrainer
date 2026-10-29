"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

/** Aparição suave ao rolar (IntersectionObserver). CSS desativa em prefers-reduced-motion. */
export function Reveal({ children, as: Tag = "div", delay = 0, className = "" }: { children: ReactNode; as?: ElementType; delay?: number; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal${shown ? " is-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/** Contador animado ao entrar na tela. */
export function Counter({ value, prefix = "" }: { value: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setN(value);
      return;
    }
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1400, 1);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
    </span>
  );
}
