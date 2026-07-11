export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  /** URL slug for the on-site write-up page at /projects/<slug> */
  slug: string;
  name: string;
  stack: string;
  year: string;
  /** Optional award/recognition shown as a small badge (e.g. hackathon win) */
  award?: string;
  blurb: string;
  /** Short label shown inside the placeholder media box until a real GIF exists */
  monogram: string;
  /** CSS background for the placeholder media box */
  gradient: string;
  /** Set to a file in /public to replace the placeholder with a real GIF/image */
  media?: string;
  /**
   * Long-form write-up shown on /projects/<slug>. Plain text — blank lines
   * separate paragraphs. Leave undefined to show a "coming soon" placeholder.
   */
  writeup?: string;
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "ironbook",
    name: "Ironbook",
    stack: "TypeScript · React · FastAPI · COLMAP · Gaussian Splatting · WebGL",
    year: "Jun 2026",
    award: "1st Place Grand Prize · UC Berkeley AI Hackathon",
    blurb:
      "Turns physical spaces into navigable 3D scenes you can explore and query in natural language. A COLMAP + Gaussian Splatting + WebGL pipeline reconstructs a walkable scene from photos in ~4 minutes, paired with a spatial AI agent that drives the camera to answer questions about the space.",
    monogram: "IB",
    gradient: "linear-gradient(135deg, #1b1b1f 0%, #45454d 100%)",
    media: "/projects/ironbook.gif",
    writeup:
      "Ironbook converts physical environments into navigable 3D scenes that users can explore and query through natural language.\n\nThe reconstruction pipeline chains COLMAP, Gaussian Splatting, and a WebGL renderer to turn a set of ordinary photos into a walkable 3D scene in about four minutes.\n\nOn top of the scene sits a spatial AI agent with six camera tools (navigate, zoom, rotate, highlight objects, and answer spatial questions) so you can ask about a room and watch the view respond.\n\nIronbook placed 1st among 460+ teams and 1,300+ participants, earning the $5,000 Grand Prize at the UC Berkeley AI Hackathon.",
    links: [],
  },
  {
    slug: "clash3d",
    name: "Clash3D",
    stack: "Python · YOLO · ByteTrack · Blender",
    year: "May 2026",
    blurb:
      "A computer vision pipeline that reconstructs 2D Clash Royale screen recordings into animated 3D arena replays. Fine-tuned YOLO + ByteTrack to track each troop's position and identity, then rendered keyframed 3D animations in Blender via Python.",
    monogram: "C3D",
    gradient: "linear-gradient(135deg, #18181b 0%, #3a3a40 100%)",
    links: [{ label: "GitHub", url: "https://github.com/langdonjs/Clash3D" }],
  },
  {
    slug: "redforce",
    name: "RedForce",
    stack: "React · Express · TypeScript · SQLite",
    year: "2026 · Perplexity Hackathon",
    blurb:
      "A multi-agent AI security assessment tool that runs staged adversarial attacks against AI products (recon, prompt extraction, data exfiltration, privilege escalation), streaming live agent activity to a dashboard with an executive report.",
    monogram: "RF",
    gradient: "linear-gradient(135deg, #232326 0%, #4a4a50 100%)",
    links: [{ label: "GitHub", url: "https://github.com/langdonjs/RedForce" }],
  },
  {
    slug: "calvents",
    name: "CalVents",
    stack: "React Native · Supabase · Python · Selenium",
    year: "Sep–Dec 2025",
    blurb:
      "A campus events discovery app unifying scraped event data from 5 web sources into Supabase, powering a React Native feed with search, filters, and a campus map for browsing upcoming events.",
    monogram: "CV",
    gradient: "linear-gradient(135deg, #e2ded6 0%, #c8c4ba 100%)",
    links: [],
  },
  {
    slug: "pitchpredictor",
    name: "PitchPredictor",
    stack: "Python · scikit-learn · pandas",
    year: "2024–2025 · Published",
    blurb:
      "Supervised models trained on engineered match-level features to predict Premier League outcomes across a full 380-game season, hitting 61.5% accuracy vs a 33% baseline. Published in NHSJS.",
    monogram: "PP",
    gradient: "linear-gradient(135deg, #2e2e32 0%, #5a5a60 100%)",
    links: [
      {
        label: "Paper",
        url: "https://nhsjs.com/2024/enhancing-football-match-predictions-through-ai-and-machine-learning-in-the-english-premier-league/",
      },
      {
        label: "GitHub",
        url: "https://github.com/langdonjs/English-Premier-League-Match-Predictor",
      },
    ],
  },
];
