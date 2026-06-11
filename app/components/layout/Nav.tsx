import Link from "next/link";
import Pokeball from "../ui/Pokeball";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center justify-center border-b border-black/8 bg-[#f8f7f4]/80 backdrop-blur-xl">
      <div className="flex items-center gap-6 sm:gap-10">
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
    </nav>
  );
}
