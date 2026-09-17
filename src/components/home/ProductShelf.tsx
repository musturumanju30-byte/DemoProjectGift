"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductShelfProps {
  title: string;
  subtitle?: string;
  badge?: string;
  viewAllLink: string;
  products: Product[];
  bgClass?: string;
  cardStyle?: "beige" | "standard";
}

export const ProductShelf: React.FC<ProductShelfProps> = ({
  title,
  subtitle,
  badge,
  viewAllLink,
  products,
  bgClass = "bg-white",
  cardStyle = "beige",
}) => {
  if (products.length === 0) return null;

  const displayCount = Math.min(products.length, 5);
  const gridClasses =
    displayCount === 1
      ? "grid grid-cols-1 max-w-md gap-4 sm:gap-6 w-full"
      : displayCount === 2
      ? "grid grid-cols-1 sm:grid-cols-2 max-w-2xl lg:max-w-3xl gap-3.5 sm:gap-8 w-full"
      : displayCount === 3
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl gap-3.5 sm:gap-8 w-full"
      : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-7 w-full";

  return (
    <section className={`w-full ${bgClass} py-6 sm:py-14 md:py-20 border-b border-gray-100 font-sans`}>
      <div className="w-full max-w-[1700px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-8 md:mb-12 gap-2 sm:gap-4">
          <div>
            {badge && (
              <span className="text-[10px] sm:text-xs md:text-[13px] font-bold text-[#C9A227] uppercase tracking-[0.8px] block mb-0.5">
                {badge}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0A0A0A] tracking-tight leading-tight">
              {title}
            </h2>
            <div className="h-0.5 w-12 sm:w-14 bg-[#C9A227] mt-1.5 sm:mt-2.5 rounded-full" />
            {subtitle && (
              <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1.5 sm:mt-2 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          <Link
            href={viewAllLink}
            className="hidden sm:flex text-sm sm:text-base font-bold text-[#F72585] hover:underline items-center gap-1.5 shrink-0 group"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {cardStyle === "beige" ? (
          /* Warm Beige Cards: Horizontal scroll on mobile, 5-col on desktop */
          <div
            className="flex md:grid overflow-x-auto md:overflow-visible no-scrollbar gap-2.5 sm:gap-4 md:gap-6 w-full pl-3.5 pr-4 -mx-3.5 sm:mx-0 md:px-0 md:grid-cols-3 lg:grid-cols-5 scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {products.slice(0, 8).map(product => (
              <div key={product.id} className="w-[130px] sm:w-[150px] md:w-full shrink-0 md:shrink">
                <Link
                  href={`/product/${product.slug}`}
                  className="group flex flex-col items-center justify-between bg-[#F5EBE1] rounded-xl sm:rounded-3xl p-2.5 sm:p-5 h-64 sm:h-92 border border-stone-200/70 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative w-full aspect-square overflow-hidden rounded-lg sm:rounded-2xl bg-white/40">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-2 sm:mt-3.5 w-full flex items-center justify-center">
                    <span className="rounded-full bg-white/95 px-3 sm:px-5 py-1 sm:py-2 text-[11px] sm:text-sm font-bold text-gray-800 shadow-xs border border-gray-100 group-hover:bg-[#F72585] group-hover:text-white transition-colors truncate max-w-[95%] text-center">
                      {product.title}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          /* Standard Product Carousel on mobile, Grid on desktop */
          <div
            className="flex md:grid overflow-x-auto md:overflow-visible no-scrollbar gap-2.5 sm:gap-4 md:gap-7 w-full pl-2.5 pr-3 -mx-2.5 sm:mx-0 md:px-0 md:grid-cols-4 lg:grid-cols-5 scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {products.slice(0, 8).map(product => (
              <div key={product.id} className="w-[135px] sm:w-[140px] md:w-full shrink-0 md:shrink" style={{ flex: "0 0 135px" }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Section-Level Explore Button on Mobile */}
        <div className="mt-3.5 md:hidden">
          <Link
            href={viewAllLink}
            className="w-full h-[40px] flex items-center justify-center rounded-[7px] border border-[#ddd] bg-white text-[12.5px] font-semibold text-gray-800 shadow-2xs hover:bg-gray-50 active:scale-[0.99] transition-all"
          >
            <span>Explore {title.split(":")[0].replace("& Keepsakes", "").replace("& Sweet Delights", "").trim()} &gt;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
