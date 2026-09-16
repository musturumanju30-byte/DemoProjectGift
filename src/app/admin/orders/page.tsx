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
            DISPATCH &amp; LOGISTICS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Customer Orders ({orders.length})
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor incoming orders, assign dispatch riders, and update live tracking.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
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
              className={`rounded-xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-[#F72585] text-white shadow-2xs"
                  : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search order ID, phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none shadow-2xs"
          />
        </div>
      </div>

      {/* Orders Table Card */}
      <div className="rounded-3xl bg-white border border-gray-150 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-gray-400 uppercase tracking-wider text-[10px] bg-gray-50/50 border-b border-gray-100 font-bold">
              <tr>
                <th className="py-3.5 px-4">Order ID &amp; Date</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Delivery Slot &amp; Area</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Status &amp; Live Sync</th>
                <th className="py-3.5 px-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-xs">
                    No orders match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-gray-900 block">
                        {order.orderNumber}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-gray-900 block">{order.customerName}</span>
                      <span className="text-[11px] text-gray-500">{order.customerPhone}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-emerald-600 block">
                        {order.deliveryDate}
                      </span>
                      <span className="text-gray-500 text-[11px]">
                        {order.shippingAddress.area} ({order.shippingAddress.pincode})
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-black text-gray-900">
                      ₹{order.totalAmount}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={order.orderStatus}
                        onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="rounded-xl border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-bold text-gray-800 focus:border-[#F72585] focus:outline-none cursor-pointer"
                      >
                        <option value="placed">🔴 Placed</option>
                        <option value="processing">🟡 Processing / Crafting</option>
                        <option value="out_for_delivery">🛵 Out for Delivery</option>
                        <option value="delivered">🟢 Delivered</option>
                        <option value="cancelled">⚫ Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-pink-50 hover:text-[#F72585] transition text-gray-500 cursor-pointer"
                        title="View Full Order Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold text-[#C9A227] uppercase">ORDER DOSSIER</span>
                <h3 className="text-lg font-black text-gray-900">{selectedOrder.orderNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div>
                  <span className="text-gray-500 block">Customer Name</span>
                  <strong className="text-gray-900 font-bold text-sm">{selectedOrder.customerName}</strong>
                  <div className="text-gray-600 mt-0.5">{selectedOrder.customerPhone}</div>
                  <div className="text-gray-500 text-[11px]">{selectedOrder.customerEmail}</div>
                </div>
                <div>
                  <span className="text-gray-500 block">Delivery Slot</span>
                  <strong className="text-emerald-700 font-bold text-sm">{selectedOrder.deliveryDate}</strong>
                  <div className="text-gray-700 mt-0.5">{selectedOrder.deliverySlot}</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Delivery Address</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.area},{" "}
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} -{" "}
                  {selectedOrder.shippingAddress.pincode}
                  {selectedOrder.shippingAddress.landmark && (
                    <span className="block text-gray-500 mt-1 italic">
                      Landmark: {selectedOrder.shippingAddress.landmark}
                    </span>
                  )}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Order Items ({selectedOrder.items.length})</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{item.product.title}</p>
                          <p className="text-gray-500 text-[11px]">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right font-black text-gray-900">
                        ₹{item.product.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-gray-500">Payment: {selectedOrder.paymentMethod}</span>
                <span className="text-base font-black text-gray-900">
                  Total: ₹{selectedOrder.totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
