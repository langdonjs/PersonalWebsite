import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "../components/site/PageShell";
import { photos } from "../data/life";

export const metadata: Metadata = {
  title: "Life | Langdon Huynh",
  description: "The non-technical me: hobbies, writing, what I read, and photos.",
};

const DIRECTORY = [
  { label: "Hobbies", href: "/life/hobbies", desc: "what I do for fun" },
  { label: "Writing", href: "/life/writing", desc: "essays & notes" },
  { label: "Bookshelf", href: "/life/bookshelf", desc: "what I'm reading" },
];

const banner = photos.slice(0, 10);
const gallery = photos.slice(0, 6);

export default function LifePage() {
  return (
    <PageShell>
      <section className="pt-6">
        {/* faded photo-grid banner with overlaid title */}
        <div className="relative -mx-6 h-[220px] overflow-hidden sm:mx-0 sm:h-[300px] sm:rounded-2xl">
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 sm:grid-cols-5">
            {banner.map((p) => (
              <div key={p.src} className="relative">
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 34vw, 20vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {/* fade wash + directional gradient for title contrast */}
          <div className="pointer-events-none absolute inset-0 bg-[#f3ecdf]/45" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f3ecdf] via-[#f3ecdf]/40 to-transparent" />
          <div className="absolute inset-0 flex items-center px-6 sm:px-10">
            <h1 className="ffam-newsreader text-[clamp(52px,12vw,104px)] font-medium leading-[0.95] tracking-[-0.02em] text-[#2a2620]">
              Life
            </h1>
          </div>
        </div>

        {/* intro */}
        <h2 className="ffam-newsreader mt-9 text-[22px] font-medium text-[#2a2620]">
          What I&apos;m up to
        </h2>
        <p className="mt-3 max-w-[600px] text-[16px] leading-[1.8] text-[#4a463d]">
          When I&apos;m not coding, I enjoy playing soccer or golf, poker nights
          with the friends, snowboarding up in Tahoe, editing vlogs, or trying
          new recipes to cook. I think the key to everything is balance, cooling
          down and actually enjoying life, and this is how I like to do it. Check
          out my{" "}
          <Link
            href="/life/hobbies"
            className="text-[#9c7a43] underline decoration-1 underline-offset-4 hover:text-[#6f5528]"
          >
            Hobbies
          </Link>{" "}
          for what I&apos;m into,{" "}
          <Link
            href="/life/writing"
            className="text-[#9c7a43] underline decoration-1 underline-offset-4 hover:text-[#6f5528]"
          >
            Writing
          </Link>{" "}
          for essays and half-formed thoughts, and the{" "}
          <Link
            href="/life/bookshelf"
            className="text-[#9c7a43] underline decoration-1 underline-offset-4 hover:text-[#6f5528]"
          >
            Bookshelf
          </Link>{" "}
          for what I&apos;m reading. The Pokéball 🔴 up in the top-right corner
          opens Langdon&apos;s World, a little video-game-style playable walk
          through my life.
        </p>

        {/* directory */}
        <ul className="mt-8 border-y border-[#e6ddcd]">
          {DIRECTORY.map((d) => (
            <li key={d.href} className="border-b border-[#e6ddcd] last:border-b-0">
              <Link
                href={d.href}
                className="group flex items-baseline justify-between py-3.5"
              >
                <span className="text-[16px] text-[#2a2620] transition-colors group-hover:text-[#9c7a43]">
                  {d.label}
                </span>
                <span className="ffam-mono text-[12px] text-[#a8a08f]">
                  {d.desc} →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* photo gallery */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {gallery.map((p) => (
            <div
              key={p.src}
              className="relative aspect-square overflow-hidden rounded-lg border border-black/5 bg-[#e8e1d2]"
            >
              <Image
                src={p.src}
                alt={p.caption}
                fill
                sizes="(max-width: 640px) 45vw, 220px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
