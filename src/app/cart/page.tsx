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
  Truck,
  Sparkles,
  CheckCircle2,
  Heart,
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
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const freeDeliveryThreshold = 499;
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleApplyCoupon = (code: string) => {
    setCouponMsg(null);
    const res = applyCoupon(code);
    if (res.success) {
      setCouponMsg({ type: "success", text: res.message });
      setCouponInput("");
    } else {
      setCouponMsg({ type: "error", text: res.message });
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-gray-50/50 min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm">
          <div className="h-20 w-20 rounded-full bg-pink-50 flex items-center justify-center text-[#F72585] mx-auto mb-4">
            <ShoppingBag className="h-10 w-10 opacity-80" />
          </div>
          <h1 className="text-xl font-extrabold text-gray-900">Your Shopping Cart is Empty</h1>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Looks like you haven&apos;t added any personalized gifts, fresh flower bouquets, or delicious cakes to your cart yet.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link
              href="/shop"
              className="rounded-xl bg-[#F72585] py-3 text-xs font-bold text-white shadow-md hover:bg-[#d6136c] transition"
            >
              Explore Personalised Gifts
            </Link>
            <Link
              href="/category/same-day"
              className="rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
            >
              ⚡ Same-Day Delivery in Repalle
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Your Shopping Cart
        </h1>
        <p className="text-xs text-gray-500 mb-6">
          Review your personalized orders and select delivery schedule for Repalle & Coastal AP
        </p>

        {/* Free Delivery Bar */}
        <div className="rounded-2xl bg-white border border-pink-100 p-4 shadow-xs mb-8">
          <div className="flex justify-between text-xs font-bold text-gray-800 mb-1.5">
            {remainingForFree > 0 ? (
              <span>
                Add <strong className="text-[#F72585]">₹{remainingForFree}</strong> more to unlock{" "}
                <strong className="text-emerald-600">FREE Same-Day Delivery</strong>!
              </span>
            ) : (
              <span className="text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> You unlocked FREE Same-Day Delivery in Repalle!
              </span>
            )}
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-pink-100">
            <div
              className="h-full bg-gradient-to-r from-[#F72585] to-pink-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {items.map(item => (
              <div
                key={item.cartItemId}
                className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-xs hover:border-pink-200 transition flex flex-col sm:flex-row gap-4"
              >
                {/* Thumbnail */}
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={item.product.images[0]}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  {item.product.isSameDay && (
                    <span className="absolute top-1 left-1 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-bold text-amber-300">
                      ⚡ Same Day
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="text-sm sm:text-base font-bold text-gray-900 hover:text-[#F72585] transition line-clamp-1"
                      >
                        {item.product.title}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-gray-400 hover:text-red-500 transition p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Customization Details */}
                    {item.personalisation && (
                      <div className="mt-2 rounded-xl bg-pink-50/60 p-2.5 text-xs text-gray-700 space-y-1">
                        {item.personalisation.engravingText && (
                          <p>
                            <strong className="text-[#F72585]">Engraving / Name:</strong> &quot;
                            {item.personalisation.engravingText}&quot;
                          </p>
                        )}
                        {item.personalisation.selectedVariant && (
                          <p>
                            <strong>Variant:</strong> {item.personalisation.selectedVariant}
                          </p>
                        )}
                        {item.personalisation.photoName && (
                          <p className="text-emerald-700 font-medium">
                            ✓ Uploaded Photo: {item.personalisation.photoName}
                          </p>
                        )}
                        {item.personalisation.messageCardNote && (
                          <p className="italic text-gray-600">
                            Card Note: &quot;{item.personalisation.messageCardNote}&quot;
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Pricing, Stepper, and Wishlist */}
                  <div className="mt-4 flex items-center justify-between pt-2 border-t border-gray-100 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-bold text-gray-900">
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

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleWishlist(item.product.id)}
                        className={`h-9 w-9 min-h-[36px] min-w-[36px] rounded-xl flex items-center justify-center transition cursor-pointer ${
                          wishlist.includes(item.product.id)
                            ? "bg-pink-50 text-[#F72585]"
                            : "text-gray-400 hover:text-[#F72585] hover:bg-pink-50/50"
                        }`}
                        aria-label={wishlist.includes(item.product.id) ? "Remove from wishlist" : "Save for later"}
                        title={wishlist.includes(item.product.id) ? "Saved in wishlist" : "Save for later"}
                      >
                        <Heart
                          className={`h-5 w-5 ${wishlist.includes(item.product.id) ? "fill-[#F72585]" : ""}`}
                        />
                      </button>

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
            ))}
          </div>

          {/* Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Promo Voucher Box */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="h-4 w-4 text-[#C9A227]" /> Apply Coupon
              </h3>

              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs">
                  <div>
                    <span className="font-bold text-amber-900">{appliedCoupon.code}</span>
                    <p className="text-[11px] text-amber-700">You saved ₹{discount}!</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code (e.g. CREATIVE10)"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold uppercase placeholder:normal-case focus:border-[#F72585] focus:outline-none"
                    />
                    <button
                      onClick={() => handleApplyCoupon(couponInput)}
                      className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white hover:bg-black transition"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Available vouchers chips */}
                  <div className="pt-2">
                    <span className="text-[10px] text-gray-500 font-semibold block mb-1">
                      Quick coupons:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {AVAILABLE_COUPONS.map(c => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => handleApplyCoupon(c.code)}
                          className="rounded-lg border border-dashed border-amber-300 bg-amber-50/70 px-2 py-1 text-[10px] font-bold text-amber-900 hover:bg-amber-100 transition"
                        >
                          {c.code} ({c.title})
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {couponMsg && (
                <p
                  className={`text-xs font-semibold ${
                    couponMsg.type === "success" ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Order Price Breakdown */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                Order Summary
              </h3>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-bold text-gray-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-3 text-base font-extrabold text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-[#F72585]">₹{total}</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/checkout"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F72585] py-3.5 text-sm font-extrabold text-white shadow-lg hover:bg-[#d6136c] transition active:scale-[0.98]"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Razorpay Secured • Same-Day Dispatch Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products Carousel ("You May Also Like") */}
        {products && products.length > 0 && (
          <section className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-gray-200/80 font-sans">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-[#C9A227] uppercase tracking-[0.8px] block mb-0.5">
                  HANDPICKED FOR YOU
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0A0A0A] tracking-tight">
                  You May Also Like
                </h2>
                <div className="h-0.5 w-12 bg-[#C9A227] mt-1.5 rounded-full" />
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex text-xs sm:text-sm font-bold text-[#F72585] hover:underline items-center gap-1"
              >
                View More <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div
              className="flex md:grid overflow-x-auto md:overflow-visible no-scrollbar gap-2.5 sm:gap-4 md:gap-6 w-full pl-2.5 pr-3 -mx-2.5 sm:mx-0 md:px-0 md:grid-cols-4 scroll-smooth"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {products
                .filter(p => !items.some(item => item.product.id === p.id))
                .slice(0, 8)
                .map(prod => (
                  <div key={prod.id} className="w-[135px] sm:w-[140px] md:w-full shrink-0 md:shrink" style={{ flex: "0 0 135px" }}>
                    <ProductCard product={prod} />
                  </div>
                ))}
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
    </div>
  );
}
