/**
 * Sumi-e style dragon, hand-drawn SVG placeholder.
 * Swap this component's internals for a high-res raster illustration later;
 * consumers only rely on it filling its container width.
 */
export default function InkDragon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      viewBox="0 0 460 560"
      fill="none"
    >
      <defs>
        <filter id="ink-dragon-rough">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.045"
            numOctaves="4"
            seed="7"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" />
        </filter>
      </defs>
      <g filter="url(#ink-dragon-rough)">
        {/* serpentine body */}
        <path
          d="M 350 120 C 420 150 430 220 380 260 C 330 300 240 280 200 330 C 160 380 200 440 280 450 C 340 458 380 430 390 400"
          stroke="#161616"
          strokeWidth="34"
          strokeLinecap="round"
          opacity="0.92"
        />
        {/* tail taper */}
        <path
          d="M 390 400 C 398 370 380 350 350 355"
          stroke="#161616"
          strokeWidth="16"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* dry-brush belly highlights */}
        <path
          d="M 345 135 C 400 162 408 215 368 250"
          stroke="#f8f7f4"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M 210 340 C 180 382 212 428 272 438"
          stroke="#f8f7f4"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* head */}
        <path
          d="M 350 120 C 330 95 300 85 275 95 C 255 103 248 122 260 138 C 275 158 315 150 350 120 Z"
          fill="#161616"
          opacity="0.94"
        />
        {/* snout */}
        <path
          d="M 262 132 C 240 142 225 140 210 132"
          stroke="#161616"
          strokeWidth="11"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* horns */}
        <path
          d="M 310 92 C 325 65 350 48 385 45"
          stroke="#161616"
          strokeWidth="9"
          strokeLinecap="round"
          opacity="0.88"
        />
        <path
          d="M 290 90 C 295 62 312 40 338 28"
          stroke="#161616"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.82"
        />
        {/* whiskers */}
        <path
          d="M 215 128 C 185 120 160 125 138 142"
          stroke="#161616"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M 218 138 C 192 145 172 158 160 178"
          stroke="#161616"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.65"
        />
        {/* eye */}
        <circle cx="295" cy="112" r="5" fill="#f8f7f4" opacity="0.9" />
        {/* claws */}
        <path
          d="M 250 295 C 238 315 220 325 198 326"
          stroke="#161616"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M 252 300 C 248 320 252 338 264 350"
          stroke="#161616"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M 330 430 C 322 452 305 464 285 468"
          stroke="#161616"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.78"
        />
        {/* mane */}
        <path
          d="M 330 105 C 360 88 395 85 425 95"
          stroke="#161616"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M 335 118 C 368 108 400 110 428 122"
          stroke="#161616"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>
      {/* splatter */}
      <g fill="#161616">
        <circle cx="180" cy="200" r="4" opacity="0.5" />
        <circle cx="160" cy="240" r="2.5" opacity="0.4" />
        <circle cx="420" cy="300" r="3.5" opacity="0.45" />
        <circle cx="400" cy="180" r="2" opacity="0.4" />
        <circle cx="150" cy="420" r="3" opacity="0.35" />
        <circle cx="250" cy="500" r="4" opacity="0.4" />
        <circle cx="330" cy="510" r="2.5" opacity="0.35" />
        <ellipse cx="195" cy="215" rx="6" ry="2.5" opacity="0.3" transform="rotate(-20 195 215)" />
        <ellipse cx="410" cy="320" rx="7" ry="3" opacity="0.28" transform="rotate(15 410 320)" />
      </g>
    </svg>
  );
}
