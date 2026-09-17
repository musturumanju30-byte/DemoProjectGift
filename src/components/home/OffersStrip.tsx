"use client";

import React, { useState } from "react";
import { AVAILABLE_COUPONS } from "@/data/locations";
import { Copy, Check, Tag, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const OffersStrip: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { applyCoupon } = useCart();

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <section className="w-full bg-[#FAF8F5] py-10 sm:py-20 border-b border-gray-200/70 font-sans">
      <div className="w-full max-w-[1700px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Heading with gold underline accent */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#C9A227] uppercase tracking-wider mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>SAVINGS &amp; REWARDS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0A0A0A] tracking-tight leading-tight">
              Exclusive Gifting Offers &amp; Vouchers
            </h2>
            <div className="h-0.5 w-14 bg-[#C9A227] mt-2 sm:mt-2.5 rounded-full" />
            <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-2 leading-relaxed">
              Click any voucher to copy code and automatically apply discount at checkout
            </p>
          </div>
        </div>

        {/* 3 Voucher Ticket Cards filling full width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 w-full">
          {AVAILABLE_COUPONS.map((coupon, idx) => {
            const isCopied = copiedCode === coupon.code;
            const bankBadges = [
              { name: "HDFC BANK", bg: "bg-[#004C8F]", text: "text-white" },
              { name: "ICICI Bank", bg: "bg-[#F58220]", text: "text-white" },
              { name: "AXIS BANK", bg: "bg-[#97144D]", text: "text-white" },
            ];
            const bank = bankBadges[idx % bankBadges.length];

            return (
              <div
                key={coupon.code}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FFF8D6] border-2 border-dashed border-[#F3CD68] p-5 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[200px] sm:min-h-[240px] w-full min-w-0"
              >
                {/* Left Ticket Cutout Hole */}
                <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FAF8F5] border-r-2 border-dashed border-[#F3CD68]" />

                {/* Right Ticket Cutout Hole */}
                <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FAF8F5] border-l-2 border-dashed border-[#F3CD68]" />

                {/* Content */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className={`rounded-md ${bank.bg} ${bank.text} px-2.5 py-1 text-[11px] font-black tracking-wider shadow-2xs`}>
                      {bank.name}
                    </span>
                    <span className="text-xs sm:text-[13px] text-amber-950 font-bold">
                      Min. ₹{coupon.minOrder}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
                    {coupon.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 mt-2 line-clamp-2 leading-relaxed font-medium">
                    {coupon.description}
                  </p>
                </div>

                {/* Voucher Code and Action */}
                <div className="mt-7 pt-4 border-t border-dashed border-[#E5B537]/70 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-amber-200/90 shadow-2xs">
                    <Tag className="h-4 w-4 text-[#C9A227]" />
                    <span className="font-mono font-extrabold text-xs sm:text-sm text-[#1E2233] tracking-widest">
                      {coupon.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-extrabold transition-all duration-200 shadow-sm active:scale-95 cursor-pointer ${
                      isCopied
                        ? "bg-emerald-600 text-white shadow-emerald-200"
                        : "bg-[#F72585] text-white hover:bg-[#d6136c] hover:shadow-md"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4 stroke-[2.5]" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" /> Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
