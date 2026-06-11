import { experiences } from "../../data/experience";
import Reveal from "../ui/Reveal";

export default function ExperienceList() {
  return (
    <div className="flex flex-col">
      {experiences.map((exp, i) => (
        <Reveal key={exp.company} delay={i * 100}>
          <div className="grid grid-cols-1 gap-2 border-t border-black/9 py-5 sm:grid-cols-[110px_1fr_auto] sm:gap-5">
            <div className="pt-0.5 text-[11px] text-[#999]">{exp.period}</div>
            <div>
              <h3 className="font-display text-[17px] font-bold tracking-[-0.3px] text-[#111]">
                {exp.company}
              </h3>
              <p className="mt-0.5 text-xs text-[#777]">
                {exp.role} · {exp.location}
              </p>
              <p className="mt-2 max-w-[430px] text-[11.5px] leading-[1.65] text-[#999]">
                {exp.blurb}
              </p>
            </div>
            <span className="hidden pt-0.5 text-sm text-[#ccc] sm:block">↗</span>
          </div>
        </Reveal>
      ))}
      <div className="h-px bg-black/9" />
    </div>
  );
}
