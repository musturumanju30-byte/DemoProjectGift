"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) newErrors.name = "Please enter your name";
    if (!phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setFormSubmitted(true);
  };

  const faqs = [
    {
      q: "How fast is same-day delivery in Repalle?",
      a: "For orders placed before 7:00 PM, we deliver within 2 hours anywhere within Repalle town limits. You can also pick exact afternoon, evening, or midnight delivery slots at checkout.",
    },
    {
      q: "Do you deliver to Nizampatnam, Bapatla, and Tenali?",
      a: "Yes! We deliver across Coastal Andhra Pradesh including Nizampatnam, Bhattiprolu, Nagaram, Cherukupalli, Bapatla, Tenali, and Guntur. Same-day delivery is available on orders placed before 3:00 PM.",
    },
    {
      q: "Can I customize the cake design or greeting card note?",
      a: "Absolutely! On each cake and gift product page, you can type your customized name/message and include a free handwritten calligraphy card note.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We support 100% secure payments via Razorpay including Google Pay, PhonePe, Paytm, all UPI apps, Visa, Mastercard, RuPay, and NetBanking.",
    },
  ];

  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#F72585] uppercase tracking-wider block mb-1">
            GET IN TOUCH
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Contact & Workshop Location
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Have questions about a custom order or bulk corporate gifting? We are here to help 7 days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Workshop & Service Area info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xs space-y-5">
              <h2 className="text-base font-extrabold text-gray-900 pb-3 border-b border-gray-100">
                Studio Information
              </h2>

              <div className="flex items-start gap-3 text-xs text-gray-600">
                <div className="h-9 w-9 rounded-xl bg-pink-50 flex items-center justify-center text-[#F72585] shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <strong className="block text-gray-900 mb-0.5">Workshop Address:</strong>
                  Near Clock Tower, Gandhi Road, Repalle, Bapatla District, Andhra Pradesh — 522265
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-gray-600">
                <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <strong className="block text-gray-900 mb-0.5">Phone & WhatsApp:</strong>
                  +91 9177003905
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-gray-600">
                <div className="h-9 w-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <strong className="block text-gray-900 mb-0.5">Operating Hours:</strong>
                  Monday – Sunday: 08:00 AM – 11:30 PM (Midnight Deliveries until 12:30 AM)
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/c/919177003905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
                >
                  <Phone className="h-4 w-4" />
                  Direct WhatsApp Catalog Link
                </a>
              </div>
            </div>

            {/* Service Hubs Pill */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xs space-y-2 text-xs">
              <h3 className="font-bold text-gray-900">Serviceable Hubs in Coastal AP:</h3>
              <p className="text-gray-600 leading-relaxed">
                Repalle Town • Nizampatnam • Bhattiprolu • Nagaram • Cherukupalli • Bapatla • Tenali • Guntur • Vijayawada
              </p>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="text-base font-extrabold text-gray-900 mb-1">
                Send Us a Message
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                Tell us about custom personalized dimensions or bulk event orders.
              </p>

              {formSubmitted ? (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center text-emerald-800 space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                  <h3 className="text-sm font-bold">Message Received!</h3>
                  <p className="text-xs text-emerald-700">
                    Our Repalle studio team will contact you via phone/WhatsApp within 30 minutes.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setName("");
                      setPhone("");
                      setMessage("");
                    }}
                    className="mt-2 rounded-xl bg-emerald-700 text-white px-4 py-2 text-xs font-semibold hover:bg-emerald-800 transition min-h-[44px]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh"
                        value={name}
                        onChange={e => {
                          setName(e.target.value);
                          if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                        }}
                        className={`w-full rounded-xl border bg-gray-50 p-2.5 text-xs font-medium focus:bg-white focus:outline-none min-h-[44px] ${
                          errors.name ? "border-rose-500 focus:border-rose-600" : "border-gray-200 focus:border-[#F72585]"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] font-semibold text-rose-600 mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="10-digit phone (e.g. 9848012345)"
                        value={phone}
                        onChange={e => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                        }}
                        className={`w-full rounded-xl border bg-gray-50 p-2.5 text-xs font-medium focus:bg-white focus:outline-none min-h-[44px] ${
                          errors.phone ? "border-rose-500 focus:border-rose-600" : "border-gray-200 focus:border-[#F72585]"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] font-semibold text-rose-600 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Inquiry Details / Custom Design Notes
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your gift ideas, required delivery date, or questions..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs font-medium focus:border-[#F72585] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#F72585] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#d6136c] transition min-h-[44px]"
                  >
                    <Send className="h-4 w-4" /> Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extrabold text-gray-900 text-center mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xs cursor-pointer transition"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900">{faq.q}</h3>
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                  {isOpen && (
                    <p className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-100 leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
