import Link from "next/link";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/lib/products";
import type { Category } from "@/lib/types";

const FILTERS: { label: string; value: Category | "all" }[] = [
  { label: "Vse", value: "all" },
  { label: CATEGORY_LABELS.zenske, value: "zenske" },
  { label: CATEGORY_LABELS.moski, value: "moski" },
  { label: CATEGORY_LABELS.majice, value: "majice" },
  { label: CATEGORY_LABELS.hlace, value: "hlace" },
  { label: CATEGORY_LABELS.pulover, value: "pulover" },
  { label: CATEGORY_LABELS.krilo, value: "krilo" },
  { label: CATEGORY_LABELS.dodatki, value: "dodatki" },
  { label: CATEGORY_LABELS.archive_sale, value: "archive_sale" },
  { label: CATEGORY_LABELS.arhiv, value: "arhiv" },
];

export function FilterBar({ active }: { active: string }) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
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
                "inline-flex items-center justify-center px-4 py-2 rounded-full text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 ease-out",
                isActive
                  ? "bg-charcoal text-white shadow-sm"
                  : "border border-charcoal/20 text-charcoal hover:border-charcoal/60 hover:bg-charcoal/5"
              )}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
