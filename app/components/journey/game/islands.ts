import type { ZoneId } from "../../../data/journey";

/**
 * ──────────────────────────────────────────────────────────────────────────
 *  HOW TO MOVE AN ISLAND OR BRIDGE
 * ──────────────────────────────────────────────────────────────────────────
 *  The map is one big pixel canvas. Origin (0,0) is the top-left corner;
 *  x grows to the RIGHT, y grows DOWNWARD. Every island and bridge is pinned
 *  by its own top-left corner at (wx, wy).
 *
 *    • move RIGHT  → increase wx        • move LEFT → decrease wx
 *    • move DOWN   → increase wy        • move UP   → decrease wy
 *
 *  To reposition a piece, edit ONLY its `wx` / `wy` below (in `islands` or
 *  `bridges`). Bridges need nothing else — their walkable deck path is stored
 *  sprite-local (deckX/deckY) and follows wx/wy automatically.
 *
 *  To find the numbers visually, open  /journey?ruler=1  : you get a grid,
 *  the cursor's live world coordinates, and each piece's current wx/wy. Hover
 *  where you want a piece's TOP-LEFT corner to sit, read the x,y, paste it in
 *  here, save, and refresh /journey. (Drag = pan, arrows = scroll, wheel = zoom.)
 *
 *  TWO MORE LEVERS (both optional fields on a piece):
 *    • depth — draw order; higher = on top. Islands default 10, bridges 8.
 *      Give a bridge `depth: 11` to lay it ON TOP of the lodge (depth 10)
 *      instead of tucking under it.
 *    • angle — tilt a bridge in degrees (+ clockwise), e.g. `angle: 5`. It
 *      pivots around the bridge's top-left (wx,wy), so re-nudge wx,wy after.
 *      The walkable deck path follows the tilt automatically.
 *
 *  BARRIERS & LABELS (per island): `colliders` are circles {x,y,r} the player
 *  can't walk into; `hotspots` are where a label floats and you press SPACE.
 *  Both use ISLAND-LOCAL pixels (0,0 = that island's own top-left). In
 *  ?ruler=1, red circles = walls and green circles = interact zones — delete a
 *  collider to open a path, or move a hotspot's x/y to sit its label correctly.
 * ──────────────────────────────────────────────────────────────────────────
 */

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
  /** draw order; higher = on top. Default 10 (islands sit above bridges' default 8). */
  depth?: number;
};

/** Largest island canvas; a safe upper bound for the per-island walk-area
 * test in IslandScene. Actual sizes differ: lodge 1448x1086, toga 1448x1022,
 * campanile 1442x1055. */
export const ISLAND_W = 1448;
export const ISLAND_H = 1086;

/**
 * Island world positions are chained off the painted bridge sprites so the
 * map reads as one descending island chain. lodge is fixed; each bridge deck
 * end tucks ~130px under the next island's cliff (islands draw above bridges,
 * hiding the seam). Connection anchors (island-local): lodge sand exit
 * (1409,958) -> Toga Town arch (74,116); toga lower-right exit (1408,920) ->
 * campanile Sather Gate plaza (11,465). The decorative stone footbridge built
 * into campanile's lower-right is a dead-end, not a connection.
 */
