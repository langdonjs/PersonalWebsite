import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
          Personal and research projects. Most are public on GitHub.
          Documentation detailing the process is written if you want to learn
          more.
        </p>

        <hr className="mt-10 border-0 border-t border-[#e0d8c8]" />

        <div>
          {projects.map((p) => (
            <article
              key={p.slug}
              className="border-b border-[#e6ddcd] py-8 last:border-b-0"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
                {/* media / gif — larger, clickable to the write-up */}
                <Link
                  href={`/projects/${p.slug}`}
                  className="group relative block aspect-[16/9] w-full shrink-0 self-start overflow-hidden rounded-xl border border-[#e0d8c8] sm:w-[360px]"
                  style={{ background: p.gradient }}
                  aria-label={`${p.name} write-up`}
                >
                  {p.media ? (
                    <Image
                      src={p.media}
                      alt={`${p.name} demo`}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span className="ffam-mono absolute inset-0 flex items-center justify-center text-[24px] font-medium tracking-tight text-white/70">
                      {p.monogram}
                    </span>
                  )}
                </Link>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-[18px] font-semibold text-[#2a2620]">
                      {p.name}
                    </h2>
                    <span className="ffam-mono shrink-0 text-[12px] text-[#a8a08f]">
                      {p.year}
                    </span>
                  </div>
                  {p.award && (
                    <p className="ffam-mono mt-1 text-[11.5px] text-[#9c7a43]">
                      ★ {p.award}
                    </p>
                  )}
                  <p className="mt-2 max-w-[480px] text-[14.5px] leading-[1.65] text-[#4a463d]">
                    {p.blurb}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                    {p.stack.split(" · ").map((t) => (
                      <span
                        key={t}
                        className="ffam-mono text-[11px] text-[#a8a08f]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="text-[12px] text-[#9c7a43] underline decoration-1 underline-offset-4 transition-colors hover:text-[#6f5528]"
                    >
                      Documentation →
                    </Link>
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
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
