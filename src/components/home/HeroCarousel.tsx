"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Clock } from "lucide-react";

interface HeroSlide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  bgHex: string;
  bgClass: string;
  accentBadge: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    tag: "FRESH SAME-DAY BLOOMS",
    title: "Blooming Love, Wrapped in Flowers",
    subtitle: "Handcrafted fresh blooms for life's unforgettable moments in Repalle & Coastal AP.",
    ctaText: "Shop Now",
    ctaLink: "/category/flowers",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1000&auto=format&fit=crop",
    bgHex: "#0F2547",
    bgClass: "bg-[#0F2547]",
    accentBadge: "Same-Day Delivery in Repalle & Coastal AP",
  },
  {
    id: "slide-2",
    tag: "PERSONALIZED GIFTS",
    title: "Light Up Their World With Glowing Memories",
    subtitle: "Starting @ ₹499 | Instant 2-Hour Delivery",
    ctaText: "Shop Now",
    ctaLink: "/category/personalised-gifts",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop",
    bgHex: "#0D4B39",
    bgClass: "bg-[#0D4B39]",
    accentBadge: "Laser Engraved in Our Repalle Studio",
  },
  {
    id: "slide-3",
    tag: "MIDNIGHT SURPRISE CELEBRATIONS",
    title: "Handcrafted Cakes & Luxury Gourmet Hampers",
    subtitle: "Baked fresh with pure Belgian chocolate & premium nuts. Midnight 12:00 AM delivery guaranteed.",
    ctaText: "Explore Cakes",
    ctaLink: "/category/cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
    bgHex: "#D97358",
    bgClass: "bg-[#D97358]",
    accentBadge: "100% Pure Eggless Options",
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevIndex = (currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
  const nextIndex = (currentSlide + 1) % HERO_SLIDES.length;

  const prevSlide = () => setCurrentSlide(prevIndex);
  const nextSlide = () => setCurrentSlide(nextIndex);

  const slide = HERO_SLIDES[currentSlide];
  const prevSlideData = HERO_SLIDES[prevIndex];
  const nextSlideData = HERO_SLIDES[nextIndex];

  return (
    <section className="w-full overflow-hidden py-4 sm:py-8 bg-white select-none font-sans">
      <div className="relative w-full flex items-center justify-center">
        {/* Left Peek Card (Desktop) */}
        <div
          onClick={prevSlide}
          className={`hidden md:block absolute left-[-14%] lg:left-[-10%] xl:left-[-6%] w-[24%] lg:w-[20%] h-[380px] md:h-[440px] lg:h-[480px] rounded-r-3xl overflow-hidden cursor-pointer opacity-75 hover:opacity-95 transition-all duration-500 shadow-md ${prevSlideData.bgClass}`}
        >
          <Image
            src={prevSlideData.image}
            alt={prevSlideData.title}
            fill
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-black/25" />
          {/* Left Arrow Button */}
          <button
            onClick={e => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/95 hover:bg-white text-gray-900 flex items-center justify-center shadow-xl transition active:scale-95 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        {/* Center Active Card */}
        <div className="w-full max-w-full sm:max-w-[92%] md:max-w-5xl lg:max-w-6xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto z-10 px-3.5 sm:px-4">
          <div
            className={`relative min-h-[360px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 flex items-center ${slide.bgClass}`}
          >
            {/* Subtle gold grid texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            {/* Right side bouquet / product photo */}
            <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 md:w-3/5 opacity-40 sm:opacity-95 pointer-events-none transition-all duration-700">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover object-center sm:object-right"
              />
              <div
                className="absolute inset-0 hidden sm:block"
                style={{
                  background: `linear-gradient(to right, ${slide.bgHex} 0%, ${slide.bgHex}D9 42%, transparent 100%)`,
                }}
              />
              <div className="absolute inset-0 sm:hidden bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Text & CTA block */}
            <div className="relative z-10 w-full sm:w-3/5 lg:w-7/12 p-5 sm:p-10 md:p-12 lg:p-16 text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-[#FFF8E6] mb-3.5 border border-white/25 shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-[#C9A227]" />
                {slide.tag}
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-bold tracking-tight text-white leading-[1.18]">
                {slide.title}
              </h1>

              <p className="mt-3.5 text-xs sm:text-sm md:text-base text-gray-100 leading-relaxed max-w-xl">
                {slide.subtitle}
              </p>

              <div className="mt-7 flex items-center gap-4">
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm sm:text-base font-bold text-gray-950 shadow-xl hover:bg-gray-100 hover:scale-105 transition-all duration-200 active:scale-95"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="h-4 w-4 text-[#F72585]" />
                </Link>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs sm:text-sm text-amber-200 font-medium">
                <Clock className="h-4 w-4 text-[#C9A227]" />
                <span>{slide.accentBadge}</span>
              </div>
            </div>

            {/* Mobile Arrow buttons */}
            <button
              onClick={prevSlide}
              className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Right Peek Card (Desktop) */}
        <div
          onClick={nextSlide}
          className={`hidden md:block absolute right-[-14%] lg:right-[-10%] xl:right-[-6%] w-[24%] lg:w-[20%] h-[380px] md:h-[440px] lg:h-[480px] rounded-l-3xl overflow-hidden cursor-pointer opacity-75 hover:opacity-95 transition-all duration-500 shadow-md ${nextSlideData.bgClass}`}
        >
          <Image
            src={nextSlideData.image}
            alt={nextSlideData.title}
            fill
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-black/25" />
          {/* Right Arrow Button */}
          <button
            onClick={e => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/95 hover:bg-white text-gray-900 flex items-center justify-center shadow-xl transition active:scale-95 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Slide Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx ? "w-8 bg-[#F72585]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
