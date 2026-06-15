import * as Phaser from "phaser";
import {
  islands,
  bridges,
  SPAWN,
  WORLD_W,
  WORLD_H,
  BRIDGE_HALF_WIDTH,
  type IslandDef,
} from "./islands";
import { landmarks, type ZoneId } from "../../../data/journey";

const SPEED = 380;
const PLAYER_SCALE = 0.4;
/** sprite sheet: 3 cols x 4 rows; rows: 0 down, 1 left, 2 left-alt, 3 up */
const FRAME_W = 199;
const FRAME_H = 333;

export type TouchState = { up: boolean; down: boolean; left: boolean; right: boolean };

type Dir = "up" | "down" | "left" | "right";

export class IslandScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private dialogOpen = true; // blocked until the intro overlay is dismissed
  private lastZone = "";
  private nearHotspot: { landmarkId: string } | null = null;
  private prompt!: Phaser.GameObjects.Text;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<string, Phaser.Input.Keyboard.Key>;
  private touch: TouchState = { up: false, down: false, left: false, right: false };
  private facing: Dir = "up";
  private fontFamily = "monospace";
  private night = true;
  private clouds: Phaser.GameObjects.Image[] = [];
  private rulerMode = false;

  constructor() {
    super("islands");
  }

  preload() {
    for (const isle of islands) this.load.image(isle.textureKey, isle.url);
    for (const b of bridges) this.load.image(b.textureKey, b.url);
    this.load.spritesheet("player", "/game/islands/player-sheet.png", {
      frameWidth: FRAME_W,
      frameHeight: FRAME_H,
    });
  }

  create() {
    /* pixel font loaded by the page; read its resolved family name off the canvas parent */
    const host = this.game.canvas.parentElement;
    if (host) this.fontFamily = getComputedStyle(host).fontFamily || "monospace";

    const skyQ = new URLSearchParams(window.location.search).get("sky");
    const hour = new Date().getHours();
    this.night = skyQ === "night" || (skyQ !== "day" && (hour < 7 || hour >= 19));
    this.cameras.main.setBackgroundColor(this.night ? "#0a0a1a" : "#9ccaef");
    if (this.night) this.makeStarfield();
    else this.makeClouds();
    this.makeBridges();

    /* islands */
    for (const isle of islands) {
      this.add.image(isle.wx, isle.wy, isle.textureKey).setOrigin(0, 0).setDepth(isle.depth ?? 10);
    }

    /* floating labels + hotspot markers */
    for (const isle of islands) {
      for (const spot of isle.hotspots) {
        const lm = landmarks[spot.landmarkId];
        if (!lm) continue;
        const lx = isle.wx + (spot.labelX ?? spot.x);
        const ly = isle.wy + (spot.labelY ?? spot.y - spot.r) - 26;
        const label = this.add
          .text(lx, ly, lm.label, {
            fontFamily: this.fontFamily,
            fontSize: "13px",
            color: "#ffffff",
            backgroundColor: "#10182acc",
            padding: { x: 8, y: 5 },
            align: "center",
          })
          .setOrigin(0.5, 1)
          .setDepth(40);
        this.tweens.add({
          targets: label,
          y: ly - 8,
          duration: 1400,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
        });
      }
    }

    /* player */
    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("player", { frames: [0, 1, 2, 1] }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("player", { frames: [3, 4, 5, 4] }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("player", { frames: [9, 10, 11, 10] }),
      frameRate: 8,
      repeat: -1,
    });
    this.player = this.add
      .sprite(SPAWN.x, SPAWN.y, "player", 1)
      .setOrigin(0.5, 0.92)
      .setScale(PLAYER_SCALE)
      .setDepth(30);

    /* interact prompt */
    this.prompt = this.add
      .text(0, 0, "[SPACE] interact", {
        fontFamily: this.fontFamily,
        fontSize: "11px",
        color: "#ffe27a",
        backgroundColor: "#10182ae6",
        padding: { x: 7, y: 4 },
      })
      .setOrigin(0.5, 0)
      .setDepth(50)
      .setVisible(false);

    /* input */
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys("W,A,S,D") as Record<
      string,
      Phaser.Input.Keyboard.Key
    >;
    this.input.keyboard!.on("keydown", (ev: KeyboardEvent) => {
      if (this.dialogOpen) return;
      if (["Space", "Enter", "KeyE"].includes(ev.code)) {
        ev.preventDefault();
        this.tryInteract();
      }
    });

    const onTouch = (ev: Event) => {
      this.touch = (ev as CustomEvent<TouchState>).detail;
    };
    const onAction = () => {
      if (!this.dialogOpen) this.tryInteract();
    };
    const onDialogClosed = () => {
      this.dialogOpen = false;
    };
    window.addEventListener("journey:touch", onTouch);
    window.addEventListener("journey:action", onAction);
    window.addEventListener("journey:dialog-closed", onDialogClosed);
    window.addEventListener("journey:intro-done", onDialogClosed);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      window.removeEventListener("journey:touch", onTouch);
      window.removeEventListener("journey:action", onAction);
      window.removeEventListener("journey:dialog-closed", onDialogClosed);
      window.removeEventListener("journey:intro-done", onDialogClosed);
    });

    /* dev override: /journey?spawn=x,y&intro=0 */
    const qs = new URLSearchParams(window.location.search);
    if (qs.get("intro") === "0") this.dialogOpen = false;
    const spawnQ = qs.get("spawn");
    if (spawnQ) {
      const [sx, sy] = spawnQ.split(",").map(Number);
      if (Number.isFinite(sx) && Number.isFinite(sy)) this.player.setPosition(sx, sy);
    }

    /* camera */
    this.cameras.main.setBounds(-300, -300, WORLD_W + 600, WORLD_H + 600);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(this.targetZoom());
    this.announceZone();

    /* dev layout ruler: /journey?ruler=1 */
    if (qs.get("ruler") === "1") this.enableRuler();
  }

  /* ── dev ruler (?ruler=1): grid + live cursor coords + per-piece wx,wy ── */
  private enableRuler() {
    this.rulerMode = true;
    this.dialogOpen = false;
    this.player.setVisible(false);

    const cam = this.cameras.main;
    cam.stopFollow();
    const fit = Math.min(this.scale.width / WORLD_W, this.scale.height / WORLD_H) * 0.95;
    cam.setZoom(fit);
    cam.centerOn(WORLD_W / 2, WORLD_H / 2);

    /* grid: thin lines every 100px, brighter every 500px */
    const g = this.add.graphics().setDepth(45);
    g.lineStyle(1, 0xffffff, 0.16);
    for (let x = 0; x <= WORLD_W; x += 100) g.lineBetween(x, 0, x, WORLD_H);
    for (let y = 0; y <= WORLD_H; y += 100) g.lineBetween(0, y, WORLD_W, y);
    g.lineStyle(2, 0x66ddff, 0.45);
    for (let x = 0; x <= WORLD_W; x += 500) g.lineBetween(x, 0, x, WORLD_H);
    for (let y = 0; y <= WORLD_H; y += 500) g.lineBetween(0, y, WORLD_W, y);
    for (let x = 0; x <= WORLD_W; x += 500)
      for (let y = 0; y <= WORLD_H; y += 500)
        this.add
          .text(x + 3, y + 2, `${x},${y}`, {
            fontFamily: this.fontFamily,
            fontSize: "12px",
            color: "#66ddff",
          })
          .setDepth(45)
          .setAlpha(0.7);

    /* per-piece label at each top-left corner */
    const tag = (wx: number, wy: number, name: string) =>
      this.add
        .text(wx + 4, wy + 4, `${name}\nwx:${wx} wy:${wy}`, {
          fontFamily: this.fontFamily,
          fontSize: "15px",
          color: "#ffe27a",
          backgroundColor: "#000000cc",
          padding: { x: 5, y: 3 },
        })
        .setDepth(60);
    for (const isle of islands) tag(isle.wx, isle.wy, isle.id);
    for (const b of bridges) tag(b.wx, b.wy, b.textureKey);

    /* interaction zones (green) + collision walls (red), so barriers are editable by eye */
    const zg = this.add.graphics().setDepth(46);
    for (const isle of islands) {
      zg.lineStyle(3, 0xff4444, 0.85);
      for (const cc of isle.colliders) zg.strokeCircle(isle.wx + cc.x, isle.wy + cc.y, cc.r);
      zg.lineStyle(3, 0x44ff88, 0.85);
      for (const hh of isle.hotspots) zg.strokeCircle(isle.wx + hh.x, isle.wy + hh.y, hh.r);
    }

    /* HUD: live cursor world coords + controls help (pinned to camera) */
    const hud = this.add
      .text(8, 8, "cursor world  x: -   y: -", {
        fontFamily: this.fontFamily,
        fontSize: "16px",
        color: "#ffffff",
        backgroundColor: "#000000cc",
        padding: { x: 8, y: 6 },
      })
      .setScrollFactor(0)
      .setDepth(999);
    this.add
      .text(8, 44, "drag=pan · arrows=scroll · wheel=zoom · green=interact zone · red=wall", {
        fontFamily: this.fontFamily,
        fontSize: "12px",
        color: "#aaccff",
        backgroundColor: "#000000aa",
        padding: { x: 6, y: 4 },
      })
      .setScrollFactor(0)
      .setDepth(999);

    this.input.on("pointermove", (p: Phaser.Input.Pointer) => {
      hud.setText(`cursor world  x: ${Math.round(p.worldX)}   y: ${Math.round(p.worldY)}`);
      if (p.isDown) {
        cam.scrollX -= (p.x - p.prevPosition.x) / cam.zoom;
        cam.scrollY -= (p.y - p.prevPosition.y) / cam.zoom;
      }
    });
    this.input.on("wheel", (_p: Phaser.Input.Pointer, _o: unknown, _dx: number, dy: number) => {
      cam.setZoom(Phaser.Math.Clamp(cam.zoom * (dy > 0 ? 0.9 : 1.1), 0.05, 2));
    });
  }

  /* ── world dressing ── */

  private makeStarfield() {
    const g = this.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(0x0a0a1a, 1).fillRect(0, 0, 512, 512);
    let seed = 12345;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 90; i++) {
      const alpha = 0.25 + rnd() * 0.5;
      g.fillStyle(0xffffff, alpha).fillRect(rnd() * 512, rnd() * 512, 2, 2);
    }
    g.generateTexture("stars", 512, 512);
    g.destroy();
    this.add
      .tileSprite(WORLD_W / 2, WORLD_H / 2, WORLD_W + 2000, WORLD_H + 2000, "stars")
      .setDepth(0)
      .setScrollFactor(0.35);
  }

  private makeClouds() {
    const g = this.make.graphics({ x: 0, y: 0 }, false);
    const blobs: [number, number, number, number][] = [
      [70, 70, 60, 28],
      [130, 60, 75, 32],
      [190, 72, 55, 26],
      [110, 84, 90, 24],
    ];
    for (const [cx, cy, rx, ry] of blobs) {
      g.fillStyle(0xffffff, 0.35).fillEllipse(cx, cy + 4, rx * 2.2, ry * 2.2);
      g.fillStyle(0xffffff, 0.85).fillEllipse(cx, cy, rx * 2, ry * 2);
    }
    g.generateTexture("cloud", 280, 130);
    g.destroy();

    let seed = 4242;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 9; i++) {
      const c = this.add
        .image(rnd() * WORLD_W, rnd() * WORLD_H, "cloud")
        .setScale(1.2 + rnd() * 2)
        .setAlpha(0.5 + rnd() * 0.35)
        .setDepth(2)
        .setScrollFactor(0.45);
      c.setData("speed", 12 + rnd() * 22);
      this.clouds.push(c);
    }
  }

  private makeBridges() {
    /* painted bridge sprites; islands draw on top so the deck ends tuck under the cliffs */
    for (const b of bridges) {
      this.add
        .image(b.wx, b.wy, b.textureKey)
        .setOrigin(0, 0)
        .setAngle(b.angle ?? 0)
        .setDepth(b.depth ?? 8);
    }
  }

  /* ── helpers ── */

  private islandAt(x: number, y: number): IslandDef | null {
    for (const isle of islands) {
      const lx = x - isle.wx;
      const ly = y - isle.wy;
      if (lx < 0 || ly < 0 || lx >= 1448 || ly >= 1086) continue;
      if (this.textures.getPixelAlpha(Math.floor(lx), Math.floor(ly), isle.textureKey) > 60) {
        return isle;
      }
    }
    return null;
  }

  private onBridge(x: number, y: number): boolean {
    for (const b of bridges) {
      /* deck endpoints are stored sprite-local, rotated by the bridge's angle
         around its (wx,wy) pivot, so the world path follows wx/wy AND angle */
      const a = Phaser.Math.DegToRad(b.angle ?? 0);
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      const ax = b.wx + b.deckX1 * cos - b.deckY1 * sin;
      const ay = b.wy + b.deckX1 * sin + b.deckY1 * cos;
      const bx = b.wx + b.deckX2 * cos - b.deckY2 * sin;
      const by = b.wy + b.deckX2 * sin + b.deckY2 * cos;
      const dx = bx - ax;
      const dy = by - ay;
      const len2 = dx * dx + dy * dy;
      const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / len2));
      const px = ax + dx * t;
      const py = ay + dy * t;
      if (Math.hypot(x - px, y - py) <= BRIDGE_HALF_WIDTH) return true;
    }
    return false;
  }

  /** a single point is walkable if it's on solid island ground or a bridge */
  private pointWalkable(x: number, y: number): boolean {
    const isle = this.islandAt(x, y);
    if (isle) {
      const lx = x - isle.wx;
      const ly = y - isle.wy;
      for (const c of isle.colliders) {
        if (Math.hypot(lx - c.x, ly - c.y) < c.r) return false;
      }
      return true;
    }
    return this.onBridge(x, y);
  }

  /** feet must be supported at several sample points so the player can't hang off cliffs */
  private canWalk(x: number, y: number): boolean {
    return (
      this.pointWalkable(x, y) &&
      this.pointWalkable(x - 16, y) &&
      this.pointWalkable(x + 16, y) &&
      this.pointWalkable(x, y - 10) &&
      this.pointWalkable(x, y + 8)
    );
  }

  private targetZoom(): number {
    const p = Phaser.Math.Clamp(this.player.x / WORLD_W, 0, 1);
    return 0.78 + p * 0.42;
  }

  private currentZone(): ZoneId {
    let best: ZoneId = "lodge";
    let bestD = Infinity;
    for (const isle of islands) {
      const cx = isle.wx + 724;
      const cy = isle.wy + 543;
      const d = Math.hypot(this.player.x - cx, this.player.y - cy);
      if (d < bestD) {
        bestD = d;
        best = isle.id;
      }
    }
    return best;
  }

  private announceZone() {
    const zone = this.currentZone();
    if (zone !== this.lastZone) {
      this.lastZone = zone;
      window.dispatchEvent(new CustomEvent("journey:zone", { detail: zone }));
    }
  }

  private findHotspot(): { landmarkId: string } | null {
    for (const isle of islands) {
      const lx = this.player.x - isle.wx;
      const ly = this.player.y - isle.wy;
      for (const spot of isle.hotspots) {
        if (Math.hypot(lx - spot.x, ly - spot.y) <= spot.r) {
          return { landmarkId: spot.landmarkId };
        }
      }
    }
    return null;
  }

  private tryInteract() {
    if (!this.nearHotspot) return;
    const lm = landmarks[this.nearHotspot.landmarkId];
    if (!lm) return;
    this.dialogOpen = true;
    window.dispatchEvent(new CustomEvent("journey:dialogue", { detail: lm }));
  }

  /* ── loop ── */

  update(_t: number, dtMs: number) {
    if (this.rulerMode) {
      const c = this.cameras.main;
      const sp = (520 * dtMs) / 1000 / c.zoom;
      if (this.cursors.left.isDown) c.scrollX -= sp;
      if (this.cursors.right.isDown) c.scrollX += sp;
      if (this.cursors.up.isDown) c.scrollY -= sp;
      if (this.cursors.down.isDown) c.scrollY += sp;
      return;
    }
    const cam = this.cameras.main;
    cam.setZoom(Phaser.Math.Linear(cam.zoom, this.targetZoom(), 0.03));

    for (const c of this.clouds) {
      c.x += (c.getData("speed") as number) * (dtMs / 1000);
      if (c.x > WORLD_W + 500) c.x = -500;
    }

    if (this.dialogOpen) {
      this.player.anims.stop();
      return;
    }

    const dt = dtMs / 1000;
    let vx = 0;
    let vy = 0;
    if (this.cursors.up.isDown || this.wasd.W.isDown || this.touch.up) vy -= 1;
    if (this.cursors.down.isDown || this.wasd.S.isDown || this.touch.down) vy += 1;
    if (this.cursors.left.isDown || this.wasd.A.isDown || this.touch.left) vx -= 1;
    if (this.cursors.right.isDown || this.wasd.D.isDown || this.touch.right) vx += 1;

    if (vx !== 0 || vy !== 0) {
      const inv = 1 / Math.hypot(vx, vy);
      const nx = this.player.x + vx * inv * SPEED * dt;
      const ny = this.player.y + vy * inv * SPEED * dt;
      /* try full move, then axis-separated slides */
      if (this.canWalk(nx, ny)) {
        this.player.setPosition(nx, ny);
      } else if (this.canWalk(nx, this.player.y)) {
        this.player.setX(nx);
      } else if (this.canWalk(this.player.x, ny)) {
        this.player.setY(ny);
      }

      /* facing + animation (right = mirrored left) */
      const dir: Dir =
        Math.abs(vx) >= Math.abs(vy) ? (vx > 0 ? "right" : "left") : vy > 0 ? "down" : "up";
      this.facing = dir;
      this.player.setFlipX(dir === "right");
      this.player.anims.play(
        dir === "up" ? "walk-up" : dir === "down" ? "walk-down" : "walk-left",
        true
      );
      this.player.setDepth(30);
      this.announceZone();
    } else {
      this.player.anims.stop();
      this.player.setFrame(this.facing === "up" ? 10 : this.facing === "down" ? 1 : 4);
    }

    /* hotspot proximity prompt */
    this.nearHotspot = this.findHotspot();
    if (this.nearHotspot) {
      this.prompt.setVisible(true);
      this.prompt.setPosition(this.player.x, this.player.y + 16);
    } else {
      this.prompt.setVisible(false);
    }
  }
}
