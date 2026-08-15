import Link from "next/link";
import { AtSign, Globe } from "lucide-react";

const columns = [
  {
    title: "Izdelki",
    links: [
      { label: "Ženske", href: "/izdelki?kategorija=zenske" },
      { label: "Moški", href: "/izdelki?kategorija=moski" },
      { label: "Dodatki", href: "/izdelki?kategorija=dodatki" },
      { label: "Arhiv", href: "/izdelki?kategorija=arhiv" },
    ],
  },
  {
    title: "O nas",
    links: [
      { label: "Naša zgodba", href: "/o-nas" },
      { label: "Trajnost", href: "/o-nas#materiali" },
      { label: "Kontakt", href: "/kontakt" },
      { label: "Kje smo", href: "/kje-smo" },
    ],
  },
  {
    title: "Podpora",
    links: [
      { label: "Dostava in vračila", href: "/kontakt" },
      { label: "Vodnik po velikostih", href: "/kontakt" },
      { label: "Pogosta vprašanja", href: "/kontakt" },
      { label: "Sledenje naročilu", href: "/kontakt" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-beige bg-warm-white">
      <div className="container-luxury grid grid-cols-2 gap-10 py-20 sm:py-24 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <p className="font-serif text-3xl tracking-[0.15em]">GOODWILL</p>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Udobni luksuz. Naravni materiali, narejeni za dolgo življenjsko
            dobo — zasnovani med skandinavsko umirjenostjo in avstralsko
            obalno svetlobo.
          </p>
          <div className="mt-6 flex items-center gap-4 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-foreground">
              <AtSign className="size-5" strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-foreground">
              <Globe className="size-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow mb-4">{col.title}</p>
            <ul className="flex flex-col gap-3 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-underline text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-beige">
        <div className="container-luxury flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} GOODWILL. Vse pravice pridržane.</p>
          <div className="flex gap-6">
            <Link href="/kontakt" className="hover:text-foreground">
              Zasebnost
            </Link>
            <Link href="/kontakt" className="hover:text-foreground">
              Pogoji
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
