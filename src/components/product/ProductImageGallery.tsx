"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, Gift } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productTitle: string;
  isSameDay?: boolean;
  isWishlisted: boolean;
  onToggleWishlist: (e: React.MouseEvent) => void;
  priority?: boolean;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productTitle,
  isSameDay = false,
  isWishlisted,
  onToggleWishlist,
  priority = false,
}) => {
  const validImages = images && images.length > 0 ? images : ["/images/placeholder.jpg"];
  const totalImages = validImages.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  // Touch swipe support for mobile and tablet
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (totalImages <= 1) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null || totalImages <= 1) return;
    const diffX = touchStartX.current - e.touches[0].clientX;
    const diffY = touchStartY.current - e.touches[0].clientY;

    // Detect horizontal swipe intention
    if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY)) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || totalImages <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;
    const minSwipeDistance = 35;

    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        // Swiped Left -> Next image
        setActiveIndex(prev => (prev + 1) % totalImages);
      } else {
        // Swiped Right -> Previous image
        setActiveIndex(prev => (prev - 1 + totalImages) % totalImages);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex(prev => (prev - 1 + totalImages) % totalImages);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex(prev => (prev + 1) % totalImages);
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex(index);
  };

  return (
    <div
      className="group/gallery relative aspect-square w-full overflow-hidden rounded-[10px] md:rounded-2xl bg-[#F9F7F5] select-none touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Sliding Image Strip */}
      <div
        className="flex h-full w-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {validImages.map((imgUrl, idx) => (
          <div key={idx} className="relative h-full w-full shrink-0 overflow-hidden">
            {/* Shimmer skeleton before image loads */}
            {!loadedImages[idx] && !failedImages[idx] && (
              <div className="absolute inset-0 z-1 bg-gradient-to-r from-gray-100 via-gray-200/60 to-gray-100 animate-pulse flex items-center justify-center">
                <Gift className="h-6 w-6 md:h-8 md:w-8 text-gray-300/80" />
              </div>
            )}

            {/* Error fallback */}
            {failedImages[idx] ? (
              <div className="absolute inset-0 z-2 flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50/40 p-2 text-center">
                <Gift className="h-6 w-6 md:h-8 md:w-8 text-[#F72585] mb-1" />
                <span className="text-[9px] md:text-[11px] font-bold text-gray-500 uppercase">Creative Paradise</span>
              </div>
            ) : (
              <Image
                src={imgUrl}
                alt={`${productTitle} - View ${idx + 1}`}
                fill
                priority={priority && idx === 0}
                sizes="(max-width: 640px) 140px, (max-width: 1024px) 33vw, 20vw"
                onLoad={() => setLoadedImages(prev => ({ ...prev, [idx]: true }))}
                onError={() => setFailedImages(prev => ({ ...prev, [idx]: true }))}
                className={`object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                  loadedImages[idx] ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* 2. Same Day Badge (Top-Left, z-20): 8px-9px font, 6px rounded */}
      {isSameDay && (
        <span className="absolute top-1.5 left-1.5 md:top-3 md:left-3 z-20 pointer-events-none rounded-[6px] md:rounded-lg bg-white/95 backdrop-blur-xs px-1.5 py-0.5 md:px-2.5 md:py-1 text-[8.5px] md:text-xs font-semibold text-gray-800 shadow-xs border border-gray-200/80">
          Same Day
        </span>
      )}

      {/* 3. Wishlist Heart (Top-Right, z-20) */}
      <button
        type="button"
        onClick={onToggleWishlist}
        className={`absolute top-1.5 right-1.5 md:top-3 md:right-3 z-20 flex h-6 w-6 md:h-10 md:w-10 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
          isWishlisted
            ? "bg-white text-[#F72585] shadow-md opacity-100"
            : "border border-white/80 bg-white/70 text-gray-700 backdrop-blur-xs hover:text-[#F72585] opacity-100 md:border-0 md:bg-white md:text-gray-600 md:shadow-xs md:opacity-0 md:group-hover/gallery:opacity-100"
        }`}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`h-3.5 w-3.5 md:h-4.5 md:w-4.5 ${isWishlisted ? "fill-[#F72585] text-[#F72585]" : "stroke-[1.75]"}`} />
      </button>

      {/* 4. Desktop Navigation Arrows (Left & Right, visible on hover) */}
      {totalImages > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous product image"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md backdrop-blur-xs hover:bg-white hover:text-black opacity-0 group-hover/gallery:opacity-100 transition-all duration-200 cursor-pointer active:scale-90"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next product image"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md backdrop-blur-xs hover:bg-white hover:text-black opacity-0 group-hover/gallery:opacity-100 transition-all duration-200 cursor-pointer active:scale-90"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* 5. Dot Indicators (Desktop only to prevent clutter on 120px mobile cards) */}
      {totalImages > 1 && (
        <div className="absolute bottom-2.5 left-0 right-0 z-20 hidden md:flex items-center justify-center gap-1.5 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/25 backdrop-blur-xs px-2 py-1">
            {validImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={e => handleDotClick(e, idx)}
                aria-label={`Go to product image ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? "w-4 h-1.5 bg-[#F72585] shadow-xs"
                    : "w-1.5 h-1.5 bg-white/80 hover:bg-white shadow-2xs"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 6. Image Counter Badge (Bottom-Right, subtle) */}
      {totalImages > 1 && (
        <div className="absolute bottom-1.5 right-1.5 md:bottom-2.5 md:right-2.5 z-20 pointer-events-none rounded bg-black/45 backdrop-blur-xs px-1 md:px-1.5 py-0.2 md:py-0.5 text-[8px] md:text-[10px] font-bold text-white shadow-2xs">
          {activeIndex + 1}/{totalImages}
        </div>
      )}
    </div>
  );
};
