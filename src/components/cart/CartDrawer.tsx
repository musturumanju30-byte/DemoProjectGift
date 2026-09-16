"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
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
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  if (!isCartOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 bg-gray-50/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#F72585]" />
            <h2 className="font-semibold text-lg text-gray-900">Your Gifting Cart</h2>
            <span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-semibold text-[#F72585]">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-pink-50/60 border-b border-pink-100 px-5 py-2.5">
          <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
            {remainingForFree > 0 ? (
              <span>
                Add <strong className="text-[#F72585]">₹{remainingForFree}</strong> more for{" "}
                <strong className="text-emerald-600">FREE Same-Day Delivery</strong>!
              </span>
            ) : (
              <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> You unlocked FREE Same-Day Delivery in Repalle!
              </span>
            )}
            <span className="text-gray-500">{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-pink-200">
            <div
              className="h-full bg-gradient-to-r from-[#F72585] to-pink-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
              <div className="h-20 w-20 rounded-full bg-pink-50 flex items-center justify-center mb-4 text-[#F72585]">
                <ShoppingBag className="h-10 w-10 opacity-70" />
              </div>
              <p className="text-base font-medium text-gray-800">Your cart is feeling lonely</p>
              <p className="text-xs text-gray-500 max-w-xs mt-1">
                Explore personalized gifts, fresh roses, and gourmet hampers handcrafted in Repalle.
              </p>
              <button
                onClick={closeCart}
                className="mt-6 min-h-[44px] rounded-full bg-[#F72585] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#d6136c] transition inline-flex items-center justify-center"
              >
                Start Gifting Now
              </button>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.cartItemId}
                className="flex gap-3.5 rounded-xl border border-gray-100 bg-white p-3 shadow-xs hover:border-pink-200 transition"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.product.images[0]}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  {item.product.isSameDay && (
                    <span className="absolute top-1 left-1 rounded bg-[#0A0A0A]/80 px-1 py-0.5 text-[9px] font-bold text-amber-300 uppercase tracking-wider">
                      Same Day
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-1 leading-tight">
                        {item.product.title}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-gray-400 hover:text-red-500 transition min-w-[36px] min-h-[36px] flex items-center justify-center -mr-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Personalisation details */}
                    {item.personalisation?.engravingText && (
                      <p className="text-[11px] text-[#F72585] font-medium mt-0.5 truncate">
                        Custom Text: &quot;{item.personalisation.engravingText}&quot;
                      </p>
                    )}
                    {item.personalisation?.selectedVariant && (
                      <p className="text-[11px] text-gray-500">
                        Option: {item.personalisation.selectedVariant}
                      </p>
                    )}
                    {item.personalisation?.photoUrl && (
                      <p className="text-[11px] text-emerald-600 font-medium">
                        ✓ Photo uploaded
                      </p>
                    )}
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-gray-900">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                      {item.product.originalPrice > item.unitPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{item.product.originalPrice * item.quantity}
                        </span>
                      )}
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="min-w-[32px] min-h-[32px] flex items-center justify-center text-gray-500 hover:text-black transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="min-w-[32px] min-h-[32px] flex items-center justify-center text-gray-500 hover:text-black transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-white p-5 shadow-lg space-y-3">
            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-amber-600" />
                    <div>
                      <span className="font-bold text-amber-900">{appliedCoupon.code}</span> applied
                      <span className="text-amber-700 ml-1">(-₹{discount})</span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="min-h-[36px] px-2 text-xs font-semibold text-red-600 hover:underline flex items-center"
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
                      placeholder="Coupon (e.g. CREATIVE10)"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      className="w-full min-h-[44px] rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-xs uppercase font-medium placeholder:normal-case focus:border-[#F72585] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="min-h-[44px] rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-black transition flex items-center justify-center"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-500 mt-1">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] text-emerald-600 mt-1">{couponSuccess}</p>}
            </div>

            {/* Bill Details */}
            <div className="space-y-1.5 text-xs text-gray-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount Savings</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-medium text-gray-900">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2 text-sm font-bold text-gray-900">
                <span>To Pay</span>
                <span className="text-[#F72585] text-base">₹{total}</span>
              </div>
            </div>

            {/* Checkout CTAs */}
            <div className="space-y-2 pt-1">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F72585] py-3 text-sm font-bold text-white shadow-md hover:bg-[#d6136c] transition active:scale-[0.99]"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                100% Secure Razorpay Checkout & Same-Day Guarantee
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
