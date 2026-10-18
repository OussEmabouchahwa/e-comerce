import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Link href="/" className="font-serif text-2xl font-bold text-white">
            Marlow<span className="text-aqua">&amp;</span>Reed
          </Link>
          <p className="mt-4 text-sm max-w-xs leading-relaxed text-slate-400">
            Premium footwear, made in small batches in Porto and shipped worldwide.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 text-sm">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#shop" className="hover:text-white transition-colors">
                Men
              </Link>
            </li>
            <li>
              <Link href="#shop" className="hover:text-white transition-colors">
                Women
              </Link>
            </li>
            <li>
              <Link href="#shop" className="hover:text-white transition-colors">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="#shop" className="hover:text-white transition-colors">
                Sale
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 text-sm">Help</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#shop" className="hover:text-white transition-colors">
                Size guide
              </a>
            </li>
            <li>
              <a href="#shop" className="hover:text-white transition-colors">
                Shipping
              </a>
            </li>
            <li>
              <a href="#shop" className="hover:text-white transition-colors">
                Returns
              </a>
            </li>
            <li>
              <a href="#shop" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 text-sm">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#story" className="hover:text-white transition-colors">
                Our story
              </Link>
            </li>
            <li>
              <a href="#story" className="hover:text-white transition-colors">
                Resoling
              </a>
            </li>
            <li>
              <a href="#story" className="hover:text-white transition-colors">
                Careers
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Marlow &amp; Reed. All rights reserved.
      </div>
    </footer>
  );
}
