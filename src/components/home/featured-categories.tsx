import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { categoryImages } from "@/lib/products";

const categories = [
  { name: "Ženske", href: "/izdelki?kategorija=zenske", image: categoryImages.zenske },
  { name: "Moški", href: "/izdelki?kategorija=moski", image: categoryImages.moski },
  {
    name: "Dodatki",
    href: "/izdelki?kategorija=dodatki",
    image: categoryImages.dodatki,
  },
  { name: "Arhiv", href: "/izdelki?kategorija=arhiv", image: categoryImages.arhiv },
];

export function FeaturedCategories() {
  return (
    <section className="section-padding">
      <div className="container-luxury">
        <Reveal className="mb-14 max-w-xl">
          <p className="eyebrow mb-4">Raziskujte</p>
          <h2 className="font-serif text-4xl sm:text-5xl">Nakupujte po kategorijah</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {categories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 0.08}>
              <Link
                href={cat.href}
                className="group relative block aspect-4/5 overflow-hidden rounded-xl bg-beige"
              >
                <Image
                  src={cat.image}
                  alt={`Kolekcija ${cat.name}`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-7">
                  <span className="font-serif text-2xl text-white sm:text-3xl">
                    {cat.name}
                  </span>
                  <span className="flex size-10 items-center justify-center rounded-full border border-white/70 text-white transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="size-4" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
