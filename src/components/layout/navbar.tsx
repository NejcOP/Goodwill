"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SearchDialog } from "@/components/layout/search-dialog";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Domov", href: "/" },
  { label: "Izdelki", href: "/izdelki" },
  { label: "O nas", href: "/o-nas" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Kje smo", href: "/kje-smo" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalCount, openCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          transparent
            ? "bg-transparent py-6"
            : "bg-background/95 py-4 shadow-[0_1px_0_0_var(--beige)] backdrop-blur-sm"
        )}
      >
        <div className="container-luxury flex items-center justify-between">
          <button
            aria-label="Odpri meni"
            onClick={() => setMobileOpen(true)}
            className={cn(
              "flex items-center gap-2 lg:hidden",
              transparent ? "text-white" : "text-foreground"
            )}
          >
            <Menu className="size-5" strokeWidth={1.5} />
          </button>

          <Link
            href="/"
            className={cn(
              "font-serif text-xl tracking-[0.2em] transition-colors",
              transparent ? "text-white" : "text-foreground"
            )}
          >
            GOODWILL
          </Link>

          <nav
            className={cn(
              "hidden items-center gap-8 text-xs tracking-[0.15em] uppercase lg:flex",
              transparent ? "text-white" : "text-foreground"
            )}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline pb-0.5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div
            className={cn(
              "flex items-center gap-5",
              transparent ? "text-white" : "text-foreground"
            )}
          >
            <button aria-label="Iskanje" onClick={() => setSearchOpen(true)}>
              <Search className="size-[18px]" strokeWidth={1.5} />
            </button>
            <Link
              href={user ? "/account" : "/racun"}
              aria-label={user ? "Moj račun" : "Prijava"}
              className="relative hidden sm:block"
            >
              <User className="size-[18px]" strokeWidth={1.5} />
              {user && (
                <span className="absolute -top-1.5 -right-1.5 size-2 rounded-full bg-bronze" />
              )}
            </Link>
            <button
              aria-label="Odpri košarico"
              onClick={openCart}
              className="relative"
            >
              <ShoppingBag className="size-[18px]" strokeWidth={1.5} />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-bronze text-[10px] text-white">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-4/5 bg-warm-white">
          <SheetTitle className="sr-only">Meni</SheetTitle>
          <nav className="flex flex-col gap-6 px-6 py-16 text-lg font-serif">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={user ? "/account" : "/racun"}
              onClick={() => setMobileOpen(false)}
              className="mt-4 text-sm tracking-[0.1em] text-muted-foreground uppercase"
            >
              {user ? "Moj račun" : "Prijava"}
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <CartDrawer />
    </>
  );
}
