"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  Calendar as CalendarIcon,
  Heart,
  Plus,
  Trash2,
  Gift,
  Clock,
  Sparkles,
  CheckCircle2,
  Cake,
  PartyPopper,
  CalendarHeart,
  ArrowRight,
  Send,
  Users,
  Smile,
  Baby,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  X,
  Tag,
  ShieldCheck,
  Phone,
  Flame,
  Star,
  Award,
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

// 1. Value propositions
const VALUE_PROPS = [
  {
    icon: Clock,
    title: "Timely reminders. Joyful moments.",
    description: "Enjoy automated push & email alerts 3 days ahead so you never miss an occasion.",
    iconColor: "text-[#F72585]",
    bgColor: "bg-pink-50",
  },
  {
    icon: Gift,
    title: "Wide variety of gifts.",
    description: "Get curated same-day gifting options & exclusive early-bird discounts in Coastal AP.",
    iconColor: "text-[#C9A227]",
    bgColor: "bg-amber-50",
  },
  {
    icon: PartyPopper,
    title: "Make it special with Creative Paradise.",
    description: "Handcrafted personalized 3D lamps, fresh Dutch roses, and artisanal cakes fresh from our studio.",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

// 2. Relations shortcuts
const RELATIONS = [
  { label: "Partner", role: "Spouse / Partner", icon: Heart, color: "from-pink-500 to-rose-400" },
  { label: "Friends", role: "Best Friend", icon: Smile, color: "from-amber-400 to-orange-500" },
  { label: "Parents", role: "Mom & Dad", icon: Users, color: "from-emerald-400 to-teal-600" },
  { label: "Siblings", role: "Brother / Sister", icon: Star, color: "from-indigo-400 to-purple-600" },
  { label: "Colleagues", role: "Colleague / Boss", icon: Briefcase, color: "from-blue-400 to-cyan-600" },
  { label: "Kids", role: "Child / Nephew", icon: Baby, color: "from-pink-400 to-yellow-400" },
  { label: "Other", role: "Special Someone", icon: Plus, color: "from-gray-400 to-gray-600" },
];

// 3. Indian & Regional Coastal AP Upcoming Festivals / Occasions
const UPCOMING_OCCASIONS = [
  {
    name: "Diwali (Deepavali)",
    dateLabel: "1st Nov",
    dateValue: "2026-11-01",
    theme: "Festival of Lights & Sweets",
    icon: Flame,
    color: "bg-amber-500",
  },
  {
    name: "Sankranti / Pongal",
    dateLabel: "14th Jan",
    dateValue: "2027-01-14",
    theme: "Coastal AP Harvest Festival",
    icon: PartyPopper,
    color: "bg-orange-500",
  },
  {
    name: "Ugadi (Telugu New Year)",
    dateLabel: "22nd Mar",
    dateValue: "2027-03-22",
    theme: "Traditional New Year & Hampers",
    icon: Sparkles,
    color: "bg-emerald-500",
  },
  {
    name: "Valentine's Day",
    dateLabel: "14th Feb",
    dateValue: "2027-02-14",
    theme: "Dutch Roses & Romantic Hampers",
    icon: Heart,
    color: "bg-pink-500",
  },
  {
    name: "Mother's Day",
    dateLabel: "10th May",
    dateValue: "2027-05-10",
    theme: "Personalized Photo Plaques & Cakes",
    icon: Award,
    color: "bg-purple-500",
  },
  {
    name: "Father's Day",
    dateLabel: "21st Jun",
    dateValue: "2027-06-21",
    theme: "Desk Bonsai & Leather Organisers",
    icon: Briefcase,
    color: "bg-blue-500",
  },
  {
    name: "Raksha Bandhan",
    dateLabel: "19th Aug",
    dateValue: "2027-08-19",
    theme: "Sacred Rakhis & Gourmet Treats",
    icon: CalendarHeart,
    color: "bg-rose-500",
  },
  {
    name: "New Year 2027",
    dateLabel: "1st Jan",
    dateValue: "2027-01-01",
    theme: "Midnight Cakes & Flowers",
    icon: Star,
    color: "bg-indigo-500",
  },
];

// 4. How reminders work
const HOW_IT_WORKS_STEPS = [
  {
    step: "1",
    icon: Users,
    title: "Add your loved ones",
    description: "Select partners, parents, friends, and colleagues in one tap.",
  },
  {
    step: "2",
    icon: CalendarIcon,
    title: "Add special dates",
    description: "Save birthdays, anniversaries, and milestones in seconds.",
  },
  {
    step: "3",
    icon: Bell,
    title: "Get timely reminders",
    description: "Free push alerts & emails 3 days ahead with curated gift ideas.",
  },
  {
    step: "4",
    icon: Tag,
    title: "Get special offers",
    description: "Unlock exclusive early-bird coupons & guaranteed same-day delivery.",
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
          // Provide an initial sample reminder for this user
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
          body: `Coming up in a few days! Order early for guaranteed same-day delivery in Repalle & Coastal AP.`,
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
      const scrollAmount = direction === "left" ? -280 : 280;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const getOccasionCategory = (occ: string) => {
    const lower = occ.toLowerCase();
    if (lower.includes("birthday")) return { href: "/category/cakes", label: "Shop Birthday Cakes" };
    if (lower.includes("anniversary") || lower.includes("valentine")) return { href: "/category/flowers", label: "Shop Fresh Roses" };
    if (lower.includes("diwali") || lower.includes("sankranti") || lower.includes("ugadi")) return { href: "/category/hampers", label: "Shop Festive Hampers" };
    return { href: "/category/personalised-gifts", label: "Shop Personalised Gifts" };
  };

  return (
    <div className="w-full min-h-screen bg-[#FDF8F9]/30 text-gray-900">
      {/* 1. Hero Section — Soft Pink-to-Cream Gradient with Custom Illustration */}
      <section className="w-full bg-gradient-to-r from-[#FFF0F5] via-[#FFF6EB] to-[#FFF9F2] border-b border-pink-100/60 py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        {/* Soft decorative blur circles */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#F72585]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          {/* Left Text Column */}
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-pink-200 text-[11px] font-bold text-[#F72585] shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#C9A227]" />
              <span>NEVER MISS A CELEBRATION</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight">
              My Reminders
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Your people, their moments — all in one place.{" "}
              <span className="font-semibold text-gray-800 italic">No more &quot;almost forgot&quot; moments.</span>
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => {
                  if (!user) {
                    openAuthModal();
                  } else {
                    setIsModalOpen(true);
                  }
                }}
                className="px-6 py-3.5 rounded-2xl bg-[#F72585] hover:bg-[#d6136c] text-white text-xs font-bold shadow-lg shadow-pink-500/25 hover:-translate-y-0.5 transition duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>+ Add Occasion</span>
              </button>

              {user && (
                <button
                  onClick={() => triggerTestNotification()}
                  className="px-4 py-3.5 rounded-2xl bg-white border border-gray-200 hover:border-[#F72585] text-xs font-bold text-gray-700 hover:text-[#F72585] transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  title="Test push alert on your browser"
                >
                  <Send className="h-3.5 w-3.5 text-[#F72585]" />
                  <span>Test Push Alert</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Friendly Illustration: Gift Box Character, Calendar & Balloons */}
          <div className="relative w-72 sm:w-88 h-64 sm:h-76 flex items-center justify-center">
            {/* Soft decorative background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#F72585]/15 to-[#C9A227]/20 rounded-full blur-2xl" />

            {/* Custom Warm Graphic Representation */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {/* Central Happy Gift Box */}
              <div className="relative z-20 flex flex-col items-center">
                {/* Balloons behind */}
                <div className="absolute -top-12 -left-8 flex gap-2 animate-bounce duration-1000">
                  <span className="h-10 w-8 rounded-full bg-[#F72585] shadow-md transform -rotate-12 block" />
                  <span className="h-11 w-9 rounded-full bg-[#C9A227] shadow-md transform rotate-6 block" />
                  <span className="h-10 w-8 rounded-full bg-purple-500 shadow-md transform rotate-18 block" />
                </div>

                {/* Calendar Card on left */}
                <div className="absolute -left-14 top-4 bg-white rounded-2xl p-3 shadow-xl border border-gray-100 transform -rotate-6 w-28 text-center animate-in fade-in">
                  <div className="h-2 w-full bg-[#F72585] rounded-t-sm mb-1.5" />
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">OCTOBER</div>
                  <div className="text-xl font-black text-gray-900">20</div>
                  <div className="text-[9px] font-extrabold text-[#F72585] mt-0.5">MOM&apos;S B&apos;DAY</div>
                </div>

                {/* The Happy Character Gift Box */}
                <div className="h-36 w-36 rounded-3xl bg-gradient-to-br from-[#F72585] to-[#d6136c] p-3 shadow-2xl relative flex flex-col items-center justify-center text-white border-2 border-white">
                  {/* Golden Ribbon Cross */}
                  <div className="absolute inset-x-0 h-4 bg-[#C9A227] top-1/2 -translate-y-1/2 shadow-xs" />
                  <div className="absolute inset-y-0 w-4 bg-[#C9A227] left-1/2 -translate-x-1/2 shadow-xs" />

                  {/* Golden Bow on top */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="h-6 w-7 rounded-full bg-[#C9A227] border-2 border-white transform -rotate-25 shadow-sm" />
                    <div className="h-6 w-7 rounded-full bg-[#C9A227] border-2 border-white transform rotate-25 shadow-sm" />
                  </div>

                  {/* Smiling Face of Gift */}
                  <div className="relative z-10 flex flex-col items-center mt-2">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-white shadow-xs" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white shadow-xs" />
                    </div>
                    {/* Smile curve */}
                    <div className="h-2 w-5 border-b-2 border-white rounded-full mt-1.5" />
                  </div>
                </div>

                {/* Floating Heart / Sparkle pill */}
                <div className="absolute -right-10 top-12 bg-white rounded-xl py-1.5 px-3 shadow-lg border border-pink-100 flex items-center gap-1.5 transform rotate-8">
                  <Sparkles className="h-3.5 w-3.5 text-[#C9A227]" />
                  <span className="text-[10px] font-bold text-gray-800">100% On-Time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3 Value-Prop Cards — Side-by-Side Clean White Cards */}
      <section className="w-full py-8 px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {VALUE_PROPS.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white p-5 border border-gray-150 shadow-sm hover:shadow-md transition flex items-start gap-4"
              >
                <div className={`h-11 w-11 rounded-2xl ${prop.bgColor} ${prop.iconColor} flex items-center justify-center shrink-0 shadow-xs`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">{prop.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{prop.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Toast notifications */}
      {successMessage && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="rounded-2xl bg-pink-50 border border-pink-200 p-4 text-xs font-semibold text-[#F72585] flex items-center gap-2 animate-in fade-in">
            <Sparkles className="h-4 w-4" />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {testNotificationSent && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Test Notification Triggered!</strong> If you permitted browser notifications, an alert has been pushed to your device.
              </span>
            </div>
            <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full uppercase font-bold">
              Active
            </span>
          </div>
        </div>
      )}

      {/* 3. "Add Relations" Section — Circular Relationship Icons */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">Add relations</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Tap a relation to instantly set up an occasion reminder
              </p>
            </div>
            <span className="text-xs text-[#F72585] font-bold">Quick Shortcut</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-4 text-center">
            {RELATIONS.map((rel, idx) => {
              const Icon = rel.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleOpenRelation(rel)}
                  className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-pink-50/40 hover:bg-white border border-pink-100/70 hover:border-[#F72585]/40 hover:shadow-md transition duration-200 group cursor-pointer"
                >
                  <div className={`h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-tr ${rel.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition duration-200 mb-2`}>
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-800 group-hover:text-[#F72585] transition">
                    {rel.label}
                  </span>
                  <span className="text-[10px] text-gray-400 truncate max-w-full">
                    {rel.role}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. "Upcoming Occasions" Carousel — Regional AP & Indian Festivals */}
      <section className="w-full py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">Upcoming occasions</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Popular regional & seasonal celebrations in Coastal Andhra Pradesh & India
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel("left")}
                className="h-8 w-8 rounded-full border border-gray-200 bg-white hover:border-[#F72585] hover:text-[#F72585] flex items-center justify-center transition cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="h-8 w-8 rounded-full border border-gray-200 bg-white hover:border-[#F72585] hover:text-[#F72585] flex items-center justify-center transition cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Horizontally scrollable carousel */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {UPCOMING_OCCASIONS.map((occ, idx) => {
              const Icon = occ.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleOpenOccasion(occ)}
                  className="min-w-[190px] sm:min-w-[210px] rounded-3xl bg-white border border-gray-150 p-4 shadow-sm hover:shadow-lg hover:border-pink-300 transition duration-300 flex flex-col justify-between cursor-pointer group shrink-0"
                >
                  <div className="space-y-3">
                    {/* Top date badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-pink-50 text-[#F72585] border border-pink-200">
                        {occ.dateLabel}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold">2026/27</span>
                    </div>

                    {/* Central Icon Illustration */}
                    <div className="h-20 w-full rounded-2xl bg-gradient-to-tr from-pink-50 to-amber-50 flex items-center justify-center group-hover:scale-105 transition duration-300">
                      <div className={`h-12 w-12 rounded-xl ${occ.color} text-white flex items-center justify-center shadow-md`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold text-gray-900 group-hover:text-[#F72585] transition line-clamp-1">
                        {occ.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                        {occ.theme}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 mt-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#F72585] flex items-center gap-1 group-hover:underline">
                      + Add Reminder
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#F72585] transition" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. "Celebrate Your Special Dates" Stat Banner */}
      <section className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-[#1E2233] via-[#2D1B36] to-[#F72585] p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 relative overflow-hidden">
          {/* Subtle gold glow */}
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-[#C9A227]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Left illustration & headline */}
          <div className="flex items-center gap-5 max-w-lg">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-lg">
              <Gift className="h-8 w-8 sm:h-10 sm:w-10 text-[#C9A227]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A227] block">
                CREATIVE PARADISE REWARD CLUB
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white leading-tight mt-0.5">
                We remind you. You get rewarded with love.
              </h2>
              <p className="text-xs text-gray-300 mt-1">
                Plan celebrations 3+ days early and unlock exclusive coupons on cakes, roses & custom 3D lamps.
              </p>
            </div>
          </div>

          {/* Right Two Big Trust Stats */}
          <div className="flex items-center gap-8 sm:gap-12 shrink-0 border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-10 w-full md:w-auto justify-around md:justify-start">
            <div className="text-center md:text-left">
              <div className="text-2xl sm:text-4xl font-black text-[#C9A227]">
                3,500+
              </div>
              <div className="text-xs font-bold text-white mt-0.5">Occasions Saved</div>
              <div className="text-[10px] text-gray-300">from &quot;Oh no!&quot; moments</div>
            </div>

            <div className="text-center md:text-left">
              <div className="text-2xl sm:text-4xl font-black text-white">
                100%
              </div>
              <div className="text-xs font-bold text-white mt-0.5">On-Time Alerts</div>
              <div className="text-[10px] text-gray-300">via Push & WhatsApp</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Live Customer Dashboard: "Your Saved Reminders" List */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">Your Saved Reminders</h2>
                <span className="text-xs font-bold bg-pink-50 text-[#F72585] px-3 py-0.5 rounded-full border border-pink-200">
                  {sortedReminders.length} Active
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Automatically monitored and synchronized with your account
              </p>
            </div>

            <button
              onClick={() => {
                if (!user) openAuthModal();
                else setIsModalOpen(true);
              }}
              className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#F72585] text-white text-xs font-bold shadow-xs hover:bg-[#d6136c] transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Reminder</span>
            </button>
          </div>

          {isLoading ? (
            <div className="rounded-3xl bg-gray-50 p-12 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#F72585] border-r-transparent mb-2" />
              <p className="text-xs text-gray-500">Loading your saved celebrations...</p>
            </div>
          ) : sortedReminders.length === 0 ? (
            <div className="rounded-3xl bg-pink-50/30 border border-dashed border-pink-200 p-10 text-center space-y-3">
              <CalendarHeart className="h-10 w-10 text-[#F72585] mx-auto" />
              <h3 className="text-base font-bold text-gray-900">No Reminders Added Yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Use the quick relationship shortcuts above or click &quot;+ Add Occasion&quot; to save your first celebration.
              </p>
              <button
                onClick={() => {
                  if (!user) openAuthModal();
                  else setIsModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#F72585] text-white text-xs font-bold hover:bg-[#d6136c] shadow-xs"
              >
                + Add Occasion Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedReminders.map(rem => {
                const daysRemaining = getDaysRemaining(rem.date);
                const cat = getOccasionCategory(rem.occasion);

                let badgeClass = "bg-pink-50 text-[#F72585] border-pink-200";
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
                    className="rounded-3xl bg-white border border-gray-150 p-5 shadow-sm hover:shadow-md hover:border-pink-200 transition duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top status bar */}
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase ${badgeClass}`}>
                          {badgeText}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => triggerTestNotification(rem)}
                            className="p-1.5 text-gray-400 hover:text-[#F72585] hover:bg-pink-50 rounded-lg transition"
                            title="Test alert for this date"
                          >
                            <Send className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteReminder(rem.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete reminder"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Recipient info */}
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#1E2233] to-[#F72585] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                          <Cake className="h-5 w-5 text-[#C9A227]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-extrabold text-gray-900 leading-snug truncate">
                            {rem.recipientName}&apos;s {rem.occasion}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                            <CalendarIcon className="h-3.5 w-3.5 text-gray-400" />
                            <span>
                              {new Date(rem.date + "T00:00:00").toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                              })}
                            </span>
                            {rem.relationship && (
                              <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.2 rounded-full font-semibold">
                                {rem.relationship}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {rem.notes && (
                        <p className="mt-3 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl italic border border-gray-100">
                          &quot;{rem.notes}&quot;
                        </p>
                      )}
                    </div>

                    {/* Quick gift action */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400">
                        Alert: {rem.notifyDaysBefore}d ahead
                      </span>
                      <Link
                        href={cat.href}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#F72585] hover:text-[#d6136c] transition"
                      >
                        <span>{cat.label}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 7. "How Reminders Work" — Clean 4-Step Process */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-[#C9A227] uppercase tracking-widest">
              SIMPLE & AUTOMATED
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              How reminders work
            </h2>
            <p className="text-xs text-gray-500">
              Four easy steps to effortless, on-time celebrations every single year
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS_STEPS.map((stepItem, idx) => {
              const Icon = stepItem.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white p-6 border border-gray-150 shadow-sm hover:shadow-md transition space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-pink-50 text-[#F72585] flex items-center justify-center font-bold shadow-xs">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-black text-gray-200 group-hover:text-pink-200 transition">
                      0{stepItem.step}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 leading-snug">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Modal: Add Occasion Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-2xl bg-pink-50 text-[#F72585] flex items-center justify-center">
                  <CalendarHeart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">Add an Occasion</h3>
                  <p className="text-[11px] text-gray-500">We will notify you early with curated gift options</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReminder} className="mt-5 space-y-4">
              {/* Occasion Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Occasion Type *</label>
                <select
                  value={occasion}
                  onChange={e => setOccasion(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 focus:border-[#F72585] focus:outline-none cursor-pointer"
                >
                  <option value="Birthday">🎂 Birthday</option>
                  <option value="Anniversary">💖 Anniversary</option>
                  <option value="Valentine's Day">🌹 Valentine&apos;s Day</option>
                  <option value="Mother's Day">🌸 Mother&apos;s Day</option>
                  <option value="Father's Day">👔 Father&apos;s Day</option>
                  <option value="Diwali (Deepavali)">🪔 Diwali (Deepavali)</option>
                  <option value="Sankranti / Pongal">🪁 Sankranti / Pongal</option>
                  <option value="Ugadi (Telugu New Year)">🌾 Ugadi (Telugu New Year)</option>
                  <option value="Raksha Bandhan">🧵 Raksha Bandhan</option>
                  <option value="New Year 2027">🥂 New Year 2027</option>
                  <option value="Custom">✨ Other Custom Occasion</option>
                </select>
              </div>

              {occasion === "Custom" && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Custom Occasion Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Promotion, Housewarming, Graduation"
                    value={customOccasion}
                    onChange={e => setCustomOccasion(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-gray-900 focus:border-[#F72585] focus:outline-none"
                  />
                </div>
              )}

              {/* Recipient & Relationship */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mom, Priya, Rahul"
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-gray-900 focus:border-[#F72585] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Relationship</label>
                  <select
                    value={relationship}
                    onChange={e => setRelationship(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 focus:border-[#F72585] focus:outline-none cursor-pointer"
                  >
                    <option value="Partner">Partner (Spouse/Dating)</option>
                    <option value="Parents">Parents (Mom & Dad)</option>
                    <option value="Friends">Friends</option>
                    <option value="Siblings">Siblings</option>
                    <option value="Colleagues">Colleagues / Boss</option>
                    <option value="Kids">Kids</option>
                    <option value="Other">Other Relation</option>
                  </select>
                </div>
              </div>

              {/* Date & Advance Notice */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Celebration Date *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-gray-900 focus:border-[#F72585] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Remind Me Ahead</label>
                  <select
                    value={notifyDaysBefore}
                    onChange={e => setNotifyDaysBefore(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 focus:border-[#F72585] focus:outline-none"
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
                <label className="block text-xs font-bold text-gray-700 mb-1">Gift Ideas / Personal Note</label>
                <input
                  type="text"
                  placeholder="e.g. Loves red velvet cakes, prefer Dutch roses, needs photo frame"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-gray-900 focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#F72585] text-white text-xs font-bold hover:bg-[#d6136c] shadow-md shadow-pink-500/25 transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
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
