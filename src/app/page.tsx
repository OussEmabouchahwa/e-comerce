"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  Search,
  User,
  ShoppingBag,
  ArrowRight,
  ArrowUpRight,
  Star,
  ChevronRight,
  Heart,
  Leaf,
  Hammer,
  Footprints,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider, useCart } from "@/context/CartContext";

interface ProductItem {
  id: string;
  n: string;
  t: "Best Seller" | "New Arrival" | "Sale";
  p: number;
  o?: number;
  r: number;
  c: number;
  img: string;
  col: string[];
}

const productsData: ProductItem[] = [
  {
    id: "aero-runner",
    n: "Aero Runner",
    t: "Best Seller",
    p: 128,
    r: 4.8,
    c: 342,
    img: "photo-1542291026-7eec264c27ff",
    col: ["#C8372D", "#111827", "#F8FAFC"],
  },
  {
    id: "court-low",
    n: "Court Low",
    t: "New Arrival",
    p: 149,
    r: 4.9,
    c: 210,
    img: "photo-1549298916-b41d501d3772",
    col: ["#F8FAFC", "#B8A58A", "#111827"],
  },
  {
    id: "strata-high",
    n: "Strata High",
    t: "Best Seller",
    p: 165,
    r: 4.7,
    c: 187,
    img: "photo-1600185365926-3a2ce3cdb9eb",
    col: ["#111827", "#2373F4", "#F8FAFC"],
  },
  {
    id: "studio-trainer",
    n: "Studio Trainer",
    t: "New Arrival",
    p: 139,
    r: 4.6,
    c: 96,
    img: "photo-1525966222134-fcfa99b8ae77",
    col: ["#111827", "#8A8F98"],
  },
  {
    id: "pacer-02",
    n: "Pacer 02",
    t: "Sale",
    p: 99,
    o: 130,
    r: 4.7,
    c: 421,
    img: "photo-1491553895911-0055eca6402d",
    col: ["#65D0F4", "#F2F7A0", "#111827"],
  },
  {
    id: "terrace-classic",
    n: "Terrace Classic",
    t: "Best Seller",
    p: 119,
    r: 4.8,
    c: 268,
    img: "photo-1460353581641-37baddab0fa2",
    col: ["#F8FAFC", "#578EF5", "#111827"],
  },
];

const tagCls: Record<string, string> = {
  "Best Seller": "bg-butter text-ink",
  "New Arrival": "bg-brand text-white",
  Sale: "bg-ink text-white",
};

