export type Interest = {
  label: string;
  emoji: string;
};

export const interests: Interest[] = [
  { label: "Poker", emoji: "♠️" },
  { label: "Soccer", emoji: "⚽" },
  { label: "Golf", emoji: "⛳" },
  { label: "Snowboarding", emoji: "🏂" },
  { label: "Calisthenics", emoji: "💪" },
  { label: "Traveling", emoji: "✈️" },
  { label: "Video editing", emoji: "🎬" },
  { label: "Food adventures", emoji: "🍜" },
  { label: "Sidequests", emoji: "🗺️" },
];

export type Photo = {
  /** File inside /public/personalityv2 */
  src: string;
  /** Short caption shown on hover; also used as alt text */
  caption: string;
};

/**
 * Photos shown in the /life gallery (subset of public/personalityv2).
 * Add/remove/reorder freely — captions are yours to edit.
 */
export const photos: Photo[] = [
  { src: "/personalityv2/3J8A4081.JPEG", caption: "Moments with friends" },
  { src: "/personalityv2/DSC03021.JPEG", caption: "Out and about" },
  { src: "/personalityv2/DSC06955.JPG", caption: "Golden hour" },
  { src: "/personalityv2/DSCN0180_Original.jpg", caption: "Throwback" },
  { src: "/personalityv2/IMG_1658.jpg", caption: "Good company" },
  { src: "/personalityv2/IMG_3018.JPG", caption: "Adventures" },
  { src: "/personalityv2/IMG_3706.jpg", caption: "Memories" },
  { src: "/personalityv2/IMG_7700_Original.jpg", caption: "The crew" },
  { src: "/personalityv2/IMG_0850.png", caption: "Berkeley days" },
  { src: "/personalityv2/IMG_2942.png", caption: "Snapshots" },
  { src: "/personalityv2/IMG_6392.png", caption: "Living it up" },
  { src: "/personalityv2/IMG_9326.png", caption: "Caught in the moment" },
];

export const youtubeUrl = "https://youtube.com/@langdonhuynh";
