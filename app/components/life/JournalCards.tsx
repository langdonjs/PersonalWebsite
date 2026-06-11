import { journal } from "../../data/journal";
import Reveal from "../ui/Reveal";

export default function JournalCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {journal.map((entry, i) => {
        const card = (
          <article className="flex h-full flex-col rounded-[10px] border border-black/9 bg-white/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
            <p className="text-[10px] uppercase tracking-[1.5px] text-[#bbb]">
              {entry.date}
            </p>
            <h3 className="mt-2 font-display text-[15px] font-bold leading-snug tracking-[-0.3px] text-[#111]">
              {entry.title}
            </h3>
            <p className="mt-2.5 flex-1 text-[11.5px] leading-[1.7] text-[#888]">
              {entry.excerpt}
            </p>
            <p className="mt-4 text-[10.5px] font-semibold text-[#999]">
              {entry.url ? "Read →" : "✍️ In the works…"}
            </p>
          </article>
        );
        return (
          <Reveal key={entry.title} delay={i * 100}>
            {entry.url ? (
              <a href={entry.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                {card}
              </a>
            ) : (
              card
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
