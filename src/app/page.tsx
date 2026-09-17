"use client";

import React from "react";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { OccasionCards } from "@/components/home/OccasionCards";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { BestsellersTabs } from "@/components/home/BestsellersTabs";
import { CelebrationCorporateBanner } from "@/components/home/CelebrationCorporateBanner";
import { ThemedCollections } from "@/components/home/ThemedCollections";
import { MidPromoBanner } from "@/components/home/MidPromoBanner";
import { RecipientRow } from "@/components/home/RecipientRow";
import { ProductShelf } from "@/components/home/ProductShelf";
import { FeelingCards } from "@/components/home/FeelingCards";
import { OffersStrip } from "@/components/home/OffersStrip";
import { TrustStats } from "@/components/home/TrustStats";
import { useStore } from "@/context/StoreContext";

export default function HomePage() {
  const { products } = useStore();

  const flowerProducts = products.filter(p => p.category === "flowers");
  const cakeProducts = products.filter(p => p.category === "cakes");
  const personalisedProducts = products.filter(p => p.category === "personalised-gifts" || p.isPersonalised);
  const plantProducts = products.filter(p => p.category === "plants");

  return (
    <div className="w-full flex flex-col min-h-screen pb-[75px] md:pb-0">
      {/* 1. Category Icon Strip */}
      <CategoryStrip />

      {/* 2. Gifts For Every Occasion Colored Cards */}
      <OccasionCards />

      {/* 3. Hero Rotating Carousel */}
      <HeroCarousel />

      {/* 4. Shop By Bestsellers Tabbed Grid */}
      <BestsellersTabs />

      {/* 4.5. Reminders & Corporate Gifting Dual Feature Banner */}
      <CelebrationCorporateBanner />

      {/* 5. Themed Collection Strip */}
      <ThemedCollections />

      {/* 6. Mid-page Celebration / Festival Promo Banner */}
      <MidPromoBanner />

      {/* 7. Gifts for Everyone Recipient Row */}
      <RecipientRow />

      {/* 8. Curated Flower Bouquets Shelf */}
      <ProductShelf
        title="Curated Flower Bouquets & Keepsakes"
        subtitle="Farm-fresh Dutch roses, radiant sunflowers & glass vase arrangements delivered same-day in Repalle"
        badge="FRESH BLOOMS"
        viewAllLink="/category/flowers"
        products={flowerProducts}
        bgClass="bg-white"
        cardStyle="standard"
      />

      {/* 9. Handcrafted Cakes Shelf */}
      <ProductShelf
        title="Handcrafted Cakes & Sweet Delights"
        subtitle="Baked fresh to order with Belgian chocolate, cream cheese & 100% pure eggless options"
        badge="FRESHLY BAKED"
        viewAllLink="/category/cakes"
        products={cakeProducts}
        bgClass="bg-white"
        cardStyle="standard"
      />

      {/* 10. Gifts for Every Feeling Emotion Cards */}
      <FeelingCards />

      {/* 11. Personalised Gifts Shelf */}
      <ProductShelf
        title="Personalised Gifts"
        subtitle="Handcrafted custom 3D lamps, engraved wooden portraits, Spotify plaques & rotating cubes from our Repalle workshop"
        badge="BESPOKE KEEPSAKES"
        viewAllLink="/category/personalised-gifts"
        products={personalisedProducts}
        bgClass="bg-white"
        cardStyle="standard"
      />

      {/* 12. Offers Strip for Promo Coupons & Cashback */}
      <OffersStrip />

      {/* 13. Green Gifting / Plants & Planters */}
      <ProductShelf
        title="Green Gifting: Plants & Planters"
        subtitle="Air-purifying bonsai succulents and lucky bamboo in ceramic pots that grow with your love"
        badge="ECO GREEN"
        viewAllLink="/category/plants"
        products={plantProducts}
        bgClass="bg-white"
        cardStyle="standard"
      />

      {/* 14. Trust Stats Bar & Collapsible SEO Section */}
      <TrustStats />
    </div>
  );
}
