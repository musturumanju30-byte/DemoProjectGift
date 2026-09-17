"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Wand2,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Gift,
  ExternalLink,
  Lock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, isLoading, logout } = useAuth();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // If on admin login page, don't wrap with admin navigation or blocking gate
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // 1. Loading screen during session and role verification
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#181C28] flex flex-col items-center justify-center p-6 text-white font-sans">
        <div className="h-10 w-10 rounded-full border-3 border-[#F72585] border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-wide">Verifying Admin Authorization...</p>
        <p className="text-xs text-gray-400 mt-1">Checking database security policies</p>
      </div>
    );
  }

  // 2. Strict Role-Based Gatekeeper: Block unauthorized access
  if (!user || !isAdmin) {
    return (
      <div className="w-full min-h-screen bg-[#0E131F] flex flex-col items-center justify-center p-6 text-white font-sans">
        <div className="max-w-md w-full bg-[#181C28] border border-gray-800 rounded-3xl p-8 text-center shadow-2xl space-y-4">
          <div className="h-14 w-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <Lock className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Administrator Access Required
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            This internal SaaS terminal is strictly reserved for authenticated Creative Paradise store managers. Your current session does not possess verified administrator rights.
          </p>
          <div className="pt-3 flex flex-col gap-2.5">
            <Link
              href="/admin/login"
              className="w-full py-3 px-4 rounded-xl bg-[#F72585] hover:bg-[#d6136c] text-white text-xs font-bold transition flex items-center justify-center shadow-md shadow-pink-500/25"
            >
              Sign In with Admin Credentials
            </Link>
            <Link
              href="/"
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition flex items-center justify-center border border-gray-800"
            >
              Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Exact navigation items matching the admin specification
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Gift Builder", href: "/admin/gift-builder", icon: Wand2 },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  const adminDisplayName = user?.name || "Store Administrator";
  const adminDisplayAvatar =
    user?.avatarUrl ||
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop";

  return (
    <div className="w-full min-w-0 bg-[#F8FAFC] min-h-screen text-gray-900 flex flex-col md:flex-row font-sans antialiased">
      {/* Mobile / Tablet Header (< 768px) with toggle */}
      <header className="flex md:hidden items-center justify-between bg-[#181C28] px-4 py-3 sticky top-0 z-30 text-white shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="flex items-center justify-center h-9 w-9 rounded-xl bg-white/5 text-gray-300 hover:text-white border border-gray-800 focus:outline-none"
            aria-label="Open Admin Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#F72585] flex items-center justify-center text-white shadow-md shadow-pink-600/30">
              <Gift className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-white block leading-tight">Paradise Admin</span>
              <span className="text-[10px] text-gray-400">Creative Paradise Gift</span>
            </div>
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-300 bg-white/5 border border-gray-800 hover:text-white hover:bg-white/10 transition"
        >
          <span>Storefront</span>
          <ExternalLink className="h-3 w-3 text-[#F72585]" />
        </Link>
      </header>

      {/* Mobile / Tablet Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
          <div className="relative z-10 w-72 bg-[#181C28] h-full p-5 flex flex-col justify-between overflow-y-auto text-white">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#F72585] flex items-center justify-center text-white shadow-md shadow-pink-600/30">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white block leading-tight">
                      Paradise Admin
                    </span>
                    <span className="text-[11px] font-normal text-gray-400">
                      Creative Paradise Gift
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                  aria-label="Close Admin Menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileDrawerOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs transition duration-150 ${
                        isActive
                          ? "bg-[#23283B] text-white font-semibold shadow-xs"
                          : "text-gray-400 hover:text-white hover:bg-white/[0.04] font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <div className="h-1.5 w-1.5 rounded-full bg-[#F72585]" />}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom User Card */}
            <div className="p-3 rounded-2xl bg-[#212638] flex items-center justify-between mt-6">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative h-9 w-9 rounded-full overflow-hidden shrink-0 border border-gray-600">
                  <Image
                    src={adminDisplayAvatar}
                    alt={adminDisplayName}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white truncate">{adminDisplayName}</div>
                  <div className="text-[10px] text-gray-400 truncate">Super Admin</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-white rounded-xl transition cursor-pointer"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (≥ 768px) */}
      <aside className="hidden md:flex w-64 bg-[#181C28] p-5 shrink-0 flex-col justify-between sticky top-0 h-screen text-white select-none">
        <div className="space-y-6">
          {/* Top Brand Header */}
          <div className="flex items-center gap-3 pt-1">
            <div className="h-10 w-10 rounded-xl bg-[#F72585] flex items-center justify-center text-white shadow-md shadow-pink-600/30 shrink-0">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-[15px] text-white block leading-tight tracking-tight">
                Paradise Admin
              </span>
              <span className="text-[11px] font-normal text-gray-400 mt-0.5 block">
                Creative Paradise Gift
              </span>
            </div>
          </div>

          {/* Navigation Items with Pink Active Dot */}
          <nav className="space-y-1.5 pt-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition duration-150 ${
                    isActive
                      ? "bg-[#23283B] text-white font-medium shadow-xs"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04] font-medium"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <div className="h-1.5 w-1.5 rounded-full bg-[#F72585]" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Card */}
        <div className="p-3 rounded-2xl bg-[#212638] flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative h-9 w-9 rounded-full overflow-hidden shrink-0 border border-gray-600">
              <Image
                src={adminDisplayAvatar}
                alt={adminDisplayName}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">{adminDisplayName}</div>
              <div className="text-[10px] text-gray-400 font-normal truncate">Super Admin</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg transition cursor-pointer"
            title="Log out of admin"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Main Admin Canvas */}
      <main className="flex-1 bg-[#F8FAFC] min-w-0 w-full overflow-y-auto min-h-screen">
        <div className="w-full min-w-0 px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}
