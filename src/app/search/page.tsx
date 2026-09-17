"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ChevronRight, Sparkles } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/product/ProductCard";
import { CATEGORIES_LIST } from "@/data/products";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { products } = useStore();

  const matchingProducts = query.trim()
    ? products.filter(
        p =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 sm:mb-6">
          <Link href="/" className="hover:text-[#F72585] transition">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-gray-900">Search Results</span>
        </div>

        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Search Results for &quot;{query}&quot;
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Found {matchingProducts.length} matching gifts available in Repalle & Coastal AP
          </p>
        </div>

        {matchingProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 max-w-lg mx-auto shadow-xs">
            <div className="h-16 w-16 rounded-full bg-pink-50 flex items-center justify-center text-[#F72585] mx-auto mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">No matching gifts found</h2>
            <p className="text-xs text-gray-500 mb-6">
              We couldn&apos;t find anything for &quot;{query}&quot;. Try exploring our popular categories below:
            </p>
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Popular Categories
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                {CATEGORIES_LIST.map(cat => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="min-h-[44px] inline-flex items-center rounded-full border border-gray-200 bg-gray-50 hover:bg-pink-50 hover:border-pink-300 hover:text-[#F72585] px-4 py-2 text-xs font-bold text-gray-800 transition"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6">
            {matchingProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-gray-50/50 min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-white border border-gray-100 p-3 space-y-3 animate-pulse">
                  <div className="w-full aspect-square bg-gray-200 rounded-xl" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
