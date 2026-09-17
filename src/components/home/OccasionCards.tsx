"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const OCCASION_CARDS_DATA = [
  {
    slug: "birthday",
    title: "Birthday",
    subtitle: "Cakes, Flowers & Gifts",
    bgColor: "bg-[#FFF1E6]",
    borderColor: "border-[#FDE3CF]",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop",
  },
  {
    slug: "anniversary",
    title: "Anniversary",
    subtitle: "Roses & Romances",
    bgColor: "bg-[#FDE8E8]",
    borderColor: "border-[#FCD2D2]",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
  },
  {
    slug: "love-romance",
    title: "Love & Romance",
    subtitle: "Couples & Keepsakes",
    bgColor: "bg-[#F5EEF8]",
    borderColor: "border-[#EADBF0]",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop",
  },
  {
    slug: "congratulations",
    title: "Congratulations",
    subtitle: "Floral Baskets & Sweets",
    bgColor: "bg-[#FEF9E7]",
    borderColor: "border-[#FDF0BE]",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=400&auto=format&fit=crop",
  },
  {
    slug: "plants",
    title: "Greenery & Plants",
    subtitle: "Lucky Bonsai & Pots",
    bgColor: "bg-[#EAF8F5]",
    borderColor: "border-[#D1F0EA]",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=400&auto=format&fit=crop",
  },
];

export const OccasionCards: React.FC = () => {
  return (
    <section className="w-full bg-white pt-6 pb-12 sm:py-16 md:py-20 border-b border-gray-100 font-sans">
      <div className="w-full max-w-[1700px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <span className="text-[11px] sm:text-xs md:text-[13px] font-bold text-[#C9A227] uppercase tracking-[1px] block mb-1">
              CURATED OCCASIONS
            </span>
            <h2 className="text-[26px] sm:text-3xl md:text-4xl font-serif font-bold text-gray-950 tracking-tight leading-tight">
              Gifts For Every Occasion
            </h2>
            <div className="h-0.5 w-12 bg-[#C9A227] mt-1.5 sm:mt-2.5 rounded-full" />
            <p className="text-[13px] sm:text-sm md:text-base text-gray-500 mt-2 leading-[1.55]">
              Curated celebrations handcrafted for birthdays, anniversaries &amp; festivals in Coastal AP
            </p>
            {/* Mobile Explore All Occasions (directly beneath description) */}
            <Link
              href="/shop"
              className="text-[13px] sm:text-sm md:text-base font-bold text-[#F72585] hover:underline inline-flex items-center gap-1.5 mt-2.5 sm:hidden group"
            >
              <span>Explore All Occasions</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Desktop Explore All Occasions (aligned right) */}
          <Link
            href="/shop"
            className="hidden sm:flex text-sm md:text-base font-bold text-[#F72585] hover:underline items-center gap-1.5 shrink-0 group"
          >
            <span>Explore All Occasions</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2-column responsive mobile grid (gap: 12-14px), 5-col on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 lg:gap-7 w-full">
          {OCCASION_CARDS_DATA.map((occ, idx) => (
            <Link
              key={occ.slug}
              href={`/shop?occasion=${occ.slug}`}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border ${occ.borderColor} ${occ.bgColor} p-3.5 sm:p-5 md:p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full min-w-0 cursor-pointer ${
                idx === 4 ? "hidden sm:flex" : "flex"
              }`}
            >
              {/* Text info on top */}
              <div className="relative z-10 w-full min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-[0.8px] block">
                  CELEBRATE
                </span>
                <h3 className="text-[16px] sm:text-base md:text-lg font-bold text-gray-900 group-hover:text-[#F72585] transition-colors leading-tight mt-1 truncate">
                  {occ.title}
                </h3>
                <p className="text-[11px] sm:text-xs md:text-[13px] text-gray-600 mt-1 line-clamp-1 leading-snug font-medium">
                  {occ.subtitle}
                </p>
              </div>

              {/* Product preview photo filling the lower portion of the card cleanly without overflow */}
              <div className="relative mt-3 w-full h-28 sm:h-32 md:h-36 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xs">
                <Image
                  src={occ.image}
                  alt={occ.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
