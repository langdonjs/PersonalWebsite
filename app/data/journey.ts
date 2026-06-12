export type JourneyPhoto = {
  /** Placeholder label, e.g. "PHOTO: soccer team". Set src later to show a real image. */
  label: string;
  src?: string;
};

export type Landmark = {
  id: string;
  /** Name shown at the top of the dialogue box */
  speaker: string;
  /** Short label floating over the hotspot in the world */
  label: string;
  /** Dialogue pages, advanced with [A] */
  lines: string[];
  photos?: JourneyPhoto[];
};

export type ZoneId = "lodge" | "toga" | "campanile";

export const zoneNames: Record<ZoneId, string> = {
  lodge: "Langdon's Lodge",
  toga: "Toga Town",
  campanile: "Campanile City",
};

export const landmarks: Record<string, Landmark> = {
  /* ── ISLAND 1: LANGDON'S LODGE ── */
  home: {
    id: "home",
    speaker: "Mom & Dad",
    label: "HOME",
    lines: [
      "Born and raised. Family first.",
      "Vietnamese-American household. This is where it all started.",
    ],
    photos: [{ label: "PHOTO: family photo" }],
  },
  sportsField: {
    id: "sportsField",
    speaker: "The Field",
    label: "THE FIELD",
    lines: [
      "Soccer. Basketball. Baseball. Swimming.",
      "My parents introduced all four. I loved every single one.",
    ],
    photos: [{ label: "PHOTO: childhood sports" }],
  },
  minecraftCave: {
    id: "minecraftCave",
    speaker: "Mysterious Cave",
    label: "THE CAVE",
    lines: [
      "Lost countless hours in here.",
      "Solo and with friends. Block by block.",
    ],
    photos: [{ label: "PHOTO: Minecraft world" }],
  },
  pokeCenter: {
    id: "pokeCenter",
    speaker: "Poke Center",
    label: "POKE CENTER",
    lines: [
      "Watched every YouTuber play Pokemon before I ever owned a game.",
      "First game: Pokemon Sword on the Switch.",
      "Favorites: Snorlax and Slowpoke.",
    ],
    photos: [{ label: "PHOTO: Nintendo Switch / Pokemon" }],
  },
  mangaLibrary: {
    id: "mangaLibrary",
    speaker: "Manga Library",
    label: "MANGA LIBRARY",
    lines: [
      "1,000+ volumes read.",
      "Started with anime, switched to manga. It's faster.",
    ],
    photos: [{ label: "PHOTO: manga shelf" }],
  },

  /* ── ISLAND 2: TOGA TOWN ── */
  mlsStadium: {
    id: "mlsStadium",
    speaker: "MLS Next Stadium",
    label: "MLS NEXT STADIUM",
    lines: [
      "This was the one.",
      "Soccer every single day. MLS Next level.",
      "The sport I was best at and loved most.",
    ],
    photos: [{ label: "PHOTO: soccer action shot" }, { label: "PHOTO: team photo" }],
  },
  soccerPitch: {
    id: "soccerPitch",
    speaker: "Training Pitch",
    label: "THE PITCH",
    lines: [
      "12 years on the left wing.",
      "Narrowed everything down to this game, and went all in.",
    ],
    photos: [{ label: "PHOTO: match day" }],
  },
  danceStudio: {
    id: "danceStudio",
    speaker: "Dance Studio",
    label: "DANCE STUDIO",
    lines: [
      "Homecoming needed a K-pop section. I was in leadership. I said yes.",
      "One of the best decisions.",
    ],
    photos: [{ label: "PHOTO: homecoming performance" }],
  },
  togaHigh: {
    id: "togaHigh",
    speaker: "Toga High",
    label: "TOGA HIGH",
    lines: [
      "Class President. It was never about the title.",
      "It was the events, the community, the people.",
    ],
    photos: [{ label: "PHOTO: student council event" }],
  },
  fountain: {
    id: "fountain",
    speaker: "Park Fountain",
    label: "THE PARK",
    lines: [
      "Joined the golf team just for fun.",
      "Balance matters.",
    ],
    photos: [{ label: "PHOTO: golf team" }],
  },
  seoulTower: {
    id: "seoulTower",
    speaker: "N Seoul Tower",
    label: "SEOUL TRIP",
    lines: [
      "Senior trip. 10 friends. First trip without parents.",
      "Explored Seoul. Everything changed.",
    ],
    photos: [{ label: "PHOTO: Korea trip group" }, { label: "PHOTO: Seoul nights" }],
  },

  /* ── ISLAND 3: CAMPANILE CITY ── */
  memStadium: {
    id: "memStadium",
    speaker: "Memorial Stadium",
    label: "MEMORIAL STADIUM",
    lines: ["Saturdays in Strawberry Canyon.", "Go Bears."],
    photos: [{ label: "PHOTO: Cal game day" }],
  },
  doeLibrary: {
    id: "doeLibrary",
    speaker: "Doe Library",
    label: "DOE LIBRARY",
    lines: ["Many hours. Many late nights.", "This place saw everything."],
    photos: [{ label: "PHOTO: Doe Library study session" }],
  },
  campanile: {
    id: "campanile",
    speaker: "The Campanile",
    label: "THE CAMPANILE",
    lines: [
      "ML? SWE? PM?",
      "Honestly still figuring it out.",
      "I just know I want to solve real problems and make an impact.",
      "That's enough for now.",
    ],
  },
  unit2: {
    id: "unit2",
    speaker: "Unit 2 Dorm",
    label: "UNIT 2",
    lines: [
      "First home away from home. Freshman year at Berkeley.",
      "Figuring everything out one day at a time.",
    ],
    photos: [{ label: "PHOTO: dorm room / Unit 2" }],
  },
  foodStalls: {
    id: "foodStalls",
    speaker: "Curry House Row",
    label: "KATSU CURRY",
    lines: [
      "Greatest food on earth. Non negotiable.",
      "Katsu curry is the answer to everything.",
    ],
    photos: [{ label: "PHOTO: katsu curry" }],
  },
  bearStatue: {
    id: "bearStatue",
    speaker: "Bear Statue",
    label: "GO BEARS",
    lines: [
      "Hard work. Empathy. Authenticity.",
      "And the people around me, family and friends, above everything.",
    ],
  },
  lockedGate: {
    id: "lockedGate",
    speaker: "Locked Gate",
    label: "???",
    lines: ["Still being built.", "Check back soon."],
  },
};
