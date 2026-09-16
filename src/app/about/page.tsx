import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Award, Truck, ShieldCheck, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero Header */}
      <section className="w-full bg-gradient-to-b from-pink-50/70 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#F72585] uppercase tracking-wider bg-pink-100/80 px-3 py-1 rounded-full mb-3">
            <Sparkles className="h-3.5 w-3.5" /> Handcrafted in Andhra Pradesh
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            The Story of Creative Paradise
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            From our artisan studio in Repalle to doorsteps across Coastal Andhra Pradesh, we bring emotions to life through personalized creations, fresh Dutch roses, and studio-baked cakes.
          </p>
        </div>
      </section>

      {/* Main Content & Roots */}
      <section className="w-full py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Gifting Elevated to a ₹15 Lakh Brand Standard
              </h2>
              <p>
                Founded in Repalle, <strong>Creative Paradise Gift Store</strong> (Instagram: <a href="https://www.instagram.com/repalle_gifts" target="_blank" rel="noopener noreferrer" className="text-[#F72585] font-bold">@repalle_gifts</a>) was born out of a simple realization: sending high-quality, thoughtful, and aesthetic personalized gifts shouldn&apos;t require waiting weeks from distant metropolitan hubs.
              </p>
              <p>
                We established our own local production workshop right here on Gandhi Road near Clock Tower in Repalle. By pairing industrial laser-engraving machines, optical UV acrylic printers, and dedicated artisan florists with local express logistics, we made <strong>same-day delivery in 2 hours</strong> a living reality.
              </p>
              <p>
                Whether it is a midnight surprise anniversary cake, an illuminated 3D acrylic night lamp capturing your wedding vow, or a 50-rose velvet hatbox, every piece is made with meticulous precision, generous whitespace, and premium finishes.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F72585] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#d6136c] transition"
                >
                  Shop Bestsellers <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://wa.me/c/919177003905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-xs font-bold text-gray-800 hover:border-[#F72585] transition"
                >
                  Chat on WhatsApp (+91 9177003905)
                </a>
              </div>
            </div>

            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop"
                alt="Artisan gift workshop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Counter */}
      <section className="w-full bg-gray-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-3xl sm:text-4xl font-black text-gray-900">500+</span>
            <span className="text-xs font-bold text-[#F72585] block mt-1">Milestones Celebrated</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-gray-900">2 Hours</span>
            <span className="text-xs font-bold text-amber-600 block mt-1">Repalle Express Delivery</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-gray-900">30+</span>
            <span className="text-xs font-bold text-blue-600 block mt-1">Coastal AP Hubs</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-gray-900">100%</span>
            <span className="text-xs font-bold text-emerald-600 block mt-1">Handcrafted Quality</span>
          </div>
        </div>
      </section>
    </div>
  );
}
