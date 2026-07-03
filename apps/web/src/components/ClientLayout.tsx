"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLoggedIn, getUser, logout } from "@/lib/api";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setUser(getUser());
  }, []);

  const isAdmin = user?.role === "ADMIN";
  const isAdminLogin = pathname === "/admin/login";

  return (
    <>
      {/* ─── HEADER (Kopar Style) ───────────────────────────────────────── */}
      {!isAdminLogin && (
      <header className="sticky top-0 z-50 w-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 relative rounded-xl overflow-hidden shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 group-hover:-translate-y-0.5 transition-all duration-300 bg-slate-900">
              <img src="/logo.png" alt="Mbolo Pay Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">
              Mbolo <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">Pay</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-50/50 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-100 dark:border-slate-800">
            <Link href="/" className="px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm">Collecte & Cagnotte</Link>
            {loggedIn && (
              <>
                <Link href="/dashboard" className="px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm">Dashboard</Link>
                {isAdmin && (
                  <Link href="/admin" className="px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20">Admin</Link>
                )}
              </>
            )}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-5">
            {loggedIn ? (
              <>
                <button
                  onClick={logout}
                  className="text-sm font-bold text-slate-500 hover:text-red-500 transition-colors"
                >
                  Déconnexion
                </button>
                <Link href="/creer" className="group relative inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-full overflow-hidden shadow-lg shadow-slate-900/20 dark:shadow-white/20 hover:-translate-y-0.5 transition-all duration-300">
                  Lancer une collecte
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </>
            ) : (
              <>
                <Link href="/connexion" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                  Se connecter
                </Link>
                <Link href="/creer" className="group relative inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-bold rounded-full overflow-hidden shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all duration-300">
                  Lancer une collecte
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2 text-slate-900 dark:text-white"
            aria-label="Ouvrir le menu"
          >
            <span className="block w-6 h-0.5 bg-current rounded-full" />
            <span className="block w-6 h-0.5 bg-current rounded-full" />
            <span className="block w-4 h-0.5 bg-current rounded-full" />
          </button>
        </div>
      </header>
      )}

      {/* ─── MOBILE MENU ──────────────────────────────────────────────── */}
      {!isAdminLogin && (
        <div 
          className={`mobile-menu-overlay ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setMobileMenuOpen(false)}
        >    <div className="mobile-menu-panel">
            <div className="flex items-center justify-between p-6 border-b">
              <span className="font-black text-lg">
                Mbolo <span className="text-primary">Pay</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-2">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                🌍 Explorer les collectes
              </Link>
              <Link href="/creer" onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                ➕ Lancer une collecte
              </Link>
              {loggedIn && (
                <>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}
                    className="py-3 px-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    📊 Mon Dashboard
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" onClick={() => setMobileMenuOpen(false)}
                      className="py-3 px-4 rounded-xl font-semibold text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
                      ⚙️ Administration
                    </Link>
                  )}
                </>
              )}
              <div className="border-t my-4" />
              {loggedIn ? (
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="py-3 px-4 rounded-xl font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                >
                  🚪 Déconnexion
                </button>
              ) : (
                <Link href="/connexion" onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 rounded-xl font-semibold text-primary hover:bg-primary/5 transition-colors">
                  🔑 Se connecter
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* ─── MAIN CONTENT ─────────────────────────────────────────────── */}
      <main className="flex-grow">{children}      </main>

      {/* ─── FOOTER ───────────────────────────────────────────────────── */}
      {!isAdminLogin && (
      <footer className="relative bg-slate-950 text-slate-400 pt-20 pb-10 overflow-hidden no-print">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-3 group mb-6 inline-flex">
                <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 group-hover:-translate-y-0.5 transition-all duration-300 bg-slate-900">
                  <img src="/logo.png" alt="Mbolo Pay Logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-black text-2xl tracking-tight text-white">
                  Mbolo <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">Pay</span>
                </span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
                La première plateforme de financement participatif 100% pensée pour le Sénégal. Financez vos projets sans aucune commission.
              </p>
              <div className="flex gap-3">
                <span className="text-[10px] uppercase tracking-widest bg-green-500/10 text-green-400 px-3 py-1.5 rounded-lg font-bold border border-green-500/20">Wave</span>
                <span className="text-[10px] uppercase tracking-widest bg-orange-500/10 text-orange-400 px-3 py-1.5 rounded-lg font-bold border border-orange-500/20">Orange Money</span>
                <span className="text-[10px] uppercase tracking-widest bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-lg font-bold border border-blue-500/20">CB</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg tracking-tight">Plateforme</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/#collectes" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Toutes les collectes</Link></li>
                <li><Link href="/creer" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Lancer une collecte</Link></li>
                <li><span className="inline-flex items-center gap-2 text-primary font-bold bg-primary/10 px-3 py-1 rounded-full text-xs">0% commission</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg tracking-tight">Légal</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Conditions d'utilisation</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Politique de confidentialité</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Mentions légales</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg tracking-tight">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">✉️</span>
                  <a href="mailto:contact@mbolopay.sn" className="hover:text-white transition-colors">contact@mbolopay.sn</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">📞</span>
                  <a href="tel:+221787956265" className="hover:text-white transition-colors">+221 78 795 62 65</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
            <p>© 2026 Mbolo Pay. Ensemble, on va plus loin.</p>
            <p>Conçu avec ❤️ au Sénégal</p>
          </div>
        </div>
      </footer>
      )}
    </>
  );
}
