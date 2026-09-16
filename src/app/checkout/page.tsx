"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { SERVICEABLE_PINCODES, DELIVERY_SLOTS } from "@/data/locations";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, subtotal, discount, deliveryFee, total, clearCart, appliedCoupon } = useCart();
  const { createOrder, selectedDeliveryPincode } = useStore();

  // Address fields (prefilled if user is authenticated)
  const [fullName, setFullName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [streetAddress, setStreetAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [selectedPincode, setSelectedPincode] = useState(selectedDeliveryPincode || "522265");

  // Keep fields synced if user signs in while on checkout
  React.useEffect(() => {
    if (user) {
      if (!fullName && user.name) setFullName(user.name);
      if (!email && user.email) setEmail(user.email);
      if (!phone && user.phone) setPhone(user.phone);
    }
  }, [user]);

  // Delivery timing
  const [deliveryDateOption, setDeliveryDateOption] = useState<"today" | "tomorrow" | "custom">("today");
  const [customDate, setCustomDate] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState(DELIVERY_SLOTS[1].id);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<"razorpay_upi" | "razorpay_card" | "razorpay_netbanking" | "cod">("razorpay_upi");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [formError, setFormError] = useState("");

  const currentPincodeInfo =
    SERVICEABLE_PINCODES.find(p => p.pincode === selectedPincode) || SERVICEABLE_PINCODES[0];
  const chosenSlot = DELIVERY_SLOTS.find(s => s.id === selectedSlotId) || DELIVERY_SLOTS[0];

  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const effectiveDeliveryDate =
    deliveryDateOption === "today"
      ? todayStr
      : deliveryDateOption === "tomorrow"
      ? tomorrowStr
      : customDate || todayStr;

  const handlePincodeChange = (pin: string) => {
    setSelectedPincode(pin);
  };

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const errors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      errors.fullName = "Recipient name is required";
    }
    if (!phone.trim()) {
      errors.phone = "Mobile number is required";
    } else if (phone.replace(/\D/g, "").length < 10) {
      errors.phone = "Please enter a valid 10-digit mobile number";
    }
    if (!streetAddress.trim()) {
      errors.streetAddress = "Delivery house / street address is required";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setFormError("Please fill in the highlighted required fields before proceeding.");
      return;
    }

    setFieldErrors({});
    setPaymentFailed(false);
    // Open Razorpay simulated checkout modal
    setPaymentModalOpen(true);
  };

  const handleCompleteRazorpayPayment = async () => {
    setIsProcessingPayment(true);

    try {
      // Create order with user ID if logged in
      const newOrder = await createOrder({
        userId: user?.id,
        customerName: fullName.trim(),
        customerEmail: email.trim() || user?.email || `${phone.trim()}@customer.com`,
        customerPhone: phone.trim(),
        shippingAddress: {
          street: streetAddress.trim(),
          area: currentPincodeInfo.locationName,
          landmark: landmark.trim() || undefined,
          city: currentPincodeInfo.locationName.split(" ")[0],
          district: currentPincodeInfo.district,
          pincode: currentPincodeInfo.pincode,
          state: "Andhra Pradesh",
        },
        deliveryDate: effectiveDeliveryDate,
        deliverySlot: `${chosenSlot.name} (${chosenSlot.time})`,
        deliveryType: chosenSlot.id.includes("express")
          ? "express_2hr"
          : chosenSlot.id.includes("midnight")
          ? "midnight"
          : "same_day",
        items: [...items],
        subtotal,
        discountAmount: discount,
        couponCode: appliedCoupon?.code,
        deliveryFee,
        totalAmount: total,
        paymentMethod,
        paymentStatus: "paid",
        specialInstructions: specialInstructions.trim() || undefined,
      });

      clearCart();
      setIsProcessingPayment(false);
      setPaymentModalOpen(false);

      // Redirect to Order Confirmation with the new real order ID
      router.push(`/order-confirmation?orderId=${newOrder.orderNumber}`);
    } catch (err) {
      console.error("Order creation failed:", err);
      setIsProcessingPayment(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-gray-50/50 min-h-[70vh] flex items-center justify-center p-6 text-center">
        <div className="max-w-sm rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
          <p className="font-bold text-gray-900">Your cart is empty</p>
          <Link
            href="/shop"
            className="mt-4 block rounded-xl bg-[#F72585] py-2.5 text-xs font-bold text-white"
          >
            Explore Gifts Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Secure Checkout
        </h1>
        <p className="text-xs text-gray-500 mb-6">
          Provide delivery destination in Repalle / Coastal AP & complete payment via Razorpay
        </p>

        {formError && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-4 text-xs font-bold text-red-700">
            {formError}
          </div>
        )}

        <form onSubmit={handleStartPayment}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Address & Delivery Scheduling (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Delivery Address Section */}
              <div className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <MapPin className="h-5 w-5 text-[#F72585]" />
                  <h2 className="text-base font-extrabold text-gray-900">
                    1. Recipient & Delivery Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      Recipient Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Harika Chowdary"
                      value={fullName}
                      onChange={e => {
                        setFullName(e.target.value);
                        if (fieldErrors.fullName) setFieldErrors(prev => ({ ...prev, fullName: "" }));
                      }}
                      required
                      className={`w-full rounded-xl border bg-gray-50 p-2.5 text-xs font-medium focus:bg-white focus:outline-none min-h-[44px] ${
                        fieldErrors.fullName ? "border-rose-500 focus:border-rose-600" : "border-gray-200 focus:border-[#F72585]"
                      }`}
                    />
                    {fieldErrors.fullName && (
                      <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      Mobile Number (For Delivery Rider) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile (e.g. 9848012345)"
                      value={phone}
                      onChange={e => {
                        setPhone(e.target.value);
                        if (fieldErrors.phone) setFieldErrors(prev => ({ ...prev, phone: "" }));
                      }}
                      required
                      className={`w-full rounded-xl border bg-gray-50 p-2.5 text-xs font-medium focus:bg-white focus:outline-none min-h-[44px] ${
                        fieldErrors.phone ? "border-rose-500 focus:border-rose-600" : "border-gray-200 focus:border-[#F72585]"
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Email Address (For Order Receipt)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. recipient@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs font-medium focus:border-[#F72585] focus:bg-white focus:outline-none min-h-[44px]"
                  />
                </div>

                {/* Coastal AP Service Area Select */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Select Coastal AP Delivery Area / Pincode <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedPincode}
                    onChange={e => handlePincodeChange(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs font-semibold text-gray-900 focus:border-[#F72585] focus:bg-white focus:outline-none min-h-[44px]"
                  >
                    {SERVICEABLE_PINCODES.map(loc => (
                      <option key={loc.pincode} value={loc.pincode}>
                        {loc.pincode} — {loc.locationName} (District: {loc.district})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    House / Flat No., Building, Street Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Door 4-12, Main Bazaar Road"
                    value={streetAddress}
                    onChange={e => {
                      setStreetAddress(e.target.value);
                      if (fieldErrors.streetAddress) setFieldErrors(prev => ({ ...prev, streetAddress: "" }));
                    }}
                    required
                    className={`w-full rounded-xl border bg-gray-50 p-2.5 text-xs font-medium focus:bg-white focus:outline-none min-h-[44px] ${
                      fieldErrors.streetAddress ? "border-rose-500 focus:border-rose-600" : "border-gray-200 focus:border-[#F72585]"
                    }`}
                  />
                  {fieldErrors.streetAddress && (
                    <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.streetAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      Prominent Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Clock Tower / Opp. SBI"
                      value={landmark}
                      onChange={e => setLandmark(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs font-medium focus:border-[#F72585] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Andhra Pradesh"
                      className="w-full rounded-xl border border-gray-200 bg-gray-100 p-2.5 text-xs font-medium text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Timing Section */}
              <div className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <Calendar className="h-5 w-5 text-[#C9A227]" />
                  <h2 className="text-base font-extrabold text-gray-900">
                    2. Delivery Date & Time Slot
                  </h2>
                </div>

                {/* Delivery Date Pills */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-2">
                    Delivery Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryDateOption("today")}
                      className={`rounded-xl p-2.5 text-center text-xs font-bold border transition ${
                        deliveryDateOption === "today"
                          ? "border-[#F72585] bg-pink-50 text-[#F72585]"
                          : "border-gray-200 bg-white text-gray-700"
                      }`}
                    >
                      ⚡ Today (Same-Day)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryDateOption("tomorrow")}
                      className={`rounded-xl p-2.5 text-center text-xs font-bold border transition ${
                        deliveryDateOption === "tomorrow"
                          ? "border-[#F72585] bg-pink-50 text-[#F72585]"
                          : "border-gray-200 bg-white text-gray-700"
                      }`}
                    >
                      Tomorrow
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryDateOption("custom")}
                      className={`rounded-xl p-2.5 text-center text-xs font-bold border transition ${
                        deliveryDateOption === "custom"
                          ? "border-[#F72585] bg-pink-50 text-[#F72585]"
                          : "border-gray-200 bg-white text-gray-700"
                      }`}
                    >
                      Select Date
                    </button>
                  </div>

                  {deliveryDateOption === "custom" && (
                    <div className="mt-2">
                      <input
                        type="date"
                        min={todayStr}
                        value={customDate}
                        onChange={e => setCustomDate(e.target.value)}
                        className="rounded-xl border border-gray-200 p-2 text-xs font-semibold"
                      />
                    </div>
                  )}
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-2">
                    Preferred Time Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {DELIVERY_SLOTS.map(slot => (
                      <label
                        key={slot.id}
                        className={`flex items-center justify-between rounded-xl p-3 border cursor-pointer transition ${
                          selectedSlotId === slot.id
                            ? "border-[#F72585] bg-pink-50/50 shadow-2xs"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="delivery-slot"
                            checked={selectedSlotId === slot.id}
                            onChange={() => setSelectedSlotId(slot.id)}
                            className="text-[#F72585] focus:ring-[#F72585]"
                          />
                          <div>
                            <span className="block text-xs font-bold text-gray-900">
                              {slot.name}
                            </span>
                            <span className="text-[10px] text-gray-500">{slot.time}</span>
                          </div>
                        </div>
                        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-700">
                          {slot.surcharge === 0 ? "FREE" : `+₹${slot.surcharge}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special instructions */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Don't call bell, call on mobile / Leave at door / Surprise gift"
                    value={specialInstructions}
                    onChange={e => setSpecialInstructions(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-[#F72585] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-base font-extrabold text-gray-900">
                    3. Payment Method (Razorpay)
                  </h2>
                </div>

                <div className="space-y-2">
                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                      paymentMethod === "razorpay_upi"
                        ? "border-emerald-500 bg-emerald-50/40 font-bold"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pay-method"
                        checked={paymentMethod === "razorpay_upi"}
                        onChange={() => setPaymentMethod("razorpay_upi")}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-emerald-600" />
                        <span className="text-xs text-gray-900">
                          Razorpay UPI (Google Pay, PhonePe, Paytm, QR Code)
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      FASTEST
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                      paymentMethod === "razorpay_card"
                        ? "border-emerald-500 bg-emerald-50/40 font-bold"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pay-method"
                        checked={paymentMethod === "razorpay_card"}
                        onChange={() => setPaymentMethod("razorpay_card")}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-blue-600" />
                        <span className="text-xs text-gray-900">
                          Debit / Credit Cards (Visa, Mastercard, RuPay)
                        </span>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                      paymentMethod === "razorpay_netbanking"
                        ? "border-emerald-500 bg-emerald-50/40 font-bold"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pay-method"
                        checked={paymentMethod === "razorpay_netbanking"}
                        onChange={() => setPaymentMethod("razorpay_netbanking")}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-purple-600" />
                        <span className="text-xs text-gray-900">
                          NetBanking (SBI, HDFC, ICICI, Andhra Bank)
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider pb-3 border-b border-gray-100">
                  Order Summary ({items.length} {items.length === 1 ? "Gift" : "Gifts"})
                </h3>

                {/* Items preview list */}
                <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-gray-50">
                  {items.map(item => (
                    <div key={item.cartItemId} className="pt-2 flex gap-3 items-center">
                      <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <h4 className="font-bold text-gray-900 truncate">
                          {item.product.title}
                        </h4>
                        <p className="text-gray-500 text-[11px]">
                          Qty: {item.quantity} × ₹{item.unitPrice}
                        </p>
                        {item.personalisation?.engravingText && (
                          <p className="text-[10px] text-[#F72585] truncate font-medium">
                            Engraving: &quot;{item.personalisation.engravingText}&quot;
                          </p>
                        )}
                      </div>
                      <span className="font-extrabold text-xs text-gray-900">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Calculation */}
                <div className="border-t border-gray-100 pt-4 space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Coupon Savings ({appliedCoupon?.code})</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee ({currentPincodeInfo.locationName})</span>
                    <span className="font-bold text-gray-900">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-3 text-lg font-black text-gray-900">
                    <span>Total Amount</span>
                    <span className="text-[#F72585]">₹{total}</span>
                  </div>
                </div>

                {/* Pay Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#F72585] py-4 text-sm font-extrabold text-white shadow-xl hover:bg-[#d6136c] transition active:scale-[0.98]"
                  >
                    <Lock className="h-4 w-4" />
                    Pay ₹{total} with Razorpay
                  </button>
                  <p className="text-[11px] text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    256-Bit SSL Encrypted • Instant WhatsApp Confirmation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Razorpay Interactive Modal Simulation / Checkout */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => !isProcessingPayment && setPaymentModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#0C2340] flex items-center justify-center text-white font-extrabold text-xs">
                  R
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900 leading-none">
                    Razorpay Secure Checkout
                  </h3>
                  <span className="text-[10px] text-gray-500">
                    Creative Paradise Gift Store • Repalle
                  </span>
                </div>
              </div>
              <span className="text-base font-black text-[#F72585]">₹{total}</span>
            </div>

            {/* Modal Body */}
            <div className="py-6 space-y-4">
              <div className="rounded-2xl bg-gray-50 p-4 border border-gray-200/80 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Recipient:</span>
                  <span className="font-bold text-gray-900">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Area:</span>
                  <span className="font-bold text-gray-900">
                    {currentPincodeInfo.locationName} ({selectedPincode})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Slot:</span>
                  <span className="font-bold text-emerald-700">
                    {effectiveDeliveryDate} • {chosenSlot.name}
                  </span>
                </div>
              </div>

              {paymentFailed ? (
                <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-center space-y-3 animate-in fade-in">
                  <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mx-auto">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Payment Authorization Failed</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      The issuing bank or UPI application could not complete the authorization. Your cart and custom gift configurations remain completely safe.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentFailed(false);
                        handleCompleteRazorpayPayment();
                      }}
                      className="flex-1 rounded-xl bg-[#F72585] py-3 text-xs font-bold text-white hover:bg-[#d6136c] transition min-h-[44px]"
                    >
                      Retry Payment
                    </button>
                    <a
                      href={`https://wa.me/919177003905?text=${encodeURIComponent(
                        `Hi Creative Paradise! My checkout of ₹${total} couldn't complete. Can you help me finalize the order for ${fullName}?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-xl border border-emerald-300 bg-emerald-50 py-3 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition flex items-center justify-center gap-1 min-h-[44px]"
                    >
                      Order on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs text-gray-600 text-center">
                    Click below to simulate real-time Razorpay payment verification.
                  </p>

                  <button
                    type="button"
                    disabled={isProcessingPayment}
                    onClick={handleCompleteRazorpayPayment}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-extrabold text-white shadow-lg hover:bg-emerald-700 transition disabled:opacity-50 min-h-[44px]"
                  >
                    {isProcessingPayment ? (
                      <>
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Authorizing Payment...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        Simulate Successful Razorpay Payment
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isProcessingPayment}
                    onClick={() => setPaymentFailed(true)}
                    className="w-full text-center text-[11px] text-gray-400 hover:text-rose-500 underline transition pt-1"
                  >
                    Simulate Payment Decline / Failure (Test Retry Flow)
                  </button>
                </>
              )}
            </div>

            <div className="text-center pt-2 border-t border-gray-100">
              <span className="text-[10px] text-gray-400 font-medium">
                PCI-DSS Level 1 Compliant • Razorpay Test & Live Ready
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
