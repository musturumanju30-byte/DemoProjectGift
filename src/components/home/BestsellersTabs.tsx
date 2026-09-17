"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/product/ProductCard";

interface BestsellerCategory {
  id: string;
  label: string;
  icon: string;
  category: string;
  exploreLink: string;
}

const BESTSELLER_CATEGORIES: BestsellerCategory[] = [
  { id: "flowers", label: "Flowers", icon: "/images/categories/flowers.png", category: "flowers", exploreLink: "/category/flowers" },
  { id: "cakes", label: "Cakes", icon: "/images/categories/cakes.png", category: "cakes", exploreLink: "/category/cakes" },
  { id: "personalised", label: "Personalised", icon: "/images/categories/personalised.png", category: "personalised-gifts", exploreLink: "/category/personalised-gifts" },
  { id: "hampers", label: "Hampers", icon: "/images/categories/hampers.png", category: "gift-hampers", exploreLink: "/category/gift-hampers" },
  { id: "plants", label: "Plants", icon: "/images/categories/plants.png", category: "plants", exploreLink: "/category/plants" },
];

const FLOWER_FILTER_TABS = [
  { id: "all", label: "All", keyword: "" },
  { id: "roses", label: "Roses", keyword: "rose" },
  { id: "carnations", label: "Carnations", keyword: "carnation" },
  { id: "lilies", label: "Lilies", keyword: "lil" },
  { id: "sunflowers", label: "Sunflowers", keyword: "sunflower" },
  { id: "mix-flowers", label: "Mix Flowers", keyword: "flower" },
];

export const BestsellersTabs: React.FC = () => {
  const { products } = useStore();
  const [activeCategory, setActiveCategory] = useState("flowers");
  const [activeTab, setActiveTab] = useState("all");

  const activeCatObj = BESTSELLER_CATEGORIES.find(c => c.id === activeCategory) || BESTSELLER_CATEGORIES[0];
  const tabObj = FLOWER_FILTER_TABS.find(t => t.id === activeTab);

  // Filter products by category and subcategory
  let filteredProducts = products.filter(prod => {
    // If flowers category, apply the flower subcategory filters
    if (activeCategory === "flowers") {
      if (prod.category !== "flowers") return false;
      if (activeTab === "all") return true;
      if (tabObj?.keyword) {
        const q = tabObj.keyword.toLowerCase();
        return (
          prod.title.toLowerCase().includes(q) ||
          prod.slug.toLowerCase().includes(q) ||
          prod.tags.some(t => t.toLowerCase().includes(q)) ||
          prod.subcategory?.toLowerCase().includes(q)
        );
      }
      return true;
    }

    // For other categories
    return prod.category === activeCatObj.category;
  });

  // Fallback to fill row if needed
  if (filteredProducts.length < 5) {
    const filler = products.filter(p => !filteredProducts.some(fp => fp.id === p.id));
    filteredProducts = [...filteredProducts, ...filler];
  }
  const displayProducts = filteredProducts.slice(0, 8);

  return (
    <section className="w-full bg-[#FAF8F5]/80 py-6 sm:py-14 md:py-20 border-b border-gray-100 font-sans">
      <div className="w-full max-w-[1700px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* 1. Section Header: Serif heading + Eyebrow */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[10px] sm:text-xs md:text-[13px] font-bold text-[#C9A227] uppercase tracking-[0.8px] block mb-0.5">
            BESTSELLING GIFTS
          </span>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-950 tracking-tight leading-tight">
              Shop By Bestsellers
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
              Handpicked customer favorites delivering happiness same-day across Repalle
            </p>
          </div>
          <div className="h-0.5 w-12 bg-[#C9A227] mt-1.5 sm:mt-2.5 rounded-full" />
        </div>

        {/* 2. Illustrated Category Selector Row (Flowers, Cakes, Personalised, Hampers, Plants) */}
        <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar pt-2 pb-1.5 w-full border-b border-stone-200/70 mb-4 sm:mb-6">
          {BESTSELLER_CATEGORIES.map(cat => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveTab("all");
                }}
                className="group flex flex-col items-center shrink-0 cursor-pointer relative pb-2 transition-all"
              >
                {/* Round Illustrated Container */}
                <div
                  className={`relative h-13 w-13 sm:h-16 sm:w-16 rounded-full p-1.5 flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? "bg-white shadow-sm ring-2 ring-[#4A6B32]/70 scale-105"
                      : "bg-white/80 hover:bg-white hover:shadow-2xs"
                  }`}
                >
                  <Image
                    src={cat.icon}
                    alt={cat.label}
                    width={48}
                    height={48}
                    className="object-contain h-10 w-10 sm:h-12 sm:w-12"
                  />
                </div>

                {/* Category Label Underneath */}
                <span
                  className={`mt-1.5 text-xs sm:text-sm font-semibold transition-colors ${
                    isSelected ? "text-gray-950 font-bold" : "text-gray-600 group-hover:text-gray-900"
                  }`}
                >
                  {cat.label}
                </span>

                {/* Active Indicator Underline */}
                {isSelected && (
                  <span className="absolute bottom-0 left-1 right-1 h-0.75 bg-[#4A6B32] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* 3. Subcategory Filter Pills (e.g. [All] [Roses] [Carnations]...) */}
        {activeCategory === "flowers" && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-2 w-full">
            {FLOWER_FILTER_TABS.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`h-8 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 flex items-center justify-center ${
                  activeTab === tab.id
                    ? "bg-[#1E2233] text-white shadow-xs"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* 4. Product Carousel on Mobile (flex, overflow-x: auto, gap 10px, cards 135px) / 5-col Grid on Desktop */}
        <div
          className="flex md:grid overflow-x-auto md:overflow-visible no-scrollbar gap-2.5 sm:gap-4 md:gap-7 w-full pl-2.5 pr-3 -mx-2.5 sm:mx-0 md:px-0 md:grid-cols-4 lg:grid-cols-5 scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {displayProducts.map((product, idx) => (
            <div key={product.id} className="w-[135px] sm:w-[140px] md:w-full shrink-0 md:shrink" style={{ flex: "0 0 135px" }}>
              <ProductCard product={product} priority={idx < 5} />
            </div>
          ))}
        </div>

        {/* 5. Section-Level Explore Button Below Carousel */}
        {/* Mobile: Clean full-width 40px white button matching target reference */}
        <div className="mt-3.5 md:hidden">
          <Link
            href={activeCatObj.exploreLink}
            className="w-full h-[40px] flex items-center justify-center rounded-[7px] border border-[#ddd] bg-white text-[12.5px] font-semibold text-gray-800 shadow-2xs hover:bg-gray-50 active:scale-[0.99] transition-all"
          >
            <span>Explore {activeCatObj.label} &gt;</span>
          </Link>
        </div>

        {/* Desktop: Centered pill button */}
        <div className="mt-10 hidden md:block text-center">
          <Link
            href={activeCatObj.exploreLink}
            className="inline-flex items-center gap-2.5 rounded-full border border-gray-300 bg-white px-9 py-3 text-sm font-bold text-gray-800 hover:border-[#F72585] hover:text-[#F72585] hover:shadow-md transition-all duration-200"
          >
            <span>Explore All {activeCatObj.label}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
