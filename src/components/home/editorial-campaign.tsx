import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { editorialBlocks } from "@/lib/products";
import { cn } from "@/lib/utils";

export function EditorialCampaign() {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-luxury mb-16">
        <Reveal className="max-w-xl">
          <p className="eyebrow mb-4">Kampanja</p>
          <h2 className="font-serif text-4xl sm:text-5xl">
            Zapiski o mirni garderobi
          </h2>
        </Reveal>
      </div>

      <div className="flex flex-col gap-24 lg:gap-32">
        {editorialBlocks.map((block, i) => {
          const reversed = i % 2 === 1;
          return (
            <div key={block.id} className="container-luxury">
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal
                  className={cn(
                    "relative aspect-4/5 overflow-hidden rounded-xl bg-beige",
                    reversed ? "lg:order-2" : "lg:order-1"
                  )}
                >
                  <Image
                    src={block.image}
                    alt={block.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </Reveal>
                <Reveal
                  delay={0.1}
                  className={reversed ? "lg:order-1" : "lg:order-2"}
                >
                  <p className="eyebrow mb-4">{block.eyebrow}</p>
                  <h3 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                    {block.title}
                  </h3>
                  <p className="mt-6 max-w-md text-muted-foreground">
                    {block.copy}
                  </p>
                </Reveal>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
