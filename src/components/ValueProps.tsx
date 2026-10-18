import React from "react";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

export function ValueProps() {
  const props = [
    {
      icon: Truck,
      title: "Free shipping",
      description: "On every order over $120, delivered in 2 to 4 business days.",
    },
    {
      icon: RotateCcw,
      title: "30-day returns",
      description: "Wear them around the house. If they don't fit, send them back free.",
    },
    {
      icon: ShieldCheck,
      title: "Authenticity guarantee",
      description: "Made by us, sold by us. Each pair ships with a numbered certificate.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid sm:grid-cols-3 gap-6">
        {props.map((prop, idx) => {
          const Icon = prop.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-4 p-6 rounded-2xl bg-tint border border-slate-100 hover:border-slate-200 transition-colors"
            >
              <Icon className="w-7 h-7 text-brand shrink-0" />
              <div>
                <h3 className="font-bold text-ink text-base">{prop.title}</h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
