"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Sparkles,
  Truck,
  ArrowRight,
  Trash2,
  CheckCircle2,
  Lock,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/product/ProductCard";
import { GoogleIcon } from "@/components/common/Icons";

function AccountPageContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "orders";
  const urlError = searchParams.get("error");

  const {
    user,
    signInWithPassword,
    signUpWithPassword,
    loginAsDemoCustomer,
    logout,
    openAuthModal,
    loginWithGoogle,
    isDemoMode,
  } = useAuth();
  const { orders, wishlist, products } = useStore();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [authError, setAuthError] = useState<string>(urlError || "");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auth form states
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");

  // Filter user orders strictly by authenticated account ID or email address
  const userOrders = user
    ? orders.filter(
        o =>
          (o.userId && o.userId === user.id) ||
          (o.customerEmail && o.customerEmail.toLowerCase() === user.email.toLowerCase())
      )
    : [];

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!loginEmail.trim() || !loginPassword) {
      setAuthError("Please enter both email and password.");
      return;
    }
    setIsSubmitting(true);
    const res = await signInWithPassword(loginEmail.trim(), loginPassword);
    setIsSubmitting(false);
    if (!res.success) {
      setAuthError(res.error || "Sign in failed. Please verify your credentials or use the Express Login Drawer.");
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      setAuthError("Please enter your name, email, and password.");
      return;
    }
    setIsSubmitting(true);
    const res = await signUpWithPassword(signupName.trim(), signupEmail.trim(), signupPassword, signupPhone);
    setIsSubmitting(false);
    if (!res.success) {
      setAuthError(res.error || "Account creation failed. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="bg-gray-50/50 min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100">
          <div className="text-center mb-6">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-[#F72585] to-[#C9A227] p-0.5 mx-auto mb-3 flex items-center justify-center">
              <div className="h-full w-full bg-white rounded-[14px] flex items-center justify-center font-extrabold text-[#F72585]">
                CP
              </div>
            </div>
            <h1 className="text-xl font-black text-gray-900">
              Creative Paradise Account
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Sign in to manage your orders, saved addresses & wishlist
            </p>
          </div>

          {/* Tab Selector: Login vs Sign Up */}
          <div className="grid grid-cols-2 rounded-xl bg-gray-100 p-1 mb-5 text-xs font-bold">
            <button
              onClick={() => setAuthMode("login")}
              className={`rounded-lg py-2 transition ${authMode === "login" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500"
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode("signup")}
              className={`rounded-lg py-2 transition ${authMode === "signup" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500"
                }`}
            >
              New Account
            </button>
          </div>

          {/* Auth Error Banner */}
          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">
                <span className="font-semibold block">Authentication Notice</span>
                <span>{authError}</span>
              </div>
            </div>
          )}

          {authMode === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="login-email-input" className="block text-xs font-bold text-gray-800 mb-1">
                  Email or Mobile Number
                </label>
                <input
                  id="login-email-input"
                  name="email"
                  type="text"
                  autoComplete="username"
                  placeholder="e.g. saiteja@gmail.com or 9848012345"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                  className="w-full min-h-[44px] rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-medium focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="login-password-input" className="block text-xs font-bold text-gray-800 mb-1">
                  Password
                </label>
                <input
                  id="login-password-input"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                  className="w-full min-h-[44px] rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-medium focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label htmlFor="remember-me-checkbox" className="flex items-center gap-2 cursor-pointer text-gray-600">
                  <input
                    id="remember-me-checkbox"
                    name="rememberMe"
                    type="checkbox"
                    defaultChecked
                    className="rounded text-[#F72585] focus:ring-0"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="font-medium text-[#F72585] hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full min-h-[44px] rounded-xl bg-[#F72585] py-3 text-xs font-bold text-white shadow-md hover:bg-[#d6136c] transition cursor-pointer flex items-center justify-center"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label htmlFor="signup-name-input" className="block text-xs font-bold text-gray-800 mb-1">Full Name</label>
                <input
                  id="signup-name-input"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  required
                  className="w-full min-h-[44px] rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-medium focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="signup-email-input" className="block text-xs font-bold text-gray-800 mb-1">Email Address</label>
                <input
                  id="signup-email-input"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  required
                  className="w-full min-h-[44px] rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-medium focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="signup-phone-input" className="block text-xs font-bold text-gray-800 mb-1">Mobile Number</label>
                <input
                  id="signup-phone-input"
                  name="phone"
                  type="tel"
                  placeholder="10-digit mobile (e.g. 9848012345)"
                  value={signupPhone}
                  onChange={e => setSignupPhone(e.target.value)}
                  className="w-full min-h-[44px] rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-medium focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="signup-password-input" className="block text-xs font-bold text-gray-800 mb-1">Password</label>
                <input
                  id="signup-password-input"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password (min. 6 characters)"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full min-h-[44px] rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-medium focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[44px] rounded-xl bg-[#F72585] py-3 text-xs font-bold text-white shadow-md hover:bg-[#d6136c] transition cursor-pointer flex items-center justify-center disabled:opacity-70"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          )}

          {/* Real Google OAuth & Fast Login Options */}
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-2.5 text-center">
            <button
              type="button"
              onClick={async () => {
                setAuthError("");
                setIsGoogleLoading(true);
                try {
                  await loginWithGoogle("/account");
                } catch (err: unknown) {
                  setIsGoogleLoading(false);
                  if (err instanceof Error && err.message === "SUPABASE_NOT_CONFIGURED") {
                    setAuthError(
                      "Supabase Google Auth is not yet configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and enable Google provider in your Supabase dashboard."
                    );
                  } else {
                    setAuthError(
                      err instanceof Error ? err.message : "Google sign-in was cancelled or failed. Please try again."
                    );
                  }
                }
              }}
              disabled={isGoogleLoading}
              className="w-full min-h-[44px] rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50/80 py-2.5 px-4 text-xs font-bold text-gray-700 shadow-2xs transition flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70"
            >
              {isGoogleLoading ? (
                <>
                  <span className="inline-block h-4 w-4 border-2 border-[#4285F4] border-t-transparent rounded-full animate-spin" />
                  <span>Redirecting to Google...</span>
                </>
              ) : (
                <>
                  <GoogleIcon className="h-4 w-4" />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => openAuthModal()}
              className="w-full min-h-[44px] rounded-xl border border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100 py-2.5 px-4 text-xs font-semibold text-gray-700 transition cursor-pointer flex items-center justify-center"
            >
              Open Slide-in Express Login Drawer
            </button>

            {/* Strictly Gated Dev Demo Mode Customer Access */}
            {isDemoMode && (
              <button
                type="button"
                onClick={loginAsDemoCustomer}
                className="w-full min-h-[44px] rounded-xl border border-dashed border-amber-400 bg-amber-50/80 py-2.5 text-xs font-bold text-amber-900 hover:bg-amber-100 transition cursor-pointer flex items-center justify-center"
              >
                ✨ [DEV ONLY] Instant Demo Customer Login
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#1E2233] via-[#2A3048] to-[#1E2233] p-6 sm:p-8 text-white mb-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-black text-pink-400">
              {user.name.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#C9A227] uppercase tracking-wider block">
                VIP CUSTOMER
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white">{user.name}</h1>
              <p className="text-xs text-gray-300">{user.email} • {user.phone}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="self-start sm:self-center min-h-[44px] inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 text-xs font-bold text-white transition cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-8 overflow-x-auto no-scrollbar text-xs font-bold">
          <button
            onClick={() => setActiveTab("orders")}
            className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl transition cursor-pointer ${activeTab === "orders"
                ? "bg-[#F72585] text-white shadow-xs"
                : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >
            <ShoppingBag className="h-4 w-4" /> My Orders ({userOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl transition cursor-pointer ${activeTab === "wishlist"
                ? "bg-[#F72585] text-white shadow-xs"
                : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >
            <Heart className="h-4 w-4" /> My Wishlist ({wishlist.length})
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl transition cursor-pointer ${activeTab === "addresses"
                ? "bg-[#F72585] text-white shadow-xs"
                : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >
            <MapPin className="h-4 w-4" /> Saved Addresses
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl transition cursor-pointer ${activeTab === "profile"
                ? "bg-[#F72585] text-white shadow-xs"
                : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >
            <Settings className="h-4 w-4" /> Profile Settings
          </button>
        </div>

        {/* Tab Content: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {userOrders.length === 0 ? (
              <div className="rounded-3xl bg-white p-12 text-center border border-gray-100">
                <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-900">No Orders Placed Yet</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Start sending surprises to loved ones in Repalle and Coastal AP!
                </p>
                <Link
                  href="/shop"
                  className="mt-4 inline-block rounded-xl bg-[#F72585] px-6 py-2.5 text-xs font-bold text-white shadow-md"
                >
                  Explore Gifts
                </Link>
              </div>
            ) : (
              userOrders.map(order => (
                <div
                  key={order.id}
                  className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                    <div>
                      <span className="text-xs font-extrabold text-gray-900">
                        Order #{order.orderNumber}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-pink-100 text-[#F72585] px-3 py-0.5 text-xs font-bold uppercase">
                        {order.orderStatus.replace("_", " ")}
                      </span>
                      <Link
                        href={`/track-order?id=${order.orderNumber}`}
                        className="text-xs font-bold text-[#F72585] hover:underline flex items-center gap-1"
                      >
                        <Truck className="h-3.5 w-3.5" /> Track
                      </Link>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="divide-y divide-gray-100 space-y-2">
                    {order.items.map(item => (
                      <div key={item.cartItemId} className="pt-2 flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-xs">
                          <h4 className="font-bold text-gray-900 truncate">
                            {item.product.title}
                          </h4>
                          <p className="text-gray-500 text-[11px]">
                            Qty: {item.quantity} • ₹{item.unitPrice}
                          </p>
                          {item.personalisation?.engravingText && (
                            <p className="text-[10px] text-[#F72585] font-medium">
                              Custom Text: &quot;{item.personalisation.engravingText}&quot;
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-xs">
                    <span className="text-gray-500">
                      Destination: {order.shippingAddress.area}, {order.shippingAddress.city}
                    </span>
                    <span className="font-black text-sm text-gray-900">
                      Total: ₹{order.totalAmount}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab Content: Wishlist */}
        {activeTab === "wishlist" && (
          <div>
            {wishlistedProducts.length === 0 ? (
              <div className="rounded-3xl bg-white p-12 text-center border border-gray-100">
                <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-900">Your Wishlist is Empty</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Save gifts you love by clicking the heart icon on any product.
                </p>
                <Link
                  href="/shop"
                  className="mt-4 inline-block rounded-xl bg-[#F72585] px-6 py-2.5 text-xs font-bold text-white shadow-md"
                >
                  Explore Gifts
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {wishlistedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Saved Addresses */}
        {activeTab === "addresses" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900">Home Address (Default)</span>
                <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-gray-700 font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500 mt-1">Plot 14, Gandhi Road, Near Clock Tower</p>
              <p className="text-xs text-gray-500">Repalle, Bapatla District, AP — 522265</p>
              <p className="text-xs text-gray-500 mt-1">Phone: {user.phone}</p>
            </div>
          </div>
        )}

        {/* Tab Content: Profile Settings */}
        {activeTab === "profile" && (
          <div className="max-w-lg rounded-3xl border border-gray-100 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Personal Details</h3>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Name</label>
              <input
                type="text"
                defaultValue={user.name}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue={user.email}
                disabled
                className="w-full rounded-xl border border-gray-200 bg-gray-100 p-2.5 text-xs text-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                defaultValue={user.phone}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs"
              />
            </div>
            <button
              onClick={() => alert("Profile changes saved successfully!")}
              className="rounded-xl bg-[#F72585] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d6136c] transition"
            >
              Save Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading customer account...</div>}>
      <AccountPageContent />
    </Suspense>
  );
}
