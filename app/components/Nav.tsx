import Link from "next/link";
import Pokeball from "./Pokeball";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-black/8 bg-[#f8f7f4]/80 px-5 backdrop-blur-xl sm:px-9">
      <div className="flex items-center gap-5 sm:gap-8">
        <a href="#about" className="text-xs font-medium text-[#555] transition-colors hover:text-[#111]">
          About
        </a>
        <a href="#experience" className="text-xs font-medium text-[#555] transition-colors hover:text-[#111]">
          Experience
        </a>
        <a href="#projects" className="text-xs font-medium text-[#555] transition-colors hover:text-[#111]">
          Projects
        </a>
        <Link
          href="/journey"
          className="flex items-center gap-2 text-xs font-semibold text-[#111] transition-opacity hover:opacity-70"
        >
          <Pokeball />
          My Journey
        </Link>
      </div>
      <a
        href="mailto:langdon@berkeley.edu"
        className="hidden text-[11px] font-medium text-[#888] transition-colors hover:text-[#111] sm:block"
      >
        langdon@berkeley.edu
      </a>
    </nav>
  );
}
