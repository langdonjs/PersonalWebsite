import Link from "next/link";
import Pokeball from "../ui/Pokeball";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center justify-center border-b border-black/8 bg-[#f8f7f4]/80 backdrop-blur-xl">
      <div className="flex items-center gap-4 sm:gap-9">
        <Link href="/#about" className="text-xs font-medium text-[#555] transition-colors hover:text-[#111]">
          About
        </Link>
        <Link href="/#experience" className="text-xs font-medium text-[#555] transition-colors hover:text-[#111]">
          <span className="hidden sm:inline">Work Experience</span>
          <span className="sm:hidden">Work</span>
        </Link>
        <Link href="/#projects" className="text-xs font-medium text-[#555] transition-colors hover:text-[#111]">
          Projects
        </Link>
        <Link href="/life" className="text-xs font-medium text-[#555] transition-colors hover:text-[#111]">
          Life
        </Link>
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
