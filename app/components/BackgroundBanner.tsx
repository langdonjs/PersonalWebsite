"use client";

import Image from "next/image";
import { useState } from "react";

export default function BackgroundBanner() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {/* Photo on bottom, gradient on top so the campus stays visible but text stays readable */}
      {!imageError && (
        <Image
          src="/berkeley-banner.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          onError={() => setImageError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/80 to-black" />
    </div>
  );
}