export const islands: IslandDef[] = [
  {
    id: "lodge",
    textureKey: "isle-lodge",
    url: "/game/islands/lodge.png",
    wx: 60,
    wy: 60,
    hotspots: [
      { landmarkId: "minecraftCave", x: 300, y: 190, r: 140, labelX: 300, labelY: 70 },
      { landmarkId: "home", x: 770, y: 200, r: 140, labelX: 770, labelY: 70 },
      { landmarkId: "pokeCenter", x: 235, y: 440, r: 140, labelX: 235, labelY: 315 },
      { landmarkId: "mangaLibrary", x: 1180, y: 480, r: 140, labelX: 1180, labelY: 360 },
      { landmarkId: "sportsField", x: 370, y: 690, r: 165, labelX: 370, labelY: 560 },
    ],
    colliders: [
      { x: 290, y: 180, r: 140 }, // cave mound
      { x: 770, y: 180, r: 130 }, // blue house (home)
      { x: 235, y: 430, r: 130 }, // poke center
      { x: 1180, y: 470, r: 130 }, // manga library
    ],
  },
  {
    id: "toga",
    textureKey: "isle-toga",
    url: "/game/islands/toga.png",
    wx: 1900,
    wy: 1400,
    depth: 12, // above bridge-lodge-toga (11) so that bridge still tucks under toga
    hotspots: [
      { landmarkId: "mlsStadium", x: 560, y: 180, r: 150, labelX: 560, labelY: 60 },
      { landmarkId: "togaHigh", x: 1130, y: 250, r: 150, labelX: 1130, labelY: 120 },
      { landmarkId: "danceStudio", x: 230, y: 470, r: 130, labelX: 230, labelY: 360 },
      { landmarkId: "soccerPitch", x: 625, y: 480, r: 170, labelX: 625, labelY: 330 },
      { landmarkId: "fountain", x: 235, y: 735, r: 120, labelX: 235, labelY: 650 },
      { landmarkId: "seoulTower", x: 1110, y: 620, r: 140, labelX: 1110, labelY: 460 },
    ],
    colliders: [
      { x: 500, y: 175, r: 120 }, // toga stadium (left)
      { x: 665, y: 180, r: 120 }, // toga stadium (right)
      { x: 1045, y: 245, r: 110 }, // toga high (left wing)
      { x: 1235, y: 255, r: 110 }, // toga high (right wing)
      { x: 230, y: 470, r: 105 }, // dance studio
      { x: 1075, y: 600, r: 55 }, // seoul tower base
      // pitch + central paths intentionally left walkable
    ],
  },
  {
    id: "campanile",
    textureKey: "isle-campanile",
    url: "/game/islands/campanile.png",
    wx: 4000,
    wy: 2500,
    depth: 14,
    hotspots: [
      { landmarkId: "memStadium", x: 300, y: 190, r: 150, labelX: 300, labelY: 50 },
      { landmarkId: "doeLibrary", x: 720, y: 250, r: 150, labelX: 720, labelY: 90 },
      { landmarkId: "campanile", x: 1000, y: 250, r: 110, labelX: 1000, labelY: 40 },
      { landmarkId: "unit2", x: 1330, y: 330, r: 125, labelX: 1330, labelY: 200 },
      { landmarkId: "foodStalls", x: 550, y: 550, r: 140, labelX: 550, labelY: 470 },
      { landmarkId: "clubs", x: 1020, y: 530, r: 120, labelX: 1020, labelY: 450 },
      { landmarkId: "lockedGate", x: 1180, y: 850, r: 120, labelX: 1180, labelY: 760 },
    ],
    colliders: [
      { x: 220, y: 170, r: 130 }, // memorial stadium (left)
      { x: 400, y: 140, r: 130 }, // memorial stadium (center)
      { x: 560, y: 170, r: 110 }, // memorial stadium (right)
      { x: 650, y: 210, r: 130 }, // doe library (left)
      { x: 840, y: 210, r: 130 }, // doe library (right)
      { x: 1015, y: 230, r: 55 }, // campanile tower
      { x: 1200, y: 270, r: 125 }, // frat house
      { x: 1370, y: 380, r: 95 }, // unit 2 dorm
      { x: 330, y: 535, r: 80 }, // food stalls (left)
      { x: 480, y: 565, r: 80 }, // food stalls (center)
      { x: 620, y: 600, r: 80 }, // food stalls (right)
      { x: 950, y: 610, r: 50 }, // bear statue
      { x: 745, y: 740, r: 28 }, // GO BEARS arch pillar
      { x: 915, y: 755, r: 28 }, // GO BEARS arch pillar
      { x: 1060, y: 535, r: 70 }, // club fair tent
      { x: 60, y: 430, r: 35 }, // sather gate pillar
      { x: 235, y: 350, r: 35 }, // sather gate pillar
      { x: 1165, y: 860, r: 45 }, // locked gate bars
    ],
  },
];

export type Bridge = {
  textureKey: string;
  url: string;
  /** world position of the sprite's top-left corner — THE ONLY VALUE YOU CHANGE TO MOVE A BRIDGE */
  wx: number;
  wy: number;
  /**
   * Walkable deck centerline, measured in the sprite's OWN pixels (offset from
   * its top-left). These are fixed properties of the art — leave them alone.
   * The world-space path is computed as (wx + deckX, wy + deckY), so it always
   * follows the bridge when you change wx/wy.
   */
  deckX1: number;
  deckY1: number;
  deckX2: number;
  deckY2: number;
  /** draw order; higher = on top. Default 8 (below islands' default 10). Raise
   *  above an island's depth to make the bridge sit ON TOP of it instead of
   *  tucking under its cliff. */
  depth?: number;
  /** tilt in degrees, + = clockwise, default 0. Pivots around the bridge's
   *  top-left (wx,wy) corner, so re-nudge wx,wy after rotating. The walkable
   *  deck path rotates with it automatically. */
  angle?: number;
};

/**
 * Painted bridge sprites (AI art, background removed, trimmed to content).
 * deck* offsets are the walkable deck endpoints within each sprite; the scene
 * adds wx/wy to get the world path, which tucks under the island cliffs so the
 * player crosses without a gap. To reposition a bridge, edit only wx/wy.
 */
export const bridges: Bridge[] = [
  {
    textureKey: "bridge-lodge-toga",
    url: "/game/islands/bridge-lodge-toga.png",
    wx: 1050,
    wy: 800,
    deckX1: 133,
    deckY1: 123,
    deckX2: 1180,
    deckY2: 686,
    depth: 11, // sit on top of the lodge (10) instead of tucking under it
    angle: 6,
  },
  {
    textureKey: "bridge-toga-campanile",
    url: "/game/islands/bridge-toga-campanile.png",
    wx: 3010,
    wy: 2140,
    deckX1: 92,
    deckY1: 148,
    deckX2: 1283,
    deckY2: 753,
    depth: 13,
    angle: 3,
  },
];

export const BRIDGE_HALF_WIDTH = 75;

export const SPAWN = { x: 730, y: 530 };

/** World auto-fits the furthest-out piece so dragging an island/bridge never
 *  clips it. ISLAND_W/H bounds the rightmost/lowest piece; 200 is breathing room. */
const farthestX = Math.max(...islands.map((i) => i.wx), ...bridges.map((b) => b.wx));
const farthestY = Math.max(...islands.map((i) => i.wy), ...bridges.map((b) => b.wy));
export const WORLD_W = farthestX + ISLAND_W + 200;
export const WORLD_H = farthestY + ISLAND_H + 200;
