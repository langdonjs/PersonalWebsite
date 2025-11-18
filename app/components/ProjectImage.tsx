"use client";

import Image from "next/image";
import { useState } from "react";

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProjectImage({ src, alt, className = "" }: ProjectImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      onError={() => setImageError(true)}
    />
  );
}

