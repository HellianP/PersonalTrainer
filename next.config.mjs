// Exporta o site como arquivos estáticos (out/), pronto para GitHub Pages.
// Em Pages de projeto (usuario.github.io/repo) defina NEXT_PUBLIC_BASE_PATH=/repo no build.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
