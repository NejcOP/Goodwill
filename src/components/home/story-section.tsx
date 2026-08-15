import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { storyImage } from "@/lib/products";

export function StorySection() {
  return (
    <section className="section-padding">
      <div className="container-luxury grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative aspect-4/5 overflow-hidden rounded-xl bg-beige lg:order-2">
          <Image
            src={storyImage}
            alt="Kos GOODWILL na obalni pokrajini"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={0.1} className="lg:order-1">
          <p className="eyebrow mb-4">Naša filozofija</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            Ustvarjeno za vsakodnevno udobje.
            <br />
            Zasnovano za brezčasno eleganco.
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            GOODWILL obstaja za garderobo, h kateri se vračate — kose, ki se z
            leti mehkčajo, ohranjajo obliko in nikoli ne sledijo sezoni.
            Zavzemamo se za mirne tkanine, premišljene kroje in paleto barv,
            navdihnjeno s peskom, kamnom in naplavljenim lesom.
          </p>
          <Button
            render={<Link href="/o-nas" />}
            nativeButton={false}
            variant="outline"
            className="mt-8 h-12 rounded-full border-charcoal px-8 text-xs tracking-[0.15em] uppercase"
          >
            Odkrijte GOODWILL
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
