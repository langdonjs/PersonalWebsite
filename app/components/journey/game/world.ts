import { GRID, key } from "./iso";
import { GRASS_POOL } from "./frames";
import type { ZoneId } from "../../../data/journey";

export type Prop = {
  frame: string;
  gx: number;
  gy: number;
  /** extra y offset upward (e.g. roofs on cubes) */
  lift?: number;
  /** added to iso depth so stacked pieces sort above their base */
  depthBias?: number;
};

export type Entity = {
  kind: "sign" | "npc";
  /** generated texture key for NPCs */
  npcKey?: string;
  gx: number;
  gy: number;
  landmarkId: string;
};

export type World = {
  ground: string[][];
  props: Prop[];
  entities: Entity[];
  blocked: Set<string>;
  spawn: { gx: number; gy: number };
};

/** Zone from diagonal position (gx - gy) */
export function zoneAt(gx: number, gy: number): ZoneId {
  const s = gx - gy;
  if (s < -17) return "lodge";
  if (s <= 18) return "toga";
  return "bear";
}

/** Deterministic pseudo-random for stable terrain */
function rand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

export function buildWorld(): World {
  const rnd = rand(20260611);
  const ground: string[][] = [];
  const props: Prop[] = [];
  const entities: Entity[] = [];
  const blocked = new Set<string>();

  /* terrain: grass everywhere */
  for (let gy = 0; gy < GRID; gy++) {
    ground.push([]);
    for (let gx = 0; gx < GRID; gx++) {
      ground[gy].push(GRASS_POOL[Math.floor(rnd() * GRASS_POOL.length)]);
    }
  }

  const setGround = (gx: number, gy: number, frame: string) => {
    if (gx >= 0 && gx < GRID && gy >= 0 && gy < GRID) ground[gy][gx] = frame;
  };
  const block = (gx: number, gy: number) => blocked.add(key(gx, gy));
  const prop = (p: Prop, blocking = true) => {
    props.push(p);
    if (blocking) block(p.gx, p.gy);
  };

  /* ── the diagonal path (2 wide, staircase from bottom-left to top-right) ── */
  const waypoints: [number, number][] = [
    [7, 55],
    [13, 49],
    [19, 45],
    [25, 39],
    [31, 33],
    [37, 27],
    [43, 21],
    [49, 15],
    [55, 9],
  ];
  const carve = (x: number, y: number) => {
    setGround(x, y, "dirt");
    setGround(x + 1, y, "dirt");
  };
  for (let i = 0; i < waypoints.length - 1; i++) {
    let [x, y] = waypoints[i];
    const [tx, ty] = waypoints[i + 1];
    while (x !== tx || y !== ty) {
      carve(x, y);
      if (x !== tx) x += Math.sign(tx - x);
      else y += Math.sign(ty - y);
    }
    carve(tx, ty);
  }

  /* ── helpers ── */
  const house = (gx: number, gy: number, walls: string[]) => {
    walls.forEach((frame, i) => {
      prop({ frame, gx: gx + i, gy });
      prop(
        { frame: "roofPyramid", gx: gx + i, gy, lift: 32, depthBias: 5 },
        false
      );
    });
  };
  const tower = (gx: number, gy: number) => {
    prop({ frame: "stoneTall", gx, gy });
    prop({ frame: "roofPyramid", gx, gy, lift: 96, depthBias: 5 }, false);
  };
  const sign = (gx: number, gy: number, landmarkId: string) => {
    entities.push({ kind: "sign", gx, gy, landmarkId });
    block(gx, gy);
  };
  const npc = (gx: number, gy: number, npcKey: string, landmarkId: string) => {
    entities.push({ kind: "npc", npcKey, gx, gy, landmarkId });
    block(gx, gy);
  };

  /* ════ ZONE 1: LANGDON'S LODGE (bottom-left) ════ */
  // family house + parents outside
  house(5, 48, ["doorWall", "windowWall"]);
  npc(6, 50, "npcMom", "home");
  npc(5, 50, "npcDad", "home");

  // sports field: clear green patch with 4 corner signs
  for (let x = 13; x <= 19; x++)
    for (let y = 52; y <= 57; y++) setGround(x, y, "grass3");
  sign(13, 52, "sportsField");
  sign(19, 52, "sportsField");
  sign(13, 57, "sportsField");
  sign(19, 57, "sportsField");

  // minecraft cave: rock cluster, blocked entrance
  prop({ frame: "rockMid", gx: 4, gy: 43 });
  prop({ frame: "rockSmall", gx: 5, gy: 43 });
  prop({ frame: "rockSmall", gx: 4, gy: 44 });
  sign(5, 45, "minecraftCave");

  // pokemon corner: TV (table prop) + sign
  prop({ frame: "table", gx: 11, gy: 44 });
  sign(12, 44, "pokemonTv");

  // manga library
  house(16, 42, ["windowWall", "doorWall"]);
  sign(17, 43, "mangaLibrary");

  // town well + decoration
  prop({ frame: "well", gx: 10, gy: 51 });
  prop({ frame: "log", gx: 16, gy: 47 });
  prop({ frame: "bush", gx: 3, gy: 52 });
  prop({ frame: "bush", gx: 20, gy: 50 });

  // route 2 sign
  sign(21, 43, "route2");

  /* ════ ZONE 2: TOGA TOWN (middle) ════ */
  // MLS Next stadium: 3-wide stone building
  house(29, 30, ["windowWall", "doorWall", "windowWall"]);
  prop({ frame: "stoneCube", gx: 28, gy: 30 });
  prop({ frame: "stoneCube", gx: 32, gy: 30 });
  sign(30, 32, "mlsStadium");

  // golf green: tucked aside
  for (let x = 24; x <= 26; x++)
    for (let y = 28; y <= 30; y++) setGround(x, y, "grass3");
  sign(25, 29, "golfGreen");
  prop({ frame: "tallGrass", gx: 24, gy: 30 }, false);

  // k-pop dance studio
  house(36, 34, ["doorWall", "windowWall"]);
  sign(36, 35, "danceStudio");

  // student council hall + posters NPC
  house(27, 25, ["windowWall", "doorWall"]);
  npc(28, 26, "npcCouncil", "councilHall");

  // Korea ferry dock: lake + wooden dock + 10 friends
  for (let x = 36; x <= 41; x++)
    for (let y = 20; y <= 24; y++) {
      setGround(x, y, "water");
      block(x, y);
    }
  for (let x = 36; x <= 38; x++) {
    setGround(x, 22, "woodFloor");
    blocked.delete(key(x, 22));
  }
  sign(35, 23, "koreaDock");
  const friendSpots: [number, number][] = [
    [36, 21],
    [37, 21],
    [38, 21],
    [36, 23],
    [37, 23],
    [38, 23],
    [35, 21],
    [34, 22],
    [35, 24],
    [34, 24],
  ];
  friendSpots.forEach(([x, y]) => {
    blocked.delete(key(x, y));
    npc(x, y, "npcFriend", "koreaDock");
  });

  // route 3 sign
  sign(41, 25, "route3");

  /* ════ ZONE 3: BEAR TERRITORY (top-right) ════ */
  // Unit 2 dorm: tall tower
  tower(45, 17);
  tower(46, 17);
  sign(45, 18, "unit2");

  // Doe library: grand stone front
  house(48, 8, ["windowWall", "doorWall", "windowWall"]);
  prop({ frame: "stoneCube", gx: 47, gy: 8 });
  prop({ frame: "stoneCube", gx: 51, gy: 8 });
  sign(49, 10, "doeLibrary");

  // crossroads sign in the middle of town
  sign(51, 13, "crossroads");

  // katsu curry house: hut + outdoor table
  house(55, 12, ["doorWall"]);
  prop({ frame: "table", gx: 54, gy: 13 });
  sign(56, 13, "katsuCurry");

  // unfinished building at the very end of the path
  prop({ frame: "wallCube", gx: 56, gy: 7 });
  prop({ frame: "wallCube", gx: 57, gy: 7 });
  prop({ frame: "rockSmall", gx: 58, gy: 8 });
  prop({ frame: "log", gx: 56, gy: 9 });
  sign(56, 8, "unfinished");

  /* ── scenery: tree borders + scatter ── */
  const treePool = ["pine", "pineSmall", "bigTree", "deadTree"];
  const inPlayArea = (x: number, y: number) => {
    const s = x - y;
    const d = x + y;
    return s > -56 && s < 56 && d > 8 && d < 118;
  };
  const towns: [number, number, number, number][] = [
    [4, 40, 22, 58], // lodge
    [24, 20, 42, 40], // toga
    [43, 5, 59, 22], // bear
  ];
  const inTown = (x: number, y: number) =>
    towns.some(([x1, y1, x2, y2]) => x >= x1 && x <= x2 && y >= y1 && y <= y2);
  const nearPath = (x: number, y: number) => {
    for (let dx = -1; dx <= 1; dx++)
      for (let dy = -1; dy <= 1; dy++) {
        const r = ground[y + dy]?.[x + dx];
        if (r === "dirt") return true;
      }
    return false;
  };
  for (let gy = 0; gy < GRID; gy++) {
    for (let gx = 0; gx < GRID; gx++) {
      if (ground[gy][gx] === "dirt" || ground[gy][gx] === "water") continue;
      if (blocked.has(key(gx, gy))) continue;
      const edge = gx < 2 || gy < 2 || gx > GRID - 3 || gy > GRID - 3 || !inPlayArea(gx, gy);
      const r = rnd();
      if (edge) {
        if (r < 0.55) prop({ frame: treePool[Math.floor(rnd() * 2)], gx, gy });
        continue;
      }
      if (nearPath(gx, gy)) continue;
      if (inTown(gx, gy)) {
        // towns stay open: light bushes and tall grass only
        if (r < 0.012) prop({ frame: "bush", gx, gy });
        else if (r < 0.035) prop({ frame: "tallGrass", gx, gy }, false);
        continue;
      }
      if (r < 0.03) prop({ frame: treePool[Math.floor(rnd() * treePool.length)], gx, gy });
      else if (r < 0.05) prop({ frame: "bush", gx, gy });
      else if (r < 0.08) prop({ frame: "tallGrass", gx, gy }, false);
      else if (r < 0.086) prop({ frame: "rockSmall", gx, gy });
    }
  }

  return { ground, props, entities, blocked, spawn: { gx: 8, gy: 53 } };
}
