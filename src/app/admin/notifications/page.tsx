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
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider block">
          ONESIGNAL PUSH ENGINE
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Push Notifications Broadcast
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Engage 1,256+ active subscribers in Repalle &amp; Coastal AP with instant browser notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Broadcast Composer (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-white border border-gray-150 p-6 shadow-2xs space-y-5">
            <h2 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
              <Send className="h-4 w-4 text-[#F72585]" /> Compose Push Notification
            </h2>

            {sentSuccess && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Notification broadcast sent to 1,256 subscribers!
              </div>
            )}

            <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Notification Title (Short &amp; Catchy)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ⚡ Express Flowers in 2 Hours in Repalle!"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  className="w-full min-h-[44px] rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Body Message
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Celebrate your anniversary today with fresh Dutch roses and heart cakes. Order now!"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  className="w-full min-h-[70px] rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Target Destination URL (Click Action)
                </label>
                <input
                  type="text"
                  placeholder="/category/same-day or /category/personalised-gifts"
                  value={targetUrl}
                  onChange={e => setTargetUrl(e.target.value)}
                  required
                  className="w-full min-h-[44px] rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#F72585] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[44px] rounded-xl bg-[#F72585] hover:bg-[#d6136c] py-2.5 text-xs font-bold text-white shadow-md shadow-pink-500/25 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" /> Send Instant Broadcast to All Subscribers
              </button>
            </form>
          </div>

          {/* History */}
          <div className="rounded-3xl bg-white border border-gray-150 p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#C9A227]" /> Broadcast History
            </h2>

            <div className="divide-y divide-gray-100">
              {history.map(item => (
                <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-900">{item.title}</span>
                    <span className="text-[10px] text-gray-400">{item.sentAt}</span>
                  </div>
                  <p className="text-xs text-gray-600">{item.message}</p>
                  <div className="flex items-center gap-4 text-[10px] text-gray-400 pt-1">
                    <span>Delivered to: <strong className="text-emerald-700 font-bold">{item.subscribersCount}</strong> devices</span>
                    <span>Link: {item.targetUrl}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Automated Triggers & Settings (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white border border-gray-150 p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#F72585]" /> Automated Event Triggers
            </h2>
            <p className="text-xs text-gray-500">
              System alerts fired automatically upon customer and order lifecycle changes.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/70 border border-gray-100">
                <div>
                  <div className="text-xs font-bold text-gray-900">Order Out for Delivery</div>
                  <div className="text-[10px] text-gray-500">Alerts customer when rider leaves studio</div>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoOrderShipped(!autoOrderShipped)}
                  className="cursor-pointer"
                >
                  {autoOrderShipped ? (
                    <ToggleRight className="h-7 w-7 text-[#F72585]" />
                  ) : (
                    <ToggleLeft className="h-7 w-7 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/70 border border-gray-100">
                <div>
                  <div className="text-xs font-bold text-gray-900">Delivered &amp; Review Request</div>
                  <div className="text-[10px] text-gray-500">Prompts photo review 1 hour after handover</div>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoOrderDelivered(!autoOrderDelivered)}
                  className="cursor-pointer"
                >
                  {autoOrderDelivered ? (
                    <ToggleRight className="h-7 w-7 text-[#F72585]" />
                  ) : (
                    <ToggleLeft className="h-7 w-7 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/70 border border-gray-100">
                <div>
                  <div className="text-xs font-bold text-gray-900">Back in Stock Notification</div>
                  <div className="text-[10px] text-gray-500">Triggers when waitlisted item restocked</div>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoBackInStock(!autoBackInStock)}
                  className="cursor-pointer"
                >
                  {autoBackInStock ? (
                    <ToggleRight className="h-7 w-7 text-[#F72585]" />
                  ) : (
                    <ToggleLeft className="h-7 w-7 text-gray-400" />
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
