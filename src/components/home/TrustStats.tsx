"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, ShieldCheck, Truck, Sparkles, Award } from "lucide-react";

export const TrustStats: React.FC = () => {
  const [isSeoOpen, setIsSeoOpen] = useState(false);

  return (
    <section className="w-full bg-[#F2F6F2] py-16 sm:py-20 border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Stats 3 Column Key Metrics matching reference design */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center mb-14">
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-black text-[#2D5A27] tracking-tight">
              30+
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-700 mt-1">
              Coastal AP Hubs
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-black text-[#2D5A27] tracking-tight">
              50M+
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-700 mt-1">
              Happy Smiles Delivered
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-black text-[#2D5A27] tracking-tight">
              100+
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-700 mt-1">
              Handcrafted Designs
            </span>
          </div>
        </div>

        {/* Brand Quality Partners Row: 4 clean cards with color accents matching reference */}
        <div className="mb-12">
          <p className="text-center text-[11px] font-extrabold text-gray-600 uppercase tracking-widest mb-6">
            PREMIUM QUALITY PARTNERS & TRUSTED INGREDIENTS
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200/80 flex items-center justify-center h-24 sm:h-28 overflow-hidden relative">
              <span className="font-serif text-2xl font-black tracking-wide text-gray-800 italic">
                Cadbury
              </span>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200/80 flex items-center justify-center h-24 sm:h-28 overflow-hidden relative">
              <span className="font-sans text-xl font-black lowercase tracking-tight text-gray-900">
                mothercare
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#002B49]" />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200/80 flex items-center justify-center h-24 sm:h-28 overflow-hidden relative">
              <span className="font-serif text-base font-black tracking-widest uppercase text-gray-900 text-center">
                CARLTON<br /><span className="text-xs tracking-normal">LONDON</span>
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black" />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200/80 flex items-center justify-center h-24 sm:h-28 overflow-hidden relative">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌿</span>
                <span className="font-serif text-sm font-black uppercase tracking-wider text-gray-800">
                  KAMA AYURVEDA
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#6B1D2F]" />
            </div>
          </div>
        </div>

        {/* Collapsible SEO Text Block */}
        <div className="rounded-[18px] bg-white border border-gray-200/90 p-5 sm:p-6 text-xs text-gray-600 leading-relaxed shadow-xs">
          <div
            className="flex items-center justify-between cursor-pointer select-none"
            onClick={() => setIsSeoOpen(!isSeoOpen)}
          >
            <h3 className="text-sm font-extrabold text-[#0A0A0A]">
              Why Creative Paradise is Repalle&apos;s Preferred Online Gift Store
            </h3>
            <button className="text-gray-500 hover:text-black p-1">
              {isSeoOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          <div className={`mt-3 space-y-2.5 ${isSeoOpen ? "block" : "line-clamp-2"}`}>
            <p>
              Looking for same-day delivery of fresh flower bouquets, eggless birthday cakes, or bespoke personalised gifts in <strong>Repalle, Andhra Pradesh (522265)</strong>? Creative Paradise Gift Store (`@repalle_gifts`) brings metropolitan luxury and artisanal gifting directly to your doorstep. We specialize in precision laser-engraved wooden portraits, glowing optical 3D LED illusion acrylic lamps, customized Spotify music plaques, heart-shaped red velvet cakes, and 50 Dutch rose luxury hatboxes.
            </p>
            <p>
              With our dedicated local workshop near Clock Tower on Gandhi Road, we fulfill orders with 2-hour express dispatch across Repalle, Nizampatnam, Bhattiprolu, Nagaram, and Cherukupalli, as well as daily shipping across Bapatla, Tenali, Guntur, and Vijayawada. Every celebration is backed by our midnight delivery surprise guarantee, bank-grade Razorpay UPI security, and friendly customer care on WhatsApp (+91 9177003905).
            </p>
          </div>

          <button
            onClick={() => setIsSeoOpen(!isSeoOpen)}
            className="mt-2.5 text-xs font-bold text-[#F72585] hover:underline inline-flex items-center gap-1"
          >
            <span>{isSeoOpen ? "Read Less" : "Read More..."}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
