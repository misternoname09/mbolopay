"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL, getCategoryLabel } from "@/lib/api";

export default function ExplorerPage() {
  const [collectes, setCollectes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const categories = [
    { value: "ALL", label: "Toutes", emoji: "🌍" },
    { value: "SANTE", label: "Santé", emoji: "🏥" },
    { value: "EDUCATION", label: "Éducation", emoji: "📚" },
    { value: "RELIGION", label: "Religion", emoji: "🕌" },
    { value: "URGENCE", label: "Urgence", emoji: "🚨" },
    { value: "SPORT", label: "Sport", emoji: "⚽" },
    { value: "EVENEMENT", label: "Événement", emoji: "🎉" },
    { value: "COTISATION", label: "Cotisation", emoji: "👥" },
    { value: "CADEAU", label: "Cadeau", emoji: "🎁" },
  ];

  const fetchCollectes = async (reset = false) => {
    try {
      if (reset) setLoading(true);
      const queryParams = new URLSearchParams({
        page: reset ? "1" : page.toString(),
        limit: "12",
      });
      if (search) queryParams.append("search", search);
      if (category !== "ALL") queryParams.append("category", category);

      const res = await fetch(`${API_URL}/collectes?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (reset) {
          setCollectes(data.collectes);
        } else {
          setCollectes(prev => [...prev, ...data.collectes]);
        }
        setHasMore(data.hasMore);
        if (reset) setPage(2);
        else setPage(p => p + 1);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des collectes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search
    const delayDebounceFn = setTimeout(() => {
      fetchCollectes(true);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, category]);

  const loadMore = () => {
    fetchCollectes(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-black">
            Découvrez les <span className="text-primary">Collectes</span>
          </h1>
          <p className="text-lg text-slate-500">
            Soutenez des projets qui ont du sens. Filtrer par catégorie ou recherchez une cause spécifique.
          </p>

          {/* Barre de Recherche */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-400">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Rechercher une collecte, un créateur, un mot-clé..."
              className="input-base pl-12 py-4 shadow-sm w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filtres de Catégories */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                category === cat.value
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Grille des Collectes */}
        {loading && collectes.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[400px] bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : collectes.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
            <span className="text-6xl mb-4 block">🏜️</span>
            <h3 className="text-xl font-bold mb-2">Aucune collecte trouvée</h3>
            <p className="text-slate-500">Essayez de modifier vos filtres ou votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collectes.map((collecte) => {
              const catData = getCategoryLabel(collecte.category);
              const progress = Math.min(100, Math.round((collecte.collectedXof / collecte.targetXof) * 100));

              return (
                <Link key={collecte.id} href={`/collecte/${collecte.slug}`} className="group bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-black/40 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border border-white/50 dark:border-slate-800/50 flex flex-col transform hover:-translate-y-2">
                  {/* Image */}
                  <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                    {collecte.photoUrl ? (
                      <img src={collecte.photoUrl} alt={collecte.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl opacity-20 bg-gradient-to-br from-primary/10 to-accent/10">📸</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-2 shadow-sm uppercase tracking-widest text-slate-700 dark:text-slate-200 border border-white/50 dark:border-slate-700/50">
                      <span>{catData.emoji}</span>
                      <span>{catData.label}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col relative z-10">
                    <h3 className="font-black text-xl leading-tight mb-3 text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                      {collecte.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 line-clamp-2 flex-1">
                      {collecte.description}
                    </p>

                    <div className="space-y-4 mt-auto">
                      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${progress}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 w-full h-full blur-[2px]"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Collecté</p>
                          <p className="font-black text-xl text-slate-900 dark:text-white leading-none">
                            {collecte.collectedXof.toLocaleString()} <span className="text-sm font-bold text-slate-400">XOF</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Objectif</p>
                          <p className="font-bold text-sm text-slate-500">
                            {collecte.targetXof.toLocaleString()} XOF
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Bouton Voir Plus */}
        {hasMore && !loading && (
          <div className="text-center pt-8">
            <button onClick={loadMore} className="btn-outline">
              Voir plus de collectes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
