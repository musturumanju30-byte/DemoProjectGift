"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Mail, Lock, Edit3, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { GoogleIcon } from "@/components/common/Icons";

export const AuthDrawer: React.FC = () => {
  const {
    user,
    isAuthModalOpen,
    closeAuthModal,
    loginWithGoogle,
    sendEmailOtp,
    verifyOtp,
    isDemoMode,
  } = useAuth();

  const [step, setStep] = useState<"input" | "otp">("input");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  // Auto-close drawer as soon as user is authenticated (e.g. clicked email link or verified code)
  useEffect(() => {
    if (user && isAuthModalOpen) {
      closeAuthModal();
    }
  }, [user, isAuthModalOpen, closeAuthModal]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isAuthModalOpen) {
      setStep("input");
      setError("");
      setIsLoading(false);
      setIsGoogleLoading(false);
      setOtp(["", "", "", "", "", ""]);
      setResendTimer(60);
    }
  }, [isAuthModalOpen]);

  // Timer countdown for OTP
  useEffect(() => {
    if (step === "otp" && resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, resendTimer]);

  if (!isAuthModalOpen) return null;

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    const res = await sendEmailOtp(email.trim());
    setIsLoading(false);

    if (!res.success) {
      setError(res.error || "Failed to send verification code. Please check your email and try again.");
      return;
    }

    setStep("otp");
    setResendTimer(60);
    setOtp(["", "", "", "", "", ""]);
  };

  const handleOtpChange = (index: number, value: string) => {
    // Handle paste of 6 digits
    if (value.length > 1) {
      const cleanDigits = value.replace(/\D/g, "").slice(0, 6);
      if (cleanDigits.length > 0) {
        const digits = cleanDigits.split("");
        const newOtp = ["", "", "", "", "", ""];
        digits.forEach((d, i) => {
          newOtp[i] = d;
        });
        setOtp(newOtp);
        const nextIdx = Math.min(digits.length, 5);
        setTimeout(() => {
          document.getElementById(`otp-input-${nextIdx}`)?.focus();
        }, 10);
        return;
      }
    }

    const cleanChar = value.slice(-1).replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[index] = cleanChar;
    setOtp(newOtp);

    // Auto-focus next input
    if (cleanChar && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("").trim();
    if (otpCode.length < 6) {
      setError("Please enter the complete 6-digit verification code");
      return;
    }

    setIsLoading(true);
    setError("");
    const res = await verifyOtp(email.trim(), otpCode);
    setIsLoading(false);

    if (!res.success) {
      setError(res.error || "Invalid or expired verification code. Please check and try again.");
    }
  };

  const handleResend = async () => {
    setError("");
    setIsLoading(true);
    const res = await sendEmailOtp(email.trim());
    setIsLoading(false);

    if (res.success) {
      setResendTimer(60);
      setOtp(["", "", "", "", "", ""]);
    } else {
      setError(res.error || "Failed to resend code. Please try again shortly.");
    }
  };

  /**
   * Real Google OAuth flow
   * Directly redirects to accounts.google.com via Supabase Auth
   */
  const handleGoogleSignIn = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      await loginWithGoogle("/account");
    } catch (err: unknown) {
      setIsGoogleLoading(false);
      if (err instanceof Error && err.message === "SUPABASE_NOT_CONFIGURED") {
        setError(
          "Supabase credentials needed: Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local and enable Google in your Supabase dashboard."
        );
      } else {
        const message =
          err instanceof Error ? err.message : "Google sign-in was cancelled or failed. Please try again.";
        setError(message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={closeAuthModal}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        {/* Floating circular close button outside drawer on larger screens */}
        <button
          onClick={closeAuthModal}
          className="absolute -left-12 top-6 z-50 hidden sm:flex h-9 w-9 rounded-full bg-white shadow-xl border border-gray-200 items-center justify-center text-gray-700 hover:text-black hover:bg-gray-100 transition active:scale-95 cursor-pointer"
          aria-label="Close login drawer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Drawer Panel (full-width on mobile, max-w-md on desktop) */}
        <div className="relative w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          {/* Mobile close button inside drawer */}
          <div className="flex sm:hidden justify-between items-center px-5 pt-4">
            <button
              onClick={closeAuthModal}
              className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <span className="text-xs font-bold text-[#F72585] uppercase tracking-wider">
              Creative Paradise
            </span>
          </div>

          {/* Upper Section: Form & Auth */}
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
            {/* Step 1: Input Email & Real Google Login */}
            {step === "input" && (
              <>
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Sign Up / Login to Creative Paradise
                  </h2>
                  <p className="text-xs text-gray-500 mt-1.5 font-normal">
                    We will send a secure one-time verification code to your email
                  </p>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-in fade-in">
                    <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{error}</span>
                  </div>
                )}

                <form onSubmit={handleContinue} className="mt-6">
                  {/* Floating-Label Email Field */}
                  <div className="relative">
                    <fieldset className="border border-gray-300 rounded-lg px-3 pb-2 pt-1 transition focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900">
                      <legend className="text-[11px] font-medium text-gray-600 px-1 ml-1">
                        Enter email address
                      </legend>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                        <input
                          id="drawer-email-input"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={e => {
                            setEmail(e.target.value);
                            setError("");
                          }}
                          placeholder="e.g. yourname@gmail.com"
                          className="w-full text-xs sm:text-sm font-medium text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-300"
                          autoFocus
                          required
                        />
                        {email && (
                          <button
                            type="button"
                            onClick={() => setEmail("")}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </fieldset>
                  </div>

                  {/* Olive Green Continue Button */}
                  <button
                    type="submit"
                    disabled={isLoading || isGoogleLoading}
                    className="w-full mt-4 rounded-lg bg-[#6B722C] hover:bg-[#585E24] text-white text-sm font-bold py-3 px-4 shadow-xs transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Send Secure Code"
                    )}
                  </button>
                </form>

                {/* Or Login With Divider */}
                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <span className="relative bg-white px-3 text-xs text-gray-500 font-medium">
                    or Login with
                  </span>
                </div>

                {/* Real Google OAuth Button (Triggers accounts.google.com) */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading || isLoading}
                  className="w-full border border-gray-300 hover:border-gray-400 rounded-xl py-2.5 px-4 flex items-center justify-center gap-3 bg-white hover:bg-gray-50/80 shadow-2xs transition active:scale-[0.99] cursor-pointer group disabled:opacity-70"
                  aria-label="Continue with Google"
                >
                  {isGoogleLoading ? (
                    <>
                      <span className="inline-block h-4 w-4 border-2 border-[#4285F4] border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs sm:text-sm font-semibold text-gray-700">
                        Redirecting to Google...
                      </span>
                    </>
                  ) : (
                    <>
                      <GoogleIcon className="h-5 w-5 shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                        Continue with Google
                      </span>
                    </>
                  )}
                </button>

                {/* Legal / Agreement Text */}
                <div className="text-center mt-6 text-[11px] text-gray-500 leading-relaxed max-w-xs mx-auto">
                  By continuing you agree to Creative Paradise&apos;s{" "}
                  <div className="space-x-1">
                    <Link
                      href="/terms"
                      onClick={closeAuthModal}
                      className="text-gray-700 hover:text-black underline font-medium"
                    >
                      Terms &amp; Conditions
                    </Link>
                    <span>,</span>
                    <Link
                      href="/privacy-policy"
                      onClick={closeAuthModal}
                      className="text-gray-700 hover:text-black underline font-medium"
                    >
                      Privacy Policy
                    </Link>
                    <span>&amp;</span>
                    <Link
                      href="/terms#disclaimer"
                      onClick={closeAuthModal}
                      className="text-gray-700 hover:text-black underline font-medium"
                    >
                      Disclaimer
                    </Link>
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Real 6-digit OTP Verification Code */}
            {step === "otp" && (
              <div className="animate-in fade-in">
                <div className="text-center">
                  <div className="h-11 w-11 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#F72585] mx-auto mb-3">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Check Your Email</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    We sent a sign-in email to <strong className="text-gray-800">{email}</strong>
                  </p>
                  <div className="my-2.5 px-3 py-2 rounded-xl bg-pink-50/80 border border-pink-100 text-[11px] text-gray-700 leading-snug">
                    💡 <strong>Quick Login:</strong> Click <strong>&quot;Confirm email address&quot;</strong> in your email to log in instantly, or enter your code below.
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("input")}
                    className="inline-flex items-center gap-1 text-[11px] text-[#F72585] font-semibold hover:underline mt-1 cursor-pointer"
                  >
                    <Edit3 className="h-3 w-3" /> Change email
                  </button>
                </div>

                <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
                  <div className="flex justify-center gap-2 sm:gap-2.5">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleOtpChange(idx, e.target.value)}
                        onKeyDown={e => handleOtpKeyDown(idx, e)}
                        className="h-12 w-10 sm:h-13 sm:w-12 rounded-xl border border-gray-300 text-center text-lg sm:text-xl font-bold text-gray-900 focus:border-[#6B722C] focus:ring-2 focus:ring-[#6B722C]/20 focus:outline-none transition shadow-2xs"
                        autoFocus={idx === 0}
                      />
                    ))}
                  </div>

                  {error && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-center text-red-600 font-medium">
                      {error}
                    </div>
                  )}

                  {/* Strictly Dev / Demo Mode Notice */}
                  {isDemoMode && (
                    <div className="text-center">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-[10px] text-amber-700 font-mono">
                        DEMO MODE ACTIVE: Check your real Supabase email logs or inbox
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-[#6B722C] hover:bg-[#585E24] text-white text-sm font-bold py-3 px-4 shadow-xs transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Verify & Sign In"
                    )}
                  </button>

                  <div className="text-center text-xs text-gray-500 pt-2">
                    {resendTimer > 0 ? (
                      <span>
                        Resend code in <strong className="text-gray-800">{resendTimer}s</strong>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={isLoading}
                        className="text-[#6B722C] font-bold hover:underline cursor-pointer disabled:opacity-50"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Lower Section: High-Impact Gifting Promotional Banner */}
          <div className="relative w-full aspect-[4/3] sm:aspect-square shrink-0 overflow-hidden bg-gradient-to-b from-white via-pink-50/50 to-pink-100/60 border-t border-gray-100">
            {/* Banner Photo */}
            <Image
              src="/images/login_banner.jpg"
              alt="Send Gifts Anywhere, Everywhere"
              fill
              sizes="(max-width: 640px) 100vw, 448px"
              className="object-cover object-top"
              priority
            />

            {/* Gradient Overlay for Typography Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/80" />

            {/* Typography Overlay matching the Design */}
            <div className="absolute top-4 left-5 right-5">
              <h3 className="text-2xl sm:text-3xl font-black italic tracking-tight text-[#E63946] drop-shadow-xs">
                Send Gifts
              </h3>
              <p className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight leading-none mt-0.5">
                Anywhere, Everywhere!
              </p>
            </div>

            {/* T&C Apply note */}
            <div className="absolute bottom-3 left-4 text-[10px] text-white/90 font-semibold drop-shadow-md">
              *T&amp;C Apply
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
