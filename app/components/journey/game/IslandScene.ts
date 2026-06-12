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
const PLAYER_SCALE = 0.62;
/** sprite sheet: 3 cols x 4 rows; rows: 0 down, 1 left, 2 left-alt, 3 up */
const FRAME_W = 160;
const FRAME_H = 200;

export type TouchState = { up: boolean; down: boolean; left: boolean; right: boolean };

type Dir = "up" | "down" | "left" | "right";

export class IslandScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private dialogOpen = false;
  private lastZone = "";
  private nearHotspot: { landmarkId: string } | null = null;
  private prompt!: Phaser.GameObjects.Text;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<string, Phaser.Input.Keyboard.Key>;
  private touch: TouchState = { up: false, down: false, left: false, right: false };
  private facing: Dir = "up";
  private fontFamily = "monospace";

  constructor() {
    super("islands");
  }

  preload() {
    for (const isle of islands) this.load.image(isle.textureKey, isle.url);
    this.load.spritesheet("player", "/game/islands/player-sheet.png", {
      frameWidth: FRAME_W,
      frameHeight: FRAME_H,
    });
  }

  create() {
    /* pixel font loaded by the page; read its resolved family name off the canvas parent */
    const host = this.game.canvas.parentElement;
    if (host) this.fontFamily = getComputedStyle(host).fontFamily || "monospace";

    this.cameras.main.setBackgroundColor("#0a0a1a");
    this.makeStarfield();
    this.makeBridges();

    /* islands */
    for (const isle of islands) {
      this.add.image(isle.wx, isle.wy, isle.textureKey).setOrigin(0, 0).setDepth(10);
    }

    /* floating labels + hotspot markers */
    for (const isle of islands) {
      for (const spot of isle.hotspots) {
        const lm = landmarks[spot.landmarkId];
        if (!lm) continue;
        const lx = isle.wx + spot.x;
        const ly = isle.wy + spot.y;
        const label = this.add
          .text(lx, ly - spot.r - 26, lm.label, {
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
          y: ly - spot.r - 34,
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
      .text(0, 0, "[A] interact", {
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
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      window.removeEventListener("journey:touch", onTouch);
      window.removeEventListener("journey:action", onAction);
      window.removeEventListener("journey:dialog-closed", onDialogClosed);
    });

    /* dev override: /journey?spawn=x,y */
    const qs = new URLSearchParams(window.location.search);
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

  private makeBridges() {
    /* plank texture */
    const g = this.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(0x6b4a2a, 1).fillRoundedRect(0, 2, 26, 108, 5);
    g.fillStyle(0x8a6a3a, 1).fillRoundedRect(2, 4, 22, 104, 4);
    g.lineStyle(3, 0x4a3018, 1).strokeRoundedRect(1, 3, 24, 106, 5);
    g.generateTexture("plank", 26, 112);
    g.destroy();

    for (const b of bridges) {
      const dx = b.x2 - b.x1;
      const dy = b.y2 - b.y1;
      const len = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const step = 30;
      for (let d = 0; d <= len; d += step) {
        const t = d / len;
        this.add
          .image(b.x1 + dx * t, b.y1 + dy * t, "plank")
          .setRotation(angle)
          .setDepth(5);
      }
      /* rope rails */
      const ropes = this.add.graphics().setDepth(6);
      const nx = (-dy / len) * (BRIDGE_HALF_WIDTH - 8);
      const ny = (dx / len) * (BRIDGE_HALF_WIDTH - 8);
      ropes.lineStyle(5, 0x3a2a14, 1);
      ropes.lineBetween(b.x1 + nx, b.y1 + ny, b.x2 + nx, b.y2 + ny);
      ropes.lineBetween(b.x1 - nx, b.y1 - ny, b.x2 - nx, b.y2 - ny);
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
      const dx = b.x2 - b.x1;
      const dy = b.y2 - b.y1;
      const len2 = dx * dx + dy * dy;
      const t = Math.max(0, Math.min(1, ((x - b.x1) * dx + (y - b.y1) * dy) / len2));
      const px = b.x1 + dx * t;
      const py = b.y1 + dy * t;
      if (Math.hypot(x - px, y - py) <= BRIDGE_HALF_WIDTH) return true;
    }
    return false;
  }

  private canWalk(x: number, y: number): boolean {
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
    const cam = this.cameras.main;
    cam.setZoom(Phaser.Math.Linear(cam.zoom, this.targetZoom(), 0.03));

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
