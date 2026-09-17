"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  provider?: "google" | "email" | "demo";
  role: "customer" | "admin";
}

interface AuthResponse {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  isDemoMode: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  sendEmailOtp: (email: string) => Promise<AuthResponse>;
  verifyOtp: (email: string, otp: string) => Promise<AuthResponse>;
  signInWithPassword: (email: string, password: string) => Promise<AuthResponse>;
  signUpWithPassword: (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => Promise<AuthResponse>;
  loginWithGoogle: (redirectPath?: string) => Promise<void>;
  loginAsDemoCustomer: () => void;
  loginAsAdmin: () => void;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo mode is strictly restricted to development/preview environments
const IS_DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  /**
   * Securely loads profile and verified role from Supabase database `public.profiles`.
   * Never relies on client-provided or localStorage role values.
   */
  const loadVerifiedUserProfile = useCallback(
    async (sbUser: SupabaseUser): Promise<AuthUser> => {
      const meta = sbUser.user_metadata || {};
      const fallbackName =
        meta.full_name ||
        meta.name ||
        (sbUser.email
          ? sbUser.email
              .split("@")[0]
              .replace(/[._]/g, " ")
              .replace(/\b\w/g, c => c.toUpperCase())
          : "Customer");

      let verifiedRole: "customer" | "admin" = "customer";
      let profileName = fallbackName;
      let profilePhone = sbUser.phone || meta.phone || "";
      let profileAvatar = meta.avatar_url || meta.picture || "";

      if (isSupabaseConfigured) {
        try {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("role, name, phone, avatar_url")
            .eq("id", sbUser.id)
            .maybeSingle();

          if (profile && !error) {
            if (profile.role === "admin") {
              verifiedRole = "admin";
            }
            if (profile.name) profileName = profile.name;
            if (profile.phone) profilePhone = profile.phone;
            if (profile.avatar_url) profileAvatar = profile.avatar_url;
          } else if (!error && !profile) {
            // Table exists, but no profile row for this user yet -> initialize customer profile
            try {
              await supabase.from("profiles").upsert(
                {
                  id: sbUser.id,
                  email: (sbUser.email || "").toLowerCase(),
                  name: fallbackName,
                  avatar_url: profileAvatar,
                  phone: profilePhone,
                  role: "customer",
                  updated_at: new Date().toISOString(),
                },
                { onConflict: "id" }
              );
            } catch (upsertErr) {
              console.warn("Could not initialize profile record:", upsertErr);
            }
          } else if (error) {
            // Table does not exist in Supabase yet -> do not attempt upsert, log informative notice
            console.warn(
              "Notice: Could not load user profile from Supabase 'profiles' table. " +
                "Please execute section 4 in supabase/schema.sql in your Supabase SQL Editor to enable database profiles. " +
                `(${error.message || error.code || "Table not found"})`
            );
          }
        } catch (dbErr) {
          console.warn("Could not query profiles table for role:", dbErr);
        }
      }

      const verifiedUser: AuthUser = {
        id: sbUser.id,
        name: profileName,
        email: (sbUser.email || "").toLowerCase(),
        phone: profilePhone,
        avatarUrl: profileAvatar,
        provider: sbUser.app_metadata?.provider === "google" ? "google" : "email",
        role: verifiedRole,
      };

      return verifiedUser;
    },
    []
  );

  // Synchronize auth state on mount and subscribe to Supabase Auth events
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        if (!isSupabaseConfigured) {
          // If demo user was set in local dev, allow only when DEMO mode is enabled
          if (IS_DEMO_MODE) {
            const saved = localStorage.getItem("cp_user_demo");
            if (saved && isMounted) {
              setUser(JSON.parse(saved));
            }
          }
          return;
        }

        // 1. Check live session from Supabase (Source of Truth)
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user && isMounted) {
          const verifiedUser = await loadVerifiedUserProfile(session.user);
          if (isMounted) {
            setUser(verifiedUser);
          }
        } else if (IS_DEMO_MODE) {
          // Demo fallback in dev environment
          const savedDemo = localStorage.getItem("cp_user_demo");
          if (savedDemo && isMounted) {
            setUser(JSON.parse(savedDemo));
          }
        }
      } catch (err) {
        console.error("Failed to initialize auth session:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    // 2. Listen to real Supabase auth state changes (OAuth redirect, OTP verify, password, sign out)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      if (session?.user) {
        const verifiedUser = await loadVerifiedUserProfile(session.user);
        if (isMounted) {
          setUser(verifiedUser);
          setIsLoading(false);
        }
      } else if (event === "SIGNED_OUT") {
        if (isMounted) {
          setUser(null);
          setIsLoading(false);
          localStorage.removeItem("cp_user_demo");
          localStorage.removeItem("cp_user");
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [loadVerifiedUserProfile]);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const refreshProfile = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const verified = await loadVerifiedUserProfile(session.user);
        setUser(verified);
      }
    } catch (e) {
      console.warn("Could not refresh profile:", e);
    }
  };

  /**
   * Real Supabase Email OTP: sends a secure 6-digit one-time passcode to the user's inbox
   */
  const sendEmailOtp = async (email: string): Promise<AuthResponse> => {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: "Supabase credentials are not configured. Please check environment variables.",
      };
    }

    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) {
        if (
          error.message?.toLowerCase().includes("error sending") ||
          error.status === 500 ||
          error.name === "AuthApiError"
        ) {
          return {
            success: false,
            error:
              "Supabase email service error: Either Custom SMTP was enabled with unverified credentials, or Supabase's default rate limit (3 emails/hour) was reached. Try 'Continue with Google' or check your Supabase SMTP settings.",
          };
        }
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send verification code.";
      return { success: false, error: message };
    }
  };

  /**
   * Real Supabase OTP Verification: Validates the 6-digit token against Supabase Auth.
   * Fails genuinely if code is invalid, expired, or wrong.
   */
  const verifyOtp = async (email: string, otp: string): Promise<AuthResponse> => {
    if (!isSupabaseConfigured) {
      return { success: false, error: "Supabase credentials are not configured." };
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: otp.trim(),
        type: "email",
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        const verified = await loadVerifiedUserProfile(data.user);
        setUser(verified);
      }

      closeAuthModal();
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to verify OTP token.";
      return { success: false, error: message };
    }
  };

  /**
   * Real Supabase Password Sign-In (Used for Admin Portal & Customer Login)
   */
  const signInWithPassword = async (email: string, password: string): Promise<AuthResponse> => {
    if (!isSupabaseConfigured) {
      return { success: false, error: "Supabase credentials are not configured." };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        const verified = await loadVerifiedUserProfile(data.user);
        setUser(verified);
      }

      closeAuthModal();
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign in failed.";
      return { success: false, error: message };
    }
  };

  /**
   * Real Supabase Sign-Up with Email & Password
   */
  const signUpWithPassword = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<AuthResponse> => {
    if (!isSupabaseConfigured) {
      return { success: false, error: "Supabase credentials are not configured." };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: name.trim(),
            name: name.trim(),
            phone: phone?.trim() || "",
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        const verified = await loadVerifiedUserProfile(data.user);
        setUser(verified);
      }

      closeAuthModal();
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign up failed.";
      return { success: false, error: message };
    }
  };

  /**
   * Real Google OAuth 2.0 flow via Supabase
   */
  const loginWithGoogle = async (redirectPath: string = "/account") => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(redirectPath)}`;

    if (!isSupabaseConfigured) {
      throw new Error("SUPABASE_NOT_CONFIGURED");
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        scopes: "email profile openid",
        queryParams: {
          access_type: "offline",
          prompt: "select_account",
        },
      },
    });

    if (error) {
      throw error;
    }
  };

  /**
   * Demo Customer Login: Strictly gated behind NEXT_PUBLIC_DEMO_MODE=true.
   * Completely disabled in live production.
   */
  const loginAsDemoCustomer = () => {
    if (!IS_DEMO_MODE) {
      console.warn("Demo customer login is disabled in production environments.");
      return;
    }

    const demoCustomer: AuthUser = {
      id: "cust-demo",
      name: "Sai Teja",
      email: "saiteja.repalle@gmail.com",
      phone: "9848012345",
      provider: "demo",
      role: "customer",
    };
    setUser(demoCustomer);
    localStorage.setItem("cp_user_demo", JSON.stringify(demoCustomer));
    closeAuthModal();
  };

  /**
   * Demo Admin Login: Strictly gated behind NEXT_PUBLIC_DEMO_MODE=true.
   * Completely disabled in live production.
   */
  const loginAsAdmin = () => {
    if (!IS_DEMO_MODE) {
      console.warn("Demo admin login is disabled in production environments.");
      return;
    }

    const demoAdmin: AuthUser = {
      id: "admin-master",
      name: "Creative Paradise Admin",
      email: "admin@repallgifts.com",
      phone: "9177003905",
      provider: "demo",
      role: "admin",
    };
    setUser(demoAdmin);
    localStorage.setItem("cp_user_demo", JSON.stringify(demoAdmin));
    closeAuthModal();
  };

  /**
   * Proper Logout Flow: Invalidates the Supabase session first, then resets client state
   */
  const logout = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.warn("Error during Supabase signOut:", e);
    } finally {
      setUser(null);
      localStorage.removeItem("cp_user_demo");
      localStorage.removeItem("cp_user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === "admin",
        isLoading,
        isAuthModalOpen,
        isDemoMode: IS_DEMO_MODE,
        openAuthModal,
        closeAuthModal,
        sendEmailOtp,
        verifyOtp,
        signInWithPassword,
        signUpWithPassword,
        loginWithGoogle,
        loginAsDemoCustomer,
        loginAsAdmin,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
