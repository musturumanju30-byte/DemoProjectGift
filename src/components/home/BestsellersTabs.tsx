"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/product/ProductCard";
import { CategorySlug } from "@/types";

const BESTSELLER_TABS = [
  { id: "all", label: "All" },
  { id: "roses", label: "Roses", keyword: "rose" },
  { id: "carnations", label: "Carnations", keyword: "carnation" },
  { id: "lilies", label: "Lilies", keyword: "lil" },
  { id: "sunflowers", label: "Sunflowers", keyword: "sunflower" },
  { id: "mix-flowers", label: "Mix Flowers", keyword: "flower" },
];

export const BestsellersTabs: React.FC = () => {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState("all");

  const tabObj = BESTSELLER_TABS.find(t => t.id === activeTab);
  let filteredProducts = products.filter(prod => {
    if (activeTab === "all") return prod.isBestseller;
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
  });

  // Ensure at least 5 products to display full row
  if (filteredProducts.length < 5) {
    const filler = products.filter(p => !filteredProducts.some(fp => fp.id === p.id));
    filteredProducts = [...filteredProducts, ...filler];
  }
  const displayProducts = filteredProducts.slice(0, 5);

  return (
    <section className="w-full bg-white py-16 sm:py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with thin gold underline accent */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
              Shop Bestsellers
            </h2>
            <div className="h-0.5 w-12 bg-[#C9A227] mt-2 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
              Top rated flowers, cakes & handcrafted gifts delivering smiles across Coastal AP
            </p>
          </div>

          {/* Filter Tabs: Pill shaped matching reference design */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {BESTSELLER_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-[#1E2233] text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid: 5 columns desktop with consistent 24px (gap-6) spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {displayProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 5} />
          ))}
        </div>

        {/* Bottom Centered "View All" Button matching reference design */}
        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 hover:border-[#F72585] hover:text-[#F72585] hover:shadow-xs transition-all duration-200"
          >
            Explore All Bestsellers <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
