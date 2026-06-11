# Notes & Future Ideas

Scratchpad for improvements and feature ideas. CODEBASE.md explains how the site works; this file is where plans and inspiration live.

## Backlog (rough priority)

### Journey game follow-ups (game shipped 6/2026, isometric Phaser 3)
- Add real photos: set `src` on photo entries in `app/data/journey.ts` (currently labeled placeholders)
- Art upgrades: nicer player/NPC sprites (replace runtime-drawn ones in `game/gen.ts`), golf flag, TV prop, dock boat
- Possible: footstep sounds, ambient music toggle, animated water
- Walk-through tall grass rustle effect

### /life page follow-ups (page shipped 6/2026 — these are the remaining content tasks)
- Replace placeholder bookshelf entries with real reads (`app/data/bookshelf.ts`)
- Write real journal pieces; when one is ready, consider MDX files in `app/writing/` with frontmatter for full essay pages (cards currently link out via `url`)
- Curate the photo selection + captions in `app/data/life.ts` (46 photos available in `public/personalityv2/`, 12 shown)

## Polish / small improvements
- Replace SVG ink dragon with high-res sumi-e artwork (see CODEBASE.md → "Swap the ink artwork")
- Record real GIFs for project squares (Clash3D, RedForce, CalVents, PitchPredictor)
- Iterate on brushstroke placement/opacity
- More entrance/scroll animation polish (e.g. 21st.dev-style effects)

## Inspiration references
- https://www.stephenhung.me/ — editorial dark, big lowercase name, soft fonts (shaped the hero design)
- https://masonjwang.com/ — numbered sections, writing cards, database bookshelf, contact footer
- Swiss style posters — grid, ruled lines, black/white/gray (current design language)

## How to use this file
Jot anything here — Claude reads it when asked to work on the site. Move an item to "done" by deleting it (git history remembers).
