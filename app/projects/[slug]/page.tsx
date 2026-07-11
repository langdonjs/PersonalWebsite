import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "../../components/site/PageShell";
import { projects } from "../../data/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return { title: "Project | Langdon Huynh" };
  return { title: `${p.name} | Langdon Huynh`, description: p.blurb };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <PageShell>
      <section className="pt-14">
        <Link
          href="/projects"
          className="ffam-mono text-[12px] text-[#8d8676] transition-colors hover:text-[#9c7a43]"
        >
          ← projects
        </Link>

        <h1 className="ffam-newsreader mt-4 text-[clamp(32px,6vw,44px)] font-medium tracking-[-0.01em] text-[#2a2620]">
          {p.name}
        </h1>
        <p className="ffam-mono mt-2 text-[12.5px] text-[#8d8676]">
          {p.year}
          {p.award ? <span className="text-[#9c7a43]"> · ★ {p.award}</span> : null}
        </p>

        {p.media && (
          <div
            className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#e0d8c8]"
            style={{ background: p.gradient }}
          >
            <Image
              src={p.media}
              alt={`${p.name} demo`}
              fill
              unoptimized
              priority
              sizes="(max-width: 720px) 100vw, 672px"
              className="object-cover"
            />
          </div>
        )}

        <p className="mt-6 max-w-[620px] text-[16px] leading-[1.8] text-[#413d34]">
          {p.blurb}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
          {p.stack.split(" · ").map((t) => (
            <span key={t} className="ffam-mono text-[11px] text-[#a8a08f]">
              {t}
            </span>
          ))}
        </div>

        <hr className="my-8 border-0 border-t border-[#e0d8c8]" />

        {p.writeup ? (
          <div className="space-y-4">
            {p.writeup.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="max-w-[620px] text-[15.5px] leading-[1.8] text-[#413d34]"
              >
                {para}
              </p>
            ))}
          </div>
        ) : (
          <p className="ffam-mono text-[13px] text-[#a8a08f]">
            Detailed write-up coming soon.
          </p>
        )}

        {p.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4">
            {p.links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] text-[#9c7a43] underline decoration-1 underline-offset-4 transition-colors hover:text-[#6f5528]"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
