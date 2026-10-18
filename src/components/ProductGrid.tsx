"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  const [filter, setFilter] = useState<string>("All");

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((p) => p.tag === filter);

  return (
    <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-ink">
            This season&apos;s favorites
          </h2>
          <p className="mt-3 text-slate-600">
            Six pairs our customers keep coming back for.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Filter Pills */}
          <div className="hidden sm:flex items-center gap-2 p-1 bg-tint rounded-full border border-slate-200 text-xs font-semibold">
            {["All", "Best Seller", "New Arrival", "Sale"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  filter === category
                    ? "bg-white text-ink shadow-sm"
                    : "text-slate-500 hover:text-ink"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <Link
            href="#shop"
            className="font-semibold text-brand hover:underline inline-flex items-center gap-1 text-sm sm:text-base"
          >
            View all footwear <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
