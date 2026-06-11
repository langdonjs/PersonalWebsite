/**
 * Faint diagonal ink brush sweep. Size, position, and opacity are controlled
 * by the consumer via className; `flip` mirrors the stroke direction.
 */
export default function InkSweep({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  const id = flip ? "ink-sweep-rough-flip" : "ink-sweep-rough";
  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      viewBox="0 0 520 300"
      fill="none"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <defs>
        <filter id={id}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="3"
            seed="11"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>
        <path
          d="M 20 260 C 140 220 280 140 500 40"
          stroke="#161616"
          strokeWidth="44"
          strokeLinecap="round"
        />
        <path
          d="M 60 280 C 180 245 320 170 510 80"
          stroke="#161616"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}
