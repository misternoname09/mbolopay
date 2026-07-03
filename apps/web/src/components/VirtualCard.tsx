"use client";

import { useState, useEffect } from "react";

export default function VirtualCard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("mbollopay_user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  if (!user) return null;

  return (
    <div className="relative w-full h-56 rounded-[28px] overflow-hidden shadow-2xl group perspective-1000">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 p-8 flex flex-col justify-between text-white border border-white/10">
        
        {/* Holographic effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-primary/10 via-transparent to-blue-500/10 pointer-events-none"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-1">Mbolo Virtual Card</p>
            <h3 className="text-xl font-bold italic tracking-tighter">PREMIUM TERANGA</h3>
          </div>
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10">
            <span className="text-2xl">✨</span>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-2xl font-black tracking-[0.15em] mb-4">
            4521 •••• •••• {user.phone?.slice(-4) || '7890'}
          </p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[8px] font-bold uppercase opacity-50 mb-1 tracking-widest">Titulaire</p>
              <p className="text-sm font-black uppercase">{user.firstName} {user.lastName}</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-bold uppercase opacity-50 mb-1 tracking-widest">Validité</p>
              <p className="text-sm font-bold">12 / 29</p>
            </div>
          </div>
        </div>

        {/* Chip simulation */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 w-10 h-8 bg-yellow-500/20 rounded-md border border-yellow-500/30 overflow-hidden">
           <div className="w-full h-[1px] bg-yellow-500/30 mt-2"></div>
           <div className="w-full h-[1px] bg-yellow-500/30 mt-2"></div>
           <div className="w-full h-[1px] bg-yellow-500/30 mt-2"></div>
        </div>
      </div>

      {/* Gloss reflection */}
      <div className="absolute top-0 -left-full w-1/2 h-full bg-white/10 skew-x-[-25deg] transition-all duration-1000 group-hover:left-[150%]"></div>
    </div>
  );
}
