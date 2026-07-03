"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { API_URL, formatXOF, daysRemaining, getCategoryLabel, progressPercent, SUGGESTED_AMOUNTS, getShareUrl } from "@/lib/api";

export default function CollecteDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const statusParam = searchParams.get("status");
  const donateParam = searchParams.get("donate");

  const [amount, setAmount] = useState<number | "">("");
  const [anonymous, setAnonymous] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [collecte, setCollecte] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportSent, setReportSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [updateContent, setUpdateContent] = useState("");
  const [postingUpdate, setPostingUpdate] = useState(false);
  const [config, setConfig] = useState<{rate: number, min: number}>({rate: 0.03, min: 100});

  const baseAmount = Number(amount) || 0;
  const platformFee = baseAmount > 0 ? Math.max(config.min, Math.round(baseAmount * config.rate)) : 0;
  const totalAmount = baseAmount + platformFee;

  const handlePostUpdate = async () => {
    if (!updateContent.trim()) return;
    setPostingUpdate(true);
    try {
      const token = localStorage.getItem("mbollopay_token");
      const res = await fetch(`${API_URL}/collectes/${collecte.id}/updates`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content: updateContent }),
      });
      if (res.ok) {
        const newUpdate = await res.json();
        setCollecte({ ...collecte, updates: [newUpdate, ...(collecte.updates || [])] });
        setUpdateContent("");
      } else {
        alert("Erreur lors de l'ajout de l'actualité");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPostingUpdate(false);
    }
  };

  useEffect(() => {
    if (donateParam === "1" && !pageLoading && collecte) {
      setTimeout(() => {
        document.getElementById("donation-form")?.scrollIntoView({ behavior: "smooth" });
        // Optional pulse effect
        document.getElementById("donation-form")?.classList.add("ring-4", "ring-primary", "ring-offset-4", "dark:ring-offset-slate-950", "rounded-3xl", "transition-all");
        setTimeout(() => {
          document.getElementById("donation-form")?.classList.remove("ring-4", "ring-primary", "ring-offset-4", "dark:ring-offset-slate-950");
        }, 3000);
      }, 500);
    }
  }, [donateParam, pageLoading, collecte]);

  useEffect(() => {
    if (statusParam === "success") {
      setNotification({ type: "success", message: "Merci ! Votre don a été enregistré avec succès. 🎉" });
    } else if (statusParam === "cancelled") {
      setNotification({ type: "error", message: "Le paiement a été annulé." });
    }
  }, [statusParam]);

  useEffect(() => {
    const fetchCollecte = async () => {
      try {
        const response = await fetch(`${API_URL}/collectes/${slug}`);
        if (response.ok) {
          setCollecte(await response.json());
        }
      } catch (error) {
        console.error("Fetch collecte error:", error);
      } finally {
        setPageLoading(false);
      }
    };
    
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${API_URL}/dons/config`);
        if (res.ok) setConfig(await res.json());
      } catch (e) {}
    };

    fetchCollecte();
    fetchConfig();
  }, [slug]);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collecte || !amount || amount < 500) {
      alert("Le don minimum est de 500 FCFA.");
      return;
    }

    setIsLoading(true);
    try {
      const userData = localStorage.getItem("mbollopay_user");
      const userId = userData ? JSON.parse(userData).id : null;

      const response = await fetch(`${API_URL}/dons/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collecteId: collecte.id,
          amountXof: baseAmount, // the backend will compute total with config
          anonymous,
          donorName: donorName || undefined,
          userId: userId || undefined,
        }),
      });

      const data = await response.json();
      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert("Erreur d'initialisation du paiement.");
      }
    } catch (error) {
      console.error("Donation error:", error);
      alert("Erreur de connexion au serveur de paiement.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    const url = getShareUrl(`/collecte/${collecte.slug}`);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReport = async () => {
    if (!reportReason.trim()) return;
    try {
      await fetch(`${API_URL}/signalements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collecteId: collecte.id, reason: reportReason }),
      });
      setReportSent(true);
      setTimeout(() => { setShowReport(false); setReportSent(false); setReportReason(""); }, 2000);
    } catch (e) {
      alert("Erreur lors du signalement.");
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!collecte) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-6xl mb-4">😔</p>
          <h2 className="text-2xl font-bold mb-2">Collecte introuvable</h2>
          <p className="text-slate-500 mb-6">Cette collecte n'existe pas ou a été supprimée.</p>
          <a href="/" className="btn-premium px-8 py-3">Retour à l'accueil</a>
        </div>
      </div>
    );
  }

  const userDataRaw = typeof window !== "undefined" ? localStorage.getItem("mbollopay_user") : null;
  const currentUserId = userDataRaw ? JSON.parse(userDataRaw).id : null;
  const isCreator = currentUserId === collecte.userId;

  const progress = progressPercent(collecte.collectedXof, collecte.targetXof);
  const days = daysRemaining(collecte.endDate);
  const cat = getCategoryLabel(collecte.category);
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/collecte/${collecte.slug}` : "";
  const donorCount = collecte._count?.dons || collecte.dons?.length || 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative py-8 md:py-12 overflow-hidden">
      {/* Background Mesh Gradient */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-slide-up ${
            notification.type === "success" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"
          }`}>
            <span className="text-xl">{notification.type === "success" ? "✅" : "❌"}</span>
            <p className="font-bold flex-1">{notification.message}</p>
            <button onClick={() => setNotification(null)} className="opacity-50 hover:opacity-100">✕</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── Main Content ──────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/90 dark:bg-slate-900/50 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/50 dark:border-white/5">
              {/* Photo */}
              <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-950/50">
                {collecte.photoUrl ? (
                  <img src={collecte.photoUrl} alt={collecte.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 flex items-center justify-center">
                    <span className="text-8xl opacity-20">{cat.emoji}</span>
                  </div>
                )}
                {collecte.verifiedBadge && (
                  <div className="absolute top-4 right-4 badge-verified text-xs px-3 py-1">
                    ✓ Collecte Vérifiée
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8">
                {/* Category + Days */}
                <div className="flex items-center justify-between mb-4">
                  <span className="badge-category">{cat.emoji} {cat.label}</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    days <= 3 ? "bg-red-100 text-red-600 animate-pulse" : days <= 7 ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-500"
                  }`}>
                    ⏰ {days > 0 ? `${days} jours restants` : "Collecte terminée"}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-black text-foreground mb-4 leading-tight">
                  {collecte.title}
                </h1>

                {/* Organizer */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800/50">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center font-bold text-emerald-500 text-lg border border-emerald-500/30">
                    {(collecte.user?.firstName || "A").charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm flex items-center gap-1">
                      {collecte.user?.firstName || "Anonyme"} {collecte.user?.lastName || ""}
                      {collecte.verifiedBadge && <span className="text-emerald-500 text-xs">✓</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">Organisateur</p>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-sm max-w-none text-foreground/80 mb-8 whitespace-pre-wrap">
                  {collecte.description}
                </div>

                {/* Creator Updates */}
                {(isCreator || (collecte.updates && collecte.updates.length > 0)) && (
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-8 mb-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      📢 Mises à jour de l'organisateur
                    </h3>

                    {/* Formulaire pour le créateur */}
                    {isCreator && (
                      <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <h4 className="font-bold text-sm mb-2">Publier une nouvelle mise à jour</h4>
                        <textarea
                          value={updateContent}
                          onChange={(e) => setUpdateContent(e.target.value)}
                          placeholder="Partagez l'avancée de votre collecte avec vos donateurs..."
                          className="input-base text-sm mb-3"
                          rows={3}
                        />
                        <button
                          onClick={handlePostUpdate}
                          disabled={postingUpdate || !updateContent.trim()}
                          className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors"
                        >
                          {postingUpdate ? "Publication..." : "Publier l'actualité"}
                        </button>
                      </div>
                    )}

                    {/* Liste des mises à jour */}
                    {collecte.updates && collecte.updates.length > 0 ? (
                      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-500/30 dark:before:via-emerald-500/20 before:to-transparent">
                        {collecte.updates.map((update: any, index: number) => (
                          <div key={update.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-emerald-500/20 text-emerald-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                              <span className="text-xs">📅</span>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                              <div className="flex items-center justify-between space-x-2 mb-2">
                                <div className="font-bold text-sm text-slate-900 dark:text-white">Mise à jour #{collecte.updates.length - index}</div>
                                <time className="font-mono text-xs text-slate-400">{new Date(update.createdAt).toLocaleDateString("fr-FR")}</time>
                              </div>
                              <div className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{update.content}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 italic">Aucune actualité publiée pour le moment.</p>
                    )}
                  </div>
                )}

                {/* Recent Donors */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    🤝 Donateurs récents
                    <span className="text-sm font-normal text-muted-foreground">({donorCount})</span>
                  </h3>
                  <div className="space-y-3">
                    {collecte.dons && collecte.dons.length > 0 ? (
                      collecte.dons.map((don: any) => (
                        <div key={don.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm">
                              {don.anonymous ? "👤" : "🌟"}
                            </div>
                            <div>
                              <p className="font-bold text-sm">{don.anonymous ? "Donateur Anonyme" : don.donorName || "Donateur"}</p>
                              <p className="text-[10px] text-muted-foreground">
                                {new Date(don.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                              </p>
                            </div>
                          </div>
                          <p className="font-black text-emerald-500 text-sm">+{formatXOF(don.amountXof)}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                        <p className="text-3xl mb-2">💛</p>
                        <p className="font-medium">Soyez le premier à soutenir cette cause !</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Report Button */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 no-print">
                  <button
                    onClick={() => setShowReport(!showReport)}
                    className="text-xs text-slate-400 hover:text-red-500 font-medium transition-colors"
                  >
                    🚩 Signaler cette collecte
                  </button>
                  {showReport && (
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-800/30 animate-slide-up">
                      {reportSent ? (
                        <p className="text-green-600 font-bold text-sm">✅ Signalement envoyé. Merci.</p>
                      ) : (
                        <>
                          <textarea
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            placeholder="Décrivez pourquoi vous signalez cette collecte..."
                            className="input-base text-sm mb-3"
                            rows={3}
                          />
                          <button onClick={handleReport} className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-600 transition-colors">
                            Envoyer le signalement
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ─── Donation Sidebar ──────────────────────────────────────── */}
          <div id="donation-form" className="lg:col-span-1 no-print">
            <div className="sticky top-24 space-y-6">
              {/* Progress Card - Glassmorphism */}
              <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[2rem] p-8 shadow-2xl shadow-emerald-500/10 border border-slate-200/50 dark:border-emerald-500/20 relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-[50px] pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none" />

                {/* Amount collected */}
                <div className="mb-6 relative z-10">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">{formatXOF(collecte.collectedXof, false)}</span>
                    <span className="text-xl font-bold text-slate-400">XOF</span>
                  </div>
                  <p className="text-slate-500 font-medium text-sm">
                    collectés sur <span className="font-bold text-slate-700 dark:text-slate-300">{formatXOF(collecte.targetXof)}</span>
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="h-4 bg-slate-100 dark:bg-slate-950/50 rounded-full mb-3 overflow-hidden relative z-10 border border-slate-200/50 dark:border-white/5">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out relative shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${progress}%` }}>
                    <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-[2px] animate-shimmer" />
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-8 relative z-10">
                  <span className="font-black text-emerald-500">{progress}%</span>
                  <span className="font-semibold text-slate-500">🤝 {donorCount} donateur{donorCount > 1 ? "s" : ""}</span>
                </div>

                {/* Donation Form */}
                <form onSubmit={handleDonate} className="space-y-6 relative z-10">
                  {/* Suggested amounts */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">
                      Choisissez un montant
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {SUGGESTED_AMOUNTS.map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setAmount(a)}
                          className={`py-3 rounded-xl text-sm font-black transition-all duration-300 border ${
                            amount === a
                              ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30 scale-[1.02] border-transparent"
                              : "bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                          }`}
                        >
                          {(a / 1000).toFixed(0)}K
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950/50 border-2 border-slate-200 dark:border-white/10 rounded-2xl text-center text-3xl font-black py-4 focus:border-emerald-500 focus:ring-0 transition-colors dark:text-white"
                        placeholder="Autre montant"
                        min="500"
                        required
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">XOF</div>
                    </div>
                  </div>

                  {/* Anonymous + Name */}
                  <div className="space-y-3 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 bg-transparent"
                        checked={anonymous}
                        onChange={(e) => setAnonymous(e.target.checked)}
                      />
                      <span className="text-sm font-medium">Faire un don anonyme</span>
                    </label>

                    {!anonymous && (
                      <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Votre nom (optionnel)"
                        className="input-base text-sm"
                      />
                    )}
                  </div>

                  {/* Summary */}
                  {baseAmount > 0 && (
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl text-sm mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-500">Montant du don</span>
                        <span className="font-bold">{formatXOF(baseAmount, false)} XOF</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-500">Frais de fonctionnement ({(config.rate * 100).toFixed(1)}%)</span>
                        <span className="font-bold text-slate-500">{formatXOF(platformFee, false)} XOF</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                        <span className="font-bold">Total à régler</span>
                        <span className="font-black text-emerald-500">{formatXOF(totalAmount, false)} XOF</span>
                      </div>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading || days === 0 || baseAmount < 500}
                    className="w-full btn-premium py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Connexion sécurisée...
                      </span>
                    ) : days === 0 ? (
                      "Collecte terminée"
                    ) : (
                      `Contribuer ${totalAmount > 0 ? formatXOF(totalAmount, false) + ' XOF' : ''}`
                    )}
                  </button>
                </form>
              </div>

              {/* Share Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-4 tracking-widest text-center">
                  Partager cette collecte
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Soutenez cette collecte sur Mbolo Pay : ${collecte.title} — ${shareUrl}`)}`}
                    target="_blank"
                    className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 hover:bg-green-100 transition-all border border-green-100 dark:border-green-800"
                  >
                    <span className="text-xl">📱</span>
                    <span className="text-[10px] font-bold">WhatsApp</span>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 transition-all border border-blue-100 dark:border-blue-800"
                  >
                    <span className="text-xl">📘</span>
                    <span className="text-[10px] font-bold">Facebook</span>
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 hover:bg-slate-100 transition-all border border-slate-100 dark:border-slate-700"
                  >
                    <span className="text-xl">{copied ? "✅" : "🔗"}</span>
                    <span className="text-[10px] font-bold">{copied ? "Copié !" : "Copier"}</span>
                  </button>
                </div>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${shareUrl}?donate=1`);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-all border border-orange-200 dark:border-orange-800/50 font-bold text-sm shadow-sm"
                >
                  <span className="text-lg">⚡</span>
                  Lien de paiement direct Wave / OM
                </button>

                {/* QR Code */}
                <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-3 tracking-widest">Scanner pour donner</p>
                  <div className="bg-white p-3 rounded-2xl inline-block shadow-inner border border-slate-100">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(shareUrl)}`}
                      alt="QR Code"
                      className="w-24 h-24"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
