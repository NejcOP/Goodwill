import type { Metadata } from "next";
import Image from "next/image";
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
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info Section */}
            <div>
              {locations.map((location, idx) => (
                <Reveal key={location.id} delay={idx * 0.1}>
                  <p className="eyebrow mb-8">Pisarna</p>

                  {/* Location Card */}
                  <div className="mb-12 rounded-2xl border border-beige bg-warm-white p-8">
                    <address className="not-italic">
                      <div className="flex gap-4">
                        <div className="shrink-0 pt-1">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/10">
                            <MapPin className="size-5 text-charcoal" strokeWidth={1.5} />
                          </div>
                        </div>
                        <div>
                          <p className="font-serif text-lg font-semibold text-charcoal">
                            {location.name}
                          </p>
                          <p className="mt-3 text-sm text-muted-foreground">
                            {location.address}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {location.city}
                          </p>
                        </div>
                      </div>
                    </address>
                  </div>

                  {/* Contact Card */}
                  <div className="mb-8 space-y-4 rounded-2xl border border-beige bg-warm-white p-8">
                    <a
                      href={`tel:${location.phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/10 group-hover:bg-charcoal/20 transition-colors">
                        <Phone className="size-5 text-charcoal" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Telefon</p>
                        <p className="text-sm font-medium text-charcoal group-hover:underline">
                          {location.phone}
                        </p>
                      </div>
                    </a>
                    <a
                      href={`mailto:${location.email}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/10 group-hover:bg-charcoal/20 transition-colors">
                        <Mail className="size-5 text-charcoal" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Email</p>
                        <p className="text-sm font-medium text-charcoal group-hover:underline">
                          {location.email}
                        </p>
                      </div>
                    </a>
                  </div>

                  {/* Hours Card */}
                  <div className="rounded-2xl border border-beige bg-warm-white p-8">
                    <div className="flex gap-4">
                      <div className="shrink-0 pt-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/10">
                          <Clock className="size-5 text-charcoal" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-lg font-semibold text-charcoal mb-4">
                          Urnik
                        </p>
                        <ul className="space-y-3">
                          {location.hours.map((h) => (
                            <li
                              key={h.day}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-muted-foreground font-medium">
                                {h.day}
                              </span>
                              <span className="text-charcoal font-semibold">
                                {h.time}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Map Section */}
            <div>
              <Reveal delay={0.2}>
                <p className="eyebrow mb-8">Lokacija na zemljevidu</p>
                <div className="overflow-hidden rounded-2xl h-[500px] sticky top-8">
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
          </div>
        </div>
      </section>
    </div>
  );
}
