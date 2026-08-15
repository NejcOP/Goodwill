import { Star } from "lucide-react";
import type { Review } from "@/lib/types";

const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Amelia H.",
    rating: 5,
    date: "pred 2 tednoma",
    title: "To\u010dno tako, kot je opisano",
    body: "Tkanina je v \u017eivo \u0161e lep\u0161a. Ustreza velikosti in padec je \u010dudovit.",
  },
  {
    id: "r2",
    author: "James T.",
    rating: 5,
    date: "pred mesecem",
    title: "Vredno vsake\u0161a centa",
    body: "Razliko v kakovosti \u010dutite takoj. Ta kos bo zdržal leta.",
  },
  {
    id: "r3",
    author: "Sofia R.",
    rating: 4,
    date: "pred 2 mesecema",
    title: "Lep, premi\u0161ljen kos",
    body: "Kroj je nekoliko bo\u017ee, kot sem pri\u010dakovala, a kakovost je nesporna.",
  },
];

export function Reviews({
  rating,
  reviewCount,
}: {
  rating?: number;
  reviewCount?: number;
}) {
  return (
    <div>
      <div className="mb-10 flex items-center gap-4">
        <h2 className="font-serif text-3xl">Mnenja</h2>
        {rating && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="size-4 fill-bronze text-bronze" />
            {rating} · {reviewCount} mnenj
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {MOCK_REVIEWS.map((review) => (
          <div key={review.id}>
            <div className="mb-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < review.rating
                      ? "size-3.5 fill-bronze text-bronze"
                      : "size-3.5 text-beige"
                  }
                />
              ))}
            </div>
            <p className="font-serif text-lg">{review.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{review.body}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              {review.author} · {review.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
