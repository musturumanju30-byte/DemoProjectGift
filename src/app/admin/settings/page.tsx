"use client";

import React, { useState } from "react";
import {
  Store,
  Truck,
  CreditCard,
  Bell,
  ShieldCheck,
  Save,
  CheckCircle,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("Creative Paradise Gift");
  const [supportEmail, setSupportEmail] = useState("support@creativeparadise.in");
  const [supportPhone, setSupportPhone] = useState("+91 98480 12345");
  const [expressCutoff, setExpressCutoff] = useState("19:00");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
            Settings &amp; Configuration
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-normal">
            Manage storefront parameters, fulfillment cutoff rules, staff roles, and integrations.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#F72585] hover:bg-[#d6136c] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-pink-500/20 transition cursor-pointer"
          >
            {isSaved ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Changes Saved!</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Store Profile & Delivery Cutoffs */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Store Profile */}
          <div className="rounded-2xl bg-white border border-gray-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="h-9 w-9 rounded-xl bg-pink-50 text-[#F72585] flex items-center justify-center">
                <Store className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">Storefront Information</h2>
                <p className="text-xs text-gray-400">Public entity details displayed on invoices and receipts</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Store Brand Name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={e => setStoreName(e.target.value)}
                  className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 focus:outline-none focus:border-[#F72585]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Support Email</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={e => setSupportEmail(e.target.value)}
                  className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 focus:outline-none focus:border-[#F72585]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">WhatsApp / Phone Support</label>
                <input
                  type="text"
                  value={supportPhone}
                  onChange={e => setSupportPhone(e.target.value)}
                  className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 focus:outline-none focus:border-[#F72585]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Primary Hub Location</label>
                <input
                  type="text"
                  readOnly
                  defaultValue="Repalle Town, Bapatla Dist, AP - 522265"
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Fulfillment & Delivery Thresholds */}
          <div className="rounded-2xl bg-white border border-gray-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="h-9 w-9 rounded-xl bg-pink-50 text-[#F72585] flex items-center justify-center">
                <Truck className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">Delivery &amp; Fulfillment Controls</h2>
                <p className="text-xs text-gray-400">Order cutoff times and local express constraints</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  Same-Day Delivery Cutoff Time
                </label>
                <input
                  type="time"
                  value={expressCutoff}
                  onChange={e => setExpressCutoff(e.target.value)}
                  className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 focus:outline-none focus:border-[#F72585]"
                />
                <p className="text-[10px] text-gray-400 mt-1">Orders after this hour will roll over to next morning</p>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  Midnight Slot Lead Time (Hours)
                </label>
                <input
                  type="number"
                  defaultValue={4}
                  className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 focus:outline-none focus:border-[#F72585]"
                />
                <p className="text-[10px] text-gray-400 mt-1">Requires 4 hours minimum notice for 23:00 - 00:30 slots</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Security & Integrations */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 3: Security & Role */}
          <div className="rounded-2xl bg-white border border-gray-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="h-9 w-9 rounded-xl bg-pink-50 text-[#F72585] flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">Security &amp; Terminal</h2>
                <p className="text-xs text-gray-400">Authenticated staff session</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Active Admin</span>
                <span className="font-bold text-gray-900">Sarah Jenkins</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Role</span>
                <span className="font-bold text-[#F72585]">Super Admin</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Okta SSO Single-Sign-On</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                  Enabled
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Build Version</span>
                <span className="font-mono text-gray-400 text-[11px]">v2.4.9-saas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
