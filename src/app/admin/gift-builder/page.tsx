"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wand2,
  Package,
  Plus,
  Trash2,
  Check,
  ChevronRight,
  Sparkles,
  Layers,
  Tag,
  Save,
  Eye,
} from "lucide-react";

export default function AdminGiftBuilderPage() {
  const [selectedBox, setSelectedBox] = useState("box-1");
  const [selectedRibbon, setSelectedRibbon] = useState("ribbon-1");
  const [selectedTheme, setSelectedTheme] = useState("Anniversary & Love");

  const boxes = [
    {
      id: "box-1",
      name: "Luxury Crimson Round Box",
      type: "Velvet Rigid Box",
      capacity: "Up to 6 items",
      price: 450,
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "box-2",
      name: "Handcrafted Solid Wood Chest",
      type: "Polished Pine Wood",
      capacity: "Up to 8 items",
      price: 650,
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "box-3",
      name: "Artisan Woven Willow Basket",
      type: "Natural Wicker Basket",
      capacity: "Up to 5 items",
      price: 380,
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=300&auto=format&fit=crop",
    },
  ];

  const bundleItems = [
    {
      id: "bi-1",
      title: "Royal Crimson 50 Red Roses",
      category: "Flowers",
      cost: 899,
      qty: 1,
    },
    {
      id: "bi-2",
      title: "Ferrero Rocher Deluxe (16 Pcs)",
      category: "Chocolates",
      cost: 499,
      qty: 1,
    },
    {
      id: "bi-3",
      title: "Handmade Scented Rose Candle",
      category: "Aroma",
      cost: 299,
      qty: 1,
    },
    {
      id: "bi-4",
      title: "Embossed Foil Greeting Card",
      category: "Stationery",
      cost: 99,
      qty: 1,
    },
  ];

  const totalCost = 450 + bundleItems.reduce((sum, item) => sum + item.cost * item.qty, 0);
  const retailPrice = 2899;
  const marginPercent = Math.round(((retailPrice - totalCost) / retailPrice) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
            Gift Builder Studio
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-normal">
            Configure seasonal curated hampers, packaging formats, and bundle recipes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition"
          >
            <Eye className="h-3.5 w-3.5 text-gray-500" />
            <span>Customer View</span>
          </button>
          <button
            type="button"
            onClick={() => alert("Hamper Recipe Saved & Published to Storefront!")}
            className="flex items-center gap-2 bg-[#F72585] hover:bg-[#d6136c] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-pink-500/20 transition"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Publish Hamper</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Builder Configuration */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Base Packaging */}
          <div className="rounded-2xl bg-white border border-gray-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Step 1: Choose Packaging Foundation
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Select the core vessel that houses this gift collection
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#F72585] bg-pink-50 px-2.5 py-1 rounded-full">
                Step 1 of 3
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {boxes.map(box => {
                const isSelected = selectedBox === box.id;
                return (
                  <div
                    key={box.id}
                    onClick={() => setSelectedBox(box.id)}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between text-left ${
                      isSelected
                        ? "border-[#F72585] bg-pink-50/20 shadow-xs"
                        : "border-gray-150 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3 bg-gray-100">
                      <Image src={box.image} alt={box.name} fill className="object-cover" />
                      {isSelected && (
                        <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-[#F72585] text-white flex items-center justify-center shadow-xs">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 leading-snug">{box.name}</h3>
                      <p className="text-[10px] text-gray-400 mt-0.5">{box.type} • {box.capacity}</p>
                      <div className="mt-2 text-xs font-black text-gray-900">₹{box.price} base</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Included Contents */}
          <div className="rounded-2xl bg-white border border-gray-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Step 2: Curated Hamper Contents
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Items bundled inside this gift set
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-bold text-[#F72585] hover:underline"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {bundleItems.map(item => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
                      <Package className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">{item.title}</h4>
                      <span className="text-[10px] text-gray-400 font-medium">{item.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <span className="text-xs font-semibold text-gray-500">Qty: {item.qty}</span>
                    <span className="text-xs font-bold text-gray-900 w-16 text-right">₹{item.cost}</span>
                    <button
                      type="button"
                      className="text-gray-300 hover:text-red-500 transition"
                      title="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Live Preview & Margin Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl bg-white border border-gray-200/80 p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900">
              Bundle Economics
            </h2>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-150 space-y-3 text-xs">
              <div className="flex items-center justify-between text-gray-500">
                <span>Vessel / Packaging Cost</span>
                <span className="font-semibold text-gray-800">₹450.00</span>
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>Internal Items Subtotal</span>
                <span className="font-semibold text-gray-800">₹{totalCost - 450}.00</span>
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>Assembly & Ribbon Finishing</span>
                <span className="font-semibold text-gray-800">₹0.00 (included)</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex items-center justify-between font-bold text-gray-900">
                <span>Total COGS</span>
                <span>₹{totalCost}.00</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block">
                Suggested Storefront Price (INR)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-500">₹</span>
                <input
                  type="number"
                  defaultValue={retailPrice}
                  className="w-full text-base font-black text-gray-900 bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#F72585]"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Projected Margin
                </span>
                <span className="text-xl font-black text-emerald-700">
                  {marginPercent}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-600 block">Gross Profit</span>
                <span className="text-sm font-black text-emerald-800">
                  ₹{retailPrice - totalCost}.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
