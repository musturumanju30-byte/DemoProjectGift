"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RECIPIENTS_LIST } from "@/data/products";

export const RecipientRow: React.FC = () => {
  return (
    <section className="w-full bg-white py-10 sm:py-20 border-b border-gray-100 font-sans">
      <div className="w-full max-w-[1700px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-14">
          <span className="text-xs sm:text-[13px] font-bold text-[#C9A227] uppercase tracking-wider block mb-1">
            CELEBRATE YOUR BONDS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0A0A0A] tracking-tight inline-block leading-tight">
            Gifts For Everyone
            <div className="h-0.5 w-14 bg-[#C9A227] mt-2 sm:mt-2.5 rounded-full mx-auto" />
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-2 leading-relaxed">
            Thoughtfully customized gifts crafted for every special bond
          </p>
        </div>

        {/* 6 Circular Avatars: Horizontal scroll on mobile, 6-col grid on tablet/desktop */}
        <div
          className="flex sm:grid overflow-x-auto sm:overflow-visible no-scrollbar gap-4 sm:gap-8 lg:gap-12 max-w-5xl mx-auto pl-3.5 pr-4 -mx-3.5 sm:mx-auto sm:grid-cols-6 justify-start sm:justify-center items-center w-full scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {RECIPIENTS_LIST.map(rec => (
            <div key={rec.slug} className="shrink-0 flex flex-col items-center">
              <Link
                href={`/shop?recipient=${rec.slug}`}
                className="group flex flex-col items-center cursor-pointer"
              >
                <div className="relative h-16 w-16 sm:h-24 sm:w-24 lg:h-28 lg:w-28 rounded-full p-1 sm:p-1.5 border-2 border-stone-200/80 group-hover:border-[#F72585] transition-all duration-300 shadow-xs group-hover:shadow-xl group-hover:scale-105">
                  <div className="relative h-full w-full rounded-full overflow-hidden bg-stone-50">
                    <Image
                      src={rec.image}
                      alt={rec.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <span className="mt-2 sm:mt-3.5 text-xs sm:text-sm md:text-base font-bold text-gray-800 group-hover:text-[#F72585] transition-colors text-center truncate max-w-[80px] sm:max-w-[90px]">
                  {rec.name}
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Subtle accent slider line */}
        <div className="w-28 h-1 bg-emerald-700/60 rounded-full mx-auto mt-12" />
      </div>
    </section>
  );
};
