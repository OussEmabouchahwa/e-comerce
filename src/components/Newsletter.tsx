"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /^\S+@\S+\.\S+$/.test(email.trim());

    if (isValid) {
      setStatus("success");
      setMessage("Thanks! Check your inbox for your 10% discount code.");
      setEmail("");
    } else {
      setStatus("error");
      setMessage("Please enter a valid email address, like you@example.com.");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div className="rounded-[2rem] bg-brand text-white px-6 sm:px-14 py-12 grid md:grid-cols-2 gap-8 items-center shadow-xl">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold">
            Get 10% off your first pair
          </h2>
          <p className="mt-3 text-white/85 text-base leading-relaxed">
            Join for early access to new drops and care guides. One email a week, unsubscribe anytime.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            required
            placeholder="you@example.com"
            className="flex-1 h-12 rounded-full px-5 text-ink bg-white outline-none focus-visible:ring-4 ring-butter placeholder-slate-400 text-sm"
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="pop h-12 px-7 rounded-full bg-butter text-ink font-bold hover:bg-white text-sm shrink-0 shadow transition-colors cursor-pointer"
          >
            Subscribe
          </motion.button>
        </form>
      </div>

      {status !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center justify-center gap-2 text-sm text-center mt-3 h-6 font-medium ${
            status === "success" ? "text-emerald-600" : "text-red-500"
          }`}
          role="status"
        >
          {status === "success" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span>{message}</span>
        </motion.div>
      )}
    </section>
  );
}