function StorePage() {
  const { cartCount, openCart, addToCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleAddToCart = (product: ProductItem) => {
    addToCart({
      id: product.id,
      name: product.n,
      tag: product.t,
      price: product.p,
      originalPrice: product.o,
      rating: product.r,
      reviewCount: product.c,
      image: `https://images.unsplash.com/${product.img}?auto=format&fit=crop&w=900&q=80`,
      alt: `${product.n} sneaker`,
      colors: product.col,
    });

    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);

    // Open side drawer to immediately display selected items
    openCart();
  };

  const toggleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    const v = newsletterEmail.trim();
    if (/^\S+@\S+\.\S+$/.test(v)) {
      setNewsletterMsg("Thanks. Check your inbox for your 10% code.");
      setNewsletterEmail("");
    } else {
      setNewsletterMsg("Enter a valid email address, like you@example.com.");
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-ink text-white text-sm text-center py-2 px-4">
        Free shipping on orders over $120. Free returns for 30 days.
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4 lg:gap-8">
          <button
            className="lg:hidden p-2 -ml-2"
            aria-label="Open menu"
            id="menuBtn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <a
            href="#"
            className="font-serif text-2xl font-bold tracking-tight whitespace-nowrap"
          >
            Marlow<span className="text-brand">&amp;</span>Reed
          </a>
          <nav
            className="hidden lg:flex items-center gap-7 text-[15px] font-semibold"
            aria-label="Main"
          >
            <a href="#shop" className="hover:text-brand">
              Men
            </a>
            <a href="#shop" className="hover:text-brand">
              Women
            </a>
            <a href="#shop" className="hover:text-brand">
              New Arrivals
            </a>
            <a href="#shop" className="text-brand">
              Sale
            </a>
          </nav>
          <form
            className="hidden md:flex flex-1 max-w-md ml-auto items-center bg-tint border border-slate-200 rounded-full px-4 h-10 focus-within:border-brand"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="search"
              placeholder="Search sneakers, boots, loafers"
              className="bg-transparent flex-1 ml-2 text-sm outline-none"
              aria-label="Search"
            />
          </form>
          <div className="flex items-center gap-1 ml-auto md:ml-0">
            <button className="md:hidden p-2" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:text-brand" aria-label="Account">
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={openCart}
              className="relative p-2 hover:text-brand cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span
                id="cartCount"
                className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-brand text-white text-[11px] font-bold grid place-items-center"
              >
                {cartCount}
              </span>
            </button>
          </div>
        </div>
        <nav
          id="mobileNav"
          className={`${
            mobileMenuOpen ? "flex" : "hidden"
          } lg:hidden border-t border-slate-200 px-4 py-3 flex-col gap-3 font-semibold`}
          aria-label="Mobile"
        >
          <a href="#shop" onClick={() => setMobileMenuOpen(false)}>
            Men
          </a>
          <a href="#shop" onClick={() => setMobileMenuOpen(false)}>
            Women
          </a>
          <a href="#shop" onClick={() => setMobileMenuOpen(false)}>
            New Arrivals
          </a>
          <a
            href="#shop"
            onClick={() => setMobileMenuOpen(false)}
            className="text-brand"
          >
            Sale
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-tint overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 items-center py-14 lg:py-20">
            <div className="lg:col-span-6">
              <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-semibold leading-[1.05] tracking-tight">
                Shoes made to be worn down slowly.
              </h1>
              <p className="mt-6 text-lg text-slate-600 max-w-md leading-relaxed">
                Full-grain leather, hand-lasted soles and a footbed that fits by the
                second week. Built in small batches, sold without the markup.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#shop"
                  className="pop inline-flex items-center gap-2 bg-brand hover:bg-sky2 text-white font-bold px-7 py-3.5 rounded-full"
                >
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#story"
                  className="font-semibold underline underline-offset-4 decoration-aqua decoration-2 hover:text-brand"
                >
                  How we make them
                </a>
              </div>
              <div className="mt-10 flex items-center gap-3 text-sm text-slate-600">
                <div className="flex text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span>4.8 from 12,400 verified reviews</span>
              </div>
            </div>
            <div className="lg:col-span-6 relative">
              <div
                className="absolute -right-6 -top-6 w-3/4 h-5/6 bg-butter rounded-[2rem]"
                aria-hidden="true"
              ></div>
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] sm:aspect-[5/5] img-fb shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80"
                  alt="Red running sneaker photographed on a clean background"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-4 sm:left-8 bg-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-4">
                <div>
                  <p className="font-serif text-lg font-semibold leading-tight">
                    The Aero Runner
                  </p>
                  <p className="text-sm text-slate-500">From $128</p>
                </div>
                <a
                  href="#shop"
                  className="w-10 h-10 rounded-full bg-ink text-white grid place-items-center"
                  aria-label="View Aero Runner"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight">
                This season&apos;s favorites
              </h2>
              <p className="mt-3 text-slate-600">
                Six pairs our customers keep coming back for.
              </p>
            </div>
            <a
              href="#"
              className="font-semibold text-brand hover:underline inline-flex items-center gap-1"
            >
              View all footwear <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div
            id="grid"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
          >
            {productsData.map((x) => {
              const isAdded = !!addedItemMap[x.id];
              const isLiked = !!likedMap[x.id];
              return (
                <article key={x.id} className="group">
                  <div className="relative rounded-2xl overflow-hidden aspect-square img-fb">
                    <img
                      src={`https://images.unsplash.com/${x.img}?auto=format&fit=crop&w=900&q=80`}
                      alt={`${x.n} sneaker`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${tagCls[x.t]}`}
                    >
                      {x.t}
                    </span>
                    <button
                      onClick={() => toggleLike(x.id)}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 grid place-items-center hover:text-brand cursor-pointer ${
                        isLiked ? "text-red-500" : ""
                      }`}
                      aria-label={`Save ${x.n}`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                      />
                    </button>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <h3 className="font-serif text-xl font-semibold">{x.n}</h3>
                    <p className="font-bold whitespace-nowrap">
                      ${x.p}
                      {x.o ? (
                        <s className="text-slate-400 font-normal text-sm ml-1.5">
                          ${x.o}
                        </s>
                      ) : null}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                    <span className="flex text-amber-500">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(x.r) ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    </span>
                    {x.r} ({x.c})
                  </div>
                  <div className="mt-3 flex gap-2" aria-label="Colors">
                    {x.col.map((c, i) => (
                      <span
                        key={i}
                        className="swatch"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => handleAddToCart(x)}
                    className="pop mt-4 w-full h-11 rounded-full bg-brand hover:bg-sky2 text-white font-bold inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isAdded ? (
                      "Added"
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                      </>
                    )}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* Story */}
        <section id="story" className="bg-ink text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] img-fb mt-10">
                <img
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
                  alt="Pair of sneakers resting on a pale floor"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] img-fb">
                <img
                  src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
                  alt="Close view of a sneaker sole and stitching"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
                Every pair starts with the leather.
              </h2>
              <p className="mt-5 text-slate-300 leading-relaxed max-w-lg">
                We buy from two tanneries that use vegetable tanning, so each
                hide ages with its own patina. The rest follows from that:
                stitching that can be resoled, and insoles you can replace.
              </p>
              <dl className="mt-9 space-y-6">
                <div className="flex gap-4">
                  <span className="shrink-0 w-11 h-11 rounded-full bg-butter text-ink grid place-items-center">
                    <Leaf className="w-5 h-5" />
                  </span>
                  <div>
                    <dt className="font-bold">Full-grain leather</dt>
                    <dd className="text-slate-400 text-sm mt-1">
                      Italian hides, tanned in vegetable extracts. No corrected
                      surface, no plastic coating.
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="shrink-0 w-11 h-11 rounded-full bg-aqua text-ink grid place-items-center">
                    <Hammer className="w-5 h-5" />
                  </span>
                  <div>
                    <dt className="font-bold">Hand-lasted construction</dt>
                    <dd className="text-slate-400 text-sm mt-1">
                      Cemented and stitched by 40 makers in Porto, then resoled
                      for a fraction of the price of new.
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="shrink-0 w-11 h-11 rounded-full bg-sky2 text-white grid place-items-center">
                    <Footprints className="w-5 h-5" />
                  </span>
                  <div>
                    <dt className="font-bold">Comfort from day one</dt>
                    <dd className="text-slate-400 text-sm mt-1">
                      Cork and memory-foam footbed with arch support, tested on
                      600 wearers before release.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Value props */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-tint">
              <Truck className="w-7 h-7 text-brand shrink-0" />
              <div>
                <h3 className="font-bold">Free shipping</h3>
                <p className="text-sm text-slate-600 mt-1">
                  On every order over $120, delivered in 2 to 4 business days.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-tint">
              <RotateCcw className="w-7 h-7 text-brand shrink-0" />
              <div>
                <h3 className="font-bold">30-day returns</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Wear them around the house. If they don&apos;t fit, send them back
                  free.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-tint">
              <ShieldCheck className="w-7 h-7 text-brand shrink-0" />
              <div>
                <h3 className="font-bold">Authenticity guarantee</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Made by us, sold by us. Each pair ships with a numbered
                  certificate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-tint">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight max-w-xl">
              What people say after a few months
            </h2>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              <figure className="bg-white rounded-2xl p-7 border border-slate-200">
                <div className="flex text-amber-500 mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <blockquote className="leading-relaxed">
                  Wore the Court Low to a 9-hour wedding and my feet were fine.
                  The leather has creased nicely and still looks sharp.
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 text-sm">
                  <span className="w-9 h-9 rounded-full bg-butter grid place-items-center font-bold">
                    DM
                  </span>
                  <span>
                    <b>Daniel M.</b>
                    <br />
                    <span className="text-slate-500">
                      Chicago, verified buyer
                    </span>
                  </span>
                </figcaption>
              </figure>
              <figure className="bg-white rounded-2xl p-7 border border-slate-200">
                <div className="flex text-amber-500 mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <blockquote className="leading-relaxed">
                  I sized down half a size after reading the fit notes and it was
                  right. Returns are painless, but I didn&apos;t need them.
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 text-sm">
                  <span className="w-9 h-9 rounded-full bg-aqua grid place-items-center font-bold">
                    PA
                  </span>
                  <span>
                    <b>Priya A.</b>
                    <br />
                    <span className="text-slate-500">London, verified buyer</span>
                  </span>
                </figcaption>
              </figure>
              <figure className="bg-white rounded-2xl p-7 border border-slate-200">
                <div className="flex text-amber-500 mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4" />
                </div>
                <blockquote className="leading-relaxed">
                  Second pair I&apos;ve bought. The first got resoled after two
                  years of daily wear. Only wish there were more colors.
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 text-sm">
                  <span className="w-9 h-9 rounded-full bg-sky2 text-white grid place-items-center font-bold">
                    TO
                  </span>
                  <span>
                    <b>Tomás O.</b>
                    <br />
                    <span className="text-slate-500">Madrid, verified buyer</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="rounded-[2rem] bg-brand text-white px-6 sm:px-14 py-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold">
                Get 10% off your first pair
              </h2>
              <p className="mt-3 text-white/85">
                Join for early access to new drops and care guides. One email a
                week, unsubscribe anytime.
              </p>
            </div>
            <form
              id="nl"
              className="flex flex-col sm:flex-row gap-3"
              noValidate
              onSubmit={handleNewsletter}
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 h-12 rounded-full px-5 text-ink outline-none focus-visible:ring-4 ring-butter"
              />
              <button className="pop h-12 px-7 rounded-full bg-butter text-ink font-bold hover:bg-white cursor-pointer">
                Subscribe
              </button>
            </form>
          </div>
          <p
            id="nlMsg"
            className="text-sm text-center mt-3 text-slate-600 h-5"
            role="status"
          >
            {newsletterMsg}
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-ink text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <a href="#" className="font-serif text-2xl font-bold text-white">
              Marlow<span className="text-aqua">&amp;</span>Reed
            </a>
            <p className="mt-4 text-sm max-w-xs leading-relaxed">
              Premium footwear, made in small batches in Porto and shipped
              worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#shop" className="hover:text-white">
                  Men
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white">
                  Women
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white">
                  Sale
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#shop" className="hover:text-white">
                  Size guide
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white">
                  Returns
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#story" className="hover:text-white">
                  Our story
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white">
                  Resoling
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-slate-400">
          &copy; 2026 Marlow &amp; Reed. All rights reserved.
        </div>
      </footer>

      {/* Cart Drawer with smooth Motion animations */}
      <CartDrawer />
    </>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <StorePage />
    </CartProvider>
  );
}
