# Notes & Future Ideas

Scratchpad for improvements and feature ideas. CODEBASE.md explains how the site works; this file is where plans and inspiration live.

## Backlog (rough priority)

### Phase 2 — Pokemon journey game
- Replace `/journey` coming-soon page with a playable isometric-2D world (Phaser.js)
- Small island ("Langdon's Town"), gyms = internships, routes = skills
- Free pokemon-esque tilesets from itch.io / OpenGameArt
- Mobile controls (touch joystick) vs keyboard on desktop

### Bookshelf section (inspired by masonjwang.com/bookshelf)
- Database/table style: sortable + filterable rows, like a personal Notion view
- Fields per entry: title, author, category (fiction/nonfiction/advice/…), medium (book/essay/paper/video), rating, tags, short takeaway/comment
- Category tabs (All / Favorites / by tag), color-coded tags
- Implementation idea: `app/data/bookshelf.ts` typed array + a client component with sort/filter state — same data-file pattern as experience/projects, no backend needed

### Writing / essays section (inspired by masonjwang.com writing section)
- Blog-style cards: title, date, short description
- Implementation idea: MDX files in `app/writing/` (one file per essay) with frontmatter (title, date, tags); Next.js renders them statically
- Could start with just 1–2 pieces — advice, reflections, project writeups

### About / photos page
- A page that actually shows who I am — pictures, hobbies, memories
- Reuse the photo collage assets saved in `public/archive/` (old photo roulette)
- Could fold in the interests/hobbies copy from the old site (soccer, golf, poker, snowboarding, video editing, YouTube channel)

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
