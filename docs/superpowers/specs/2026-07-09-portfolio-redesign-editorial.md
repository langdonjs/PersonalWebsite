# Portfolio redesign — warm editorial (blog style)

**Date:** 2026-07-09
**Status:** approved-for-build (pending final go)

Migrate the whole site from the current Swiss / ink-dragon aesthetic to the warm,
minimal, blog-style editorial look validated live at `/preview`.

## Type system
- **Display / serif:** Newsreader (headings + italic wordmark)
- **Body:** Inter
- **Metadata / labels:** JetBrains Mono
- Loaded in `app/layout.tsx` as CSS vars; utility classes `.ffam-newsreader`, `.ffam-mono` in `globals.css`.

## Palette (warm paper)
| token | value |
|---|---|
| background | `#f3ecdf` |
| heading ink | `#2a2620` |
| body text | `#413d34` |
| muted | `#8d8676` |
| faint label | `#a8a08f` |
| rule / border | `#e0d8c8` |
| link / accent | `#9c7a43` (hover `#6f5528`) |
| photo bg | `#e8e1d2` |

## Layout system
- Centered single column, `max-w ~720px`, generous padding.
- **Shared Nav:** wordmark left (Newsreader italic) + right nav: `home · experience · projects · about · life · 🔴`; pokeball → `/journey`. Active item underlined. Mobile: simple menu (nav is hidden < sm today; add a minimal toggle).
- **Shared Footer:** minimal — `Langdon Huynh · <email>`.
- **Page pattern:** serif H1, muted intro line, thin rule, content; mono for dates / tags / section labels.

## Pages / IA
- **`/` (home):** promote `PreviewHome` — hero (H1 + 2 paragraphs + GitHub/LinkedIn with logo icons + photo right) then `NOW` list.
- **`/experience`** (renamed from "work"): roles from `experience.ts` — company (bold), date range (mono, right-aligned), `role · location` (mono), blurb; thin rules. "download résumé" link → placeholder `/resume.pdf`.
- **`/projects`:** from `projects.ts` — gif placeholder box, name + year (mono), blurb, tech-stack tags (mono), links (GitHub/Paper in ochre).
- **`/about`:** layout only; **body copy provided by Langdon** (placeholder block until supplied).
- **`/life` (hub):**
  1. directory: **Hobbies · Writing · Bookshelf** → sub-pages
  2. general intro paragraph (what I'm into + how to navigate the site)
  3. small photo gallery (subset from `life.ts`)
  - **`/life/hobbies`:** now/past + interests + YouTube (from `life.ts`)
  - **`/life/writing`:** essays/journal index — **empty-state** for now (Clash3D deferred)
  - **`/life/bookshelf`:** existing sortable table (currently "will be updated soon")
- **`/journey` (game):** unchanged; reached via the pokeball.

## Content decisions
- Real data everywhere (experience, projects, life).
- About prose: Langdon-provided.
- Writing: empty-state.
- Résumé: placeholder link (`/resume.pdf`).
- LinkedIn URL + footer email: placeholders until provided.

## Retiring the old design
- Rebuild the shared `Nav`; replace `Hero`/home; stop using `InkDragon`, `InkSweep`, Bricolage Grotesque, and the numbered `SectionHeader` on redesigned pages.
- Keep now-unused component/data files in the repo (unreferenced) unless deletion is requested. The game keeps its own styling.
- Remove the `/preview` scaffold once `/` is migrated (fold `PreviewHome` into the home route).

## Non-goals
- No dark mode. Game not redesigned. About copy not written by me.

## Needs input (non-blocking — placeholders chosen)
- LinkedIn URL, footer email, résumé PDF.
