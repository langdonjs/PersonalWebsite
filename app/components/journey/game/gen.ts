/**
 * Runtime-generated pixel art: player, NPCs, wooden sign.
 * Drawn on canvas at 1x GBA-ish proportions, rendered in-game at 2x.
 */

type Palette = {
  skin: string;
  hair: string;
  shirt: string;
  pants: string;
};

export const PLAYER_PALETTE: Palette = {
  skin: "#e8b888",
  hair: "#1a1a1a",
  shirt: "#2563eb",
  pants: "#27272a",
};

const NPC_PALETTES: Record<string, Palette> = {
  npcMom: { skin: "#e8b888", hair: "#3a2a1a", shirt: "#b3306a", pants: "#444" },
  npcDad: { skin: "#d8a878", hair: "#111", shirt: "#1a7a4a", pants: "#333" },
  npcCouncil: { skin: "#e8c898", hair: "#5a3a1a", shirt: "#b38a1a", pants: "#374151" },
  npcFriend: { skin: "#e8b888", hair: "#222", shirt: "#6b21a8", pants: "#27272a" },
};

/**
 * Draws one 18x26 character frame.
 * dir: 0=down(SW) 1=up(NE) 2=left(NW) 3=right(SE); step: 0|1 walk frame
 */
function drawChar(
  ctx: CanvasRenderingContext2D,
  ox: number,
  oy: number,
  p: Palette,
  dir: number,
  step: number
) {
  const r = (x: number, y: number, w: number, h: number, c: string) => {
    ctx.fillStyle = c;
    ctx.fillRect(ox + x, oy + y, w, h);
  };
  const legShift = step === 1 ? 1 : 0;

  /* shadow */
  r(4, 24, 10, 2, "rgba(0,0,0,0.25)");
  /* legs */
  r(5, 19 + legShift, 3, 5 - legShift, p.pants);
  r(10, 19 + (1 - legShift), 3, 5 - (1 - legShift), p.pants);
  /* body */
  r(4, 12, 10, 8, p.shirt);
  /* arms */
  r(2, 13, 2, 6, p.shirt);
  r(14, 13, 2, 6, p.shirt);
  r(2, 18, 2, 2, p.skin);
  r(14, 18, 2, 2, p.skin);
  /* head */
  r(4, 3, 10, 9, p.skin);
  /* hair by direction */
  if (dir === 1) {
    r(4, 2, 10, 8, p.hair); // back of head
  } else {
    r(4, 2, 10, 4, p.hair);
    r(3, 4, 2, 4, p.hair);
    r(13, 4, 2, 4, p.hair);
    /* eyes */
    if (dir === 0) {
      r(6, 7, 2, 2, "#111");
      r(10, 7, 2, 2, "#111");
    } else if (dir === 2) {
      r(5, 7, 2, 2, "#111");
    } else {
      r(11, 7, 2, 2, "#111");
    }
  }
}

function makeCharCanvas(p: Palette): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 18 * 8;
  c.height = 26;
  const ctx = c.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;
  for (let dir = 0; dir < 4; dir++) {
    for (let step = 0; step < 2; step++) {
      drawChar(ctx, (dir * 2 + step) * 18, 0, p, dir, step);
    }
  }
  return c;
}

function makeSignCanvas(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 26;
  c.height = 26;
  const ctx = c.getContext("2d")!;
  const r = (x: number, y: number, w: number, h: number, col: string) => {
    ctx.fillStyle = col;
    ctx.fillRect(x, y, w, h);
  };
  r(11, 12, 4, 12, "#6b4a2a"); // post
  r(2, 2, 22, 12, "#8a6a3a"); // board
  r(3, 3, 20, 10, "#a8854a");
  r(5, 5, 16, 2, "#6b4a2a"); // text lines
  r(5, 9, 12, 2, "#6b4a2a");
  r(10, 24, 8, 2, "rgba(0,0,0,0.25)");
  return c;
}

/**
 * Registers generated textures with Phaser.
 * Character sheets get 8 frames named `${key}-${dir}-${step}`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerGeneratedTextures(scene: any) {
  const sheets: Record<string, Palette> = { player: PLAYER_PALETTE, ...NPC_PALETTES };
  for (const [name, palette] of Object.entries(sheets)) {
    const canvas = makeCharCanvas(palette);
    scene.textures.addCanvas(name, canvas);
    const tex = scene.textures.get(name);
    for (let dir = 0; dir < 4; dir++) {
      for (let step = 0; step < 2; step++) {
        tex.add(`${name}-${dir}-${step}`, 0, (dir * 2 + step) * 18, 0, 18, 26);
      }
    }
  }
  scene.textures.addCanvas("sign", makeSignCanvas());
}

export const NPC_KEYS = Object.keys(NPC_PALETTES);
