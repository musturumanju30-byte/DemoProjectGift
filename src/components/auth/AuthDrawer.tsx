"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Mail, Lock, Edit3, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { GoogleIcon } from "@/components/common/Icons";

export const AuthDrawer: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle, verifyOtp } = useAuth();

  const [step, setStep] = useState<"input" | "otp">("input");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isAuthModalOpen) {
      setStep("input");
      setError("");
      setIsLoading(false);
      setIsGoogleLoading(false);
      setOtp(["", "", "", ""]);
      setResendTimer(30);
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

  const handleContinue = (e: React.FormEvent) => {
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
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setResendTimer(30);
    }, 400);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
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
    const otpCode = otp.join("");
    if (otpCode.length < 4) {
      setError("Please enter the 4-digit verification code");
      return;
    }

    setIsLoading(true);
    const success = await verifyOtp(email, otpCode);
    setIsLoading(false);

    if (!success) {
      setError("Invalid OTP code. Use test code 1234");
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
                    Sign Up/Login to Creative Paradise!
                  </h2>
                  <p className="text-xs text-gray-500 mt-1.5 font-normal">
                    For a personalized experience &amp; faster checkout
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
                      "Continue"
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

            {/* Step 2: OTP Verification Code */}
            {step === "otp" && (
              <div className="animate-in fade-in">
                <div className="text-center">
                  <div className="h-11 w-11 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#F72585] mx-auto mb-3">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Enter Verification Code</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    We sent a 4-digit code to <strong className="text-gray-800">{email}</strong>
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep("input")}
                    className="inline-flex items-center gap-1 text-[11px] text-[#F72585] font-semibold hover:underline mt-1 cursor-pointer"
                  >
                    <Edit3 className="h-3 w-3" /> Change email
                  </button>
                </div>

                <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
                  <div className="flex justify-center gap-3">
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
                        className="h-12 w-12 rounded-xl border border-gray-300 text-center text-lg font-bold text-gray-900 focus:border-[#6B722C] focus:ring-2 focus:ring-[#6B722C]/20 focus:outline-none transition shadow-2xs"
                        autoFocus={idx === 0}
                      />
                    ))}
                  </div>

                  {error && (
                    <p className="text-xs text-center text-red-600 font-medium">{error}</p>
                  )}

                  {/* Autofill Demo Helper */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setOtp(["1", "2", "3", "4"])}
                      className="text-[11px] text-gray-500 hover:text-[#6B722C] underline cursor-pointer"
                    >
                      (Click to auto-fill test code: 1234)
                    </button>
                  </div>

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
                      <span>Resend code in <strong className="text-gray-800">{resendTimer}s</strong></span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setResendTimer(30);
                          setOtp(["", "", "", ""]);
                        }}
                        className="text-[#6B722C] font-bold hover:underline cursor-pointer"
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
              className="object-cover object-top"
              priority
            />

            {/* Gradient Overlay for Typography Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/80" />

            {/* Typography Overlay matching the Screenshot */}
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
