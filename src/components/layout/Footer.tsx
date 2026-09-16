"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  ArrowRight,
  CheckCircle2,
  Truck,
  Sparkles,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import {
  InstagramIcon,
  FacebookIcon,
  TwitterXIcon,
  LinkedInIcon,
  WhatsAppIcon,
  VisaBadge,
  MastercardBadge,
  RuPayBadge,
  UpiBadge,
  NetBankingBadge,
  AmexBadge,
} from "@/components/common/Icons";
import { useAuth } from "@/context/AuthContext";

export const Footer: React.FC = () => {
  const { user, openAuthModal } = useAuth();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
    setNewsletterEmail("");
  };

  return (
    <footer className="w-full bg-[#F7F8F9] text-[#222222] border-t border-gray-200 font-sans">
      {/* Trust Feature Strip (Light Theme) */}
      <div className="w-full border-b border-gray-200 bg-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="h-11 w-11 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#F72585] mb-2 shadow-xs">
              <Truck className="h-5 w-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Same-Day Delivery</h4>
            <p className="text-[11px] text-gray-500 mt-0.5 max-w-[210px] leading-relaxed">
              Within 2 hours in Repalle & same-day across Coastal AP hubs.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-11 w-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-[#C9A227] mb-2 shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">100% Personalised</h4>
            <p className="text-[11px] text-gray-500 mt-0.5 max-w-[210px] leading-relaxed">
              Precision laser engraving, custom acrylic & studio-baked freshness.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-11 w-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-2 shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Razorpay Secure</h4>
            <p className="text-[11px] text-gray-500 mt-0.5 max-w-[210px] leading-relaxed">
              Bank-grade 256-bit encrypted UPI, Cards & NetBanking checkout.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-11 w-11 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-2 shadow-xs">
              <RotateCcw className="h-5 w-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">500+ Celebrations</h4>
            <p className="text-[11px] text-gray-500 mt-0.5 max-w-[210px] leading-relaxed">
              Rated 4.9★ in Repalle, Bapatla, Tenali & Guntur.
            </p>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-0 lg:divide-x lg:divide-gray-200">
          
          {/* Column 1: Policy Info */}
          <div className="lg:pr-6 space-y-3">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">Policy Info</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="/terms" className="hover:text-[#F72585] transition block py-0.5">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#F72585] transition block py-0.5">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms#usage" className="hover:text-[#F72585] transition block py-0.5">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/terms#disclaimer" className="hover:text-[#F72585] transition block py-0.5">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-[#F72585] transition block py-0.5">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: About Company */}
          <div className="lg:px-6 space-y-3">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">About Company</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="/about" className="hover:text-[#F72585] transition block py-0.5">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="hover:text-[#F72585] transition block py-0.5">
                  CP Team
                </Link>
              </li>
              <li>
                <Link href="/about#careers" className="hover:text-[#F72585] transition block py-0.5">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/about#testimonials" className="hover:text-[#F72585] transition block py-0.5">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/about#news" className="hover:text-[#F72585] transition block py-0.5">
                  News Room
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#F72585] transition block py-0.5">
                  Blog & Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: CP Business / Services */}
          <div className="lg:px-6 space-y-3">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">CP Business</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="/contact?service=decoration" className="hover:text-[#F72585] transition block py-0.5">
                  Decoration Services
                </Link>
              </li>
              <li>
                <Link href="/contact?service=corporate" className="hover:text-[#F72585] transition block py-0.5">
                  Corporate Service
                </Link>
              </li>
              <li>
                <Link href="/contact?service=affiliate" className="hover:text-[#F72585] transition block py-0.5">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link href="/contact#stores" className="hover:text-[#F72585] transition block py-0.5">
                  Retail Stores
                </Link>
              </li>
              <li>
                <Link href="/contact?service=franchise" className="hover:text-[#F72585] transition block py-0.5">
                  Franchise
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Need Help ? */}
          <div className="lg:px-6 space-y-3">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">Need Help ?</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="/contact" className="hover:text-[#F72585] transition block py-0.5">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact#faq" className="hover:text-[#F72585] transition block py-0.5">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#F72585] transition block py-0.5">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#F72585] transition block py-0.5">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                {user ? (
                  <Link href="/account" className="hover:text-[#F72585] transition block py-0.5">
                    My Account ({user.name.split(" ")[0]})
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={openAuthModal}
                    className="hover:text-[#F72585] transition block py-0.5 text-left text-xs text-gray-600 cursor-pointer"
                  >
                    My Account
                  </button>
                )}
              </li>
            </ul>
          </div>

          {/* Column 5: Service Hubs & Presence */}
          <div className="lg:px-6 space-y-3">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">Service Hubs</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="/category/same-day" className="hover:text-[#F72585] transition block py-0.5">
                  Repalle Town & Hub
                </Link>
              </li>
              <li>
                <Link href="/category/same-day" className="hover:text-[#F72585] transition block py-0.5">
                  Nizampatnam Coastal
                </Link>
              </li>
              <li>
                <Link href="/category/same-day" className="hover:text-[#F72585] transition block py-0.5">
                  Bapatla & Cherukupalli
                </Link>
              </li>
              <li>
                <Link href="/category/same-day" className="hover:text-[#F72585] transition block py-0.5">
                  Tenali & Guntur
                </Link>
              </li>
              <li>
                <Link href="/category/same-day" className="hover:text-[#F72585] transition block py-0.5">
                  Vijayawada City
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-[#F72585] transition block py-0.5">
                  Pan-India Delivery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: Subscribe Now */}
          <div className="lg:pl-6 space-y-3 col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">Subscribe Now</h3>
            <p className="text-xs text-gray-500 leading-snug">
              Get updates on promotions and offers coupons.
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-medium animate-in fade-in">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="mt-2">
                <div className="relative flex items-center bg-white border border-gray-300 rounded-xl px-3 py-1.5 shadow-2xs hover:border-gray-400 focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 transition">
                  <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                  <input
                    id="footer-newsletter-email"
                    name="newsletter_email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter email address"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    className="w-full bg-transparent border-none text-xs text-gray-800 placeholder:text-gray-400 focus:outline-hidden px-2 py-1"
                    required
                  />
                  <button
                    type="submit"
                    className="p-1 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 transition shrink-0"
                    aria-label="Submit newsletter"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Middle Section: Statutory / Corporate Information */}
      <div className="w-full border-t border-gray-200/80 bg-[#F7F8F9] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-2 text-[11px] text-gray-500 leading-relaxed">
          <p>
            Company Name: Creative Paradise Retail Private Limited{" "}
            <span className="text-gray-300 mx-1">|</span> CIN: U52100AP2021PTC118882{" "}
            <span className="text-gray-300 mx-1">|</span> Regd. Office: Near Clock Tower, Gandhi Road, Repalle, Andhra Pradesh - 522265
          </p>
          <p>
            Telephone No.: +91-9177003905{" "}
            <span className="text-gray-300 mx-1">|</span> Grievance Resolution Officer Name: Store Operations{" "}
            <span className="text-gray-300 mx-1">|</span> Contact No.: +91 9177003905 / 9755-248-248{" "}
            <span className="text-gray-300 mx-1">|</span> Email ID - support@repallgifts.com
          </p>
          <div className="pt-1">
            <Link
              href="/about#csr"
              className="text-[#0066cc] hover:text-[#004499] hover:underline transition font-medium"
            >
              Corporate Social Responsibility (CSR) Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Social Icons, Copyright & Payment Badges */}
      <div className="w-full border-t border-gray-200 bg-white py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Circular Social Icons */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-full border border-gray-400 hover:border-gray-900 text-gray-600 hover:text-black flex items-center justify-center transition hover:bg-gray-50"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-full border border-gray-400 hover:border-gray-900 text-gray-600 hover:text-black flex items-center justify-center transition hover:bg-gray-50"
              aria-label="X / Twitter"
            >
              <TwitterXIcon className="h-3 w-3" />
            </a>
            <a
              href="https://www.instagram.com/repalle_gifts"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-full border border-gray-400 hover:border-gray-900 text-gray-600 hover:text-black flex items-center justify-center transition hover:bg-gray-50"
              aria-label="Instagram @repalle_gifts"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-full border border-gray-400 hover:border-gray-900 text-gray-600 hover:text-black flex items-center justify-center transition hover:bg-gray-50"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://wa.me/c/919177003905"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-full border border-gray-400 hover:border-emerald-600 text-gray-600 hover:text-emerald-600 flex items-center justify-center transition hover:bg-emerald-50"
              aria-label="WhatsApp Store"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Center: Copyright Statement */}
          <div className="text-xs text-gray-500 text-center font-normal">
            © 1994-{new Date().getFullYear()} creativeparadise.com All rights reserved.
          </div>

          {/* Right: Payment Cards & Gateways */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <VisaBadge className="h-6 w-auto shadow-2xs" />
            <MastercardBadge className="h-6 w-auto shadow-2xs" />
            <RuPayBadge className="h-6 w-auto shadow-2xs" />
            <UpiBadge className="h-6 w-auto shadow-2xs" />
            <NetBankingBadge className="h-6 w-auto shadow-2xs" />
            <AmexBadge className="h-6 w-auto shadow-2xs" />
          </div>

        </div>
      </div>
    </footer>
  );
};
