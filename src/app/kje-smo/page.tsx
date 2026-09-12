import type { Metadata } from "next";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Kje smo",
  description: "Obiščite GOODWILL pisarno v Ljubljani.",
};

const hoursOffice = [
  { day: "Ponedeljek – petek", time: "9:30 – 17:30" },
];

const locations = [
  {
    id: "office",
    name: "GOODWILL Pisarna",
    address: "Pražakova 8",
    city: "1000 Ljubljana, Slovenija",
    phone: "+386 1 234 5678",
    email: "info@goodwill.si",
    hours: hoursOffice,
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
            Obišči nas
          </h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <div className="max-w-md">
            {locations.map((location, idx) => (
              <Reveal key={location.id} delay={idx * 0.1}>
                <p className="eyebrow mb-6">Pisarna</p>
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
          <p className="eyebrow mb-12">Našo lokacijo najdete na</p>
          <Reveal>
            <div className="overflow-hidden rounded-2xl bg-beige h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.7551686876656!2d14.498629999999998!3d46.0505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d546c5d5d5d5d%3A0xf8c8c8c8c8c8c8c8!2sPra%C5%BEakova%208%2C%201000%20Ljubljana!5e0!3m2!1ssl!2ssi!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
