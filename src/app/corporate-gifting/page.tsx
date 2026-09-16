"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Gift,
  Building2,
  CheckCircle2,
  Phone,
  Send,
  Sparkles,
  Award,
  Truck,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  BadgePercent,
  ArrowRight,
} from "lucide-react";

interface HamperTier {
  id: string;
  title: string;
  subtitle: string;
  pricePerUnit: number;
  minUnits: number;
  image: string;
  tag: string;
  badgeStyle: "pink" | "gold" | "emerald";
  items: string[];
  bestFor: string;
}

const BULK_HAMPER_TIERS: HamperTier[] = [
  {
    id: "executive-kit",
    title: "Artisan Executive Welcome Hamper",
    subtitle: "Sleek professional essentials with laser-engraved corporate logo",
    pricePerUnit: 499,
    minUnits: 25,
    tag: "BESTSELLER",
    badgeStyle: "pink",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    items: [
      "Custom Engraved Matte Insulated Flask (500ml)",
      "Premium Leatherette Notebook with Company Branding",
      "Metallic Rollerball Pen with Custom Name Engraving",
      "Artisanal Butter Cookies & Custom Welcome Note",
    ],
    bestFor: "Employee onboarding, Client appreciation, Annual conferences",
  },
  {
    id: "festive-royal",
    title: "Festive Royal Gourmet & Dry Fruits Box",
    subtitle: "Luxurious gold-foiled rigid box packed with premium dry fruits",
    pricePerUnit: 799,
    minUnits: 50,
    tag: "FESTIVAL SPECIAL",
    badgeStyle: "gold",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop",
    items: [
      "Premium California Jumbo Almonds (200g)",
      "Whole Roasted Salted Cashews (200g)",
      "Afghan Green Raisins & Turkish Dried Apricots (200g)",
      "Traditional Coastal AP Sweets or Handcrafted Chocolates",
      "Custom Gold Embossed Sleeve with Brand Greeting",
    ],
    bestFor: "Diwali corporate gifting, New Year hampers, Milestone achievements",
  },
  {
    id: "vip-acrylic",
    title: "VIP Custom 3D Acrylic & Desk Set",
    subtitle: "State-of-the-art 3D edge-lit acrylic artwork with wooden LED base",
    pricePerUnit: 1299,
    minUnits: 20,
    tag: "PREMIUM LUXURY",
    badgeStyle: "gold",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop",
    items: [
      "Edge-Lit 3D Laser-Cut Acrylic Company Logo / Trophy Lamp",
      "Warm Wooden LED Base with Touch Dimmer & Type-C Cable",
      "Handcrafted Desk Organiser & Pen Stand",
      "Luxury Hardbound Velvet Gift Box with Satin Ribbon",
    ],
    bestFor: "Leadership awards, Strategic VIP partners, Founder recognitions",
  },
  {
    id: "celebration-basket",
    title: "Celebration Sweet & Savory Basket",
    subtitle: "Handcrafted natural cane basket with curated celebratory treats",
    pricePerUnit: 649,
    minUnits: 30,
    tag: "EVENT POPULAR",
    badgeStyle: "pink",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    items: [
      "Artisanal Belgian Dark Chocolates Box (12 pcs)",
      "Vanilla Scented Glass Wax Candle with Custom Label",
      "Roasted Makhana & Gourmet Trail Mix",
      "Eco-friendly Handwoven Basket with Custom Satin Ribbon",
    ],
    bestFor: "Wedding return gifts, Housewarmings, Family & corporate gatherings",
  },
];

