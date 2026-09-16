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
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // If on admin login page, don't wrap with admin navigation
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Exact navigation items matching the reference image
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Gift Builder", href: "/admin/gift-builder", icon: Wand2 },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

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
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                    alt="Sarah Jenkins"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white truncate">Sarah Jenkins</div>
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

      {/* Desktop Sidebar (≥ 768px): Exact Match to Image 2 */}
      <aside className="hidden md:flex w-64 bg-[#181C28] p-5 shrink-0 flex-col justify-between sticky top-0 h-screen text-white select-none">
        <div className="space-y-6">
          {/* Top Brand Header matching Image 2 */}
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

          {/* Navigation Items with Pink Active Dot matching Image 2 */}
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
                  {/* Pink indicator dot on active state matching Image 2 */}
                  {isActive && <div className="h-1.5 w-1.5 rounded-full bg-[#F72585]" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Card: Sarah Jenkins matching Image 2 */}
        <div className="p-3 rounded-2xl bg-[#212638] flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative h-9 w-9 rounded-full overflow-hidden shrink-0 border border-gray-600">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                alt="Sarah Jenkins"
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">Sarah Jenkins</div>
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
      <main className="flex-1 bg-[#F8FAFC] min-w-0 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}
