import { notFound } from "next/navigation";
import { isModuleEnabled, type ModuleKey } from "@/config/modules";

/** Use no topo de páginas de módulos: módulo desligado responde 404. */
export function requireModule(key: ModuleKey): void {
  if (!isModuleEnabled(key)) notFound();
}
