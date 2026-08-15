"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/shop/product-card";
import { newArrivals } from "@/lib/products";
import { cn } from "@/lib/utils";

export function NewArrivalsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync initial scroll-button state with the embla instance
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="section-padding">
      <div className="container-luxury mb-10 flex items-end justify-between gap-6">
        <Reveal>
          <p className="eyebrow mb-4">Ravnokar prispelo</p>
          <h2 className="font-serif text-4xl sm:text-5xl">Novosti</h2>
        </Reveal>
        <div className="hidden gap-2 sm:flex">
          <button
            aria-label="Prejšnji"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className={cn(
              "flex size-11 items-center justify-center rounded-full border border-charcoal/20 transition-colors",
              !canPrev && "opacity-30",
              canPrev && "hover:bg-charcoal hover:text-white"
            )}
          >
            <ArrowLeft className="size-4" strokeWidth={1.5} />
          </button>
          <button
            aria-label="Naslednji"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className={cn(
              "flex size-11 items-center justify-center rounded-full border border-charcoal/20 transition-colors",
              !canNext && "opacity-30",
              canNext && "hover:bg-charcoal hover:text-white"
            )}
          >
            <ArrowRight className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="container-luxury overflow-hidden" ref={emblaRef}>
        <div className="-ml-5 flex">
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="min-w-0 shrink-0 grow-0 basis-[75%] pl-5 sm:basis-[45%] lg:basis-[28%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
