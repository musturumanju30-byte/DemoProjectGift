"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface CategoryItem {
  slug: string;
  name: string;
  mobileName: string;
  href: string;
  image: string;
  bgColor: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    slug: "same-day",
    name: "Same Day Delivery",
    mobileName: "Same Day",
    href: "/category/same-day",
    image: "/images/categories/same-day.png",
    bgColor: "bg-[#FFF2F6]", // soft rose pastel
  },
  {
    slug: "flowers",
    name: "Fresh Flowers",
    mobileName: "Flowers",
    href: "/category/flowers",
    image: "/images/categories/flowers.png",
    bgColor: "bg-[#FFF5F0]", // soft peach pastel
  },
  {
    slug: "cakes",
    name: "Handcrafted Cakes",
    mobileName: "Cakes",
    href: "/category/cakes",
    image: "/images/categories/cakes.png",
    bgColor: "bg-[#FFF9EA]", // soft yellow pastel
  },
  {
    slug: "personalised",
    name: "Personalised Gifts",
    mobileName: "Personalised",
    href: "/category/personalised-gifts",
    image: "/images/categories/personalised.png",
    bgColor: "bg-[#F7F2FA]", // soft lilac pastel
  },
  {
    slug: "plants",
    name: "Plants & Planters",
    mobileName: "Plants",
    href: "/category/plants",
    image: "/images/categories/plants.png",
    bgColor: "bg-[#F0FAF4]", // soft mint pastel
  },
  {
    slug: "hampers",
    name: "Luxury Hampers",
    mobileName: "Hampers",
    href: "/category/hampers",
    image: "/images/categories/hampers.png",
    bgColor: "bg-[#FFF2F5]", // soft pink pastel
  },
  {
    slug: "chocolates",
    name: "Chocolates & Combos",
    mobileName: "Chocolates",
    href: "/category/combos",
    image: "/images/categories/chocolates.png",
    bgColor: "bg-[#FFF8F0]", // soft warm cream
  },
  {
    slug: "decor",
    name: "Home Decor & Art",
    mobileName: "Decor",
    href: "/category/home-decor",
    image: "/images/categories/balloon-decor.png",
    bgColor: "bg-[#F2F7FD]", // soft sky pastel
  },
];

export const CategoryStrip: React.FC = () => {
  return (
    <section className="w-full bg-white border-b border-gray-100 font-sans">
      {/* Mobile Horizontal Illustrated Category Carousel (< 768px) */}
      <div className="md:hidden w-full py-3.5 sm:py-4">
        <div className="flex items-start overflow-x-auto no-scrollbar gap-3.5 pl-[14px] pr-3 scroll-smooth">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group flex flex-col items-center shrink-0 w-[62px] min-w-[62px] text-center cursor-pointer select-none"
              style={{ flex: "0 0 62px" }}
            >
              {/* Soft rounded pastel container: 58px x 58px, rounded-[16px] */}
              <div
                className={`w-[58px] h-[58px] rounded-[16px] ${cat.bgColor} flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200`}
              >
                <div className="relative w-[44px] h-[44px] flex items-center justify-center">
                  <Image
                    src={cat.image}
                    alt={cat.mobileName}
                    width={44}
                    height={44}
                    className="object-contain drop-shadow-2xs group-hover:scale-110 transition-transform duration-200"
                    priority
                  />
                </div>
              </div>

              {/* Label underneath */}
              <span className="mt-1.5 text-[9.5px] sm:text-[10px] font-semibold text-gray-800 group-hover:text-[#F72585] transition-colors leading-tight text-center max-w-[62px] block">
                {cat.mobileName}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Category Grid (>= 768px) */}
      <div className="hidden md:block w-full max-w-[1700px] mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-8 lg:py-10">
        <div className="grid grid-cols-8 items-start justify-between gap-4 lg:gap-6 w-full">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group flex flex-col items-center justify-center shrink-0 min-w-0 text-center cursor-pointer"
            >
              <div
                className={`h-16 w-16 lg:h-18 lg:w-18 rounded-2xl ${cat.bgColor} flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-2xs group-hover:shadow-md`}
              >
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={48}
                    height={48}
                    className="object-contain group-hover:scale-110 transition-transform duration-200"
                  />
                </div>
              </div>
              <span className="mt-2.5 text-xs lg:text-[13px] font-semibold text-[#1E2233] group-hover:text-[#F72585] transition-colors leading-snug text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
