# Adilson Gomes: site de consultoria (demo front-end)

Next.js (App Router) + TypeScript, mesma base do modelo modular da clínica. **Demonstração sem backend**: conteúdo em arquivos tipados; formulários, quiz e admin são protótipos.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera a pasta out/ (site estático)
```

## Publicar no GitHub Pages

1. Crie o repositório no GitHub e faça push da branch `main`.
2. Em **Settings → Pages → Source**, escolha **GitHub Actions**.
3. O workflow `.github/workflows/pages.yml` faz o build com o `basePath` do repositório e publica sozinho a cada push.

Para testar localmente como no Pages: `NEXT_PUBLIC_BASE_PATH=/nome-do-repo npm run build` e sirva a pasta `out/`.

## Onde editar

| O quê | Arquivo |
| :-- | :-- |
| WhatsApp, Instagram, cidades, CREF (**trocar os dados de exemplo**) | `src/config/site.ts` |
| Módulos ligados/desligados | `src/config/modules.ts` |
| Cores e fontes (tema) | topo de `src/app/globals.css` |
| Planos, casos antes/depois, FAQ, quiz, horários da agenda | `src/data/content.ts` |
| Fotos de antes/depois | `public/img/` (hoje ilustrações de exemplo) |

## Módulos

`core`, `before_after`, `availability_calendar`, `plans`, `quiz`, `impact_numbers`, `blog` (desligado). Módulo desligado some do menu, da home e do sitemap, e a rota responde 404.

## Regras de conteúdo

- Antes e depois só com consentimento por escrito do aluno (campo `consent`).
- Sem promessa de resultado; aviso fixo "resultados individuais variam".
- Formulários e quiz não pedem dados de saúde.
- Todos os textos de depoimento, números e valores atuais são **exemplos**.
