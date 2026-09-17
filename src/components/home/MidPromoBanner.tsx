"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export const MidPromoBanner: React.FC = () => {
  const quickCategories = [
    {
      title: "Red Roses",
      link: "/category/flowers",
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "Delicious Cakes",
      link: "/category/cakes",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "Personalised Frames",
      link: "/category/personalised-gifts",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "Green Plants",
      link: "/category/plants",
      image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "Surprise Combos",
      link: "/category/hampers",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full bg-white py-10 sm:py-20 border-b border-gray-100 font-sans">
      <div className="w-full max-w-[1700px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Coral Celebration Banner: Full Content Width */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#D95D39] via-[#E26D46] to-[#E87E54] shadow-xl flex flex-col md:flex-row items-center justify-between min-h-[300px] md:min-h-[360px]">
          {/* Left Text Zone */}
          <div className="relative z-10 w-full md:w-7/12 p-5 sm:p-12 lg:p-16 text-white flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-[#FFF8E6] mb-4 border border-white/25 w-fit shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-200" />
              CELEBRATE TODAY
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
              Joyful Gifts To <br className="hidden sm:inline" />Make It Special
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-orange-50 max-w-lg leading-relaxed">
              Starting @ ₹299 | Handcrafted with Love for Every Cherished Milestone
            </p>
            <div className="mt-7 flex items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm sm:text-base font-bold text-[#D95D39] shadow-xl hover:bg-gray-50 hover:scale-105 transition-all duration-200 active:scale-95"
              >
                <span>Explore Collection</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Bounded Visual Container */}
          <div className="relative w-full md:w-5/12 h-[260px] md:h-full min-h-[260px] md:min-h-[360px] p-6 sm:p-8 lg:p-10 flex items-center justify-center">
            <div className="relative w-full h-full max-h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/25 bg-white/10">
              <Image
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop"
                alt="Celebration Balloons & Cakes"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* 5 Clean Borderless Category Thumbnails across 5 columns */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {quickCategories.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              {/* Softly Rounded Image Thumbnail without background box */}
              <div className="relative aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F9F7F5] shadow-xs group-hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </div>
              <span className="mt-4 text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#F72585] transition-colors leading-tight">
                {item.title}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 mt-1 flex items-center gap-1 font-medium group-hover:text-[#F72585] transition-colors">
                Explore <ArrowRight className="h-3.5 w-3.5 inline" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
