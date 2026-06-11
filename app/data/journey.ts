export type JourneyPhoto = {
  /** Placeholder label, e.g. "PHOTO: soccer team". Set src later to show a real image. */
  label: string;
  src?: string;
};

export type Landmark = {
  id: string;
  /** Name shown at the top of the dialogue box */
  speaker: string;
  /** Dialogue pages, advanced with [A] */
  lines: string[];
  photos?: JourneyPhoto[];
};

export type ZoneId = "lodge" | "toga" | "bear";

export const zoneNames: Record<ZoneId, string> = {
  lodge: "Langdon's Lodge",
  toga: "Toga Town",
  bear: "Bear Territory",
};

export const landmarks: Record<string, Landmark> = {
  /* ── ZONE 1: LANGDON'S LODGE ── */
  home: {
    id: "home",
    speaker: "Mom & Dad",
    lines: [
      "Born and raised. Family first.",
      "Vietnamese-American household. This is where it all started.",
    ],
    photos: [{ label: "PHOTO: family photo" }],
  },
  sportsField: {
    id: "sportsField",
    speaker: "Sports Field",
    lines: [
      "Soccer. Basketball. Baseball. Swimming.",
      "My parents introduced all four. I loved every single one.",
    ],
    photos: [{ label: "PHOTO: childhood sports" }],
  },
  minecraftCave: {
    id: "minecraftCave",
    speaker: "Mysterious Cave",
    lines: [
      "Lost countless hours in here.",
      "Solo and with friends. Block by block.",
    ],
    photos: [{ label: "PHOTO: Minecraft world" }],
  },
  pokemonTv: {
    id: "pokemonTv",
    speaker: "Old TV",
    lines: [
      "Watched every YouTuber play Pokemon before I ever touched a game.",
      "First game: Pokemon Sword.",
      "Favorites: Snorlax and Slowpoke.",
    ],
    photos: [{ label: "PHOTO: Nintendo Switch / Pokemon" }],
  },
  mangaLibrary: {
    id: "mangaLibrary",
    speaker: "Manga Library",
    lines: [
      "1,000+ volumes read.",
      "Started with anime, switched to manga. It's faster.",
    ],
    photos: [{ label: "PHOTO: manga shelf" }],
  },
  route2: {
    id: "route2",
    speaker: "Route Sign",
    lines: ["Route 2 →", "TOGA TOWN ahead."],
  },

  /* ── ZONE 2: TOGA TOWN ── */
  mlsStadium: {
    id: "mlsStadium",
    speaker: "MLS Next Stadium",
    lines: [
      "This was the one.",
      "Soccer every single day. Left wing. MLS Next level.",
      "12 years poured into the sport I was best at and loved most.",
    ],
    photos: [{ label: "PHOTO: soccer action shot" }, { label: "PHOTO: team photo" }],
  },
  golfGreen: {
    id: "golfGreen",
    speaker: "Putting Green",
    lines: ["Joined the golf team just for fun.", "Balance matters."],
    photos: [{ label: "PHOTO: golf" }],
  },
  danceStudio: {
    id: "danceStudio",
    speaker: "Dance Studio",
    lines: [
      "Homecoming needed a K-pop section. I was in leadership. I said yes.",
      "One of the best decisions.",
    ],
    photos: [{ label: "PHOTO: homecoming performance" }],
  },
  councilHall: {
    id: "councilHall",
    speaker: "Council Member",
    lines: [
      "Class President. It was never about the title.",
      "It was the events, the community, the people.",
    ],
    photos: [{ label: "PHOTO: student council event" }],
  },
  koreaDock: {
    id: "koreaDock",
    speaker: "Ferry Dock",
    lines: [
      "Senior trip. 10 friends. First trip without parents.",
      "Explored Seoul. Everything changed.",
    ],
    photos: [{ label: "PHOTO: Korea trip group" }, { label: "PHOTO: Seoul nights" }],
  },
  route3: {
    id: "route3",
    speaker: "Route Sign",
    lines: ["Route 3 →", "BEAR TERRITORY ahead."],
  },

  /* ── ZONE 3: BEAR TERRITORY ── */
  unit2: {
    id: "unit2",
    speaker: "Unit 2 Dorm",
    lines: [
      "First home away from home. Freshman year at Berkeley.",
      "Figuring everything out one day at a time.",
    ],
    photos: [{ label: "PHOTO: dorm room / Unit 2" }],
  },
  doeLibrary: {
    id: "doeLibrary",
    speaker: "Doe Library",
    lines: ["Many hours. Many late nights.", "This place saw everything."],
    photos: [{ label: "PHOTO: Doe Library study session" }],
  },
  crossroads: {
    id: "crossroads",
    speaker: "The Crossroads",
    lines: [
      "ML? SWE? PM?",
      "Honestly still figuring it out.",
      "I just know I want to solve real problems and make an impact.",
      "That's enough for now.",
    ],
  },
  katsuCurry: {
    id: "katsuCurry",
    speaker: "Katsu Curry House",
    lines: [
      "Greatest food on earth. Non negotiable.",
      "Katsu curry is the answer to everything.",
    ],
    photos: [{ label: "PHOTO: katsu curry" }],
  },
  unfinished: {
    id: "unfinished",
    speaker: "Construction Site",
    lines: ["Still being built.", "Check back soon."],
  },
};
