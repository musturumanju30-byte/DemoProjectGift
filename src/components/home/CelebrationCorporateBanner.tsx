"use client";

import React from "react";
import Link from "next/link";
import {
  Bell,
  Briefcase,
  CalendarHeart,
  Gift,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  Heart,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export const CelebrationCorporateBanner: React.FC = () => {
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  const handleReminderClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      openAuthModal();
    } else {
      router.push("/reminders");
    }
  };

  return (
    <section className="w-full py-10 sm:py-16 font-sans">
      <div className="w-full max-w-[1700px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 lg:gap-10">
          {/* Left Card: Never Miss a Celebration */}
          <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E2233] via-[#161926] to-[#0D0F18] border border-[#C9A227]/25 p-5 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl hover:border-[#F72585]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[300px] sm:min-h-[340px]">
            {/* Subtle background glow */}
            <div className="absolute -top-12 -right-12 w-56 h-56 bg-[#F72585]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#F72585]/25 transition duration-500" />
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#C9A227]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Top pill */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C9A227]/30 text-xs font-bold text-[#C9A227] tracking-wider uppercase backdrop-blur-xs">
                  <Bell className="h-3.5 w-3.5 text-[#F72585]" />
                  <span>MY REMINDERS</span>
                </div>
                <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-pink-400" /> 3-Day Early Alert
                </span>
              </div>

              {/* Headline */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                  Never Miss a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F72585] to-pink-300">Celebration</span>
                </h3>
                <p className="text-sm sm:text-base text-gray-300 mt-2.5 leading-relaxed">
                  Save birthdays, anniversaries &amp; milestones. Receive smart push notifications and order curated cakes &amp; fresh bouquets without the last-minute panic.
                </p>
              </div>

              {/* Feature bullets */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-gray-200">
                <div className="flex items-center gap-2">
                  <CalendarHeart className="h-4 w-4 text-[#F72585] shrink-0" />
                  <span>One-click date tracker</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#C9A227] shrink-0" />
                  <span>Push &amp; email reminders</span>
                </div>
              </div>
            </div>

            {/* Card action */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={handleReminderClick}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F72585] to-[#d6136c] text-white text-sm font-bold shadow-md shadow-pink-600/30 hover:shadow-pink-600/50 hover:scale-[1.02] transition flex items-center gap-2.5 cursor-pointer active:scale-95"
              >
                <span>Set a Reminder</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <span className="text-xs text-gray-400 font-medium">
                Free for all members
              </span>
            </div>
          </div>

          {/* Right Card: Corporate & Bulk Gifting */}
          <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-[#121520] via-[#1E2233] to-[#0A0A0A] border border-[#C9A227]/25 p-5 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl hover:border-[#C9A227]/70 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[300px] sm:min-h-[340px]">
            {/* Subtle background glow */}
            <div className="absolute -top-12 -right-12 w-56 h-56 bg-[#C9A227]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C9A227]/25 transition duration-500" />
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#F72585]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Top pill */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C9A227]/30 text-xs font-bold text-[#C9A227] tracking-wider uppercase backdrop-blur-xs">
                  <Briefcase className="h-3.5 w-3.5 text-[#C9A227]" />
                  <span>OFFICE &amp; EVENTS</span>
                </div>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" /> Tier Discounts
                </span>
              </div>

              {/* Headline */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                  Corporate &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] via-amber-300 to-yellow-200">Bulk Gifting</span>
                </h3>
                <p className="text-sm sm:text-base text-gray-300 mt-2.5 leading-relaxed">
                  Handcrafted executive hampers, Diwali dry fruit boxes, and wedding return gifts. Customized with your company logo &amp; dispatched across Coastal Andhra Pradesh.
                </p>
              </div>

              {/* Feature bullets */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-gray-200">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#C9A227] shrink-0" />
                  <span>Custom logo engraving</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-[#F72585] shrink-0" />
                  <span>Starting ₹499/unit</span>
                </div>
              </div>
            </div>

            {/* Card action */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <Link
                href="/corporate-gifting"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#9c7816] text-white text-sm font-bold shadow-md shadow-amber-900/30 hover:shadow-amber-900/50 hover:scale-[1.02] transition flex items-center gap-2.5 active:scale-95"
              >
                <span>Enquire Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <span className="text-xs text-gray-400 font-medium">
                15-min WhatsApp quote
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
