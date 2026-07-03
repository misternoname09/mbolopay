"use client";

import { useState, useEffect } from "react";

export default function ProfilPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [kycFile, setKycFile] = useState<File | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("mbollopay_token");
    if (!token) {
      window.location.href = "/connexion";
      return;
    }

    fetch("http://127.0.0.1:3003/auth/me", {
      headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const token = localStorage.getItem("mbollopay_token");
    
    // Upload KYC if a file is selected
    if (kycFile) {
      const formData = new FormData();
      formData.append('file', kycFile);
      const uploadRes = await fetch("http://127.0.0.1:3003/auth/kyc-upload", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });
      if (!uploadRes.ok) {
         alert("Erreur lors de l'upload du document KYC");
         setIsUpdating(false);
         return;
      }
    }

    const res = await fetch("http://127.0.0.1:3003/auth/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })
    });

    if (res.ok) {
      alert("Profil mis à jour !");
      window.location.reload();
    }
    setIsUpdating(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-4 relative overflow-hidden font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-3xl mx-auto bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/50 dark:border-slate-800/50 relative z-10 animate-slide-up">
        
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12 text-center md:text-left">
          <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center text-5xl text-white font-black shadow-xl shadow-primary/20 transform hover:scale-105 transition-transform">
            {user.firstName?.[0] || user.phone[0]}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{user.firstName} {user.lastName}</h1>
            <p className="text-slate-500 font-mono text-sm mt-1">{user.phone}</p>
            <div className={`mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
              user.kycStatus === 'VERIFIED' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-emerald-200 dark:border-emerald-800/50' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 border-orange-200 dark:border-orange-800/50'
            }`}>
              {user.kycStatus === 'VERIFIED' ? '✓ Identité Vérifiée' : '⏳ KYC en attente'}
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Prénom</label>
              <input 
                className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-slate-900 dark:text-white font-medium"
                value={user.firstName || ""}
                onChange={e => setUser({...user, firstName: e.target.value})}
                placeholder="Votre prénom"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Nom</label>
              <input 
                className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-slate-900 dark:text-white font-medium"
                value={user.lastName || ""}
                onChange={e => setUser({...user, lastName: e.target.value})}
                placeholder="Votre nom"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Email</label>
            <input 
              type="email"
              className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-slate-900 dark:text-white font-medium"
              value={user.email || ""}
              onChange={e => setUser({...user, email: e.target.value})}
              placeholder="votre@email.com"
            />
          </div>

          <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:w-2 transition-all duration-300"></div>
            <h3 className="text-lg font-black mb-2 text-slate-900 dark:text-white">Vérification d'identité (KYC)</h3>
            <p className="text-sm text-slate-500 mb-6 font-medium">Téléchargez une photo de votre CNI, Passeport ou Permis de conduire pour débloquer les retraits.</p>
            
            {user.kycStatus === 'VERIFIED' ? (
              <div className="bg-emerald-100/50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 p-4 rounded-2xl flex items-center gap-4 border border-emerald-200 dark:border-emerald-800/30">
                <div className="w-10 h-10 bg-emerald-200 dark:bg-emerald-800/50 rounded-full flex items-center justify-center text-xl shadow-inner">
                  ✅
                </div>
                <p className="text-sm font-bold">Votre identité a été validée avec succès.</p>
              </div>
            ) : (
              <div className="relative">
                <input 
                  type="file"
                  accept="image/*,application/pdf"
                  capture="environment"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer file:cursor-pointer transition-colors"
                  onChange={e => setKycFile(e.target.files?.[0] || null)}
                />
              </div>
            )}
          </div>

          <button 
            type="submit"
            disabled={isUpdating}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-black text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isUpdating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Mise à jour...
              </>
            ) : "Enregistrer les modifications"}
          </button>
        </form>

      </div>
    </div>
  );
}
