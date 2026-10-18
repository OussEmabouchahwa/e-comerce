"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { openCart, cartCount } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4 lg:gap-8">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 -ml-2 text-ink hover:text-brand transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-tight whitespace-nowrap text-ink"
        >
          Marlow<span className="text-brand">&amp;</span>Reed
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-semibold" aria-label="Main">
          <Link href="#shop" className="hover:text-brand transition-colors">
            Men
          </Link>
          <Link href="#shop" className="hover:text-brand transition-colors">
            Women
          </Link>
          <Link href="#shop" className="hover:text-brand transition-colors">
            New Arrivals
          </Link>
          <Link href="#shop" className="text-brand hover:underline transition-colors">
            Sale
          </Link>
        </nav>

        {/* Search Bar - Desktop */}
        <form
          className="hidden md:flex flex-1 max-w-md ml-auto items-center bg-tint border border-slate-200 rounded-full px-4 h-10 focus-within:border-brand transition-all"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            const elem = document.getElementById("shop");
            if (elem) elem.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sneakers, boots, loafers"
            className="bg-transparent flex-1 ml-2 text-sm outline-none text-ink placeholder-slate-400"
            aria-label="Search"
          />
        </form>

        {/* Action icons */}
        <div className="flex items-center gap-1 ml-auto md:ml-0">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 text-ink hover:text-brand transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => alert("User authentication will connect to PostgreSQL & NextAuth/Clerk!")}
            className="p-2 text-ink hover:text-brand transition-colors"
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={openCart}
            className="relative p-2 text-ink hover:text-brand transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-brand text-white text-[11px] font-bold grid place-items-center transition-transform scale-100">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Expandable */}
      {searchOpen && (
        <div className="md:hidden px-4 py-3 bg-tint border-t border-slate-200">
          <div className="flex items-center bg-white border border-slate-300 rounded-full px-4 h-10">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="search"
              placeholder="Search sneakers, boots, loafers"
              className="bg-transparent flex-1 ml-2 text-sm outline-none text-ink"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          className="lg:hidden border-t border-slate-200 px-4 py-3 flex flex-col gap-3 font-semibold bg-white"
          aria-label="Mobile"
        >
          <Link
            href="#shop"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-brand transition-colors py-1"
          >
            Men
          </Link>
          <Link
            href="#shop"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-brand transition-colors py-1"
          >
            Women
          </Link>
          <Link
            href="#shop"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-brand transition-colors py-1"
          >
            New Arrivals
          </Link>
          <Link
            href="#shop"
            onClick={() => setMobileMenuOpen(false)}
            className="text-brand hover:underline transition-colors py-1"
          >
            Sale
          </Link>
        </nav>
      )}
    </header>
  );
}
