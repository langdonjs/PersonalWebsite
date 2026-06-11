# Portfolio Redesign — Design Spec

**Date:** 2026-06-11
**Status:** Approved direction (mockup v5), pending implementation
**Scope:** Phase 1 — main portfolio page redesign + `/journey` teaser page. Phase 2 (Pokemon-style game) is a separate future spec.

## Goal

Replace the current dark-theme single-page portfolio with a Swiss-style, light, editorial design that reflects Langdon's current resume (4 internships, current projects), with a clean file structure that's easy to maintain.

## Visual Design (from approved mockup v5)

Mockup reference: `.superpowers/brainstorm/24399-1781175082/content/swiss-v5.html`

- **Background:** warm white `#f8f7f4`, text `#111`, grays for hierarchy. No red accents except the pokeball.
- **Fonts:** Bricolage Grotesque (display/headlines, weights 300–800) + Inter (body/labels), via `next/font/google`.
- **Hero:** eyebrow label ("ML Engineer · Full Stack · Computer Vision"), huge lowercase name (~108px desktop, `langdon` weight 800 / `huynh` weight 300 gray), short ruled line, 2-line bio, "View my work" + "GitHub ↗" pill buttons. Circular headshot (240px, `public/headshot.png`) on the right.
- **Ink art:** sumi-e style brush elements as SVG components — a dragon behind/around the hero photo, faint diagonal brush sweeps near experience/projects. Built as isolated components so SVGs can later be swapped for high-res raster art. Subtle; page stays semi-minimal.
- **Nav:** sticky, glass blur (`backdrop-filter`), no logo. Left: About, Experience, Projects, My Journey (with red/white/black pokeball icon, CSS-drawn). Right: `langdon@berkeley.edu`. Anchor links scroll to sections.
- **Sections:** numbered headers ("01 Experience", "02 Projects") with a ruled line filling the row.
- **Experience:** vertical ruled list. Grid per row: period (110px) | company + role + 1-line description | ↗ arrow. Four entries: Looq AI, Perceive AI, BlueRobins, SUR (content from resume).
- **Projects:** vertical ruled list. Grid per row: name + stack + year (170px) | square media box (150×150, rounded, placeholder gradient + monogram + "GIF" tag) | description + links. Four entries: Clash3D, RedForce, CalVents, PitchPredictor.
- **Animations:** sections fade/slide in on scroll (IntersectionObserver-based, CSS transitions — no animation library). Smooth scroll for anchors.
- **Footer:** minimal — copyright line.

## Content

All copy comes from the resume + GitHub README (already drafted in mockup v5). Key facts:

- Hero bio: "I build AI systems at the edge of vision and language — currently reconstructing the real world in 3D at Looq AI. CS + Applied Math @ UC Berkeley · GPA 3.9" (no "Class of 2028")
- Experience: Looq AI (May–Aug 2026, Perception SWE Intern, San Diego), Perceive AI (Jan–May 2026, MLE Intern, SF), BlueRobins (May–Jul 2025, Full Stack SWE Intern, Berkeley), SUR (Aug–Dec 2024, Lead Full Stack Mobile Dev, Berkeley)
- Projects: Clash3D (Python/YOLO/ByteTrack/Blender), RedForce (React/Express/TS/SQLite, Perplexity Hackathon), CalVents (React Native/Supabase/Python/Selenium), PitchPredictor (Python/scikit-learn/pandas, published in NHSJS, link to paper)
- Links: github.com/langdonjs, linkedin.com/in/langdonhuynh, langdon@berkeley.edu

## Dropped (kept in repo for later)

- Skills, Education, Interests/photo-collage sections — removed from the page.
- Old components (ExperienceSlider, PhotoCollage, BackgroundBanner, Typewriter, ProjectImage) — deleted; photo assets stay in `public/`/`app/src` for later use.
- Old project images (premier-league.jpg, stock-market.jpg) stay in `public/`.

## New Pages

1. **`/` (page.tsx)** — the redesigned portfolio.
2. **`/journey`** — styled "coming soon" teaser: same design language, pokeball, short copy ("training in progress" energy). Nav pokeball button links here.

## Architecture & File Structure

Keep Next.js (App Router) + Tailwind v4. No new runtime dependencies. Data separated from presentation so content updates never require touching components.

```
app/
  layout.tsx            # fonts (Bricolage Grotesque + Inter), metadata, analytics
  globals.css           # theme tokens, smooth scroll, shared keyframes
  page.tsx              # home: composes Nav + Hero + Experience + Projects + Footer
  journey/
    page.tsx            # coming-soon teaser page
  components/
    Nav.tsx             # sticky glass nav + pokeball link
    Pokeball.tsx        # CSS/SVG pokeball icon
    Hero.tsx            # name, bio, CTAs, headshot
    SectionHeader.tsx   # "01 / Experience / ───" row
    ExperienceList.tsx  # renders data/experience.ts
    ProjectList.tsx     # renders data/projects.ts, square media boxes
    Reveal.tsx          # IntersectionObserver fade-in-on-scroll wrapper (client)
    ink/
      InkDragon.tsx     # sumi-e dragon SVG (swappable for raster later)
      InkSweep.tsx      # brush sweep SVGs
  data/
    experience.ts       # typed array: period, company, role, location, blurb, url
    projects.ts         # typed array: name, stack, year, blurb, links, media
public/
  headshot.png          # hero photo (exists)
```

Old files removed: `app/components/{BackgroundBanner,ExperienceSlider,PhotoCollage,ProjectImage,Typewriter}.tsx`, `app/src/` images that are no longer referenced stay untouched (user keeps them), `math53-...-exam.pdf` left alone.

## Responsive Behavior

- Hero: photo stacks above name on mobile; name scales down (~56px).
- Experience/Project rows: collapse to single column on small screens (media box above text).
- Nav: links shrink; email hidden on mobile.

## Error Handling / Edge Cases

- Static site — no backend, no runtime errors to handle beyond image fallbacks (`next/image` with existing assets only).
- All external links `target="_blank" rel="noopener noreferrer"`.

## Testing / Verification

- `npm run build` passes (type-checks all components and data files).
- `npm run lint` passes.
- Manual: dev server visual check of `/` and `/journey`, anchor scrolling, scroll reveal, mobile viewport.

## Out of Scope (Phase 2)

- The Pokemon-style isometric game (`/journey` becomes the game later).
- Real project GIFs (placeholders ship first; swapping = replacing one file + one data field).
- High-res ink artwork (SVG components built to be swappable).
