"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Phone,
  MessageSquare,
  Gift,
  Award,
  BadgePercent,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

interface CollectionItem {
  id: string;
  badge: string;
  badgeType: "pink" | "amber" | "gold";
  title: string;
  startingPrice: string;
  bullets: string[];
  image: string;
}

const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: "welcome-hamper",
    badge: "Bestseller",
    badgeType: "pink",
    title: "Executive Welcome Hamper",
    startingPrice: "₹1,499",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    bullets: [
      "Premium dry fruit assortment",
      "Artisan chocolate selection",
      "Branded tote bag",
      "Personalised greeting card",
    ],
  },
  {
    id: "festive-box",
    badge: "Festival Special",
    badgeType: "amber",
    title: "Festive Celebration Box",
    startingPrice: "₹2,299",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    bullets: [
      "Traditional mithai selection",
      "Dry fruits & nuts mix",
      "Handcrafted diyas set",
      "Silk-finish gift wrap",
    ],
  },
  {
    id: "prestige-bundle",
    badge: "Premium Luxury",
    badgeType: "gold",
    title: "Corporate Prestige Bundle",
    startingPrice: "₹3,999",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop",
    bullets: [
      "Belgian chocolate box",
      "Premium tea selection",
      "Branded leather notebook",
      "Custom logo engraving",
      "Executive pen set",
    ],
  },
  {
    id: "appreciation-kit",
    badge: "Team Popular",
    badgeType: "pink",
    title: "Team Appreciation Kit",
    startingPrice: "₹999",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto=format&fit=crop",
    bullets: [
      "Assorted cookies & biscotti",
      "Herbal tea bags set",
      "Scented candle",
      "Thank you card with message",
    ],
  },
];

