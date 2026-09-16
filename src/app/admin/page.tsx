"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar as CalendarIcon,
  Bell,
  ChevronDown,
  ChevronRight,
  Plus,
  FileText,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState("Oct 1, 2025 - Oct 7, 2025");

  const adminName = user?.name || "Sarah";

  // Static / dynamic sample data matching Image 2 exactly
  const recentOrders = [
    {
      id: "#CP-2894",
      customer: "Jessica Miller",
      items: "Paradise Custom Basket",
      total: "$185.00",
      status: "Delivered",
      statusStyle: "bg-[#E8F8F0] text-[#12B76A]",
    },
    {
      id: "#CP-2893",
      customer: "David K.",
      items: "Luxury Rose Premium Box",
      total: "$120.00",
      status: "Processing",
      statusStyle: "bg-[#EEF4FF] text-[#444CE7]",
    },
    {
      id: "#CP-2892",
      customer: "Helena Smith",
      items: "Sweet Delights Gift Set",
      total: "$65.50",
      status: "Pending",
      statusStyle: "bg-[#FEF6EE] text-[#F79009]",
    },
    {
      id: "#CP-2891",
      customer: "Richard Gable",
      items: "Corporate Welcome Package",
      total: "$420.00",
      status: "Delayed",
      statusStyle: "bg-[#FEF3F2] text-[#F04438]",
    },
  ];

  // Weekly Revenue Bar Chart Data matching Image 2
  const weeklyRevenueData = [
    { day: "Mon", amount: "$12.4k", heightPercent: 54, isPeak: false },
    { day: "Tue", amount: "$15.5k", heightPercent: 72, isPeak: false },
    { day: "Wed", amount: "$9.5k", heightPercent: 42, isPeak: false },
    { day: "Thu", amount: "$18.0k", heightPercent: 82, isPeak: false },
    { day: "Fri", amount: "$21.0k", heightPercent: 96, isPeak: true }, // Peak Friday bar in hot pink
    { day: "Sat", amount: "$14.0k", heightPercent: 64, isPeak: false },
    { day: "Sun", amount: "$16.5k", heightPercent: 76, isPeak: false },
  ];

  // Popular Paradise Gifts matching Image 2
  const popularGifts = [
    {
      id: "gift-1",
      title: "Premium custom basket",
      unitsSold: "142 units sold",
      isVip: true,
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "gift-2",
      title: "Rose Premium Box",
      unitsSold: "98 units sold",
      isVip: false,
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "gift-3",
      title: "Sweet Delights Set",
      unitsSold: "87 units sold",
      isVip: false,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "gift-4",
      title: "Grand Celebration Chest",
      unitsSold: "64 units sold",
      isVip: true,
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=300&auto=format&fit=crop",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Title & Action Controls matching Image 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-normal">
            Welcome back, {adminName}. Here is what is happening today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Selector matching Image 2 */}
          <button
            type="button"
            className="flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-800 shadow-2xs transition cursor-pointer"
          >
            <CalendarIcon className="h-4 w-4 text-gray-600" />
            <span>{dateRange}</span>
            <ChevronDown className="h-3.5 w-3.5 text-gray-500 ml-1" />
          </button>

          {/* Notification Bell Box matching Image 2 */}
          <button
            type="button"
            className="relative h-9 w-9 bg-white border border-gray-200 hover:border-gray-300 rounded-xl flex items-center justify-center text-gray-700 shadow-2xs hover:text-[#F72585] transition cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#F72585]" />
          </button>
        </div>
      </div>

      {/* 2. Top KPI Cards matching Image 2 (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Revenue */}
        <div className="rounded-2xl bg-white border border-gray-200/80 p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Total Revenue</span>
            {/* Green Sparkline Curve */}
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
            $45,820.50
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="font-bold text-emerald-500">↑ +14.2%</span>
            <span className="text-gray-400 font-normal ml-0.5">vs. last week</span>
          </div>
        </div>

        {/* Card 2: Orders Today */}
        <div className="rounded-2xl bg-white border border-gray-200/80 p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Orders Today</span>
            {/* Green Sparkline Curve */}
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
            142
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="font-bold text-emerald-500">↑ +8.4%</span>
            <span className="text-gray-400 font-normal ml-0.5">vs. yesterday</span>
          </div>
        </div>

        {/* Card 3: Active Customers */}
        <div className="rounded-2xl bg-white border border-gray-200/80 p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Active Customers</span>
            {/* Red Sparkline Curve */}
            <svg className="w-12 h-5 text-rose-500" viewBox="0 0 50 20" fill="none">
              <path
                d="M 2 5 C 8 4, 14 8, 20 6 C 26 5, 32 15, 38 12 C 44 10, 46 14, 48 13"
                stroke="#EF4444"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
            3,840
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="font-bold text-red-500">↓ -1.2%</span>
            <span className="text-gray-400 font-normal ml-0.5">vs. last month</span>
          </div>
        </div>

        {/* Card 4: Pending Orders */}
        <div className="rounded-2xl bg-white border border-gray-200/80 p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Pending Orders</span>
            {/* Green Sparkline Curve */}
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
            23
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="font-bold text-emerald-500">↑ 4 to fulfill</span>
            <span className="text-gray-400 font-normal ml-0.5">urgent delivery</span>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Recent Activity & Orders + Weekly Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Card: Recent Activity & Orders matching Image 2 */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-gray-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900">
                Recent Activity &amp; Orders
              </h2>
              <Link
                href="/admin/orders"
                className="text-xs font-semibold text-[#F72585] hover:underline transition"
              >
                View All Orders
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[11px] font-medium text-gray-400">
                  <tr>
                    <th className="pb-3 pr-4 font-normal">Order ID</th>
                    <th className="pb-3 px-3 font-normal">Customer</th>
                    <th className="pb-3 px-3 font-normal">Items</th>
                    <th className="pb-3 px-3 font-normal">Total</th>
                    <th className="pb-3 pl-3 text-center font-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50/60 transition">
                      <td className="py-3.5 pr-4 font-bold text-gray-900">
                        {order.id}
                      </td>
                      <td className="py-3.5 px-3 font-medium text-gray-700">
                        {order.customer}
                      </td>
                      <td className="py-3.5 px-3 text-gray-500 truncate max-w-[170px]">
                        {order.items}
                      </td>
                      <td className="py-3.5 px-3 font-bold text-gray-900">
                        {order.total}
                      </td>
                      <td className="py-3.5 pl-3 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[11px] font-medium ${order.statusStyle}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Card: Weekly Revenue Bar Chart matching Image 2 */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-gray-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Weekly Revenue
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Performance over the last 7 days
                </p>
              </div>

              <div className="text-right">
                <div className="text-base font-bold text-gray-900">$101.4k</div>
              </div>
            </div>

            {/* Weekly Bar Chart with Pink Peak Friday Bar */}
            <div className="h-44 pt-5 pb-1 flex items-end justify-between gap-2 px-1">
              {weeklyRevenueData.map(bar => (
                <div key={bar.day} className="flex-1 flex flex-col items-center h-full justify-end group">
                  {/* Amount label above bar */}
                  <span
                    className={`text-[9px] mb-1 font-medium transition ${
                      bar.isPeak ? "text-[#F72585] font-bold" : "text-gray-400"
                    }`}
                  >
                    {bar.amount}
                  </span>

                  {/* The Bar */}
                  <div
                    className={`w-full max-w-[32px] rounded-t-md rounded-b-none transition-all duration-300 ${
                      bar.isPeak
                        ? "bg-[#F72585] hover:bg-[#d6136c]"
                        : "bg-[#E5E7EB] hover:bg-gray-300"
                    }`}
                    style={{ height: `${bar.heightPercent}%` }}
                  />

                  {/* Day label */}
                  <span
                    className={`text-[11px] mt-2 font-normal ${
                      bar.isPeak ? "text-gray-700 font-medium" : "text-gray-400"
                    }`}
                  >
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Popular Paradise Gifts + Quick Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Card: Popular Paradise Gifts matching Image 2 */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-gray-200/80 p-6 shadow-2xs">
          <h2 className="text-sm font-bold text-gray-900 mb-4">
            Popular Paradise Gifts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popularGifts.map(gift => (
              <div
                key={gift.id}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50/80 border border-gray-150 hover:bg-white transition group"
              >
                <div className="relative h-11 w-11 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                  <Image src={gift.image} alt={gift.title} fill className="object-cover group-hover:scale-105 transition" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-gray-900 truncate">
                      {gift.title}
                    </h3>
                    {gift.isVip && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#FEF0C7] text-[#B54708] border border-[#FEDF89] uppercase tracking-wider shrink-0">
                        VIP
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5 font-normal">
                    {gift.unitsSold}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Quick Operations matching Image 2 */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-gray-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-4">
              Quick Operations
            </h2>

            <div className="space-y-3">
              {/* Action 1: Launch Gift Builder */}
              <Link
                href="/admin/gift-builder"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-200/80 hover:border-gray-300 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#FDF2F8] text-[#F72585] flex items-center justify-center shrink-0">
                    <Plus className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">
                      Launch Gift Builder
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      Instantly craft a new seasonal curated package
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition" />
              </Link>

              {/* Action 2: Generate Daily PDF Report */}
              <button
                type="button"
                onClick={() => alert("Daily Executive PDF Report generated for Creative Paradise.")}
                className="w-full text-left flex items-center justify-between p-3.5 rounded-2xl border border-gray-200/80 hover:border-gray-300 transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#FDF2F8] text-[#F72585] flex items-center justify-center shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">
                      Generate Daily PDF Report
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      Compile order and fulfillment metrics
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
