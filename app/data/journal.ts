export type JournalEntry = {
  title: string;
  date: string;
  excerpt: string;
  /** e.g. "6 min read" — shown Medium-style on /journal */
  readTime?: string;
  /** Set when the piece is published; cards without it show "coming soon" */
  url?: string;
};

/**
 * PLACEHOLDER ENTRIES — swap in real pieces as you write them.
 * Cards without a `url` render as "in the works".
 */
export const journal: JournalEntry[] = [
  {
    title: "What four internships taught me about learning fast",
    date: "2026",
    excerpt:
      "From rebuilding a booking system as a freshman to training detection models in production — the patterns that carried over.",
  },
  {
    title: "Reflections on Berkeley, two years in",
    date: "2026",
    excerpt:
      "CS + Applied Math, club life, and what I'd tell my freshman self about picking what to spend time on.",
  },
  {
    title: "Building Clash3D: from screen recording to 3D replay",
    date: "2026",
    excerpt:
      "A technical writeup of the pipeline — YOLO fine-tuning, ByteTrack identity stitching, and Blender automation.",
  },
];
