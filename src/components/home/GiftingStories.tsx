"use client";

import React from "react";
import Image from "next/image";
import { CUSTOMER_STORIES } from "@/data/products";
import { Star, CheckCircle2, Play, Heart } from "lucide-react";
import { InstagramIcon } from "@/components/common/Icons";

export const GiftingStories: React.FC = () => {
  return (
    <section className="w-full bg-white py-14 sm:py-18 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with thin gold underline accent */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F72585] uppercase tracking-wider mb-1">
              <InstagramIcon className="h-3.5 w-3.5" />
              <span>COMMUNITY LOVE & MOMENTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
              Joyful Gifting Stories
            </h2>
            <div className="h-0.5 w-12 bg-[#C9A227] mt-2 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Real surprises, genuine smiles, and unforgettable milestones in Repalle & Coastal AP
            </p>
          </div>

          <a
            href="https://www.instagram.com/repalle_gifts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-xs font-bold text-[#1E2233] hover:border-[#F72585] hover:text-[#F72585] hover:shadow-xs transition shrink-0 self-start sm:self-auto"
          >
            <InstagramIcon className="h-4 w-4 text-[#F72585]" />
            <span>Follow @repalle_gifts</span>
          </a>
        </div>

        {/* 5 Stories Reel Grid: 2 cols on mobile, 3 cols on tablet, 5 cols on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {CUSTOMER_STORIES.slice(0, 5).map(story => (
            <div
              key={story.id}
              className="group relative overflow-hidden rounded-[20px] bg-gray-900 border border-gray-200/80 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 h-[340px] sm:h-[380px] flex flex-col justify-between"
            >
              {/* Story Photo Card (Full bleed background) */}
              <Image
                src={story.image}
                alt={story.customerName}
                fill
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 260px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
              />

              {/* Gradient Scrim for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

              {/* Top Handle Badge & Play Reel Icon */}
              <div className="relative z-10 p-3.5 flex items-center justify-between">
                <span className="rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white flex items-center gap-1 border border-white/10">
                  <InstagramIcon className="h-3 w-3 text-[#F72585]" />
                  <span>{story.handle}</span>
                </span>

                <div className="h-7 w-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:scale-110 group-hover:bg-[#F72585] transition-all">
                  <Play className="h-3 w-3 fill-white ml-0.5" />
                </div>
              </div>

              {/* Center Heart Pop on Hover */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-90 transition-all duration-300 scale-75 group-hover:scale-100">
                <div className="h-12 w-12 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-lg text-[#F72585]">
                  <Heart className="h-6 w-6 fill-[#F72585]" />
                </div>
              </div>

              {/* Bottom Metadata & Customer Review */}
              <div className="relative z-10 p-4 text-white">
                {/* Occasion Pill */}
                <span className="inline-block rounded-full bg-[#C9A227]/90 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-black mb-2 shadow-2xs">
                  {story.occasion}
                </span>

                {/* Customer Avatar and Name Row */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="relative h-7 w-7 rounded-full overflow-hidden border border-white/40 shadow-xs shrink-0 bg-white/20">
                    <Image
                      src={story.image}
                      alt={story.customerName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                      {story.customerName}
                    </h4>
                    <p className="text-[10px] text-gray-300 font-medium">
                      {story.location}
                    </p>
                  </div>
                </div>

                {/* Review Snippet */}
                <p className="text-[11px] text-gray-200 mt-1 line-clamp-2 leading-relaxed italic opacity-90">
                  &quot;{story.quote}&quot;
                </p>

                {/* Stars and Verified */}
                <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-0.5">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-[#F3CD68] text-[#F3CD68]" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 font-bold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
