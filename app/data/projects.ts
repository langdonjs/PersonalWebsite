export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  name: string;
  stack: string;
  year: string;
  blurb: string;
  /** Short label shown inside the placeholder media box until a real GIF exists */
  monogram: string;
  /** CSS background for the placeholder media box */
  gradient: string;
  /** Set to a file in /public to replace the placeholder with a real GIF/image */
  media?: string;
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
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
