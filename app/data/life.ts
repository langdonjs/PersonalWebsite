export const interests: string[] = [
  "Poker",
  "Soccer",
  "Golf",
  "Snowboarding",
  "Calisthenics",
  "Traveling",
  "Video editing",
  "Food adventures",
  "Sidequests",
];

/**
 * PLACEHOLDER COPY for the Hobbies section on /life.
 * `now` is what you're currently into, `past` is what got you here.
 */
export const hobbies = {
  now: "Placeholder: these days you can find me at poker nights with friends, pickup soccer at the RSF, and chasing new food spots around the Bay. I'm also slowly getting better at golf, emphasis on slowly.",
  past: "Placeholder: I grew up playing competitive soccer, picked up snowboarding on winter trips to Tahoe, and spent high school editing videos for fun, which turned into a YouTube channel I still post to.",
};

export type Photo = {
  /** File inside /public/personalityv2 */
  src: string;
  /** Short caption shown on hover; also used as alt text */
  caption: string;
};

/**
 * Photos shown in the /life gallery (subset of public/personalityv2).
 * Add/remove/reorder freely, captions are yours to edit.
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
