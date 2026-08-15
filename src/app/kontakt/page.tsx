import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Stopite v stik z ekipo studia GOODWILL.",
};

const info = [
  { icon: Mail, label: "info@goodwill.si" },
  { icon: Phone, label: "+386 1 234 5678" },
  { icon: MapPin, label: "Slomškova ulica 1, 1000 Ljubljana" },
];

export default function KontaktPage() {
  return (
    <div className="container-luxury pt-32 pb-24 sm:pt-40">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="eyebrow mb-4">Kontakt</p>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
            Z veseljem vas sli\u0161imo.
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">
            Za povpra\u0161anja o naro\u010dilih, nasvete glede velikosti ali tiskovna
            povpra\u0161anja stopite v stik z nami — na\u0161a ekipa odgovori v enem
            delovnem dnevu.
          </p>

          <ul className="mt-10 flex flex-col gap-4">
            {info.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <item.icon className="size-4" strokeWidth={1.5} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <form className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
                Ime
              </label>
              <Input required className="h-12 rounded-lg" />
            </div>
            <div>
              <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
                E-po\u0161ta
              </label>
              <Input type="email" required className="h-12 rounded-lg" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
              Zadeva
            </label>
            <Input required className="h-12 rounded-lg" />
          </div>
          <div>
            <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
              Sporo\u010dilo
            </label>
            <textarea
              required
              rows={5}
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>
          <Button
            type="submit"
            className="h-12 w-fit rounded-full px-8 text-xs tracking-[0.15em] uppercase"
          >
            Po\u0161lji sporo\u010dilo
          </Button>
        </form>
      </div>
    </div>
  );
}
