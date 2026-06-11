import Image from "next/image";
import { photos } from "../../data/life";
import Reveal from "../ui/Reveal";

export default function PhotoGallery() {
  return (
    <div className="columns-2 gap-3 sm:columns-3 [&>*]:mb-3">
      {photos.map((photo, i) => (
        <Reveal key={photo.src} delay={(i % 3) * 80}>
          <figure className="group relative overflow-hidden rounded-lg border border-black/8">
            <Image
              src={photo.src}
              alt={photo.caption}
              width={600}
              height={600}
              sizes="(max-width: 640px) 50vw, 33vw"
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/60 to-transparent px-3 pb-2.5 pt-8 text-[11px] font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {photo.caption}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
