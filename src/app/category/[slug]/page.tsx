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
    <div className="w-full bg-gray-50/50 min-h-screen">
      {/* Category Hero / Header Banner: Full width edge-to-edge (#1E2233 brand system) */}
      <div className="w-full bg-[#1E2233] border-b border-gray-800 text-white py-8 sm:py-12 relative overflow-hidden">
        {/* Subtle gold grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-4">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
            <Link href="/shop" className="hover:text-white transition">
              Shop
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
            <span className="font-semibold text-[#C9A227]">{categoryName}</span>
          </div>

          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C9A227] uppercase tracking-wider mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              Coastal AP Curated Selection
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {categoryName}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-300">
              {slug === "same-day"
                ? "Delivered within 2 hours in Repalle town, or scheduled for today across Coastal AP hubs."
                : `Handcrafted ${categoryName.toLowerCase()} customized with care in our Repalle gifting workshop.`}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Product Grid: 2 cols mobile, 3 cols tablet (768-1279px), 4 cols desktop (1280px+) */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
