import Link from "next/link";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/lib/products";
import type { Category } from "@/lib/types";

const FILTERS: { label: string; value: Category | "all" }[] = [
  { label: "Vse", value: "all" },
  { label: CATEGORY_LABELS.zenske, value: "zenske" },
  { label: CATEGORY_LABELS.moski, value: "moski" },
  { label: CATEGORY_LABELS.dodatki, value: "dodatki" },
  { label: CATEGORY_LABELS.arhiv, value: "arhiv" },
];

export function FilterBar({ active }: { active: string }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-beige pb-6">
      {FILTERS.map((filter) => {
        const isActive = active === filter.value;
        const href =
          filter.value === "all"
            ? "/izdelki"
            : `/izdelki?kategorija=${filter.value}`;
        return (
          <Link
            key={filter.value}
            href={href}
            className={cn(
              "text-xs tracking-[0.15em] uppercase transition-colors",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {filter.label}
          </Link>
        );
      })}
    </div>
  );
}
