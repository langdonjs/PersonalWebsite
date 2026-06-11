import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import Reveal from "../components/ui/Reveal";
import InkSweep from "../components/ink/InkSweep";
import { journal } from "../data/journal";

export const metadata: Metadata = {
  title: "Journal | Langdon Huynh",
  description: "Essays and reflections — internships, Berkeley, and building things.",
};

export default function JournalPage() {
  return (
    <>
      <Nav />
      <main className="relative mx-auto max-w-3xl overflow-x-clip px-5 sm:px-9">
        <section className="relative pb-4 pt-14">
          <InkSweep flip className="absolute -left-40 top-8 w-[400px] opacity-[0.06]" />
          <Link
            href="/life"
            className="hero-enter text-[11px] font-semibold text-[#999] transition-colors hover:text-[#111]"
          >
            ← Beyond the code
          </Link>
          <h1 className="hero-enter mt-4 font-display text-[clamp(44px,8vw,84px)] font-extrabold leading-[0.9] tracking-[-0.05em] text-[#111]">
            the <span className="font-light text-[#8a8a86]">journal</span>
          </h1>
          <div className="hero-enter hero-enter-2 mt-6 h-px w-16 bg-[#111]" />
          <p className="hero-enter hero-enter-3 mt-6 max-w-[480px] text-[14.5px] leading-[1.8] text-[#555]">
            Essays, reflections, and writeups — advice I&apos;d give, lessons from
            internships, and how things got built.
          </p>
        </section>

        <section className="pt-8">
          {journal.map((entry, i) => {
            const inner = (
              <article className="group grid grid-cols-1 gap-1 border-t border-black/9 py-8">
                <p className="text-[10.5px] uppercase tracking-[1.5px] text-[#bbb]">
                  {entry.date}
                  {entry.readTime && <span> · {entry.readTime}</span>}
                </p>
                <h2 className="mt-1.5 font-display text-[clamp(20px,3.5vw,28px)] font-bold leading-snug tracking-[-0.8px] text-[#111] transition-colors group-hover:text-[#555]">
                  {entry.title}
                </h2>
                <p className="mt-2 max-w-[560px] text-[13.5px] leading-[1.75] text-[#777]">
                  {entry.excerpt}
                </p>
                <p className="mt-3 text-[11.5px] font-semibold">
                  {entry.url ? (
                    <span className="text-[#111] underline decoration-black/25 underline-offset-4 group-hover:decoration-black">
                      Read the piece →
                    </span>
                  ) : (
                    <span className="text-[#999]">✍️ In the works…</span>
                  )}
                </p>
              </article>
            );
            return (
              <Reveal key={entry.title} delay={i * 80}>
                {entry.url ? (
                  <a href={entry.url} target="_blank" rel="noopener noreferrer" className="block">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
          <div className="h-px bg-black/9" />
          <p className="pb-4 pt-6 text-[10px] uppercase tracking-[1px] text-[#bbb]">
            {journal.length} pieces · more on the way
          </p>
        </section>

        <Footer />
      </main>
    </>
  );
}
