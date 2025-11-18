"use client";

import Image from "next/image";
import { useState } from "react";

export default function BackgroundBanner() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
      {!imageError && (
        <Image
          src="/berkeley-banner.jpg"
          alt="Berkeley Background"
          fill
          className="object-cover opacity-20"
          priority
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}

