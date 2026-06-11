# Codebase Guide

A map of how this site is built and where to change things. Written for future-you.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** — static site, no backend
- **Tailwind CSS v4** — all styling is utility classes; the few global rules live in `app/globals.css`
- **Fonts:** Bricolage Grotesque (big display headlines) + Inter (body text), loaded in `app/layout.tsx` via `next/font`
- **Hosting:** Vercel (every push to `main` deploys)

## File Structure

```
app/
├── layout.tsx              # Root layout: fonts, <head> metadata, Vercel Analytics
├── globals.css             # Theme colors, scrollbar, scroll-reveal + hero entrance animations
├── page.tsx                # HOME PAGE — composes Nav + Hero + Experience + Projects + Footer
│
├── journey/
│   └── page.tsx            # /journey — "coming soon" teaser (future Pokemon game lives here)
│
├── data/                   # ✏️ EDIT THESE TO UPDATE CONTENT — no component code needed
│   ├── experience.ts       # Internships: period, company, role, location, blurb
│   └── projects.ts         # Projects: name, stack, year, blurb, links, media
│
└── components/
    ├── layout/             # Page chrome
    │   ├── Nav.tsx         # Sticky glass navbar (centered links + pokeball → /journey)
    │   └── Footer.tsx      # Copyright line
    ├── sections/           # The main page sections
    │   ├── Hero.tsx        # Name, role line, bio, CTA buttons, headshot circle
    │   ├── SectionHeader.tsx  # "01 — Experience ———" numbered header row
    │   ├── ExperienceList.tsx # Renders data/experience.ts as ruled rows
    │   └── ProjectList.tsx    # Renders data/projects.ts (name | square GIF | description)
    ├── ui/                 # Small reusable pieces
    │   ├── Pokeball.tsx    # CSS-drawn pokeball icon (size prop)
    │   └── Reveal.tsx      # Fade-in-on-scroll wrapper (IntersectionObserver)
    └── ink/                # 🎨 Background brush art — swappable for high-res images later
        ├── InkDragon.tsx   # Sumi-e dragon SVG behind the hero photo
        └── InkSweep.tsx    # Faint diagonal brush strokes near sections

public/
├── headshot.png            # Hero photo
├── snorlax-icon.jpg        # Browser tab favicon
└── archive/                # Old site images kept for later (photo collage, logos, etc.)

docs/superpowers/           # Design specs + implementation plans (process docs)
```

## Common Tasks

### Update my experience or projects
Edit `app/data/experience.ts` or `app/data/projects.ts`. That's it — the components render whatever is in those arrays, in order.

### Add a real GIF to a project
1. Drop the file in `public/` (e.g. `public/clash3d.gif`)
2. In `app/data/projects.ts`, add `media: "/clash3d.gif"` to that project
3. The gray placeholder square is automatically replaced

### Change the hero bio / name / role line
`app/components/sections/Hero.tsx` — the copy is inline there.

### Change colors or fonts
- Page background + text colors: `app/globals.css` (`--background`, `--foreground`) — but most colors are hardcoded Tailwind classes like `text-[#555]` in components
- Fonts: `app/layout.tsx` (swap the `next/font` import)

### Swap the ink artwork for high-res images
Replace the SVG inside `app/components/ink/InkDragon.tsx` (or `InkSweep.tsx`) with an `<Image>` tag pointing at your art file. Nothing else references their internals — only their placement classes in `Hero.tsx` / `page.tsx`.

### Adjust animations
- **Hero entrance** (name rising in on load): `.hero-enter` keyframes in `app/globals.css`; stagger delays via `.hero-enter-2/3/4` classes in `Hero.tsx`
- **Scroll fade-ins**: `app/components/ui/Reveal.tsx` + `.reveal` classes in `globals.css`. Rows stagger via the `delay` prop (`delay={i * 100}`)

### Build the Pokemon game (phase 2)
Replace `app/journey/page.tsx`. The pokeball nav button already points there.

## Commands

```bash
npm run dev     # local dev server → localhost:3000
npm run build   # production build (run before pushing to catch errors)
npm run lint    # eslint
```

## Design Reference

- Spec: `docs/superpowers/specs/2026-06-11-portfolio-redesign-design.md`
- Approved mockup: `.superpowers/brainstorm/*/content/swiss-v5.html` (gitignored, local only)
- Look: Swiss/editorial — warm white `#f8f7f4`, near-black `#111`, gray hierarchy, no color accents except the pokeball red
