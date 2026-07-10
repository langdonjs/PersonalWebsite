"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Pokeball from "../ui/Pokeball";

const NAV = [
  { label: "home", href: "/" },
  { label: "experience", href: "/experience" },
  { label: "projects", href: "/projects" },
  { label: "about", href: "/about" },
  { label: "life", href: "/life" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="relative flex items-center justify-between">
      <Link
        href="/"
        className="ffam-newsreader text-[20px] italic tracking-tight text-[#2a2620]"
      >
        Langdon Huynh
      </Link>

      {/* desktop nav */}
      <nav className="hidden items-center gap-4 text-[13px] text-[#8d8676] sm:flex">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={
              isActive(n.href)
                ? "text-[#2a2620] underline decoration-1 underline-offset-[5px]"
                : "transition-colors hover:text-[#2a2620]"
            }
          >
            {n.label}
          </Link>
        ))}
        <Link
          href="/journey"
          aria-label="Langdon's World"
          className="ml-0.5 flex items-center transition-opacity hover:opacity-70"
        >
          <Pokeball size={15} />
        </Link>
      </nav>

      {/* mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
        aria-expanded={open}
        className="flex items-center gap-2 text-[13px] text-[#8d8676] sm:hidden"
      >
        <Pokeball size={14} />
        menu
      </button>

      {/* mobile menu */}
      {open && (
        <div className="absolute right-0 top-9 z-50 flex flex-col items-end gap-2.5 rounded-xl border border-[#e0d8c8] bg-[#f8f3ea] px-5 py-4 text-[14px] text-[#8d8676] shadow-lg sm:hidden">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={
                isActive(n.href) ? "text-[#2a2620]" : "hover:text-[#2a2620]"
              }
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/journey"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 hover:text-[#2a2620]"
          >
            <Pokeball size={13} /> world
          </Link>
        </div>
      )}
    </header>
  );
}
