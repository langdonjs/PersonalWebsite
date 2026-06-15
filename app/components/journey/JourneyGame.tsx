"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Landmark } from "../../data/journey";
import { zoneNames, type ZoneId } from "../../data/journey";

type DialogState = {
  landmark: Landmark;
  line: number;
  photo: number;
};

const dpadDirs = [
  { id: "up", label: "▲", area: "u" },
  { id: "left", label: "◀", area: "l" },
  { id: "right", label: "▶", area: "r" },
  { id: "down", label: "▼", area: "d" },
] as const;

/* animated loading sprite: 11 poses of 220x360 in /game/loader-strip.png */
const LOADER_FRAMES = 11;
const LOADER_CELL_W = 220;
const LOADER_CELL_H = 360;

/* keyboard keycap, rendered in the pixel font of the page */
function Key({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <kbd
      className={`inline-flex h-9 items-center justify-center rounded-md border-2 border-[#1a1a1a] bg-[#f8f7f4] text-[10px] font-bold text-[#111] shadow-[0_3px_0_#1a1a1a] ${
        wide ? "px-3" : "w-9"
      }`}
    >
      {children}
    </kbd>
  );
}

function isNight(): boolean {
  if (typeof window === "undefined") return true;
  const skyQ = new URLSearchParams(window.location.search).get("sky");
  if (skyQ === "night") return true;
  if (skyQ === "day") return false;
  const hour = new Date().getHours();
  return hour < 7 || hour >= 19;
}

