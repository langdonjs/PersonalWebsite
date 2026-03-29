/**
 * Full-viewport background. Uses CSS background-image (not next/image) so it
 * isn’t clipped by parent overflow and doesn’t depend on Image fill layout.
 */
export default function BackgroundBanner() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 min-h-dvh w-full bg-black"
      aria-hidden
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/berkeley-banner.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/78 to-black" />
    </div>
  );
}

