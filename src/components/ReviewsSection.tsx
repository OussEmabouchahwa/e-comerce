import React from "react";
import { Star } from "lucide-react";
import { reviews } from "@/data/products";

export function ReviewsSection() {
  return (
    <section className="bg-tint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight max-w-xl text-ink">
          What people say after a few months
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <figure
              key={rev.id}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? "fill-current" : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="text-slate-800 leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </blockquote>
              </div>

              <figcaption className="mt-6 flex items-center gap-3 text-sm">
                <span
                  className={`w-9 h-9 rounded-full grid place-items-center font-bold text-xs shrink-0 ${rev.badgeBg}`}
                >
                  {rev.badgeInitials}
                </span>
                <span>
                  <strong className="text-ink">{rev.author}</strong>
                  <br />
                  <span className="text-slate-500 text-xs">{rev.location}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
