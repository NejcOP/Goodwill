import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { heroImage } from "@/lib/products";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "GOODWILL je premium oblačilna znamka, zgrajena na naravnih materialih, brezčasnem dizajnu in umirjeni obrti.",
};

const values = [
  {
    title: "Naravni materiali",
    copy: "Volna, bombaž, lan, svila in usnje — nič sintetičnega ne pride skozi naš studio.",
  },
  {
    title: "Narejeno za dolgo življenjsko dobo",
    copy: "Premišljena konstrukcija in široke šivne dodatke pomenijo, da je vsak kos možno popraviti, ne zamenjati.",
  },
  {
    title: "Brezčasen dizajn",
    copy: "Snujemo v desetletjih, ne sezonah. Barva, kroj in proporcije so izbrani, da preseganjo trende.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-24">
      <section className="relative flex h-[70vh] min-h-[420px] items-end overflow-hidden bg-charcoal">
        <Image
          src={heroImage}
          alt="GOODWILL studio"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
        <div className="container-luxury relative z-10 pb-16">
          <p className="mb-4 text-xs tracking-[0.4em] text-white/80 uppercase">
            O GOODWILL
          </p>
          <h1 className="max-w-2xl font-serif text-5xl text-white sm:text-6xl">
            Udoben luksuz, premišljen od temeljev navzgor.
          </h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-4">Naša zgodba</p>
            <h2 className="font-serif text-3xl leading-snug sm:text-4xl">
              GOODWILL se je začel z enostavno frustracijo — lepo narejena
              oblačila se redko zdijo lahka za življenje v njih.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Rojen med umirjenostjo skandinavskega dizajna in lahkotnostjo
              avstralske obale, si je GOODWILL zadal cilj ustvariti garderobo
              esencialov, ki se nosijo tako dobro, kot izgledajo — krojeni iz
              naravnih vlaken, ročno dokončani in ustvarjeni za leta, ne
              sezone. Vsaka kolekcija je majhna, premišljena in sprosta
              počasi.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="materials" className="section-padding bg-warm-white">
        <div className="container-luxury">
          <Reveal className="mb-14 max-w-xl">
            <p className="eyebrow mb-4">Za kaj se zavzemamo</p>
            <h2 className="font-serif text-4xl sm:text-5xl">Naše vrednote</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <p className="font-serif text-2xl">{value.title}</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {value.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
