"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { waMessages, whatsappUrl } from "@/lib/whatsapp";

export interface NavItem {
  href: string;
  label: string;
}

export function BrandMark({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden className="brand-mark">
      <rect width="48" height="48" rx="14" fill="url(#bm)" />
      <defs><linearGradient id="bm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff7a3d" /><stop offset="1" stopColor="#c2410c" /></linearGradient></defs>
      <text x="24" y="31" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="20" fill="#fff">AG</text>
    </svg>
  );
}

export function Header({ nav }: { nav: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} - início`}>
          <BrandMark />
          <span className="brand-text">
            <span className="brand-name">ADILSON GOMES</span>
            <span className="brand-tag">Consultoria em Educação Física</span>
          </span>
        </Link>

        <nav className={`main-nav${open ? " is-open" : ""}`} id="main-nav" aria-label="Navegação principal">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={`nav-link${pathname.replace(/\/$/, "") === n.href ? " is-active" : ""}`}>
              {n.label}
            </Link>
          ))}
          <a className="btn btn-primary nav-cta" href={whatsappUrl(waMessages.avaliacao)} target="_blank" rel="noopener noreferrer">
            Começar agora
          </a>
        </nav>

        <button
          className={`menu-toggle${open ? " is-open" : ""}`}
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {open && <button className="nav-backdrop" aria-label="Fechar menu" onClick={() => setOpen(false)} />}
    </header>
  );
}
