"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

export interface AdminInquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  occasion: string;
  quantity: string;
  message: string;
  status: "New" | "Contacted" | "Quoted" | "Closed";
  createdAt: string;
}

const INITIAL_SAMPLE_INQUIRIES: AdminInquiry[] = [
  {
    id: "corp-sample-1",
    companyName: "Amaravati Tech Solutions",
    contactPerson: "Kavitha Reddy",
    phone: "9848012345",
    email: "kavitha@amaravatitech.com",
    occasion: "Diwali & Festive Corporate Gifting",
    quantity: "100 - 250 units",
    message: "Need gold-embossed dry fruit boxes with company logo printed on silk ribbon. Required delivery in Vijayawada by Oct 20.",
    status: "New",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "corp-sample-2",
    companyName: "Coastal Logistics Hub",
    contactPerson: "Suresh Varma",
    phone: "9177003905",
    email: "suresh.varma@coastallogistics.in",
    occasion: "Employee Appreciation / Onboarding",
    quantity: "50 - 100 units",
    message: "Custom matte temperature bottles with employee names laser engraved and leather diaries.",
    status: "Contacted",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

export default function AdminCorporateInquiriesPage() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/corporate-inquiries");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.inquiries) && data.inquiries.length > 0) {
          setInquiries(data.inquiries);
          setIsLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Could not fetch remote corporate inquiries:", err);
    }

    // Check local storage backup
    try {
      const stored = localStorage.getItem("cp_corporate_inquiries");
      if (stored) {
        setInquiries(JSON.parse(stored));
      } else {
        setInquiries(INITIAL_SAMPLE_INQUIRIES);
        localStorage.setItem("cp_corporate_inquiries", JSON.stringify(INITIAL_SAMPLE_INQUIRIES));
      }
    } catch (_) {
      setInquiries(INITIAL_SAMPLE_INQUIRIES);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: "New" | "Contacted" | "Quoted" | "Closed") => {
    setUpdatingId(id);
    try {
      await fetch("/api/corporate-inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (err) {
      console.warn("Status update API error:", err);
    }

    const updated = inquiries.map(inq => (inq.id === id ? { ...inq, status: newStatus } : inq));
    setInquiries(updated);
    try {
      localStorage.setItem("cp_corporate_inquiries", JSON.stringify(updated));
    } catch (_) {}

    setUpdatingId(null);
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch =
      inq.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Metrics counts
  const totalCount = inquiries.length;
  const newCount = inquiries.filter(i => i.status === "New").length;
  const inProgressCount = inquiries.filter(i => i.status === "Contacted" || i.status === "Quoted").length;
  const closedCount = inquiries.filter(i => i.status === "Closed").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return "bg-rose-500/15 text-rose-400 border-rose-500/30";
      case "Contacted":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "Quoted":
        return "bg-blue-500/15 text-blue-400 border-blue-500/30";
      case "Closed":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-gray-800 text-gray-400 border-gray-700";
    }
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider block">
            SALES & CORPORATE LEADS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3 mt-1">
            <Briefcase className="h-7 w-7 text-[#F72585]" />
            <span>Corporate Inquiries</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage custom bulk gifting leads, follow up with corporate buyers via WhatsApp, and track deal closures.
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 border border-gray-800 transition self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-[#121520] border border-gray-800 p-5 space-y-1">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Leads</div>
          <div className="text-2xl font-black text-white">{totalCount}</div>
          <div className="text-[10px] text-gray-500">All submitted inquiries</div>
        </div>

        <div className="rounded-2xl bg-[#121520] border border-rose-900/30 p-5 space-y-1">
          <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center justify-between">
            <span>Action Required</span>
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
          </div>
          <div className="text-2xl font-black text-rose-400">{newCount} New</div>
          <div className="text-[10px] text-gray-400">Needs phone/WhatsApp call</div>
        </div>

        <div className="rounded-2xl bg-[#121520] border border-amber-900/30 p-5 space-y-1">
          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">In Negotiation</div>
          <div className="text-2xl font-black text-amber-400">{inProgressCount}</div>
          <div className="text-[10px] text-gray-400">Contacted / Quoted</div>
        </div>

        <div className="rounded-2xl bg-[#121520] border border-emerald-900/30 p-5 space-y-1">
          <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Deals Closed</div>
          <div className="text-2xl font-black text-emerald-400">{closedCount}</div>
          <div className="text-[10px] text-gray-400">Successfully fulfilled</div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121520] p-4 rounded-2xl border border-gray-800">
        {/* Status filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["All", "New", "Contacted", "Quoted", "Closed"].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                statusFilter === status
                  ? "bg-[#F72585] text-white shadow-xs"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search company, contact, or phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-800 bg-[#0A0A0A] pl-9.5 pr-4 py-2 text-xs text-white placeholder:text-gray-600 focus:border-[#F72585] focus:outline-none"
          />
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="rounded-2xl bg-[#121520] border border-gray-800 p-12 text-center text-gray-400 text-xs">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-[#F72585] border-r-transparent mb-2" />
            <p>Loading corporate inquiries...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="rounded-2xl bg-[#121520] border border-gray-800 p-12 text-center text-gray-400 text-xs space-y-2">
            <Briefcase className="h-8 w-8 text-gray-600 mx-auto mb-2" />
            <p className="font-bold text-gray-300">No corporate inquiries match this filter</p>
            <p className="text-[11px]">When clients submit the bulk gifting form, inquiries will appear here automatically.</p>
          </div>
        ) : (
          filteredInquiries.map(inq => {
            const cleanPhone = inq.phone.replace(/\D/g, "");
            const whatsappText = encodeURIComponent(
              `Hi ${inq.contactPerson}, thank you for your interest in Creative Paradise Bulk & Corporate Gifting for ${inq.companyName} (${inq.occasion})! How can I assist with your quotation and digital sample proofs?`
            );

            return (
              <div
                key={inq.id}
                className="rounded-2xl bg-[#121520] border border-gray-800 p-5 sm:p-6 shadow-xs hover:border-gray-700 transition space-y-4"
              >
                {/* Header bar of inquiry */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#1E2233] to-[#F72585] flex items-center justify-center text-white font-bold shrink-0">
                      <Building2 className="h-5 w-5 text-[#C9A227]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-white">{inq.companyName}</h3>
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase ${getStatusBadge(
                            inq.status
                          )}`}
                        >
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Contact: <strong className="text-gray-200">{inq.contactPerson}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Status Dropdown selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-400 font-semibold">Status:</span>
                    <select
                      value={inq.status}
                      disabled={updatingId === inq.id}
                      onChange={e => handleStatusChange(inq.id, e.target.value as any)}
                      className="rounded-xl border border-gray-700 bg-[#0A0A0A] px-3 py-1.5 text-xs font-bold text-white focus:border-[#F72585] focus:outline-none cursor-pointer"
                    >
                      <option value="New">🔴 New (Needs Follow-up)</option>
                      <option value="Contacted">🟡 Contacted</option>
                      <option value="Quoted">🔵 Quoted (Proposal Sent)</option>
                      <option value="Closed">🟢 Closed (Deal Won)</option>
                    </select>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-gray-800/80">
                    <div className="text-[10px] uppercase font-bold text-[#C9A227]">Occasion / Purpose</div>
                    <div className="font-semibold text-gray-200 mt-0.5">{inq.occasion}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-gray-800/80">
                    <div className="text-[10px] uppercase font-bold text-[#C9A227]">Estimated Quantity</div>
                    <div className="font-semibold text-gray-200 mt-0.5">{inq.quantity}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-gray-800/80">
                    <div className="text-[10px] uppercase font-bold text-[#C9A227]">Phone & WhatsApp</div>
                    <div className="font-semibold text-gray-200 mt-0.5 flex items-center gap-1">
                      <Phone className="h-3 w-3 text-emerald-400" />
                      <span>{inq.phone}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-gray-800/80">
                    <div className="text-[10px] uppercase font-bold text-[#C9A227]">Submitted On</div>
                    <div className="font-semibold text-gray-200 mt-0.5 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span>
                        {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Custom message if provided */}
                {inq.message && (
                  <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-gray-800 text-xs text-gray-300">
                    <span className="font-bold text-gray-400 block text-[10px] uppercase tracking-wider mb-1">
                      Client Customization Notes:
                    </span>
                    &quot;{inq.message}&quot;
                  </div>
                )}

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-[11px] text-gray-500">
                    Email: <a href={`mailto:${inq.email}`} className="text-pink-400 hover:underline">{inq.email}</a>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${cleanPhone}`}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-gray-700 transition flex items-center gap-1.5"
                    >
                      <Phone className="h-3.5 w-3.5 text-blue-400" />
                      <span>Call Client</span>
                    </a>

                    <a
                      href={`https://wa.me/91${cleanPhone}?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Open WhatsApp Chat</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
