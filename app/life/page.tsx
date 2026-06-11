import type { Metadata } from "next";
import Image from "next/image";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import SectionHeader from "../components/sections/SectionHeader";
import PhotoGallery from "../components/life/PhotoGallery";
import PortalCards from "../components/life/PortalCards";
import Reveal from "../components/ui/Reveal";
import { interests, photos, youtubeUrl } from "../data/life";

export const metadata: Metadata = {
  title: "Beyond the code | Langdon Huynh",
  description:
    "The human side — interests, photos, bookshelf, and journal entries.",
};

const heroPhotos = photos.slice(0, 8);

export default function Life() {
  return (
    <>
      <Nav />
      <main className="relative mx-auto max-w-5xl overflow-x-clip">
        {/* header with photo-collage backdrop */}
        <section className="relative px-5 pb-10 pt-16 sm:px-9 sm:pt-20">
          {/* background gallery */}
          <div aria-hidden className="absolute inset-0 overflow-hidden">
            <div className="grid h-full w-full grid-cols-4 gap-2 opacity-25">
              {heroPhotos.map((photo, i) => (
                <div
                  key={photo.src}
                  className={`relative overflow-hidden rounded-md ${i % 2 === 1 ? "translate-y-6" : ""}`}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            {/* wash so the type stays readable */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f8f7f4]/70 via-[#f8f7f4]/55 to-[#f8f7f4]" />
          </div>

          <div className="relative z-10">
            <h1 className="hero-enter font-display text-[clamp(48px,9vw,96px)] font-extrabold leading-[0.9] tracking-[-0.05em] text-[#111]">
              beyond
              <br />
              <span className="font-light text-[#6a6a66]">the code</span>
            </h1>
            <div className="hero-enter hero-enter-2 mt-6 h-px w-16 bg-[#111]" />
            <p className="hero-enter hero-enter-3 mt-6 max-w-[480px] text-[14.5px] font-medium leading-[1.8] text-[#444]">
              The parts of me that don&apos;t show up in a commit history — what I
              play, where I&apos;ve been, what I read, and what I think about.
            </p>
            <div className="hero-enter hero-enter-4 mt-6 flex max-w-[520px] flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest.label}
                  className="rounded-full border border-black/12 bg-white/70 px-3.5 py-1.5 text-[11px] font-medium text-[#555] backdrop-blur-sm"
                >
                  {interest.emoji} {interest.label}
                </span>
              ))}
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-black/12 bg-white/70 px-3.5 py-1.5 text-[11px] font-medium text-[#555] backdrop-blur-sm transition-colors hover:border-black/30 hover:text-[#111]"
              >
                🎥 YouTube ↗
              </a>
            </div>
          </div>
        </section>

        {/* bookshelf + journal portals */}
        <section className="relative px-5 pt-10 sm:px-9">
          <Reveal>
            <SectionHeader num="01" title="Explore" />
          </Reveal>
          <Reveal delay={100}>
            <PortalCards />
          </Reveal>
        </section>

        {/* photos */}
        <section className="relative px-5 pt-14 sm:px-9">
          <Reveal>
            <SectionHeader num="02" title="Snapshots" />
          </Reveal>
          <PhotoGallery />
        </section>

        <Footer />
      </main>
    </>
  );
}
