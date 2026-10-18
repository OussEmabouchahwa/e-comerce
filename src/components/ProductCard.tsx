"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import { motion } from "motion/react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

const tagStyles: Record<string, string> = {
  "Best Seller": "bg-butter text-ink",
  "New Arrival": "bg-brand text-white",
  Sale: "bg-ink text-white",
};

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, openCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  return (
    <article className="group flex flex-col justify-between">
      <div>
        {/* Product Image Container */}
        <div className="relative rounded-2xl overflow-hidden aspect-square img-fb">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Badge */}
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow-sm ${
              tagStyles[product.tag] || "bg-ink text-white"
            }`}
          >
            {product.tag}
          </span>

          {/* Wishlist Heart Button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur grid place-items-center transition-colors shadow-sm ${
              isLiked ? "text-red-500 fill-red-500" : "text-ink hover:text-brand"
            }`}
            aria-label={`Save ${product.name}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </motion.button>
        </div>

        {/* Title and Price */}
        <div className="mt-4 flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl font-semibold text-ink group-hover:text-brand transition-colors">
            {product.name}
          </h3>
          <p className="font-bold whitespace-nowrap text-ink">
            ${product.price}
            {product.originalPrice && (
              <s className="text-slate-400 font-normal text-sm ml-1.5">
                ${product.originalPrice}
              </s>
            )}
          </p>
        </div>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(product.rating) ? "fill-current" : "text-slate-300"
                }`}
              />
            ))}
          </div>
          <span>
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Color Swatches */}
        <div className="mt-3 flex gap-2 items-center" aria-label="Available Colors">
          {product.colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${
                selectedColor === color
                  ? "border-brand ring-2 ring-brand/30 scale-110"
                  : "border-slate-300 hover:scale-105"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleAddToCart}
        className={`pop mt-4 w-full h-11 rounded-full font-bold inline-flex items-center justify-center gap-2 text-sm shadow-sm transition-all cursor-pointer ${
          isAdded
            ? "bg-emerald-600 text-white"
            : "bg-brand hover:bg-sky2 text-white"
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-4 h-4" /> Added!
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </>
        )}
      </motion.button>
    </article>
  );
}
