"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Gift, Eye, EyeOff, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const { signInWithPassword, loginAsAdmin, logout, isDemoMode } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [successNotice, setSuccessNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setSuccessNotice("");

    if (!email.trim() || !password) {
      setLoginError("Please enter your admin email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await signInWithPassword(email.trim(), password);

      if (!res.success) {
        setLoginError(res.error || "Invalid credentials. Please check your admin email and password.");
        setIsLoading(false);
        return;
      }

      // Verify the role directly from the database (server-side single source of truth)
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setLoginError("Failed to establish secure admin session.");
        setIsLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profile?.role !== "admin") {
        await logout();
        setLoginError(
          "Access Denied: This account is authenticated as a customer and lacks administrator permissions."
        );
        setIsLoading(false);
        return;
      }

      window.location.href = "/admin";
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setLoginError(msg);
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setLoginError("Please enter your admin email first to receive a password reset link.");
      return;
    }

    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${origin}/admin/login`,
      });
      if (error) {
        setLoginError(error.message);
      } else {
        setSuccessNotice("Password reset link dispatched to your email address.");
      }
    } catch {
      setLoginError("Failed to dispatch reset link.");
    }
  };

  const handleDemoAdmin = () => {
    if (!isDemoMode) return;
    loginAsAdmin();
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col items-center justify-center p-4 sm:p-6 text-gray-900 font-sans">
      {/* Centered Login Card */}
      <div className="max-w-md w-full rounded-3xl bg-white border border-gray-150 p-8 sm:p-10 shadow-xl space-y-6">
        {/* Top Logo Badge */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center mx-auto text-[#F72585] shadow-xs">
            <Gift className="h-6 w-6" />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-gray-950">
            Creative Paradise
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Internal SaaS &amp; Admin Terminal
          </p>
        </div>

        {loginError && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-700 font-medium flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{loginError}</span>
          </div>
        )}

        {successNotice && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 font-medium animate-in fade-in">
            {successNotice}
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleAdminSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@repallgifts.com"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#F72585] focus:ring-2 focus:ring-pink-100 focus:outline-none transition min-h-[44px]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                PASSWORD
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs font-semibold text-[#F72585] hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 pr-10 text-xs text-gray-900 tracking-wider focus:border-[#F72585] focus:ring-2 focus:ring-pink-100 focus:outline-none transition min-h-[44px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-[#F72585] hover:bg-[#d6136c] text-white text-xs font-bold shadow-md shadow-pink-500/25 hover:-translate-y-0.5 transition duration-200 cursor-pointer flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <span>Sign In to Terminal</span>
            )}
          </button>

          {/* Strictly Gated Dev Demo Mode Button */}
          {isDemoMode && (
            <div className="pt-2 border-t border-dashed border-gray-200">
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="w-full py-2.5 px-3 rounded-xl border border-amber-300 bg-amber-50/80 hover:bg-amber-100 text-amber-900 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="h-3.5 w-3.5 text-amber-700" />
                <span>[DEV ONLY] 1-Click Demo Admin</span>
              </button>
            </div>
          )}
        </form>

        {/* Back link */}
        <div className="text-center pt-1">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-gray-700 transition inline-block py-1"
          >
            ← Return to Live Customer Storefront
          </Link>
        </div>
      </div>

      {/* Security Footer Notice */}
      <p className="text-[11px] text-gray-400 text-center mt-6 flex items-center justify-center gap-1.5">
        <span>Creative Paradise Admin v2.4.2</span>
        <span>—</span>
        <span>Database RBAC &amp; RLS Active</span>
        <span>🔒</span>
      </p>
    </div>
  );
}
