/**
 * Frame rects inside the two Yar tilesheets (alpha-bbox verified).
 * All sprites anchor at (0.5, 1): the bottom vertex of their base diamond.
 * `wallH` = vertical wall height of a cube; a roof stacked on it lifts by wallH.
 */
export type FrameDef = {
  sheet: "outside" | "building";
  x: number;
  y: number;
  w: number;
  h: number;
  /** for cubes: how much they raise whatever stacks on top */
  wallH?: number;
};

export const FRAMES: Record<string, FrameDef> = {
  /* ground diamonds */
  grass1: { sheet: "outside", x: 0, y: 33, w: 64, h: 31 },
  grass2: { sheet: "outside", x: 64, y: 33, w: 64, h: 31 },
  grass3: { sheet: "outside", x: 128, y: 33, w: 64, h: 31 },
  grass4: { sheet: "outside", x: 192, y: 33, w: 64, h: 31 },
  dirt: { sheet: "outside", x: 384, y: 33, w: 64, h: 31 },
  grassB1: { sheet: "outside", x: 0, y: 97, w: 64, h: 31 },
  grassB2: { sheet: "outside", x: 64, y: 97, w: 64, h: 31 },
  water: { sheet: "outside", x: 384, y: 608, w: 64, h: 32 },

  /* props */
  tallGrass: { sheet: "outside", x: 0, y: 688, w: 64, h: 72 },
  bush: { sheet: "outside", x: 70, y: 784, w: 56, h: 43 },
  pine: { sheet: "outside", x: 128, y: 752, w: 80, h: 128 },
  pineSmall: { sheet: "outside", x: 201, y: 752, w: 71, h: 128 },
  bigTree: { sheet: "outside", x: 416, y: 872, w: 219, h: 145 },
  deadTree: { sheet: "outside", x: 280, y: 907, w: 136, h: 113 },
  rockSmall: { sheet: "outside", x: 0, y: 304, w: 64, h: 75 },
  rockMid: { sheet: "outside", x: 160, y: 304, w: 96, h: 78 },
  log: { sheet: "outside", x: 265, y: 798, w: 87, h: 26 },

  /* building blocks */
  wallCube: { sheet: "building", x: 0, y: 72, w: 64, h: 56, wallH: 24 },
  stoneCube: { sheet: "building", x: 0, y: 144, w: 64, h: 48, wallH: 16 },
  stoneTall: { sheet: "building", x: 512, y: 128, w: 64, h: 128, wallH: 96 },
  doorWall: { sheet: "building", x: 576, y: 192, w: 64, h: 64, wallH: 32 },
  windowWall: { sheet: "building", x: 64, y: 192, w: 64, h: 64, wallH: 32 },
  roofPyramid: { sheet: "building", x: 576, y: 0, w: 64, h: 128 },
  woodFloor: { sheet: "building", x: 128, y: 33, w: 64, h: 31 },
  well: { sheet: "building", x: 512, y: 344, w: 64, h: 40 },
  table: { sheet: "building", x: 64, y: 337, w: 64, h: 43 },
};

export const GRASS_POOL = ["grass2", "grass3", "grass4", "grassB1", "grassB2"];
