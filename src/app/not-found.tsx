import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container narrow center-text">
        <span className="eyebrow">404</span>
        <h1>Página não encontrada</h1>
        <p className="muted">O endereço pode ter mudado ou este recurso não está disponível.</p>
        <Link className="btn btn-primary" href="/">Voltar ao início</Link>
      </div>
    </section>
  );
}
