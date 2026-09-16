"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  Sparkles,
  Cake,
  Flower2,
  Gift,
  Leaf,
  Palette,
  Package,
} from "lucide-react";

const CATEGORIES = [
  { slug: "same-day", name: "Same Day Delivery", icon: Clock },
  { slug: "personalised-gifts", name: "Personalised Gifts", icon: Sparkles },
  { slug: "cakes", name: "Handcrafted Cakes", icon: Cake },
  { slug: "flowers", name: "Fresh Flowers", icon: Flower2 },
  { slug: "hampers", name: "Luxury Hampers", icon: Gift },
  { slug: "plants", name: "Plants & Planters", icon: Leaf },
  { slug: "home-decor", name: "Home Decor & Art", icon: Palette },
  { slug: "combos", name: "Combos & Specials", icon: Package },
];

export const CategoryStrip: React.FC = () => {
  return (
    <section className="w-full bg-white py-6 sm:py-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Horizontal scroll container with left padding ensuring first icon is fully visible on load */}
          <div className="flex items-center justify-start gap-3.5 sm:gap-6 overflow-x-auto no-scrollbar pb-2 pt-1 px-4 sm:px-6 lg:px-8 scroll-smooth snap-x">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group flex flex-col items-center shrink-0 min-w-[76px] sm:min-w-[96px] text-center snap-start"
                >
                  {/* Unified circular container: #FDEAF1 background, #1E2233 icon, hover turns #F72585 with white icon */}
                  <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-[#FDEAF1] text-[#1E2233] flex items-center justify-center group-hover:bg-[#F72585] group-hover:text-white transition-all duration-300 shadow-2xs">
                    <Icon className="h-6 w-6 stroke-[1.5]" />
                  </div>

                  {/* Label */}
                  <span className="mt-2 text-xs font-medium text-[#1E2233] group-hover:text-[#F72585] transition-colors leading-tight line-clamp-2 max-w-[84px] sm:max-w-[96px]">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Soft right edge gradient fade showing more items on mobile */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white via-white/80 to-transparent md:hidden" />
        </div>
      </div>
    </section>
  );
};