export default function JourneyGame() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [night] = useState(isNight);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gameRef = useRef<any>(null);
  const [zone, setZone] = useState<ZoneId>("lodge");
  /* dev: /journey?intro=0 skips the intro (screenshot testing) */
  const [intro, setIntro] = useState(
    () => typeof window === "undefined" || new URLSearchParams(window.location.search).get("intro") !== "0"
  );
  const introRef = useRef(true);
  introRef.current = intro;
  const [welcome, setWelcome] = useState<string | null>(null);
  const welcomeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* animated loading screen shown between START and the playable game */
  const [loading, setLoading] = useState(false);
  const [loadFrame, setLoadFrame] = useState(0);
  const [barFull, setBarFull] = useState(false);
  const [introFrame, setIntroFrame] = useState(0);
  const router = useRouter();
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const dialogRef = useRef<DialogState | null>(null);
  dialogRef.current = dialog;
  const touchRef = useRef({ up: false, down: false, left: false, right: false });

  /* boot phaser */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [Phaser, { IslandScene }] = await Promise.all([
        import("phaser"),
        import("./game/IslandScene"),
      ]);
      if (cancelled || !hostRef.current) return;
      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        parent: hostRef.current,
        backgroundColor: night ? "#0a0a1a" : "#9ccaef",
        pixelArt: false,
        /* the game has no sound; skip Phaser's WebAudio AudioContext entirely.
           Without this, remounts (Strict Mode / Fast Refresh / Exit) close the
           context and a later pauseOnBlur suspend() throws "Cannot suspend a
           closed AudioContext". */
        audio: { noAudio: true },
        scale: {
          mode: Phaser.Scale.RESIZE,
          width: "100%",
          height: "100%",
        },
        scene: [IslandScene],
      });
    })();
    return () => {
      cancelled = true;
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
    // night is stable for the session (decided once at mount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* START → show the animated loading screen; control passes to the game when it ends */
  const startGame = useCallback(() => {
    setIntro(false);
    setLoading(true);
  }, []);

  useEffect(() => {
    if (!loading) return;
    setBarFull(false);
    const grow = requestAnimationFrame(() => setBarFull(true));
    let i = 0;
    const anim = setInterval(() => {
      i = (i + 1) % LOADER_FRAMES;
      setLoadFrame(i);
    }, 130);
    const done = setTimeout(() => {
      setLoading(false);
      window.dispatchEvent(new Event("journey:intro-done"));
      setWelcome(zoneNames["lodge"]);
      if (welcomeTimer.current) clearTimeout(welcomeTimer.current);
      welcomeTimer.current = setTimeout(() => setWelcome(null), 2600);
    }, 1950);
    return () => {
      cancelAnimationFrame(grow);
      clearInterval(anim);
      clearTimeout(done);
    };
  }, [loading]);

  /* intro: slowly cycle the trainer poses */
  useEffect(() => {
    if (!intro) return;
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % LOADER_FRAMES;
      setIntroFrame(i);
    }, 420);
    return () => clearInterval(t);
  }, [intro]);

  /* SPACE / Enter / click starts; ESC returns to the portfolio home */
  useEffect(() => {
    if (!intro) return;
    const onKey = (ev: KeyboardEvent) => {
      if (["Space", "Enter"].includes(ev.code)) {
        ev.preventDefault();
        startGame();
      } else if (ev.code === "Escape") {
        ev.preventDefault();
        router.push("/");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [intro, startGame, router]);

  const closeDialog = useCallback(() => {
    setDialog(null);
    window.dispatchEvent(new Event("journey:dialog-closed"));
  }, []);

  const advanceDialog = useCallback(() => {
    const d = dialogRef.current;
    if (!d) return;
    const { landmark } = d;
    if (d.line < landmark.lines.length - 1) {
      setDialog({ ...d, line: d.line + 1 });
    } else if (landmark.photos && d.photo < landmark.photos.length - 1) {
      setDialog({ ...d, photo: d.photo + 1 });
    } else {
      closeDialog();
    }
  }, [closeDialog]);

  /* game -> react events */
  useEffect(() => {
    const onDialogue = (ev: Event) => {
      setDialog({ landmark: (ev as CustomEvent<Landmark>).detail, line: 0, photo: 0 });
    };
    const onZone = (ev: Event) => {
      const z = (ev as CustomEvent<ZoneId>).detail;
      setZone(z);
      if (introRef.current) return;
      setWelcome(zoneNames[z]);
      if (welcomeTimer.current) clearTimeout(welcomeTimer.current);
      welcomeTimer.current = setTimeout(() => setWelcome(null), 2600);
    };
    window.addEventListener("journey:dialogue", onDialogue);
    window.addEventListener("journey:zone", onZone);
    return () => {
      window.removeEventListener("journey:dialogue", onDialogue);
      window.removeEventListener("journey:zone", onZone);
    };
  }, []);

  /* A/B keys while dialog open */
  useEffect(() => {
    if (!dialog) return;
    const onKey = (ev: KeyboardEvent) => {
      if (["Space", "Enter", "KeyE", "KeyA"].includes(ev.code)) {
        ev.preventDefault();
        advanceDialog();
      } else if (["Escape", "KeyB"].includes(ev.code)) {
        ev.preventDefault();
        closeDialog();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialog, advanceDialog, closeDialog]);

  /* touch dpad */
  const setTouch = (dir: keyof typeof touchRef.current, value: boolean) => {
    touchRef.current = { ...touchRef.current, [dir]: value };
    window.dispatchEvent(new CustomEvent("journey:touch", { detail: touchRef.current }));
  };

  const pressA = () => {
    if (dialogRef.current) advanceDialog();
    else window.dispatchEvent(new Event("journey:action"));
  };
  const pressB = () => {
    if (dialogRef.current) closeDialog();
  };

  const { landmark, line, photo } = dialog ?? {};
  const currentPhoto = landmark?.photos?.[photo ?? 0];
  const atEnd =
    landmark &&
    line === landmark.lines.length - 1 &&
    (!landmark.photos || photo === landmark.photos.length - 1);

  return (
    <div className={`relative h-dvh w-full overflow-hidden ${night ? "bg-[#0a0a1a]" : "bg-[#9ccaef]"}`}>
      <div ref={hostRef} className="absolute inset-0" />

      {/* HUD top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-3 sm:p-4">
        <div className="rounded-md border-2 border-[#1a1a1a] bg-[#f8f7f4] px-3 py-2 text-[10px] text-[#111] shadow-[3px_3px_0_rgba(0,0,0,0.4)] sm:text-xs">
          {zoneNames[zone]}
        </div>
        <Link
          href="/"
          className="pointer-events-auto rounded-md border-2 border-[#1a1a1a] bg-[#f8f7f4] px-3 py-2 text-[10px] text-[#111] shadow-[3px_3px_0_rgba(0,0,0,0.4)] transition-transform hover:scale-105 sm:text-xs"
        >
          ✕ Exit
        </Link>
      </div>

      {/* controls hint (desktop) */}
      <div className="pointer-events-none absolute bottom-3 right-3 z-20 hidden rounded-md border-2 border-[#1a1a1a] bg-[#f8f7f4]/90 px-3 py-2 text-[9px] leading-relaxed text-[#333] shadow-[3px_3px_0_rgba(0,0,0,0.4)] md:block">
        WASD / arrows · move
        <br />
        SPACE · read signs, talk
        <br />
        ESC · close
      </div>

      {/* photo popup */}
      {landmark && currentPhoto && (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black/40 pb-44">
          <div className="rounded-lg border-4 border-[#1a1a1a] bg-[#f8f7f4] p-2 shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
            {currentPhoto.src ? (
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.label}
                width={280}
                height={210}
                className="h-[180px] w-[240px] rounded object-cover sm:h-[210px] sm:w-[280px]"
              />
            ) : (
              <div className="flex h-[180px] w-[240px] items-center justify-center rounded bg-[#d8d4cc] sm:h-[210px] sm:w-[280px]">
                <span className="px-4 text-center text-[10px] leading-relaxed text-[#666]">
                  [{currentPhoto.label}]
                </span>
              </div>
            )}
            {landmark.photos!.length > 1 && (
              <p className="mt-1.5 text-center text-[9px] text-[#888]">
                {(photo ?? 0) + 1} / {landmark.photos!.length} · [SPACE] next
              </p>
            )}
          </div>
        </div>
      )}

      {/* dialogue box */}
      {landmark && (
        <div className="absolute inset-x-0 bottom-0 z-40 p-3 sm:p-5">
          <div
            className="mx-auto max-w-2xl cursor-pointer rounded-lg border-4 border-[#1a1a1a] bg-[#10182a] p-4 shadow-[6px_6px_0_rgba(0,0,0,0.5)] sm:p-5"
            onClick={advanceDialog}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#7ec8ff]">
              {landmark.speaker}
            </p>
            <p className="mt-2 min-h-[40px] text-[11px] leading-[1.9] text-[#f8f7f4] sm:text-[13px]">
              {landmark.lines[line ?? 0]}
            </p>
            <p className="mt-2 text-right text-[9px] text-[#5a6a8a]">
              {atEnd ? "[SPACE] close" : "[SPACE] next"} · [ESC] exit ▾
            </p>
          </div>
        </div>
      )}

      {/* welcome banner */}
      {welcome && !intro && (
        <div className="pointer-events-none absolute inset-x-0 top-16 z-40 flex justify-center">
          <div className="animate-bounce rounded-lg border-4 border-[#1a1a1a] bg-[#f8f7f4] px-6 py-3 text-sm text-[#111] shadow-[5px_5px_0_rgba(0,0,0,0.5)] sm:text-base">
            Welcome to {welcome}!
          </div>
        </div>
      )}

      {/* loading screen — animated sprites of me cycling while the islands load */}
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a1a] px-6 text-center">
          <p className="text-[10px] tracking-[0.3em] text-[#7ec8ff]">NOW LOADING</p>
          <div
            aria-hidden
            className="my-3"
            style={{
              width: LOADER_CELL_W,
              height: LOADER_CELL_H,
              backgroundImage: "url(/game/loader-strip.png)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: `-${loadFrame * LOADER_CELL_W}px 0px`,
            }}
          />
          <Image
            src="/game/langdons-world-logo.png"
            alt="Langdon's World"
            width={1846}
            height={569}
            className="h-auto w-[min(70vw,300px)]"
          />
          <div className="mt-5 h-2.5 w-60 overflow-hidden rounded-full border-2 border-[#2a3a5a] bg-[#10182a]">
            <div
              className="h-full rounded-full bg-[#ffe27a] transition-[width] duration-[1800ms] ease-linear"
              style={{ width: barFull ? "100%" : "6%" }}
            />
          </div>
          <p className="mt-3 animate-pulse text-[10px] leading-relaxed text-[#8a9ac0]">
            crossing into the islands…
          </p>
        </div>
      )}

      {/* intro screen */}
      {intro && (
        <div
          className="absolute inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-[#0a0a1a]/92 px-6 text-center"
          onClick={startGame}
        >
          {/* trainer mascot on the side, slowly cycling poses */}
          <div
            aria-hidden
            className="absolute left-[6%] top-1/2 hidden -translate-y-1/2 xl:block"
            style={{
              width: LOADER_CELL_W,
              height: LOADER_CELL_H,
              backgroundImage: "url(/game/loader-strip.png)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: `-${introFrame * LOADER_CELL_W}px 0px`,
            }}
          />

          <p className="text-[10px] tracking-[0.3em] text-[#7ec8ff]">LANGDON HUYNH PRESENTS</p>
          <Image
            src="/game/langdons-world-logo.png"
            alt="Langdon's World"
            width={1846}
            height={569}
            priority
            className="mt-4 h-auto w-[min(82vw,520px)] drop-shadow-[0_4px_0_rgba(0,0,0,0.45)]"
          />
          <p className="mt-5 max-w-lg text-[10px] leading-[2.1] text-[#aab4d4] sm:text-xs">
            A little game about my life — walk around and interact with the
            landmarks, the people, and the islands to learn my story.
          </p>
          <p className="mt-3 max-w-lg text-[10px] font-bold leading-[2.1] text-[#7ec8ff] sm:text-xs">
            Langdon&apos;s Lodge → Toga Town → Campanile City
          </p>

          {/* control keys */}
          <div className="mt-7 flex items-center gap-7">
            <div className="flex flex-col items-center gap-1.5">
              <div className="grid grid-cols-3 gap-1.5">
                <span />
                <Key>W</Key>
                <span />
                <Key>A</Key>
                <Key>S</Key>
                <Key>D</Key>
              </div>
              <span className="text-[8px] tracking-[0.2em] text-[#8a9ac0]">MOVE</span>
            </div>
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center gap-2">
                <Key wide>SPACE</Key>
                <span className="text-[9px] text-[#8a9ac0]">interact / talk</span>
              </div>
              <div className="flex items-center gap-2">
                <Key wide>ESC</Key>
                <span className="text-[9px] text-[#8a9ac0]">close dialogue</span>
              </div>
            </div>
          </div>

          <p className="mt-8 animate-pulse text-[11px] text-[#ffe27a] sm:text-sm">
            PRESS SPACE TO START
          </p>
          <Link
            href="/"
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto mt-3 text-[9px] text-[#8a9ac0] underline-offset-4 hover:text-[#cdd8f0] hover:underline"
          >
            PRESS ESC TO RETURN TO HOME
          </Link>
        </div>
      )}

      {/* touch controls (mobile) */}
      <div className="absolute bottom-4 left-4 z-20 grid grid-cols-3 grid-rows-3 gap-1 md:hidden">
        {dpadDirs.map((d) => (
          <button
            key={d.id}
            className={`flex h-12 w-12 items-center justify-center rounded-md border-2 border-[#1a1a1a] bg-[#f8f7f4]/90 text-sm text-[#111] shadow-[2px_2px_0_rgba(0,0,0,0.4)] active:translate-y-0.5 ${
              d.area === "u"
                ? "col-start-2 row-start-1"
                : d.area === "l"
                  ? "col-start-1 row-start-2"
                  : d.area === "r"
                    ? "col-start-3 row-start-2"
                    : "col-start-2 row-start-3"
            }`}
            onPointerDown={(e) => {
              e.preventDefault();
              setTouch(d.id, true);
            }}
            onPointerUp={() => setTouch(d.id, false)}
            onPointerLeave={() => setTouch(d.id, false)}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="absolute bottom-6 right-4 z-20 flex gap-3 md:hidden">
        <button
          onClick={pressB}
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-[#f8f7f4]/90 text-xs font-bold text-[#111] shadow-[2px_2px_0_rgba(0,0,0,0.4)] active:translate-y-0.5"
        >
          B
        </button>
        <button
          onClick={pressA}
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-[#e3350d] text-xs font-bold text-white shadow-[2px_2px_0_rgba(0,0,0,0.4)] active:translate-y-0.5"
        >
          A
        </button>
      </div>

      {/* attribution */}
      <p className="pointer-events-none absolute bottom-1 left-1/2 z-10 -translate-x-1/2 text-[8px] text-black/35">
        world art generated with AI · made with Phaser
      </p>
    </div>
  );
}
