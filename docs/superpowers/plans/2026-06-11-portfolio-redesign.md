# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dark-theme portfolio with the approved Swiss-style light design (spec: `docs/superpowers/specs/2026-06-11-portfolio-redesign-design.md`, visual reference: brainstorm mockup `swiss-v5.html`), plus a `/journey` coming-soon page.

**Architecture:** Next.js App Router + Tailwind v4, no new dependencies. Content lives in typed data files (`app/data/`), presentation in small focused components (`app/components/`), ink artwork isolated in `app/components/ink/` so it can be swapped for raster art later. Scroll reveals via a single client-side IntersectionObserver wrapper.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, `next/font/google` (Bricolage Grotesque + Inter).

**Verification:** `npm run build` and `npm run lint` pass; dev-server smoke test returns 200 for `/` and `/journey`.

---

### Task 1: Foundation — layout.tsx + globals.css

**Files:**
- Modify: `app/layout.tsx` — swap Space Grotesk → Bricolage Grotesque (`--font-bricolage`), keep Inter (`--font-inter`); remove `BackgroundBanner`; body classes for light theme (`bg-[#f8f7f4] text-[#111]`); update metadata description.
- Modify: `app/globals.css` — full rewrite: Tailwind import, light theme tokens, heading/body font rules, smooth scroll, light scrollbar, `.reveal` / `.reveal-visible` transition classes (opacity 0 + translateY(24px) → visible).

- [ ] Rewrite both files
- [ ] `npm run build` still compiles (page.tsx still references old components — done in later task, so build check deferred to Task 7)

### Task 2: Data files

**Files:**
- Create: `app/data/experience.ts` — `Experience` type (`period, company, role, location, blurb`) + 4 entries (Looq AI, Perceive AI, BlueRobins, SUR) with copy from spec.
- Create: `app/data/projects.ts` — `Project` type (`name, stack, year, blurb, monogram, gradient, links: {label, url}[]`) + 4 entries (Clash3D, RedForce, CalVents, PitchPredictor). Verify repo URLs via `gh api users/langdonjs/repos` first; only include links that resolve. PitchPredictor paper link: nhsjs.com article.

- [ ] Verify repo URLs
- [ ] Write both data files

### Task 3: Reveal + Pokeball + Nav

**Files:**
- Create: `app/components/Reveal.tsx` — `"use client"`; IntersectionObserver (threshold 0.15, disconnect on first intersect) toggles `.reveal-visible`; props `children, delay?, className?`.
- Create: `app/components/Pokeball.tsx` — pure CSS pokeball (red top / black band / white bottom, centered button circle), `size` prop, default 18px.
- Create: `app/components/Nav.tsx` — sticky glass nav (`backdrop-blur`, translucent `#f8f7f4`); left links About `#about`, Experience `#experience`, Projects `#projects`, My Journey → `/journey` with Pokeball icon; right `langdon@berkeley.edu` mailto (hidden on mobile). No logo.

- [ ] Write all three components

### Task 4: Ink art components

**Files:**
- Create: `app/components/ink/InkDragon.tsx` — sumi-e dragon SVG from mockup v5 (serpentine body, head, horns, whiskers, splatter; `feTurbulence`+`feDisplacementMap` rough-edge filter, unique filter id) — JSX-converted attributes.
- Create: `app/components/ink/InkSweep.tsx` — diagonal brush sweep SVG, props for className so each placement can size/fade it.

- [ ] Write both components (aria-hidden, pointer-events-none)

### Task 5: Section components

**Files:**
- Create: `app/components/Hero.tsx` — eyebrow, clamp-sized lowercase name (light-weight gray "huynh"), rule, bio, CTA pills (View my work → `#projects`, GitHub ↗), circular `next/image` headshot (240px, priority), InkDragon positioned behind photo (hidden on mobile).
- Create: `app/components/SectionHeader.tsx` — props `num, title`; numbered label + title + flex rule line.
- Create: `app/components/ExperienceList.tsx` — maps `experiences`; row grid `[110px 1fr auto]` desktop / stacked mobile; ruled top borders, last row bottom border.
- Create: `app/components/ProjectList.tsx` — maps `projects`; row grid `[170px 150px 1fr]` desktop / stacked mobile; square 150px media box with gradient + monogram + "GIF" tag; description + external links.

- [ ] Write all four components

### Task 6: Pages

**Files:**
- Modify: `app/page.tsx` — full rewrite: `<Nav/>` + main (relative, overflow-hidden) containing Hero (`id="about"`), InkSweep accents, Experience section (`id="experience"`, SectionHeader 01 + ExperienceList in Reveal), Projects section (`id="projects"`, SectionHeader 02 + ProjectList in Reveal), minimal footer.
- Create: `app/journey/page.tsx` — centered teaser: large Pokeball, "my journey" display type, "A playable story of my path — gyms, routes, and internships. Training in progress…" copy, back-home link. Metadata title "My Journey | Langdon Huynh".

- [ ] Write both pages

### Task 7: Cleanup + verification

**Files:**
- Delete: `app/components/BackgroundBanner.tsx`, `ExperienceSlider.tsx`, `PhotoCollage.tsx`, `ProjectImage.tsx`, `Typewriter.tsx`

- [ ] Delete old components
- [ ] Run `npm run lint` — expect pass
- [ ] Run `npm run build` — expect pass
- [ ] Start dev server, `curl -s -o /dev/null -w "%{http_code}" localhost:3000/` and `/journey` — expect 200/200
- [ ] Commit: `feat: Swiss-style portfolio redesign with /journey teaser page`
