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

  return (
    <section className={`w-full ${bgClass} py-14 sm:py-18 border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            {badge && (
              <span className="text-[10px] sm:text-xs font-bold text-[#C9A227] uppercase tracking-wider block mb-1">
                {badge}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
              {title}
            </h2>
            <div className="h-0.5 w-12 bg-[#C9A227] mt-2 rounded-full" />
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
          <Link
            href={viewAllLink}
            className="text-xs sm:text-sm font-bold text-[#F72585] hover:underline flex items-center gap-1 shrink-0"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {cardStyle === "beige" ? (
          /* Warm Beige Cards: 5 columns matching reference design */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
            {products.slice(0, 5).map(product => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group flex flex-col items-center justify-between bg-[#F5EBE1] rounded-2xl p-3 sm:p-4 h-72 sm:h-80 border border-stone-200/70 hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full h-52 sm:h-60 overflow-hidden rounded-xl bg-white/30">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                </div>
                <div className="mt-3 w-full flex items-center justify-center">
                  <span className="rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-gray-800 shadow-xs border border-gray-100 group-hover:bg-[#F72585] group-hover:text-white transition-colors truncate max-w-[95%] text-center">
                    {product.title.length > 24 ? product.title.slice(0, 22) + "..." : product.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Standard Product Grid with price row: 5 cols desktop matching row 11 */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.slice(0, 5).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
