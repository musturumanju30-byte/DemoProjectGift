"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { wishlist, toggleWishlist } = useStore();
  const isWish = wishlist.includes(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex h-full w-full min-w-0 flex-col justify-between bg-transparent md:bg-white p-0 sm:p-2 md:p-5 border-0 md:border md:border-gray-100/90 rounded-none md:rounded-3xl hover:border-gray-200 md:hover:shadow-2xl md:hover:-translate-y-1.5 transition-all duration-300 overflow-hidden font-sans min-h-0 md:min-h-[470px]"
    >
      {/* Product Image Stage: Fixed 1:1 gallery starting right at the top of the card */}
      <ProductImageGallery
        images={product.images}
        productTitle={product.title}
        isSameDay={product.isSameDay}
        isWishlisted={isWish}
        onToggleWishlist={handleToggleWishlist}
        priority={priority}
      />

      {/* Product Content Block: Uniform vertical rhythm and compact height */}
      <div className="flex flex-1 flex-col justify-between pt-1.5 sm:pt-2 md:pt-4 min-w-0">
        <div>
          {/* Product Name: clamped to 2 lines with 10px-11px font */}
          <h3 className="text-[10.5px] sm:text-[12px] md:text-[16px] font-semibold text-gray-900 line-clamp-2 leading-[1.3] min-h-[27px] md:min-h-[2.85rem] group-hover:text-[#F72585] transition-colors break-words">
            {product.title}
          </h3>

          {/* Compact Category/Feature Badge */}
          {product.isPersonalised ? (
            <div className="mt-1">
              <span className="inline-block rounded-[4px] bg-[#4361EE] px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold text-white uppercase tracking-wider">
                Personalise It!
              </span>
            </div>
          ) : product.isBestseller ? (
            <div className="mt-1">
              <span className="inline-block rounded-[4px] bg-[#7B2CBF] px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold text-white uppercase tracking-wider">
                Bestseller
              </span>
            </div>
          ) : null}

          {/* Rating Row: compact green badge */}
          <div className="mt-1 flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold bg-emerald-700 text-white shadow-2xs">
              ★ {product.rating || 4.9}
            </span>
            <span className="text-gray-400 text-[9px] sm:text-[10px]">
              ({product.reviewCount || 184})
            </span>
          </div>

          {/* Earliest Delivery: ⚡ Fastest Today */}
          <div className="mt-0.5 flex items-center gap-1 text-[9px] sm:text-[10px] md:text-[12px] font-medium text-emerald-700 truncate">
            <span>⚡</span>
            <span>Fastest Today</span>
          </div>

          {/* Price Row: compact single line matching target reference */}
          <div className="mt-1 flex items-baseline gap-1.5 whitespace-nowrap overflow-hidden">
            <span className="text-[13px] sm:text-[14px] md:text-xl font-bold md:font-black text-[#0A0A0A]">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-[9px] sm:text-[10px] md:text-sm text-gray-400 line-through font-normal">
                  ₹{product.originalPrice}
                </span>
                <span className="text-[9px] sm:text-[10px] md:text-sm font-bold text-emerald-600">
                  {product.discountPercent || Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>
        </div>

        {/* CTA Button: Desktop only, revealed on hover. Hidden on mobile to keep carousel cards compact */}
        <div className="hidden md:block mt-3.5">
          <span className="flex w-full items-center justify-center rounded-xl border border-[#F72585] bg-white py-2.5 text-xs sm:text-sm font-bold text-[#F72585] opacity-0 group-hover:opacity-100 hover:bg-[#F72585] hover:text-white transition-all duration-200 shadow-xs">
            {product.isPersonalised ? "Personalise Now" : "View Gift"}
          </span>
        </div>
      </div>
    </Link>
  );
};
