"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Truck,
  Phone,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ShoppingBag,
  Share2,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { getOrderById } = useStore();
  const order = orderId ? getOrderById(orderId) : null;

  useEffect(() => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F72585", "#C9A227", "#38bdf8", "#10b981"],
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!order) {
    return (
      <div className="bg-gray-50/50 min-h-[70vh] flex items-center justify-center p-6 text-center">
        <div className="max-w-md rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Order Not Found</h2>
          <p className="text-xs text-gray-500 mt-2">
            We couldn&apos;t retrieve the order details. Please check your order ID or contact customer care.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-[#F72585] px-6 py-2.5 text-xs font-bold text-white"
          >
            Back To Home
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Creative Paradise Gift Store! I just placed an order:\n\n*Order ID:* ${order.orderNumber}\n*Recipient:* ${order.customerName}\n*Delivery Area:* ${order.shippingAddress.area}, ${order.shippingAddress.pincode}\n*Slot:* ${order.deliverySlot}\n*Total:* ₹${order.totalAmount}\n\nPlease confirm same-day delivery progress. Thank you!`
  );

  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Banner */}
        <div className="rounded-3xl bg-white border border-emerald-100 p-6 sm:p-8 shadow-sm text-center mb-8 relative overflow-hidden">
          <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider">
            Payment Confirmed via Razorpay
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-3">
            Thank You! Your Order is Placed
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-lg mx-auto leading-relaxed">
            We received your gifting order. Our artisans in Repalle have begun preparing and personalising your gifts!
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-2 text-xs">
              <span className="text-gray-500">Order Number: </span>
              <strong className="text-gray-900 font-mono text-sm">{order.orderNumber}</strong>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-2 text-xs">
              <span className="text-gray-500">Scheduled Delivery: </span>
              <strong className="text-[#F72585]">{order.deliveryDate}</strong>
            </div>
          </div>

          {/* WhatsApp Share Button */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/919177003905?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
            >
              <Phone className="h-4 w-4" />
              Send Order Details to WhatsApp (+91 9177003905)
            </a>
            <Link
              href={`/track-order?id=${order.orderNumber}&phone=${encodeURIComponent(order.customerPhone)}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#1E2233] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-black transition"
            >
              <Truck className="h-4 w-4 text-pink-400" />
              Track Live Delivery Status
            </Link>
          </div>
        </div>

        {/* Order Details Breakdown */}
        <div className="rounded-3xl bg-white border border-gray-100 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">
              Order Summary
            </h2>
            <span className="text-xs font-bold text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>

          {/* Delivery Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-gray-900 mb-1">
                <MapPin className="h-4 w-4 text-[#F72585]" /> Shipping Destination
              </div>
              <p className="font-semibold text-gray-800">{order.customerName}</p>
              <p className="text-gray-600">{order.shippingAddress.street}</p>
              <p className="text-gray-600">
                {order.shippingAddress.area}, {order.shippingAddress.city} — {order.shippingAddress.pincode}
              </p>
              <p className="text-gray-600">Phone: {order.customerPhone}</p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-gray-900 mb-1">
                <Clock className="h-4 w-4 text-[#C9A227]" /> Scheduled Slot
              </div>
              <p className="font-semibold text-gray-800">{order.deliverySlot}</p>
              <p className="text-gray-600">Type: {order.deliveryType.toUpperCase()}</p>
              {order.specialInstructions && (
                <p className="text-[11px] text-pink-700 italic mt-1">
                  Note: &quot;{order.specialInstructions}&quot;
                </p>
              )}
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-xs font-bold text-gray-700 mb-3">Items Purchased</h3>
            <div className="divide-y divide-gray-100 space-y-3">
              {order.items.map((item: any) => (
                <div key={item.cartItemId} className="pt-3 flex gap-3.5 items-center">
                  <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-bold text-gray-900 truncate">{item.product.title}</h4>
                    <p className="text-gray-500 text-[11px]">
                      Qty: {item.quantity} • ₹{item.unitPrice} each
                    </p>
                    {item.personalisation?.engravingText && (
                      <p className="text-[11px] text-[#F72585] font-medium">
                        Custom: &quot;{item.personalisation.engravingText}&quot;
                      </p>
                    )}
                  </div>
                  <span className="font-extrabold text-xs text-gray-900">
                    ₹{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Total */}
          <div className="border-t border-gray-100 pt-4 space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">₹{order.subtotal}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount ({order.couponCode})</span>
                <span>-₹{order.discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="font-semibold text-gray-900">
                {order.deliveryFee === 0 ? "FREE" : `₹${order.deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2 text-sm font-black text-gray-900">
              <span>Total Paid</span>
              <span className="text-[#F72585]">₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-xs font-bold text-gray-600 hover:text-[#F72585] transition"
          >
            ← Return to Creative Paradise Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading order confirmation...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
