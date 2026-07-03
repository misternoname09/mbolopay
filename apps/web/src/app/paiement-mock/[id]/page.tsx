"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { API_URL } from "@/lib/api";

export default function MockPaymentPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const donId = params.id as string;
  const slug = searchParams.get('slug');
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      // On simule l'appel du webhook par PayDunya
      const res = await fetch(`${API_URL}/dons/webhook/paydunya`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transaction_id: donId,
          status: 'completed'
        })
      });

      if (res.ok) {
        alert("Paiement simulé avec succès !");
        if (slug) {
          router.push(`/collecte/${slug}?status=success`);
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      alert("Erreur lors de la simulation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1ccbe8] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Decorative Wave background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-8 text-center space-y-6 relative z-10 animate-slide-up">
        <div className="w-20 h-20 bg-[#1ccbe8]/10 rounded-full flex items-center justify-center mx-auto text-4xl mb-2">
          🌊
        </div>
        
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Paiement MboloPay</h1>
        <p className="text-slate-500 font-medium text-sm">
          Environnement de Test (Simulation locale sans frais réels).
        </p>
        
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner flex flex-col gap-2">
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Identifiant Transaction</div>
          <div className="text-lg font-mono font-bold text-slate-700 break-all bg-white py-2 px-3 rounded-lg border border-slate-200">
            {donId}
          </div>
        </div>

        <button 
          onClick={handlePay}
          disabled={loading}
          className="w-full py-4 bg-[#1ccbe8] text-white rounded-2xl font-black text-lg hover:bg-[#15b2cc] transition-all shadow-xl shadow-[#1ccbe8]/40 disabled:opacity-50 active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Traitement en cours...
            </span>
          ) : "Confirmer le paiement"}
        </button>

        <button 
          onClick={() => router.back()}
          className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors pt-4 block w-full"
        >
          Annuler et retourner au site
        </button>
      </div>
    </div>
  );
}
