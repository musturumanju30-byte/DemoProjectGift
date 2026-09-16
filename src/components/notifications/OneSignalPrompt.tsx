"use client";

import React, { useState, useEffect } from "react";
import { Bell, X, Sparkles } from "lucide-react";

export const OneSignalPrompt: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed before
    const isDismissed = localStorage.getItem("cp_push_dismissed");
    if (isDismissed) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8500); // 8.5 seconds delay matching prompt

    return () => clearTimeout(timer);
  }, []);

  const handleAllow = async () => {
    localStorage.setItem("cp_push_dismissed", "allowed");
    setIsVisible(false);

    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        await Notification.requestPermission();
      } catch (err) {
        console.log("Notification permission prompt:", err);
      }
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("cp_push_dismissed", "dismissed");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300 px-4 sm:px-0">
      <div className="relative rounded-2xl bg-white p-5 shadow-2xl border border-gray-100">
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 p-1"
          aria-label="Close notification prompt"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3.5">
          <div className="h-11 w-11 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-[#F72585] shrink-0">
            <Bell className="h-5 w-5" />
          </div>

          <div className="flex-1 pr-4">
            <h3 className="text-base font-extrabold text-[#0A0A0A] leading-tight flex items-center gap-1.5">
              Stay Updated! <Sparkles className="h-3.5 w-3.5 text-[#C9A227]" />
            </h3>
            <p className="mt-1 text-xs text-gray-600 leading-relaxed">
              Get notified about new personalised gifts, same-day offers, and order updates.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2.5 pt-2">
          <button
            onClick={handleDismiss}
            className="rounded-xl bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200 transition"
          >
            No, Thanks
          </button>
          <button
            onClick={handleAllow}
            className="rounded-xl bg-[#F72585] px-5 py-2 text-xs font-bold text-white hover:bg-[#d6136c] shadow-md hover:shadow-pink-500/25 transition active:scale-95"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
};
