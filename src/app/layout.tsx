import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AuthDrawer } from "@/components/auth/AuthDrawer";
import { OneSignalPrompt } from "@/components/notifications/OneSignalPrompt";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creative Paradise Gift Store — Personalised Gifts & Flowers in Repalle, AP",
  description:
    "Repalle's favorite gift store (@repalle_gifts). 3D LED illusion lamps, laser wooden portraits, fresh Dutch roses, handcrafted cakes, and luxury hampers with 2-hour express same-day delivery across Coastal Andhra Pradesh.",
  keywords: [
    "Repalle gifts",
    "Creative Paradise",
    "repalle_gifts",
    "same day delivery repalle",
    "personalised gifts coastal AP",
    "cakes in repalle",
    "flowers delivery repalle",
    "wooden engraving repalle",
    "3d led lamp",
  ],
  openGraph: {
    title: "Creative Paradise Gift Store — Personalised Gifts & Same-Day Delivery in Repalle",
    description: "Laser-engraved acrylic lamps, wooden portraits, fresh roses & designer cakes delivered same-day in Repalle & Coastal AP.",
    url: "https://creativeparadise.vercel.app",
    siteName: "Creative Paradise Gift Store",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full w-full antialiased font-sans`}>
      <body className="min-h-full w-full flex flex-col bg-white text-gray-900 selection:bg-pink-100 selection:text-[#F72585]">
        <StoreProvider>
          <CartProvider>
            <AuthProvider>
              <Header />
              <main className="flex-1 w-full min-w-0">{children}</main>
              <CartDrawer />
              <AuthDrawer />
              <OneSignalPrompt />
              <Footer />
            </AuthProvider>
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
