import type { ZoneId } from "../../../data/journey";

export type Hotspot = {
  landmarkId: string;
  /** position in island-local image pixels */
  x: number;
  y: number;
  /** interaction radius */
  r: number;
};

export type Collider = { x: number; y: number; r: number };

export type IslandDef = {
  id: ZoneId;
  textureKey: string;
  url: string;
  /** world position of the image's top-left corner */
  wx: number;
  wy: number;
  hotspots: Hotspot[];
  /** circles the player can't enter (buildings, fenced areas) */
  colliders: Collider[];
};

/** Image size of every island (all generated at the same resolution) */
export const ISLAND_W = 1448;
export const ISLAND_H = 1086;

export const islands: IslandDef[] = [
  {
    id: "lodge",
    textureKey: "isle-lodge",
    url: "/game/islands/lodge.png",
    wx: 0,
    wy: 1000,
    hotspots: [
      { landmarkId: "home", x: 615, y: 470, r: 130 },
      { landmarkId: "mangaLibrary", x: 730, y: 320, r: 120 },
      { landmarkId: "minecraftCave", x: 1110, y: 320, r: 130 },
      { landmarkId: "sportsField", x: 960, y: 570, r: 150 },
      { landmarkId: "pokeCenter", x: 520, y: 760, r: 130 },
    ],
    colliders: [
      { x: 340, y: 360, r: 165 }, // blue house
      { x: 730, y: 230, r: 120 }, // manga library
      { x: 1115, y: 220, r: 140 }, // cave mound
      { x: 480, y: 660, r: 150 }, // poke center
    ],
  },
  {
    id: "toga",
    textureKey: "isle-toga",
    url: "/game/islands/toga.png",
    wx: 1700,
    wy: 520,
    hotspots: [
      { landmarkId: "mlsStadium", x: 620, y: 400, r: 150 },
      { landmarkId: "danceStudio", x: 375, y: 520, r: 120 },
      { landmarkId: "togaHigh", x: 1060, y: 420, r: 150 },
      { landmarkId: "soccerPitch", x: 620, y: 680, r: 170 },
      { landmarkId: "fountain", x: 905, y: 730, r: 110 },
      { landmarkId: "seoulTower", x: 1245, y: 680, r: 130 },
    ],
    colliders: [
      { x: 620, y: 280, r: 185 }, // stadium
      { x: 370, y: 440, r: 125 }, // dance studio
      { x: 1065, y: 290, r: 185 }, // high school
      { x: 620, y: 640, r: 150 }, // fenced pitch
      { x: 1248, y: 580, r: 70 }, // tower base
    ],
  },
  {
    id: "campanile",
    textureKey: "isle-campanile",
    url: "/game/islands/campanile.png",
    wx: 3400,
    wy: 40,
    hotspots: [
      { landmarkId: "memStadium", x: 300, y: 350, r: 160 },
      { landmarkId: "doeLibrary", x: 700, y: 380, r: 160 },
      { landmarkId: "campanile", x: 1010, y: 350, r: 120 },
      { landmarkId: "unit2", x: 1240, y: 320, r: 140 },
      { landmarkId: "foodStalls", x: 620, y: 690, r: 150 },
      { landmarkId: "bearStatue", x: 1000, y: 650, r: 110 },
      { landmarkId: "lockedGate", x: 1300, y: 770, r: 120 },
    ],
    colliders: [
      { x: 290, y: 240, r: 195 }, // memorial stadium
      { x: 700, y: 270, r: 190 }, // doe library
      { x: 1012, y: 240, r: 75 }, // campanile tower
      { x: 1245, y: 220, r: 145 }, // dorm
      { x: 620, y: 620, r: 120 }, // food stalls
      { x: 1000, y: 600, r: 60 }, // bear statue
    ],
  },
];

export type Bridge = {
  /** world coords of both ends */
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

/**
 * Bridges connect the islands' painted dock/bridge stubs.
 * Local anchors: lodge dock (1080, 930), toga west (60, 410), toga east (1340, 830),
 * campanile south-west (190, 850).
 */
export const bridges: Bridge[] = [
  { x1: 0 + 1080, y1: 1000 + 930, x2: 1700 + 60, y2: 520 + 410 },
  { x1: 1700 + 1340, y1: 520 + 830, x2: 3400 + 190, y2: 40 + 850 },
];

export const BRIDGE_HALF_WIDTH = 56;

export const SPAWN = { x: 0 + 700, y: 1000 + 640 };

export const WORLD_W = 3400 + ISLAND_W + 200;
export const WORLD_H = 1000 + ISLAND_H + 200;
