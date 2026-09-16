"use client";

import React, { useState } from "react";
import {
  Bell,
  Send,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface SentNotification {
  id: string;
  title: string;
  message: string;
  sentAt: string;
  targetUrl: string;
  subscribersCount: number;
}

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetUrl, setTargetUrl] = useState("/category/same-day");
  const [sentSuccess, setSentSuccess] = useState(false);

  // Auto-trigger toggles
  const [autoOrderShipped, setAutoOrderShipped] = useState(true);
  const [autoOrderDelivered, setAutoOrderDelivered] = useState(true);
  const [autoBackInStock, setAutoBackInStock] = useState(true);
  const [autoAbandonedCart, setAutoAbandonedCart] = useState(false);

  const [history, setHistory] = useState<SentNotification[]>([
    {
      id: "notif-1",
      title: "⚡ Midnight Delivery in Repalle Tonight!",
      message: "Order by 7 PM for guaranteed midnight cake & bouquet surprise delivery.",
      sentAt: "Yesterday at 04:30 PM",
      targetUrl: "/category/same-day",
      subscribersCount: 1248,
    },
    {
      id: "notif-2",
      title: "✨ Flat 10% Off on 3D LED Illusion Lamps",
      message: "Use coupon CREATIVE10 to customise couples lamps with free wooden stand.",
      sentAt: "2 days ago at 11:00 AM",
      targetUrl: "/category/personalised-gifts",
      subscribersCount: 1190,
    },
  ]);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const newNotif: SentNotification = {
      id: `notif-${Date.now()}`,
      title: title.trim(),
      message: message.trim(),
      sentAt: "Just now",
      targetUrl: targetUrl.trim(),
      subscribersCount: 1256,
    };

    setHistory(prev => [newNotif, ...prev]);
    setSentSuccess(true);
    setTitle("");
    setMessage("");

    setTimeout(() => {
      setSentSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider block">
          ONESIGNAL PUSH ENGINE
        </span>
        <h1 className="text-2xl font-black text-white">Push Notifications Broadcast</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Engage 1,256+ active subscribers in Repalle & Coastal AP with instant browser notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Broadcast Composer (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl bg-[#121520] border border-gray-800 p-6 shadow-xs space-y-5">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <Send className="h-4 w-4 text-[#F72585]" /> Compose Push Notification
            </h2>

            {sentSuccess && (
              <div className="rounded-xl bg-emerald-950/60 border border-emerald-700/50 p-3.5 text-xs font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Notification broadcast sent to 1,256 subscribers!
              </div>
            )}

            <form onSubmit={handleBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Notification Title (Short & Catchy)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ⚡ Express Flowers in 2 Hours in Repalle!"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  className="w-full min-h-[44px] rounded-xl border border-gray-800 bg-[#0A0A0A] px-3 py-2.5 text-xs text-white placeholder:text-gray-600 focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Body Message
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Celebrate your anniversary today with fresh Dutch roses and heart cakes. Order now!"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  className="w-full min-h-[70px] rounded-xl border border-gray-800 bg-[#0A0A0A] px-3 py-2.5 text-xs text-white placeholder:text-gray-600 focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Target Destination URL (Click Action)
                </label>
                <input
                  type="text"
                  placeholder="/category/same-day or /category/personalised-gifts"
                  value={targetUrl}
                  onChange={e => setTargetUrl(e.target.value)}
                  className="w-full min-h-[44px] rounded-xl border border-gray-800 bg-[#0A0A0A] px-3 py-2.5 text-xs text-white placeholder:text-gray-600 focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#F72585] py-3 text-xs font-bold text-white shadow-lg hover:bg-[#d6136c] transition cursor-pointer"
              >
                <Bell className="h-4 w-4" /> Broadcast Push to 1,256 Subscribers
              </button>
            </form>
          </div>

          {/* Broadcast History */}
          <div className="rounded-2xl bg-[#121520] border border-gray-800 p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-white">Broadcast Send History</h3>
            <div className="divide-y divide-gray-800/60 space-y-3">
              {history.map(item => (
                <div key={item.id} className="pt-3 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <span className="text-[10px] text-gray-500">{item.sentAt}</span>
                  </div>
                  <p className="text-gray-400">{item.message}</p>
                  <div className="flex items-center justify-between pt-1 text-[10px] text-emerald-400">
                    <span>Delivered to {item.subscribersCount} subscribers</span>
                    <span className="text-gray-500">{item.targetUrl}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Automated Triggers & Subscriber Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Stats */}
          <div className="rounded-2xl bg-[#121520] border border-gray-800 p-6 shadow-xs space-y-3">
            <span className="text-xs font-bold text-gray-400">Total Web Push Subscribers</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">1,256</span>
              <span className="text-xs text-emerald-400 font-bold">↑ +42 this week</span>
            </div>
            <p className="text-[11px] text-gray-500">
              Users who approved notifications via the custom prompt in Repalle & Coastal AP.
            </p>
          </div>

          {/* Automatic Triggers */}
          <div className="rounded-2xl bg-[#121520] border border-gray-800 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-white">Automated Triggers</h3>
            <p className="text-xs text-gray-400">
              Automatic push events sent when orders change or inventory updates.
            </p>

            <div className="space-y-3 divide-y divide-gray-800 text-xs">
              <div className="pt-3 flex items-center justify-between">
                <div>
                  <strong className="text-white block">Order Shipped Notification</strong>
                  <span className="text-gray-500 text-[11px]">Alerts buyer when rider is en route</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoOrderShipped(!autoOrderShipped)}
                  aria-label="Toggle Order Shipped Notification"
                  className={`min-w-[44px] min-h-[44px] flex items-center justify-center transition cursor-pointer ${autoOrderShipped ? "text-[#F72585]" : "text-gray-600"
                    }`}
                >
                  {autoOrderShipped ? (
                    <ToggleRight className="h-6 w-6" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" />
                  )}
                </button>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <div>
                  <strong className="text-white block">Order Delivered Notification</strong>
                  <span className="text-gray-500 text-[11px]">Sends celebration message upon handover</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoOrderDelivered(!autoOrderDelivered)}
                  aria-label="Toggle Order Delivered Notification"
                  className={`min-w-[44px] min-h-[44px] flex items-center justify-center transition cursor-pointer ${autoOrderDelivered ? "text-[#F72585]" : "text-gray-600"
                    }`}
                >
                  {autoOrderDelivered ? (
                    <ToggleRight className="h-6 w-6" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" />
                  )}
                </button>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <div>
                  <strong className="text-white block">Back-in-Stock Alert</strong>
                  <span className="text-gray-500 text-[11px]">Notifies users when popular gifts restock</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoBackInStock(!autoBackInStock)}
                  aria-label="Toggle Back-in-Stock Alert"
                  className={`min-w-[44px] min-h-[44px] flex items-center justify-center transition cursor-pointer ${autoBackInStock ? "text-[#F72585]" : "text-gray-600"
                    }`}
                >
                  {autoBackInStock ? (
                    <ToggleRight className="h-6 w-6" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" />
                  )}
                </button>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <div>
                  <strong className="text-white block">Abandoned Cart Reminder</strong>
                  <span className="text-gray-500 text-[11px]">Prompts after 2 hours with CREATIVE10 coupon</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoAbandonedCart(!autoAbandonedCart)}
                  aria-label="Toggle Abandoned Cart Reminder"
                  className={`min-w-[44px] min-h-[44px] flex items-center justify-center transition cursor-pointer ${autoAbandonedCart ? "text-[#F72585]" : "text-gray-600"
                    }`}
                >
                  {autoAbandonedCart ? (
                    <ToggleRight className="h-6 w-6" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
