"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar as CalendarIcon,
  Heart,
  Plus,
  Trash2,
  Gift,
  Sparkles,
  CheckCircle2,
  PartyPopper,
  CalendarHeart,
  Users,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  X,
  Send,
  Home,
  User as UserIcon,
  RefreshCw,
  Sun,
  Flame,
  Cake,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";

export interface ReminderItem {
  id: string;
  userId: string;
  occasion: string;
  recipientName: string;
  relationship?: string;
  date: string; // YYYY-MM-DD
  notifyDaysBefore: number;
  notes?: string;
  createdAt?: string;
}

// 1. Value propositions (3 feature cards)
const VALUE_PROPS = [
  {
    icon: Sun,
    title: "Timely Reminders",
    description: "Get elegant reminders weeks in advance, leaving perfect time to plan.",
    iconColor: "text-[#EB1C76]",
    bgColor: "bg-pink-50",
  },
  {
    icon: Gift,
    title: "Wide Variety of Gifts",
    description: "Access hundreds of hand-picked luxurious hampers, toys, and floral sets.",
    iconColor: "text-[#C9A227]",
    bgColor: "bg-amber-50",
  },
  {
    icon: Sparkles,
    title: "Make It Special",
    description: "Add customized handwritten greeting cards and deluxe premium wrapping.",
    iconColor: "text-[#C9A227]",
    bgColor: "bg-amber-50",
  },
];

// 2. Relations shortcuts with alternating Pink & Dark Navy circles matching design
const RELATIONS = [
  { label: "Partner", role: "Spouse / Partner", icon: Heart, isPink: true },
  { label: "Friends", role: "Best Friend", icon: Users, isPink: false },
  { label: "Parents", role: "Mom & Dad", icon: Home, isPink: true },
  { label: "Siblings", role: "Brother / Sister", icon: UserIcon, isPink: false },
  { label: "Colleagues", role: "Colleague / Boss", icon: Briefcase, isPink: true },
  { label: "Kids", role: "Child / Baby", icon: RefreshCw, isPink: false },
  { label: "Other", role: "Special Someone", icon: Plus, isPink: true },
];

// 3. Upcoming occasions carousel matching design pastel cards
const UPCOMING_OCCASIONS = [
  {
    name: "Valentine's Day",
    dateBadge: "FEB 14",
    dateValue: "2027-02-14",
    icon: Heart,
    iconColor: "text-[#EB1C76]",
    cardBg: "bg-[#FFF0F4] border-pink-100",
    href: "/category/flowers",
  },
  {
    name: "Mother's Day",
    dateBadge: "MAR 08",
    dateValue: "2027-03-08",
    icon: Gift,
    iconColor: "text-purple-600",
    cardBg: "bg-[#F7F2FC] border-purple-100",
    href: "/category/personalised-gifts",
  },
  {
    name: "Diwali festival",
    dateBadge: "NOV 01",
    dateValue: "2026-11-01",
    icon: Flame,
    iconColor: "text-[#C9A227]",
    cardBg: "bg-[#FFF8E7] border-amber-100",
    href: "/category/cakes",
  },
  {
    name: "Christmas Day",
    dateBadge: "DEC 25",
    dateValue: "2026-12-25",
    icon: Bell,
    iconColor: "text-emerald-600",
    cardBg: "bg-[#F0FAF5] border-emerald-100",
    href: "/category/personalised-gifts",
  },
  {
    name: "New Year's Eve",
    dateBadge: "JAN 01",
    dateValue: "2027-01-01",
    icon: Sparkles,
    iconColor: "text-blue-600",
    cardBg: "bg-[#F0F7FF] border-blue-100",
    href: "/category/cakes",
  },
];

// 4. How It Works 4-step process
const HOW_IT_WORKS_STEPS = [
  {
    step: "1",
    title: "Add Loved Ones",
    description: "Save relationship profile details dynamically.",
  },
  {
    step: "2",
    title: "Set Important Dates",
    description: "Enter birthdays, anniversaries, and holidays.",
  },
  {
    step: "3",
    title: "Get Timely Reminders",
    description: "Receive email and mobile notifications in advance.",
  },
  {
    step: "4",
    title: "Send the Perfect Gift",
    description: "Choose curated items with our input checkout.",
  },
];

