# Notes & Future Ideas

Scratchpad for improvements and feature ideas. CODEBASE.md explains how the site works; this file is where plans and inspiration live.

## To add — content & features (the running list)

Placeholders and planned work. Check off as they ship.

### Langdon's World game (rebranded from "My Journey"; floating-island version shipped 6/2026)
- [ ] **Audio** — currently OFF: `audio: { noAudio: true }` in `app/components/journey/JourneyGame.tsx` (added to fix an "InvalidStateError: cannot suspend a closed AudioContext" crash on remount). To add sound: re-enable audio, drop files in `public/game/`, load + play in `IslandScene` — e.g. ambient music toggle, footstep + bridge-creak SFX, dialogue text blips, cloud drift ambience. Re-test the Exit/ESC + tab-switch teardown when you do.
- [ ] **Dialogue photos** — 16 placeholders in `app/data/journey.ts` (`{ label: "PHOTO: …" }`, no `src`). Add real images under `public/game/photos/` and set each `src`.
- [ ] **Project GIFs** — record real GIFs of my projects (Clash3D, RedForce, CalVents, PitchPredictor) and wire them into the project squares.
- [ ] Re-check hotspot/collider circles + bridge fit with `/journey?ruler=1` after playtesting (red = walls, green = interact zones).
- [ ] Islands are AI art — to swap one, regenerate then re-run the white-background flood-fill cut before installing.

### /life page & bio content
- [ ] Replace placeholder bookshelf entries with real reads (`app/data/bookshelf.ts`)
- [ ] Write real journal pieces; when one is ready, consider MDX files in `app/writing/` with frontmatter for full essay pages (cards currently link out via `url`)
- [ ] Curate the photo selection + captions in `app/data/life.ts` (46 photos in `public/personalityv2/`, 12 shown)
- [ ] Replace any remaining "[placeholder]" copy across `/life` and the bio/life sections

-> need to move the desktop assets somewhere in teh codebase.

## Polish / small improvements
- Replace SVG ink dragon with high-res sumi-e artwork (see CODEBASE.md → "Swap the ink artwork")
- Iterate on brushstroke placement/opacity
- More entrance/scroll animation polish (e.g. 21st.dev-style effects)

## Inspiration references
- https://www.stephenhung.me/ — editorial dark, big lowercase name, soft fonts (shaped the hero design)
- https://masonjwang.com/ — numbered sections, writing cards, database bookshelf, contact footer
- Swiss style posters — grid, ruled lines, black/white/gray (current design language)

## How to use this file
Jot anything here — Claude reads it when asked to work on the site. Move an item to "done" by deleting it (git history remembers).
