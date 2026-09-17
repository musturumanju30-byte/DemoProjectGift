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
    <section className="w-full bg-white py-10 sm:py-20 border-b border-gray-100 font-sans">
      <div className="w-full max-w-[1700px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Heading with gold underline accent */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#F72585] uppercase tracking-wider mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>EMOTIONAL GIFTING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0A0A0A] tracking-tight leading-tight">
              Gifts For Every Feeling
            </h2>
            <div className="h-0.5 w-14 bg-[#C9A227] mt-2 sm:mt-2.5 rounded-full" />
            <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-2 leading-relaxed">
              Words may fall short, but thoughtful handcrafted gifts say everything
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-bold text-[#1E2233] hover:text-[#F72585] transition-colors self-start sm:self-auto group"
          >
            <span>Explore All Sentiments</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Standardized Feeling Cards: Horizontal carousel on mobile, 5-col on desktop */}
        <div
          className="flex md:grid overflow-x-auto md:overflow-visible no-scrollbar gap-2.5 sm:gap-4 md:gap-7 w-full pl-2.5 pr-3 -mx-2.5 sm:mx-0 md:px-0 md:grid-cols-5 scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {FEELINGS.map(item => (
            <div key={item.slug} className="w-[135px] sm:w-[145px] md:w-full shrink-0 md:shrink" style={{ flex: "0 0 135px" }}>
              <Link
                href={`/shop?feeling=${item.slug}`}
                className="group relative flex flex-col justify-between rounded-none md:rounded-3xl bg-transparent md:bg-white p-0 sm:p-5 border-0 md:border md:border-gray-100/90 shadow-none md:shadow-xs hover:border-gray-200 md:hover:shadow-xl md:hover:-translate-y-1.5 transition-all duration-300 overflow-hidden w-full min-w-0"
              >
                {/* Product Photo Stage: 1:1 Aspect Ratio */}
                <div className="relative aspect-square w-full rounded-[10px] sm:rounded-2xl overflow-hidden bg-[#F9F7F5]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 140px, 260px"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                {/* Clean Label Below Image in Consistent Typography */}
                <div className="mt-1.5 sm:mt-4 w-full text-center">
                  <span className="text-[8.5px] sm:text-xs font-extrabold uppercase tracking-wider text-[#C9A227] block">
                    {item.badge}
                  </span>
                  <h3 className="text-[11px] sm:text-base md:text-lg font-bold text-gray-900 group-hover:text-[#F72585] transition-colors mt-0.5 sm:mt-1 leading-snug line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[9.5px] sm:text-sm text-gray-500 mt-0.5 sm:mt-1 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Section-Level Explore Button on Mobile */}
        <div className="mt-3.5 md:hidden">
          <Link
            href="/shop"
            className="w-full h-[40px] flex items-center justify-center rounded-[7px] border border-[#ddd] bg-white text-[12.5px] font-semibold text-gray-800 shadow-2xs hover:bg-gray-50 active:scale-[0.99] transition-all"
          >
            <span>Explore All Sentiments &gt;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
