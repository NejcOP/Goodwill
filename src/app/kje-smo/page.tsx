import type { Metadata } from "next";
import Image from "next/image";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Kje smo",
  description: "Obiščite GOODWILL studio in showroom v Ljubljani.",
};

const hours = [
  { day: "Ponedeljek – petek", time: "10:00 – 19:00" },
  { day: "Sobota", time: "10:00 – 17:00" },
  { day: "Nedelja", time: "Zaprto" },
];

export default function KjeSmoPage() {
  return (
    <div className="pb-24">
      <section className="relative flex h-[55vh] min-h-[360px] items-end overflow-hidden bg-charcoal">
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&auto=format&fit=crop"
          alt="GOODWILL studio Ljubljana"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <div className="container-luxury relative z-10 pb-14">
          <p className="mb-4 text-xs tracking-[0.4em] text-white/80 uppercase">
            Lokacija
          </p>
          <h1 className="font-serif text-5xl text-white sm:text-6xl">
            Kje smo
          </h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="eyebrow mb-6">Studio &amp; Showroom</p>
            <address className="not-italic">
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-serif text-xl text-foreground">
                    GOODWILL Ljubljana
                  </p>
                  <p className="mt-1 text-sm">Slomškova ulica 1</p>
                  <p className="text-sm">1000 Ljubljana, Slovenija</p>
                </div>
              </div>
            </address>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="tel:+38612345678"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="size-4 shrink-0" strokeWidth={1.5} />
                +386 1 234 5678
              </a>
              <a
                href="mailto:info@goodwill.si"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="size-4 shrink-0" strokeWidth={1.5} />
                info@goodwill.si
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-start gap-3 mb-6">
              <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
              <p className="eyebrow">Delovni čas</p>
            </div>
            <ul className="flex flex-col divide-y divide-beige">
              {hours.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between py-4 text-sm"
                >
                  <span className="text-muted-foreground">{h.day}</span>
                  <span
                    className={
                      h.time === "Zaprto" ? "text-muted-foreground" : ""
                    }
                  >
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="container-luxury pb-8">
        <Reveal>
          <div className="overflow-hidden rounded-2xl bg-beige aspect-video relative">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&auto=format&fit=crop"
              alt="Okolica GOODWILL studia"
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-warm-white/90 px-6 py-3 text-xs tracking-[0.2em] uppercase shadow-sm">
                Slomškova ulica 1, Ljubljana
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
