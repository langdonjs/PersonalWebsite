import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/site/PageShell";

export const metadata: Metadata = {
  title: "Writing | Langdon Huynh",
  description: "Essays, notes, and things I'm thinking about.",
};

export default function WritingPage() {
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
          Writing
        </h1>
        <p className="mt-4 max-w-[540px] text-[15px] leading-[1.7] text-[#6b665b]">
          Essays, notes, and things I&apos;m thinking about. This is new, more
          coming soon.
        </p>

        <hr className="mt-10 border-0 border-t border-[#e0d8c8]" />

        <div className="flex flex-col items-center py-24 text-center">
          <span className="text-[22px] text-[#cfc6b4]">✦</span>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#8d8676]">
            Nothing here yet. I&apos;m working on a few pieces,
            <br />check back in a bit.
          </p>
        </div>

        <hr className="border-0 border-t border-[#e0d8c8]" />
      </section>
    </PageShell>
  );
}
