/** Isometric grid constants and projection */
export const TILE_W = 64;
export const TILE_H = 32;
export const HALF_W = TILE_W / 2;
export const HALF_H = TILE_H / 2;
/** Visual height of one stacked wall cube (for second stories / roofs) */
export const CUBE_H = 48;

export const GRID = 64;

/** Screen position of a tile's bottom diamond vertex (sprite anchor point) */
export function isoX(gx: number, gy: number): number {
  return (gx - gy) * HALF_W;
}
export function isoY(gx: number, gy: number): number {
  return (gx + gy) * HALF_H + TILE_H;
}

/** Depth so nearer (higher gx+gy) tiles render on top */
export function isoDepth(gx: number, gy: number): number {
  return (gx + gy) * 10;
}

export type Dir = "up" | "down" | "left" | "right";

/** Grid delta for a facing direction (screen: up = NE, down = SW, left = NW, right = SE) */
export const DIR_DELTA: Record<Dir, [number, number]> = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};

export const key = (gx: number, gy: number) => `${gx},${gy}`;
