"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  Check,
  Upload,
  ShoppingBag,
  Zap,
  Sparkles,
  Tag,
  Truck,
  ShieldCheck,
  MessageCircle,
  Clock,
  Heart,
  Star,
  Copy,
  CheckCheck,
  ArrowRight,
  Gift,
} from "lucide-react";
import { Product, PersonalisationData } from "@/types";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { SERVICEABLE_PINCODES } from "@/data/locations";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

const OFFERS = [
  {
    title: "Flat 10% Off",
    code: "CREATIVE10",
    desc: "On all personalised gifts above ₹999",
    tag: "BESTSELLER",
  },
  {
    title: "₹300 Cashback",
    code: "REPALLE300",
    desc: "On orders above ₹1,999 via UPI",
    tag: "SPECIAL",
  },
  {
    title: "Free Same-Day Delivery",
    code: "SAMEDAYFREE",
    desc: "In Repalle & Nizampatnam town limits",
    tag: "LOCAL",
  },
  {
    title: "Flat 15% Off Combos",
    code: "FESTIVE15",
    desc: "On celebration hampers & flower-cake combos",
    tag: "COMBO",
  },
];

const DIRECTORY_DATA = {
  personalised: {
    label: "Personalised Gifts",
    links: [
      { label: "3D LED Optical Illusion Lamps", href: "/shop?category=personalised-gifts" },
      { label: "Laser Engraved Wooden Portraits", href: "/shop?category=personalised-gifts" },
      { label: "Spotify Scannable Acrylic Music Plaques", href: "/shop?category=personalised-gifts" },
      { label: "Custom Name Leather Wallets & Keychains", href: "/shop?category=personalised-gifts" },
      { label: "Motorized Rotating Magic Photo Cubes", href: "/shop?category=personalised-gifts" },
      { label: "Surprise Cascading Explosion Boxes", href: "/shop?category=personalised-gifts" },
      { label: "Personalised Heart & Magic Cushions", href: "/shop?category=personalised-gifts" },
      { label: "Customized Coffee & Travel Mugs", href: "/shop?category=personalised-gifts" },
      { label: "Laser Cut Nameplates for Home", href: "/shop?category=personalised-gifts" },
      { label: "Customized Photo Clocks & Wall Art", href: "/shop?category=personalised-gifts" },
      { label: "Engraved Metal Pens & Executive Sets", href: "/shop?category=personalised-gifts" },
      { label: "Personalised Crystal Keepsakes", href: "/shop?category=personalised-gifts" },
    ],
  },
  occasions: {
    label: "By Occasion",
    links: [
      { label: "Birthday Gifts & Cake Delivery", href: "/shop?occasion=birthday" },
      { label: "Anniversary Romantic Surprises", href: "/shop?occasion=anniversary" },
      { label: "Wedding Keepsakes & Couple Gifts", href: "/shop?occasion=wedding" },
      { label: "Valentine's Day Roses & Hampers", href: "/shop?occasion=love-romance" },
      { label: "Mother's Day Flowers & Keepsakes", href: "/shop?occasion=festival" },
      { label: "Father's Day Personalized Wallets", href: "/shop?occasion=birthday" },
      { label: "Housewarming Blessing Gifts", href: "/shop?occasion=congratulations" },
      { label: "Baby Shower Keepsakes & Hampers", href: "/shop?occasion=congratulations" },
      { label: "Diwali & Sankranti Gift Hampers", href: "/shop?occasion=festival" },
      { label: "New Year Celebration Surprises", href: "/shop?occasion=festival" },
      { label: "Friendship Day Custom Bands & Mugs", href: "/shop?occasion=birthday" },
      { label: "Teacher's Day & Gratitude Keepsakes", href: "/shop?occasion=thank-you" },
    ],
  },
  recipients: {
    label: "By Recipient",
    links: [
      { label: "Gifts For Him (Boyfriend / Husband)", href: "/shop?recipient=him" },
      { label: "Gifts For Her (Girlfriend / Wife)", href: "/shop?recipient=her" },
      { label: "Gifts For Couples & Newlyweds", href: "/shop?recipient=couple" },
      { label: "Gifts For Parents & In-laws", href: "/shop?recipient=parents" },
      { label: "Gifts For Best Friends", href: "/shop?recipient=friend" },
      { label: "Gifts For Kids & Teenagers", href: "/shop?recipient=kids" },
      { label: "Gifts For Brother & Sister", href: "/shop?recipient=friend" },
      { label: "Corporate & Executive Gifts", href: "/shop?recipient=him" },
    ],
  },
  categories: {
    label: "By Category",
    links: [
      { label: "Fresh Dutch Roses & Bouquets", href: "/category/flowers" },
      { label: "100% Pure Eggless Birthday Cakes", href: "/category/cakes" },
      { label: "Artisanal Luxury Gift Hampers", href: "/category/hampers" },
      { label: "Living Air-Purifying Indoor Plants", href: "/category/plants" },
      { label: "Gourmet Chocolates & Sweets Combos", href: "/category/chocolates" },
      { label: "Same-Day Express Repalle Delivery", href: "/category/same-day" },
      { label: "Personalised Keepsakes & Art", href: "/category/personalised-gifts" },
      { label: "Teddy Bears & Soft Plushies", href: "/shop" },
    ],
  },
  cities: {
    label: "Coastal AP Delivery Hubs",
    links: [
      { label: "Repalle Town (522265) 2-Hr Express", href: "/category/same-day" },
      { label: "Nizampatnam Coastal Port Delivery", href: "/category/same-day" },
      { label: "Nagaram & Cherukupalli Hubs", href: "/category/same-day" },
      { label: "Bhattiprolu Heritage Town Delivery", href: "/category/same-day" },
      { label: "Bapatla Town Express Shipping", href: "/category/same-day" },
      { label: "Tenali Junction & Main Town", href: "/category/same-day" },
      { label: "Guntur City Express Delivery", href: "/category/same-day" },
      { label: "Vijayawada Handcrafted Delivery", href: "/category/same-day" },
      { label: "Chirala Handloom & Coastal Hub", href: "/category/same-day" },
      { label: "Machilipatnam Coastal Delivery", href: "/category/same-day" },
    ],
  },
};

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  relatedProducts,
}) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { products, wishlist, toggleWishlist, selectedDeliveryPincode, setSelectedDeliveryPincode } =
    useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Zoom on hover states
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  // Personalisation states
  const [engravingText, setEngravingText] = useState("");
  const [messageNote, setMessageNote] = useState("");
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | undefined>(undefined);
  const [uploadedPhotoName, setUploadedPhotoName] = useState<string | undefined>(undefined);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.personalisationConfig?.variants?.[0]?.options[0]?.label || ""
  );
  const [variantPriceDelta, setVariantPriceDelta] = useState<number>(
    product.personalisationConfig?.variants?.[0]?.options[0]?.priceDelta || 0
  );

  // Delivery estimation state
  const [checkPincode, setCheckPincode] = useState(selectedDeliveryPincode || "522265");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(
    "✓ Available for Same-Day Delivery in Repalle (within 2 hours)"
  );

  // Collapsible accordions: Collapsed by default
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  // Offer copy notification
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Explore more directory tab
  const [activeDirectoryTab, setActiveDirectoryTab] =
    useState<keyof typeof DIRECTORY_DATA>("personalised");

  // Recently viewed products
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Wishlist check
  const isWish = wishlist.includes(product.id);

  // Maintain 4-5 high-resolution gallery thumbnails
  const galleryImages = useMemo(() => {
    if (product.images.length >= 4) return product.images;
    const additional = relatedProducts.flatMap(p => p.images);
    const combined = [...product.images, ...additional];
    const unique = Array.from(new Set(combined));
    return unique.slice(0, 5);
  }, [product.images, relatedProducts]);

  // Track recently viewed products in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cp_recently_viewed");
      let ids: string[] = stored ? JSON.parse(stored) : [];
      ids = [product.id, ...ids.filter(id => id !== product.id)].slice(0, 10);
      localStorage.setItem("cp_recently_viewed", JSON.stringify(ids));

      const otherItems = ids
        .filter(id => id !== product.id)
        .map(id => products.find(p => p.id === id))
        .filter((p): p is Product => Boolean(p));

      // Pad with related products if fewer than 4
      const combined = [...otherItems, ...relatedProducts].filter(
        (item, index, self) => index === self.findIndex(t => t.id === item.id && t.id !== product.id)
      );
      setRecentlyViewed(combined.slice(0, 6));
    } catch {
      setRecentlyViewed(relatedProducts.slice(0, 6));
    }
  }, [product.id, products, relatedProducts]);

  // Mouse move handler for smooth cursor-anchored zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedPhotoName(file.name);
      const url = URL.createObjectURL(file);
      setUploadedPhotoUrl(url);
    }
  };

  const handleVariantChange = (label: string, delta: number = 0) => {
    setSelectedVariant(label);
    setVariantPriceDelta(delta);
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const found = SERVICEABLE_PINCODES.find(p => p.pincode === checkPincode.trim());
    if (found) {
      setSelectedDeliveryPincode(found.pincode);
      setPincodeStatus(
        `✓ Delivering to ${found.locationName} (${found.pincode}). ${found.isExpress2Hr ? "Same-Day Delivery available within 2 hours!" : "Same-Day Delivery available today!"
        }`
      );
    } else {
      setPincodeStatus("Standard express shipping available in 2-3 days across Andhra Pradesh.");
    }
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const currentUnitPrice = product.price + variantPriceDelta;

  const handleAddToCart = () => {
    const personalisationData: PersonalisationData = {
      engravingText: engravingText.trim() || undefined,
      messageCardNote: messageNote.trim() || undefined,
      photoUrl: uploadedPhotoUrl,
      photoName: uploadedPhotoName,
      selectedVariant: selectedVariant || undefined,
    };
    addToCart(product, quantity, personalisationData, variantPriceDelta);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="w-full bg-white min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 overflow-x-auto no-scrollbar"
        >
          <Link href="/" className="hover:text-[#F72585] transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          <Link href="/shop" className="hover:text-[#F72585] transition-colors shrink-0">
            Gifts
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          <Link
            href={`/category/${product.category}`}
            className="hover:text-[#F72585] transition-colors shrink-0"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          <span className="font-semibold text-gray-900 truncate">{product.title}</span>
        </nav>

        {/* TOP SECTION (ABOVE THE FOLD): Gallery on left, Info panel on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: IMAGE GALLERY (5 cols desktop) */}
          <div className="lg:col-span-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Vertical Thumbnail Strip (Desktop: left of main photo, 4-6 thumbnails) */}
              <div className="hidden lg:flex flex-col gap-3 w-20 shrink-0">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setImageError(false);
                    }}
                    className={`relative aspect-square w-full rounded-[10px] overflow-hidden border-2 bg-gray-50 transition-all ${activeImageIndex === idx
                        ? "border-[#F72585] shadow-xs"
                        : "border-gray-200 hover:border-gray-400 opacity-75 hover:opacity-100"
                      }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Product Image: Plain white background, ZERO clutter/badges over the photo */}
              <div className="flex-1">
                <div
                  className="relative aspect-square w-full overflow-hidden rounded-[12px] bg-white border border-gray-100 cursor-crosshair select-none"
                  onMouseEnter={() => setIsZooming(true)}
                  onMouseLeave={() => setIsZooming(false)}
                  onMouseMove={handleMouseMove}
                >
                  {imageError ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50/40 p-6 text-center select-none">
                      <div className="h-16 w-16 rounded-full bg-white/90 border border-pink-200/70 shadow-xs flex items-center justify-center text-[#F72585] mb-2.5">
                        <Gift className="h-8 w-8 opacity-90" />
                      </div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Creative Paradise
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={galleryImages[activeImageIndex] || product.images[0]}
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 550px"
                      onError={() => setImageError(true)}
                      className="object-cover transition-transform duration-200 ease-out"
                      style={{
                        transform: isZooming ? "scale(1.55)" : "scale(1)",
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      }}
                    />
                  )}
                </div>

                {/* Mobile: Horizontal Swipeable Thumbnails Strip directly below main image */}
                <div className="flex lg:hidden gap-2.5 overflow-x-auto no-scrollbar pt-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setImageError(false);
                      }}
                      className={`relative h-16 w-16 shrink-0 rounded-[8px] overflow-hidden border-2 bg-gray-50 transition-all ${activeImageIndex === idx
                          ? "border-[#F72585] shadow-xs"
                          : "border-gray-200 opacity-70"
                        }`}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: INFO PANEL & BUYING DECISION (6 cols desktop) */}
          <div className="lg:col-span-6 space-y-5">
            {/* 1. Title & Small Delivery Badge */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1E2233] leading-snug tracking-tight">
                  {product.title}
                </h1>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 rounded-full border transition-all shrink-0 ${isWish
                      ? "border-[#F72585] bg-pink-50 text-[#F72585]"
                      : "border-gray-200 bg-white text-gray-400 hover:text-[#F72585] hover:border-pink-200"
                    }`}
                  aria-label={isWish ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={`h-4 w-4 ${isWish ? "fill-[#F72585]" : ""}`} />
                </button>
              </div>

              {/* Small Delivery Badge (Pink pill, low-contrast, not a loud ribbon) */}
              <div className="mt-2.5 flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FDEAF1] px-2.5 py-0.5 text-xs font-semibold text-[#F72585] border border-pink-200/60">
                  ⚡ Same Day Delivery Available
                </span>
                {product.rating && (
                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-[#C9A227] text-[#C9A227]" />
                    <strong className="text-gray-900">{product.rating}</strong> ({product.reviewCount || 120} reviews)
                  </span>
                )}
              </div>

              {/* 2. Price Row: Large bold price, small strikethrough, discount % in pink text */}
              <div className="mt-3.5 flex items-baseline gap-2.5 flex-wrap">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
                  ₹{currentUnitPrice}
                </span>
                {product.originalPrice > currentUnitPrice && (
                  <>
                    <span className="text-sm sm:text-base text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-sm font-bold text-[#F72585]">
                      {product.discountPercent ||
                        Math.round(((product.originalPrice - currentUnitPrice) / product.originalPrice) * 100)}
                      % OFF
                    </span>
                  </>
                )}
                <span className="text-xs text-gray-400 font-normal ml-1">
                  (Inclusive of all taxes)
                </span>
              </div>
            </div>

            {/* 3. Check Delivery Section: Right under price so customer confirms immediately */}
            <div className="rounded-[10px] border border-gray-200 bg-gray-50/70 p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#1E2233]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#F72585]" /> Check Delivery in Coastal AP
                </span>
                <span className="text-[11px] font-medium text-gray-500">Repalle Hub: 522265</span>
              </div>

              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit Pincode (e.g. 522265)"
                  value={checkPincode}
                  onChange={e => setCheckPincode(e.target.value)}
                  maxLength={6}
                  className="flex-1 rounded-[8px] border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-[#0A0A0A] placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-[8px] bg-[#1E2233] px-4 py-2 text-xs font-bold text-white hover:bg-black transition-colors shrink-0"
                >
                  Verify
                </button>
              </form>

              {pincodeStatus && (
                <p className="text-xs font-medium text-emerald-700 flex items-center gap-1.5 pt-0.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* 4. Personalisation Input Section (if applicable) */}
            {product.isPersonalised && (
              <div className="space-y-4 rounded-[12px] border border-pink-100 bg-[#FFF9FB] p-4 sm:p-5">
                <div className="flex items-center justify-between pb-2 border-b border-pink-100">
                  <span className="text-xs font-bold text-[#1E2233] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-[#F72585]" /> Customise Your Keepsake
                  </span>
                  <span className="text-[11px] font-semibold text-[#F72585]">
                    Free Personalisation
                  </span>
                </div>

                {/* Engraving / Custom Name Input */}
                {product.personalisationConfig?.requireEngravingText && (
                  <div>
                    <label className="block text-xs font-semibold text-[#1E2233] mb-1.5">
                      Name / Custom Text to Engrave <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={
                        product.personalisationConfig.engravingPlaceholder ||
                        "Enter name or custom date..."
                      }
                      maxLength={product.personalisationConfig.engravingMaxChars || 40}
                      value={engravingText}
                      onChange={e => setEngravingText(e.target.value)}
                      className="w-full rounded-[8px] border border-gray-200 bg-white p-2.5 text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                      <span>Laser-etched with high precision</span>
                      <span>
                        {engravingText.length} / {product.personalisationConfig.engravingMaxChars || 40}
                      </span>
                    </div>
                  </div>
                )}

                {/* Photo Upload Input */}
                {product.personalisationConfig?.requirePhotoUpload && (
                  <div>
                    <label className="block text-xs font-semibold text-[#1E2233] mb-1.5">
                      Upload Custom Photo <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex-1 flex items-center justify-center gap-2 rounded-[8px] border-2 border-dashed border-pink-200 bg-white p-3 cursor-pointer hover:bg-pink-50/50 transition-colors text-center">
                        <Upload className="h-4 w-4 text-[#F72585]" />
                        <span className="text-xs font-medium text-gray-700">
                          {uploadedPhotoName ? uploadedPhotoName : "Select photo from your phone or device"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                      {uploadedPhotoUrl && (
                        <div className="relative h-12 w-12 rounded-[6px] overflow-hidden border border-pink-200 shadow-2xs shrink-0">
                          <Image
                            src={uploadedPhotoUrl}
                            alt="Upload preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">
                      JPG/PNG in high resolution recommended. We will align and crop for optimal result.
                    </p>
                  </div>
                )}

                {/* Variant Options (e.g. Size, Base Style) */}
                {product.personalisationConfig?.variants?.map((v, i) => (
                  <div key={i}>
                    <label className="block text-xs font-semibold text-[#1E2233] mb-1.5">
                      {v.name}: <span className="text-[#F72585] font-bold">{selectedVariant}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {v.options.map(opt => {
                        const isSelected = selectedVariant === opt.label;
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => handleVariantChange(opt.label, opt.priceDelta || 0)}
                            className={`rounded-[8px] px-3 py-1.5 text-xs font-semibold border transition-all ${isSelected
                                ? "border-[#F72585] bg-[#F72585] text-white shadow-2xs"
                                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                              }`}
                          >
                            {opt.label}
                            {opt.priceDelta && opt.priceDelta > 0 ? ` (+₹${opt.priceDelta})` : ""}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Complimentary Greeting Card Note */}
                <div>
                  <label className="block text-xs font-semibold text-[#1E2233] mb-1">
                    Complimentary Greeting Card Note (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Write a heartfelt message to be included on a luxury gift card..."
                    value={messageNote}
                    onChange={e => setMessageNote(e.target.value)}
                    className="w-full rounded-[8px] border border-gray-200 bg-white p-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* 5. Slim Horizontal Offers Carousel: Swipeable, low visual weight */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#1E2233] uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-[#C9A227]" /> Available Coupons & Cashback
                </span>
                <span className="text-[11px] text-gray-400">Swipe to view</span>
              </div>
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                {OFFERS.map((offer, idx) => (
                  <div
                    key={idx}
                    className="min-w-[210px] sm:min-w-[220px] rounded-[10px] border border-amber-200/70 bg-gradient-to-br from-[#FFFDF8] to-[#FFF8E6] p-2.5 shadow-2xs flex flex-col justify-between shrink-0"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0A0A0A]">{offer.title}</span>
                        <span className="rounded bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5">
                          {offer.tag}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-600 mt-1 leading-snug">{offer.desc}</p>
                    </div>
                    <div className="mt-2.5 pt-1.5 border-t border-amber-200/60 flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-[#C9A227] tracking-wider">
                        {offer.code}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyCoupon(offer.code)}
                        className="text-[10px] font-bold text-[#1E2233] hover:text-[#F72585] transition-colors flex items-center gap-1"
                      >
                        {copiedCode === offer.code ? (
                          <>
                            <CheckCheck className="h-3 w-3 text-emerald-600" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-gray-500" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Three Collapsible Accordions: Description, Instructions, Delivery Info (Collapsed by default) */}
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {/* Accordion 1: Description */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === "desc" ? null : "desc")}
                  className="w-full flex items-center justify-between text-xs font-bold text-[#1E2233] text-left hover:text-[#F72585] transition-colors"
                >
                  <span>Product Description & Features</span>
                  {activeAccordion === "desc" ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </button>
                {activeAccordion === "desc" && (
                  <div className="mt-2.5 text-xs text-gray-600 leading-relaxed space-y-2 pt-1 animate-in fade-in duration-200">
                    <p>{product.description}</p>
                    {product.features && (
                      <ul className="list-disc pl-4 space-y-1 text-gray-700">
                        {product.features.map((feat, i) => (
                          <li key={i}>{feat}</li>
                        ))}
                      </ul>
                    )}
                    {product.dimensions && (
                      <p className="text-gray-900 font-semibold">Dimensions: {product.dimensions}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: Personalisation Instructions */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() =>
                    setActiveAccordion(activeAccordion === "instructions" ? null : "instructions")
                  }
                  className="w-full flex items-center justify-between text-xs font-bold text-[#1E2233] text-left hover:text-[#F72585] transition-colors"
                >
                  <span>Personalisation Instructions & Guidelines</span>
                  {activeAccordion === "instructions" ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </button>
                {activeAccordion === "instructions" && (
                  <div className="mt-2.5 text-xs text-gray-600 leading-relaxed space-y-1.5 pt-1 animate-in fade-in duration-200">
                    <p>
                      • <strong>Name / Custom Text:</strong> Verify spelling and dates carefully before ordering. Laser engraving is permanent once etched.
                    </p>
                    <p>
                      • <strong>Photo Upload:</strong> High-resolution, well-lit photos (JPG/PNG) work best for UV printing and acrylic etching. Avoid heavy dark filters.
                    </p>
                    <p>
                      • <strong>WhatsApp Proof Approval:</strong> For bespoke items, our Repalle artisan team shares a digital preview via WhatsApp (+91 9177003905) before dispatch.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Delivery Info */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() =>
                    setActiveAccordion(activeAccordion === "delivery" ? null : "delivery")
                  }
                  className="w-full flex items-center justify-between text-xs font-bold text-[#1E2233] text-left hover:text-[#F72585] transition-colors"
                >
                  <span>Delivery Information & Coastal AP Shipping</span>
                  {activeAccordion === "delivery" ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </button>
                {activeAccordion === "delivery" && (
                  <div className="mt-2.5 text-xs text-gray-600 leading-relaxed space-y-1.5 pt-1 animate-in fade-in duration-200">
                    <p>
                      • <strong>Repalle Local Town:</strong> Hand-delivered within 2 hours for orders placed before 6:00 PM today.
                    </p>
                    <p>
                      • <strong>Nizampatnam & Coastal Mandals:</strong> Guaranteed same-day evening delivery.
                    </p>
                    <p>
                      • <strong>Bapatla, Tenali, Guntur & Vijayawada:</strong> Fast courier transit in shock-proof protective packaging within 24-48 hours.
                    </p>
                    <p>
                      • <strong>Midnight Celebrations:</strong> Delivered precisely between 11:00 PM and 12:00 Midnight in Repalle.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 7. Quantity & Two Equal-Width CTAs: Outlined Add to Cart + Solid Buy Now */}
            <div className="pt-2 space-y-3">
              {/* Quantity Stepper & Stock Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#1E2233]">Quantity:</span>
                  <div className="flex items-center rounded-[8px] border border-gray-200 bg-white p-0.5">
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="h-7 w-7 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#0A0A0A]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="h-7 w-7 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Two CTA Buttons: Side-by-side equal width on desktop, stacked on mobile */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 rounded-[12px] border-2 border-[#F72585] bg-white py-3.5 px-4 text-xs sm:text-sm font-bold text-[#F72585] hover:bg-[#FDEAF1] transition-all flex items-center justify-center gap-2 shadow-xs active:scale-[0.99]"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 rounded-[12px] bg-[#F72585] py-3.5 px-4 text-xs sm:text-sm font-bold text-white hover:bg-[#d6136c] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-pink-500/25 active:scale-[0.99]"
                >
                  <Zap className="h-4 w-4" />
                  Buy Now
                </button>
              </div>

              {/* Direct WhatsApp Ordering Assistance */}
              <div className="text-center pt-1">
                <a
                  href={`https://wa.me/919177003905?text=${encodeURIComponent(
                    `Hi Creative Paradise! I want to order "${product.title}" (₹${currentUnitPrice}). Can you confirm same-day delivery in Repalle / Coastal AP?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:underline"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                  Order directly on WhatsApp (+91 9177003905) →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BELOW THE FOLD SECTION */}
        {/* ========================================================================= */}

        {/* 1. "Recently Viewed" Row: Minimal card style, image, name, price only */}
        {recentlyViewed.length > 0 && (
          <section className="mt-20 pt-10 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                  Recently Viewed
                </h2>
                <div className="h-0.5 w-12 bg-[#C9A227] mt-1.5 rounded-full" />
              </div>
              <Link
                href="/shop"
                className="text-xs font-bold text-[#F72585] hover:underline flex items-center gap-1"
              >
                View More <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {recentlyViewed.slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* 2. "Explore More" Tabbed Directory: Tabs for Personalised / Occasions / Recipients / Categories / Cities */}
        <section className="mt-20 pt-10 border-t border-gray-100">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
              Explore More Gifting Collections
            </h2>
            <div className="h-0.5 w-12 bg-[#C9A227] mt-1.5 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Browse by personalized keepsakes, celebration occasions, recipients, or coastal delivery mandals.
            </p>
          </div>

          {/* Directory Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-gray-200 pb-2">
            {(Object.keys(DIRECTORY_DATA) as Array<keyof typeof DIRECTORY_DATA>).map(key => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveDirectoryTab(key)}
                className={`rounded-[8px] px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${activeDirectoryTab === key
                    ? "bg-[#1E2233] text-white shadow-2xs"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-black border border-gray-200"
                  }`}
              >
                {DIRECTORY_DATA[key].label}
              </button>
            ))}
          </div>

          {/* Tab Content: Multi-column Text Link Directory */}
          <div className="mt-6 rounded-[12px] bg-gray-50/60 p-6 border border-gray-200/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2.5">
              {DIRECTORY_DATA[activeDirectoryTab].links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="text-xs text-gray-600 hover:text-[#F72585] hover:underline transition-colors py-0.5 truncate block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Trust Stats Bar (Homepage brand standard) */}
        <section className="mt-20 pt-10 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 text-center">
            <div className="rounded-[12px] bg-white p-6 shadow-xs border border-gray-200 hover:border-[#F72585] transition-all">
              <span className="text-3xl sm:text-4xl font-black text-[#0A0A0A] block tracking-tight">
                500+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#F72585] mt-1.5 block">
                Happy Celebrations
              </span>
              <p className="text-[11px] text-gray-500 mt-1">In Repalle & Coastal AP</p>
            </div>

            <div className="rounded-[12px] bg-white p-6 shadow-xs border border-gray-200 hover:border-[#C9A227] transition-all">
              <span className="text-3xl sm:text-4xl font-black text-[#0A0A0A] block tracking-tight">
                2 Hours
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#C9A227] mt-1.5 block">
                Express Same-Day
              </span>
              <p className="text-[11px] text-gray-500 mt-1">Lightning fast local delivery</p>
            </div>

            <div className="rounded-[12px] bg-white p-6 shadow-xs border border-gray-200 hover:border-[#1E2233] transition-all">
              <span className="text-3xl sm:text-4xl font-black text-[#0A0A0A] block tracking-tight">
                30+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#1E2233] mt-1.5 block">
                Coastal AP Hubs
              </span>
              <p className="text-[11px] text-gray-500 mt-1">Repalle, Bapatla, Tenali, Guntur</p>
            </div>

            <div className="rounded-[12px] bg-white p-6 shadow-xs border border-gray-200 hover:border-[#F72585] transition-all">
              <span className="text-3xl sm:text-4xl font-black text-[#0A0A0A] block tracking-tight">
                100%
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#F72585] mt-1.5 block">
                Personalised Art
              </span>
              <p className="text-[11px] text-gray-500 mt-1">Crafted with pride in Andhra</p>
            </div>
          </div>
        </section>

        {/* 4. Service Icons Row: Delivery, Payments, Dedicated Help Center */}
        <section className="mt-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3.5 p-4 rounded-[12px] border border-gray-200 bg-white shadow-2xs">
              <div className="h-10 w-10 rounded-full bg-[#FDEAF1] flex items-center justify-center shrink-0">
                <Truck className="h-5 w-5 text-[#F72585]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#1E2233]">
                  Coastal AP & Repalle Delivery
                </h3>
                <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                  Same-day within 2 hours in Repalle town; fast transit across Coastal AP.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-[12px] border border-gray-200 bg-white shadow-2xs">
              <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#1E2233]">
                  100% Safe & Secure Payments
                </h3>
                <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                  Bank-grade encrypted Razorpay with UPI (GPay, PhonePe, Paytm), Cards & NetBanking.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-[12px] border border-gray-200 bg-white shadow-2xs">
              <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5 text-[#C9A227]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#1E2233]">
                  Dedicated Help Center
                </h3>
                <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                  Chat directly with our Repalle workshop on WhatsApp (+91 9177003905) for order queries.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
