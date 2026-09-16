"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  Package,
  Eye,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Product, CategorySlug } from "@/types";
import { CATEGORIES_LIST } from "@/data/products";

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for Add / Edit
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(599);
  const [originalPrice, setOriginalPrice] = useState<number>(999);
  const [category, setCategory] = useState<CategorySlug>("personalised-gifts");
  const [stockCount, setStockCount] = useState<number>(20);
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
  );
  const [isPersonalised, setIsPersonalised] = useState(true);
  const [isSameDay, setIsSameDay] = useState(true);
  const [isBestseller, setIsBestseller] = useState(false);
  const [formError, setFormError] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice(599);
    setOriginalPrice(999);
    setCategory("personalised-gifts");
    setStockCount(20);
    setImageUrl("https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop");
    setIsPersonalised(true);
    setIsSameDay(true);
    setIsBestseller(false);
    setEditingProduct(null);
    setFormError("");
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setTitle(p.title);
    setDescription(p.description);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);
    setCategory(p.category);
    setStockCount(p.stockCount);
    setImageUrl(p.images[0] || "");
    setIsPersonalised(p.isPersonalised);
    setIsSameDay(p.isSameDay);
    setIsBestseller(p.isBestseller);
    setFormError("");
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Product title is required.");
      return;
    }

    if (price <= 0 || originalPrice <= 0) {
      setFormError("Prices must be greater than zero.");
      return;
    }

    if (price > originalPrice) {
      setFormError("Offer price cannot be higher than MRP / Original Price.");
      return;
    }

    const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);
    const categoryName = CATEGORIES_LIST.find(c => c.slug === category)?.name || "Gifts";
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        title,
        slug,
        description,
        price,
        originalPrice,
        discountPercent: Math.max(0, discountPercent),
        category,
        categoryName,
        stockCount,
        images: [imageUrl],
        isPersonalised,
        isSameDay,
        isBestseller,
      });
    } else {
      addProduct({
        title,
        slug: slug || `gift-${Date.now()}`,
        description,
        price,
        originalPrice,
        discountPercent: Math.max(0, discountPercent),
        category,
        categoryName,
        stockCount,
        images: [imageUrl],
        rating: 4.9,
        reviewCount: 1,
        inStock: stockCount > 0,
        isPersonalised,
        isSameDay,
        isBestseller,
        occasions: ["birthday", "anniversary"],
        recipients: ["couple", "her"],
        tags: ["New Launch", "Handcrafted in Repalle"],
      });
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const filtered = products.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider block">
            LIVE CATALOG MANAGEMENT
          </span>
          <h1 className="text-2xl font-black text-white">Products Catalog ({products.length})</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Add, update prices, manage stock. Changes update the storefront instantly with no redeploy!
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-[#F72585] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d6136c] transition"
        >
          <Plus className="h-4 w-4" /> Add New Gift Product
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search catalog by name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-800 bg-[#121520] py-2 pl-10 pr-3 text-xs text-white placeholder:text-gray-500 focus:border-[#F72585] focus:outline-none"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-gray-800 bg-[#121520] px-3 py-2 text-xs font-semibold text-white focus:border-[#F72585] focus:outline-none"
        >
          <option value="all">All Categories</option>
          {CATEGORIES_LIST.map(cat => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl bg-[#121520] border border-gray-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="text-gray-400 uppercase tracking-wider text-[10px] bg-white/5 border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price / MRP</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Badges</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                        <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <span className="font-bold text-white block truncate">{p.title}</span>
                        <span className="text-[10px] text-gray-400 font-mono">ID: {p.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-300 font-medium">{p.categoryName}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-white">₹{p.price}</span>
                    <span className="text-gray-500 line-through ml-1.5">₹{p.originalPrice}</span>
                    <span className="text-emerald-400 block text-[10px] font-bold">
                      {p.discountPercent}% OFF
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        p.stockCount <= 10
                          ? "bg-rose-950 text-rose-400 border border-rose-800/50"
                          : "bg-emerald-950 text-emerald-400 border border-emerald-800/50"
                      }`}
                    >
                      {p.stockCount} in stock
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-1">
                    {p.isSameDay && (
                      <span className="rounded bg-black text-amber-300 text-[9px] font-bold px-1.5 py-0.5 border border-amber-500/30">
                        Same Day
                      </span>
                    )}
                    {p.isPersonalised && (
                      <span className="rounded bg-pink-950 text-pink-300 text-[9px] font-bold px-1.5 py-0.5 border border-pink-500/30">
                        Custom
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
                      aria-label="Edit product"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${p.title}" from catalog?`)) {
                          deleteProduct(p.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                      aria-label="Delete product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <Package className="h-10 w-10 text-gray-600 mx-auto mb-3 opacity-60" />
                    <p className="text-sm font-bold text-gray-300">No products found</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Try clearing your search or adding a new gift to the catalog.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                      className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition min-h-[44px]"
                    >
                      Clear Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-3xl bg-[#121520] border border-gray-800 p-6 sm:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-white animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h2 className="text-base font-extrabold text-white">
                {editingProduct ? "Edit Gift Product" : "Add New Gift to Catalog"}
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="rounded-xl bg-rose-950/60 border border-rose-800/80 p-3 text-xs text-rose-300 flex items-center justify-between">
                <span>{formError}</span>
                <button
                  type="button"
                  onClick={() => setFormError("")}
                  className="text-rose-400 hover:text-rose-200 ml-2"
                >
                  Dismiss
                </button>
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Product Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Custom 3D Acrylic Photo Lamp"
                  required
                  className="w-full rounded-xl border border-gray-800 bg-[#0A0A0A] p-2.5 text-xs text-white focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Detailed gift description, specs, materials..."
                  className="w-full rounded-xl border border-gray-800 bg-[#0A0A0A] p-2.5 text-xs text-white focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    required
                    className="w-full rounded-xl border border-gray-800 bg-[#0A0A0A] p-2 text-xs text-white focus:border-[#F72585] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={e => setOriginalPrice(Number(e.target.value))}
                    required
                    className="w-full rounded-xl border border-gray-800 bg-[#0A0A0A] p-2 text-xs text-white focus:border-[#F72585] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={stockCount}
                    onChange={e => setStockCount(Number(e.target.value))}
                    required
                    className="w-full rounded-xl border border-gray-800 bg-[#0A0A0A] p-2 text-xs text-white focus:border-[#F72585] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as CategorySlug)}
                  className="w-full rounded-xl border border-gray-800 bg-[#0A0A0A] p-2.5 text-xs text-white focus:border-[#F72585] focus:outline-none"
                >
                  {CATEGORIES_LIST.map(c => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  required
                  className="w-full rounded-xl border border-gray-800 bg-[#0A0A0A] p-2.5 text-xs text-white focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPersonalised}
                    onChange={e => setIsPersonalised(e.target.checked)}
                    className="rounded text-[#F72585]"
                  />
                  <span>Personalised Item</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSameDay}
                    onChange={e => setIsSameDay(e.target.checked)}
                    className="rounded text-[#F72585]"
                  />
                  <span>Same-Day Eligible</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBestseller}
                    onChange={e => setIsBestseller(e.target.checked)}
                    className="rounded text-[#F72585]"
                  />
                  <span>Bestseller Ribbon</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#F72585] px-5 py-2 text-xs font-bold text-white hover:bg-[#d6136c] shadow-md"
                >
                  Save to Storefront
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
