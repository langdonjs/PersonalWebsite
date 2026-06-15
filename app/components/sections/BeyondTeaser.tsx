import Image from "next/image";
import Link from "next/link";
import { interests, photos } from "../../data/life";

const teaserPhotos = photos.slice(0, 4);
const rotations = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];

export default function BeyondTeaser() {
  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto]">
      <div>
        <p className="max-w-[460px] text-[14.5px] leading-[1.8] text-[#555]">
          I love sidequesting and there&apos;s more to me than commits and coursework. Poker nights,
          pickup soccer, traveling, and a camera roll full of good company.
        </p>
        <div className="mt-5 flex max-w-[460px] flex-wrap gap-2">
          {interests.slice(0, 6).map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-black/12 px-3.5 py-1.5 text-[11px] font-medium text-[#777]"
            >
              {interest}
            </span>
          ))}
        </div>
        <Link
          href="/life"
          className="mt-7 inline-block rounded-full bg-[#111] px-6 py-2.5 text-xs font-semibold text-[#f8f7f4] transition-opacity hover:opacity-80"
        >
          Step into my life →
        </Link>
      </div>

      <Link href="/life" className="group flex items-center justify-center md:pr-6">
        <div className="relative flex">
          {teaserPhotos.map((photo, i) => (
            <div
              key={photo.src}
              className={`relative h-[110px] w-[90px] overflow-hidden rounded-md border-4 border-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-105 sm:h-[130px] sm:w-[105px] ${rotations[i]} ${i > 0 ? "-ml-6" : ""}`}
              style={{ zIndex: i }}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="105px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}
