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
  /** One-line takeaway shown in the table row */
  takeaway: string;
  /** Longer comments/notes, revealed when the row is expanded */
  notes?: string;
};

/**
 * PLACEHOLDER ENTRIES, replace with your real reads.
 * The table on /bookshelf sorts and filters whatever is in this array.
 * `notes` shows when a row is clicked open.
 */
export const bookshelf: BookEntry[] = [
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    category: "advice",
    medium: "book",
    rating: 9,
    favorite: true,
    takeaway: "Specific knowledge compounds. Play long-term games with long-term people.",
    notes:
      "Placeholder notes: write what stuck with you here. Which chapters you keep coming back to, what you disagreed with, how it changed a decision you made.",
  },
  {
    title: "Attention Is All You Need",
    author: "Vaswani et al.",
    category: "technical",
    medium: "paper",
    rating: 10,
    favorite: true,
    takeaway: "The paper that started everything I work on.",
    notes:
      "Placeholder notes: your annotations, the parts that clicked, and what you had to read three times before it made sense.",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    category: "fiction",
    medium: "book",
    rating: 8,
    takeaway: "Science as a survival story. Couldn't put it down.",
    notes:
      "Placeholder notes: favorite moments, how it compares to The Martian, who you'd recommend it to.",
  },
  {
    title: "How To Do Great Work",
    author: "Paul Graham",
    category: "advice",
    medium: "essay",
    rating: 9,
    favorite: true,
    takeaway: "Work on what you'd choose anyway; curiosity is the engine.",
    notes:
      "Placeholder notes: the lines you highlighted and what they pushed you to start or stop doing.",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "nonfiction",
    medium: "book",
    rating: 7,
    takeaway: "System 1 runs more of my decisions than I'd like to admit.",
    notes:
      "Placeholder notes: which biases you catch yourself in now, and where the book dragged.",
  },
  {
    title: "Segment Anything",
    author: "Kirillov et al.",
    category: "technical",
    medium: "paper",
    rating: 8,
    takeaway: "Promptable segmentation, the foundation of my pre-labeling work at Perceive.",
    notes:
      "Placeholder notes: how you applied it in the SAM 3 pre-labeling pipeline and what surprised you in practice.",
  },
];
