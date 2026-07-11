import type { Metadata } from "next";
import PageShell from "../components/site/PageShell";

export const metadata: Metadata = {
  title: "About | Langdon Huynh",
  description: "A little more about me: my story, what I've built, and what I care about.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <section className="pt-14">
        <h1 className="ffam-newsreader text-[clamp(34px,6vw,46px)] font-medium tracking-[-0.01em] text-[#2a2620]">
          About
        </h1>

        <div className="mt-8 max-w-[620px] space-y-5 text-[16.5px] leading-[1.85] text-[#413d34]">
          <p>
            I&apos;m Langdon, an undergraduate at UC Berkeley studying Computer
            Science and Applied Math. I grew up questioning everything and
            wanting to understand the inner workings of complex topics, which led
            me to software and mathematics. Lately that&apos;s meant teaching
            machines to understand the physical world.
          </p>
          <p>
            Most of what I know I&apos;ve learned by shipping. I&apos;ve done
            full-stack work at BlueRobins, built active-learning pipelines at
            Perceive AI, and worked on perception at Looq AI, where I built a
            SLAM computer vision pipeline that runs on edge devices to localize
            and reconstruct 3D infrastructure. On the side I built Ironbook,
            which turns photos of a space into a navigable 3D scene you can query
            in natural language, and it won the Grand Prize at the UC Berkeley AI
            Hackathon.
          </p>
          <p>
            My overarching theme is that I enjoy solving complex problems that
            have real impact and actually help people. I&apos;m still figuring
            out where I&apos;ll end up, but right now I&apos;m trying to put
            myself in the best situations to learn and grow.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
