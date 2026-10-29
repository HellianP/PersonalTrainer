import type { Metadata } from "next";
import { AdminDemo } from "@/components/AdminDemo";

export const metadata: Metadata = { title: "Painel administrativo (demonstração)", robots: { index: false, follow: false } };

export default function AdminPage() {
  return (
    <section className="section">
      <div className="container">
        <AdminDemo />
      </div>
    </section>
  );
}
