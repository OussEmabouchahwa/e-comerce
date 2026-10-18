import React from "react";
import Image from "next/image";
import { Leaf, Hammer, Footprints } from "lucide-react";

export function StorySection() {
  return (
    <section id="story" className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        {/* Images Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] img-fb mt-10">
            <Image
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
              alt="Pair of sneakers resting on a pale floor"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] img-fb">
            <Image
              src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
              alt="Close view of a sneaker sole and stitching"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Narrative & Specifications */}
        <div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
            Every pair starts with the leather.
          </h2>
          <p className="mt-5 text-slate-300 leading-relaxed max-w-lg">
            We buy from two tanneries that use vegetable tanning, so each hide ages with its own patina.
            The rest follows from that: stitching that can be resoled, and insoles you can replace.
          </p>

          <dl className="mt-9 space-y-6">
            <div className="flex gap-4 items-start">
              <span className="shrink-0 w-11 h-11 rounded-full bg-butter text-ink grid place-items-center shadow">
                <Leaf className="w-5 h-5" />
              </span>
              <div>
                <dt className="font-bold text-base">Full-grain leather</dt>
                <dd className="text-slate-400 text-sm mt-1 leading-relaxed">
                  Italian hides, tanned in vegetable extracts. No corrected surface, no plastic coating.
                </dd>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="shrink-0 w-11 h-11 rounded-full bg-aqua text-ink grid place-items-center shadow">
                <Hammer className="w-5 h-5" />
              </span>
              <div>
                <dt className="font-bold text-base">Hand-lasted construction</dt>
                <dd className="text-slate-400 text-sm mt-1 leading-relaxed">
                  Cemented and stitched by 40 makers in Porto, then resoled for a fraction of the price of new.
                </dd>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="shrink-0 w-11 h-11 rounded-full bg-sky2 text-white grid place-items-center shadow">
                <Footprints className="w-5 h-5" />
              </span>
              <div>
                <dt className="font-bold text-base">Comfort from day one</dt>
                <dd className="text-slate-400 text-sm mt-1 leading-relaxed">
                  Cork and memory-foam footbed with arch support, tested on 600 wearers before release.
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
