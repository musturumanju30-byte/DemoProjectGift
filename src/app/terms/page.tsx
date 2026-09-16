import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <h1 className="text-2xl font-black text-gray-900 border-b border-gray-100 pb-3">
          Terms & Conditions
        </h1>

        <div className="space-y-4">
          <h2 className="text-base font-bold text-gray-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and placing orders with Creative Paradise Gift Store (Repalle, Andhra Pradesh), you agree to be bound by these store policies and service terms.
          </p>

          <h2 className="text-base font-bold text-gray-900">2. Accuracy of Delivery Information</h2>
          <p>
            The customer is responsible for ensuring the accuracy of the recipient phone number, address, and landmark. Our delivery rider attempts contact up to 3 times upon arrival at the delivery address.
          </p>

          <h2 className="text-base font-bold text-gray-900">3. Perishable Cake & Flower Handling</h2>
          <p>
            Fresh cakes and flowers should be collected promptly upon delivery and refrigerated as per care instructions.
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
