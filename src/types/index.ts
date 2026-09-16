export type CategorySlug = 
  | "personalised-gifts"
  | "cakes"
  | "flowers"
  | "hampers"
  | "plants"
  | "home-decor"
  | "same-day"
  | "combos";

export type OccasionType = 
  | "birthday"
  | "anniversary"
  | "wedding"
  | "love-romance"
  | "congratulations"
  | "festival";

export type RecipientType =
  | "him"
  | "her"
  | "kids"
  | "friend"
  | "couple"
  | "parents";

export type FeelingType =
  | "love-romance"
  | "thank-you"
  | "miss-you"
  | "sorry"
  | "congratulations";

export interface PersonalisationFieldConfig {
  requireEngravingText?: boolean;
  engravingPlaceholder?: string;
  engravingMaxChars?: number;
  requirePhotoUpload?: boolean;
  photoUploadLabel?: string;
  requireMessageNote?: boolean;
  variants?: {
    name: string;
    options: { label: string; priceDelta?: number }[];
  }[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  category: CategorySlug;
  categoryName: string;
  subcategory?: string;
  occasions: OccasionType[];
  recipients: RecipientType[];
  feelings?: FeelingType[];
  tags: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isBestseller: boolean;
  isSameDay: boolean;
  isPersonalised: boolean;
  personalisationConfig?: PersonalisationFieldConfig;
  features?: string[];
  dimensions?: string;
  careInstructions?: string;
}

export interface PersonalisationData {
  engravingText?: string;
  messageCardNote?: string;
  photoUrl?: string;
  photoName?: string;
  selectedVariant?: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  personalisation?: PersonalisationData;
  unitPrice: number;
}

export type OrderStatus = "placed" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface TrackingStep {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    area: string;
    landmark?: string;
    city: string;
    district: string;
    pincode: string;
    state: string;
  };
  deliveryDate: string;
  deliverySlot: string;
  deliveryType: "same_day" | "express_2hr" | "midnight" | "standard";
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: "razorpay_upi" | "razorpay_card" | "razorpay_netbanking" | "cod";
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingHistory: TrackingStep[];
  specialInstructions?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpend: number;
  joinedDate: string;
  savedAddresses?: {
    id: string;
    type: "home" | "office" | "other";
    addressLine: string;
    city: string;
    pincode: string;
  }[];
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  productTitle?: string;
}

export interface DeliveryPincode {
  pincode: string;
  locationName: string;
  district: string;
  isSameDay: boolean;
  isExpress2Hr: boolean;
  isMidnight: boolean;
  minOrderForFreeDelivery: number;
}
