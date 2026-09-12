"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { Gender, Subcategory } from "@/lib/types";

interface FilterBarProProps {
  activeGender?: Gender;
  activeSubcategory?: Subcategory;
}

const GENDERS: { label: string; value: Gender }[] = [
  { label: "Ženske", value: "zenske" },
  { label: "Moški", value: "moski" },
];

const SUBCATEGORIES: { label: string; value: Subcategory }[] = [
  { label: "Majice", value: "majice" },
  { label: "Hlače", value: "hlace" },
  { label: "Puloverji", value: "pulover" },
  { label: "Krila", value: "krilo" },
  { label: "Dodatki", value: "dodatki" },
];

export function FilterBarPro({ activeGender, activeSubcategory }: FilterBarProProps) {
  const [mobileGenderOpen, setMobileGenderOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);

  const getHref = (gender?: Gender, subcategory?: Subcategory) => {
    const params = new URLSearchParams();
    if (gender) params.append("spol", gender);
    if (subcategory) params.append("kategorija", subcategory);
    const query = params.toString();
    return query ? `/izdelki?${query}` : "/izdelki";
  };

  return (
    <div className="mb-8">
      {/* Desktop View */}
      <div className="hidden sm:block">
        {/* Spol Filter */}
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3 font-medium">
            Spol
          </p>
          <div className="flex gap-2">
            <Link
              href="/izdelki"
              className={cn(
                "inline-flex items-center justify-center px-4 py-2 rounded-full text-xs tracking-widest uppercase font-medium transition-all duration-300 ease-out",
                !activeGender
                  ? "bg-charcoal text-white shadow-sm"
                  : "border border-charcoal/20 text-charcoal hover:border-charcoal/60 hover:bg-charcoal/5"
              )}
            >
              Vsi
            </Link>
            {GENDERS.map((gender) => (
              <Link
                key={gender.value}
                href={getHref(gender.value, undefined)}
                className={cn(
                  "inline-flex items-center justify-center px-4 py-2 rounded-full text-xs tracking-widest uppercase font-medium transition-all duration-300 ease-out",
                  activeGender === gender.value
                    ? "bg-charcoal text-white shadow-sm"
                    : "border border-charcoal/20 text-charcoal hover:border-charcoal/60 hover:bg-charcoal/5"
                )}
              >
                {gender.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Kategorije Filter */}
        {activeGender && (
          <div className="mb-8 animate-in fade-in duration-300">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3 font-medium">
              Kategorije
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href={getHref(activeGender, undefined)}
                className={cn(
                  "inline-flex items-center justify-center px-4 py-2 rounded-full text-xs tracking-widest uppercase font-medium transition-all duration-300 ease-out",
                  !activeSubcategory
                    ? "bg-charcoal text-white shadow-sm"
                    : "border border-charcoal/20 text-charcoal hover:border-charcoal/60 hover:bg-charcoal/5"
                )}
              >
                Vse
              </Link>
              {SUBCATEGORIES.map((sub) => (
                <Link
                  key={sub.value}
                  href={getHref(activeGender, sub.value)}
                  className={cn(
                    "inline-flex items-center justify-center px-4 py-2 rounded-full text-xs tracking-widest uppercase font-medium transition-all duration-300 ease-out",
                    activeSubcategory === sub.value
                      ? "bg-charcoal text-white shadow-sm"
                      : "border border-charcoal/20 text-charcoal hover:border-charcoal/60 hover:bg-charcoal/5"
                  )}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile View - Drawer Style */}
      <div className="sm:hidden space-y-3">
        {/* Gender Dropdown */}
        <div>
          <button
            onClick={() => setMobileGenderOpen(!mobileGenderOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal text-sm font-medium uppercase tracking-widest hover:border-charcoal/60 transition-colors"
          >
            <span>{activeGender ? (activeGender === "zenske" ? "Ženske" : "Moški") : "Izberi spol"}</span>
            <ChevronDown
              className={cn("size-4 transition-transform duration-300", mobileGenderOpen && "rotate-180")}
            />
          </button>
          {mobileGenderOpen && (
            <div className="mt-2 space-y-2 animate-in fade-in duration-200">
              <Link
                href="/izdelki"
                onClick={() => setMobileGenderOpen(false)}
                className="block px-4 py-2 rounded-lg border border-charcoal/20 text-center text-charcoal text-xs uppercase font-medium hover:bg-charcoal/5 transition-colors"
              >
                Vsi
              </Link>
              {GENDERS.map((gender) => (
                <Link
                  key={gender.value}
                  href={getHref(gender.value, undefined)}
                  onClick={() => setMobileGenderOpen(false)}
                  className={cn(
                    "block px-4 py-2 rounded-lg text-center text-xs uppercase font-medium transition-colors",
                    activeGender === gender.value
                      ? "bg-charcoal text-white"
                      : "border border-charcoal/20 text-charcoal hover:bg-charcoal/5"
                  )}
                >
                  {gender.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Subcategory Dropdown */}
        {activeGender && (
          <div className="animate-in fade-in duration-300">
            <button
              onClick={() => setMobileSubOpen(!mobileSubOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal text-sm font-medium uppercase tracking-widest hover:border-charcoal/60 transition-colors"
            >
              <span>
                {activeSubcategory
                  ? SUBCATEGORIES.find((s) => s.value === activeSubcategory)?.label
                  : "Izberi kategorijo"}
              </span>
              <ChevronDown
                className={cn("size-4 transition-transform duration-300", mobileSubOpen && "rotate-180")}
              />
            </button>
            {mobileSubOpen && (
              <div className="mt-2 space-y-2 animate-in fade-in duration-200">
                <Link
                  href={getHref(activeGender, undefined)}
                  onClick={() => setMobileSubOpen(false)}
                  className="block px-4 py-2 rounded-lg border border-charcoal/20 text-center text-charcoal text-xs uppercase font-medium hover:bg-charcoal/5 transition-colors"
                >
                  Vse
                </Link>
                {SUBCATEGORIES.map((sub) => (
                  <Link
                    key={sub.value}
                    href={getHref(activeGender, sub.value)}
                    onClick={() => setMobileSubOpen(false)}
                    className={cn(
                      "block px-4 py-2 rounded-lg text-center text-xs uppercase font-medium transition-colors",
                      activeSubcategory === sub.value
                        ? "bg-charcoal text-white"
                        : "border border-charcoal/20 text-charcoal hover:bg-charcoal/5"
                    )}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
