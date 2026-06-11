type PokeballProps = {
  /** Diameter in px */
  size?: number;
};

export default function Pokeball({ size = 18 }: PokeballProps) {
  const button = Math.max(4, Math.round(size / 3));
  return (
    <span
      aria-hidden
      className="relative inline-block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background:
          "linear-gradient(180deg, #e3350d 0%, #e3350d 44%, #1a1a1a 44%, #1a1a1a 56%, #ffffff 56%, #ffffff 100%)",
        border: "1.5px solid #1a1a1a",
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{
          width: button,
          height: button,
          border: "1.5px solid #1a1a1a",
        }}
      />
    </span>
  );
}
