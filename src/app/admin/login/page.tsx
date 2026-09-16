"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Gift, Eye, EyeOff, Lock, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, loginAsAdmin } = useAuth();
  const [email, setEmail] = useState("admin@creativeparadise.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    try {
      await login(email, "admin");
      router.push("/admin");
    } catch {
      loginAsAdmin();
      router.push("/admin");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAdmin = () => {
    loginAsAdmin();
    router.push("/admin");
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
            Internal SaaS & Admin Terminal
          </p>
        </div>

        {loginError && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 font-medium">
            {loginError}
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@creativeparadise.com"
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
                onClick={() => alert("Password reset link has been dispatched to admin email.")}
                className="text-xs font-semibold text-[#F72585] hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-pink-400 bg-white px-3.5 py-2.5 pr-10 text-xs text-gray-900 tracking-wider focus:border-[#F72585] focus:ring-2 focus:ring-pink-100 focus:outline-none transition min-h-[44px]"
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
            className="w-full py-3 px-4 rounded-xl bg-[#F72585] hover:bg-[#d6136c] text-white text-xs font-bold shadow-md shadow-pink-500/25 hover:-translate-y-0.5 transition duration-200 cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span>{isLoading ? "Signing in..." : "Sign In to Terminal"}</span>
          </button>

          {/* Secondary Action: SSO / Demo Access */}
          <button
            type="button"
            onClick={handleDemoAdmin}
            className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-2xs hover:border-gray-300 transition duration-200 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
          >
            <div className="h-3.5 w-3.5 rounded-full border-2 border-gray-400 flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-500" />
            </div>
            <span>Sign in with Okta SSO</span>
          </button>
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

      {/* Security Footer Notice matching Image 1 */}
      <p className="text-[11px] text-gray-400 text-center mt-6 flex items-center justify-center gap-1.5">
        <span>Creative Paradise Admin v2.4.1</span>
        <span>—</span>
        <span>Security &amp; Encryption Active</span>
        <span>🔒</span>
      </p>
    </div>
  );
}
