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
    <section className="w-full bg-white py-16 sm:py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight inline-block font-serif">
            Flowers Selection
            <div className="h-0.5 w-12 bg-[#C9A227] mt-2 rounded-full mx-auto" />
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Hand-curated bespoke floral arrangements styled for life&apos;s special moments
          </p>
        </div>

        {/* Borderless collection thumbnails with generous spacing matching screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {ARTISANAL_COLLECTIONS.map(item => (
            <Link
              key={item.id}
              href={item.link}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              {/* Softly Rounded Image Thumbnail without background box */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F9F7F5] shadow-xs group-hover:shadow-md transition-all duration-300">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-106 transition-transform duration-500"
                />
              </div>

              {/* Short Label Underneath in Consistent Typography */}
              <h3 className="mt-3.5 text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#F72585] transition-colors leading-tight">
                {item.title}
              </h3>
              <span className="text-xs text-gray-500 mt-1 flex items-center gap-1 font-medium group-hover:text-[#F72585] transition-colors">
                Explore <ArrowRight className="h-3 w-3 inline" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
