"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, loginAsAdmin, user, isAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!email.trim() || !password.trim()) {
      setLoginError("Please enter your admin credentials or click Instant Demo Admin Access below.");
      return;
    }

    try {
      await login(email, "admin");
      router.push("/admin");
    } catch {
      setLoginError("Authentication failed. Please verify credentials or use demo access.");
    }
  };

  const handleDemoAdmin = () => {
    loginAsAdmin();
    router.push("/admin");
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center p-4 sm:p-6 text-white">
      <div className="max-w-md w-full rounded-3xl bg-[#121520] border border-gray-800 p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-[#F72585] to-[#C9A227] p-0.5 mx-auto flex items-center justify-center">
            <div className="h-full w-full bg-[#0A0A0A] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="h-7 w-7 text-[#F72585]" />
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-[#C9A227] uppercase tracking-widest block">
            PORTAL ACCESS
          </span>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Creative Paradise Admin
          </h1>
          <p className="text-xs text-gray-400">
            Secure back-office management for Repalle studio & storefront
          </p>
        </div>

        {loginError && (
          <div className="rounded-xl bg-rose-950/70 border border-rose-800 p-3 text-xs text-rose-300">
            {loginError}
          </div>
        )}

        <form onSubmit={handleAdminSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
              <input
                type="email"
                placeholder="admin@repallgifts.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-800 bg-[#0A0A0A] py-3 pl-10 pr-3 text-xs text-white placeholder:text-gray-600 focus:border-[#F72585] focus:outline-none min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-800 bg-[#0A0A0A] py-3 pl-10 pr-3 text-xs text-white placeholder:text-gray-600 focus:border-[#F72585] focus:outline-none min-h-[44px]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#F72585] py-3 text-xs font-bold text-white shadow-lg hover:bg-[#d6136c] transition min-h-[44px]"
          >
            Authenticate Admin <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-gray-800 text-center space-y-3">
          <p className="text-[11px] text-gray-500">Fast preview without typing credentials?</p>
          <button
            type="button"
            onClick={handleDemoAdmin}
            className="w-full rounded-xl border border-dashed border-[#C9A227] bg-[#C9A227]/10 py-3 text-xs font-bold text-[#C9A227] hover:bg-[#C9A227]/20 transition flex items-center justify-center gap-1.5 min-h-[44px]"
          >
            <Sparkles className="h-4 w-4" /> Instant Demo Admin Access
          </button>
          <div className="pt-2">
            <Link href="/" className="text-xs text-gray-400 hover:text-white transition inline-block py-2">
              ← Return to Live Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
