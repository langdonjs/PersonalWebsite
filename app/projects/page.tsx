import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "../components/site/PageShell";
import { projects } from "../data/projects";

export const metadata: Metadata = {
  title: "Projects | Langdon Huynh",
  description:
    "Personal and research projects: computer vision pipelines, hackathon builds, and published research.",
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <section className="pt-14">
        <h1 className="ffam-newsreader text-[clamp(34px,6vw,46px)] font-medium tracking-[-0.01em] text-[#2a2620]">
          Projects
        </h1>
        <p className="mt-4 max-w-[540px] text-[15px] leading-[1.7] text-[#6b665b]">
          Personal and research projects. Most have code on GitHub.
        </p>

        <hr className="mt-10 border-0 border-t border-[#e0d8c8]" />

        <div>
          {projects.map((p) => (
            <article key={p.name} className="border-b border-[#e6ddcd] py-8">
              <div className="flex gap-5">
                {/* media / gif placeholder */}
                <div className="relative hidden h-[92px] w-[92px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#cfc6b4] bg-[#ece5d6] sm:flex">
                  {p.media ? (
                    <Image
                      src={p.media}
                      alt={`${p.name} demo`}
                      fill
                      sizes="92px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="ffam-mono text-[10px] text-[#b3aa96]">
                      gif
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-[18px] font-semibold text-[#2a2620]">
                      {p.name}
                    </h2>
                    <span className="ffam-mono shrink-0 text-[12px] text-[#a8a08f]">
                      {p.year}
                    </span>
                  </div>
                  <p className="mt-2 max-w-[480px] text-[14.5px] leading-[1.65] text-[#4a463d]">
                    {p.blurb}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {p.stack.split(" · ").map((t) => (
                        <span
                          key={t}
                          className="ffam-mono text-[11px] text-[#a8a08f]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.links.length > 0 && (
                      <div className="flex gap-3">
                        {p.links.map((l) => (
                          <a
                            key={l.label}
                            href={l.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[12px] text-[#9c7a43] underline decoration-1 underline-offset-4 transition-colors hover:text-[#6f5528]"
                          >
                            {l.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
