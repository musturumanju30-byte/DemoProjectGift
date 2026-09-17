"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { AVAILABLE_COUPONS } from "@/data/locations";
import { ProductCard } from "@/components/product/ProductCard";

export default function CartPage() {
  const router = useRouter();
  const { wishlist, toggleWishlist, products } = useStore();
  const {
    items,
    updateQuantity,
    removeFromCart,
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
  const [couponMsg, setCouponMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isCouponOpen, setIsCouponOpen] = useState(false);

  const freeDeliveryThreshold = 499;
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleApplyCoupon = (code: string) => {
    setCouponMsg(null);
    const res = applyCoupon(code);
    if (res.success) {
      setCouponMsg({ type: "success", text: res.message });
      setCouponInput("");
      setIsCouponOpen(false);
    } else {
      setCouponMsg({ type: "error", text: res.message });
    }
  };

  // Recommended products excluding items already in cart
  const recommendedProducts = products
    ? products.filter(p => !items.some(item => item.product.id === p.id)).slice(0, 8)
    : [];

  // ----------------------------------------------------
  // EMPTY CART STATE
  // ----------------------------------------------------
  if (items.length === 0) {
    return (
      <div className="w-full max-w-full min-w-0 overflow-x-hidden bg-gray-50/50 min-h-[75vh] py-8 sm:py-12 px-3 sm:px-6 box-border">
        <div className="max-w-md w-full mx-auto bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center border border-gray-200/80 shadow-2xs">
          <div className="h-20 w-20 rounded-full bg-pink-50 flex items-center justify-center text-[#F72585] mx-auto mb-4 shadow-inner">
            <ShoppingBag className="h-10 w-10 opacity-90" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 tracking-tight">
            Your Cart is Empty
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed max-w-xs mx-auto">
            Add your favourite personalised gifts, fresh cakes, or flower bouquets and they will appear here.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              href="/shop"
              className="w-full rounded-xl bg-[#F72585] py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#d6136c] active:scale-[0.99] transition flex items-center justify-center gap-1.5"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/category/same-day"
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
            >
              ⚡ Same-Day Delivery in Repalle
            </Link>
          </div>
        </div>

        {/* Recommended gifts even when cart is empty */}
        {recommendedProducts.length > 0 && (
          <section className="w-full max-w-[1400px] mx-auto mt-10 sm:mt-14 pt-6 border-t border-gray-200/70 font-sans overflow-hidden">
            <div className="flex items-center justify-between mb-3.5 sm:mb-5 px-1">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-[#C9A227] uppercase tracking-[0.8px] block mb-0.5">
                  POPULAR IN REPALLE
                </span>
                <h2 className="text-lg sm:text-2xl font-serif font-bold text-[#0A0A0A] tracking-tight">
                  Recommended For You
                </h2>
                <div className="h-0.5 w-10 bg-[#C9A227] mt-1 rounded-full" />
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex text-xs sm:text-sm font-bold text-[#F72585] hover:underline items-center gap-1"
              >
                View More <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="w-full max-w-full min-w-0 overflow-hidden">
              <div
                className="flex md:grid overflow-x-auto md:overflow-visible no-scrollbar gap-2.5 sm:gap-4 md:gap-6 w-full scroll-smooth pb-2"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {recommendedProducts.map(prod => (
                  <div key={prod.id} className="w-[135px] sm:w-[140px] md:w-full shrink-0 md:shrink" style={{ flex: "0 0 135px" }}>
                    <ProductCard product={prod} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 md:hidden">
              <Link
                href="/shop"
                className="w-full h-[40px] flex items-center justify-center rounded-[7px] border border-[#ddd] bg-white text-[12.5px] font-semibold text-gray-800 shadow-2xs hover:bg-gray-50 active:scale-[0.99] transition-all"
              >
                <span>Explore More Gifts &gt;</span>
              </Link>
            </div>
          </section>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // ACTIVE CART STATE
  // ----------------------------------------------------
  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden bg-gray-50/50 min-h-screen py-3 sm:py-6 md:py-8 pb-36 md:pb-12 box-border">
      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 min-w-0">
        
        {/* Desktop Page Title (hidden on mobile since dedicated mobile header is present) */}
        <div className="hidden md:block mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-serif">
              Your Shopping Cart
            </h1>
            <span className="rounded-full bg-pink-100 text-[#F72585] text-xs font-bold px-2.5 py-0.5">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Review your personalized orders and select delivery schedule for Repalle &amp; Coastal AP
          </p>
        </div>

        {/* Free Delivery Progress Banner */}
        <div className="w-full rounded-xl sm:rounded-2xl bg-white border border-pink-100 p-3 sm:p-4 shadow-2xs mb-3 sm:mb-6">
          <div className="flex justify-between text-xs font-bold text-gray-800 mb-1.5">
            {remainingForFree > 0 ? (
              <span className="text-[11.5px] sm:text-xs">
                Add <strong className="text-[#F72585]">₹{remainingForFree}</strong> more to unlock{" "}
                <strong className="text-emerald-600">FREE Same-Day Delivery</strong>!
              </span>
            ) : (
              <span className="text-emerald-700 flex items-center gap-1.5 text-[11.5px] sm:text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>You unlocked FREE Same-Day Delivery in Repalle!</span>
              </span>
            )}
            <span className="text-gray-500 text-[11px] sm:text-xs">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-pink-100">
            <div
              className="h-full bg-gradient-to-r from-[#F72585] to-pink-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Main Cart Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 w-full min-w-0">
          
          {/* ==================================================== */}
          {/* CART ITEMS CONTAINER (1-column horizontal cards) */}
          {/* ==================================================== */}
          <div className="lg:col-span-8 w-full min-w-0 space-y-3">
            {items.map(item => (
              <div
                key={item.cartItemId}
                className="w-full rounded-xl border border-gray-200/80 bg-white p-3 shadow-2xs hover:border-pink-200 transition-all flex flex-col gap-2.5 box-border"
              >
                {/* Upper row: Thumbnail + Details */}
                <div className="flex gap-3 items-start w-full min-w-0">
                  {/* Left: Product Thumbnail (92px-100px square, 10px rounded, clearly visible) */}
                  <div className="relative w-[92px] h-[92px] sm:w-[100px] sm:h-[100px] shrink-0 rounded-[10px] overflow-hidden bg-[#F9F7F5] border border-gray-100">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                    {item.product.isSameDay && (
                      <span className="absolute bottom-1 left-1 rounded bg-black/80 px-1.5 py-0.5 text-[8.5px] font-bold text-amber-300 tracking-tight">
                        ⚡ Same Day
                      </span>
                    )}
                  </div>

                  {/* Right: Product Info & Pricing */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                    <div>
                      <div className="flex items-start justify-between gap-1.5">
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="text-[13px] sm:text-sm font-semibold text-gray-900 hover:text-[#F72585] transition line-clamp-2 leading-snug"
                        >
                          {item.product.title}
                        </Link>
                        {/* Desktop top-right remove icon */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="hidden sm:inline-flex text-gray-400 hover:text-red-500 transition p-1 cursor-pointer shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Customization Details (compact chips) */}
                      {item.personalisation && (
                        <div className="mt-1 flex flex-wrap gap-1 text-[10.5px]">
                          {item.personalisation.engravingText && (
                            <span className="inline-flex items-center rounded bg-pink-50 px-1.5 py-0.5 text-[#F72585] font-medium border border-pink-100 truncate max-w-full">
                              Name: &quot;{item.personalisation.engravingText}&quot;
                            </span>
                          )}
                          {item.personalisation.selectedVariant && (
                            <span className="inline-flex items-center rounded bg-gray-100 px-1.5 py-0.5 text-gray-700 font-medium">
                              {item.personalisation.selectedVariant}
                            </span>
                          )}
                          {item.personalisation.photoName && (
                            <span className="inline-flex items-center rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-700 font-medium">
                              ✓ Photo Attached
                            </span>
                          )}
                          {item.personalisation.messageCardNote && (
                            <span className="inline-flex items-center rounded bg-amber-50 px-1.5 py-0.5 text-amber-800 italic">
                              Note: &quot;{item.personalisation.messageCardNote}&quot;
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Pricing & Delivery Info */}
                    <div className="mt-1.5">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-[15px] sm:text-base font-bold text-gray-950">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                        {item.product.originalPrice > item.unitPrice && (
                          <>
                            <span className="text-[11.5px] text-gray-400 line-through">
                              ₹{item.product.originalPrice * item.quantity}
                            </span>
                            <span className="text-[11px] font-bold text-emerald-600">
                              {item.product.discountPercent}% OFF
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[10.5px] font-semibold text-emerald-700 mt-0.5">
                        <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
                        <span>⚡ Fastest Delivery: Today in Repalle</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom row: Compact Quantity Stepper + Save for Later + Remove */}
                <div className="border-t border-gray-100 pt-2 flex items-center justify-between flex-wrap gap-2">
                  {/* Quantity Stepper (32px height, easy finger tap) */}
                  <div className="flex items-center h-8 w-[96px] rounded-lg border border-gray-200 bg-gray-50/80 p-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="w-7 h-full min-h-[30px] rounded flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-200/80 transition cursor-pointer active:scale-90"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="flex-1 text-center text-xs font-bold text-gray-900 select-none">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="w-7 h-full min-h-[30px] rounded flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-200/80 transition cursor-pointer active:scale-90"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Actions: Save for later & Remove */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleWishlist(item.product.id)}
                      className={`flex items-center gap-1 text-[11px] font-medium py-1 px-1.5 rounded hover:bg-pink-50 transition cursor-pointer ${
                        wishlist.includes(item.product.id)
                          ? "text-[#F72585] font-semibold"
                          : "text-gray-500 hover:text-[#F72585]"
                      }`}
                      aria-label="Save for later"
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${wishlist.includes(item.product.id) ? "fill-[#F72585] text-[#F72585]" : ""}`}
                      />
                      <span>{wishlist.includes(item.product.id) ? "Saved" : "Save for later"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="flex items-center gap-1 text-[11px] font-medium text-gray-500 hover:text-red-600 py-1 px-1.5 rounded hover:bg-red-50 transition cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon Section (Positioned directly after items on mobile, or in sidebar on desktop) */}
            <div className="rounded-xl border border-gray-200/80 bg-white p-3 sm:p-4 shadow-2xs space-y-2.5">
              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-amber-700 shrink-0" />
                    <div>
                      <span className="font-bold text-amber-900">{appliedCoupon.code} Applied</span>
                      <p className="text-[11px] text-amber-700">You saved ₹{discount} with this coupon!</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={() => setIsCouponOpen(prev => !prev)}
                    className="w-full flex items-center justify-between text-xs font-bold text-gray-900 cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11.5px] sm:text-xs">
                      <Tag className="h-4 w-4 text-[#C9A227]" /> Apply Coupon
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#F72585] font-semibold">
                      {isCouponOpen ? "Hide" : "View Offers"}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isCouponOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  {/* Expandable coupon box */}
                  <div className={`mt-3 space-y-2.5 ${isCouponOpen ? "block" : "hidden sm:block"}`}>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value)}
                        className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold uppercase placeholder:normal-case focus:border-[#F72585] focus:outline-none focus:bg-white transition"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon(couponInput)}
                        className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white hover:bg-black transition active:scale-95 cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Quick coupon chips */}
                    <div className="pt-1">
                      <span className="text-[10px] text-gray-500 font-semibold block mb-1.5">
                        Recommended coupons:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {AVAILABLE_COUPONS.map(c => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => handleApplyCoupon(c.code)}
                            className="rounded-lg border border-dashed border-amber-300 bg-amber-50/70 px-2 py-1 text-[10px] font-bold text-amber-900 hover:bg-amber-100 active:scale-95 transition cursor-pointer"
                          >
                            {c.code} ({c.title})
                          </button>
                        ))}
                      </div>
                    </div>

                    {couponMsg && (
                      <p
                        className={`text-xs font-semibold mt-1 ${
                          couponMsg.type === "success" ? "text-emerald-600" : "text-red-500"
                        }`}
                      >
                        {couponMsg.text}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ==================================================== */}
          {/* PRICE SUMMARY SIDEBAR (4 cols on desktop) */}
          {/* ==================================================== */}
          <div className="lg:col-span-4 w-full min-w-0 space-y-4">
            <div className="rounded-xl border border-gray-200/80 bg-white p-3.5 sm:p-5 shadow-2xs space-y-3">
              <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                Price Details
              </h3>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Product Total ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
                  <span className="font-bold text-gray-900">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-bold text-gray-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-3 text-[15px] sm:text-base font-extrabold text-gray-950">
                  <span>Total Amount</span>
                  <span className="text-[#F72585]">₹{total}</span>
                </div>
              </div>

              {discount > 0 && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-2 text-center text-[11px] font-bold text-emerald-700">
                  🎉 You are saving ₹{discount} on this order!
                </div>
              )}

              {/* Full-width page CTA */}
              <div className="pt-2">
                <Link
                  href="/checkout"
                  className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#F72585] text-sm font-bold text-white shadow-md hover:bg-[#d6136c] active:scale-[0.99] transition"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[10.5px] text-gray-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Razorpay Secured • Same-Day Dispatch Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* RECOMMENDED PRODUCTS ("You May Also Like") */}
        {/* ==================================================== */}
        {recommendedProducts.length > 0 && (
          <section className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-gray-200/80 font-sans w-full min-w-0 overflow-hidden">
            <div className="flex items-center justify-between mb-3.5 sm:mb-5">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-[#C9A227] uppercase tracking-[0.8px] block mb-0.5">
                  HANDPICKED FOR YOU
                </span>
                <h2 className="text-lg sm:text-2xl font-serif font-bold text-[#0A0A0A] tracking-tight">
                  You May Also Like
                </h2>
                <div className="h-0.5 w-10 sm:w-12 bg-[#C9A227] mt-1 rounded-full" />
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex text-xs sm:text-sm font-bold text-[#F72585] hover:underline items-center gap-1"
              >
                View More <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Horizontal swipable product carousel on mobile, 4-col grid on desktop */}
            <div className="w-full max-w-full min-w-0 overflow-hidden">
              <div
                className="flex md:grid overflow-x-auto md:overflow-visible no-scrollbar gap-2.5 sm:gap-4 md:gap-6 w-full scroll-smooth pb-2"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {recommendedProducts.map(prod => (
                  <div
                    key={prod.id}
                    className="w-[135px] sm:w-[140px] md:w-full shrink-0 md:shrink"
                    style={{ flex: "0 0 135px" }}
                  >
                    <ProductCard product={prod} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Section-Level Explore Button */}
            <div className="mt-3.5 md:hidden">
              <Link
                href="/shop"
                className="w-full h-[40px] flex items-center justify-center rounded-[7px] border border-[#ddd] bg-white text-[12.5px] font-semibold text-gray-800 shadow-2xs hover:bg-gray-50 active:scale-[0.99] transition-all"
              >
                <span>Explore More Gifts &gt;</span>
              </Link>
            </div>
          </section>
        )}
      </div>

      {/* ==================================================== */}
      {/* STICKY CHECKOUT BAR (Mobile Only, above bottom nav) */}
      {/* ==================================================== */}
      <div
        className="fixed bottom-14 left-0 right-0 z-30 max-w-full min-w-0 box-border bg-white/95 backdrop-blur-md border-t border-gray-200/90 px-3 sm:px-4 py-2 sm:py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex md:hidden items-center justify-between gap-2 overflow-hidden"
      >
        <div className="shrink-0 min-w-0">
          <span className="text-[9.5px] text-gray-500 font-semibold uppercase tracking-wider block truncate">
            Total Amount
          </span>
          <span className="text-sm sm:text-base font-extrabold text-gray-950 block leading-tight">
            ₹{total}
          </span>
        </div>

        <Link
          href="/checkout"
          className="h-10 sm:h-11 px-3 sm:px-5 rounded-xl bg-[#F72585] text-white text-[11.5px] sm:text-xs font-bold shadow-md hover:bg-[#d6136c] active:scale-95 transition flex items-center gap-1.5 shrink-0"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
        </Link>
      </div>
    </div>
  );
}
