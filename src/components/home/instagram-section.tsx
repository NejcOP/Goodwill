import Image from "next/image";
import { Camera } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { instagramImages } from "@/lib/products";

export function InstagramSection() {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-luxury mb-12 flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <p className="eyebrow mb-4">Sledite nam</p>
          <h2 className="font-serif text-4xl sm:text-5xl">@goodwill</h2>
        </Reveal>
      </div>

      <div className="container-luxury grid grid-cols-2 gap-3 sm:grid-cols-4">
        {instagramImages.map((image, i) => (
          <Reveal
            key={image + i}
            delay={(i % 4) * 0.05}
            className="group relative aspect-square overflow-hidden rounded-xl bg-beige"
          >
            <Image
              src={image}
              alt="GOODWILL na Instagramu"
              fill
              sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-500 group-hover:bg-black/30 group-hover:opacity-100">
              <Camera className="size-6 text-white" strokeWidth={1.5} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
