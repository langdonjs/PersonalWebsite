import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import Bookshelf from "../components/life/Bookshelf";
import InkSweep from "../components/ink/InkSweep";

export const metadata: Metadata = {
  title: "Bookshelf | Langdon Huynh",
  description:
    "Books, papers, and essays I've read, with ratings, takeaways, and notes.",
};

export default function BookshelfPage() {
  return (
    <>
      <Nav />
      <main className="relative mx-auto max-w-5xl overflow-x-clip">
        <section className="relative px-5 pb-4 pt-14 sm:px-9">
          <InkSweep className="absolute -right-32 -top-10 w-[420px] opacity-[0.07]" />
          <Link
            href="/life"
            className="hero-enter text-[11px] font-semibold text-[#999] transition-colors hover:text-[#111]"
          >
            ← Beyond the code
          </Link>
          <h1 className="hero-enter mt-4 font-display text-[clamp(44px,8vw,84px)] font-extrabold leading-[0.9] tracking-[-0.05em] text-[#111]">
            the <span className="font-light text-[#8a8a86]">bookshelf</span>
          </h1>
          <div className="hero-enter hero-enter-2 mt-6 h-px w-16 bg-[#111]" />
          <p className="hero-enter hero-enter-3 mt-6 max-w-[480px] text-[14.5px] leading-[1.8] text-[#555]">
            Everything I&apos;ve read worth remembering: books, research papers,
            and essays, with a takeaway from each.
          </p>
        </section>

        <section className="hero-enter hero-enter-4 relative px-5 pt-8 sm:px-9">
          <Bookshelf />
        </section>

        <Footer />
      </main>
    </>
  );
}
