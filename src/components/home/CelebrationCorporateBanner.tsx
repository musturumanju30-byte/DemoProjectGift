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
    <section className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Never Miss a Celebration */}
        <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E2233] via-[#161926] to-[#0D0F18] border border-[#C9A227]/25 p-7 sm:p-9 shadow-xl hover:shadow-2xl hover:border-[#F72585]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#F72585]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#F72585]/25 transition duration-500" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#C9A227]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            {/* Top pill */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#C9A227]/30 text-[11px] font-extrabold text-[#C9A227] tracking-wider uppercase backdrop-blur-xs">
                <Bell className="h-3 w-3 text-[#F72585]" />
                <span>MY REMINDERS</span>
              </div>
              <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                <Clock className="h-3 w-3 text-pink-400" /> 3-Day Early Alert
              </span>
            </div>

            {/* Headline */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Never Miss a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F72585] to-pink-300">Celebration</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                Save birthdays, anniversaries & milestones. Receive smart push notifications and order curated cakes & fresh bouquets without the last-minute panic.
              </p>
            </div>

            {/* Feature bullets */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-gray-300">
              <div className="flex items-center gap-1.5">
                <CalendarHeart className="h-3.5 w-3.5 text-[#F72585] shrink-0" />
                <span>One-click date tracker</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#C9A227] shrink-0" />
                <span>Push & email reminders</span>
              </div>
            </div>
          </div>

          {/* Card action */}
          <div className="relative z-10 pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={handleReminderClick}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F72585] to-[#d6136c] text-white text-xs font-bold shadow-md shadow-pink-600/30 hover:shadow-pink-600/50 hover:scale-[1.02] transition flex items-center gap-2 cursor-pointer"
            >
              <span>Set a Reminder</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <span className="text-[11px] text-gray-400 font-medium">
              Free for all members
            </span>
          </div>
        </div>

        {/* Right Card: Corporate & Bulk Gifting */}
        <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-[#121520] via-[#1E2233] to-[#0A0A0A] border border-[#C9A227]/25 p-7 sm:p-9 shadow-xl hover:shadow-2xl hover:border-[#C9A227]/70 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#C9A227]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C9A227]/25 transition duration-500" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#F72585]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            {/* Top pill */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#C9A227]/30 text-[11px] font-extrabold text-[#C9A227] tracking-wider uppercase backdrop-blur-xs">
                <Briefcase className="h-3 w-3 text-[#C9A227]" />
                <span>OFFICE & EVENTS</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Tier Discounts
              </span>
            </div>

            {/* Headline */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Corporate & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] via-amber-300 to-yellow-200">Bulk Gifting</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                Handcrafted executive hampers, Diwali dry fruit boxes, and wedding return gifts. Customized with your company logo & dispatched across Coastal Andhra Pradesh.
              </p>
            </div>

            {/* Feature bullets */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-gray-300">
              <div className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-[#C9A227] shrink-0" />
                <span>Custom logo engraving</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gift className="h-3.5 w-3.5 text-[#F72585] shrink-0" />
                <span>Starting ₹499/unit</span>
              </div>
            </div>
          </div>

          {/* Card action */}
          <div className="relative z-10 pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
            <Link
              href="/corporate-gifting"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#9c7816] text-white text-xs font-bold shadow-md shadow-amber-900/30 hover:shadow-amber-900/50 hover:scale-[1.02] transition flex items-center gap-2"
            >
              <span>Enquire Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <span className="text-[11px] text-gray-400 font-medium">
              15-min WhatsApp quote
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
