"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, ShieldAlert, ShieldCheck, KeyRound, TerminalSquare } from "lucide-react";

export default function AdminLoginPage() {
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("mbollopay_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === "ADMIN") {
        window.location.href = "/admin";
      }
    }
  }, []);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (phone.length >= 9) {
      setLoading(true);
      try {
        const fullPhone = `+221${phone}`;
        const response = await fetch("http://127.0.0.1:3003/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: fullPhone }),
        });
        
        if (response.ok) {
          setStep("OTP");
        } else {
          setErrorMsg("Erreur système. Vérifiez le numéro.");
        }
      } catch (error) {
        console.error("Auth error:", error);
        setErrorMsg("Serveur inaccessible. [ERR_CONN_REFUSED]");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (otp.length === 6) {
      setLoading(true);
      try {
        const fullPhone = `+221${phone}`;
        const response = await fetch("http://127.0.0.1:3003/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: fullPhone, code: otp }),
        });
        
        const data = await response.json();
        
        if (response.ok && data.access_token) {
          // VÉRIFICATION DU RÔLE
          if (data.user.role !== "ADMIN") {
            setErrorMsg("ACCÈS REFUSÉ : Vous n'avez pas les droits d'administration.");
            return;
          }

          localStorage.setItem("mbollopay_token", data.access_token);
          localStorage.setItem("mbollopay_user", JSON.stringify(data.user));
          window.location.href = "/admin";
        } else {
          setErrorMsg("Code de sécurité invalide ou expiré.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setErrorMsg("Erreur fatale lors de l'authentification.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 font-mono text-slate-300 selection:bg-cyan-900 selection:text-cyan-100">
      
      {/* ─── LEFT PANEL (Matrix/Tech style) ──────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 bg-black relative flex-col justify-between p-12 overflow-hidden border-r border-slate-800/50">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top_left,rgba(8,145,178,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 text-cyan-500 mb-8">
            <TerminalSquare className="w-8 h-8" />
            <span className="font-bold text-xl tracking-[0.2em] uppercase">SYSTEM.CORE</span>
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight mb-6">
            MboloPay Admin_<br/>
            <span className="text-cyan-500">CONTROL CENTER</span>
          </h1>
          <div className="w-20 h-1 bg-cyan-500 mb-6 rounded-full"></div>
          
          <p className="text-slate-400 max-w-md leading-relaxed text-sm">
            [RESTRICTED AREA] Ce portail est strictement réservé au personnel autorisé. Toute tentative de connexion non autorisée sera enregistrée et signalée.
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-600 space-y-1">
          <p>SYS_VER: 2.4.1-STABLE</p>
          <p>NODE_ENV: PRODUCTION</p>
          <p>ENCRYPTION: AES-256-GCM</p>
        </div>
      </div>

      {/* ─── RIGHT PANEL (Login Form) ─────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 relative bg-slate-950">
        
        <div className="w-full max-w-[420px] space-y-8">
          
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <ShieldCheck className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-white tracking-widest uppercase">Admin_Portal</h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
              <Lock className="w-5 h-5 text-cyan-500" />
              <h2 className="text-lg font-bold text-white tracking-wider">AUTHENTIFICATION</h2>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-950/50 border border-red-900/50 rounded flex items-start gap-3 text-red-500 text-sm">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <p>{errorMsg}</p>
              </div>
            )}

            {step === "PHONE" ? (
              <form onSubmit={handleRequestOtp} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    IDENTIFIANT (NUMÉRO)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">+221</span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-16 pr-4 py-3 bg-black border border-slate-800 text-white font-mono focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-colors rounded"
                      placeholder="77 000 00 00"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold uppercase tracking-widest py-3 rounded transition-colors disabled:opacity-50"
                >
                  {loading ? "INITIALISATION..." : "SUIVANT"}
                </button>
              </form>
            ) : (
               <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    CODE DE SÉCURITÉ (OTP)
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-black border border-slate-800 text-white font-mono text-center tracking-[0.5em] text-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-colors rounded"
                      placeholder="------"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    Code envoyé au +221 {phone}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold uppercase tracking-widest py-3 rounded transition-colors disabled:opacity-50"
                >
                  {loading ? "VÉRIFICATION..." : "SE CONNECTER"}
                </button>
                
                <button
                  type="button"
                  onClick={() => setStep("PHONE")}
                  className="w-full text-xs text-slate-500 hover:text-cyan-500 uppercase tracking-widest transition-colors"
                >
                  ← RETOUR
                </button>
              </form>
            )}
          </div>
          
          <div className="text-center text-xs text-slate-600">
            &copy; 2026 MboloPay Operations.
          </div>
        </div>
      </div>
    </div>
  );
}
