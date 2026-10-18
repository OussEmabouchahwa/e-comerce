"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="bg-tint overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 items-center py-14 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6"
        >
          <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-semibold leading-[1.05] tracking-tight text-ink">
            Shoes made to be worn down slowly.
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-md leading-relaxed">
            Full-grain leather, hand-lasted soles and a footbed that fits by the second week.
            Built in small batches, sold without the markup.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#shop"
              className="pop inline-flex items-center gap-2 bg-brand hover:bg-sky2 text-white font-bold px-7 py-3.5 rounded-full shadow-md"
            >
              Explore Collection <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#story"
              className="font-semibold underline underline-offset-4 decoration-aqua decoration-2 hover:text-brand transition-colors text-ink"
            >
              How we make them
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm text-slate-600">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span>4.8 from 12,400 verified reviews</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-6 relative"
        >
          {/* Decorative background shape */}
          <div
            className="absolute -right-6 -top-6 w-3/4 h-5/6 bg-butter rounded-[2rem]"
            aria-hidden="true"
          />
          
          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] sm:aspect-[5/5] img-fb shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80"
              alt="Red running sneaker photographed on a clean background"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Floating Product Badge */}
          <div className="absolute -bottom-5 left-4 sm:left-8 bg-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-4 border border-slate-100">
            <div>
              <p className="font-serif text-lg font-semibold leading-tight text-ink">
                The Aero Runner
              </p>
              <p className="text-sm text-slate-500">From $128</p>
            </div>
            <Link
              href="#shop"
              className="w-10 h-10 rounded-full bg-ink text-white grid place-items-center hover:bg-brand transition-colors"
              aria-label="View Aero Runner"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
