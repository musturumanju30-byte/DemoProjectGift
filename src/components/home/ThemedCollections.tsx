"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ARTISANAL_COLLECTIONS = [
  {
    id: "art-1",
    title: "Vases",
    count: "12 Designs",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=400&auto=format&fit=crop",
    link: "/shop?collection=Vases",
  },
  {
    id: "art-2",
    title: "Carnations",
    count: "18 Designs",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=400&auto=format&fit=crop",
    link: "/shop?collection=Carnations",
  },
  {
    id: "art-3",
    title: "For Moments",
    count: "10 Designs",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=400&auto=format&fit=crop",
    link: "/shop?collection=Moments",
  },
  {
    id: "art-4",
    title: "Luxury Blooms",
    count: "14 Designs",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
    link: "/shop?collection=Luxury",
  },
  {
    id: "art-5",
    title: "Grand Roses",
    count: "16 Designs",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400&auto=format&fit=crop",
    link: "/shop?collection=Roses",
  },
];

export const ThemedCollections: React.FC = () => {
  return (
    <section className="w-full bg-white py-10 sm:py-20 border-b border-gray-100 font-sans">
      <div className="w-full max-w-[1700px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <span className="text-xs sm:text-[13px] font-bold text-[#C9A227] uppercase tracking-wider block mb-1">
            EXQUISITE FLORAL DESIGNS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0A0A0A] tracking-tight inline-block leading-tight">
            Flowers Selection
            <div className="h-0.5 w-14 bg-[#C9A227] mt-2 sm:mt-2.5 rounded-full mx-auto" />
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-2 leading-relaxed">
            Hand-curated bespoke floral arrangements styled for life&apos;s special moments
          </p>
        </div>

        {/* Collection thumbnails: Horizontal carousel on mobile, 5-col on desktop */}
        <div
          className="flex md:grid overflow-x-auto md:overflow-visible no-scrollbar gap-2.5 sm:gap-6 md:gap-8 lg:gap-10 w-full pl-2.5 pr-3 -mx-2.5 sm:mx-0 md:px-0 md:grid-cols-5 scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {ARTISANAL_COLLECTIONS.map(item => (
            <div key={item.id} className="w-[135px] sm:w-[140px] md:w-full shrink-0 md:shrink" style={{ flex: "0 0 135px" }}>
              <Link
                href={item.link}
                className="group flex flex-col items-center text-center cursor-pointer"
              >
                {/* Softly Rounded Image Thumbnail */}
                <div className="relative aspect-square w-full rounded-[10px] sm:rounded-3xl overflow-hidden bg-[#F9F7F5] shadow-xs group-hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                {/* Short Label Underneath */}
                <h3 className="mt-2 sm:mt-4 text-[11px] sm:text-base md:text-lg font-bold text-gray-900 group-hover:text-[#F72585] transition-colors leading-tight line-clamp-1">
                  {item.title}
                </h3>
                <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 flex items-center gap-1 font-medium group-hover:text-[#F72585] transition-colors">
                  Explore <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 inline" />
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Section-Level Explore Button on Mobile */}
        <div className="mt-3.5 md:hidden">
          <Link
            href="/shop?collection=Flowers"
            className="w-full h-[40px] flex items-center justify-center rounded-[7px] border border-[#ddd] bg-white text-[12.5px] font-semibold text-gray-800 shadow-2xs hover:bg-gray-50 active:scale-[0.99] transition-all"
          >
            <span>Explore Flowers Selection &gt;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
