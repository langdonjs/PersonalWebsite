import * as Phaser from "phaser";
import { FRAMES } from "./frames";
import { isoX, isoY, isoDepth, key, DIR_DELTA, type Dir } from "./iso";
import { buildWorld, zoneAt, type World } from "./world";
import { registerGeneratedTextures } from "./gen";
import { landmarks } from "../../../data/journey";

const MOVE_MS = 170;
const ZOOM_MIN = 0.8;
const ZOOM_MAX = 1.4;

const DIR_FRAME: Record<Dir, number> = { down: 0, up: 1, left: 2, right: 3 };

/** Touch input state shared with the React D-pad */
export type TouchState = { up: boolean; down: boolean; left: boolean; right: boolean };

export class WorldScene extends Phaser.Scene {
  private world!: World;
  private player!: Phaser.GameObjects.Sprite;
  private pgx = 0;
  private pgy = 0;
  private facing: Dir = "up";
  private moving = false;
  private stepFrame = 0;
  private dialogOpen = false;
  private lastZone = "";
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<string, Phaser.Input.Keyboard.Key>;
  private entityAt = new Map<string, string>(); // tile key -> landmarkId
  private touch: TouchState = { up: false, down: false, left: false, right: false };
  private zoomLock: number | null = null;

  constructor() {
    super("world");
  }

  preload() {
    this.load.image("outside", "/game/iso-outside.png");
    this.load.image("building", "/game/iso-building.png");
  }

  create() {
    /* register sheet frames */
    for (const [name, f] of Object.entries(FRAMES)) {
      this.textures.get(f.sheet).add(name, 0, f.x, f.y, f.w, f.h);
    }
    registerGeneratedTextures(this);

    this.world = buildWorld();
    const { ground, props, entities, spawn } = this.world;

    /* dev override: /journey?spawn=31,33&zoom=1.2 */
    const qs = new URLSearchParams(window.location.search);
    const spawnQ = qs.get("spawn");
    if (spawnQ) {
      const [sx, sy] = spawnQ.split(",").map(Number);
      if (Number.isFinite(sx) && Number.isFinite(sy)) {
        spawn.gx = sx;
        spawn.gy = sy;
      }
    }
    const zoomQ = qs.get("zoom");
    this.zoomLock = zoomQ ? Number(zoomQ) : null;

    /* ground layer */
    for (let gy = 0; gy < ground.length; gy++) {
      for (let gx = 0; gx < ground[gy].length; gx++) {
        const frame = ground[gy][gx];
        const sheet = FRAMES[frame].sheet;
        this.add
          .image(isoX(gx, gy), isoY(gx, gy), sheet, frame)
          .setOrigin(0.5, 1)
          .setDepth(isoDepth(gx, gy) - 5000);
      }
    }

    /* props */
    for (const p of props) {
      const f = FRAMES[p.frame];
      this.add
        .image(isoX(p.gx, p.gy), isoY(p.gx, p.gy) - (p.lift ?? 0), f.sheet, p.frame)
        .setOrigin(0.5, 1)
        .setDepth(isoDepth(p.gx, p.gy) + (p.depthBias ?? 0));
    }

    /* entities (signs + NPCs) */
    for (const e of entities) {
      this.entityAt.set(key(e.gx, e.gy), e.landmarkId);
      if (e.kind === "sign") {
        this.add
          .image(isoX(e.gx, e.gy), isoY(e.gx, e.gy) - 2, "sign")
          .setOrigin(0.5, 1)
          .setScale(2)
          .setDepth(isoDepth(e.gx, e.gy) + 1);
      } else {
        this.add
          .sprite(isoX(e.gx, e.gy), isoY(e.gx, e.gy) - 4, e.npcKey!, `${e.npcKey}-0-0`)
          .setOrigin(0.5, 1)
          .setScale(2)
          .setDepth(isoDepth(e.gx, e.gy) + 1);
      }
    }

    /* player */
    this.pgx = spawn.gx;
    this.pgy = spawn.gy;
    this.player = this.add
      .sprite(isoX(this.pgx, this.pgy), isoY(this.pgx, this.pgy) - 4, "player", "player-1-0")
      .setOrigin(0.5, 1)
      .setScale(2)
      .setDepth(isoDepth(this.pgx, this.pgy) + 2);

    /* input */
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys("W,A,S,D") as Record<
      string,
      Phaser.Input.Keyboard.Key
    >;
    this.input.keyboard!.on("keydown", (ev: KeyboardEvent) => {
      if (this.dialogOpen) return;
      if (ev.code === "Space" || ev.code === "Enter" || ev.code === "KeyE") {
        ev.preventDefault();
        this.tryInteract();
      }
    });

    /* bridge events from React */
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

    /* camera */
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
    this.cameras.main.setZoom(this.targetZoom());
    this.cameras.main.setBackgroundColor("#7ec850");
    this.announceZone();
  }

  private targetZoom(): number {
    if (this.zoomLock) return this.zoomLock;
    const s = this.pgx - this.pgy;
    const p = Phaser.Math.Clamp((s + 50) / 100, 0, 1);
    return ZOOM_MIN + p * (ZOOM_MAX - ZOOM_MIN);
  }

  private announceZone() {
    const zone = zoneAt(this.pgx, this.pgy);
    if (zone !== this.lastZone) {
      this.lastZone = zone;
      window.dispatchEvent(new CustomEvent("journey:zone", { detail: zone }));
    }
  }

  private tryInteract() {
    const [dx, dy] = DIR_DELTA[this.facing];
    const id = this.entityAt.get(key(this.pgx + dx, this.pgy + dy));
    if (!id) return;
    const landmark = landmarks[id];
    if (!landmark) return;
    this.dialogOpen = true;
    window.dispatchEvent(new CustomEvent("journey:dialogue", { detail: landmark }));
  }

  private heldDir(): Dir | null {
    if (this.cursors.up.isDown || this.wasd.W.isDown || this.touch.up) return "up";
    if (this.cursors.down.isDown || this.wasd.S.isDown || this.touch.down) return "down";
    if (this.cursors.left.isDown || this.wasd.A.isDown || this.touch.left) return "left";
    if (this.cursors.right.isDown || this.wasd.D.isDown || this.touch.right) return "right";
    return null;
  }

  update() {
    /* smooth zoom toward target */
    const cam = this.cameras.main;
    cam.setZoom(Phaser.Math.Linear(cam.zoom, this.targetZoom(), 0.04));

    if (this.moving || this.dialogOpen) return;
    const dir = this.heldDir();
    if (!dir) {
      this.player.setFrame(`player-${DIR_FRAME[this.facing]}-0`);
      return;
    }

    this.facing = dir;
    const [dx, dy] = DIR_DELTA[dir];
    const nx = this.pgx + dx;
    const ny = this.pgy + dy;
    this.player.setFrame(`player-${DIR_FRAME[dir]}-${this.stepFrame}`);

    if (
      nx < 1 ||
      ny < 1 ||
      nx >= this.world.ground[0].length - 1 ||
      ny >= this.world.ground.length - 1 ||
      this.world.blocked.has(key(nx, ny))
    ) {
      return;
    }

    this.moving = true;
    this.stepFrame = 1 - this.stepFrame;
    this.pgx = nx;
    this.pgy = ny;
    this.tweens.add({
      targets: this.player,
      x: isoX(nx, ny),
      y: isoY(nx, ny) - 4,
      duration: MOVE_MS,
      onUpdate: () => this.player.setDepth(isoDepth(nx, ny) + 2),
      onComplete: () => {
        this.moving = false;
        this.announceZone();
      },
    });
  }
}
