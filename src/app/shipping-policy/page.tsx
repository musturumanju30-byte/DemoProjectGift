import React from "react";
import Link from "next/link";
import { Truck, Clock, MapPin } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <h1 className="text-2xl font-black text-gray-900 border-b border-gray-100 pb-3">
          Shipping & Same-Day Delivery Policy
        </h1>

        <div className="space-y-4">
          <h2 className="text-base font-bold text-gray-900">1. Repalle Town 2-Hour Express Delivery</h2>
          <p>
            Orders for fresh flowers, designer cakes, and ready-made gift hampers placed between <strong>08:00 AM and 07:00 PM</strong> within Repalle town limits are eligible for 2-hour express delivery. Custom laser-engraved gifts take an additional 60-90 minutes for precision engraving and polishing.
          </p>

          <h2 className="text-base font-bold text-gray-900">2. Coastal Andhra Pradesh Delivery Hubs</h2>
          <p>
            We deliver to surrounding Mandals and towns including Nizampatnam, Bhattiprolu, Cherukupalli, Nagaram, Bapatla, Tenali, and Guntur. Orders placed before 03:00 PM are delivered same-day in the evening slot.
          </p>

          <h2 className="text-base font-bold text-gray-900">3. Midnight Surprise Deliveries</h2>
          <p>
            Midnight deliveries are scheduled between <strong>11:00 PM and 12:00 Midnight</strong>. Our courier executive will coordinate discreetly via phone call with the sender so as not to spoil the surprise.
          </p>

          <h2 className="text-base font-bold text-gray-900">4. Delivery Charges & Free Delivery Threshold</h2>
          <p>
            Standard deliveries in Repalle are completely <strong>FREE</strong> for orders above ₹499. Orders below ₹499 incur a nominal ₹60 courier fee.
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Link href="/" className="font-bold text-[#F72585] hover:underline">
            ← Back to Creative Paradise
          </Link>
        </div>
      </div>
    </div>
  );
}
