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
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim() || price <= 0) {
      setFormError("Product title and positive selling price are required.");
      return;
    }

    const categoryName =
      CATEGORIES_LIST.find(c => c.slug === category)?.name || "Personalised Gifts";
    const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        title,
        description,
        price,
        originalPrice,
        discountPercent: Math.max(0, discountPercent),
        category,
        categoryName,
        stockCount,
        images: [imageUrl],
        inStock: stockCount > 0,
        isPersonalised,
        isSameDay,
        isBestseller,
      });
    } else {
      addProduct({
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `gift-${Date.now()}`,
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
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Products Catalog ({products.length})
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Add, update prices, manage stock. Changes update the storefront instantly!
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-[#F72585] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d6136c] transition cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Add New Gift Product
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search catalog by name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-3 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#F72585] focus:outline-none shadow-2xs"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 focus:border-[#F72585] focus:outline-none shadow-2xs cursor-pointer"
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
      <div className="rounded-3xl bg-white border border-gray-150 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-gray-400 uppercase tracking-wider text-[10px] bg-gray-50/50 border-b border-gray-100 font-bold">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price / MRP</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Badges</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-150">
                        <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <span className="font-bold text-gray-900 block truncate">{p.title}</span>
                        <span className="text-[10px] text-gray-400 font-mono">ID: {p.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 font-medium">{p.categoryName}</td>
                  <td className="py-3 px-4">
                    <span className="font-black text-gray-900">₹{p.price}</span>
                    <span className="text-gray-400 line-through ml-1.5 text-[11px]">₹{p.originalPrice}</span>
                    <span className="text-emerald-600 block text-[10px] font-bold">
                      {p.discountPercent}% OFF
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full text-[10px] border ${
                        p.stockCount <= 10
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      {p.stockCount} in stock
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-1">
                    {p.isSameDay && (
                      <span className="rounded-md bg-amber-50 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 border border-amber-200">
                        Same Day
                      </span>
                    )}
                    {p.isPersonalised && (
                      <span className="rounded-md bg-pink-50 text-[#F72585] text-[9px] font-bold px-1.5 py-0.5 border border-pink-200">
                        Custom
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition cursor-pointer"
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
                      className="p-1.5 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-600 transition cursor-pointer"
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
                    <Package className="h-10 w-10 text-gray-400 mx-auto mb-2 opacity-60" />
                    <p className="text-sm font-bold text-gray-700">No products found</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Try clearing your search or adding a new gift to the catalog.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white border border-gray-250 p-6 sm:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-gray-900 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-base font-extrabold text-gray-900">
                {editingProduct ? "Edit Gift Product" : "Add New Gift to Catalog"}
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 flex items-center justify-between">
                <span>{formError}</span>
                <button
                  type="button"
                  onClick={() => setFormError("")}
                  className="text-rose-600 hover:text-rose-800 ml-2 font-bold"
                >
                  Dismiss
                </button>
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Product Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Custom 3D Acrylic Photo Lamp"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs text-gray-900 focus:bg-white focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Detailed gift description, specs, materials..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs text-gray-900 focus:bg-white focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2 text-xs text-gray-900 focus:bg-white focus:border-[#F72585] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={e => setOriginalPrice(Number(e.target.value))}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2 text-xs text-gray-900 focus:bg-white focus:border-[#F72585] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={stockCount}
                    onChange={e => setStockCount(Number(e.target.value))}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2 text-xs text-gray-900 focus:bg-white focus:border-[#F72585] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as CategorySlug)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs text-gray-900 focus:bg-white focus:border-[#F72585] focus:outline-none cursor-pointer"
                >
                  {CATEGORIES_LIST.map(c => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs text-gray-900 focus:bg-white focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2 font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPersonalised}
                    onChange={e => setIsPersonalised(e.target.checked)}
                    className="rounded text-[#F72585]"
                  />
                  <span>Personalised Item</span>
                </label>
                <label className="flex items-center gap-2 font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSameDay}
                    onChange={e => setIsSameDay(e.target.checked)}
                    className="rounded text-[#F72585]"
                  />
                  <span>Same-Day Eligible</span>
                </label>
                <label className="flex items-center gap-2 font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBestseller}
                    onChange={e => setIsBestseller(e.target.checked)}
                    className="rounded text-[#F72585]"
                  />
                  <span>Bestseller Ribbon</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl bg-gray-100 px-4 py-2 font-bold text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#F72585] px-5 py-2 font-bold text-white hover:bg-[#d6136c] shadow-md"
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
