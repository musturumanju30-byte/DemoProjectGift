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
    <section className="w-full bg-[#FAF8F5] py-16 sm:py-20 border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with thin gold underline accent */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#C9A227] uppercase tracking-wider mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>SAVINGS & REWARDS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
              Exclusive Gifting Offers & Vouchers
            </h2>
            <div className="h-0.5 w-12 bg-[#C9A227] mt-2 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Click any voucher to copy code and automatically apply discount at checkout
            </p>
          </div>
        </div>

        {/* 3 Voucher Ticket Cards: Yellow tint with punched ticket edges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="relative overflow-hidden rounded-2xl bg-[#FFF8D6] border-2 border-dashed border-[#F3CD68] p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Left Ticket Cutout Hole */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF8F5] border-r-2 border-dashed border-[#F3CD68]" />

                {/* Right Ticket Cutout Hole */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF8F5] border-l-2 border-dashed border-[#F3CD68]" />

                {/* Content */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`rounded-md ${bank.bg} ${bank.text} px-2 py-0.5 text-[10px] font-black tracking-wider shadow-2xs`}>
                      {bank.name}
                    </span>
                    <span className="text-[11px] text-amber-900 font-bold">
                      Min. ₹{coupon.minOrder}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
                    {coupon.title}
                  </h3>
                  <p className="text-xs text-gray-700 mt-1.5 line-clamp-2 leading-relaxed font-medium">
                    {coupon.description}
                  </p>
                </div>

                {/* Voucher Code and Action */}
                <div className="mt-6 pt-4 border-t border-dashed border-[#E5B537]/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-amber-200/80 shadow-2xs">
                    <Tag className="h-3.5 w-3.5 text-[#C9A227]" />
                    <span className="font-mono font-extrabold text-xs sm:text-sm text-[#1E2233] tracking-widest">
                      {coupon.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold transition-all duration-200 shadow-xs active:scale-95 ${
                      isCopied
                        ? "bg-emerald-600 text-white shadow-emerald-200"
                        : "bg-[#F72585] text-white hover:bg-[#d6136c] hover:shadow-md"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy Code
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
