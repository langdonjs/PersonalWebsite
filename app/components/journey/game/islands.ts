import type { ZoneId } from "../../../data/journey";

export type Hotspot = {
  landmarkId: string;
  /** position in island-local image pixels */
  x: number;
  y: number;
  /** interaction radius */
  r: number;
  /** optional label position override (defaults to above the hotspot) */
  labelX?: number;
  labelY?: number;
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
  /** circles the player can't enter (tight around buildings only; paths/grass/people stay walkable) */
  colliders: Collider[];
};

/** Image size of every island (all generated at the same resolution) */
export const ISLAND_W = 1448;
export const ISLAND_H = 1086;

/**
 * Layout matches the painted bridge stubs:
 * lodge dock points south, toga has a west stub + south-east dock,
 * campanile's stone bridge points south-west.
 */
export const islands: IslandDef[] = [
  {
    id: "lodge",
    textureKey: "isle-lodge",
    url: "/game/islands/lodge.png",
    wx: 0,
    wy: 600,
    hotspots: [
      { landmarkId: "home", x: 615, y: 470, r: 130, labelX: 330, labelY: 250 },
      { landmarkId: "mangaLibrary", x: 730, y: 320, r: 120 },
      { landmarkId: "minecraftCave", x: 1110, y: 320, r: 130 },
      { landmarkId: "sportsField", x: 960, y: 570, r: 150 },
      { landmarkId: "pokeCenter", x: 520, y: 760, r: 130 },
    ],
    colliders: [
      { x: 330, y: 330, r: 120 }, // blue house
      { x: 735, y: 225, r: 95 }, // manga library
      { x: 1115, y: 205, r: 110 }, // cave mound
      { x: 480, y: 650, r: 115 }, // poke center
    ],
  },
  {
    id: "toga",
    textureKey: "isle-toga",
    url: "/game/islands/toga.png",
    wx: 1750,
    wy: 1500,
    hotspots: [
      { landmarkId: "mlsStadium", x: 620, y: 400, r: 150 },
      { landmarkId: "danceStudio", x: 375, y: 520, r: 120 },
      { landmarkId: "togaHigh", x: 1060, y: 420, r: 150 },
      { landmarkId: "soccerPitch", x: 620, y: 680, r: 170 },
      { landmarkId: "fountain", x: 905, y: 730, r: 110 },
      { landmarkId: "seoulTower", x: 1245, y: 680, r: 130 },
    ],
    colliders: [
      { x: 620, y: 265, r: 150 }, // stadium building
      { x: 368, y: 430, r: 100 }, // dance studio
      { x: 1070, y: 275, r: 150 }, // high school
      { x: 1248, y: 590, r: 45 }, // tower base
      { x: 905, y: 705, r: 40 }, // fountain bowl
    ],
  },
  {
    id: "campanile",
    textureKey: "isle-campanile",
    url: "/game/islands/campanile.png",
    wx: 3650,
    wy: 1400,
    hotspots: [
      { landmarkId: "memStadium", x: 300, y: 350, r: 160 },
      { landmarkId: "doeLibrary", x: 700, y: 380, r: 160 },
      { landmarkId: "campanile", x: 1010, y: 350, r: 120 },
      { landmarkId: "unit2", x: 1240, y: 320, r: 140 },
      { landmarkId: "foodStalls", x: 620, y: 690, r: 150 },
      { landmarkId: "clubs", x: 1190, y: 520, r: 120, labelX: 1190, labelY: 400 },
      { landmarkId: "lockedGate", x: 1300, y: 770, r: 120 },
    ],
    colliders: [
      { x: 285, y: 225, r: 160 }, // memorial stadium
      { x: 705, y: 255, r: 160 }, // doe library
      { x: 1012, y: 235, r: 55 }, // campanile tower
      { x: 1248, y: 205, r: 125 }, // dorm
      { x: 620, y: 610, r: 95 }, // food stalls
      { x: 1000, y: 595, r: 40 }, // bear statue
      { x: 1190, y: 470, r: 70 }, // club fair tent
    ],
  },
];

export type Bridge = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

/**
 * The painted bridge stubs were erased from the art; bridges now attach
 * directly to the clean cliff edges.
 */
export const bridges: Bridge[] = [
  { x1: 0 + 1090, y1: 600 + 850, x2: 1750 + 125, y2: 1500 + 400 },
  { x1: 1750 + 1215, y1: 1500 + 838, x2: 3650 + 295, y2: 1400 + 845 },
];

export const BRIDGE_HALF_WIDTH = 52;

export const SPAWN = { x: 0 + 700, y: 600 + 620 };

export const WORLD_W = 3650 + ISLAND_W + 200;
export const WORLD_H = 1500 + ISLAND_H + 200;
