import type { Metadata } from "next";
import PageShell from "../components/site/PageShell";

export const metadata: Metadata = {
  title: "About | Langdon Huynh",
  description: "A little more about me.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <section className="pt-14">
        <h1 className="ffam-newsreader text-[clamp(34px,6vw,46px)] font-medium tracking-[-0.01em] text-[#2a2620]">
          About
        </h1>

        <div className="mt-8 max-w-[600px] space-y-5 text-[16.5px] leading-[1.8] text-[#4a463d]">
          <div className="rounded-md border border-dashed border-[#c9a24b]/55 bg-[#c9a24b]/[0.07] px-4 py-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#a9832f]">
              ✍️ Your prose goes here
            </p>
            <p className="text-[13.5px] leading-[1.7] text-[#7c6428]">
              Send me your About write-up and I&apos;ll drop it straight in here
              — this is where you tell your story in your own voice (where you
              grew up, how you got into this, what you care about building).
              Until then, this placeholder marks the spot.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
