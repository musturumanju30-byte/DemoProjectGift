"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RECIPIENTS_LIST } from "@/data/products";

export const RecipientRow: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight inline-block">
            Gifts For Everyone
            <div className="h-0.5 w-12 bg-[#C9A227] mt-2 rounded-full mx-auto" />
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
            Thoughtfully customized gifts crafted for every special bond
          </p>
        </div>

        {/* 6 Circular Avatars */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12 flex-wrap">
          {RECIPIENTS_LIST.map(rec => (
            <Link
              key={rec.slug}
              href={`/shop?recipient=${rec.slug}`}
              className="group flex flex-col items-center"
            >
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full p-1 border-2 border-stone-200/70 group-hover:border-[#F72585] transition-all duration-300 shadow-2xs group-hover:shadow-md">
                <div className="relative h-full w-full rounded-full overflow-hidden bg-stone-50 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={rec.image}
                    alt={rec.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="mt-3 text-xs sm:text-sm font-bold text-gray-800 group-hover:text-[#F72585] transition-colors">
                {rec.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Subtle accent slider line matching reference design */}
        <div className="w-24 h-1 bg-emerald-700/60 rounded-full mx-auto mt-10" />
      </div>
    </section>
  );
};
