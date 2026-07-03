"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { API_URL, formatXOF, progressPercent } from "@/lib/api";

export default function Dashboard() {
  const [collectes, setCollectes] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalCollected: 0, totalDons: 0 });
  const [user, setUser] = useState<any>(null);
  
  // Withdrawal Form State
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [withdrawData, setWithdrawData] = useState({ collecteId: "", amount: "", method: "WAVE", phone: "" });
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // Update Form State
  const [showUpdateForm, setShowUpdateForm] = useState<string | null>(null);
  const [updateContent, setUpdateContent] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("mbollopay_token");
    if (!token) {
      window.location.href = "/connexion";
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { "Authorization": `Bearer ${token}` };
        
        const [resCol, resWith, resUser] = await Promise.all([
          fetch(`${API_URL}/collectes/me`, { headers }),
          fetch(`${API_URL}/retraits`, { headers }),
          fetch(`${API_URL}/auth/me`, { headers })
        ]);

        if (resCol.ok) {
          const colData = await resCol.json();
          setCollectes(colData);
          
          let totalXof = 0;
          let donsCount = 0;
          colData.forEach((c: any) => {
            totalXof += c.collectedXof;
            donsCount += c._count?.dons || 0;
          });
          setStats({ totalCollected: totalXof, totalDons: donsCount });
        }
        if (resWith.ok) setWithdrawals(await resWith.json());
        if (resUser.ok) {
          const u = await resUser.json();
          setUser(u);
          setWithdrawData(prev => ({ ...prev, phone: u.phone }));
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawData.collecteId || !withdrawData.amount || !withdrawData.method || !withdrawData.phone) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const collecte = collectes.find(c => c.id === withdrawData.collecteId);
    if (collecte) {
      const available = getAvailableBalance(collecte);
      if (Number(withdrawData.amount) > available) {
        alert(`Le montant demandé dépasse le solde disponible (${available} XOF)`);
        return;
      }
    }

    setIsWithdrawing(true);
    const token = localStorage.getItem("mbollopay_token");
    try {
      const res = await fetch(`${API_URL}/retraits`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          collecteId: withdrawData.collecteId,
          amountXof: Number(withdrawData.amount),
          method: withdrawData.method,
          phone: withdrawData.phone
        })
      });

      if (res.ok) {
        alert("Demande de retrait envoyée avec succès !");
        setShowWithdrawForm(false);
        window.location.reload();
      } else {
        const err = await res.json();
        alert(err.message || "Erreur lors de la demande");
      }
    } catch (e) {
      alert("Erreur de connexion");
    } finally {
      setIsWithdrawing(false);
    }
  };

  const handleCloseCollecte = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir clôturer cette collecte ? Vous ne pourrez plus recevoir de dons.")) return;
    const token = localStorage.getItem("mbollopay_token");
    try {
      const res = await fetch(`${API_URL}/collectes/${id}/close`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) {
        alert("Collecte clôturée.");
        window.location.reload();
      } else {
        alert("Erreur lors de la clôture.");
      }
    } catch (e) {
      alert("Erreur de connexion.");
    }
  };

  const getAvailableBalance = (c: any) => {
    const withdrawn = withdrawals
      .filter(w => w.collecteId === c.id && (w.status === 'PENDING' || w.status === 'COMPLETED'))
      .reduce((sum, w) => sum + w.amountXof, 0);
    return c.collectedXof - withdrawn;
  };

  const handleAddUpdate = async (e: React.FormEvent, collecteId: string) => {
    e.preventDefault();
    if (!updateContent.trim()) return;

    setIsUpdating(true);
    const token = localStorage.getItem("mbollopay_token");
    try {
      const res = await fetch(`${API_URL}/collectes/${collecteId}/updates`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ content: updateContent })
      });

      if (res.ok) {
        alert("Mise à jour publiée avec succès !");
        setShowUpdateForm(null);
        setUpdateContent("");
      } else {
        const err = await res.json();
        alert(err.message || "Erreur lors de la publication");
      }
    } catch (e) {
      alert("Erreur de connexion");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-bold">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 relative overflow-hidden font-sans">
      
      {/* Background Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/3"></div>
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] translate-x-1/3"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] dark:opacity-5"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-slide-up">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
              Bonjour, <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 animate-text-shine">{user?.firstName || 'Créateur'}</span> 👋
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Gérez vos collectes et suivez l'impact de votre solidarité en temps réel.</p>
          </div>
          <Link href="/creer" className="btn-premium px-8 py-4 text-sm whitespace-nowrap shadow-xl shadow-emerald-500/30 hover:-translate-y-1 transition-all duration-300 rounded-full flex items-center gap-2 font-bold">
            <span className="text-xl leading-none">+</span> Lancer une collecte
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="relative p-8 rounded-[3rem] bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/50 dark:border-slate-800/50 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden group hover:-translate-y-1 transition-all duration-500">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 dark:bg-green-500/10 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-50 dark:bg-emerald-500/10 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-3xl font-black shadow-xl shadow-green-500/30 text-white transform group-hover:scale-110 transition-transform duration-500">💰</div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Total Collecté</p>
                <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 tracking-tight">{formatXOF(stats.totalCollected, false)} <span className="text-xl font-bold text-slate-400">XOF</span></p>
              </div>
            </div>
          </div>
          
          <div className="relative p-8 rounded-[3rem] bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/50 dark:border-slate-800/50 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden group hover:-translate-y-1 transition-all duration-500">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-50 dark:bg-cyan-500/10 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-50 dark:bg-teal-500/10 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-3xl font-black shadow-xl shadow-cyan-500/30 text-white transform group-hover:scale-110 transition-transform duration-500">🤝</div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Dons Reçus</p>
                <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 tracking-tight">{stats.totalDons} <span className="text-xl font-bold text-slate-400">soutiens</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column: Mes Collectes */}
          <div className="lg:col-span-2 space-y-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl shadow-slate-200/30 dark:shadow-none border border-white dark:border-slate-800">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Mes Campagnes Actives</h2>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-full">{collectes.length} projets</span>
              </div>
              
              <div className="space-y-6">
                {collectes.length > 0 ? (
                  collectes.map(c => {
                    const prog = progressPercent(c.collectedXof, c.targetXof);
                    return (
                      <div key={c.id} className="p-6 rounded-[24px] bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 group">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">{c.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${c.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : c.status === 'CLOSED' ? 'bg-slate-200 text-slate-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                {c.status}
                              </span>
                            </div>
                            <p className="text-slate-500">
                              <span className="font-black text-lg text-slate-900 dark:text-white">{formatXOF(c.collectedXof, false)}</span> <span className="text-sm">/ {formatXOF(c.targetXof, false)} XOF</span>
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2">
                            <Link href={`/collecte/${c.slug}`} className="px-5 py-2 rounded-xl text-sm font-bold bg-white dark:bg-slate-700 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-600 hover:shadow-md transition-all">Voir public</Link>
                            {c.status === 'ACTIVE' && (
                              <>
                                <button onClick={() => setShowUpdateForm(showUpdateForm === c.id ? null : c.id)} className="px-5 py-2 rounded-xl text-sm font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all">
                                  {showUpdateForm === c.id ? "Annuler" : "Actu"}
                                </button>
                                <button onClick={() => handleCloseCollecte(c.id)} className="px-4 py-2 rounded-xl text-sm font-bold text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all">Clôturer</button>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Animated Progress */}
                        <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
                          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${prog}%` }}>
                            <div className="absolute inset-0 bg-white/20 w-full h-full"></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-slate-400">
                          <span>Progression</span>
                          <span className="text-emerald-500">{prog}%</span>
                        </div>
                        
                        {/* Update Form Dropdown */}
                        {showUpdateForm === c.id && (
                          <div className="mt-6 p-6 bg-white dark:bg-slate-900 rounded-[20px] shadow-lg border border-blue-100 dark:border-blue-900/30 animate-slide-up">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-blue-500">📢</span>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Publier une mise à jour</h4>
                            </div>
                            <p className="text-xs text-slate-500 mb-4">Informez vos donateurs de l'avancée du projet. Ce message sera public.</p>
                            <form onSubmit={(e) => handleAddUpdate(e, c.id)}>
                              <textarea 
                                required
                                value={updateContent}
                                onChange={(e) => setUpdateContent(e.target.value)}
                                placeholder="Ex: Incroyable ! Nous avons atteint 50% de l'objectif, merci..."
                                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary min-h-[100px] resize-none mb-4"
                              />
                              <div className="flex justify-end">
                                <button disabled={isUpdating} type="submit" className="btn-premium py-2.5 px-8 text-sm shadow-md">
                                  {isUpdating ? "Envoi..." : "Publier"}
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/30 rounded-[24px] border border-dashed border-slate-200 dark:border-slate-700">
                    <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-sm">🌱</div>
                    <p className="text-xl font-bold text-slate-900 dark:text-white mb-2">C'est bien vide par ici</p>
                    <p className="text-slate-500 mb-6">Commencez par lancer votre première collecte de fonds.</p>
                    <Link href="/creer" className="btn-outline px-8 py-3 bg-white dark:bg-slate-800">Créer une campagne</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column: Retraits & KYC */}
          <div className="lg:col-span-1 space-y-8 animate-slide-up" style={{ animationDelay: "300ms" }}>
            
            {/* Withdraw Widget - Premium */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[32px] p-8 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group border border-slate-700/50">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full group-hover:bg-emerald-500/30 transition-colors duration-700" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/20 blur-[80px] rounded-full" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">💸</span>
                  <h2 className="text-2xl font-black">Retrait express</h2>
                </div>
                <p className="text-slate-400 text-sm mb-8">Transférez vos fonds vers Wave ou Orange Money instantanément.</p>
                
                {!user || user.kycStatus !== 'VERIFIED' ? (
                  <div className="p-5 bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 rounded-2xl text-center">
                    <div className="text-4xl mb-3">🔒</div>
                    <h3 className="font-black text-yellow-500 mb-1">Retraits verrouillés</h3>
                    <p className="text-xs text-yellow-500/70">Validez votre identité ci-dessous pour activer les retraits.</p>
                  </div>
                ) : !showWithdrawForm ? (
                  <button 
                    onClick={() => setShowWithdrawForm(true)}
                    className="w-full btn-premium py-4 shadow-xl shadow-emerald-500/30 bg-emerald-500 hover:bg-emerald-400 hover:-translate-y-1 transition-all duration-300 text-sm font-bold uppercase tracking-wider"
                  >
                    Nouveau retrait
                  </button>
                ) : (
                  <form onSubmit={handleWithdraw} className="space-y-4 animate-fade-in bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10">
                    <div>
                      <label className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-wider">Depuis la cagnotte</label>
                      <select 
                        required
                        value={withdrawData.collecteId}
                        onChange={e => setWithdrawData({...withdrawData, collecteId: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-primary text-sm transition-all"
                      >
                        <option value="">Sélectionner...</option>
                        {collectes.map(c => {
                          const available = getAvailableBalance(c);
                          if (available <= 0) return null;
                          return (
                            <option key={c.id} value={c.id}>{c.title} ({formatXOF(available, false)} dispo)</option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-wider">Montant (XOF)</label>
                      <input 
                        type="number" 
                        required min="1000"
                        value={withdrawData.amount}
                        onChange={e => setWithdrawData({...withdrawData, amount: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-lg font-black focus:ring-2 focus:ring-primary transition-all"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-wider">Méthode</label>
                      <select 
                        required
                        value={withdrawData.method}
                        onChange={e => setWithdrawData({...withdrawData, method: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-primary text-sm transition-all"
                      >
                        <option value="WAVE">Wave 🌊</option>
                        <option value="ORANGE_MONEY">Orange Money 🟠</option>
                        <option value="FREE_MONEY">Free Money 🔴</option>
                        <option value="BANK_TRANSFER">Banque 🏦</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-wider">Numéro de réception</label>
                      <input 
                        type="text" 
                        required
                        value={withdrawData.phone}
                        onChange={e => setWithdrawData({...withdrawData, phone: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white font-mono focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button type="button" onClick={() => setShowWithdrawForm(false)} className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors">Annuler</button>
                      <button disabled={isWithdrawing} type="submit" className="flex-1 py-3 bg-primary hover:bg-primary-light rounded-xl text-sm font-bold shadow-lg shadow-primary/30 transition-all">
                        {isWithdrawing ? "..." : "Valider"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Historique Retraits */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-xl shadow-slate-200/30 dark:shadow-none border border-slate-100 dark:border-slate-800">
              <h3 className="font-black text-lg mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">📜</span> Historique
              </h3>
              <div className="space-y-4">
                {withdrawals.length > 0 ? (
                  withdrawals.slice(0, 5).map(w => (
                    <div key={w.id} className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                      <div>
                        <p className="font-black text-slate-900 dark:text-white">{formatXOF(w.amountXof, false)}</p>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">{new Date(w.createdAt).toLocaleDateString()} • {w.method}</p>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                        w.status === 'COMPLETED' ? 'bg-green-100 text-green-600' :
                        w.status === 'REJECTED' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {w.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aucun retrait</p>
                  </div>
                )}
              </div>
            </div>

            {/* KYC Section */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-xl shadow-slate-200/30 dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><span className="text-8xl">🛡️</span></div>
              <h3 className="font-black text-lg mb-6 flex items-center gap-2 text-slate-900 dark:text-white relative z-10">
                <span className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">🪪</span> Sécurité & KYC
              </h3>
              
              <div className="relative z-10">
                {user?.kycStatus === 'VERIFIED' ? (
                  <div className="p-5 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 text-green-700 dark:text-green-400 rounded-2xl flex items-center gap-4 border border-green-200 dark:border-green-800/30 shadow-inner">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg shadow-green-500/30">✓</div>
                    <div>
                      <p className="font-black text-sm">Compte Vérifié</p>
                      <p className="text-xs mt-0.5 opacity-80">Limites de retrait débloquées.</p>
                    </div>
                  </div>
                ) : user?.kycStatus === 'PENDING' ? (
                  <div className="p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/10 text-yellow-700 dark:text-yellow-400 rounded-2xl flex items-center gap-4 border border-yellow-200 dark:border-yellow-800/30 shadow-inner">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg shadow-yellow-500/30 animate-pulse">⏳</div>
                    <div>
                      <p className="font-black text-sm">Examen en cours</p>
                      <p className="text-xs mt-0.5 opacity-80">Validation sous 24h maximum.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const fileInput = (e.target as any).kycFile;
                    const file = fileInput.files[0];
                    if (!file) return;
                    
                    const formData = new FormData();
                    formData.append('file', file);

                    const token = localStorage.getItem("mbollopay_token");
                    const res = await fetch(`${API_URL}/auth/kyc-upload`, {
                      method: 'POST',
                      headers: { 'Authorization': `Bearer ${token}` },
                      body: formData
                    });
                    if (res.ok) window.location.reload();
                    else alert("Erreur lors de la soumission du fichier");
                  }} className="space-y-4">
                    {user?.kycStatus === 'REJECTED' && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl text-xs font-bold border border-red-100 dark:border-red-800">
                        ⚠️ Document refusé. Veuillez fournir une image nette.
                      </div>
                    )}
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Conformément à la loi, une pièce d'identité valide est requise pour transférer des fonds.</p>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                      <div className="relative bg-white dark:bg-slate-900 rounded-xl p-1">
                        <input name="kycFile" type="file" accept="image/*,application/pdf" capture="environment" required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary-light transition-all cursor-pointer" />
                      </div>
                    </div>
                    <button type="submit" className="w-full btn-outline py-3 text-sm font-bold shadow-sm">Soumettre ma CNI</button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
