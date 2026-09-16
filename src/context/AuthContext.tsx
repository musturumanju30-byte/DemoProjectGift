"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  provider?: "google" | "email" | "demo";
  role: "customer" | "admin";
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, role?: "customer" | "admin") => Promise<void>;
  loginWithGoogle: (redirectPath?: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  loginAsDemoCustomer: () => void;
  loginAsAdmin: () => void;
  signup: (name: string, email: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // 1. Initial hydration from localStorage
    try {
      const savedUser = localStorage.getItem("cp_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        // Clear old dummy phone placeholder if present
        if (parsed.phone === "9848012345" && parsed.id !== "cust-demo") {
          parsed.phone = "";
          localStorage.setItem("cp_user", JSON.stringify(parsed));
        }
        setUser(parsed);
      }
    } catch (e) {
      console.error("Failed to load user from localStorage:", e);
    } finally {
      setIsLoading(false);
    }

    // 2. Listen to real Supabase auth state changes (e.g. after Google OAuth redirect)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const u = session.user;
        const meta = u.user_metadata || {};
        const fullName =
          meta.full_name ||
          meta.name ||
          (u.email ? u.email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase()) : "Customer");

        const authUser: AuthUser = {
          id: u.id,
          name: fullName,
          email: (u.email || "").toLowerCase(),
          phone: u.phone || meta.phone || "",
          avatarUrl: meta.avatar_url || meta.picture,
          provider: "google",
          role: "customer",
        };

        setUser(authUser);
        localStorage.setItem("cp_user", JSON.stringify(authUser));

        // Sync customer record to Supabase database if configured
        if (isSupabaseConfigured) {
          try {
            await supabase.from("customers").upsert(
              {
                id: u.id,
                name: authUser.name,
                email: authUser.email,
                avatar_url: authUser.avatarUrl,
                phone: authUser.phone,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "id" }
            );
          } catch (dbErr) {
            console.warn("Could not sync customer to database table:", dbErr);
          }
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        localStorage.removeItem("cp_user");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const login = async (email: string, role: "customer" | "admin" = "customer") => {
    const formattedName = email
      .split("@")[0]
      .replace(/[._]/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

    const newUser: AuthUser = {
      id: `usr-${Date.now()}`,
      name: formattedName || "Customer",
      email: email.trim().toLowerCase(),
      phone: "",
      provider: "email",
      role,
    };
    setUser(newUser);
    localStorage.setItem("cp_user", JSON.stringify(newUser));
    closeAuthModal();
  };

  /**
   * Real Google OAuth 2.0 flow via Supabase
   * Triggers Google's real hosted sign-in flow at accounts.google.com
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

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    if (otp.trim().length === 4 || otp.trim().length === 6) {
      await login(email);
      return true;
    }
    return false;
  };

  const loginAsDemoCustomer = () => {
    const demoCustomer: AuthUser = {
      id: "cust-demo",
      name: "Sai Teja",
      email: "saiteja.repalle@gmail.com",
      phone: "9848012345",
      provider: "demo",
      role: "customer",
    };
    setUser(demoCustomer);
    localStorage.setItem("cp_user", JSON.stringify(demoCustomer));
    closeAuthModal();
  };

  const loginAsAdmin = () => {
    const adminUser: AuthUser = {
      id: "admin-master",
      name: "Creative Paradise Admin",
      email: "admin@repallgifts.com",
      phone: "9177003905",
      provider: "email",
      role: "admin",
    };
    setUser(adminUser);
    localStorage.setItem("cp_user", JSON.stringify(adminUser));
    closeAuthModal();
  };

  const signup = async (name: string, email: string, phone: string) => {
    const newUser: AuthUser = {
      id: `usr-${Date.now()}`,
      name,
      email: email.trim().toLowerCase(),
      phone,
      provider: "email",
      role: "customer",
    };
    setUser(newUser);
    localStorage.setItem("cp_user", JSON.stringify(newUser));
    closeAuthModal();
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("cp_user");
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Error during Supabase signOut:", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === "admin",
        isLoading,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        login,
        loginWithGoogle,
        verifyOtp,
        loginAsDemoCustomer,
        loginAsAdmin,
        signup,
        logout,
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