export default function CorporateGiftingPage() {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState("Employee Appreciation / Onboarding");
  const [quantity, setQuantity] = useState("25 - 50 units");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactPerson.trim() || !phone.trim() || !email.trim()) {
      alert("Please fill in company name, contact person, phone and email.");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      occasion,
      quantity,
      message: message.trim(),
    };

    try {
      const res = await fetch("/api/corporate-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        try {
          const stored = localStorage.getItem("cp_corporate_inquiries");
          const list = stored ? JSON.parse(stored) : [];
          list.unshift({
            ...payload,
            id: `corp-${Date.now()}`,
            status: "New",
            createdAt: new Date().toISOString(),
          });
          localStorage.setItem("cp_corporate_inquiries", JSON.stringify(list));
        } catch (_) {}
      }
    } catch (err) {
      console.warn("API submission fallback:", err);
    }

    setIsSubmitting(false);
    setSubmittedSuccess(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Creative Paradise! I am interested in Corporate & Bulk Gifting.\nCompany: ${companyName || "Our Company"}\nOccasion: ${occasion}\nEstimated Units: ${quantity}\nPlease share your latest catalogue and bulk quotation.`
  );

  return (
    <div className="w-full min-h-screen bg-white text-gray-900">
      {/* 1. Hero Section — Kept as an intentional, dramatic dark navy "cover section" */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-[#121520] via-[#1E2233] to-[#121520] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        {/* Subtle background glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F72585]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#C9A227]/40 text-xs font-extrabold text-[#C9A227] tracking-wider uppercase backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>BULK & CORPORATE GIFTING SUITE</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto text-white">
            Memorable Gifts Crafted for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F72585] via-pink-400 to-[#F72585]">
              Workplaces & Celebrations
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Elevate employee appreciation, Diwali festivities, client onboarding, and wedding return gifting with custom-branded hampers handcrafted in our Coastal Andhra Pradesh studio.
          </p>

          {/* 4 Feature Cards — Clean frosted-glass cards with visible subtle borders */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-4xl mx-auto pt-6 text-left">
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 shadow-sm hover:bg-white/15 transition">
              <div className="h-8 w-8 rounded-lg bg-[#F72585]/20 flex items-center justify-center mb-2">
                <Building2 className="h-4 w-4 text-[#F72585]" />
              </div>
              <div className="text-xs font-bold text-white">Custom Logo</div>
              <div className="text-[11px] text-gray-300 mt-0.5">Laser & Gold Foil</div>
            </div>

            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 shadow-sm hover:bg-white/15 transition">
              <div className="h-8 w-8 rounded-lg bg-[#C9A227]/20 flex items-center justify-center mb-2">
                <BadgePercent className="h-4 w-4 text-[#C9A227]" />
              </div>
              <div className="text-xs font-bold text-white">Volume Pricing</div>
              <div className="text-[11px] text-gray-300 mt-0.5">Tiers from 20 to 500+</div>
            </div>

            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 shadow-sm hover:bg-white/15 transition">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-2">
                <Truck className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-xs font-bold text-white">Direct Dispatch</div>
              <div className="text-[11px] text-gray-300 mt-0.5">Repalle & Coastal AP</div>
            </div>

            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 shadow-sm hover:bg-white/15 transition">
              <div className="h-8 w-8 rounded-lg bg-pink-400/20 flex items-center justify-center mb-2">
                <ShieldCheck className="h-4 w-4 text-pink-300" />
              </div>
              <div className="text-xs font-bold text-white">Dedicated Lead</div>
              <div className="text-[11px] text-gray-300 mt-0.5">15-min WhatsApp Quote</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#inquiry-form"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#F72585] hover:bg-[#d6136c] text-white text-xs font-bold shadow-lg shadow-pink-600/30 hover:-translate-y-0.5 transition duration-200 flex items-center justify-center gap-2"
            >
              <span>Request Custom Bulk Quotation</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`https://wa.me/919177003905?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 hover:-translate-y-0.5 transition duration-200 flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4" />
              <span>Instant WhatsApp Chat (+91 9177003905)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Curated Hampers Catalog Grid — Clean White Background */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#FDF8F9]/40 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs font-bold text-[#C9A227] uppercase tracking-widest">
              FEATURED BULK SOLUTIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900">
              Curated Hampers with Transparent Volume Tiers
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
              Choose from ready-to-dispatch luxury configurations or customize every item with your organization’s branding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BULK_HAMPER_TIERS.map(tier => {
              const isPinkBadge = tier.badgeStyle === "pink";
              return (
                <div
                  key={tier.id}
                  className="rounded-3xl bg-white border border-gray-100 shadow-md hover:shadow-xl hover:border-pink-200 transition-all duration-300 group flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Image header with clean pricing pill */}
                    <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                      <Image
                        src={tier.image}
                        alt={tier.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                      {/* Small, refined pill badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border ${
                            isPinkBadge
                              ? "bg-white text-[#F72585] border-pink-200"
                              : "bg-white text-[#C9A227] border-amber-200"
                          }`}
                        >
                          {tier.tag}
                        </span>
                      </div>

                      {/* Clean white pricing pill */}
                      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs border border-gray-200 shadow-lg px-3.5 py-1.5 rounded-2xl text-right">
                        <div className="text-[10px] uppercase font-bold text-gray-400">Starting From</div>
                        <div className="text-base font-black text-gray-950">
                          ₹{tier.pricePerUnit}{" "}
                          <span className="text-xs text-gray-500 font-normal">/ unit</span>
                        </div>
                        <div className="text-[10px] text-[#C9A227] font-bold">Min. {tier.minUnits}+ units</div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-black text-gray-900 group-hover:text-[#F72585] transition">
                          {tier.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">{tier.subtitle}</p>
                      </div>

                      {/* Included Items list in clean charcoal text */}
                      <div className="space-y-2 pt-1">
                        <div className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">
                          Hamper Includes:
                        </div>
                        <ul className="space-y-1.5">
                          {tier.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-3 border-t border-gray-100 mt-2 flex items-center justify-between bg-gray-50/50">
                    <div className="text-[11px] text-gray-500">
                      Best For: <span className="text-gray-800 font-semibold">{tier.bestFor}</span>
                    </div>
                    <a
                      href="#inquiry-form"
                      onClick={() => {
                        setOccasion(tier.title);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#F72585] hover:bg-[#d6136c] text-white text-xs font-bold shadow-sm shadow-pink-500/20 transition flex items-center gap-1.5 shrink-0"
                    >
                      <span>Select & Enquire</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Why Choose Creative Paradise Section — Light Cream / Soft Tint Background */}
      <section className="w-full py-16 bg-[#FDF6F0] border-b border-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#C9A227] uppercase tracking-widest">
              OUR WORKSHOP ADVANTAGE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Why 120+ Companies & Event Organisers Trust Creative Paradise
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Direct factory manufacturing with verified craftsmanship in Coastal Andhra Pradesh.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl bg-white p-6 border border-gray-150 shadow-sm hover:shadow-md transition space-y-3">
              <div className="h-12 w-12 rounded-xl bg-pink-50 text-[#F72585] flex items-center justify-center font-bold">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">In-House Laser & UV Crafting</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We do not outsource branding. Our Repalle workshop features fiber laser engravers and UV printers for pristine logo finishes on steel, wood, and acrylic.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-white p-6 border border-gray-150 shadow-sm hover:shadow-md transition space-y-3">
              <div className="h-12 w-12 rounded-xl bg-amber-50 text-[#C9A227] flex items-center justify-center font-bold">
                <BadgePercent className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Direct Workshop Pricing</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Save 25% to 40% compared to tier-1 metro gifting agencies. Enjoy factory-direct pricing without middleman markups.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-white p-6 border border-gray-150 shadow-sm hover:shadow-md transition space-y-3">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Same-Day Coastal AP Logistics</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Dedicated regional transport covering Repalle, Bapatla, Tenali, Guntur, and Vijayawada. Pan-India courier dispatch with trackable delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Inquiry Form & WhatsApp Connect Section — Clean Light Background */}
      <section id="inquiry-form" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Context & WhatsApp Widget (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#C9A227] uppercase tracking-widest">
                  FAST QUOTATION DESK
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                  Tell Us About Your Requirement
                </h2>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Corporate orders are unique. Share your approximate headcount and date, and our corporate coordinator will call or WhatsApp you within 15 minutes with customized mockup proofs and price brackets.
                </p>
              </div>

              {/* Light WhatsApp Callout Card with Green Accent Border */}
              <div className="rounded-3xl bg-emerald-50/70 border-2 border-emerald-300 p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Need a Fast Quote for Tomorrow?</h4>
                    <p className="text-xs text-emerald-700 font-semibold">WhatsApp direct line active now</p>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  Send us your company logo and required delivery date directly on WhatsApp for instant sample photos from our Repalle workshop.
                </p>

                <a
                  href={`https://wa.me/919177003905?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat on WhatsApp (+91 9177003905)</span>
                </a>
              </div>

              {/* Light GST Invoicing Card */}
              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 space-y-1.5 text-xs text-gray-700">
                <div className="font-bold text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#C9A227]" />
                  <span>GST Invoicing Available</span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Official GST tax invoices provided for all business & institutional orders to facilitate input credit.
                </p>
              </div>
            </div>

            {/* Right Column: Clean White Card Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-8 shadow-xl">
                {submittedSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="h-16 w-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900">Inquiry Received!</h3>
                    <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                      Thank you, <strong className="text-gray-900">{contactPerson}</strong>! Our corporate gifting manager will review your request for <strong className="text-[#C9A227]">{companyName}</strong> and contact you within 15 minutes.
                    </p>
                    <div className="pt-4 flex items-center justify-center gap-3">
                      <a
                        href={`https://wa.me/919177003905?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow-sm transition flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        <span>Speed Up on WhatsApp</span>
                      </a>
                      <button
                        onClick={() => setSubmittedSuccess(false)}
                        className="px-5 py-2.5 rounded-xl bg-gray-100 text-xs font-bold text-gray-700 hover:bg-gray-200 transition"
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border-b border-gray-100 pb-3">
                      <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-[#F72585]" />
                        <span>Corporate Inquiry Form</span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Fill in your requirements below for bulk pricing tiers and digital mockup samples.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Company / Organization Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Infosys, TCS, Coastal Biotech"
                          value={companyName}
                          onChange={e => setCompanyName(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Contact Person Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rajesh Kumar"
                          value={contactPerson}
                          onChange={e => setContactPerson(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Business Mobile Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9848012345"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Official Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. rajesh@company.com"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Occasion / Purpose *
                        </label>
                        <select
                          value={occasion}
                          onChange={e => setOccasion(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white px-3.5 py-2.5 text-xs text-gray-900 focus:border-[#F72585] focus:outline-none transition cursor-pointer"
                        >
                          <option value="Employee Appreciation / Onboarding">Employee Appreciation / Onboarding</option>
                          <option value="Diwali & Festive Corporate Gifting">Diwali & Festive Corporate Gifting</option>
                          <option value="Client Welcome & Milestone Hamper">Client Welcome & Milestone Hamper</option>
                          <option value="Wedding Return Gifts">Wedding Return Gifts</option>
                          <option value="Annual General Meeting / Conference">Annual Meeting / Conference</option>
                          <option value="Custom 3D Trophy / Acrylic Awards">Custom 3D Trophy / Acrylic Awards</option>
                          <option value="Other Bulk Gifting">Other Bulk Gifting</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Approximate Quantity *
                        </label>
                        <select
                          value={quantity}
                          onChange={e => setQuantity(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white px-3.5 py-2.5 text-xs text-gray-900 focus:border-[#F72585] focus:outline-none transition cursor-pointer"
                        >
                          <option value="20 - 50 units">20 – 50 units (Sample / Small Batch)</option>
                          <option value="50 - 100 units">50 – 100 units (Standard Tier)</option>
                          <option value="100 - 250 units">100 – 250 units (Volume Discount)</option>
                          <option value="250 - 500 units">250 – 500 units (Corporate Special)</option>
                          <option value="500+ units">500+ units (Maximum Wholesale Tier)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Customization Notes / Target Budget per unit
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. We require company logo laser engraved on the bottle, along with a personalized name card for each employee. Budget: ~₹600 per hamper."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none transition"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-xl bg-[#F72585] hover:bg-[#d6136c] text-white text-xs font-bold shadow-lg shadow-pink-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="h-4 w-4" />
                        <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Corporate Inquiry"}</span>
                      </button>
                      <p className="text-[11px] text-center text-gray-400 mt-2">
                        Our corporate desk responds within 15 minutes with complete catalogue pricing.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
