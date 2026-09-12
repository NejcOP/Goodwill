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

const hoursOffice = [
  { day: "Ponedeljek – petek", time: "9:30 – 17:30" },
];

const locations = [
  {
    id: "showroom",
    name: "GOODWILL Ljubljana",
    address: "Slomškova ulica 1",
    city: "1000 Ljubljana, Slovenija",
    phone: "+386 1 234 5678",
    email: "info@goodwill.si",
    hours: hours,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&auto=format&fit=crop",
    mapImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&auto=format&fit=crop",
    mapLabel: "Slomškova ulica 1, Ljubljana",
  },
  {
    id: "office",
    name: "GOODWILL Pisarna",
    address: "Pražakova 8",
    city: "1000 Ljubljana, Slovenija",
    phone: "+386 1 234 5678",
    email: "info@goodwill.si",
    hours: hoursOffice,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&auto=format&fit=crop",
    mapImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&auto=format&fit=crop",
    mapLabel: "Pražakova 8, Ljubljana",
  },
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
        <div className="container-luxury">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            {locations.map((location, idx) => (
              <Reveal key={location.id} delay={idx * 0.1}>
                <p className="eyebrow mb-6">
                  {location.id === "showroom" ? "Studio & Showroom" : "Pisarna"}
                </p>
                <address className="not-italic">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="font-serif text-xl text-foreground">
                        {location.name}
                      </p>
                      <p className="mt-1 text-sm">{location.address}</p>
                      <p className="text-sm">{location.city}</p>
                    </div>
                  </div>
                </address>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={`tel:${location.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="size-4 shrink-0" strokeWidth={1.5} />
                    {location.phone}
                  </a>
                  <a
                    href={`mailto:${location.email}`}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="size-4 shrink-0" strokeWidth={1.5} />
                    {location.email}
                  </a>
                </div>

                <div className="mt-10 flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="font-medium text-foreground mb-3">Urnik</p>
                    <ul className="flex flex-col divide-y divide-beige">
                      {location.hours.map((h) => (
                        <li
                          key={h.day}
                          className="flex items-center justify-between py-2 text-sm"
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
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <p className="eyebrow mb-8">Našo lokacijo najdete na</p>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {locations.map((location) => (
              <Reveal key={`map-${location.id}`}>
                <div className="overflow-hidden rounded-2xl bg-beige aspect-video relative">
                  <Image
                    src={location.mapImage}
                    alt={`Lokacija ${location.mapLabel}`}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-warm-white/90 px-6 py-3 text-xs tracking-[0.2em] uppercase shadow-sm">
                      {location.mapLabel}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
