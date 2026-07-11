import type { Metadata } from "next";
import PageShell from "../components/site/PageShell";
import { experiences } from "../data/experience";

export const metadata: Metadata = {
  title: "Experience | Langdon Huynh",
  description: "Internships and roles across ML, perception, and full-stack engineering.",
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <section className="pt-14">
        <h1 className="ffam-newsreader text-[clamp(34px,6vw,46px)] font-medium tracking-[-0.01em] text-[#2a2620]">
          Experience
        </h1>
        <p className="mt-4 max-w-[560px] text-[15px] leading-[1.7] text-[#6b665b]">
          I&apos;m drawn to the intersection of full-stack, machine learning,
          and robotics. What I care about most is solving problems that make a
          real, tangible impact on people.
        </p>

        <ol className="mt-10">
          {experiences.map((exp, i) => (
            <li key={exp.company} className="flex gap-5 pb-7 last:pb-0">
              {/* timeline rail */}
              <div className="flex flex-col items-center" aria-hidden>
                <span className="mt-[6px] h-[11px] w-[11px] shrink-0 rounded-full border-2 border-[#f3ecdf] bg-[#9c7a43] ring-1 ring-[#d8cfbd]" />
                {i < experiences.length - 1 && (
                  <span className="mt-1.5 w-px grow bg-[#e0d8c8]" />
                )}
              </div>

              {/* entry */}
              <div className="min-w-0 flex-1 pb-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <h2 className="text-[18px] font-semibold text-[#2a2620]">
                    {exp.company}
                  </h2>
                  <span className="ffam-mono shrink-0 text-[12px] text-[#a8a08f]">
                    {exp.period}
                  </span>
                </div>
                <p className="ffam-mono mt-0.5 text-[12.5px] text-[#8d8676]">
                  {exp.role} · {exp.location}
                </p>
                <p className="mt-2 max-w-[520px] text-[14.5px] leading-[1.65] text-[#4a463d]">
                  {exp.blurb}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
