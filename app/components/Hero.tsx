import Image from "next/image";
import InkDragon from "./ink/InkDragon";

export default function Hero() {
  return (
    <section
      id="about"
      className="relative grid min-h-[460px] grid-cols-1 items-center gap-10 px-5 py-12 sm:px-9 sm:py-16 md:grid-cols-[1fr_300px]"
    >
      <div className="relative z-10">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[3px] text-[#999]">
          ML Engineer · Full Stack · Computer Vision
        </p>
        <h1 className="mb-7 font-display text-[clamp(56px,11vw,108px)] font-extrabold leading-[0.88] tracking-[-0.055em] text-[#111]">
          langdon
          <br />
          <span className="font-light text-[#8a8a86]">huynh</span>
        </h1>
        <div className="mb-6 h-px w-16 bg-[#111]" />
        <p className="max-w-[460px] text-[14.5px] leading-[1.8] text-[#555]">
          I build <strong className="font-semibold text-[#111]">AI systems</strong> at
          the edge of vision and language — currently reconstructing the real world
          in 3D at <strong className="font-semibold text-[#111]">Looq AI</strong>.
          <br />
          <br />
          CS + Applied Math @{" "}
          <strong className="font-semibold text-[#111]">UC Berkeley</strong> · GPA 3.9
        </p>
        <div className="mt-8 flex items-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-[#111] px-6 py-2.5 text-xs font-semibold text-[#f8f7f4] transition-opacity hover:opacity-80"
          >
            View my work
          </a>
          <a
            href="https://github.com/langdonjs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/18 px-6 py-2.5 text-xs font-semibold text-[#555] transition-colors hover:border-black/40 hover:text-[#111]"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <InkDragon className="absolute -right-12 -top-24 hidden w-[460px] opacity-90 md:block" />
        <div className="relative z-10 h-[200px] w-[200px] overflow-hidden rounded-full border border-black/10 shadow-[0_16px_48px_rgba(0,0,0,0.14)] sm:h-[240px] sm:w-[240px]">
          <Image
            src="/headshot.png"
            alt="Langdon Huynh"
            fill
            priority
            sizes="240px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
