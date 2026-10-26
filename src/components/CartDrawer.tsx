"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();
  const freeShippingThreshold = 120;
  const progress = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - cartTotal);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="cart-drawer-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            overflow: "hidden",
            pointerEvents: "auto",
          }}
        >
          {/* Dark Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="cart-drawer-backdrop"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(17, 24, 39, 0.6)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              zIndex: 9999,
            }}
          />

          {/* Slide-over Panel anchored strictly to the right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="cart-drawer-panel"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              height: "100%",
              width: "100%",
              maxWidth: "440px",
              backgroundColor: "#ffffff",
              zIndex: 10000,
              boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.25)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand" />
                <h2 className="font-serif text-xl font-bold text-ink">Your Cart</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {cartCount} items
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-ink transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping bar */}
            <div className="px-6 py-3 bg-tint border-b border-slate-200">
              <p className="text-xs text-slate-600">
                {remainingForFree > 0 ? (
                  <>
                    Add <span className="font-bold text-brand">${remainingForFree.toFixed(0)}</span> more for{" "}
                    <span className="font-semibold text-ink">Free Shipping</span>!
                  </>
                ) : (
                  <span className="text-emerald-600 font-semibold">🎉 You unlocked Free Shipping!</span>
                )}
              </p>
              <div className="mt-2 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="font-serif text-lg font-semibold text-ink">Your cart is empty</p>
                  <p className="text-sm text-slate-500 mt-1">Discover handcrafted footwear ready for your feet.</p>
                  <button
                    onClick={closeCart}
                    className="mt-6 px-6 py-2.5 rounded-full bg-brand text-white font-semibold text-sm hover:bg-sky2 transition-colors cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}`}
                    className="pt-4 first:pt-0 pb-4 border-b border-slate-100 flex gap-4 items-center"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-tint border border-slate-200 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif font-semibold text-ink text-base">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500">Color:</span>
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-slate-300"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-slate-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="p-1.5 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-ink">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="p-1.5 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-ink text-sm">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-slate-200 px-6 py-4 bg-tint space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-bold text-ink">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Shipping</span>
                  <span className="text-slate-800 font-medium">
                    {remainingForFree === 0 ? "Free" : "$12.00"}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-bold text-ink">
                  <span>Total</span>
                  <span>
                    ${(cartTotal + (remainingForFree === 0 ? 0 : 12)).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => alert("Checkout flow will connect to your payment gateway / backend!")}
                  className="w-full py-3.5 px-4 rounded-full bg-brand hover:bg-sky2 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-xs text-slate-400">
                  Taxes calculated at checkout • 30-day money-back guarantee
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
