/** Prefixo de caminho (GitHub Pages de projeto). Use em src de imagens e arquivos de /public. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
