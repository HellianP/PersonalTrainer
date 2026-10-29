import Link from "next/link";
import { site } from "@/config/site";
import { Icon } from "./Icons";
import { BrandMark, type NavItem } from "./Header";
import { waMessages, whatsappUrl } from "@/lib/whatsapp";

export function Footer({ nav }: { nav: NavItem[] }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <BrandMark size={40} />
              <b>Adilson Gomes</b>
            </div>
            <p className="footer-mission">{site.mission}</p>
            <p>{site.role}<br />{site.cref}</p>
          </div>
          <div>
            <h2 className="footer-title">Navegue</h2>
            <ul className="footer-links">
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
              <li><Link href="/privacidade">Política de privacidade</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Contato</h2>
            <ul className="footer-links">
              <li><a href={whatsappUrl(waMessages.geral)} target="_blank" rel="noopener noreferrer">WhatsApp {site.whatsappDisplay}</a></li>
              <li><a className="with-icon" href={site.instagramUrl} target="_blank" rel="noopener noreferrer"><Icon name="instagram" /> {site.instagram}</a></li>
              <li>{site.cities}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {site.name} · {site.cref}. Todos os direitos reservados.</span>
          <Link href="/admin">Área administrativa (demo)</Link>
        </div>
      </div>
    </footer>
  );
}
