import Link from "next/link";

/** Bookshelf illustration — shelf frame with book spines */
function BookshelfIcon() {
  return (
    <svg viewBox="0 0 120 100" className="h-24 w-auto" aria-hidden>
      {/* frame */}
      <rect x="8" y="6" width="104" height="88" rx="4" fill="none" stroke="#111" strokeWidth="3" />
      {/* middle shelf */}
      <line x1="8" y1="52" x2="112" y2="52" stroke="#111" strokeWidth="3" />
      {/* top row spines */}
      <rect x="16" y="18" width="9" height="34" fill="#111" />
      <rect x="27" y="24" width="8" height="28" fill="#8a8a86" />
      <rect x="37" y="20" width="10" height="32" fill="#c8c4ba" />
      <rect x="49" y="26" width="7" height="26" fill="#3a3a40" />
      {/* leaning book */}
      <rect x="60" y="22" width="9" height="31" fill="#e3350d" transform="rotate(10 64 38)" />
      <rect x="74" y="25" width="8" height="27" fill="#555" />
      <rect x="84" y="19" width="10" height="33" fill="#a8a49a" />
      {/* bottom row spines */}
      <rect x="16" y="62" width="10" height="32" fill="#6a6a66" />
      <rect x="28" y="66" width="8" height="28" fill="#111" />
      <rect x="38" y="60" width="9" height="34" fill="#c8c4ba" />
      {/* stacked horizontal books */}
      <rect x="52" y="80" width="30" height="7" fill="#3a3a40" />
      <rect x="55" y="72" width="26" height="7" fill="#8a8a86" />
      <rect x="58" y="64" width="22" height="7" fill="#d4d0c8" />
      <rect x="88" y="63" width="9" height="31" fill="#555" />
    </svg>
  );
}

/** Journal illustration — notebook with elastic band and pen */
function JournalIcon() {
  return (
    <svg viewBox="0 0 120 100" className="h-24 w-auto" aria-hidden>
      {/* notebook */}
      <rect x="22" y="10" width="62" height="80" rx="6" fill="#111" />
      <rect x="28" y="10" width="56" height="80" rx="6" fill="#f8f7f4" stroke="#111" strokeWidth="3" />
      {/* spiral binding */}
      <line x1="30" y1="10" x2="30" y2="90" stroke="#111" strokeWidth="3" />
      {/* ruled lines */}
      <line x1="40" y1="28" x2="74" y2="28" stroke="#c8c4ba" strokeWidth="2.5" />
      <line x1="40" y1="40" x2="74" y2="40" stroke="#c8c4ba" strokeWidth="2.5" />
      <line x1="40" y1="52" x2="66" y2="52" stroke="#c8c4ba" strokeWidth="2.5" />
      {/* elastic band */}
      <line x1="76" y1="10" x2="76" y2="90" stroke="#e3350d" strokeWidth="3.5" />
      {/* pen */}
      <g transform="rotate(40 95 60)">
        <rect x="91" y="34" width="8" height="42" rx="2" fill="#111" />
        <polygon points="91,76 99,76 95,86" fill="#8a8a86" />
        <rect x="91" y="30" width="8" height="6" fill="#555" />
      </g>
    </svg>
  );
}

const portals = [
  {
    href: "/bookshelf",
    title: "The Bookshelf",
    desc: "What I'm reading — books, papers, and essays with ratings and takeaways.",
    cta: "Browse the shelf →",
    icon: <BookshelfIcon />,
  },
  {
    href: "/journal",
    title: "The Journal",
    desc: "Essays and reflections — on internships, Berkeley, and things I'm figuring out.",
    cta: "Read the journal →",
    icon: <JournalIcon />,
  },
];

export default function PortalCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {portals.map((portal) => (
        <Link
          key={portal.href}
          href={portal.href}
          className="group flex flex-col items-center rounded-xl border border-black/10 bg-white/60 px-8 py-10 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-black/25 hover:shadow-[0_20px_48px_rgba(0,0,0,0.1)]"
        >
          <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2">
            {portal.icon}
          </div>
          <h3 className="mt-6 font-display text-[22px] font-bold tracking-[-0.5px] text-[#111]">
            {portal.title}
          </h3>
          <p className="mt-2.5 max-w-[300px] text-[12.5px] leading-[1.7] text-[#777]">
            {portal.desc}
          </p>
          <span className="mt-5 text-xs font-semibold text-[#111] underline decoration-black/25 underline-offset-4 transition-colors group-hover:decoration-black">
            {portal.cta}
          </span>
        </Link>
      ))}
    </div>
  );
}