export default function RemindersPage() {
  const { user, openAuthModal } = useAuth();
  const { products } = useStore();

  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  // Form State
  const [occasion, setOccasion] = useState("Birthday");
  const [customOccasion, setCustomOccasion] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [relationship, setRelationship] = useState("Partner");
  const [date, setDate] = useState("");
  const [notifyDaysBefore, setNotifyDaysBefore] = useState(3);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch reminders on load
  useEffect(() => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    const loadReminders = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/reminders?userId=${encodeURIComponent(user.id)}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.reminders) && data.reminders.length > 0) {
            setReminders(data.reminders);
            localStorage.setItem(`cp_reminders_${user.id}`, JSON.stringify(data.reminders));
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Reminders fetch fallback:", err);
      }

      // Check local storage backup
      try {
        const local = localStorage.getItem(`cp_reminders_${user.id}`);
        if (local) {
          setReminders(JSON.parse(local));
        } else {
          // Initial sample reminder
          const initialSample: ReminderItem = {
            id: `rem-sample-${Date.now()}`,
            userId: user.id,
            occasion: "Birthday",
            recipientName: "Mom",
            relationship: "Parents",
            date: getFutureDate(5),
            notifyDaysBefore: 3,
            notes: "Order Belgian chocolate cake with Dutch red roses combo",
            createdAt: new Date().toISOString(),
          };
          setReminders([initialSample]);
          localStorage.setItem(`cp_reminders_${user.id}`, JSON.stringify([initialSample]));
        }
      } catch (_) {}

      setIsLoading(false);
    };

    loadReminders();
  }, [user]);

  function getFutureDate(daysAhead: number) {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split("T")[0];
  }

  // Calculate days remaining
  const getDaysRemaining = (targetDateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = targetDateStr.split("-").map(Number);
    let target = new Date(today.getFullYear(), month - 1, day);
    if (target < today) {
      target = new Date(today.getFullYear() + 1, month - 1, day);
    }

    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Sort reminders chronologically
  const sortedReminders = [...reminders].sort((a, b) => {
    return getDaysRemaining(a.date) - getDaysRemaining(b.date);
  });

  // Open modal prefilled with a relationship
  const handleOpenRelation = (rel: typeof RELATIONS[0]) => {
    if (!user) {
      openAuthModal();
      return;
    }
    setRelationship(rel.label);
    setRecipientName(rel.role);
    setOccasion("Birthday");
    setIsModalOpen(true);
  };

  // Open modal prefilled with an occasion
  const handleOpenOccasion = (occ: typeof UPCOMING_OCCASIONS[0]) => {
    if (!user) {
      openAuthModal();
      return;
    }
    setOccasion(occ.name);
    setDate(occ.dateValue);
    setRecipientName("Family & Friends");
    setIsModalOpen(true);
  };

  const handleCreateReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      openAuthModal();
      return;
    }

    const finalOccasion = occasion === "Custom" ? customOccasion.trim() : occasion;
    if (!finalOccasion || !recipientName.trim() || !date) {
      alert("Please enter occasion, recipient name, and the celebration date.");
      return;
    }

    setIsSubmitting(true);
    const newReminder: ReminderItem = {
      id: `rem-${Date.now()}`,
      userId: user.id,
      occasion: finalOccasion,
      recipientName: recipientName.trim(),
      relationship,
      date,
      notifyDaysBefore: Number(notifyDaysBefore),
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReminder),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reminder) {
          newReminder.id = data.reminder.id;
        }
      }
    } catch (err) {
      console.warn("Reminder save fallback:", err);
    }

    const updated = [newReminder, ...reminders];
    setReminders(updated);
    try {
      localStorage.setItem(`cp_reminders_${user.id}`, JSON.stringify(updated));
      window.dispatchEvent(new Event("reminders-updated"));
    } catch (_) {}

    setIsSubmitting(false);
    setIsModalOpen(false);
    setRecipientName("");
    setDate("");
    setNotes("");
    setCustomOccasion("");
    setSuccessMessage(`Reminder for ${recipientName.trim()}'s ${finalOccasion} saved!`);
    setTimeout(() => setSuccessMessage(""), 4500);
  };

  const handleDeleteReminder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this celebration reminder?")) return;

    try {
      await fetch(`/api/reminders?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    } catch (err) {
      console.warn("Delete remote error:", err);
    }

    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    if (user?.id) {
      try {
        localStorage.setItem(`cp_reminders_${user.id}`, JSON.stringify(updated));
        window.dispatchEvent(new Event("reminders-updated"));
      } catch (_) {}
    }
  };

  const triggerTestNotification = async (rem?: ReminderItem) => {
    const target = rem || reminders[0] || {
      occasion: "Birthday",
      recipientName: "Mom",
      date: "Tomorrow",
    };

    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission !== "granted") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          alert("Please allow notification permissions in your browser to receive automatic gift reminders.");
          return;
        }
      }

      try {
        new Notification(`🎁 Creative Paradise Reminder: ${target.recipientName}'s ${target.occasion}!`, {
          body: `Coming up soon! Order early for guaranteed on-time delivery.`,
          icon: "/favicon.ico",
        });
      } catch (err) {
        console.warn("Notification API error:", err);
      }
    }

    setTestNotificationSent(true);
    setTimeout(() => setTestNotificationSent(false), 5000);
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 antialiased overflow-x-hidden">
      {/* 1. HERO SECTION — Full-width Dark Indigo to Vibrant Magenta Gradient with Spacious 2-Column Desktop Grid */}
      <section className="w-full bg-gradient-to-r from-[#1B0824] via-[#2A0E38] to-[#EB1C76] text-white pt-16 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#EB1C76]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#1E0826]/50 rounded-full blur-3xl pointer-events-none" />

        {/* 1600px Full-Width Responsive Container */}
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center relative z-10">
          
          {/* Left Column (~58% on desktop): Title, Tagline, Paragraph, CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-white/80 uppercase inline-block">
              CREATIVE PARADISE REMINDERS
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold font-serif text-white tracking-tight leading-[1.1] max-w-2xl mx-auto lg:mx-0">
              My Reminders
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
              Never miss a moment worth celebrating. Let us keep track of your loved ones&apos; special dates so you can deliver the perfect, thoughtful surprise every time.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => {
                  if (!user) openAuthModal();
                  else setIsModalOpen(true);
                }}
                className="px-8 py-4 rounded-full bg-[#C9A227] hover:bg-[#b58f20] text-gray-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
              >
                <Gift className="h-5 w-5 text-gray-950 stroke-[2.2]" />
                <span>ADD OCCASION</span>
              </button>

              {user && (
                <button
                  onClick={() => triggerTestNotification()}
                  className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer backdrop-blur-xs"
                >
                  <Send className="h-4 w-4 text-[#C9A227]" />
                  <span>Test Notification</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column (~42% on desktop): Large Celebration Calendar Card */}
          <div className="lg:col-span-5 flex items-center justify-center pt-4 lg:pt-0">
            <div className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/40 transform rotate-2 sm:rotate-4 hover:rotate-0 transition-transform duration-500 relative">
              {/* Floating Pill Top Left */}
              <div className="absolute -top-4 -left-3 sm:-left-6 bg-white border border-gray-150 shadow-xl rounded-full px-4 py-2 flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-800 animate-in fade-in">
                <span className="text-base">🎂</span>
                <span>Mom&apos;s Birthday</span>
              </div>

              {/* Card Title */}
              <div className="text-center pt-2">
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 tracking-tight">
                  Celebration Calendar
                </h3>
              </div>

              {/* Big Pink Circular Gift Illustration */}
              <div className="my-8 sm:my-10 flex items-center justify-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#FFF0F5] border border-pink-100 flex items-center justify-center text-[#EB1C76] shadow-inner">
                  <Gift className="w-16 h-16 sm:w-20 sm:h-20 stroke-[1.6]" />
                </div>
              </div>

              {/* Bottom Tagline */}
              <div className="text-center pb-2">
                <span className="text-xs sm:text-sm font-bold text-[#C9A227] tracking-widest uppercase">
                  YOUR PERSONAL GIFT ASSISTANT
                </span>
              </div>

              {/* Floating Pill Bottom Right */}
              <div className="absolute -bottom-4 -right-2 sm:-right-6 bg-white border border-gray-150 shadow-xl rounded-full px-4 py-2 flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-800">
                <span className="text-amber-500 text-base">💍</span>
                <span>Anniversary</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE LARGE FLOATING FEATURE CARDS — Full-Width Desktop Grid Overlapping Hero */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 -mt-12 sm:-mt-16 relative z-20">
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {VALUE_PROPS.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-white p-7 sm:p-8 border border-gray-150 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-start gap-5 min-h-[140px] sm:min-h-[160px]"
              >
                <div className={`h-14 w-14 sm:h-16 sm:w-16 rounded-2xl ${prop.bgColor} ${prop.iconColor} flex items-center justify-center shrink-0 shadow-xs`}>
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    {prop.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {prop.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Notification Toast Messages */}
      {successMessage && (
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-6">
          <div className="rounded-2xl bg-pink-50 border border-pink-200 p-4 text-xs sm:text-sm font-semibold text-[#EB1C76] flex items-center gap-2.5 animate-in fade-in">
            <Sparkles className="h-5 w-5" />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {testNotificationSent && (
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-6">
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs sm:text-sm font-semibold text-emerald-800 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Test Notification Sent!</strong> Browser alert pushed to your device.
              </span>
            </div>
            <span className="text-xs bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full uppercase font-bold">
              Active
            </span>
          </div>
        </div>
      )}

      {/* 3. "ADD YOUR LOVED ONES" — Full-Width Section with Substantially Larger Circles */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-white">
        <div className="w-full max-w-[1600px] mx-auto space-y-10">
          <div>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#EB1C76] uppercase block">
              STAY CONNECTED
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-gray-950 mt-1.5">
              Add Your Loved Ones
            </h2>
          </div>

          {/* Fully distributed across available width on desktop */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-6 sm:gap-4 lg:gap-8 justify-items-center">
            {RELATIONS.map((rel, idx) => {
              const Icon = rel.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleOpenRelation(rel)}
                  className="flex flex-col items-center group cursor-pointer w-full"
                >
                  <div
                    className={`h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full ${
                      rel.isPink ? "bg-[#EB1C76]" : "bg-[#181E2B]"
                    } text-white flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-all duration-300 mb-3`}
                  >
                    <Icon className="h-7 w-7 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-[#EB1C76] transition text-center">
                    {rel.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. "UPCOMING OCCASIONS" — Full-Width Pastel Cards Grid/Carousel */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gray-50/60 border-t border-gray-150">
        <div className="w-full max-w-[1600px] mx-auto space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#C9A227] uppercase block">
                DON&apos;T MISS OUT
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-gray-950 mt-1.5">
                Upcoming Occasions
              </h2>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollCarousel("left")}
                className="h-10 w-10 rounded-full border border-gray-200 bg-white hover:border-[#EB1C76] hover:text-[#EB1C76] flex items-center justify-center transition cursor-pointer shadow-sm"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="h-10 w-10 rounded-full border border-gray-200 bg-white hover:border-[#EB1C76] hover:text-[#EB1C76] flex items-center justify-center transition cursor-pointer shadow-sm"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Cards: 5 columns on desktop spanning the full content width */}
          <div
            ref={carouselRef}
            className="grid grid-flow-col auto-cols-[82%] sm:auto-cols-[45%] md:auto-cols-[30%] lg:grid-flow-row lg:grid-cols-5 gap-5 sm:gap-6 overflow-x-auto lg:overflow-x-visible pb-4 pt-1 no-scrollbar scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {UPCOMING_OCCASIONS.map((occ, idx) => {
              const Icon = occ.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-3xl ${occ.cardBg} border p-6 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[170px] sm:min-h-[190px]`}
                >
                  <div>
                    {/* Top Row: Date Pill & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-gray-800 shadow-2xs border border-gray-150 uppercase tracking-wide">
                        {occ.dateBadge}
                      </span>
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${occ.iconColor}`} />
                    </div>

                    {/* Occasion Title */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                      {occ.name}
                    </h3>
                  </div>

                  {/* Find Perfect Gift Link */}
                  <div className="pt-6 mt-2 border-t border-black/5">
                    <Link
                      href={occ.href}
                      className="text-xs sm:text-sm font-bold text-[#EB1C76] hover:underline flex items-center gap-1.5 group"
                    >
                      <span>Find Perfect Gift</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CELEBRATE YOUR SPECIAL DATES — Full-Viewport Width Banner */}
      <section className="w-full bg-gradient-to-r from-[#EB1C76] via-[#7B124B] to-[#1A0A26] text-white py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 relative z-10">
          
          {/* Left: Large glowing celebration icon + titles */}
          <div className="flex items-center gap-6 sm:gap-8 max-w-2xl">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white/10 border border-white/25 flex items-center justify-center shrink-0 shadow-xl text-[#C9A227] backdrop-blur-xs">
              <PartyPopper className="h-10 w-10 sm:h-12 sm:w-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white leading-tight">
                Celebrate Your Special Dates
              </h2>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed font-normal">
                Join thousands of thoughtful gifters who rely on us for seamless, on-time celebratory surprises.
              </p>
            </div>
          </div>

          {/* Right: Two Large Statistics with Generous Desktop Spacing */}
          <div className="flex items-center gap-10 sm:gap-16 shrink-0 border-t lg:border-t-0 lg:border-l border-white/20 pt-8 lg:pt-0 lg:pl-16 w-full lg:w-auto justify-around lg:justify-start">
            <div className="text-center lg:text-left">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#C9A227]">
                50,000+
              </div>
              <div className="text-sm sm:text-base text-white/90 font-medium mt-1">
                Occasions Saved
              </div>
            </div>

            <div className="text-center lg:text-left border-l border-white/20 pl-10 sm:pl-16">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#C9A227]">
                98%
              </div>
              <div className="text-sm sm:text-base text-white/90 font-medium mt-1">
                Gifts Sent On Time
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "HOW IT WORKS" — 4 Connected Steps Spanning 1600px */}
      <section className="w-full py-20 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-white">
        <div className="w-full max-w-[1600px] mx-auto space-y-16">
          <div className="text-center space-y-2">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#EB1C76] uppercase block">
              SIMPLE AND AUTOMATED
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gray-950">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center relative">
            {HOW_IT_WORKS_STEPS.map((stepItem, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-3 relative z-10">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#EB1C76] text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-lg mb-2">
                  {stepItem.step}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  {stepItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal max-w-xs">
                  {stepItem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LIVE USER REMINDERS DASHBOARD — Full Content Width Component */}
      {user && (
        <section className="w-full py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gray-50 border-t border-gray-200">
          <div className="w-full max-w-[1600px] mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
                    Your Saved Reminders
                  </h2>
                  <span className="text-xs font-bold bg-pink-50 text-[#EB1C76] px-3.5 py-1 rounded-full border border-pink-200">
                    {sortedReminders.length} Active
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Synchronized with your account &amp; alert schedule
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="self-start sm:self-auto px-6 py-3 rounded-full bg-[#EB1C76] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#d6136c] transition flex items-center gap-2 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Reminder</span>
              </button>
            </div>

            {isLoading ? (
              <div className="rounded-3xl bg-white p-14 text-center border border-gray-200">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#EB1C76] border-r-transparent mb-3" />
                <p className="text-sm text-gray-500">Loading your saved celebrations...</p>
              </div>
            ) : sortedReminders.length === 0 ? (
              <div className="rounded-3xl bg-white border border-dashed border-pink-200 p-12 text-center space-y-4">
                <CalendarHeart className="h-12 w-12 text-[#EB1C76] mx-auto" />
                <h3 className="text-lg font-bold text-gray-900">No Reminders Added Yet</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Use the quick relationship shortcuts above or click &quot;Add Occasion&quot; to save your first celebration.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 rounded-full bg-[#EB1C76] text-white text-xs sm:text-sm font-bold hover:bg-[#d6136c] shadow-md"
                >
                  + Add Occasion Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {sortedReminders.map(rem => {
                  const daysRemaining = getDaysRemaining(rem.date);

                  let badgeClass = "bg-pink-50 text-[#EB1C76] border-pink-200";
                  let badgeText = `In ${daysRemaining} days`;

                  if (daysRemaining === 0) {
                    badgeClass = "bg-rose-500 text-white border-rose-600 animate-pulse";
                    badgeText = "Today! 🎉";
                  } else if (daysRemaining === 1) {
                    badgeClass = "bg-amber-500 text-white border-amber-600";
                    badgeText = "Tomorrow! ⚡";
                  } else if (daysRemaining <= 7) {
                    badgeClass = "bg-amber-50 text-amber-800 border-amber-200";
                  }

                  return (
                    <div
                      key={rem.id}
                      className="rounded-3xl bg-white border border-gray-150 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top status bar */}
                        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wide ${badgeClass}`}>
                            {badgeText}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => triggerTestNotification(rem)}
                              className="p-2 text-gray-400 hover:text-[#EB1C76] hover:bg-pink-50 rounded-xl transition"
                              title="Test alert for this date"
                            >
                              <Send className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteReminder(rem.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                              title="Delete reminder"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Recipient info */}
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-[#1E0826] to-[#EB1C76] text-white flex items-center justify-center shrink-0 shadow-md font-bold">
                            <Cake className="h-6 w-6 text-[#C9A227]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug truncate">
                              {rem.recipientName}&apos;s {rem.occasion}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1 flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4 text-gray-400" />
                              <span>
                                {new Date(rem.date + "T00:00:00").toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "long",
                                })}
                              </span>
                              {rem.relationship && (
                                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-semibold">
                                  {rem.relationship}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>

                        {rem.notes && (
                          <p className="mt-4 text-xs sm:text-sm text-gray-600 bg-gray-50 p-3 rounded-2xl italic border border-gray-100">
                            &quot;{rem.notes}&quot;
                          </p>
                        )}
                      </div>

                      {/* Quick gift action */}
                      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">
                          Alert: {rem.notifyDaysBefore}d ahead
                        </span>
                        <Link
                          href="/shop"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#EB1C76] hover:text-[#d6136c] transition"
                        >
                          <span>Shop Gifts</span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 8. MODAL: ADD OCCASION FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in">
          <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white p-7 sm:p-9 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-pink-50 text-[#EB1C76] flex items-center justify-center">
                  <CalendarHeart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-gray-900">Add an Occasion</h3>
                  <p className="text-xs text-gray-500">We will notify you early with curated gift options</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReminder} className="mt-6 space-y-4">
              {/* Occasion Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">Occasion Type *</label>
                <select
                  value={occasion}
                  onChange={e => setOccasion(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm text-gray-900 focus:border-[#EB1C76] focus:outline-none cursor-pointer"
                >
                  <option value="Birthday">🎂 Birthday</option>
                  <option value="Anniversary">💖 Anniversary</option>
                  <option value="Valentine's Day">🌹 Valentine&apos;s Day</option>
                  <option value="Mother's Day">🌸 Mother&apos;s Day</option>
                  <option value="Father's Day">👔 Father&apos;s Day</option>
                  <option value="Diwali festival">🪔 Diwali festival</option>
                  <option value="Christmas Day">🎄 Christmas Day</option>
                  <option value="New Year's Eve">🥂 New Year&apos;s Eve</option>
                  <option value="Custom">✨ Other Custom Occasion</option>
                </select>
              </div>

              {occasion === "Custom" && (
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">Custom Occasion Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Promotion, Housewarming, Graduation"
                    value={customOccasion}
                    onChange={e => setCustomOccasion(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs sm:text-sm text-gray-900 focus:border-[#EB1C76] focus:outline-none"
                  />
                </div>
              )}

              {/* Recipient & Relationship */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mom, Priya, Rahul"
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs sm:text-sm text-gray-900 focus:border-[#EB1C76] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">Relationship</label>
                  <select
                    value={relationship}
                    onChange={e => setRelationship(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm text-gray-900 focus:border-[#EB1C76] focus:outline-none cursor-pointer"
                  >
                    <option value="Partner">Partner</option>
                    <option value="Friends">Friends</option>
                    <option value="Parents">Parents</option>
                    <option value="Siblings">Siblings</option>
                    <option value="Colleagues">Colleagues</option>
                    <option value="Kids">Kids</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Date & Advance Notice */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">Celebration Date *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs sm:text-sm text-gray-900 focus:border-[#EB1C76] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">Remind Me Ahead</label>
                  <select
                    value={notifyDaysBefore}
                    onChange={e => setNotifyDaysBefore(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm text-gray-900 focus:border-[#EB1C76] focus:outline-none"
                  >
                    <option value={1}>1 day before (Tomorrow)</option>
                    <option value={2}>2 days before</option>
                    <option value={3}>3 days before (Recommended)</option>
                    <option value={5}>5 days before</option>
                    <option value={7}>7 days before</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">Gift Ideas / Personal Note</label>
                <input
                  type="text"
                  placeholder="e.g. Loves red velvet cakes, prefer Dutch roses, needs photo frame"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs sm:text-sm text-gray-900 focus:border-[#EB1C76] focus:outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-full border border-gray-200 text-xs sm:text-sm font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-3 rounded-full bg-[#EB1C76] text-white text-xs sm:text-sm font-bold hover:bg-[#d6136c] shadow-lg shadow-pink-500/25 transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  <Bell className="h-4 w-4" />
                  <span>{isSubmitting ? "Saving..." : "Save Reminder"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
