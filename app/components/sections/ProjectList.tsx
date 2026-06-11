import Image from "next/image";
import { projects } from "../../data/projects";
import Reveal from "../ui/Reveal";

export default function ProjectList() {
  return (
    <div className="flex flex-col">
      {projects.map((project, i) => (
        <Reveal key={project.name} delay={i * 100}>
          <div className="grid grid-cols-1 items-start gap-5 border-t border-black/9 py-6 sm:grid-cols-[170px_150px_1fr] sm:items-center sm:gap-7">
            <div>
              <h3 className="font-display text-[19px] font-bold tracking-[-0.5px] text-[#111]">
                {project.name}
              </h3>
              <p className="mt-1.5 text-[10.5px] leading-relaxed text-[#999]">
                {project.stack}
              </p>
              <p className="mt-2 text-[10px] text-[#bbb]">{project.year}</p>
            </div>

            <div
              className="relative flex h-[150px] w-[150px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-black/10"
              style={project.media ? undefined : { background: project.gradient }}
            >
              {project.media ? (
                <Image
                  src={project.media}
                  alt={`${project.name} demo`}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              ) : (
                <>
                  <span className="font-display text-xl font-extrabold tracking-[-0.5px] text-white/15">
                    {project.monogram}
                  </span>
                  <span className="absolute bottom-2 right-2 rounded bg-black/45 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[1.5px] text-white/80">
                    GIF
                  </span>
                </>
              )}
            </div>

            <div className="max-w-[460px] text-[12.5px] leading-[1.75] text-[#777]">
              {project.blurb}
              {project.links.length > 0 && (
                <div className="mt-2.5 flex gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-black/25 pb-px text-[11px] font-semibold text-[#111] transition-colors hover:border-black"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      ))}
      <div className="h-px bg-black/9" />
    </div>
  );
}
