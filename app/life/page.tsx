import type { Metadata } from "next";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import SectionHeader from "../components/sections/SectionHeader";
import PhotoGallery from "../components/life/PhotoGallery";
import Bookshelf from "../components/life/Bookshelf";
import JournalCards from "../components/life/JournalCards";
import Reveal from "../components/ui/Reveal";
import InkSweep from "../components/ink/InkSweep";
import { interests, youtubeUrl } from "../data/life";

export const metadata: Metadata = {
  title: "Beyond the code | Langdon Huynh",
  description:
    "The human side — interests, photos, bookshelf, and journal entries.",
};

export default function Life() {
  return (
    <>
      <Nav />
      <main className="relative mx-auto max-w-5xl overflow-x-clip">
        {/* header */}
        <section className="relative px-5 pb-4 pt-14 sm:px-9">
          <h1 className="hero-enter font-display text-[clamp(44px,8vw,84px)] font-extrabold leading-[0.9] tracking-[-0.05em] text-[#111]">
            beyond
            <br />
            <span className="font-light text-[#8a8a86]">the code</span>
          </h1>
          <div className="hero-enter hero-enter-2 mt-6 h-px w-16 bg-[#111]" />
          <p className="hero-enter hero-enter-3 mt-6 max-w-[480px] text-[14.5px] leading-[1.8] text-[#555]">
            The parts of me that don&apos;t show up in a commit history — what I
            play, where I&apos;ve been, what I read, and what I think about.
          </p>
          <div className="hero-enter hero-enter-4 mt-6 flex max-w-[520px] flex-wrap gap-2">
            {interests.map((interest) => (
              <span
                key={interest.label}
                className="rounded-full border border-black/12 px-3.5 py-1.5 text-[11px] font-medium text-[#777]"
              >
                {interest.emoji} {interest.label}
              </span>
            ))}
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-black/12 px-3.5 py-1.5 text-[11px] font-medium text-[#777] transition-colors hover:border-black/30 hover:text-[#111]"
            >
              🎥 YouTube ↗
            </a>
          </div>
        </section>

        {/* photos */}
        <section className="relative px-5 pt-12 sm:px-9">
          <InkSweep className="absolute -left-32 top-24 w-[480px] opacity-[0.08]" />
          <Reveal>
            <SectionHeader num="01" title="Snapshots" />
          </Reveal>
          <PhotoGallery />
        </section>

        {/* bookshelf */}
        <section className="relative px-5 pt-14 sm:px-9">
          <InkSweep flip className="absolute -right-28 top-40 w-[380px] opacity-[0.07]" />
          <Reveal>
            <SectionHeader num="02" title="Bookshelf" />
            <Bookshelf />
          </Reveal>
        </section>

        {/* journal */}
        <section className="relative px-5 pt-14 sm:px-9">
          <Reveal>
            <SectionHeader num="03" title="Journal" />
          </Reveal>
          <JournalCards />
        </section>

        <Footer />
      </main>
    </>
  );
}
