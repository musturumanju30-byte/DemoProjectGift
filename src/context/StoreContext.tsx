"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Order, OrderStatus, Customer, TrackingStep } from "@/types";
import { INITIAL_PRODUCTS } from "@/data/products";
import { SERVICEABLE_PINCODES } from "@/data/locations";

interface StoreContextType {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  selectedDeliveryPincode: string;
  setSelectedDeliveryPincode: (pin: string) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  addProduct: (product: Omit<Product, "id">) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  createOrder: (orderData: {
    userId?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: Order["shippingAddress"];
    deliveryDate: string;
    deliverySlot: string;
    deliveryType: Order["deliveryType"];
    items: Order["items"];
    subtotal: number;
    discountAmount: number;
    couponCode?: string;
    deliveryFee: number;
    totalAmount: number;
    paymentMethod: Order["paymentMethod"];
    paymentStatus: Order["paymentStatus"];
    specialInstructions?: string;
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => Promise<void>;
  getOrderById: (orderIdOrNumber: string) => Order | undefined;
  getOrdersByPhone: (phone: string) => Order[];
  trackOrder: (orderIdOrNumber: string, phone?: string, userId?: string) => Promise<{ order: Order | null; error?: string }>;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-101",
    orderNumber: "CP-89241",
    userId: "cust-demo",
    createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    customerName: "Sai Teja",
    customerEmail: "saiteja.r@gmail.com",
    customerPhone: "9848012345",
    shippingAddress: {
      street: "Plot 14, Gandhi Road",
      area: "Near Clock Tower",
      landmark: "Opp. SBI Main Branch",
      city: "Repalle",
      district: "Bapatla",
      pincode: "522265",
      state: "Andhra Pradesh"
    },
    deliveryDate: new Date().toISOString().split("T")[0],
    deliverySlot: "Standard Evening (05:00 PM - 08:30 PM)",
    deliveryType: "same_day",
    items: [
      {
        cartItemId: "item-1",
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        unitPrice: 699,
        personalisation: {
          engravingText: "Rohit & Priya • Forever",
          selectedVariant: "Warm White Wood Base"
        }
      },
      {
        cartItemId: "item-2",
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
        unitPrice: 649,
        personalisation: {
          engravingText: "Happy Anniversary!",
          selectedVariant: "0.5 Kg (Serves 4-6) - Eggless"
        }
      }
    ],
    subtotal: 1348,
    discountAmount: 135,
    couponCode: "CREATIVE10",
    deliveryFee: 0,
    totalAmount: 1213,
    paymentMethod: "razorpay_upi",
    paymentStatus: "paid",
    orderStatus: "out_for_delivery",
    trackingHistory: [
      {
        status: "placed",
        title: "Order Placed & Confirmed",
        description: "Payment received via Razorpay UPI. Order assigned to Repalle studio team.",
        timestamp: "09:30 AM, Today",
        completed: true
      },
      {
        status: "processing",
        title: "Crafting & Personalisation",
        description: "Laser acrylic engraving and Dutch truffle cake freshly baked.",
        timestamp: "11:15 AM, Today",
        completed: true
      },
      {
        status: "shipped",
        title: "Quality Inspected & Dispatched",
        description: "Secure packaging with luxury ribbon finish.",
        timestamp: "02:45 PM, Today",
        completed: true
      },
      {
        status: "out_for_delivery",
        title: "Out for Same-Day Delivery",
        description: "Repalle express courier agent Krishna (+91 94401 23456) is on the way.",
        timestamp: "04:10 PM, Today",
        completed: true
      },
      {
        status: "delivered",
        title: "Delivered & Celebrated",
        description: "Handed over with smile and gift photo receipt.",
        timestamp: "Pending",
        completed: false
      }
    ]
  },
  {
    id: "ord-102",
    orderNumber: "CP-89242",
    userId: "cust-2",
    createdAt: new Date(Date.now() - 3600 * 1000 * 26).toISOString(),
    customerName: "Bhavana V.",
    customerEmail: "bhavana.v@outlook.com",
    customerPhone: "9177112233",
    shippingAddress: {
      street: "Main Beach Road",
      area: "Nizampatnam Harbor Area",
      city: "Nizampatnam",
      district: "Bapatla",
      pincode: "522264",
      state: "Andhra Pradesh"
    },
    deliveryDate: new Date(Date.now() - 3600 * 1000 * 20).toISOString().split("T")[0],
    deliverySlot: "Standard Afternoon (01:00 PM - 04:00 PM)",
    deliveryType: "same_day",
    items: [
      {
        cartItemId: "item-3",
        product: INITIAL_PRODUCTS[5],
        quantity: 1,
        unitPrice: 849,
        personalisation: {
          engravingText: "Happy 50th Birthday Amma!"
        }
      }
    ],
    subtotal: 849,
    discountAmount: 85,
    couponCode: "CREATIVE10",
    deliveryFee: 0,
    totalAmount: 764,
    paymentMethod: "razorpay_card",
    paymentStatus: "paid",
    orderStatus: "delivered",
    trackingHistory: [
      {
        status: "placed",
        title: "Order Placed",
        description: "Order confirmed.",
        timestamp: "Yesterday 10:00 AM",
        completed: true
      },
      {
        status: "delivered",
        title: "Delivered",
        description: "Successfully delivered in Nizampatnam.",
        timestamp: "Yesterday 03:30 PM",
        completed: true
      }
    ]
  }
];

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "cust-1",
    name: "Sai Teja",
    email: "saiteja.r@gmail.com",
    phone: "9848012345",
    totalOrders: 3,
    totalSpend: 3450,
    joinedDate: "2024-03-10",
    savedAddresses: [
      {
        id: "addr-1",
        type: "home",
        addressLine: "Plot 14, Gandhi Road, Opp. SBI",
        city: "Repalle",
        pincode: "522265"
      }
    ]
  },
  {
    id: "cust-2",
    name: "Bhavana V.",
    email: "bhavana.v@outlook.com",
    phone: "9177112233",
    totalOrders: 2,
    totalSpend: 1890,
    joinedDate: "2024-04-18"
  },
  {
    id: "cust-3",
    name: "Kalyan Chakravarthy",
    email: "kalyan.c@yahoo.com",
    phone: "9989554433",
    totalOrders: 1,
    totalSpend: 2199,
    joinedDate: "2024-05-02"
  }
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [selectedDeliveryPincode, setSelectedDeliveryPincode] = useState<string>("522265");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load stored state on mount
  useEffect(() => {
    try {
      const CATALOG_VERSION = "2.2";
      const storedCatalogVersion = localStorage.getItem("cp_catalog_version");
      const storedProducts = localStorage.getItem("cp_products");

      if (storedCatalogVersion !== CATALOG_VERSION) {
        // Upgrade stored catalog so all default products use verified working images
        let mergedProducts = INITIAL_PRODUCTS;
        if (storedProducts) {
          try {
            const parsed = JSON.parse(storedProducts);
            if (Array.isArray(parsed)) {
              const initialIds = new Set(INITIAL_PRODUCTS.map(p => p.id));
              const customAdminProducts = parsed.filter((p: Product) => !initialIds.has(p.id));
              mergedProducts = [...INITIAL_PRODUCTS, ...customAdminProducts];
            }
          } catch (e) {
            console.error("Error parsing existing products during catalog migration:", e);
          }
        }
        localStorage.setItem("cp_products", JSON.stringify(mergedProducts));
        localStorage.setItem("cp_catalog_version", CATALOG_VERSION);
        setProducts(mergedProducts);
      } else if (storedProducts) {
        const parsed = JSON.parse(storedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }

      const storedOrders = localStorage.getItem("cp_orders");
      if (storedOrders) {
        const parsed = JSON.parse(storedOrders);
        if (Array.isArray(parsed)) {
          // Purge legacy static placeholder orders (ord-101, ord-102, CP-89241)
          const cleanOrders = parsed.filter(
            (o: Order) =>
              o.id !== "ord-101" &&
              o.id !== "ord-102" &&
              o.orderNumber !== "CP-89241" &&
              o.orderNumber !== "CP-89242"
          );
          setOrders(cleanOrders);
          localStorage.setItem("cp_orders", JSON.stringify(cleanOrders));
        }
      }

      const storedWishlist = localStorage.getItem("cp_wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }

      const storedPin = localStorage.getItem("cp_delivery_pin");
      if (storedPin) {
        setSelectedDeliveryPincode(storedPin);
      }
    } catch (err) {
      console.error("Failed to load local storage:", err);
    } finally {
      setIsInitialized(true);
    }

    // Fetch cloud orders from Supabase via /api/orders (filtered by logged-in customer for data privacy)
    let userEmail = "";
    let userId = "";
    let isAdmin = false;
    try {
      const rawUser = localStorage.getItem("cp_user");
      if (rawUser) {
        const u = JSON.parse(rawUser);
        isAdmin = u.role === "admin";
        userEmail = u.email || "";
        userId = u.id || "";
      }
    } catch {}

    const apiUrl =
      !isAdmin && userEmail
        ? `/api/orders?email=${encodeURIComponent(userEmail)}&userId=${encodeURIComponent(userId)}`
        : "/api/orders";

    fetch(apiUrl)
      .then(r => r.json())
      .then(data => {
        if (data && Array.isArray(data.orders)) {
          setOrders(prev => {
            const cloudIds = new Set(data.orders.map((o: Order) => o.id));
            const localOnly = prev.filter(o => !cloudIds.has(o.id));
            const combined = [...data.orders, ...localOnly];
            localStorage.setItem("cp_orders", JSON.stringify(combined));
            return combined;
          });
        }
      })
      .catch(err => console.warn("Background orders sync:", err));

    // Real-time multi-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      try {
        if (e.key === "cp_products" && e.newValue) {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setProducts(parsed);
        }
        if (e.key === "cp_orders" && e.newValue) {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setOrders(parsed);
        }
        if (e.key === "cp_customers" && e.newValue) {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setCustomers(parsed);
        }
        if (e.key === "cp_wishlist" && e.newValue) {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setWishlist(parsed);
        }
      } catch (err) {
        console.error("Storage sync parse error:", err);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("cp_products", JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("cp_orders", JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("cp_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist, isInitialized]);

  const handleSetDeliveryPincode = (pin: string) => {
    setSelectedDeliveryPincode(pin);
    localStorage.setItem("cp_delivery_pin", pin);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const addProduct = (prodData: Omit<Product, "id">): Product => {
    const newProduct: Product = {
      ...prodData,
      id: "prod-" + Date.now()
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const createOrder = async (orderData: {
    userId?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: Order["shippingAddress"];
    deliveryDate: string;
    deliverySlot: string;
    deliveryType: Order["deliveryType"];
    items: Order["items"];
    subtotal: number;
    discountAmount: number;
    couponCode?: string;
    deliveryFee: number;
    totalAmount: number;
    paymentMethod: Order["paymentMethod"];
    paymentStatus: Order["paymentStatus"];
    specialInstructions?: string;
  }): Promise<Order> => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `CP-${randomNum}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      userId: orderData.userId,
      createdAt: new Date().toISOString(),
      ...orderData,
      orderStatus: "placed",
      trackingHistory: [
        {
          status: "placed",
          title: "Order Placed & Confirmed",
          description:
            "Payment confirmed via " +
            orderData.paymentMethod.replace("_", " ").toUpperCase() +
            ". Transferred to Repalle studio team.",
          timestamp: "Just now",
          completed: true,
        },
        {
          status: "processing",
          title: "Crafting & Personalisation",
          description: "Our artisans in Repalle are preparing and customising your gift.",
          timestamp: "Estimated today",
          completed: false,
        },
        {
          status: "shipped",
          title: "Quality Check & Handover to Dispatch",
          description: "Premium gift wrap and safety packaging completed.",
          timestamp: "Upcoming",
          completed: false,
        },
        {
          status: "out_for_delivery",
          title: "Out for Delivery",
          description:
            "Delivery executive en route to " +
            orderData.shippingAddress.area +
            ", " +
            orderData.shippingAddress.city,
          timestamp: "Scheduled for " + orderData.deliveryDate,
          completed: false,
        },
        {
          status: "delivered",
          title: "Delivered",
          description: "Handed over with festive celebration message.",
          timestamp: "Expected " + orderData.deliveryDate,
          completed: false,
        },
      ],
    };

    setOrders(prev => [newOrder, ...prev]);

    // Send order to Supabase /api/orders
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
    } catch (apiErr) {
      console.warn("Could not sync order to /api/orders:", apiErr);
    }

    // Update or add customer record
    setCustomers(prev => {
      const existing = prev.find(
        c => c.phone === orderData.customerPhone || c.email === orderData.customerEmail
      );
      if (existing) {
        return prev.map(c =>
          c.id === existing.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpend: c.totalSpend + orderData.totalAmount,
              }
            : c
        );
      } else {
        return [
          {
            id: `cust-${Date.now()}`,
            name: orderData.customerName,
            email: orderData.customerEmail,
            phone: orderData.customerPhone,
            totalOrders: 1,
            totalSpend: orderData.totalAmount,
            joinedDate: new Date().toISOString().split("T")[0],
          },
          ...prev,
        ];
      }
    });

    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus, note?: string) => {
    const statusOrder: OrderStatus[] = [
      "placed",
      "processing",
      "shipped",
      "out_for_delivery",
      "delivered",
    ];
    const targetIdx = statusOrder.indexOf(status);

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;

        const updatedHistory = ord.trackingHistory.map(step => {
          const stepIdx = statusOrder.indexOf(step.status);
          const isPastOrCurrent = targetIdx >= 0 && stepIdx >= 0 && stepIdx <= targetIdx;

          if (step.status === status) {
            return {
              ...step,
              completed: true,
              timestamp:
                "Updated at " +
                new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              description: note || step.description,
            };
          } else if (isPastOrCurrent) {
            return {
              ...step,
              completed: true,
            };
          }
          return step;
        });

        return {
          ...ord,
          orderStatus: status,
          trackingHistory: updatedHistory,
        };
      })
    );

    // Sync status change to Supabase /api/orders
    try {
      await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status, note }),
      });
    } catch (err) {
      console.warn("Could not sync status update to /api/orders:", err);
    }
  };

  const getOrderById = (orderIdOrNumber: string) => {
    const clean = orderIdOrNumber.trim().toLowerCase();
    return orders.find(
      o => o.id.toLowerCase() === clean || o.orderNumber.toLowerCase() === clean
    );
  };

  const getOrdersByPhone = (phone: string) => {
    const clean = phone.trim().replace(/\D/g, "");
    return orders.filter(o => o.customerPhone.replace(/\D/g, "").includes(clean));
  };

  /**
   * Secure order tracking:
   * - Logged-in: verifies order belongs to user
   * - Guest: requires Order ID + phone number to match
   */
  const trackOrder = async (
    orderIdOrNumber: string,
    phone?: string,
    userId?: string
  ): Promise<{ order: Order | null; error?: string }> => {
    const cleanId = orderIdOrNumber.trim().toUpperCase();
    const cleanPhone = (phone || "").trim().replace(/\D/g, "");

    // 1. Check local state first
    const localMatch = orders.find(
      o => o.orderNumber.toUpperCase() === cleanId || o.id.toUpperCase() === cleanId
    );

    if (localMatch) {
      if (userId) {
        let currentEmail = "";
        try {
          const raw = localStorage.getItem("cp_user");
          if (raw) currentEmail = (JSON.parse(raw).email || "").toLowerCase();
        } catch {}

        const isOwner =
          localMatch.userId === userId ||
          (currentEmail && localMatch.customerEmail.toLowerCase() === currentEmail);

        if (isOwner) return { order: localMatch };
      } else {
        // Guest: MUST provide valid phone matching the order
        if (!cleanPhone || cleanPhone.length < 10) {
          return {
            order: null,
            error: "Please enter both your Order ID and 10-digit mobile number.",
          };
        }
        const orderPhone = localMatch.customerPhone.replace(/\D/g, "");
        if (
          orderPhone === cleanPhone ||
          orderPhone.endsWith(cleanPhone) ||
          cleanPhone.endsWith(orderPhone)
        ) {
          return { order: localMatch };
        }
        return {
          order: null,
          error: "Order not found — please check your Order ID and mobile number.",
        };
      }
    }

    // 2. Query server API / Supabase
    try {
      let url = `/api/orders?orderNumber=${encodeURIComponent(cleanId)}`;
      if (userId) {
        url += `&userId=${encodeURIComponent(userId)}`;
      } else if (cleanPhone) {
        url += `&phone=${encodeURIComponent(cleanPhone)}`;
      } else {
        return {
          order: null,
          error: "Please enter both your Order ID and 10-digit mobile number.",
        };
      }

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok || data.error) {
        return {
          order: null,
          error: data.error || "Order not found — please check your Order ID or mobile number.",
        };
      }

      if (data.order) {
        setOrders(prev => {
          if (!prev.find(o => o.id === data.order.id)) {
            return [data.order, ...prev];
          }
          return prev.map(o => (o.id === data.order.id ? data.order : o));
        });
        return { order: data.order };
      }

      return {
        order: null,
        error: "Order not found — please check your Order ID or mobile number.",
      };
    } catch (e) {
      console.warn("Error tracking order via API:", e);
      return {
        order: null,
        error: "Could not retrieve order details. Please verify your details or try again.",
      };
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        customers,
        selectedDeliveryPincode,
        setSelectedDeliveryPincode: handleSetDeliveryPincode,
        wishlist,
        toggleWishlist,
        isWishlisted,
        addProduct,
        updateProduct,
        deleteProduct,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getOrdersByPhone,
        trackOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within a StoreProvider");
  return context;
};
