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
        <p className="mt-4 max-w-[540px] text-[15px] leading-[1.7] text-[#6b665b]">
          Places I&apos;ve worked and things I&apos;ve shipped. For the full
          picture,{" "}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-[#9c7a43] underline decoration-1 underline-offset-4 transition-colors hover:text-[#6f5528]"
          >
            download my résumé
          </a>
          .
        </p>

        <hr className="mt-10 border-0 border-t border-[#e0d8c8]" />

        <div>
          {experiences.map((exp) => (
            <article
              key={exp.company}
              className="border-b border-[#e6ddcd] py-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-[19px] font-semibold text-[#2a2620]">
                  {exp.company}
                </h2>
                <span className="ffam-mono shrink-0 text-[12px] text-[#a8a08f]">
                  {exp.period}
                </span>
              </div>
              <p className="ffam-mono mt-1 text-[12.5px] text-[#8d8676]">
                {exp.role} · {exp.location}
              </p>
              <p className="mt-3 max-w-[560px] text-[15px] leading-[1.7] text-[#4a463d]">
                {exp.blurb}
              </p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
