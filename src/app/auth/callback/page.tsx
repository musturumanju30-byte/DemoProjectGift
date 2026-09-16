"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [statusMessage, setStatusMessage] = useState("Completing secure sign-in with Google...");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const processOAuthCallback = async () => {
      const error = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");
      const next = searchParams.get("next") || "/account";

      if (error) {
        const friendlyError =
          errorDescription ||
          (error === "access_denied"
            ? "Google sign-in was cancelled. Please try again."
            : `Authentication error: ${error}`);

        if (isMounted) setErrorMessage(friendlyError);
        setTimeout(() => {
          router.replace(`/account?error=${encodeURIComponent(friendlyError)}`);
        }, 1500);
        return;
      }

      try {
        // Retrieve and validate session from Supabase
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (session) {
          if (isMounted) setStatusMessage("Signed in successfully! Redirecting...");
          router.replace(next);
        } else {
          // Allow Supabase listener to finish token exchange if running concurrently
          const timer = setTimeout(async () => {
            const {
              data: { session: retrySession },
            } = await supabase.auth.getSession();
            if (retrySession) {
              if (isMounted) setStatusMessage("Signed in successfully! Redirecting...");
              router.replace(next);
            } else {
              router.replace(next);
            }
          }, 800);
          return () => clearTimeout(timer);
        }
      } catch (err: unknown) {
        console.error("Auth callback error:", err);
        const errMsg = err instanceof Error ? err.message : "Google sign-in failed. Please try again.";
        if (isMounted) setErrorMessage(errMsg);
        setTimeout(() => {
          router.replace(`/account?error=${encodeURIComponent(errMsg)}`);
        }, 1500);
      }
    };

    processOAuthCallback();

    return () => {
      isMounted = false;
    };
  }, [router, searchParams]);

  return (
    <div className="w-full min-h-[75vh] flex flex-col items-center justify-center p-6 text-center bg-gray-50/50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 flex flex-col items-center">
        {errorMessage ? (
          <>
            <div className="h-14 w-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-4">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-gray-900">Sign-In Failed</h2>
            <p className="text-xs text-red-600 mt-2 max-w-xs">{errorMessage}</p>
            <p className="text-[11px] text-gray-400 mt-4">Redirecting back to login...</p>
          </>
        ) : (
          <>
            <div className="relative h-14 w-14 flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-full border-3 border-[#6B722C] border-t-transparent animate-spin" />
            </div>
            <h2 className="text-base font-bold text-gray-900">{statusMessage}</h2>
            <p className="text-xs text-gray-500 mt-2 max-w-xs leading-relaxed">
              Verifying your Google identity and establishing your secure session with Creative Paradise.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[75vh] flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-3 border-[#6B722C] border-t-transparent animate-spin" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
