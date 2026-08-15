"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 sm:flex-row-reverse lg:sticky lg:top-0">
      <div className="relative aspect-3/4 flex-1 overflow-hidden rounded-xl bg-beige">
        <Image
          src={images[active]}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex gap-3 overflow-x-auto sm:w-24 sm:flex-col sm:overflow-visible">
        {images.map((image, i) => (
          <button
            key={image + i}
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
            className={cn(
              "relative aspect-3/4 w-20 shrink-0 overflow-hidden rounded-lg bg-beige sm:w-full",
              active === i && "ring-2 ring-charcoal ring-offset-2"
            )}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
