import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Sparkles } from "lucide-react";
import { INITIAL_PRODUCTS, CATEGORIES_LIST } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES_LIST.map(c => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const categoryInfo = CATEGORIES_LIST.find(c => c.slug === slug);
  if (!categoryInfo && slug !== "same-day") {
    notFound();
  }

  const products = INITIAL_PRODUCTS.filter(p => {
    if (slug === "same-day") return p.isSameDay;
    return p.category === slug;
  });

  const categoryName =
    slug === "same-day" ? "Same-Day Delivery in Repalle" : categoryInfo?.name || "Gifts";

  return (
    <div className="w-full bg-[#FDFCFB] min-h-screen font-sans">
      {/* Category Hero / Header Banner: Full width edge-to-edge (#1E2233 brand system) */}
      <div className="w-full bg-[#1E2233] border-b border-[#2A2F45] text-white py-11 sm:py-14 lg:py-16 relative overflow-hidden">
        {/* Subtle gold grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 mb-5">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/shop" className="hover:text-white transition">
              Shop
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="font-bold text-[#C9A227]">{categoryName}</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#C9A227] uppercase tracking-wider mb-3">
              <Sparkles className="h-4 w-4 text-[#C9A227]" />
              Coastal AP Curated Selection
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-bold tracking-tight text-white leading-tight">
              {categoryName}
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-[17px] text-gray-200 leading-relaxed max-w-2xl font-sans">
              {slug === "same-day"
                ? "Delivered within 2 hours in Repalle town, or scheduled for today across Coastal AP hubs."
                : `Handcrafted ${categoryName.toLowerCase()} customized with care in our Repalle gifting workshop.`}
            </p>
          </div>
        </div>
      </div>

      {/* Main Catalog Content Area: Full width 1700px with generous spacing */}
      <div className="w-full max-w-[1700px] mx-auto px-2 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-14 lg:py-16">
        {/* Product Grid: 2 columns mobile, 4 columns desktop filling full width with large, readable cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 min-[1850px]:grid-cols-5 gap-2.5 sm:gap-6 md:gap-7 lg:gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
