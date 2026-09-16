"use client";

import React, { useState } from "react";
import { Users, Search, Phone, Mail, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function AdminCustomersPage() {
  const { customers, orders } = useStore();
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider block">
            CUSTOMER CRM
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Registered Customers ({customers.length})
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Customer directory with order counts, total lifetime spend, and contact details.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customer by name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full min-h-[44px] rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none shadow-2xs"
          />
        </div>
      </div>

      <div className="rounded-3xl bg-white border border-gray-150 overflow-hidden shadow-2xs">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-[#F72585] mb-3">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">No customers found</h3>
            <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
              {search
                ? `No registered customers match "${search}". Try searching by a different name, phone, or email.`
                : "No customer records are currently available."}
            </p>
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition inline-flex items-center justify-center cursor-pointer"
              >
                Clear Search Filter
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-gray-400 uppercase tracking-wider text-[10px] bg-gray-50/50 border-b border-gray-100 font-bold">
                <tr>
                  <th className="py-3.5 px-4">Customer Name</th>
                  <th className="py-3.5 px-4">Phone / WhatsApp</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Total Orders</th>
                  <th className="py-3.5 px-4">Lifetime Spend</th>
                  <th className="py-3.5 px-4">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(cust => (
                  <tr key={cust.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-pink-50 text-[#F72585] border border-pink-100 flex items-center justify-center font-bold">
                          {cust.name.charAt(0)}
                        </div>
                        <span>{cust.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-emerald-600 font-semibold">
                      <a
                        href={`https://wa.me/91${cust.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline inline-flex items-center gap-1.5 min-h-[44px] py-2"
                      >
                        <Phone className="h-3.5 w-3.5" /> +91 {cust.phone}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">{cust.email}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-full text-[10px]">
                        <ShoppingBag className="h-3 w-3 text-pink-500" />
                        {cust.totalOrders} Orders
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-black text-gray-900">
                      ₹{cust.totalSpend.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-gray-400">
                      {cust.joinedDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
