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
 * Add your real reads here. While this array is empty, /bookshelf shows a
 * "will be updated soon" state instead of the table; it reappears the moment
 * you add an entry.
 *
 * Template for a new entry:
 * {
 *   title: "…",
 *   author: "…",
 *   category: "technical", // fiction | nonfiction | advice | technical
 *   medium: "book",        // book | essay | paper | video
 *   rating: 9,             // 1–10
 *   favorite: true,        // optional
 *   takeaway: "One-line takeaway shown in the row.",
 *   notes: "Longer notes, shown when the row is expanded.", // optional
 * }
 */
export const bookshelf: BookEntry[] = [];
