"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState("Oct 1, 2025 - Oct 7, 2025");

  const categoryPerformance = [
    { name: "Luxury Flower Boxes & Blooms", sales: "₹4,28,900", percent: 45, orders: 420 },
    { name: "Handcrafted Gift Hampers", sales: "₹2,64,300", percent: 28, orders: 195 },
    { name: "Designer Cakes & Confectionery", sales: "₹1,52,100", percent: 16, orders: 280 },
    { name: "Personalized Keepsakes & Lamps", sales: "₹1,04,500", percent: 11, orders: 154 },
  ];

  const cityPerformance = [
    { city: "Repalle (Local Express)", share: "48%", revenue: "₹4,55,900", status: "Primary" },
    { city: "Bapatla & Coastal District", share: "22%", revenue: "₹2,08,900", status: "Active" },
    { city: "Vijayawada & Guntur", share: "18%", revenue: "₹1,71,000", status: "Active" },
    { city: "Hyderabad & Pan-Andhra", share: "12%", revenue: "₹1,14,000", status: "Growing" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
            Analytics &amp; Performance
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-normal">
            Storewide revenue telemetry, customer acquisition, and fulfillment performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-800 shadow-2xs transition cursor-pointer"
          >
            <CalendarIcon className="h-4 w-4 text-gray-600" />
            <span>{dateRange}</span>
            <ChevronDown className="h-3.5 w-3.5 text-gray-500 ml-1" />
          </button>

          <button
            type="button"
            onClick={() => alert("Exporting Executive Analytics CSV...")}
            className="flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition cursor-pointer"
          >
            <Download className="h-4 w-4 text-gray-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards matching Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Gross Merchandise Value */}
        <div className="rounded-2xl bg-white border border-gray-200/80 p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Gross Merchandise Value</span>
            <svg className="w-12 h-5 text-emerald-500" viewBox="0 0 50 20" fill="none">
              <path
                d="M 2 15 C 10 14, 18 16, 26 10 C 34 5, 42 7, 48 3"
                stroke="#22C55E"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
            $184,290.00
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="font-bold text-emerald-500">↑ +18.4%</span>
            <span className="text-gray-400 font-normal ml-0.5">vs. prior month</span>
          </div>
        </div>

        {/* Card 2: Average Order Value */}
        <div className="rounded-2xl bg-white border border-gray-200/80 p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Avg. Order Value (AOV)</span>
            <svg className="w-12 h-5 text-emerald-500" viewBox="0 0 50 20" fill="none">
              <path
                d="M 2 15 C 8 13, 14 17, 20 12 C 26 8, 30 14, 38 7 C 42 4, 46 7, 48 4"
                stroke="#22C55E"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
            $84.50
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="font-bold text-emerald-500">↑ +5.2%</span>
            <span className="text-gray-400 font-normal ml-0.5">vs. prior month</span>
          </div>
        </div>

        {/* Card 3: Checkout Conversion */}
        <div className="rounded-2xl bg-white border border-gray-200/80 p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Checkout Conversion</span>
            <svg className="w-12 h-5 text-emerald-500" viewBox="0 0 50 20" fill="none">
              <path
                d="M 2 13 C 8 13, 14 11, 20 14 C 26 16, 32 7, 38 10 C 42 4, 46 6, 48 3"
                stroke="#22C55E"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
            3.82%
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="font-bold text-emerald-500">↑ +0.6%</span>
            <span className="text-gray-400 font-normal ml-0.5">vs. industry avg</span>
          </div>
        </div>

        {/* Card 4: Repeat Customer Rate */}
        <div className="rounded-2xl bg-white border border-gray-200/80 p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Repeat Customer Rate</span>
            <svg className="w-12 h-5 text-emerald-500" viewBox="0 0 50 20" fill="none">
              <path
                d="M 2 15 C 10 14, 18 16, 26 10 C 34 5, 42 7, 48 3"
                stroke="#22C55E"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
            42.6%
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="font-bold text-emerald-500">↑ +2.4%</span>
            <span className="text-gray-400 font-normal ml-0.5">high loyalty index</span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Category Breakdown + Geographic Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Category Breakdown */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-gray-200/80 p-6 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900">
            Revenue by Product Category
          </h2>

          <div className="space-y-4 pt-1">
            {categoryPerformance.map(cat => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-800">{cat.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-medium">{cat.orders} orders</span>
                    <span className="font-bold text-gray-900">{cat.sales}</span>
                    <span className="text-[11px] font-bold text-[#F72585]">{cat.percent}%</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#F72585]"
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Regional Delivery Distribution */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-gray-200/80 p-6 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900">
            Fulfillment Geography
          </h2>

          <div className="divide-y divide-gray-100">
            {cityPerformance.map(c => (
              <div key={c.city} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{c.city}</h4>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {c.share} total volume
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-gray-900">{c.revenue}</div>
                  <span className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-0.5">
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
