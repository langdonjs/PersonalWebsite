import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/site/PageShell";
import { hobbies, interests, youtubeUrl } from "../../data/life";

export const metadata: Metadata = {
  title: "Hobbies | Langdon Huynh",
  description: "What I do when I'm not at a computer.",
};

export default function HobbiesPage() {
  return (
    <PageShell>
      <section className="pt-14">
        <Link
          href="/life"
          className="ffam-mono text-[11px] uppercase tracking-[0.15em] text-[#a8a08f] transition-colors hover:text-[#2a2620]"
        >
          ← Life
        </Link>
        <h1 className="ffam-newsreader mt-4 text-[clamp(34px,6vw,46px)] font-medium tracking-[-0.01em] text-[#2a2620]">
          Hobbies
        </h1>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="ffam-mono text-[11px] uppercase tracking-[0.18em] text-[#a8a08f]">
              These days
            </p>
            <p className="mt-3 text-[15px] leading-[1.75] text-[#4a463d]">
              {hobbies.now}
            </p>
          </div>
          <div>
            <p className="ffam-mono text-[11px] uppercase tracking-[0.18em] text-[#a8a08f]">
              How I got here
            </p>
            <p className="mt-3 text-[15px] leading-[1.75] text-[#4a463d]">
              {hobbies.past}
            </p>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap gap-2">
          {interests.map((i) => (
            <span
              key={i}
              className="rounded-full border border-[#d8cfbd] px-3.5 py-1.5 text-[12px] text-[#6b665b]"
            >
              {i}
            </span>
          ))}
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#d8cfbd] px-3.5 py-1.5 text-[12px] text-[#9c7a43] transition-colors hover:border-[#c2a86f] hover:text-[#6f5528]"
          >
            YouTube ↗
          </a>
        </div>
      </section>
    </PageShell>
  );
}
