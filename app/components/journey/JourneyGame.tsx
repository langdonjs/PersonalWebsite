"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

export default function JourneyGame() {
  const hostRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gameRef = useRef<any>(null);
  const [zone, setZone] = useState<ZoneId>("lodge");
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
        backgroundColor: "#0a0a1a",
        pixelArt: false,
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
  }, []);

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
    const onZone = (ev: Event) => setZone((ev as CustomEvent<ZoneId>).detail);
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
    <div className="relative h-dvh w-full overflow-hidden bg-[#0a0a1a]">
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
                {(photo ?? 0) + 1} / {landmark.photos!.length} · [A] next
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
              {atEnd ? "[A] close" : "[A] next"} · [B] exit ▾
            </p>
          </div>
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
