"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Product, CartItem, PersonalisationData } from "@/types";
import { AVAILABLE_COUPONS, PromoCoupon } from "@/data/locations";
import { useStore } from "./StoreContext";

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number, personalisation?: PersonalisationData, variantDelta?: number) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  appliedCoupon: PromoCoupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<PromoCoupon | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { selectedDeliveryPincode } = useStore();

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cp_cart_items");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem("cp_applied_coupon");
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("cp_cart_items", JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem("cp_applied_coupon", JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem("cp_applied_coupon");
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon, isInitialized]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    personalisation?: PersonalisationData,
    variantDelta: number = 0
  ) => {
    const finalUnitPrice = product.price + variantDelta;
    const cartItemId = `${product.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newItem: CartItem = {
      cartItemId,
      product,
      quantity,
      personalisation,
      unitPrice: finalUnitPrice,
    };

    setItems(prev => [newItem, ...prev]);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const discount = useMemo(() => {
    if (!appliedCoupon || subtotal < appliedCoupon.minOrder) return 0;

    if (appliedCoupon.discountType === "percentage") {
      const calc = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      return appliedCoupon.maxDiscount ? Math.min(calc, appliedCoupon.maxDiscount) : calc;
    } else {
      return Math.min(appliedCoupon.discountValue, subtotal);
    }
  }, [appliedCoupon, subtotal]);

  const deliveryFee = useMemo(() => {
    if (subtotal === 0) return 0;
    if (appliedCoupon?.code === "SAMEDAYFREE") return 0;
    // Free delivery in Repalle for orders above 499
    if (subtotal >= 499) return 0;
    return 60;
  }, [subtotal, appliedCoupon]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount + deliveryFee);
  }, [subtotal, discount, deliveryFee]);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find(c => c.code === cleanCode);

    if (!found) {
      return { success: false, message: "Invalid coupon code. Try CREATIVE10 or REPALLE300" };
    }

    if (subtotal < found.minOrder) {
      return {
        success: false,
        message: `Add items worth ₹${found.minOrder - subtotal} more to apply code ${found.code}`,
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        deliveryFee,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
