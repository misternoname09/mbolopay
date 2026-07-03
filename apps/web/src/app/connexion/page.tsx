"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "../../lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";

export default function ConnexionPage() {
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    if (localStorage.getItem("mbollopay_token")) {
      window.location.href = "/dashboard";
    }
  }, []);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 9) {
      setLoading(true);
      try {
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        const formattedPhone = "+221" + phone;
        
        const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
        setConfirmationResult(confirmation);
        setStep("OTP");
      } catch (error) {
        console.error("Firebase auth error:", error);
        alert("Erreur lors de l'envoi du SMS. Assurez-vous que le domaine est autorisé dans la console Firebase.");
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6 && confirmationResult) {
      setLoading(true);
      try {
        // 1. Vérification du code SMS via Firebase
        const result = await confirmationResult.confirm(otp);
        
        // 2. Récupération du jeton sécurisé de Google
        const idToken = await result.user.getIdToken();
        
        // 3. Authentification sur notre propre API
        const response = await fetch("http://127.0.0.1:3003/auth/firebase-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken, referralCode }),
        });
        
        const data = await response.json();
        
        if (response.ok && data.access_token) {
          localStorage.setItem("mbollopay_token", data.access_token);
          localStorage.setItem("mbollopay_user", JSON.stringify(data.user));
          const params = new URLSearchParams(window.location.search);
          const redirectUrl = params.get("redirect") || "/dashboard";
          window.location.href = redirectUrl;
        } else {
          alert("Erreur lors de la création de session Mbolo Pay.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        alert("Code incorrect ou expiré.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950">
      {/* ─── LEFT PANEL (Branding) ────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] bg-slate-950 relative flex-col justify-between p-12 overflow-hidden border-r border-slate-800">
        {/* Mesh Background */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/4 top-1/4 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.2),transparent_60%)] blur-3xl opacity-70"></div>
          <div className="absolute right-0 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.15),transparent_60%)] blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
        </div>

        <Link href="/" className="flex items-center gap-2 group relative z-10 w-fit">
          <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 group-hover:-translate-y-0.5 transition-all duration-300 bg-slate-900">
            <img src="/logo.png" alt="Mbolo Pay Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-black text-2xl tracking-tight text-white">
            Mbolo <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500">Pay</span>
          </span>
        </Link>

        <div className="relative z-10 mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-xs font-bold text-white mb-8 shadow-xl">
            <span className="text-emerald-400">🔒</span>
            <span className="tracking-wide">Plateforme 100% Sécurisée</span>
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tighter">
            Donnez vie à vos projets,<br/> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-cyan-400 to-blue-400">en toute simplicité.</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-md leading-relaxed">
            Rejoignez des milliers de Sénégalais sur la première plateforme de crowdfunding sans commission.
          </p>
        </div>
      </div>

      {/* ─── RIGHT PANEL (Form) ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden">
        {/* Subtle decorative glow for light/dark mode */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-[440px] relative z-10 bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/50 dark:border-slate-800/50 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 p-8 sm:p-10 rounded-[2.5rem]">
          
          <div className="text-center lg:text-left">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-2 mb-10">
              <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-lg shadow-emerald-500/30 bg-slate-900">
                <img src="/logo.png" alt="Mbolo Pay Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">
                Mbolo <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500">Pay</span>
              </span>
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Connexion / Inscription
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 font-medium">
              Entrez votre numéro de téléphone pour accéder à votre espace sécurisé.
            </p>
          </div>

          {step === "PHONE" ? (
            <form className="mt-8 space-y-6" onSubmit={handleRequestOtp}>
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Numéro de téléphone
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <span className="text-lg">📱</span>
                    <span className="ml-2 font-bold border-r border-slate-200 dark:border-slate-700 pr-3">+221</span>
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full pl-[6.5rem] pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white font-medium text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm"
                    placeholder="77 123 45 67"
                  />
                </div>
              </div>

              <div id="recaptcha-container"></div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-4 px-4 font-bold rounded-2xl text-white bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-cyan-500/20 text-lg"
              >
                {loading ? "Chargement..." : "Continuer"}
              </button>
            </form>
          ) : (
            <form className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={handleVerifyOtp}>
              <div>
                <label htmlFor="otp" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Code de vérification (OTP)
                </label>
                <div className="relative group mb-2">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <span className="text-lg">🔑</span>
                  </div>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white text-center tracking-[0.75em] text-2xl font-black font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm uppercase"
                    placeholder="------"
                  />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Entrez le code envoyé au <strong className="text-slate-700 dark:text-slate-200">+221 {phone}</strong>
                </p>
              </div>

              <div>
                <label htmlFor="referral" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Code de parrainage <span className="text-slate-400 font-normal">(Optionnel)</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <span className="text-lg">🎁</span>
                  </div>
                  <input
                    id="referral"
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm"
                    placeholder="Ex: MB-1234"
                  />
                </div>
              </div>
   
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-4 px-4 font-bold rounded-2xl text-white bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-cyan-500/20 text-lg"
              >
                {loading ? "Vérification..." : "Se connecter"}
              </button>
              
              <div className="text-center lg:text-left mt-6">
                <button 
                  type="button" 
                  onClick={() => setStep("PHONE")}
                  className="group flex items-center justify-center lg:justify-start gap-3 w-full lg:w-auto px-4 py-2 rounded-xl text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-500/20 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  </div>
                  <span className="font-bold text-sm tracking-wide">Utiliser un autre numéro</span>
                </button>
              </div>
            </form>
          )}

          {/* Trust Indicators */}
          <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1.5">
              <span>🔒</span> Chiffrement de bout en bout • Connexion sécurisée
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
