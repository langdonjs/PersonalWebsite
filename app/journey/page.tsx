import type { Metadata } from "next";
import Link from "next/link";
import Pokeball from "../components/Pokeball";

export const metadata: Metadata = {
  title: "My Journey | Langdon Huynh",
  description: "A playable story of my path — coming soon.",
};

export default function Journey() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="animate-bounce">
        <Pokeball size={56} />
      </div>
      <h1 className="mt-8 font-display text-[clamp(40px,8vw,72px)] font-extrabold leading-none tracking-[-0.04em] text-[#111]">
        my journey
      </h1>
      <div className="mx-auto mt-6 h-px w-16 bg-[#111]" />
      <p className="mt-6 max-w-md text-sm leading-[1.8] text-[#666]">
        A playable story of my path — gyms, routes, and internships.
        <br />
        <span className="font-semibold text-[#111]">Training in progress…</span>
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full border border-black/18 px-6 py-2.5 text-xs font-semibold text-[#555] transition-colors hover:border-black/40 hover:text-[#111]"
      >
        ← Back home
      </Link>
    </main>
  );
}
