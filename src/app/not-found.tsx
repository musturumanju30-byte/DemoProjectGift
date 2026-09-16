import React from "react";
import Link from "next/link";
import { Gift, Home, ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-gray-50/50 min-h-[75vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full rounded-3xl bg-white p-8 sm:p-12 shadow-sm border border-gray-100">
        <div className="relative h-24 w-24 rounded-3xl bg-pink-50 border border-pink-200 text-[#F72585] flex items-center justify-center mx-auto mb-6">
          <Gift className="h-12 w-12" />
          <span className="absolute -top-2 -right-2 rounded-full bg-[#C9A227] px-2 py-0.5 text-[10px] font-black text-white">
            404
          </span>
        </div>

        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Gift Box Not Found!
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
          The page or product you were looking for seems to have moved or unwrapped early.
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          <Link
            href="/"
            className="min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#F72585] py-3 text-xs font-bold text-white shadow-md hover:bg-[#d6136c] transition"
          >
            <Home className="h-4 w-4" />
            Back to Creative Paradise
          </Link>
          <Link
            href="/shop"
            className="min-h-[44px] flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#C9A227]" />
            Explore Bestsellers Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
