"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { API_URL, formatXOF, daysRemaining, getCategoryLabel, progressPercent, CATEGORIES } from "@/lib/api";
import { 
  User, 
  Share2, 
  Wallet, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  Globe, 
  HeartHandshake, 
  CheckCircle,
  Banknote,
  ArrowRight
} from "lucide-react";

interface CollecteCard {
  id: string;
  slug: string;
  title: string;
  category: string;
  targetXof: number;
  collectedXof: number;
  endDate: string;
  photoUrl: string | null;
  verifiedBadge: boolean;
  user: { firstName: string | null; lastName: string | null };
  _count: { dons: number };
}

export default function HomePage() {
  const [collectes, setCollectes] = useState<CollecteCard[]>([]);
  const [endingSoon, setEndingSoon] = useState<CollecteCard[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchCollectes = useCallback(async (pageNum: number, append = false) => {
    try {
      if (append) setLoadingMore(true); else setLoading(true);

      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (category !== "ALL") params.set("category", category);
      params.set("page", pageNum.toString());
      params.set("limit", "20");

      const res = await fetch(`${API_URL}/collectes?${params}`);
      const data = await res.json();
      
      const newCollectes = data.collectes || [];

      if (append) {
        setCollectes(prev => [...prev, ...newCollectes]);
      } else {
        setCollectes(newCollectes);
      }
      setHasMore(data.hasMore || false);
      setTotal(data.total);
    } catch (e) {
      console.error("Fetch error", e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [search, category]);

  // Fetch ending soon collectes
  useEffect(() => {
    fetch(`${API_URL}/collectes/ending-soon?limit=4`)
      .then(res => res.json())
      .then(data => setEndingSoon(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  // Fetch collectes on search/category change
  useEffect(() => {
    setPage(1);
    fetchCollectes(1);
  }, [search, category, fetchCollectes]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchCollectes(next, true);
  };

  // Debounced search
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans">

      {/* ─── HERO (Ultra-Premium Fintech) ────────────────────────────────────────── */}
      {/* ─── PREMIUM HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-4 overflow-hidden bg-slate-950">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto max-w-6xl text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 font-bold text-sm mb-8 backdrop-blur-md shadow-2xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Plateforme Certifiée & Sécurisée (Sénégal)
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.05]">
            Financez vos rêves<br className="hidden md:block"/> sans <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">commission.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Créez une cagnotte en 2 minutes. Recevez des dons via <strong className="text-white">Wave</strong>, <strong className="text-white">Orange Money</strong> ou CB. Retirez vos fonds instantanément.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/collecte/create" className="relative group inline-flex items-center justify-center w-full sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center bg-slate-900 text-white border border-white/10 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition duration-300 w-full">
                Lancer une cagnotte
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform text-emerald-400" />
              </div>
            </Link>
            <a href="#collectes" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-lg border border-white/10 backdrop-blur-sm transition-all duration-300">
              Explorer les projets
            </a>
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────────────── */}
      <section className="relative z-20 -mt-10 mb-20 px-4 animate-slide-up" style={{ animationDelay: "400ms" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white dark:border-slate-800 p-8 md:p-12 rounded-[32px] shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
              <div className="pt-4 md:pt-0">
                <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 tracking-tighter">{total}+</p>
                <p className="text-xs font-black text-slate-400 uppercase mt-2 tracking-widest">Cagnottes Actives</p>
              </div>
              <div className="pt-8 md:pt-0">
                <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-primary to-blue-400 tracking-tighter">0%</p>
                <p className="text-xs font-black text-slate-400 uppercase mt-2 tracking-widest">Frais de plateforme</p>
              </div>
              <div className="pt-8 md:pt-0">
                <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-green-500 to-emerald-400 tracking-tighter">100%</p>
                <p className="text-xs font-black text-slate-400 uppercase mt-2 tracking-widest">Retraits instantanés</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ENDING SOON ──────────────────────────────────────────────── */}
      {endingSoon.length > 0 && (
        <section className="py-20 px-4 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⏳</span>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Objectifs urgents</h2>
                <span className="badge-urgence shadow-sm shadow-red-500/20">Clôture imminente</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {endingSoon.map(c => (
                <CollecteCardComponent key={c.id} collecte={c} urgent />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── SEARCH + FILTERS + COLLECTES ─────────────────────────────── */}
      <section id="collectes" className="py-24 px-4 bg-white dark:bg-slate-950">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-black uppercase tracking-widest text-xs mb-4">Solidaire</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Découvrez les projets</h2>
            <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">Soutenez les initiatives qui comptent pour vous, directement depuis votre téléphone.</p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-10 max-w-2xl mx-auto">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔍</span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Rechercher une cagnotte, une association..."
              className="w-full pl-14 pr-6 py-5 rounded-full text-lg font-medium bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-3 overflow-x-auto pb-6 mb-12 scrollbar-hide snap-x justify-start md:justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`snap-center flex-shrink-0 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  category === cat.value
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl shadow-slate-900/20 transform scale-105"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md"
                }`}
              >
                <span className="mr-2 text-lg">{cat.emoji}</span> {cat.label}
              </button>
            ))}
          </div>

          {/* Collectes Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-collecte animate-pulse border-none shadow-sm rounded-[24px]">
                  <div className="h-52 bg-slate-200 dark:bg-slate-800" />
                  <div className="p-6 space-y-4">
                    <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full mt-4" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : collectes.length === 0 ? (
            <div className="text-center py-24 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800/50">
              <div className="w-20 h-20 bg-white dark:bg-slate-800 shadow-sm rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🔍</div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Aucun projet trouvé</h3>
              <p className="text-slate-500 text-lg">Essayez d'ajuster votre recherche ou explorez une autre catégorie.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {collectes.map(c => (
                  <CollecteCardComponent key={c.id} collecte={c} />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-16">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="btn-outline px-10 py-4 bg-white dark:bg-slate-950 hover:bg-slate-50 shadow-sm rounded-full"
                  >
                    {loadingMore ? "Chargement..." : `Voir plus de projets (${total - collectes.length} restants)`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-black uppercase tracking-widest text-xs mb-4">Zéro friction. 100% Impact.</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">De l'idée aux fonds en 4 étapes chrono</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-slate-200 via-primary/30 to-slate-200 dark:from-slate-800 dark:via-primary/50 dark:to-slate-800 z-0"></div>

            {[
              { 
                icon: <User className="w-6 h-6" />, 
                title: "1. Votre compte en 60s", 
                desc: "Fini les formulaires sans fin. L'inscription est gratuite, blindée niveau sécurité, et validée en un éclair." 
              },
              { 
                icon: <Zap className="w-6 h-6" />, 
                title: "2. Le projet sous les projecteurs", 
                desc: "Un rêve à financer ? Une urgence ? Créez une page qui vous ressemble, ajoutez vos visuels chocs et fixez votre but." 
              },
              { 
                icon: <Share2 className="w-6 h-6" />, 
                title: "3. Propulsez la campagne", 
                desc: "Un lien suffit. Balancez-le sur WhatsApp ou vos réseaux. Vos soutiens donnent instantanément via Wave, Orange Money ou CB." 
              },
              { 
                icon: <Wallet className="w-6 h-6" />, 
                title: "4. Encaissez sans attendre", 
                desc: "C'est votre argent. Retirez-le directement sur votre portefeuille Mobile Money. Transparence absolue, zéro surprise." 
              }
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center p-6 group">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-950 flex items-center justify-center text-primary shadow-xl shadow-slate-200/50 dark:shadow-none mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {s.icon}
                </div>
                <h3 className="font-black text-xl mb-3 text-slate-900 dark:text-white">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[260px] mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES (Premium) ────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 text-emerald-500 font-black uppercase tracking-widest text-xs mb-4 border border-emerald-500/20">Pourquoi nous choisir ?</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">L'excellence au service de vos projets</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">Mbolo Pay allie la technologie financière internationale aux réalités locales pour vous offrir la meilleure expérience possible.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Smartphone className="w-8 h-8" />, title: "Paiements Locaux", desc: "Intégration native avec Wave et Orange Money pour des contributions sans friction." },
              { icon: <Banknote className="w-8 h-8" />, title: "0% Commission", desc: "Nous ne prenons aucun pourcentage sur l'argent que vous collectez. Tout vous revient." },
              { icon: <ShieldCheck className="w-8 h-8" />, title: "Sécurité Bancaire", desc: "Vérification KYC et cryptage de bout en bout pour protéger chaque transaction." },
              { icon: <CreditCard className="w-8 h-8" />, title: "Soutien International", desc: "La diaspora peut participer instantanément avec n'importe quelle carte Visa ou Mastercard." },
              { icon: <HeartHandshake className="w-8 h-8" />, title: "Pensé pour le Sénégal", desc: "Une plateforme construite spécifiquement pour les réalités et la solidarité de chez nous." },
              { icon: <Globe className="w-8 h-8" />, title: "Transparence Totale", desc: "Suivez chaque don en temps réel avec un historique public et des reçus clairs." },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-[32px] bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-white/10 hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden backdrop-blur-xl shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-slate-900/80 flex items-center justify-center text-emerald-500 mb-6 group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-cyan-500 group-hover:text-white transition-all duration-500 shadow-sm border border-emerald-500/10 group-hover:border-transparent">
                  {f.icon}
                </div>
                <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CALL TO ACTION (Premium) ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden bg-slate-950">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 backdrop-blur-xl p-12 md:p-20 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden group">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none"></div>
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none group-hover:bg-cyan-500/30 transition-all duration-700" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none group-hover:bg-emerald-500/30 transition-all duration-700" />
            
            <h2 className="text-4xl md:text-6xl font-black mb-6 relative z-10 tracking-tight leading-tight text-white">
              Prêt à faire la différence ?
            </h2>
            <p className="text-slate-400 text-lg md:text-xl mb-12 relative z-10 max-w-2xl mx-auto font-medium">
              Rejoignez des milliers de porteurs de projets qui utilisent Mbolo Pay pour transformer leurs idées en réalité.
            </p>
            <Link href="/collecte/create" className="relative group inline-flex items-center gap-3 z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition duration-300">
                Lancer votre cagnotte
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform text-emerald-500" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Collecte Card Component ──────────────────────────────────────────────────

function CollecteCardComponent({ collecte, urgent = false }: { collecte: CollecteCard; urgent?: boolean }) {
  const progress = progressPercent(collecte.collectedXof, collecte.targetXof);
  const days = daysRemaining(collecte.endDate);
  const cat = getCategoryLabel(collecte.category);

  return (
    <Link href={`/collecte/${collecte.slug}`} className="card-collecte flex flex-col h-full bg-white dark:bg-slate-900/40 backdrop-blur-md rounded-[32px] overflow-hidden border border-slate-100 dark:border-white/10 shadow-lg hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-500 group relative">
      {/* Photo */}
      <div className="relative h-60 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity z-10 duration-500"></div>
        {collecte.photoUrl ? (
          <img src={collecte.photoUrl} alt={collecte.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-slate-900 flex items-center justify-center">
            <span className="text-7xl opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500">{cat.emoji}</span>
          </div>
        )}
        
        {/* Gradient Overlay for text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none z-10"></div>

        {/* Category Badge */}
        <div className="absolute top-5 left-5 z-20">
          <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm px-4 py-2 rounded-full font-black text-xs">{cat.emoji} {cat.label}</span>
        </div>
        
        {/* Verified Badge */}
        {collecte.verifiedBadge && (
          <div className="absolute top-5 right-5 z-20">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm px-3 py-1.5 rounded-full font-black text-[10px] flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Vérifié</span>
          </div>
        )}
        
        {/* Urgent indicator */}
        {urgent && days <= 3 && (
          <div className="absolute bottom-5 left-5 z-20">
            <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/30 px-4 py-2 rounded-full font-black text-xs animate-pulse">🔥 {days}j restants</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] group-hover:bg-emerald-500/10 transition-all pointer-events-none"></div>
        <h3 className="font-black text-xl mb-6 line-clamp-2 text-slate-900 dark:text-white group-hover:text-emerald-400 transition-colors leading-snug">
          {collecte.title}
        </h3>

        <div className="mt-auto relative z-10">
          {/* Progress Bar */}
          <div className="h-3 mb-5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 relative" style={{ width: `${progress}%` }}>
               <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-end justify-between text-sm mb-6">
            <div>
              <div className="font-black text-2xl text-slate-900 dark:text-white tracking-tight">{formatXOF(collecte.collectedXof, false)} XOF</div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Sur {formatXOF(collecte.targetXof, false)}</div>
            </div>
            <span className="text-sm font-black text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">{progress}%</span>
          </div>

          {/* Meta Row */}
          <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-white/5 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-[10px]">🤝</span>
              {collecte._count?.dons || 0} soutien{(collecte._count?.dons || 0) > 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-[10px]">⏰</span>
              {days > 0 ? `${days} jours` : "Terminée"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
