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

const gallery = photos.slice(0, 6);

export default function LifePage() {
  return (
    <PageShell>
      <section className="pt-14">
        <h1 className="ffam-newsreader text-[clamp(34px,6vw,46px)] font-medium tracking-[-0.01em] text-[#2a2620]">
          Life
        </h1>

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

        {/* intro / navigation */}
        <p className="mt-8 max-w-[600px] text-[16px] leading-[1.8] text-[#4a463d]">
          When I&apos;m not building things, you&apos;ll find me at poker nights,
          playing soccer or golf, snowboarding up in Tahoe, editing videos, or
          chasing new food spots around the Bay. This corner of the site is the
          non-technical me — check{" "}
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
          for what I&apos;m reading. The 🔴 up in the nav opens Langdon&apos;s
          World, a little playable walk through my life.
        </p>

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
