"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Package,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  User,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { Order, OrderStatus } from "@/types";

const ORDER_STEPS: { status: OrderStatus; label: string; desc: string }[] = [
  { status: "placed", label: "Order Placed", desc: "Received & confirmed via Razorpay" },
  { status: "processing", label: "Crafting & Baking", desc: "Personalisation in Repalle workshop" },
  { status: "shipped", label: "Quality Inspected", desc: "Handcrafted gift wrap & packing" },
  { status: "out_for_delivery", label: "Out For Delivery", desc: "Delivery rider on route in Coastal AP" },
  { status: "delivered", label: "Delivered", desc: "Handed over with festive celebration" },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";
  const initialPhone = searchParams.get("phone") || "";

  const { user } = useAuth();
  const { orders, trackOrder } = useStore();

  // Search form fields
  const [orderIdInput, setOrderIdInput] = useState(initialId);
  const [phoneInput, setPhoneInput] = useState(initialPhone || user?.phone || "");
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Orders belonging strictly to the logged-in user
  const userOrders = user
    ? orders.filter(
        o =>
          (o.userId && o.userId === user.id) ||
          (o.customerEmail && o.customerEmail.toLowerCase() === user.email.toLowerCase())
      )
    : [];

  // Initial load logic
  useEffect(() => {
    let isMounted = true;

    const initializeTracking = async () => {
      setErrorMsg("");

      // 1. If Order ID was supplied via URL query (e.g. from Order Confirmation or My Orders)
      if (initialId) {
        setIsLoading(true);
        const res = await trackOrder(
          initialId,
          initialPhone || phoneInput,
          user ? user.id : undefined
        );
        if (isMounted) {
          setIsLoading(false);
          if (res.order) {
            setCurrentOrder(res.order);
            setOrderIdInput(res.order.orderNumber);
            setPhoneInput(res.order.customerPhone);
          } else {
            setErrorMsg(res.error || "Order not found — please check your Order ID and mobile number.");
            setCurrentOrder(null);
          }
        }
        return;
      }

      // 2. If logged in and has orders, select their most recent order
      if (user && userOrders.length > 0) {
        setCurrentOrder(userOrders[0]);
        setOrderIdInput(userOrders[0].orderNumber);
        setPhoneInput(userOrders[0].customerPhone);
        return;
      }

      // 3. Otherwise, clean slate — do NOT show anyone else's mock order!
      setCurrentOrder(null);
    };

    initializeTracking();

    return () => {
      isMounted = false;
    };
  }, [initialId, initialPhone, user?.id]);

  // Keep current order in sync with admin status updates in orders context
  useEffect(() => {
    if (currentOrder) {
      const updated = orders.find(
        o => o.id === currentOrder.id || o.orderNumber === currentOrder.orderNumber
      );
      if (
        updated &&
        (updated.orderStatus !== currentOrder.orderStatus ||
          updated.trackingHistory.length !== currentOrder.trackingHistory.length)
      ) {
        setCurrentOrder(updated);
      }
    }
  }, [orders, currentOrder]);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanOrderId = orderIdInput.trim();
    const cleanPhone = phoneInput.trim().replace(/\D/g, "");

    if (!cleanOrderId) {
      setErrorMsg("Please enter an Order ID (e.g. CP-79516).");
      return;
    }

    // Requirement 5: Guest tracking requires both Order ID and Mobile Number to prevent guessing
    if (!user && (!cleanPhone || cleanPhone.length < 10)) {
      setErrorMsg("For privacy and security, please enter both your Order ID and your 10-digit mobile number.");
      return;
    }

    setIsLoading(true);
    const res = await trackOrder(cleanOrderId, cleanPhone, user?.id);
    setIsLoading(false);

    if (res.order) {
      setCurrentOrder(res.order);
    } else {
      setCurrentOrder(null);
      setErrorMsg(res.error || "Order not found — please check your Order ID and mobile number.");
    }
  };

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case "placed":
        return 0;
      case "processing":
        return 1;
      case "shipped":
        return 2;
      case "out_for_delivery":
        return 3;
      case "delivered":
        return 4;
      case "cancelled":
        return -1;
      default:
        return 0;
    }
  };

  const currentStepIndex = currentOrder ? getStepIndex(currentOrder.orderStatus) : 0;

  return (
    <div className="w-full bg-gray-50/60 min-h-screen py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#F72585] bg-pink-50 border border-pink-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Truck className="h-3.5 w-3.5" /> Real-Time Live Dispatch
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Track Your Order Status
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md mx-auto">
            {user
              ? `Welcome ${user.name}! View your live order status, artisan crafting, and courier dispatch below.`
              : "Enter your Order ID and 10-digit mobile number to track live delivery progression."}
          </p>

          {/* Quick Select for Logged-In User with Multiple Orders */}
          {user && userOrders.length > 1 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2 text-xs shadow-xs">
              <span className="text-gray-500 font-medium">Your Orders:</span>
              <select
                value={currentOrder?.orderNumber || ""}
                onChange={e => {
                  const sel = userOrders.find(o => o.orderNumber === e.target.value);
                  if (sel) {
                    setCurrentOrder(sel);
                    setOrderIdInput(sel.orderNumber);
                    setPhoneInput(sel.customerPhone);
                    setErrorMsg("");
                  }
                }}
                className="font-bold text-[#F72585] bg-transparent focus:outline-none cursor-pointer"
              >
                {userOrders.map(o => (
                  <option key={o.id} value={o.orderNumber}>
                    {o.orderNumber} — {o.orderStatus.replace("_", " ").toUpperCase()} ({new Date(o.createdAt).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Search Box */}
          <div className="mt-6 max-w-lg mx-auto bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div>
                  <label htmlFor="track-order-id" className="block text-[11px] font-bold text-gray-700 mb-1">
                    Order ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <input
                      id="track-order-id"
                      name="orderId"
                      type="text"
                      placeholder="e.g. CP-79516"
                      value={orderIdInput}
                      onChange={e => {
                        setOrderIdInput(e.target.value);
                        setErrorMsg("");
                      }}
                      className="w-full min-h-[40px] rounded-xl border border-gray-200 bg-gray-50/50 py-2 pl-9 pr-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#F72585] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="track-order-phone" className="block text-[11px] font-bold text-gray-700 mb-1">
                    10-Digit Mobile <span className="text-red-500">{user ? "(optional)" : "*"}</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <input
                      id="track-order-phone"
                      name="phone"
                      type="tel"
                      maxLength={10}
                      placeholder="e.g. 9848012345"
                      value={phoneInput}
                      onChange={e => {
                        setPhoneInput(e.target.value);
                        setErrorMsg("");
                      }}
                      className="w-full min-h-[40px] rounded-xl border border-gray-200 bg-gray-50/50 py-2 pl-9 pr-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#F72585] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 gap-2">
                <span className="text-[10px] text-gray-400 text-left flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-600 shrink-0" />
                  Protected with guest privacy verification
                </span>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="min-h-[40px] rounded-xl bg-[#F72585] px-6 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#d6136c] transition cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Search className="h-3.5 w-3.5" />
                      Track Order
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Error Notice */}
          {errorMsg && (
            <div className="mt-4 max-w-lg mx-auto p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5 text-left animate-in fade-in">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block">Lookup Notice</span>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}
        </div>

        {/* Empty State when user has no orders and no search executed */}
        {!currentOrder && !errorMsg && user && userOrders.length === 0 && (
          <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 text-center shadow-xs">
            <div className="h-16 w-16 rounded-full bg-pink-50 border border-pink-100 text-[#F72585] flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8" />
            </div>
            <h2 className="text-base font-bold text-gray-900">No Orders in Your Account Yet</h2>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
              You haven&apos;t placed any gifts under <strong>{user.email}</strong> yet. Discover our handcrafted personalized gifts with same-day Repalle delivery!
            </p>
            <Link
              href="/shop"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F72585] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d6136c] transition"
            >
              <Sparkles className="h-3.5 w-3.5" /> Explore Gifts Catalog
            </Link>
          </div>
        )}

        {/* Order Details & Stepper Card */}
        {currentOrder && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header info */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-[#C9A227] uppercase tracking-wider block">
                  ORDER REFERENCE
                </span>
                <h2 className="text-lg font-black text-gray-900 mt-0.5">
                  {currentOrder.orderNumber}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Placed for: <strong>{currentOrder.customerName}</strong> ({currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.pincode})
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Booked on {new Date(currentOrder.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${
                    currentOrder.orderStatus === "delivered"
                      ? "bg-emerald-100 text-emerald-800"
                      : currentOrder.orderStatus === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-pink-100 text-[#F72585]"
                  }`}
                >
                  {currentOrder.orderStatus.replace("_", " ")}
                </span>
                <p className="text-xs text-gray-500 mt-1.5">
                  Scheduled Delivery: <strong className="text-gray-900">{currentOrder.deliveryDate}</strong>
                </p>
                <p className="text-[11px] text-gray-400">{currentOrder.deliverySlot}</p>
              </div>
            </div>

            {/* Cancelled Alert Banner */}
            {currentOrder.orderStatus === "cancelled" && (
              <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-xs text-red-700 flex items-start gap-2.5">
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Order Cancelled</h4>
                  <p className="mt-0.5">
                    This order has been cancelled. Any payments processed will be refunded to your original payment method. Contact our store team for details.
                  </p>
                </div>
              </div>
            )}

            {/* VISUAL STATUS STEPPER (5 steps) */}
            {currentOrder.orderStatus !== "cancelled" && (
              <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                    Delivery Progression
                  </h3>
                  <span className="text-[11px] text-gray-400">
                    Live Status: <strong className="text-gray-700">{ORDER_STEPS[currentStepIndex]?.label}</strong>
                  </span>
                </div>

                <div className="relative pl-6 sm:pl-8 border-l-2 border-gray-200 space-y-8">
                  {ORDER_STEPS.map((step, idx) => {
                    const isCompleted = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;
                    const historyRecord = currentOrder.trackingHistory.find(h => h.status === step.status);

                    return (
                      <div key={step.status} className="relative">
                        {/* Stepper Node */}
                        <div
                          className={`absolute -left-[31px] sm:-left-[39px] top-0 h-6 w-6 sm:h-8 sm:w-8 rounded-full border-2 flex items-center justify-center transition-all ${
                            isCompleted
                              ? "border-[#F72585] bg-[#F72585] text-white shadow-md shadow-pink-200"
                              : "border-gray-300 bg-white text-gray-300"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          ) : (
                            <span className="text-[10px] font-bold">{idx + 1}</span>
                          )}
                        </div>

                        {/* Content */}
                        <div>
                          <div className="flex items-center gap-2">
                            <h4
                              className={`text-sm sm:text-base font-extrabold ${
                                isCurrent
                                  ? "text-[#F72585]"
                                  : isCompleted
                                  ? "text-gray-900"
                                  : "text-gray-400"
                              }`}
                            >
                              {step.label}
                            </h4>
                            {isCurrent && (
                              <span className="animate-pulse rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-bold text-[#F72585]">
                                IN PROGRESS
                              </span>
                            )}
                            {isCompleted && !isCurrent && (
                              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.2 rounded-md">
                                COMPLETED
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>

                          {/* Real Timestamp & Description from trackingHistory */}
                          {historyRecord && (
                            <div className="mt-1.5 p-2 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-600 flex items-start gap-2">
                              <Clock className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <span className="font-semibold text-gray-800 block">
                                  {historyRecord.timestamp || "Updated"}
                                </span>
                                <span>{historyRecord.description}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Items Summary in Tracking */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                  Items in This Order ({currentOrder.items.length})
                </h3>
                <span className="text-xs font-black text-[#F72585]">
                  Total: ₹{currentOrder.totalAmount}
                </span>
              </div>

              <div className="divide-y divide-gray-100 space-y-3">
                {currentOrder.items.map(item => (
                  <div key={item.cartItemId} className="pt-2 flex items-start gap-3.5">
                    <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                      <Image
                        src={item.product?.images?.[0] || "/images/placeholder.jpg"}
                        alt={item.product?.title || "Product"}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-gray-900">{item.product?.title}</p>
                      <p className="text-gray-500 text-[11px] mt-0.5">
                        Qty: {item.quantity} • ₹{item.unitPrice} each
                      </p>

                      {/* Custom Personalisation Details */}
                      {item.personalisation?.engravingText && (
                        <p className="text-[#F72585] text-[11px] font-semibold mt-1 bg-pink-50/70 p-1.5 rounded-lg border border-pink-100/60 inline-block">
                          Custom Engraving: &quot;{item.personalisation.engravingText}&quot;
                        </p>
                      )}
                      {item.personalisation?.selectedVariant && (
                        <p className="text-gray-600 text-[11px] mt-0.5">
                          Variant / Flavour: <strong>{item.personalisation.selectedVariant}</strong>
                        </p>
                      )}
                      {item.personalisation?.messageCardNote && (
                        <p className="text-gray-600 text-[11px] mt-0.5 italic">
                          Card Note: &quot;{item.personalisation.messageCardNote}&quot;
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-extrabold text-gray-900 shrink-0">
                      ₹{item.unitPrice * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Assistance Button */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-gray-500">Need immediate updates on delivery?</span>
                <a
                  href={`https://wa.me/919177003905?text=${encodeURIComponent(
                    `Hi, I am checking the status of my order ${currentOrder.orderNumber}. Recipient: ${currentOrder.customerName}. Can you please provide an update?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-700 transition shadow-xs"
                >
                  <Phone className="h-3.5 w-3.5" /> WhatsApp Support (+91 9177003905)
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[70vh] flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-3 border-[#F72585] border-t-transparent animate-spin" />
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
