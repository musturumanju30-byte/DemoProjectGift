"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

const FEELINGS = [
  {
    slug: "love-romance",
    title: "Love & Romance",
    subtitle: "Express your heart",
    badge: "ROMANCE",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
  },
  {
    slug: "thank-you",
    title: "Thank You",
    subtitle: "Show heartfelt gratitude",
    badge: "GRATITUDE",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=400&auto=format&fit=crop",
  },
  {
    slug: "miss-you",
    title: "Miss You",
    subtitle: "Bridge the distance",
    badge: "AFFECTION",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=400&auto=format&fit=crop",
  },
  {
    slug: "sorry",
    title: "I Am Sorry",
    subtitle: "Mend every feeling",
    badge: "APOLOGY",
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=400&auto=format&fit=crop",
  },
  {
    slug: "congratulations",
    title: "Congratulations",
    subtitle: "Celebrate their wins",
    badge: "CELEBRATION",
    image: "https://images.unsplash.com/photo-1543257580-7269da773bf5?q=80&w=400&auto=format&fit=crop",
  },
];

export const FeelingCards: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with thin gold underline accent */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F72585] uppercase tracking-wider mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>EMOTIONAL GIFTING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
              Gifts For Every Feeling
            </h2>
            <div className="h-0.5 w-12 bg-[#C9A227] mt-2 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Words may fall short, but thoughtful handcrafted gifts say everything
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E2233] hover:text-[#F72585] transition-colors self-start sm:self-auto group"
          >
            <span>Explore All Sentiments</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Standardized Feeling Cards: Neutral cards with consistent 1:1 square photo treatment */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {FEELINGS.map(item => (
            <Link
              key={item.slug}
              href={`/shop?feeling=${item.slug}`}
              className="group relative flex flex-col justify-between rounded-2xl bg-white p-3.5 border border-gray-100/90 shadow-2xs hover:border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Product Photo Stage: 1:1 Aspect Ratio with soft neutral background */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F9F7F5]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 160px, 220px"
                  className="object-cover group-hover:scale-106 transition-transform duration-500"
                />
              </div>

              {/* Clean Label Below Image in Consistent Typography */}
              <div className="mt-3.5 w-full text-center">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">
                  {item.badge}
                </span>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#F72585] transition-colors mt-0.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
