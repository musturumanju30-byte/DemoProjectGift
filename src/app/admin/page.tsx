"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Clock,
  Plus,
  Bell,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { OrderStatus } from "@/types";

export default function AdminDashboardPage() {
  const { orders, products, customers, updateOrderStatus } = useStore();

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0) + 142000;
  const todayOrders = orders.length;
  const pendingOrders = orders.filter(
    o => o.orderStatus === "placed" || o.orderStatus === "processing" || o.orderStatus === "out_for_delivery"
  ).length;
  const lowStockProducts = products.filter(p => p.stockCount <= 15);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider block">
            REPALLE OPERATIONS DESK
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Store Performance Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="flex items-center gap-1.5 rounded-xl bg-[#F72585] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d6136c] transition"
          >
            <Plus className="h-4 w-4" /> Add New Gift
          </Link>
          <Link
            href="/admin/notifications"
            className="flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition"
          >
            <Bell className="h-4 w-4" /> Send Push
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-[#121520] border border-gray-800 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Total Store Revenue</span>
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-white mt-2 block">
            ₹{totalRevenue.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">
            ↑ +18.4% this week in Repalle
          </span>
        </div>

        <div className="rounded-2xl bg-[#121520] border border-gray-800 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Today&apos;s Orders</span>
            <ShoppingBag className="h-5 w-5 text-[#F72585]" />
          </div>
          <span className="text-2xl font-black text-white mt-2 block">
            {todayOrders} Orders
          </span>
          <span className="text-[11px] text-gray-400 font-semibold mt-1 block">
            Across Repalle & Coastal AP
          </span>
        </div>

        <div className="rounded-2xl bg-[#121520] border border-gray-800 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Pending Deliveries</span>
            <Clock className="h-5 w-5 text-amber-400" />
          </div>
          <span className="text-2xl font-black text-amber-400 mt-2 block">
            {pendingOrders} Active
          </span>
          <span className="text-[11px] text-gray-400 font-semibold mt-1 block">
            Require dispatch today
          </span>
        </div>

        <div className="rounded-2xl bg-[#121520] border border-gray-800 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Low Stock Alerts</span>
            <AlertTriangle className="h-5 w-5 text-rose-400" />
          </div>
          <span className="text-2xl font-black text-rose-400 mt-2 block">
            {lowStockProducts.length} Items
          </span>
          <span className="text-[11px] text-rose-400/80 font-semibold mt-1 block">
            Stock count &le; 15 units
          </span>
        </div>
      </div>

      {/* Recent Orders with Instant Status Update */}
      <div className="rounded-2xl bg-[#121520] border border-gray-800 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
          <h2 className="text-base font-extrabold text-white">Recent Customer Orders</h2>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#F72585] hover:underline"
          >
            View All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="text-gray-400 uppercase tracking-wider text-[10px] bg-white/5 border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Delivery Area</th>
                <th className="py-3 px-4">Slot</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {order.orderNumber}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {order.customerName}
                    <span className="block text-[11px] text-gray-500 font-normal">
                      {order.customerPhone}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {order.shippingAddress.area}, {order.shippingAddress.city}
                  </td>
                  <td className="py-3.5 px-4 text-gray-400">
                    {order.deliverySlot.split("(")[0]}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#F72585]">
                    ₹{order.totalAmount}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={order.orderStatus}
                      onChange={e =>
                        updateOrderStatus(
                          order.id,
                          e.target.value as OrderStatus,
                          `Status updated to ${e.target.value} by admin`
                        )
                      }
                      className="rounded-lg bg-[#0A0A0A] border border-gray-700 px-2.5 py-1 text-xs font-bold text-white focus:border-[#F72585] focus:outline-none"
                    >
                      <option value="placed">Placed</option>
                      <option value="processing">Processing & Crafting</option>
                      <option value="shipped">Shipped</option>
                      <option value="out_for_delivery">Out For Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Warning List */}
      {lowStockProducts.length > 0 && (
        <div className="rounded-2xl bg-[#121520] border border-gray-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="h-5 w-5" />
            <h2 className="text-base font-extrabold text-white">Low Inventory Warning</h2>
          </div>
          <p className="text-xs text-gray-400">
            These gifts have low stock in the Repalle studio. Update stock in the Products catalog.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {lowStockProducts.slice(0, 3).map(p => (
              <div
                key={p.id}
                className="rounded-xl border border-gray-800 bg-[#0A0A0A] p-3 flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-white truncate max-w-[180px]">
                  {p.title}
                </span>
                <span className="font-bold text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-800/40">
                  {p.stockCount} left
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
