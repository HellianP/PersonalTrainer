import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { isModuleEnabled } from "@/config/modules";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/sobre", "/contato", "/privacidade"];
  if (isModuleEnabled("before_after")) paths.push("/resultados");
  if (isModuleEnabled("plans")) paths.push("/planos");
  if (isModuleEnabled("availability_calendar")) paths.push("/agenda");
  if (isModuleEnabled("quiz")) paths.push("/quiz");
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
