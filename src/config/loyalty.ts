// Central loyalty configuration — change point values and tier thresholds here only.

export const LOYALTY_CONFIG = {
  tiers: [
    { key: "MEMBER" as const, label: "GOODWILL MEMBER", min: 0, max: 499 },
    { key: "GOLD" as const, label: "GOODWILL GOLD", min: 500, max: 1499 },
    { key: "ELITE" as const, label: "GOODWILL ELITE", min: 1500, max: Infinity },
  ],
  points: {
    registration: 100,
    firstPurchase: 100,
    perEuroSpent: 1,
    birthday: 100,
    newsletterSignup: 25,
    referral: 150,
  },
  benefits: {
    MEMBER: [
      "Zgodnji dostop do novih kolekcij",
      "Ekskluzivne novice za člane",
      "Rojstnodnevno presenečenje",
      "Personalizirane ponudbe",
    ],
    GOLD: [
      "Vse ugodnosti ravni MEMBER",
      "Zgodnji dostop do razprodaj",
      "Ekskluzivni popusti za člane",
      "Brezplačna dostava nad 80 €",
      "Posebne ponudbe za člane",
    ],
    ELITE: [
      "Vse ugodnosti ravni GOLD",
      "Prednostni dostop do kolekcij",
      "Ekskluzivni izdelki",
      "Posebna rojstnodnevna nagrada",
      "VIP ponudbe",
      "Brezplačna dostava",
    ],
  },
} as const;

export type TierKey = "MEMBER" | "GOLD" | "ELITE";

export function getTierKey(points: number): TierKey {
  if (points >= 1500) return "ELITE";
  if (points >= 500) return "GOLD";
  return "MEMBER";
}

export function getTierLabel(key: TierKey): string {
  return LOYALTY_CONFIG.tiers.find((t) => t.key === key)!.label;
}

export function getNextTier(key: TierKey): { key: TierKey; label: string; threshold: number } | null {
  if (key === "MEMBER") return { key: "GOLD", label: "GOODWILL GOLD", threshold: 500 };
  if (key === "GOLD") return { key: "ELITE", label: "GOODWILL ELITE", threshold: 1500 };
  return null;
}
