export type BookCategory = "fiction" | "nonfiction" | "advice" | "technical";
export type BookMedium = "book" | "essay" | "paper" | "video";

export type BookEntry = {
  title: string;
  author: string;
  category: BookCategory;
  medium: BookMedium;
  /** 1–10 */
  rating: number;
  favorite?: boolean;
  /** One-line takeaway or comment */
  takeaway: string;
};

/**
 * PLACEHOLDER ENTRIES — replace with your real reads.
 * The table on /life sorts and filters whatever is in this array.
 */
export const bookshelf: BookEntry[] = [
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    category: "advice",
    medium: "book",
    rating: 9,
    favorite: true,
    takeaway: "Specific knowledge compounds — play long-term games with long-term people.",
  },
  {
    title: "Attention Is All You Need",
    author: "Vaswani et al.",
    category: "technical",
    medium: "paper",
    rating: 10,
    favorite: true,
    takeaway: "The paper that started everything I work on.",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    category: "fiction",
    medium: "book",
    rating: 8,
    takeaway: "Science as a survival story — couldn't put it down.",
  },
  {
    title: "How To Do Great Work",
    author: "Paul Graham",
    category: "advice",
    medium: "essay",
    rating: 9,
    favorite: true,
    takeaway: "Work on what you'd choose anyway; curiosity is the engine.",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "nonfiction",
    medium: "book",
    rating: 7,
    takeaway: "System 1 runs more of my decisions than I'd like to admit.",
  },
  {
    title: "Segment Anything",
    author: "Kirillov et al.",
    category: "technical",
    medium: "paper",
    rating: 8,
    takeaway: "Promptable segmentation — the foundation of my pre-labeling work at Perceive.",
  },
];