export default function CorporateGiftingPage() {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [occasion, setOccasion] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactPerson.trim() || !phone.trim() || !email.trim()) {
      alert("Please fill in Company Name, Your Name, Email, and Phone.");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      occasion: occasion || "Not specified",
      quantity: quantity || "Not specified",
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

  const handleSelectHamper = (title: string) => {
    setMessage(prev => (prev ? `${prev} | Interested in: ${title}` : `Interested in: ${title}`));
    const el = document.getElementById("get-a-quote");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Creative Paradise! I am inquiring about Corporate Gifting.\nCompany: ${companyName || "Our Company"}\nOccasion: ${occasion || "Corporate Event"}\nEstimated Units: ${quantity || "Bulk"}\nPlease share your latest catalogue and quotation.`
  );

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 font-sans">
      {/* =========================================================================
          1. HERO SECTION (Dark Navy with Playfair Display & Badges)
         ========================================================================= */}
      <section className="w-full bg-[#181B26] text-white py-16 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-gray-800">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="max-w-4xl space-y-5">
            {/* Top Pill Badge */}
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full border border-amber-500/50 bg-amber-500/10 text-[#C9A227] text-xs font-bold uppercase tracking-wider">
                CORPORATE GIFTING
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.15]">
              Gifting That Elevates <br />
              <span className="text-[#F72585]">Workplaces &amp; Celebrations</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl font-normal leading-relaxed">
              Curated hampers, custom branding, and direct dispatch — crafted for companies that believe the right gift builds lasting relationships.
            </p>

            {/* Feature Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm font-medium text-gray-200">
                Custom Logo
              </span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm font-medium text-gray-200">
                Volume Pricing
              </span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm font-medium text-gray-200">
                Direct Dispatch
              </span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm font-medium text-gray-200">
                Dedicated Lead
              </span>
            </div>

            {/* Action CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#get-a-quote"
                className="px-7 py-3.5 rounded-xl bg-[#F72585] hover:bg-[#d6136c] text-white font-bold text-sm shadow-md transition active:scale-95 text-center"
              >
                Request Custom Quotation
              </a>
              <a
                href={`https://wa.me/919177003905?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageSquare className="h-4 w-4 fill-white text-white" />
                <span>Chat on Whatsapp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. OUR COLLECTION (4-Column Grid with Hampers)
         ========================================================================= */}
      <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-gray-100">
        <div className="w-full max-w-[1700px] mx-auto">
          {/* Header */}
          <div className="space-y-2 mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-pink-100 text-[#F72585] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              OUR COLLECTION
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 tracking-tight">
              Curated Hampers for Every Occasion
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
              Each hamper is thoughtfully assembled for corporate gifting — with options for custom branding on every item.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {COLLECTION_ITEMS.map(item => (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-200/90 bg-white shadow-2xs hover:shadow-xl hover:border-pink-200 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Image Stage */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold shadow-xs ${
                      item.badgeType === "pink"
                        ? "bg-[#F72585] text-white"
                        : item.badgeType === "amber"
                        ? "bg-[#C9A227] text-white"
                        : "bg-[#1E2233] text-amber-300 border border-amber-300/30"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Content Block */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[15px] sm:text-base font-bold text-gray-950 line-clamp-1 group-hover:text-[#F72585] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-1">Starting from</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-950 mt-0.5">{item.startingPrice}</p>

                    {/* Bullets */}
                    <ul className="mt-3.5 space-y-1.5 text-xs text-gray-600">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <span className="text-gray-400 font-bold">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pink Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectHamper(item.title)}
                    className="mt-5 w-full py-2.5 rounded-xl bg-[#F72585] hover:bg-[#d6136c] text-white text-xs sm:text-[13px] font-bold shadow-xs transition active:scale-95 cursor-pointer text-center"
                  >
                    Select &amp; Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHY COMPANIES TRUST US (Soft Cream Background & 3 Feature Cards)
         ========================================================================= */}
      <section className="w-full bg-[#FAF7F2] py-16 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-gray-200/80">
        <div className="w-full max-w-[1700px] mx-auto">
          {/* Header */}
          <div className="space-y-2 mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              WHY CHOOSE US
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 tracking-tight">
              Why Companies Trust Us
            </h2>
          </div>

          {/* 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-stone-200/70 bg-white p-6 sm:p-8 shadow-xs space-y-3">
              <div className="h-11 w-11 rounded-xl bg-pink-50 text-[#F72585] flex items-center justify-center">
                <Gift className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Bulk Order Management
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Seamless handling of orders from 10 to 10,000 units with dedicated account managers, real-time tracking, and guaranteed on-time delivery for every workplace event.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-stone-200/70 bg-white p-6 sm:p-8 shadow-xs space-y-3">
              <div className="h-11 w-11 rounded-xl bg-pink-50 text-[#F72585] flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Custom Branding &amp; Logo
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Full custom logo printing, co-branded packaging, and bespoke ribbon finishes — every box carries your branded touchpoint that employees and clients remember.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-stone-200/70 bg-white p-6 sm:p-8 shadow-xs space-y-3">
              <div className="h-11 w-11 rounded-xl bg-pink-50 text-[#F72585] flex items-center justify-center">
                <BadgePercent className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Transparent Volume Pricing
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Clear tiered pricing with no hidden charges. The more you order, the better your rate — with invoicing, GST compliance, and credit terms available for verified businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. GET A QUOTE (Form & WhatsApp Section)
         ========================================================================= */}
      <section id="get-a-quote" className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Context Column (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-pink-100 text-[#F72585] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                  GET A QUOTE
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight mt-2 leading-tight">
                  Let&apos;s Build Your <br />
                  Corporate Gift
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed">
                  Share your requirements and we&apos;ll send you a tailored proposal within 24 hours — complete with pricing, samples, and branding options.
                </p>
              </div>

              {/* WhatsApp Callout Card */}
              <div className="rounded-2xl bg-[#F0FDF4] border border-[#86EFAC] p-5 sm:p-6 space-y-2.5">
                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MessageSquare className="h-5 w-5 fill-white text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Prefer to chat?</h4>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                      WhatsApp us directly for quick queries — we reply within minutes during business hours.
                    </p>
                    <a
                      href={`https://wa.me/919177003905?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline mt-2"
                    >
                      <span>+91 91770 03905</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
                {submittedSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="h-16 w-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 font-serif">Corporate Inquiry Received!</h3>
                    <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                      Thank you, <strong className="text-gray-900">{contactPerson}</strong>! Our corporate gifting team will review your requirements for <strong className="text-[#F72585]">{companyName}</strong> and share a custom proposal within 24 hours.
                    </p>
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmittedSuccess(false);
                          setCompanyName("");
                          setContactPerson("");
                          setEmail("");
                          setPhone("");
                          setMessage("");
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gray-100 text-xs font-bold text-gray-800 hover:bg-gray-200 transition"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Company Name & Your Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          COMPANY NAME *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Acme Corp"
                          value={companyName}
                          onChange={e => setCompanyName(e.target.value)}
                          className="w-full h-11 rounded-xl border border-gray-200 px-3.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Priya Sharma"
                          value={contactPerson}
                          onChange={e => setContactPerson(e.target.value)}
                          className="w-full h-11 rounded-xl border border-gray-200 px-3.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none transition"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          EMAIL *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="priya@acme.com"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full h-11 rounded-xl border border-gray-200 px-3.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          PHONE *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full h-11 rounded-xl border border-gray-200 px-3.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none transition"
                        />
                      </div>
                    </div>

                    {/* Row 3: Quantity Required & Occasion */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          QUANTITY REQUIRED
                        </label>
                        <div className="relative">
                          <select
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                            className="w-full h-11 rounded-xl border border-gray-200 px-3.5 text-xs text-gray-700 appearance-none bg-white focus:border-[#F72585] focus:outline-none transition pr-9"
                          >
                            <option value="">Select range</option>
                            <option value="10 - 25 units">10 - 25 units</option>
                            <option value="25 - 50 units">25 - 50 units</option>
                            <option value="50 - 100 units">50 - 100 units</option>
                            <option value="100 - 250 units">100 - 250 units</option>
                            <option value="250 - 500 units">250 - 500 units</option>
                            <option value="500+ units">500+ units</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          OCCASION
                        </label>
                        <div className="relative">
                          <select
                            value={occasion}
                            onChange={e => setOccasion(e.target.value)}
                            className="w-full h-11 rounded-xl border border-gray-200 px-3.5 text-xs text-gray-700 appearance-none bg-white focus:border-[#F72585] focus:outline-none transition pr-9"
                          >
                            <option value="">Select occasion</option>
                            <option value="Employee Onboarding / Welcome">Employee Onboarding / Welcome</option>
                            <option value="Diwali / Festive Celebration">Diwali / Festive Celebration</option>
                            <option value="Client Appreciation">Client Appreciation</option>
                            <option value="Annual Conference / Summit">Annual Conference / Summit</option>
                            <option value="Work Anniversary / Recognition">Work Anniversary / Recognition</option>
                            <option value="Custom Gift Box">Custom Gift Box</option>
                            <option value="Other">Other</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Additional Requirements */}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        ADDITIONAL REQUIREMENTS
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Custom branding, specific dietary preferences, delivery timeline..."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 p-3 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none transition resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-[#F72585] hover:bg-[#d6136c] text-white font-bold text-sm shadow-md hover:shadow-lg transition active:scale-[0.99] disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Corporate Inquiry"}</span>
                    </button>

                    {/* Privacy Disclaimer */}
                    <p className="text-[11px] text-gray-400 text-center pt-1">
                      We respect your privacy. Your details are used solely for this inquiry.
                    </p>
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

