import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/site/PageShell";
import Bookshelf from "../../components/life/Bookshelf";

export const metadata: Metadata = {
  title: "Bookshelf | Langdon Huynh",
  description: "Books, papers, and essays worth remembering.",
};

export default function BookshelfPage() {
  return (
    <PageShell>
      <section className="pt-14">
        <Link
          href="/life"
          className="ffam-mono text-[11px] uppercase tracking-[0.15em] text-[#a8a08f] transition-colors hover:text-[#2a2620]"
        >
          ← Life
        </Link>
        <h1 className="ffam-newsreader mt-4 text-[clamp(34px,6vw,46px)] font-medium tracking-[-0.01em] text-[#2a2620]">
          Bookshelf
        </h1>
        <p className="mt-4 max-w-[540px] text-[15px] leading-[1.7] text-[#6b665b]">
          Books, papers, and essays worth remembering.
        </p>

        <div className="mt-8">
          <Bookshelf />
        </div>
      </section>
    </PageShell>
  );
}
