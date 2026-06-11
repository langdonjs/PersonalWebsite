# Journey Game Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/journey` placeholder with a 2D isometric Pokemon-style interactive biography game per the user's spec (3 zones: Langdon's Lodge → Toga Town → Bear Territory, 15 landmarks with dialogue + photo placeholders, progressive camera zoom).

**Architecture:** Phaser 3 game mounted client-side inside the existing Next.js app. Isometric rendering done manually (diamond projection `sx=(gx-gy)*32`, `sy=(gx+gy)*16`, depth `gx+gy`), all sprites anchored at origin (0.5, 1) on the base-diamond bottom vertex. Dialogue/photo UI and touch controls are React DOM overlays communicating with the scene via window CustomEvents. Story content lives in `app/data/journey.ts` like all other site content.

**Art:** Yar's CC-BY 3.0 isometric tilesets from OpenGameArt (`iso-64x64-outside.png`, `iso-64x64-building.png`), verified frame rects via alpha-bbox scan. Player sprite + wooden sign generated at runtime on canvas (GBA proportions). Attribution shipped in `public/game/ATTRIBUTION.md` and shown in the game HUD footer.

**Tech Stack:** Next.js 16, Phaser 3 (npm), Press Start 2P via next/font, TypeScript.

**Key frame rects (sheet, x, y, w, h):**
- outside: grass variants (0/64/128/192/256/320, 33, 64, 31), dirt (384, 33), grass row B (0..., 97), water (384, 608, 64, 32), tall grass (0, 688, 64, 72), bush (70, 784, 56, 43), pine (128, 752, 80, 128), big tree (416, 872, 219, 145), dead tree (280, 907, 136, 113), rocks (0, 304, 64, 75) and (160, 304, 96, 78), log (265, 798, 87, 26)
- building: wall cube (0, 48, 64, 80), stone cube (0, 112, 64, 80), roof gable L/R (64/128, 48, 64, 80), roof wide (192, 48, 128, 80), pyramid roof (576, 32, 64, 80), door wall (576, 176, 64, 80), window wall (64, 176, 64, 80), wood floor (128, 33, 64, 31), well (512, 304, 64, 80), stone tall (512, 128, 64, 96), table (64, 337, 64, 43)
- Cube wall visual height: 48px (second story / roof offset = -48)

### Task 1: Assets + dependency
- Copy tilesheets to `public/game/`, write `public/game/ATTRIBUTION.md`
- `npm i phaser`

### Task 2: Story data
- Create `app/data/journey.ts`: `Zone` + `Landmark` types; 15 landmarks across 3 zones with names, dialogue lines, photo placeholder labels per the spec

### Task 3: Game core (`app/components/journey/game/`)
- `iso.ts`: constants + projection
- `frames.ts`: frame table above, registered as Phaser texture frames
- `gen.ts`: runtime-generated textures (player 4-dir × 2-frame walk, NPC palette variants, wooden sign)
- `world.ts`: 64×64 grid: terrain, diagonal path, zone layouts, buildings (composed cube+roof prefabs), props, entities (signs/NPCs → landmark ids), collision set
- `WorldScene.ts`: render ground + depth-sorted props, grid movement (WASD/arrows, 170ms tweens), facing-tile interaction (A/Space/Enter), camera follow + zoom lerp 0.55→1.35 by diagonal progress, zone + dialogue CustomEvents, touch-input polling

### Task 4: React shell
- `JourneyGame.tsx` (client): Phaser bootstrap in useEffect, HUD (zone name, hints), dialogue box (dark, Press Start 2P, typewriter feel ok to skip), photo placeholder panel with [A] cycle / [B] close, touch D-pad + A/B buttons (mobile), attribution line
- `app/journey/page.tsx`: metadata + full-screen game + back link

### Task 5: Verify + ship
- `npm run lint` + `npm run build` pass
- Smoke test `/journey` serves 200 and game canvas mounts
- Update CODEBASE.md (journey section) and NOTES.md (mark game shipped, list follow-ups: real photos, sprite art upgrade)
- Commit
