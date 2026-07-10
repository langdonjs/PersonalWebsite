import Image from "next/image";
import PageShell from "./components/site/PageShell";
import { GithubIcon, LinkedinIcon } from "./components/site/Icons";

const NOW = [
  "Interning at Looq AI — 3D reconstruction & perception for edge devices",
  "Finishing CS + Applied Math at UC Berkeley, graduating May 2026",
  "Open to full-time roles in ML and software engineering",
  "Currently reading: Thinking, Fast and Slow — Kahneman",
  "Listening to: Khruangbin, Bill Evans, Tyler, the Creator",
];

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/langdonjs",
    ext: true,
    Icon: GithubIcon,
  },
  { label: "LinkedIn", href: "#", ext: false, Icon: LinkedinIcon },
];

export default function Home() {
  return (
    <PageShell>
      {/* hero */}
      <section className="pt-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_188px] sm:items-start sm:gap-10">
          <div>
            <h1 className="ffam-newsreader text-[clamp(36px,6vw,50px)] font-medium leading-[1.08] tracking-[-0.01em] text-[#2a2620]">
              Hey, I&apos;m Langdon.
            </h1>
            <div className="mt-6 space-y-5 text-[16.5px] leading-[1.75] text-[#4a463d]">
              <p>
                I&apos;m a student at UC Berkeley studying CS + Applied Math. I
                spend most of my time building things, thinking about how
                machines learn to see, and chasing good coffee while I do it.
              </p>
              <p>
                I&apos;m interested in the gap between research and things that
                actually work: perception, systems, the full stack from GPU
                kernels to the product.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.ext ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="flex items-center gap-1.5 text-[#9c7a43] transition-colors hover:text-[#6f5528]"
                >
                  <l.Icon className="h-[15px] w-[15px]" />
                  <span className="underline decoration-1 underline-offset-4">
                    {l.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* photo */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-black/10 bg-[#e8e1d2] shadow-[0_10px_30px_rgba(60,50,35,0.12)] sm:w-[188px]">
            <Image
              src="/langdon.jpg"
              alt="Langdon Huynh"
              fill
              sizes="188px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <hr className="mt-14 border-0 border-t border-[#e0d8c8]" />

      {/* NOW */}
      <section className="mt-12">
        <p className="ffam-mono text-[11px] uppercase tracking-[0.18em] text-[#a8a08f]">
          Now
        </p>
        <ul className="mt-6 space-y-4">
          {NOW.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3.5 text-[16px] leading-[1.6] text-[#413d34]"
            >
              <span aria-hidden className="ffam-mono mt-[1px] text-[#c1b7a2]">
                –
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
