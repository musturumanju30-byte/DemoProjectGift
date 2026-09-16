import { DeliveryPincode } from "@/types";

export const SERVICEABLE_PINCODES: DeliveryPincode[] = [
  { pincode: "522265", locationName: "Repalle Town & Mandals", district: "Bapatla", isSameDay: true, isExpress2Hr: true, isMidnight: true, minOrderForFreeDelivery: 499 },
  { pincode: "522264", locationName: "Nizampatnam & Coastal Ports", district: "Bapatla", isSameDay: true, isExpress2Hr: true, isMidnight: true, minOrderForFreeDelivery: 599 },
  { pincode: "522259", locationName: "Nagaram & Cherukupalli", district: "Bapatla", isSameDay: true, isExpress2Hr: false, isMidnight: true, minOrderForFreeDelivery: 599 },
  { pincode: "522261", locationName: "Bhattiprolu Heritage Hub", district: "Bapatla", isSameDay: true, isExpress2Hr: false, isMidnight: true, minOrderForFreeDelivery: 599 },
  { pincode: "522101", locationName: "Bapatla Town", district: "Bapatla", isSameDay: true, isExpress2Hr: false, isMidnight: true, minOrderForFreeDelivery: 799 },
  { pincode: "522201", locationName: "Tenali Junction & Main Town", district: "Guntur", isSameDay: true, isExpress2Hr: false, isMidnight: true, minOrderForFreeDelivery: 799 },
  { pincode: "522001", locationName: "Guntur Central", district: "Guntur", isSameDay: true, isExpress2Hr: false, isMidnight: false, minOrderForFreeDelivery: 999 },
  { pincode: "520001", locationName: "Vijayawada City", district: "NTR District", isSameDay: true, isExpress2Hr: false, isMidnight: false, minOrderForFreeDelivery: 999 },
  { pincode: "521001", locationName: "Machilipatnam", district: "Krishna", isSameDay: true, isExpress2Hr: false, isMidnight: false, minOrderForFreeDelivery: 999 },
  { pincode: "523155", locationName: "Chirala Handlooms Hub", district: "Bapatla", isSameDay: true, isExpress2Hr: false, isMidnight: false, minOrderForFreeDelivery: 999 },
];

export const DELIVERY_SLOTS = [
  { id: "slot-std-afternoon", name: "Standard Afternoon", time: "01:00 PM - 04:00 PM", surcharge: 0, badge: "Free" },
  { id: "slot-std-evening", name: "Standard Evening", time: "05:00 PM - 08:30 PM", surcharge: 0, badge: "Popular" },
  { id: "slot-express-2hr", name: "Express 2-Hour Delivery", time: "Within 120 Mins (Repalle local)", surcharge: 99, badge: "Lightning Fast" },
  { id: "slot-midnight", name: "Midnight Surprise Celebration", time: "11:00 PM - 12:00 Midnight", surcharge: 199, badge: "Special Surprise" },
  { id: "slot-early-morning", name: "Fresh Morning Delivery", time: "07:00 AM - 10:00 AM", surcharge: 49, badge: "Sunrise" },
];

export interface PromoCoupon {
  code: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrder: number;
  maxDiscount?: number;
  badge?: string;
}

export const AVAILABLE_COUPONS: PromoCoupon[] = [
  {
    code: "CREATIVE10",
    title: "Flat 10% Off",
    description: "Applicable on all personalised gifts & acrylic keepsakes",
    discountType: "percentage",
    discountValue: 10,
    minOrder: 499,
    maxDiscount: 300,
    badge: "MOST POPULAR",
  },
  {
    code: "REPALLE300",
    title: "₹300 Cashback/Discount",
    description: "On orders above ₹1,999 across all categories",
    discountType: "fixed",
    discountValue: 300,
    minOrder: 1999,
    badge: "BIG SAVINGS",
  },
  {
    code: "SAMEDAYFREE",
    title: "Free Same-Day Delivery",
    description: "Free express same-day shipping across Repalle & Nizampatnam",
    discountType: "fixed",
    discountValue: 99,
    minOrder: 399,
    badge: "LOCAL PERK",
  },
];
