"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal, ChevronRight, X, Sparkles, Zap, Check } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/product/ProductCard";
import { CATEGORIES_LIST, OCCASIONS_LIST, RECIPIENTS_LIST } from "@/data/products";
import { CategorySlug, OccasionType, RecipientType } from "@/types";

function ShopContent() {
  const searchParams = useSearchParams();
  const { products } = useStore();

  const initialOccasion = searchParams.get("occasion") as OccasionType | null;
  const initialRecipient = searchParams.get("recipient") as RecipientType | null;
  const initialCategory = searchParams.get("category") as CategorySlug | null;

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "all");
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(
    initialOccasion ? [initialOccasion] : []
  );
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>(
    initialRecipient ? [initialRecipient] : []
  );
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sameDayOnly, setSameDayOnly] = useState(false);
  const [personalisedOnly, setPersonalisedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Toggle filter helper
  const toggleArrayFilter = (arr: string[], val: string) => {
    return arr.includes(val) ? arr.filter(item => item !== val) : [...arr, val];
  };

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedOccasions([]);
    setSelectedRecipients([]);
    setPriceRange("all");
    setSameDayOnly(false);
    setPersonalisedOnly(false);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedOccasions.length > 0 ||
    selectedRecipients.length > 0 ||
    priceRange !== "all" ||
    sameDayOnly ||
    personalisedOnly;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (selectedCategory !== "all" && p.category !== selectedCategory) {
          return false;
        }
        if (sameDayOnly && !p.isSameDay) return false;
        if (personalisedOnly && !p.isPersonalised) return false;

        if (selectedOccasions.length > 0) {
          const matchOccasion = p.occasions.some(occ => selectedOccasions.includes(occ));
          if (!matchOccasion) return false;
        }

        if (selectedRecipients.length > 0) {
          const matchRecipient = p.recipients.some(rec => selectedRecipients.includes(rec));
          if (!matchRecipient) return false;
        }

        if (priceRange === "under-500" && p.price >= 500) return false;
        if (priceRange === "500-999" && (p.price < 500 || p.price > 999)) return false;
        if (priceRange === "1000-1999" && (p.price < 1000 || p.price > 1999)) return false;
        if (priceRange === "2000-above" && p.price < 2000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "discount") return b.discountPercent - a.discountPercent;
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [
    products,
    selectedCategory,
    sameDayOnly,
    personalisedOnly,
    selectedOccasions,
    selectedRecipients,
    priceRange,
    sortBy,
  ]);

  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#F72585] transition">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-gray-900">All Gifts Catalog</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Personalised Gifts & Flowers in Repalle
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Showing {filteredProducts.length} handcrafted products with same-day delivery options
            </p>
          </div>

          {/* Sort and Mobile Filter Triggers */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-800 shadow-2xs"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#F72585]" />
              Filters {hasActiveFilters && "(Active)"}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-800 shadow-2xs focus:border-[#F72585] focus:outline-none"
              >
                <option value="featured">Featured / Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap mb-6 pb-2 border-b border-gray-200">
            <span className="text-xs font-bold text-gray-500">Active Filters:</span>
            {selectedCategory !== "all" && (
              <span className="rounded-full bg-pink-100 text-[#F72585] px-3 py-1 text-xs font-bold flex items-center gap-1">
                Category: {selectedCategory}
                <X
                  className="h-3.5 w-3.5 cursor-pointer"
                  onClick={() => setSelectedCategory("all")}
                />
              </span>
            )}
            {sameDayOnly && (
              <span className="rounded-full bg-amber-100 text-amber-900 px-3 py-1 text-xs font-bold flex items-center gap-1">
                ⚡ Same-Day Delivery
                <X
                  className="h-3.5 w-3.5 cursor-pointer"
                  onClick={() => setSameDayOnly(false)}
                />
              </span>
            )}
            {personalisedOnly && (
              <span className="rounded-full bg-purple-100 text-purple-900 px-3 py-1 text-xs font-bold flex items-center gap-1">
                ✨ Personalised Art
                <X
                  className="h-3.5 w-3.5 cursor-pointer"
                  onClick={() => setPersonalisedOnly(false)}
                />
              </span>
            )}
            {selectedOccasions.map(occ => (
              <span
                key={occ}
                className="rounded-full bg-gray-200 text-gray-800 px-3 py-1 text-xs font-medium flex items-center gap-1"
              >
                {occ}
                <X
                  className="h-3.5 w-3.5 cursor-pointer"
                  onClick={() =>
                    setSelectedOccasions(prev => prev.filter(o => o !== occ))
                  }
                />
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-red-600 hover:underline ml-2"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Layout: Sidebar + Grid */}
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 shrink-0 space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
                  <SlidersHorizontal className="h-4 w-4 text-[#F72585]" /> Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Quick Toggles */}
              <div className="space-y-2.5 pb-4 border-b border-gray-100">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameDayOnly}
                    onChange={e => setSameDayOnly(e.target.checked)}
                    className="rounded text-[#F72585] focus:ring-[#F72585] h-4 w-4"
                  />
                  <span>⚡ Same-Day Delivery in Repalle</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={personalisedOnly}
                    onChange={e => setPersonalisedOnly(e.target.checked)}
                    className="rounded text-[#F72585] focus:ring-[#F72585] h-4 w-4"
                  />
                  <span>✨ 100% Personalised Keepsakes</span>
                </label>
              </div>

              {/* Category Filter */}
              <div className="space-y-2 pb-4 border-b border-gray-100">
                <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                  Category
                </h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left text-xs py-1 px-2 rounded-lg font-medium transition ${
                      selectedCategory === "all"
                        ? "bg-pink-50 text-[#F72585] font-bold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES_LIST.map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left text-xs py-1 px-2 rounded-lg font-medium transition flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? "bg-pink-50 text-[#F72585] font-bold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.slug && <Check className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2 pb-4 border-b border-gray-100">
                <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                  Price Range
                </h4>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under-500", label: "Under ₹500" },
                    { id: "500-999", label: "₹500 - ₹999" },
                    { id: "1000-1999", label: "₹1,000 - ₹1,999" },
                    { id: "2000-above", label: "₹2,000 & Above" },
                  ].map(p => (
                    <label key={p.id} className="flex items-center gap-2 cursor-pointer py-0.5">
                      <input
                        type="radio"
                        name="price-filter"
                        checked={priceRange === p.id}
                        onChange={() => setPriceRange(p.id)}
                        className="text-[#F72585] focus:ring-[#F72585]"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Occasion Filter */}
              <div className="space-y-2 pb-4 border-b border-gray-100">
                <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                  Occasion
                </h4>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {OCCASIONS_LIST.map(occ => (
                    <label key={occ.slug} className="flex items-center gap-2 cursor-pointer py-0.5">
                      <input
                        type="checkbox"
                        checked={selectedOccasions.includes(occ.slug)}
                        onChange={() =>
                          setSelectedOccasions(prev => toggleArrayFilter(prev, occ.slug))
                        }
                        className="rounded text-[#F72585] focus:ring-[#F72585]"
                      />
                      <span>{occ.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Recipient Filter */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                  For Whom
                </h4>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {RECIPIENTS_LIST.map(rec => (
                    <label key={rec.slug} className="flex items-center gap-2 cursor-pointer py-0.5">
                      <input
                        type="checkbox"
                        checked={selectedRecipients.includes(rec.slug)}
                        onChange={() =>
                          setSelectedRecipients(prev => toggleArrayFilter(prev, rec.slug))
                        }
                        className="rounded text-[#F72585] focus:ring-[#F72585]"
                      />
                      <span>{rec.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center border border-gray-100 shadow-xs">
                <div className="h-16 w-16 rounded-full bg-pink-50 flex items-center justify-center text-[#F72585] mb-3">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-base font-bold text-gray-900">No gifts found for your filter</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm">
                  Try adjusting the price range or resetting selected occasions to discover our wider collection.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 rounded-xl bg-[#F72585] px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-[#d6136c] transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative z-10 w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="font-bold text-base text-gray-900">Filter Gifts</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-6 text-xs">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Delivery & Customisation</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={sameDayOnly}
                      onChange={e => setSameDayOnly(e.target.checked)}
                      className="rounded text-[#F72585]"
                    />
                    <span>⚡ Same-Day Delivery in Repalle</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={personalisedOnly}
                      onChange={e => setPersonalisedOnly(e.target.checked)}
                      className="rounded text-[#F72585]"
                    />
                    <span>✨ Personalised Keepsakes</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Category</h4>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-2 text-xs"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES_LIST.map(cat => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Price Range</h4>
                <div className="space-y-1.5">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under-500", label: "Under ₹500" },
                    { id: "500-999", label: "₹500 - ₹999" },
                    { id: "1000-1999", label: "₹1,000 - ₹1,999" },
                    { id: "2000-above", label: "₹2,000 & Above" },
                  ].map(p => (
                    <label key={p.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="m-price"
                        checked={priceRange === p.id}
                        onChange={() => setPriceRange(p.id)}
                        className="text-[#F72585]"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 rounded-xl bg-gray-100 py-2.5 font-bold text-gray-700"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 rounded-xl bg-[#F72585] py-2.5 font-bold text-white shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading gifts catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
