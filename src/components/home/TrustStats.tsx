"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, ShieldCheck, Truck, Sparkles, Award } from "lucide-react";

export const TrustStats: React.FC = () => {
  const [isSeoOpen, setIsSeoOpen] = useState(false);

  return (
    <section className="w-full bg-[#F2F6F2] py-10 sm:py-20 border-b border-gray-200/70 font-sans">
      <div className="w-full max-w-[1700px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Trust Stats 3 Column Key Metrics spread across full width */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 text-center mb-10 sm:mb-20 w-full">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-[#2D5A27] tracking-tight">
              30+
            </span>
            <span className="text-xs sm:text-base font-bold text-gray-700 mt-1 sm:mt-2">
              Coastal AP Delivery Hubs
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-[#2D5A27] tracking-tight">
              50M+
            </span>
            <span className="text-xs sm:text-base font-bold text-gray-700 mt-1 sm:mt-2">
              Happy Smiles Delivered
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-[#2D5A27] tracking-tight">
              100+
            </span>
            <span className="text-xs sm:text-base font-bold text-gray-700 mt-1 sm:mt-2">
              Artisanal Handcrafted Designs
            </span>
          </div>
        </div>

        {/* Brand Quality Partners Row: 4 clean cards across full width */}
        <div className="mb-10 sm:mb-16 w-full">
          <p className="text-center text-[11px] sm:text-[13px] font-extrabold text-gray-600 uppercase tracking-widest mb-6 sm:mb-8">
            PREMIUM QUALITY PARTNERS &amp; TRUSTED INGREDIENTS
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-8 w-full">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-xs hover:shadow-md transition-all border border-gray-200/80 flex items-center justify-center h-20 sm:h-32 overflow-hidden relative">
              <span className="font-serif text-xl sm:text-3xl font-black tracking-wide text-gray-800 italic">
                Cadbury
              </span>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-xs hover:shadow-md transition-all border border-gray-200/80 flex items-center justify-center h-20 sm:h-32 overflow-hidden relative">
              <span className="font-sans text-base sm:text-2xl font-black lowercase tracking-tight text-gray-900">
                mothercare
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#002B49]" />
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-xs hover:shadow-md transition-all border border-gray-200/80 flex items-center justify-center h-20 sm:h-32 overflow-hidden relative">
              <span className="font-serif text-xs sm:text-lg font-black tracking-widest uppercase text-gray-900 text-center">
                CARLTON<br /><span className="text-[10px] sm:text-sm tracking-normal">LONDON</span>
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black" />
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-xs hover:shadow-md transition-all border border-gray-200/80 flex items-center justify-center h-20 sm:h-32 overflow-hidden relative">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-xl">🌿</span>
                <span className="font-serif text-xs sm:text-base font-black uppercase tracking-wider text-gray-800">
                  KAMA AYURVEDA
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#6B1D2F]" />
            </div>
          </div>
        </div>

        {/* Collapsible SEO Text Block */}
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 p-4 sm:p-8 text-xs sm:text-sm text-gray-600 leading-relaxed shadow-xs w-full">
          <div
            className="flex items-center justify-between cursor-pointer select-none"
            onClick={() => setIsSeoOpen(!isSeoOpen)}
          >
            <h3 className="text-sm sm:text-base font-extrabold text-[#0A0A0A]">
              Why Creative Paradise is Repalle&apos;s Preferred Online Gift Store
            </h3>
            <button className="text-gray-500 hover:text-black p-1 cursor-pointer">
              {isSeoOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          <div className={`mt-3.5 space-y-3 ${isSeoOpen ? "block" : "line-clamp-2"}`}>
            <p>
              Looking for same-day delivery of fresh flower bouquets, eggless birthday cakes, or bespoke personalised gifts in <strong>Repalle, Andhra Pradesh (522265)</strong>? Creative Paradise Gift Store (`@repalle_gifts`) brings metropolitan luxury and artisanal gifting directly to your doorstep. We specialize in precision laser-engraved wooden portraits, glowing optical 3D LED illusion acrylic lamps, customized Spotify music plaques, heart-shaped red velvet cakes, and 50 Dutch rose luxury hatboxes.
            </p>
            <p>
              With our dedicated local workshop near Clock Tower on Gandhi Road, we fulfill orders with 2-hour express dispatch across Repalle, Nizampatnam, Bhattiprolu, Nagaram, and Cherukupalli, as well as daily shipping across Bapatla, Tenali, Guntur, and Vijayawada. Every celebration is backed by our midnight delivery surprise guarantee, bank-grade Razorpay UPI security, and friendly customer care on WhatsApp (+91 9177003905).
            </p>
          </div>

          <button
            onClick={() => setIsSeoOpen(!isSeoOpen)}
            className="mt-3 text-xs sm:text-sm font-bold text-[#F72585] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{isSeoOpen ? "Read Less" : "Read More..."}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
