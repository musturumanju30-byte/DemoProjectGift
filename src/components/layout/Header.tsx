"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  MapPin,
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  Phone,
  Clock,
  Sparkles,
  Truck,
  Check,
  X,
  Menu,
  Home,
  Bell,
  Briefcase,
  ArrowLeft,
  CalendarClock,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { SERVICEABLE_PINCODES } from "@/data/locations";

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { products, selectedDeliveryPincode, setSelectedDeliveryPincode, wishlist } = useStore();
  const { openCart, itemCount, total } = useCart();
  const { user, logout, openAuthModal } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [remindersCount, setRemindersCount] = useState<number>(0);
  const searchRef = useRef<HTMLDivElement>(null);

  // Do not render customer storefront header in admin panel
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Sync reminders count for logged-in user
  useEffect(() => {
    const fetchCount = async () => {
      if (!user?.id) {
        setRemindersCount(0);
        return;
      }
      try {
        const res = await fetch(`/api/reminders?userId=${encodeURIComponent(user.id)}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.reminders)) {
            setRemindersCount(data.reminders.length);
            return;
          }
        }
      } catch (_) {}

      try {
        const local = localStorage.getItem(`cp_reminders_${user.id}`);
        if (local) setRemindersCount(JSON.parse(local).length);
      } catch (_) {}
    };

    fetchCount();
    const onRemindersUpdated = () => fetchCount();
    window.addEventListener("reminders-updated", onRemindersUpdated);
    return () => window.removeEventListener("reminders-updated", onRemindersUpdated);
  }, [user]);

  // Filter matching products for live search
  const searchResults = searchQuery.trim().length > 1
    ? products.filter(
        p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const currentLocation =
    SERVICEABLE_PINCODES.find(p => p.pincode === selectedDeliveryPincode) ||
    SERVICEABLE_PINCODES[0];

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className={`w-full bg-[#1E2233] text-white py-1.5 sm:py-2 px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 min-h-[36px] sm:min-h-[40px] items-center ${pathname === "/cart" ? "hidden md:flex" : "flex"}`}>
        <div className="w-full max-w-[1700px] mx-auto flex items-center justify-between gap-2 text-[11px] sm:text-xs md:text-[13px] font-medium min-w-0">
          <div className="flex items-center gap-3 md:gap-5 min-w-0">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold tracking-normal truncate">
              <Sparkles className="h-3.5 w-3.5 text-[#C9A227] shrink-0" />
              <span className="truncate">Repalle&apos;s #1 Personalised Gifting Destination</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-gray-200 font-medium shrink-0">
              <Clock className="h-3.5 w-3.5 text-pink-400 shrink-0" />
              <span>Same-Day Delivery in 2 Hours across Coastal AP</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 text-gray-200 font-medium shrink-0">
            <Link
              href="/track-order"
              className="hover:text-white flex items-center gap-1 transition"
            >
              <Truck className="h-3.5 w-3.5 text-pink-400 shrink-0" />
              <span>Track Order</span>
            </Link>
            <a
              href="https://wa.me/c/919177003905"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 hover:text-emerald-400 text-emerald-300 transition"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span>Help: +91 9177003905</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Header */}
      <header className="w-full sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs">
        {/* Dedicated Mobile Cart Header (< 768px) when on /cart */}
        {pathname === "/cart" && (
          <div className="w-full h-14 md:hidden flex items-center justify-between px-3 bg-white">
            <button
              type="button"
              onClick={() => router.back()}
              className="h-10 w-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-[17px] font-bold text-gray-950 tracking-tight font-serif">
                My Cart
              </h1>
              {itemCount > 0 && (
                <span className="rounded-full bg-pink-100 text-[#F72585] text-xs font-bold px-2 py-0.5">
                  {itemCount}
                </span>
              )}
            </div>
            <Link
              href="/account?tab=wishlist"
              className="relative h-10 w-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#F72585]" />
              )}
            </Link>
          </div>
        )}

        <div className={`w-full max-w-[1700px] mx-auto px-2.5 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-1.5 sm:py-4 min-h-[58px] sm:min-h-[72px] items-center justify-between gap-1.5 sm:gap-4 md:gap-6 lg:gap-8 min-w-0 ${pathname === "/cart" ? "hidden md:flex" : "flex"}`}>
          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="md:hidden p-1 sm:p-1.5 rounded-xl text-gray-700 hover:bg-gray-100 min-w-[32px] sm:min-w-[36px] min-h-[32px] sm:min-h-[36px] flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-3 shrink min-w-0 border-0 outline-none select-none group"
          >
            <div className="h-8 w-8 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#F72585] via-pink-600 to-[#1E2233] p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shrink-0">
              <div className="h-full w-full bg-white rounded-[9px] sm:rounded-[14px] flex items-center justify-center">
                <span className="font-extrabold text-[#F72585] text-sm sm:text-xl tracking-tighter">CP</span>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-sm sm:text-xl md:text-[22px] tracking-tight text-gray-950 block leading-none truncate">
                Creative Paradise
              </span>
              <span className="text-[9px] sm:text-[11px] md:text-xs font-medium tracking-wider text-[#C9A227] uppercase mt-0.5 sm:mt-1 block truncate">
                Gifts • Repalle
              </span>
            </div>
          </Link>

          {/* Location Selector (Button triggers modal) - shown on xl desktop */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="hidden xl:flex items-center gap-2.5 rounded-full border border-gray-200/90 bg-gray-50/80 hover:bg-pink-50/50 hover:border-pink-300 px-4 py-2 transition text-left shrink-0 shadow-2xs cursor-pointer group"
            aria-label="Select delivery location"
          >
            <MapPin className="h-4.5 w-4.5 text-[#F72585] shrink-0 group-hover:scale-110 transition-transform" />
            <div className="leading-tight">
              <span className="block text-[10px] sm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                Deliver to
              </span>
              <span className="font-semibold text-[13px] sm:text-sm text-gray-900 max-w-[150px] truncate block">
                {currentLocation.pincode} ({currentLocation.locationName.split("&")[0].trim()})
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400 ml-0.5 group-hover:text-gray-700 transition" />
          </button>

          {/* Search Bar with live popup */}
          <div ref={searchRef} className="relative flex-1 min-w-0 max-w-xl xl:max-w-2xl hidden sm:block">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative flex items-center">
                <input
                  id="header-search-desktop"
                  name="q"
                  type="text"
                  placeholder="Search personalised gifts, cakes, roses, lamps..."
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full h-11 sm:h-12 rounded-full border border-gray-200/90 bg-gray-50/90 py-2.5 pl-11 pr-11 text-[13px] sm:text-sm text-gray-900 placeholder:text-gray-400 font-normal focus:border-[#F72585] focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-100 transition shadow-2xs"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>

            {/* Live Search Results Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl z-50 animate-in fade-in-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Top Product Matches
                </div>
                <div className="divide-y divide-gray-50">
                  {searchResults.map(prod => (
                    <Link
                      key={prod.id}
                      href={`/product/${prod.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-pink-50/60 transition group"
                    >
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <Image src={prod.images[0]} alt={prod.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#F72585] transition truncate">
                          {prod.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-xs">
                          <span className="font-bold text-gray-900">₹{prod.price}</span>
                          <span className="text-gray-400 line-through">₹{prod.originalPrice}</span>
                          <span className="text-emerald-600 font-semibold">{prod.discountPercent}% off</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-100 text-center">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-xs sm:text-sm font-semibold text-[#F72585] hover:underline cursor-pointer"
                  >
                    View all results for &quot;{searchQuery}&quot; →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Icons: Corporate Gifting, Mobile Cart, Reminders, Wishlist, Account, Desktop Cart */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 xl:gap-4 shrink-0">
            {/* Corporate Gifting Header Icon - hidden on mobile, visible on sm+ */}
            <Link
              href="/corporate-gifting"
              className="hidden sm:flex relative h-8 w-8 sm:h-10 sm:w-10 rounded-full items-center justify-center text-gray-700 hover:text-[#F72585] hover:bg-pink-50 transition shrink-0"
              aria-label="Corporate Gifting"
              title="Corporate & Bulk Gifting"
            >
              <Briefcase className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </Link>

            {/* Mobile Shopping Bag / Cart Icon */}
            <button
              onClick={openCart}
              className="md:hidden relative h-8 w-8 rounded-full flex items-center justify-center text-gray-700 hover:text-[#F72585] hover:bg-pink-50 transition cursor-pointer shrink-0"
              aria-label="Shopping Bag"
              title="Shopping Cart"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#F72585] text-[10px] font-bold text-white flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              )}
            </button>

            {/* My Reminders Icon - next to Wishlist */}
            <button
              onClick={() => {
                if (!user) {
                  openAuthModal();
                } else {
                  router.push("/reminders");
                }
              }}
              className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-gray-700 hover:text-[#F72585] hover:bg-pink-50 transition cursor-pointer shrink-0"
              aria-label="My Reminders"
              title="Never Miss a Celebration: Occasion Reminders"
            >
              <Bell className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              {remindersCount > 0 && (
                <span className="absolute top-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-[#F72585] text-[9px] font-bold text-white flex items-center justify-center animate-pulse">
                  {remindersCount}
                </span>
              )}
            </button>

            {/* Wishlist - hidden on mobile since it is in the primary mobile bottom nav */}
            <Link
              href="/account?tab=wishlist"
              className="hidden md:flex relative h-9 w-9 lg:h-10 lg:w-10 rounded-full items-center justify-center text-gray-700 hover:text-[#F72585] hover:bg-pink-50 transition shrink-0"
              aria-label="Wishlist"
              title="My Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-[#F72585] text-[10px] font-bold text-white flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account / Login Menu */}
            <div className="relative shrink-0">
              <button
                onClick={() => {
                  if (!user) {
                    openAuthModal();
                  } else {
                    setIsUserMenuOpen(prev => !prev);
                  }
                }}
                className="flex items-center gap-1 sm:gap-2 h-8 sm:h-10 px-1 sm:px-2 rounded-full text-gray-700 hover:text-[#F72585] hover:bg-pink-50 transition cursor-pointer shrink-0"
                aria-label="User profile"
              >
                {user?.avatarUrl ? (
                  <div className="relative h-7 w-7 sm:h-9 sm:w-9 rounded-full overflow-hidden border-2 border-[#F72585] shrink-0">
                    <Image src={user.avatarUrl} alt={user.name} fill unoptimized className="object-cover" />
                  </div>
                ) : user ? (
                  <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-[#F72585] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {user.name?.charAt(0) || "U"}
                  </div>
                ) : (
                  <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                )}
                <span className="hidden xl:inline-block text-xs sm:text-[13px] font-semibold text-gray-800 max-w-[120px] truncate">
                  {user ? user.name : "Sign In"}
                </span>
              </button>

              {isUserMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl z-50 animate-in fade-in"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  {user ? (
                    <>
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                        {user.provider === "google" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full mt-1">
                            Google Verified
                          </span>
                        )}
                      </div>
                      <Link
                        href="/reminders"
                        className="flex items-center justify-between px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 rounded-lg hover:bg-pink-50 hover:text-[#F72585] transition"
                      >
                        <span>My Reminders</span>
                        {remindersCount > 0 && (
                          <span className="h-4 w-4 rounded-full bg-[#F72585] text-[10px] font-bold text-white flex items-center justify-center">
                            {remindersCount}
                          </span>
                        )}
                      </Link>
                      <Link
                        href="/account?tab=orders"
                        className="block px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 rounded-lg hover:bg-pink-50 hover:text-[#F72585] transition"
                      >
                        My Orders
                      </Link>
                      <Link
                        href="/account?tab=wishlist"
                        className="block px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 rounded-lg hover:bg-pink-50 hover:text-[#F72585] transition"
                      >
                        Wishlist ({wishlist.length})
                      </Link>
                      <Link
                        href="/account?tab=addresses"
                        className="block px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 rounded-lg hover:bg-pink-50 hover:text-[#F72585] transition"
                      >
                        Saved Addresses
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-3 py-2 text-xs sm:text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="p-3 text-center border-b border-gray-100">
                        <p className="text-xs sm:text-sm font-bold text-gray-900">Welcome to Creative Paradise</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Personalised gifts & same-day delivery
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          openAuthModal();
                        }}
                        className="mt-2 block w-full text-center rounded-xl bg-[#F72585] py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#d6136c] transition cursor-pointer"
                      >
                        Login / Sign Up
                      </button>
                      <Link
                        href="/corporate-gifting"
                        className="block px-3 py-2 mt-1 text-xs text-center font-medium text-[#1E2233] bg-amber-50/70 border border-amber-200/60 rounded-lg hover:bg-amber-100/70 transition"
                      >
                        💼 Corporate & Bulk Gifting
                      </Link>
                      <Link
                        href="/track-order"
                        className="block px-3 py-2 mt-1 text-xs text-center font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition"
                      >
                        Quick Track Order
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart Trigger - hidden on mobile since it is in the primary mobile bottom nav */}
            <button
              onClick={openCart}
              className="hidden md:flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#F72585] to-pink-600 h-10 sm:h-11 px-5 sm:px-6 text-white shadow-md hover:shadow-lg transition active:scale-95 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-amber-400 text-[10px] font-extrabold text-black flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline-block text-[13px] sm:text-sm font-semibold tracking-wide">
                {total > 0 ? `₹${total}` : "Cart"}
              </span>
            </button>
          </div>
        </div>

        {/* Category Navigation Bar (Desktop) */}
        <nav className="w-full border-t border-gray-100 bg-white hidden md:block overflow-hidden">
          <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 min-h-[40px] sm:min-h-[44px] flex items-center justify-between overflow-x-auto no-scrollbar py-2.5 text-[13px] sm:text-sm font-medium text-gray-700 min-w-0">
            <div className="flex items-center gap-4 lg:gap-6 xl:gap-7 shrink-0 min-w-0">
              <Link
                href="/shop"
                className="hover:text-[#F72585] transition flex items-center gap-1 font-semibold text-gray-950"
              >
                All Gifts
              </Link>
              <Link
                href="/category/same-day"
                className="hover:text-[#F72585] text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 font-semibold transition flex items-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>Same-Day in Repalle</span>
              </Link>
              <Link href="/category/personalised-gifts" className="hover:text-[#F72585] transition">
                Personalised Gifts
              </Link>
              <Link href="/category/cakes" className="hover:text-[#F72585] transition">
                Cakes
              </Link>
              <Link href="/category/flowers" className="hover:text-[#F72585] transition">
                Flowers
              </Link>
              <Link href="/category/hampers" className="hover:text-[#F72585] transition">
                Hampers
              </Link>
              <Link href="/category/plants" className="hover:text-[#F72585] transition">
                Plants &amp; Pots
              </Link>
              <Link href="/category/home-decor" className="hover:text-[#F72585] transition">
                Resin &amp; Neon Art
              </Link>
              <Link href="/category/combos" className="hover:text-[#F72585] transition">
                Teddy Combos
              </Link>
            </div>
            <div className="hidden xl:flex items-center gap-4 text-xs sm:text-[13px] text-gray-600 font-medium shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="text-[#C9A227]">★</span>
                <span>4.9 Rating (500+ Reviews in Coastal AP)</span>
              </span>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-4/5 max-w-sm bg-white h-full shadow-xl flex flex-col p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="font-bold text-base text-gray-900">Creative Paradise</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile User Profile / Sign In Banner */}
            <div className="py-3 border-b border-gray-100">
              {user ? (
                <div className="flex items-center justify-between bg-pink-50/60 rounded-xl p-3">
                  <div className="flex items-center gap-2.5">
                    {user.avatarUrl ? (
                      <div className="relative h-8 w-8 rounded-full overflow-hidden border border-[#F72585]">
                        <Image src={user.avatarUrl} alt={user.name} fill unoptimized className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-[#F72585] text-white flex items-center justify-center font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-gray-900">{user.name}</p>
                      <p className="text-[10px] text-gray-500 truncate max-w-[140px]">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="text-[11px] text-red-600 font-bold hover:underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#6B722C] text-white rounded-xl py-2.5 px-3 text-xs font-bold shadow-xs hover:bg-[#585E24] transition cursor-pointer"
                >
                  <User className="h-4 w-4" />
                  Sign In / Login to Account
                </button>
              )}
            </div>

            {/* Mobile Location Selector */}
            <div className="py-3 border-b border-gray-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLocationModalOpen(true);
                }}
                className="w-full flex items-center justify-between bg-gray-50 rounded-xl p-3 text-xs"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#F72585]" />
                  <span className="font-semibold text-gray-800">
                    Deliver to: {currentLocation.locationName.split("&")[0]} ({currentLocation.pincode})
                  </span>
                </div>
                <span className="text-[#F72585] text-[11px] font-bold">Change</span>
              </button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="my-3">
              <div className="relative">
                <input
                  id="header-search-mobile"
                  name="q_mobile"
                  type="text"
                  placeholder="Search gifts, flowers, cakes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-xs"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </form>

            {/* Categories */}
            <div className="space-y-1 py-2 font-medium text-sm text-gray-700">
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#F72585]"
              >
                All Gifts
              </Link>
              <Link
                href="/category/same-day"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-amber-700 bg-amber-50 font-bold"
              >
                ⚡ Same-Day Delivery in Repalle
              </Link>
              <Link
                href="/category/personalised-gifts"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#F72585]"
              >
                Personalised Gifts
              </Link>
              <Link
                href="/category/cakes"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#F72585]"
              >
                Handcrafted Cakes
              </Link>
              <Link
                href="/category/flowers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#F72585]"
              >
                Fresh Flowers & Roses
              </Link>
              <Link
                href="/category/hampers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#F72585]"
              >
                Luxury Hampers
              </Link>
              <Link
                href="/category/plants"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#F72585]"
              >
                Indoor Plants & Bonsai
              </Link>
              <Link
                href="/category/home-decor"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#F72585]"
              >
                Resin & Neon Art
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (!user) {
                    openAuthModal();
                  } else {
                    router.push("/reminders");
                  }
                }}
                className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#F72585] text-gray-800 font-medium cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Bell className="h-4 w-4 text-[#F72585]" />
                  My Reminders
                </span>
                {remindersCount > 0 && (
                  <span className="bg-[#F72585] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {remindersCount}
                  </span>
                )}
              </button>
              <Link
                href="/corporate-gifting"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#F72585] text-gray-800 font-medium"
              >
                <Briefcase className="h-4 w-4 text-[#C9A227]" />
                Corporate & Bulk Gifting
              </Link>
              <Link
                href="/track-order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#F72585]"
              >
                Track Your Order
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#F72585]"
              >
                About Repalle Gifts
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#F72585]"
              >
                Contact & Workshop
              </Link>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100">
              <a
                href="https://wa.me/c/919177003905"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-sm"
              >
                <Phone className="h-4 w-4" />
                Chat on WhatsApp (+91 9177003905)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Location Selector Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsLocationModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#F72585]" />
                <h3 className="font-bold text-base text-gray-900">Select Your Delivery Area</h3>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              We offer same-day express delivery in Repalle & daily dispatch across Coastal Andhra Pradesh.
            </p>

            <div className="mt-4 space-y-2 max-h-72 overflow-y-auto pr-1">
              {SERVICEABLE_PINCODES.map(loc => {
                const isSelected = loc.pincode === selectedDeliveryPincode;
                return (
                  <button
                    key={loc.pincode}
                    onClick={() => {
                      setSelectedDeliveryPincode(loc.pincode);
                      setIsLocationModalOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition ${
                      isSelected
                        ? "border-[#F72585] bg-pink-50/70 text-[#F72585]"
                        : "border-gray-100 hover:border-gray-300 hover:bg-gray-50 text-gray-800"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900">{loc.pincode}</span>
                        <span className="text-xs text-gray-600">• {loc.locationName}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-gray-500 font-medium">
                          District: {loc.district}
                        </span>
                        {loc.isExpress2Hr && (
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                            2-Hr Express
                          </span>
                        )}
                        {loc.isMidnight && (
                          <span className="text-[9px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.2 rounded">
                            Midnight Delivery
                          </span>
                        )}
                      </div>
                    </div>
                    {isSelected && <Check className="h-5 w-5 text-[#F72585]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (< 768px): 100% full viewport width, 5 equal columns */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 max-w-full min-w-0 box-border overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-lg md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="w-full grid grid-cols-5 h-14 min-w-0">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center min-w-0 w-full overflow-hidden transition-colors ${
              pathname === "/" ? "text-[#F72585] font-bold" : "text-gray-600 hover:text-[#F72585]"
            }`}
          >
            <Home className="h-5 w-5 shrink-0" />
            <span className="text-[9.5px] sm:text-[10px] font-medium mt-0.5 truncate max-w-full">Home</span>
          </Link>

          <Link
            href="/shop"
            className={`flex flex-col items-center justify-center min-w-0 w-full overflow-hidden transition-colors ${
              pathname === "/shop" ? "text-[#F72585] font-bold" : "text-gray-600 hover:text-[#F72585]"
            }`}
          >
            <Sparkles className="h-5 w-5 shrink-0" />
            <span className="text-[9.5px] sm:text-[10px] font-medium mt-0.5 truncate max-w-full">Explore</span>
          </Link>

          <Link
            href="/reminders"
            className={`relative flex flex-col items-center justify-center min-w-0 w-full overflow-hidden transition-colors ${
              pathname === "/reminders" ? "text-[#F72585] font-bold" : "text-gray-600 hover:text-[#F72585]"
            }`}
            aria-label="My Reminders"
          >
            <div className="relative shrink-0 flex items-center justify-center">
              <CalendarClock size={19} strokeWidth={1.8} className="shrink-0" />
              {remindersCount > 0 && (
                <span className="absolute -top-1 -right-2 h-3.5 w-3.5 rounded-full bg-[#F72585] text-[9px] font-bold text-white flex items-center justify-center">
                  {remindersCount}
                </span>
              )}
            </div>
            <span className="text-[9.5px] sm:text-[10px] font-medium mt-0.5 truncate max-w-full">Reminders</span>
          </Link>

          <Link
            href="/track-order"
            className={`flex flex-col items-center justify-center min-w-0 w-full overflow-hidden transition-colors ${
              pathname === "/track-order" ? "text-[#F72585] font-bold" : "text-gray-600 hover:text-[#F72585]"
            }`}
          >
            <Truck className="h-5 w-5 shrink-0" />
            <span className="text-[9.5px] sm:text-[10px] font-medium mt-0.5 truncate max-w-full">Track</span>
          </Link>

          <Link
            href="/cart"
            className={`relative flex flex-col items-center justify-center min-w-0 w-full overflow-hidden transition-colors cursor-pointer ${
              pathname === "/cart" ? "text-[#F72585]" : "text-gray-600 hover:text-[#F72585]"
            }`}
            aria-label="Shopping Cart"
          >
            <div className="relative shrink-0">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 h-3.5 w-3.5 rounded-full bg-[#C9A227] text-[9px] font-extrabold text-black flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <span className={`text-[9.5px] sm:text-[10px] mt-0.5 truncate max-w-full ${pathname === "/cart" ? "font-bold text-[#F72585]" : "font-medium"}`}>Cart</span>
          </Link>
        </div>
      </nav>
    </>
  );
};
