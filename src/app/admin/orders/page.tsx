"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Order, OrderStatus } from "@/types";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery);

    if (!matchesSearch) return false;

    if (statusFilter === "all") return true;
    if (statusFilter === "pending")
      return order.orderStatus === "placed" || order.orderStatus === "processing";
    if (statusFilter === "today") {
      const today = new Date().toISOString().split("T")[0];
      return order.deliveryDate === today;
    }
    return order.orderStatus === statusFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider block">
            DISPATCH & LOGISTICS
          </span>
          <h1 className="text-2xl font-black text-white">Customer Orders ({orders.length})</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Monitor incoming orders, assign dispatch riders, and update live tracking.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {[
            { id: "all", label: "All Orders" },
            { id: "today", label: "Today's Deliveries" },
            { id: "pending", label: "Pending Crafting" },
            { id: "shipped", label: "Shipped" },
            { id: "delivered", label: "Delivered" },
            { id: "cancelled", label: "Cancelled" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition ${
                statusFilter === tab.id
                  ? "bg-[#F72585] text-white shadow-xs"
                  : "bg-[#121520] text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search order ID, phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-800 bg-[#121520] py-2 pl-9 pr-3 text-xs text-white placeholder:text-gray-500 focus:border-[#F72585] focus:outline-none"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-[#121520] border border-gray-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="text-gray-400 uppercase tracking-wider text-[10px] bg-white/5 border-b border-gray-800">
              <tr>
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Delivery Slot & Area</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Status & Live Sync</th>
                <th className="py-3.5 px-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-white block">
                      {order.orderNumber}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white block">{order.customerName}</span>
                    <span className="text-[11px] text-gray-400">{order.customerPhone}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-emerald-400 block">
                      {order.deliveryDate}
                    </span>
                    <span className="text-gray-400 text-[11px]">
                      {order.shippingAddress.area} ({order.shippingAddress.pincode})
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-[#F72585]">
                    ₹{order.totalAmount}
                    <span className="block text-[10px] text-gray-500 font-normal">
                      {order.paymentMethod.replace("_", " ").toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={order.orderStatus}
                      onChange={e =>
                        updateOrderStatus(
                          order.id,
                          e.target.value as OrderStatus,
                          `Delivery status updated to ${e.target.value} by Repalle Hub`
                        )
                      }
                      className="rounded-lg bg-[#0A0A0A] border border-gray-700 px-2.5 py-1 text-xs font-bold text-white focus:border-[#F72585] focus:outline-none"
                    >
                      <option value="placed">1. Placed</option>
                      <option value="processing">2. Processing & Crafting</option>
                      <option value="shipped">3. Shipped & Inspected</option>
                      <option value="out_for_delivery">4. Out For Delivery</option>
                      <option value="delivered">5. Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <ShoppingBag className="h-10 w-10 text-gray-600 mx-auto mb-3 opacity-60" />
                    <p className="text-sm font-bold text-gray-300">No customer orders found</p>
                    <p className="text-xs text-gray-500 mt-1">
                      No orders match the current filter or search criteria.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                      }}
                      className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition min-h-[44px]"
                    >
                      View All Orders
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-3xl bg-[#121520] border border-gray-800 p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div>
                <span className="text-[10px] font-bold text-[#C9A227] uppercase tracking-wider block">
                  ORDER SPECIFICATIONS
                </span>
                <h2 className="text-lg font-black text-white">{selectedOrder.orderNumber}</h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="rounded-2xl bg-[#0A0A0A] p-4 border border-gray-800 space-y-1 text-xs">
              <span className="font-bold text-gray-400 block mb-1">Customer & Delivery:</span>
              <p className="font-bold text-white">{selectedOrder.customerName} ({selectedOrder.customerPhone})</p>
              <p className="text-gray-300">{selectedOrder.shippingAddress.street}</p>
              <p className="text-gray-300">
                {selectedOrder.shippingAddress.area}, {selectedOrder.shippingAddress.city} — {selectedOrder.shippingAddress.pincode}
              </p>
              <p className="text-emerald-400 font-semibold pt-1">
                Slot: {selectedOrder.deliveryDate} • {selectedOrder.deliverySlot}
              </p>
              {selectedOrder.specialInstructions && (
                <p className="text-pink-300 italic">
                  Note: &quot;{selectedOrder.specialInstructions}&quot;
                </p>
              )}
            </div>

            {/* Items */}
            <div>
              <span className="text-xs font-bold text-gray-400 block mb-2">Purchased Gifts:</span>
              <div className="divide-y divide-gray-800/80 space-y-2">
                {selectedOrder.items.map(item => (
                  <div key={item.cartItemId} className="pt-2 flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <h4 className="font-bold text-white truncate">{item.product.title}</h4>
                      <p className="text-gray-400 text-[11px]">
                        Qty: {item.quantity} × ₹{item.unitPrice}
                      </p>
                      {item.personalisation?.engravingText && (
                        <p className="text-[#F72585] text-[11px] font-medium">
                          Engraving: &quot;{item.personalisation.engravingText}&quot;
                        </p>
                      )}
                    </div>
                    <span className="font-bold text-xs text-white">
                      ₹{item.unitPrice * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800 flex justify-between items-center text-xs">
              <span className="text-gray-400">Total Order Amount:</span>
              <span className="text-lg font-black text-[#F72585]">
                ₹{selectedOrder.totalAmount}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
