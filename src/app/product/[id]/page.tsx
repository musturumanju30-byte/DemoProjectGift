import React from "react";
import { notFound } from "next/navigation";
import { INITIAL_PRODUCTS } from "@/data/products";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return INITIAL_PRODUCTS.map(p => ({ id: p.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = INITIAL_PRODUCTS.find(p => p.slug === id || p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = INITIAL_PRODUCTS.filter(
    p => p.id !== product.id && (p.category === product.category || p.isBestseller)
  );

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
