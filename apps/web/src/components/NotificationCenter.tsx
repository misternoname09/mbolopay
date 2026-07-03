"use client";

import { useState, useEffect } from "react";

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("mbollopay_token");
    if (!token) return;

    try {
      const res = await fetch("http://127.0.0.1:3003/notifications", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
        setUnreadCount(data.length); // Simplified unread count
      }
    } catch (e) {
      console.error("Notification fetch error", e);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Refresh every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-black text-lg">Notifications</h3>
            <button className="text-[10px] font-black text-primary hover:underline uppercase">Tout marquer comme lu</button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div key={n.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                      {n.type === 'SMS' ? '📱' : '📧'}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">{n.title}</p>
                      <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-snug">{n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-2 font-bold">{new Date(n.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400 italic">
                Aucune nouvelle notification.
              </div>
            )}
          </div>
          
          <div className="p-4 bg-slate-50 dark:bg-slate-800 text-center">
             <button className="text-xs font-bold text-slate-500 hover:text-primary">Voir tout l'historique</button>
          </div>
        </div>
      )}
    </div>
  );
}
