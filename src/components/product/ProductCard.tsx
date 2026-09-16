"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Gift } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { wishlist, toggleWishlist } = useStore();
  const isWish = wishlist.includes(product.id);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const imageSrc = product.images && product.images.length > 0 ? product.images[0] : "";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex h-full flex-col justify-between rounded-2xl bg-white p-3 border border-gray-100/90 hover:border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Product Image Stage: Fixed 1:1 locked aspect ratio with consistent soft neutral background */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F9F7F5] select-none">
        {/* 1. Loading Skeleton / Shimmer Placeholder */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 z-1 bg-gradient-to-r from-gray-100 via-gray-200/60 to-gray-100 animate-pulse flex items-center justify-center">
            <Gift className="h-6 w-6 text-gray-300/80 animate-pulse" />
          </div>
        )}

        {/* 2. Branded Fallback State: soft pink/cream background with gift icon (NEVER raw alt text) */}
        {hasError || !imageSrc ? (
          <div className="absolute inset-0 z-2 flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50/40 p-4 text-center select-none">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/90 border border-pink-200/70 shadow-2xs flex items-center justify-center text-[#F72585] mb-1.5">
              <Gift className="h-5 w-5 opacity-90" />
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Creative Paradise
            </span>
          </div>
        ) : (
          <Image
            src={imageSrc}
            alt="" // Decorative/fallback handled via accessible card title, empty string prevents browser from rendering raw text on error
            fill
            priority={priority}
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className={`object-cover group-hover:scale-103 transition-all duration-500 ease-out ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        {/* 3. Same Day Tag Pill: Absolute position relative to container, high z-index (z-20) */}
        {product.isSameDay && (
          <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-20 pointer-events-none rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-medium text-gray-600 shadow-2xs border border-gray-200/70">
            Same Day
          </span>
        )}

        {/* 4. Wishlist Icon: Absolute position relative to container, high z-index (z-20) */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-20 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${
            isWish
              ? "bg-white text-[#F72585] shadow-xs opacity-100"
              : "border border-white/80 bg-white/40 text-gray-700 backdrop-blur-xs hover:text-[#F72585] opacity-100 md:border-0 md:bg-white md:text-gray-600 md:shadow-xs md:opacity-0 md:group-hover:opacity-100"
          }`}
          aria-label={isWish ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-3.5 w-3.5 ${isWish ? "fill-[#F72585] text-[#F72585]" : "stroke-[1.75]"}`} />
        </button>
      </div>

      {/* Product Content Block: Uniform vertical rhythm and height */}
      <div className="flex flex-1 flex-col justify-between pt-2.5 sm:pt-3">
        <div>
          {/* Product Name: clamped to 2 lines with fixed min-h so all cards align identically */}
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 leading-snug min-h-[2.25rem] sm:min-h-[2.5rem] group-hover:text-[#F72585] transition-colors">
            {product.title}
          </h3>

          {/* Rating Row: star icon and count */}
          <div className="mt-1 flex items-center gap-1.5 text-[11px]">
            <span className="inline-flex items-center gap-0.5 rounded-sm bg-emerald-700 px-1.5 py-0.2 text-[10px] font-bold text-white">
              ★ {product.rating || 4.8}
            </span>
            <span className="text-gray-400 text-[10px]">
              ({product.reviewCount || 124})
            </span>
          </div>

          {/* Earliest Delivery Pill matching reference design */}
          <div className="mt-1 flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-emerald-700">
            <span>⚡ Earliest Delivery: Today</span>
          </div>

          {/* Price Row matching reference design: bold black, strikethrough, green discount */}
          <div className="mt-1 flex items-baseline gap-1.5 whitespace-nowrap overflow-hidden min-h-[1.5rem]">
            <span className="text-sm sm:text-base font-black text-[#0A0A0A]">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  {product.discountPercent || Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>
        </div>

        {/* CTA Button: fixed container height ensuring identical row bottom alignment */}
        <div className="mt-2.5">
          {/* Mobile view: thin outlined button visible at rest */}
          <span className="flex md:hidden w-full items-center justify-center rounded-[6px] border border-gray-300 bg-white py-1.5 text-[11px] font-medium text-gray-700">
            {product.isPersonalised ? "Personalise Now" : "View Gift"}
          </span>

          {/* Desktop view: hidden at rest, revealed on hover as a slim outlined button */}
          <div className="hidden md:block">
            <span className="flex w-full items-center justify-center rounded-[6px] border border-[#F72585] bg-white py-1.5 text-xs font-medium text-[#F72585] opacity-0 group-hover:opacity-100 hover:bg-[#F72585] hover:text-white transition-all duration-200 shadow-2xs">
              {product.isPersonalised ? "Personalise Now" : "View Gift"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
