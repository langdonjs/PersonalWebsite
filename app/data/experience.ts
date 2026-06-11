export type Experience = {
  period: string;
  company: string;
  role: string;
  location: string;
  blurb: string;
};

export const experiences: Experience[] = [
  {
    period: "May–Aug 2026",
    company: "Looq AI",
    role: "Perception Software Engineer Intern",
    location: "San Diego",
    blurb:
      "3D infrastructure mapping using ORB-SLAM3, multi-camera footage, IMU/GPS data.",
  },
  {
    period: "Jan–May 2026",
    company: "Perceive AI",
    role: "Machine Learning Engineer Intern",
    location: "San Francisco",
    blurb:
      "RF-DETR training pipelines, active learning across 8000+ frames, SAM 3 pre-labeling — 60% less annotation time.",
  },
  {
    period: "May–Jul 2025",
    company: "BlueRobins",
    role: "Full Stack Software Engineer Intern",
    location: "Berkeley",
    blurb:
      "Next.js + Supabase features for 500+ users · Stripe + Google Calendar webhook automation across 100+ sessions.",
  },
  {
    period: "Aug–Dec 2024",
    company: "SUR",
    role: "Lead Full Stack Mobile Developer",
    location: "Berkeley",
    blurb:
      "Rebuilt vehicle availability for 100 vehicles into a clean range model · SQL functions for search + checkout.",
  },
];
