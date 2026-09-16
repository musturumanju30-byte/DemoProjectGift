import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <h1 className="text-2xl font-black text-gray-900 border-b border-gray-100 pb-3">
          Privacy Policy
        </h1>

        <div className="space-y-4">
          <p>
            At Creative Paradise Gift Store (`@repalle_gifts`), your privacy is paramount. This policy outlines how we collect, store, and safeguard your personal details and recipient gift photographs.
          </p>
          <h2 className="text-base font-bold text-gray-900">Personal Photos & Engraving Data</h2>
          <p>
            Photos uploaded for customized acrylic lamps, wooden portraits, and frames are solely used by our production machines in Repalle to create your gift. We never publish or disclose customer private photos without explicit consent.
          </p>
          <h2 className="text-base font-bold text-gray-900">Payment Data Security</h2>
          <p>
            Payment transactions are processed through Razorpay using bank-grade 256-bit encryption. We never store credit/debit card numbers or UPI PINs on our servers.
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
