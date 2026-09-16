"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Bell,
  Briefcase,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, logout } = useAuth();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // If on admin login page, don't wrap with admin navigation
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products Catalog", href: "/admin/products", icon: Package },
    { label: "Orders & Delivery", href: "/admin/orders", icon: ShoppingBag },
    { label: "Corporate Inquiries", href: "/admin/corporate-inquiries", icon: Briefcase },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Push Broadcast", href: "/admin/notifications", icon: Bell },
  ];

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="w-full min-w-0 bg-[#0A0A0A] min-h-screen text-white flex flex-col md:flex-row">
      {/* Mobile / Tablet Sticky Header (< 768px) with toggle button */}
      <header className="flex md:hidden items-center justify-between bg-[#121520] border-b border-gray-800 px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="flex items-center justify-center h-11 w-11 rounded-xl bg-white/5 text-gray-300 hover:text-white border border-gray-800 focus:outline-none"
            aria-label="Open Admin Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#F72585] to-[#C9A227] p-0.5 flex items-center justify-center font-black text-xs text-[#F72585]">
              <div className="h-full w-full bg-[#0A0A0A] rounded-[6px] flex items-center justify-center">
                CP
              </div>
            </div>
            <span className="font-extrabold text-xs text-white">Admin Hub</span>
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 bg-white/5 border border-gray-800 min-h-[44px]"
        >
          <span>Storefront</span>
          <ExternalLink className="h-3 w-3 text-pink-400" />
        </Link>
      </header>

      {/* Mobile / Tablet Toggleable Slide-out Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
          <div className="relative z-10 w-72 bg-[#121520] border-r border-gray-800 h-full p-5 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#F72585] to-[#C9A227] p-0.5 flex items-center justify-center font-black text-xs text-[#F72585]">
                    <div className="h-full w-full bg-[#0A0A0A] rounded-[8px] flex items-center justify-center">
                      CP
                    </div>
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-white block leading-none">
                      Repalle Admin
                    </span>
                    <span className="text-[10px] font-semibold text-[#C9A227] uppercase tracking-wider">
                      Control Hub
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex items-center justify-center h-11 w-11 rounded-xl text-gray-400 hover:text-white"
                  aria-label="Close Admin Menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links with 44px+ tap targets */}
              <nav className="space-y-2">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileDrawerOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition min-h-[44px] ${
                        isActive
                          ? "bg-[#F72585] text-white shadow-md shadow-pink-900/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-gray-800 space-y-2 mt-6">
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold text-gray-300 bg-white/5 hover:bg-white/10 transition min-h-[44px]"
              >
                <span>Live Storefront</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition min-h-[44px]"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (≥ 768px): Fixed sticky layout */}
      <aside className="hidden md:flex w-64 bg-[#121520] border-r border-gray-800 p-5 shrink-0 flex-col justify-between sticky top-0 h-screen">
        <div className="space-y-6">
          {/* Admin Brand */}
          <div className="flex items-center gap-3 pb-5 border-b border-gray-800">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#F72585] to-[#C9A227] p-0.5 flex items-center justify-center">
              <div className="h-full w-full bg-[#0A0A0A] rounded-[10px] flex items-center justify-center font-black text-[#F72585]">
                CP
              </div>
            </div>
            <div>
              <span className="font-extrabold text-sm text-white block leading-none">
                Repalle Admin
              </span>
              <span className="text-[10px] font-semibold text-[#C9A227] uppercase tracking-wider">
                Control Hub
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? "bg-[#F72585] text-white shadow-md shadow-pink-900/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-gray-800 space-y-2 mt-6">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-300 bg-white/5 hover:bg-white/10 transition"
          >
            <span>Live Storefront</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#0D1017] min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
