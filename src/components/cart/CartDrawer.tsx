"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Truck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { CartItem } from "@/types";

interface CartItemRowProps {
  item: CartItem;
  onCloseCart: () => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item, onCloseCart }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { wishlist, toggleWishlist } = useStore();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isItemWishlisted = wishlist.includes(item.product.id);
  const images = item.product.images && item.product.images.length > 0 ? item.product.images : ["/images/placeholder.jpg"];

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex(prev => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="group relative flex gap-3.5 sm:gap-4 rounded-2xl border border-gray-100 bg-white p-3.5 sm:p-4 shadow-2xs hover:border-pink-200 transition-all">
      {/* Product Image & Multi-Image Gallery */}
      <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl bg-[#F9F7F5] border border-gray-100">
        <Link
          href={`/product/${item.product.slug}`}
          onClick={onCloseCart}
          className="relative block h-full w-full"
          aria-label={`View ${item.product.title}`}
        >
          <Image
            src={images[activeImageIndex]}
            alt={item.product.title}
            fill
            sizes="(max-width: 640px) 96px, 112px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Multi-image indicator & navigation arrows if product has multiple images */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous image"
              className="absolute left-1 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white/90 text-gray-800 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next image"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white/90 text-gray-800 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
            <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1">
              {images.slice(0, 4).map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeImageIndex ? "w-3 bg-[#F72585]" : "w-1.5 bg-black/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        {item.product.isSameDay && (
          <span className="absolute top-1.5 left-1.5 rounded-md bg-[#1E2233]/90 backdrop-blur-xs px-1.5 py-0.5 text-[10px] font-bold text-amber-300 tracking-wider">
            Same Day
          </span>
        )}
      </div>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          {/* Badges / Rating Row */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              {item.product.isPersonalised && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#F72585] bg-pink-50 px-1.5 py-0.5 rounded-md">
                  <Sparkles className="h-3 w-3" /> Personalised
                </span>
              )}
              {item.product.rating && (
                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                  <Star className="h-3 w-3 fill-emerald-600 text-emerald-600" />
                  {item.product.rating.toFixed(1)}
                </span>
              )}
            </div>

            {/* Remove Trash Button */}
            <button
              type="button"
              onClick={() => removeFromCart(item.cartItemId)}
              className="h-8 w-8 min-h-[32px] min-w-[32px] rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition cursor-pointer"
              aria-label={`Remove ${item.product.title} from cart`}
              title="Remove item"
            >
              <Trash2 className="h-4.5 w-4.5 text-current" />
            </button>
          </div>

          {/* Product Title */}
          <Link
            href={`/product/${item.product.slug}`}
            onClick={onCloseCart}
            className="block text-sm sm:text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2 hover:text-[#F72585] transition"
          >
            {item.product.title}
          </Link>

          {/* Personalisation details */}
          {item.personalisation?.engravingText && (
            <p className="text-xs text-[#F72585] font-medium mt-1 truncate">
              Text: &quot;{item.personalisation.engravingText}&quot;
            </p>
          )}
          {item.personalisation?.selectedVariant && (
            <p className="text-xs text-gray-500 mt-0.5">
              Variant: {item.personalisation.selectedVariant}
            </p>
          )}
          {item.personalisation?.photoUrl && (
            <p className="text-xs text-emerald-600 font-medium mt-0.5">
              ✓ Custom Photo Attached
            </p>
          )}

          {/* Same-day info */}
          {item.product.isSameDay && (
            <p className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
              ⚡ Same-Day Delivery Available
            </p>
          )}
        </div>

        {/* Pricing, Quantity Stepper & Wishlist Action */}
        <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-gray-50">
          {/* Price Hierarchy */}
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-base sm:text-lg font-bold text-gray-950">
              ₹{item.unitPrice * item.quantity}
            </span>
            {item.product.originalPrice > item.unitPrice && (
              <>
                <span className="text-xs text-gray-400 line-through">
                  ₹{item.product.originalPrice * item.quantity}
                </span>
                <span className="text-xs font-semibold text-emerald-600">
                  {item.product.discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* Stepper and Wishlist */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Wishlist / Save for Later */}
            <button
              type="button"
              onClick={() => toggleWishlist(item.product.id)}
              className={`h-9 w-9 min-h-[36px] min-w-[36px] rounded-xl flex items-center justify-center transition cursor-pointer ${
                isItemWishlisted
                  ? "bg-pink-50 text-[#F72585]"
                  : "text-gray-400 hover:text-[#F72585] hover:bg-pink-50/50"
              }`}
              aria-label={isItemWishlisted ? "Remove from wishlist" : "Save for later"}
              title={isItemWishlisted ? "Saved in wishlist" : "Save for later"}
            >
              <Heart
                className={`h-5 w-5 ${isItemWishlisted ? "fill-[#F72585]" : ""}`}
              />
            </button>

            {/* Quantity Selector: [ - ] 1 [ + ] */}
            <div className="flex items-center h-9 w-[104px] sm:w-[110px] rounded-xl border border-gray-200 bg-gray-50/80 p-0.5">
              <button
                type="button"
                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                className="w-8 h-full min-h-[32px] rounded-lg flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-200/80 transition cursor-pointer active:scale-90"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="flex-1 text-center text-xs sm:text-sm font-bold text-gray-900 select-none">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                className="w-8 h-full min-h-[32px] rounded-lg flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-200/80 transition cursor-pointer active:scale-90"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CartDrawer: React.FC = () => {
  const router = useRouter();
  const {
    items,
    isCartOpen,
    closeCart,
    subtotal,
    discount,
    deliveryFee,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    itemCount,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Animation mounting state for smooth 350ms slide-in and slide-out
  const [isRendered, setIsRendered] = useState(isCartOpen);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      setIsRendered(true);
      const raf = requestAnimationFrame(() => {
        setIsDrawerVisible(true);
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setIsDrawerVisible(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  // Body scroll lock
  useEffect(() => {
    if (isCartOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isCartOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!isRendered) return null;

  const freeDeliveryThreshold = 499;
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput("");
    } else {
      setCouponError(res.message);
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      {/* Background Backdrop Overlay (35% opacity + soft blur, click to close) */}
      <div
        className={`fixed inset-0 bg-black/35 backdrop-blur-[2px] transition-opacity duration-350 ease-out cursor-pointer ${
          isDrawerVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart Drawer Container */}
      <aside
        className={`cart-drawer fixed top-0 right-0 bottom-0 z-10 flex h-full h-dvh w-full sm:w-[450px] md:w-[480px] lg:w-[500px] xl:w-[520px] flex-col bg-white shadow-2xl transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDrawerVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ==============================================
            1. Cart Header
           ============================================== */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4 bg-white/95 shrink-0">
          <div className="flex items-baseline gap-2.5">
            <h2 className="font-serif text-2xl font-bold text-gray-900 tracking-tight">Your Cart</h2>
            <span className="text-xs sm:text-sm font-semibold text-gray-500">
              ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            aria-label="Close cart"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* ==============================================
            2. Free Delivery Progress Indicator
           ============================================== */}
        <div className="bg-pink-50/70 border-b border-pink-100/80 px-5 sm:px-6 py-2.5 shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-1.5">
            {remainingForFree > 0 ? (
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-[#F72585] shrink-0" />
                <span>
                  Add <strong className="text-[#F72585]">₹{remainingForFree}</strong> more for{" "}
                  <strong className="text-emerald-700">FREE Delivery</strong>
                </span>
              </span>
            ) : (
              <span className="text-emerald-700 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>🎉 You unlocked FREE Delivery in Repalle!</span>
              </span>
            )}
            <span className="text-gray-500 font-medium">{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-pink-200/80">
            <div
              className="h-full bg-gradient-to-r from-[#F72585] via-pink-500 to-[#C9A227] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ==============================================
            3. Scrollable Products Area
           ============================================== */}
        <div className="cart-items flex-1 overflow-y-auto thin-scrollbar px-4 sm:px-6 py-4 space-y-3.5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-pink-50 flex items-center justify-center mb-5 text-[#F72585]">
                <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 opacity-80" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 tracking-tight">
                Your cart is empty
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xs mt-2 leading-relaxed">
                Discover something special for every occasion. Personalized gifts, flowers & fresh cakes.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#F72585] px-7 py-3 text-sm font-bold text-white shadow-md hover:bg-[#d6136c] transition active:scale-95"
              >
                <span>Explore Gifts</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            items.map(item => (
              <CartItemRow key={item.cartItemId} item={item} onCloseCart={closeCart} />
            ))
          )}
        </div>

        {/* ==============================================
            4. Sticky Cart Summary (Fixed at bottom)
           ============================================== */}
        {items.length > 0 && (
          <div className="cart-summary shrink-0 border-t border-gray-100 bg-white p-4 sm:p-6 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] space-y-3">
            {/* Coupon Code Section */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-xl bg-amber-50/80 border border-amber-200/90 px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-amber-600" />
                    <div>
                      <span className="font-bold text-amber-900">{appliedCoupon.code}</span> applied
                      <span className="text-amber-700 ml-1 font-semibold">(-₹{discount})</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="min-h-[32px] px-2 text-xs font-bold text-red-600 hover:underline flex items-center cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Coupon (CREATIVE10, REPALLE300)"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      className="w-full h-10 rounded-xl border border-gray-200 bg-gray-50/70 py-2 pl-9 pr-3 text-xs uppercase font-medium placeholder:normal-case focus:border-[#F72585] focus:bg-white focus:outline-none transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-10 rounded-xl bg-gray-900 px-4 text-xs font-bold text-white hover:bg-black transition flex items-center justify-center cursor-pointer active:scale-95"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-500 mt-1 pl-1">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] text-emerald-600 mt-1 pl-1 font-medium">{couponSuccess}</p>}
            </div>

            {/* Bill Details */}
            <div className="space-y-1.5 text-xs sm:text-sm text-gray-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount Savings</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-gray-900">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between items-baseline border-t border-gray-100 pt-2 text-gray-900">
                <span className="text-sm sm:text-base font-semibold">Total</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A]">
                  ₹{total}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="flex h-[48px] sm:h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#F72585] text-sm sm:text-base font-bold text-white shadow-md hover:bg-[#d6136c] transition active:scale-[0.99] cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>100% Secure Checkout • Same-Day Dispatch Guarantee</span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

