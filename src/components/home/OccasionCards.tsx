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
    <section className="w-full bg-white py-16 sm:py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
              Gifts For Every Occasion
            </h2>
            <div className="h-0.5 w-12 bg-[#C9A227] mt-2 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
              Curated celebrations handcrafted for birthdays, anniversaries & festivals in Coastal AP
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-[#F72585] hover:underline flex items-center gap-1 shrink-0"
          >
            Explore All Occasions <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 5 Pastel Rounded Occasion Cards with consistent 24px (gap-6) spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {OCCASION_CARDS_DATA.map(occ => (
            <Link
              key={occ.slug}
              href={`/shop?occasion=${occ.slug}`}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border ${occ.borderColor} ${occ.bgColor} p-4 sm:p-5 h-40 sm:h-48 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Text info on top left */}
              <div className="relative z-10 max-w-[62%]">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  CELEBRATE
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-gray-900 group-hover:text-[#F72585] transition-colors leading-tight mt-0.5">
                  {occ.title}
                </h3>
                <p className="text-[11px] text-gray-600 mt-1 line-clamp-1 leading-tight font-medium">
                  {occ.subtitle}
                </p>
              </div>

              {/* Product preview photo positioned in bottom-right matching reference layout */}
              <div className="absolute right-[-4px] bottom-[-4px] h-26 w-26 sm:h-30 sm:w-30 rounded-2xl overflow-hidden shadow-xs group-hover:scale-106 transition-transform duration-500">
                <Image
                  src={occ.image}
                  alt={occ.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
