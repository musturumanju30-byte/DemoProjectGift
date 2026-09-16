import React from "react";
import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <h1 className="text-2xl font-black text-gray-900 border-b border-gray-100 pb-3">
          Returns & Refund Policy
        </h1>

        <div className="space-y-4">
          <h2 className="text-base font-bold text-gray-900">1. Personalised & Perishable Goods Notice</h2>
          <p>
            Because our items are personalized with unique names, photos, or laser engravings, or are perishable (fresh Dutch roses and bakery cakes), they cannot be returned or restocked once produced.
          </p>

          <h2 className="text-base font-bold text-gray-900">2. Damaged or Defective Deliveries</h2>
          <p>
            In the rare event that an item arrives broken, damaged in transit, or missing a customized component, please share photos via WhatsApp (+91 9177003905) within <strong>4 hours</strong> of delivery. We will promptly issue a free immediate remake or full refund via the original Razorpay payment method.
          </p>

          <h2 className="text-base font-bold text-gray-900">3. Cancellation Window</h2>
          <p>
            Orders can be cancelled free of charge up to <strong>1 hour</strong> after placement, prior to our studio starting laser engraving or cake baking.
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
