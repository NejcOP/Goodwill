"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  Star,
  User,
  MapPin,
  Mail,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { getTierKey, getTierLabel } from "@/config/loyalty";

const NAV = [
  { label: "Pregled", href: "/account", icon: LayoutDashboard, exact: true },
  { label: "Moji nakupi", href: "/account/nakupi", icon: ShoppingBag },
  { label: "Moje želje", href: "/account/zelje", icon: Heart },
  { label: "Moje ugodnosti", href: "/account/ugodnosti", icon: Star },
  { label: "Moj profil", href: "/account/profil", icon: User },
  { label: "Naslovi", href: "/account/naslovi", icon: MapPin },
  { label: "Novice", href: "/account/novice", icon: Mail },
  { label: "Napotitve", href: "/account/napotitve", icon: Users },
  { label: "Nastavitve", href: "/account/nastavitve", icon: Settings },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const tierKey = user ? getTierKey(user.points) : "MEMBER";
  const tierLabel = getTierLabel(tierKey);

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <aside className="flex flex-col">
      {/* Membership badge */}
      <div className="mb-8 border-b border-border/40 pb-8">
        <p className="eyebrow mb-1">GOODWILL</p>
        <p
          className={cn(
            "font-serif text-lg",
            tierKey === "ELITE" && "text-bronze",
            tierKey === "GOLD" && "text-amber-600"
          )}
        >
          {tierLabel.replace("GOODWILL ", "")}
        </p>
        {user && (
          <p className="mt-1 text-sm text-muted-foreground">
            {user.firstName} {user.lastName}
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
            >
              <item.icon className="size-4 shrink-0" strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
        >
          <LogOut className="size-4 shrink-0" strokeWidth={1.5} />
          Odjava
        </button>
      </nav>
    </aside>
  );
}

// Mobile top nav strip
export function AccountMobileNav() {
  const pathname = usePathname();

  return (
    <div className="mb-8 -mx-6 sm:-mx-10 overflow-x-auto border-b border-border/40">
      <nav className="flex min-w-max gap-1 px-6 sm:px-10">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-xs tracking-[0.08em] uppercase transition-colors",
                active
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="size-3.5" strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
