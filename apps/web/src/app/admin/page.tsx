"use client";

import { useState, useEffect } from "react";
import { API_URL, formatXOF } from "@/lib/api";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { ShieldAlert, Users, Target, Activity, AlertTriangle, FileText, Wallet, Settings, LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalCollectes: 0, totalVolume: 0, pendingWithdrawals: 0, pendingSignalements: 0, totalCommissions: 0 });
  const [chartData, setChartData] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [collectes, setCollectes] = useState<any[]>([]);
  const [signalements, setSignalements] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("stats");

  const [promoPermissions, setPromoPermissions] = useState<string[]>(['SUPER_ADMIN']);
  const [usersPage, setUsersPage] = useState(1);
  const [usersSearch, setUsersSearch] = useState("");
  const [usersTotalPages, setUsersTotalPages] = useState(1);

  const [colPage, setColPage] = useState(1);
  const [colSearch, setColSearch] = useState("");
  const [colTotalPages, setColTotalPages] = useState(1);

  const [withPage, setWithPage] = useState(1);
  const [withSearch, setWithSearch] = useState("");
  const [withStatus, setWithStatus] = useState("ALL");
  const [withTotalPages, setWithTotalPages] = useState(1);

  const [selectedKycUser, setSelectedKycUser] = useState<any>(null);

  const [selectedUserDetail, setSelectedUserDetail] = useState<any>(null);
  const [loadingUserDetail, setLoadingUserDetail] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem("mbollopay_token") : null;
  const headers = { "Authorization": `Bearer ${token}` };

  const fetchUsers = async (p = usersPage, s = usersSearch) => {
    try {
      const res = await fetch(`${API_URL}/admin/users?page=${p}&search=${s}`, { headers });
      if(res.ok) {
        const ud = await res.json();
        setUsers(ud.users || ud);
        setUsersTotalPages(ud.totalPages || 1);
        setUsersPage(p);
      }
    } catch(e) {}
  };

  const fetchUserDetails = async (userId: string) => {
    setLoadingUserDetail(true);
    try {
      const res = await fetch(`${API_URL}/admin/users/${userId}`, { headers });
      if (res.ok) {
        setSelectedUserDetail(await res.json());
      }
    } catch(e) {
      console.error(e);
    } finally {
      setLoadingUserDetail(false);
    }
  };

  const fetchCollectes = async (p = colPage, s = colSearch) => {
    try {
      const res = await fetch(`${API_URL}/admin/collectes?page=${p}&search=${s}`, { headers });
      if(res.ok) {
        const colData = await res.json();
        setCollectes(colData.collectes || []);
        setColTotalPages(colData.totalPages || 1);
        setColPage(p);
      }
    } catch(e) {}
  };

  const fetchWithdrawals = async (p = withPage, s = withSearch, st = withStatus) => {
    try {
      const res = await fetch(`${API_URL}/admin/retraits?page=${p}&search=${s}&status=${st}`, { headers });
      if(res.ok) {
        const d = await res.json();
        setWithdrawals(d.withdrawals || []);
        setWithTotalPages(d.totalPages || 1);
        setWithPage(p);
      }
    } catch(e) {}
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    const fetchAll = async () => {
      try {
        const [resStats, resCharts, resSig, resLogs, resSettings] = await Promise.all([
          fetch(`${API_URL}/admin/stats`, { headers }),
          fetch(`${API_URL}/admin/chart-stats`, { headers }),
          fetch(`${API_URL}/signalements`, { headers }),
          fetch(`${API_URL}/admin/logs`, { headers }),
          fetch(`${API_URL}/admin/settings`, { headers })
        ]);

        if (resStats.ok) setStats(await resStats.json());
        if (resCharts.ok) setChartData(await resCharts.json());
        if (resSig.ok) setSignalements(await resSig.json());
        if (resLogs.ok) setLogs(await resLogs.json());
        if (resSettings.ok) setSettings(await resSettings.json());

        await fetchUsers(1, "");
        await fetchCollectes(1, "");
        await fetchWithdrawals(1, "", "ALL");

      } catch (error) {
        console.error("Admin fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const authFetch = async (path: string, method: string, body?: any) => {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: body ? JSON.stringify(body) : undefined
    });
    if (res.ok) {
      if(path.includes('/kyc')) setSelectedKycUser(null);
      window.location.reload();
    }
    else alert("Erreur lors de l'opération");
  };

  const exportCsv = (filename: string, rows: any[]) => {
    if(!rows.length) return;
    const keys = Object.keys(rows[0]).filter(k => typeof rows[0][k] !== 'object');
    const csvContent = [
      keys.join(","),
      ...rows.map(r => keys.map(k => `"${r[k] || ''}"`).join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">Chargement Admin...</div>;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 text-slate-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/20">
                <ShieldAlert className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                MboloPay <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">Admin_</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-2 ml-14 tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> System Control Center
            </p>
          </div>
          <div className="flex flex-wrap bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-2xl">
            {[
              { id: "stats", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: "collectes", label: "Collectes", badge: 0, icon: <Target className="w-4 h-4" /> },
              { id: "users", label: "CRM", badge: 0, icon: <Users className="w-4 h-4" /> },
              { id: "withdrawals", label: "Retraits", badge: stats.pendingWithdrawals, icon: <Wallet className="w-4 h-4" /> },
              { id: "kyc", label: "KYC", badge: users.filter(u => u.kycStatus === 'PENDING').length, icon: <ShieldAlert className="w-4 h-4" /> },
              { id: "signalements", label: "Alertes", badge: stats.pendingSignalements, icon: <AlertTriangle className="w-4 h-4" /> },
              { id: "logs", label: "Journal", icon: <FileText className="w-4 h-4" /> },
              { id: "finances", label: "Finances", icon: <Activity className="w-4 h-4" /> },
              { id: "settings", label: "", icon: <Settings className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-lg shadow-red-500/30 border border-red-400/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {tab.icon}
                <span className="hidden lg:inline">{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-red-500/20 text-red-400'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "stats" && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900 p-6 rounded-3xl border border-slate-700/50 relative overflow-hidden group hover:border-blue-500/50 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full group-hover:bg-blue-500/20 transition-all"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Users className="w-5 h-5" /></div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest font-mono">Utilisateurs</p>
                </div>
                <p className="text-4xl font-black text-white tracking-tight">{stats.totalUsers.toLocaleString()}</p>
              </div>

              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900 p-6 rounded-3xl border border-slate-700/50 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full group-hover:bg-emerald-500/20 transition-all"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><Target className="w-5 h-5" /></div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest font-mono">Collectes</p>
                </div>
                <p className="text-4xl font-black text-white tracking-tight">{stats.totalCollectes.toLocaleString()}</p>
              </div>

              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900 p-6 rounded-3xl border border-slate-700/50 relative overflow-hidden group hover:border-amber-500/50 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[40px] rounded-full group-hover:bg-amber-500/20 transition-all"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400"><Activity className="w-5 h-5" /></div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest font-mono">Volume Total</p>
                </div>
                <p className="text-3xl font-black text-white tracking-tight">{formatXOF(stats.totalVolume, false)}</p>
              </div>

              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900 p-6 rounded-3xl border border-red-900/50 relative overflow-hidden group hover:border-red-500/50 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[40px] rounded-full group-hover:bg-red-500/20 transition-all"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-500/20 rounded-lg text-red-400"><AlertTriangle className="w-5 h-5" /></div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest font-mono">Alertes Actives</p>
                </div>
                <p className="text-4xl font-black text-red-500 tracking-tight">{stats.pendingSignalements}</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-xl">
                <p className="text-slate-400 text-xs font-bold mb-6 uppercase tracking-widest font-mono flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" /> Volume des Dons (7j)
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid #1e293b', borderRadius: '12px', backdropFilter: 'blur(8px)' }}
                        itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="volume" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-xl">
                <p className="text-slate-400 text-xs font-bold mb-6 uppercase tracking-widest font-mono flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-400" /> Nouvelles Collectes (7j)
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid #1e293b', borderRadius: '12px', backdropFilter: 'blur(8px)' }}
                        itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                        cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                      />
                      <Bar dataKey="collectes" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "finances" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-900/50 to-slate-900 p-8 rounded-3xl border border-emerald-500/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full" />
                <h3 className="text-emerald-400 font-bold mb-2">Chiffre d'Affaires Mbolo Pay</h3>
                <p className="text-slate-400 text-sm mb-6">Total des commissions nettes perçues par la plateforme.</p>
                <p className="text-5xl font-black text-white tracking-tighter">
                  {formatXOF(stats.totalCommissions || 0, false)}
                </p>
              </div>

              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
                <h3 className="text-white font-bold mb-2">Volume Total des Dons</h3>
                <p className="text-slate-400 text-sm mb-6">Argent global ayant transité sur la plateforme.</p>
                <p className="text-4xl font-black text-slate-300">
                  {formatXOF(stats.totalVolume || 0, false)}
                </p>
                <div className="mt-4 text-xs font-mono text-slate-500">
                  Taux de rentabilité moyen : {stats.totalVolume > 0 ? ((stats.totalCommissions / stats.totalVolume) * 100).toFixed(2) : 0}%
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mt-8">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">⚙️ Configuration des Commissions</h3>
              <p className="text-slate-400 text-sm mb-6">Modifiez dynamiquement les frais prélevés sur chaque don réussi.</p>
              
              <form onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                
                const updateSetting = async (key: string, value: any) => {
                  const res = await fetch(`${API_URL}/admin/settings`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    body: JSON.stringify({ key, value })
                  });
                  if (!res.ok) throw new Error("Erreur");
                };

                try {
                  await Promise.all([
                    updateSetting('COMMISSION_RATE', fd.get('rate')),
                    updateSetting('COMMISSION_MIN_XOF', fd.get('min'))
                  ]);
                  alert('Commissions mises à jour avec succès !');
                  window.location.reload();
                } catch (error) {
                  alert("Erreur lors de la mise à jour des commissions");
                }
              }} className="space-y-6 max-w-md">
                
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Taux de commission (ex: 0.04 pour 4%)</label>
                  <input 
                    name="rate"
                    type="number" 
                    step="0.001"
                    defaultValue={settings['COMMISSION_RATE'] || '0.04'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Frais minimum fixe (XOF)</label>
                  <input 
                    name="min"
                    type="number" 
                    defaultValue={settings['COMMISSION_MIN_XOF'] || '0'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-2">Même pour un petit don, la plateforme percevra au moins ce montant.</p>
                </div>

                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors">
                  Enregistrer les modifications
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "collectes" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <input 
                  type="search" 
                  placeholder="Rechercher une collecte..." 
                  value={colSearch}
                  onChange={(e) => setColSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchCollectes(1, colSearch)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-64"
                />
                <button onClick={() => fetchCollectes(1, colSearch)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold">Chercher</button>
              </div>
              <button onClick={() => exportCsv("collectes.csv", collectes)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm font-bold border border-slate-700">📥 Exporter CSV</button>
            </div>
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-widest font-mono">
                  <tr>
                    <th className="p-4">Collecte</th>
                    <th className="p-4">Créateur</th>
                    <th className="p-4">Montant</th>
                    <th className="p-4">Statut</th>
                    <th className="p-4">Signalements</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {collectes.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-800/50">
                      <td className="p-4">
                        <p className="font-bold text-sm max-w-[200px] truncate text-white" title={c.title}>{c.title}</p>
                        <a href={`/collecte/${c.slug}`} target="_blank" className="text-[10px] text-blue-400 hover:underline font-mono">Voir la page ↗</a>
                      </td>
                      <td className="p-4 text-sm text-slate-300">{c.user?.firstName} {c.user?.lastName}</td>
                      <td className="p-4 text-sm font-bold text-emerald-400">{formatXOF(c.collectedXof, false)} / {formatXOF(c.targetXof, false)}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${c.status === 'ACTIVE' ? 'bg-emerald-900/30 text-emerald-400' : c.status === 'REPORTED' ? 'bg-red-900/30 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
                          {c.status}
                        </span>
                        {c.verifiedBadge && <span className="ml-2 text-[10px] bg-blue-900/30 text-blue-400 px-2 py-1 rounded-md font-bold border border-blue-800">✓ VÉRIFIÉ</span>}
                      </td>
                      <td className="p-4">
                        {c._count?.signalements > 0 ? (
                          <span className="text-red-500 font-bold">{c._count.signalements} 🚩</span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>
                      <td className="p-4 flex items-center justify-end gap-2">
                        <button onClick={() => authFetch(`/admin/collectes/${c.id}/badge`, 'POST')} className="px-2 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded text-xs font-bold hover:bg-slate-700">
                          {c.verifiedBadge ? 'Retirer Badge' : '+ Badge'}
                        </button>
                        {c.status !== 'ACTIVE' && (
                          <button onClick={() => authFetch(`/admin/collectes/${c.id}/validate`, 'POST')} className="px-2 py-1 bg-emerald-900/30 text-emerald-400 border border-emerald-900 rounded text-xs font-bold hover:bg-emerald-900/50">Activer</button>
                        )}
                        {c.status !== 'CLOSED' && (
                          <button onClick={() => authFetch(`/admin/collectes/${c.id}/reject`, 'POST')} className="px-2 py-1 bg-red-900/30 text-red-400 border border-red-900 rounded text-xs font-bold hover:bg-red-900/50">Clôturer</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 font-mono">Page {colPage} sur {colTotalPages}</p>
              <div className="flex gap-2">
                <button disabled={colPage === 1} onClick={() => fetchCollectes(colPage - 1, colSearch)} className="px-3 py-1 bg-slate-800 rounded text-sm disabled:opacity-50">Précédent</button>
                <button disabled={colPage === colTotalPages} onClick={() => fetchCollectes(colPage + 1, colSearch)} className="px-3 py-1 bg-slate-800 rounded text-sm disabled:opacity-50">Suivant</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "signalements" && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-widest font-mono">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Collecte signalée</th>
                  <th className="p-4">Raison</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {signalements.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/50">
                    <td className="p-4 text-xs font-mono text-slate-500">{new Date(s.createdAt).toLocaleString()}</td>
                    <td className="p-4">
                      <p className="font-bold text-sm text-red-500">{s.collecte?.title}</p>
                      <p className="text-[10px] text-slate-500">Statut actuel : {s.collecte?.status}</p>
                    </td>
                    <td className="p-4 text-sm max-w-md break-words text-slate-300">{s.reason}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${s.status === 'PENDING' ? 'bg-yellow-900/30 text-yellow-500' : s.status === 'RESOLVED' ? 'bg-emerald-900/30 text-emerald-500' : 'bg-red-900/30 text-red-500'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      {s.status === 'PENDING' && (
                        <>
                          <button onClick={() => authFetch(`/signalements/${s.id}/action`, 'POST', { status: 'RESOLVED' })} className="px-2 py-1 bg-emerald-900/30 text-emerald-400 border border-emerald-900 rounded text-xs font-bold hover:bg-emerald-900/50">Sans suite</button>
                          <button onClick={() => authFetch(`/signalements/${s.id}/action`, 'POST', { status: 'SUSPENDED' })} className="px-2 py-1 bg-red-900/30 text-red-400 border border-red-900 rounded text-xs font-bold hover:bg-red-900/50">Suspendre</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {signalements.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-slate-500">Aucun signalement.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "withdrawals" && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <input 
                  type="search" 
                  placeholder="Bénéficiaire ou numéro..." 
                  value={withSearch}
                  onChange={(e) => setWithSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchWithdrawals(1, withSearch, withStatus)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-full md:w-64"
                />
                <select 
                  value={withStatus} 
                  onChange={(e) => { setWithStatus(e.target.value); fetchWithdrawals(1, withSearch, e.target.value); }}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="ALL">Tous les statuts</option>
                  <option value="PENDING">En attente</option>
                  <option value="COMPLETED">Complétés</option>
                  <option value="REJECTED">Rejetés</option>
                </select>
                <button onClick={() => fetchWithdrawals(1, withSearch, withStatus)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold">Chercher</button>
              </div>
              <button onClick={() => exportCsv("retraits.csv", withdrawals.map(w => ({
                beneficiaire: `${w.user?.firstName} ${w.user?.lastName}`,
                telephone: w.user?.phone,
                collecte: w.collecte?.title,
                montant: w.amountXof,
                methode: w.method,
                statut: w.status,
                date: w.createdAt
              })))} className="w-full md:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm font-bold border border-slate-700 whitespace-nowrap">📥 Exporter CSV</button>
            </div>
            
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-widest font-mono">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Bénéficiaire</th>
                    <th className="p-4">Collecte</th>
                    <th className="p-4">Montant & Méthode</th>
                    <th className="p-4">Statut</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {withdrawals.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-800/50">
                      <td className="p-4 text-xs font-mono text-slate-500">{new Date(w.createdAt).toLocaleDateString("fr-FR")}</td>
                      <td className="p-4">
                        <p className="font-bold text-sm text-white">{w.user?.firstName || "Anonyme"} {w.user?.lastName || ""}</p>
                        <p className="text-xs text-slate-500 font-mono">{w.user?.phone}</p>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-300 max-w-[200px] truncate" title={w.collecte?.title}>{w.collecte?.title}</td>
                      <td className="p-4">
                        <p className="font-black text-emerald-400 text-sm">{formatXOF(w.amountXof, false)} XOF</p>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md mt-1 inline-block border border-slate-700 uppercase">{w.method}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${w.status === 'COMPLETED' ? 'bg-emerald-900/30 text-emerald-500' : w.status === 'REJECTED' ? 'bg-red-900/30 text-red-500' : 'bg-yellow-900/30 text-yellow-500'}`}>
                          {w.status}
                        </span>
                      </td>
                      <td className="p-4 flex items-center justify-end gap-2">
                        {w.status === 'PENDING' && (
                          <>
                            <button onClick={() => authFetch(`/admin/retraits/${w.id}/approve`, 'POST')} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-md hover:bg-emerald-500">Approuver</button>
                            <button onClick={() => authFetch(`/admin/retraits/${w.id}/reject`, 'POST')} className="px-3 py-1.5 bg-red-900/30 text-red-400 border border-red-900 rounded-lg text-xs font-bold hover:bg-red-900/50">Rejeter</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {withdrawals.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-slate-500">Aucune demande trouvée.</td></tr>}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 font-mono">Page {withPage} sur {withTotalPages}</p>
              <div className="flex gap-2">
                <button disabled={withPage === 1} onClick={() => fetchWithdrawals(withPage - 1, withSearch, withStatus)} className="px-3 py-1 bg-slate-800 rounded text-sm disabled:opacity-50">Précédent</button>
                <button disabled={withPage === withTotalPages} onClick={() => fetchWithdrawals(withPage + 1, withSearch, withStatus)} className="px-3 py-1 bg-slate-800 rounded text-sm disabled:opacity-50">Suivant</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <input 
                  type="search" 
                  placeholder="Rechercher un numéro ou nom..." 
                  value={usersSearch}
                  onChange={(e) => setUsersSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchUsers(1, usersSearch)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-64"
                />
                <button onClick={() => fetchUsers(1, usersSearch)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold">Chercher</button>
              </div>
              <button onClick={() => exportCsv("users.csv", users)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm font-bold border border-slate-700">📥 Exporter CSV</button>
            </div>
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
               <table className="w-full text-left">
                <thead className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-widest font-mono">
                  <tr>
                    <th className="p-4">Utilisateur</th>
                    <th className="p-4">Statistiques</th>
                    <th className="p-4">Inscription</th>
                    <th className="p-4">Statut</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {users.map((u) => (
                    <tr key={u.id} className={`hover:bg-slate-800/50 ${u.isBlocked ? 'opacity-50' : ''}`}>
                      <td className="p-4">
                        <p className="font-bold text-sm text-white">{u.firstName || "Anonyme"} {u.lastName || ""}</p>
                        <p className="text-xs text-slate-500 font-mono">{u.phone}</p>
                        {u.role === "ADMIN" && <span className="text-[10px] bg-red-900/30 text-red-400 px-2 rounded-full font-bold border border-red-800 mt-1 inline-block">ADMIN</span>}
                      </td>
                      <td className="p-4 text-sm text-slate-400">
                        <p>Donations: <span className="font-bold text-white">{u._count?.dons}</span></p>
                        <p>Collectes: <span className="font-bold text-white">{u._count?.collectes}</span></p>
                      </td>
                      <td className="p-4 text-xs text-slate-500 font-mono">
                        {new Date(u.createdAt).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="p-4">
                        {u.isBlocked ? (
                          <span className="px-2 py-1 bg-red-900/30 text-red-500 rounded-md text-[10px] font-black uppercase">Bloqué</span>
                        ) : (
                          <span className="px-2 py-1 bg-emerald-900/30 text-emerald-500 rounded-md text-[10px] font-black uppercase">Actif</span>
                        )}
                      </td>
                      <td className="p-4 flex items-center justify-end gap-2">
                        <button 
                          onClick={() => fetchUserDetails(u.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold border bg-blue-900/30 text-blue-400 border-blue-900 hover:bg-blue-900/50"
                        >
                          🔍 Voir Profil
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-slate-500">Aucun utilisateur.</td></tr>}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 font-mono">Page {usersPage} sur {usersTotalPages}</p>
              <div className="flex gap-2">
                <button disabled={usersPage === 1} onClick={() => fetchUsers(usersPage - 1, usersSearch)} className="px-3 py-1 bg-slate-800 rounded text-sm disabled:opacity-50">Précédent</button>
                <button disabled={usersPage === usersTotalPages} onClick={() => fetchUsers(usersPage + 1, usersSearch)} className="px-3 py-1 bg-slate-800 rounded text-sm disabled:opacity-50">Suivant</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "kyc" && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-widest font-mono">
                <tr>
                  <th className="p-4">Utilisateur</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.filter(u => u.kycUrl).map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/50">
                    <td className="p-4">
                      <p className="font-bold text-sm text-white">{u.firstName || "Anonyme"} {u.lastName || ""}</p>
                      <p className="text-xs text-slate-500 font-mono">{u.phone}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${u.kycStatus === 'VERIFIED' ? 'bg-emerald-900/30 text-emerald-500' : u.kycStatus === 'REJECTED' ? 'bg-red-900/30 text-red-500' : 'bg-yellow-900/30 text-yellow-500'}`}>
                        {u.kycStatus}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button onClick={() => setSelectedKycUser(u)} className="px-3 py-1.5 bg-blue-900/30 text-blue-400 border border-blue-900 rounded-lg text-xs font-bold hover:bg-blue-900/50">
                        Ouvrir le dossier KYC
                      </button>
                    </td>
                  </tr>
                ))}
                {users.filter(u => u.kycUrl).length === 0 && <tr><td colSpan={3} className="p-8 text-center text-slate-500">Aucune demande KYC.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Paramètres de la Plateforme</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <div>
                  <p className="font-bold text-white">Mode Maintenance</p>
                  <p className="text-xs text-slate-400">Désactiver l'accès au site pour tous les utilisateurs non-admin.</p>
                </div>
                <button 
                  onClick={() => authFetch(`/admin/settings`, 'POST', { key: 'MAINTENANCE_MODE', value: settings['MAINTENANCE_MODE'] === 'true' ? 'false' : 'true' })}
                  className={`px-4 py-2 rounded-lg font-bold text-sm ${settings['MAINTENANCE_MODE'] === 'true' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  {settings['MAINTENANCE_MODE'] === 'true' ? 'Désactiver (En Ligne)' : 'Activer (Hors Ligne)'}
                </button>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <p className="font-bold text-white mb-2">Promouvoir un Administrateur (RBAC)</p>
                <p className="text-xs text-slate-400 mb-4">Entrez l'ID de l'utilisateur et choisissez ses permissions.</p>
                
                <div className="mb-4 grid grid-cols-2 gap-2 text-sm text-slate-300">
                  {[
                    { id: 'SUPER_ADMIN', label: 'Accès Total (Super Admin)' },
                    { id: 'MANAGE_FINANCES', label: 'Gestion Financière (Retraits)' },
                    { id: 'MANAGE_KYC', label: 'Gestion KYC (Identités)' },
                    { id: 'MODERATOR', label: 'Modération (Cagnottes)' },
                    { id: 'SUPPORT', label: 'Support (Lecture seule)' }
                  ].map(perm => (
                    <label key={perm.id} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="rounded bg-slate-900 border-slate-700 text-blue-500 focus:ring-blue-600 focus:ring-offset-slate-900"
                        checked={promoPermissions.includes(perm.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPromoPermissions(prev => [...prev, perm.id]);
                          } else {
                            setPromoPermissions(prev => prev.filter(p => p !== perm.id));
                          }
                        }}
                      />
                      <span>{perm.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input type="text" id="promoId" placeholder="ID de l'utilisateur..." className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none" />
                  <button 
                    onClick={() => {
                      const id = (document.getElementById('promoId') as HTMLInputElement).value;
                      if(id) {
                        authFetch(`/admin/users/${id}/promote`, 'POST', { permissions: promoPermissions })
                          .then(() => alert("Administrateur promu avec succès !"));
                      }
                    }} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                  >
                    Promouvoir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "logs" && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
             <div className="space-y-2">
                {logs.map(log => (
                  <div key={log.id} className="flex gap-4 p-3 hover:bg-slate-800/50 rounded-xl border-l-2 border-slate-800 hover:border-slate-600 transition-colors">
                    <div className="text-xs font-mono text-slate-500 mt-1">{new Date(log.createdAt).toLocaleTimeString()}</div>
                    <div>
                      <p className="text-sm font-bold text-slate-300 font-mono">{log.action}</p>
                      <p className="text-xs text-slate-500">{log.user?.phone} - {log.details}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

      </div>

      {/* KYC VIEWER MODAL */}
      {selectedKycUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-2xl">
            {/* Image section */}
            <div className="flex-1 bg-slate-950 p-4 flex items-center justify-center min-h-[400px]">
              {selectedKycUser.kycUrl.endsWith('.pdf') ? (
                <iframe src={selectedKycUser.kycUrl} className="w-full h-full min-h-[500px] rounded-xl" />
              ) : (
                <img src={selectedKycUser.kycUrl} alt="Document KYC" className="max-w-full max-h-[70vh] object-contain rounded-xl" />
              )}
            </div>
            
            {/* Action section */}
            <div className="w-full md:w-80 p-8 flex flex-col justify-between border-l border-slate-800">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Vérification KYC</h3>
                  <button onClick={() => setSelectedKycUser(null)} className="text-slate-500 hover:text-white p-2 text-xl">&times;</button>
                </div>
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Utilisateur</p>
                    <p className="font-bold text-white text-lg">{selectedKycUser.firstName} {selectedKycUser.lastName}</p>
                    <p className="text-sm text-slate-400 font-mono">{selectedKycUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Date d'inscription</p>
                    <p className="text-sm text-slate-300">{new Date(selectedKycUser.createdAt).toLocaleDateString("fr-FR")}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => authFetch(`/admin/users/${selectedKycUser.id}/kyc`, 'POST', { status: 'VERIFIED' })}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black shadow-lg shadow-emerald-500/20"
                >
                  ✓ VALIDER LE DOCUMENT
                </button>
                <button 
                  onClick={() => authFetch(`/admin/users/${selectedKycUser.id}/kyc`, 'POST', { status: 'REJECTED' })}
                  className="w-full py-4 bg-slate-800 hover:bg-red-900/50 text-red-400 border border-slate-700 hover:border-red-900 rounded-xl font-bold"
                >
                  × REFUSER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODALE PROFIL UTILISATEUR DÉTAILLÉ ─── */}
      {selectedUserDetail && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden mt-20 mb-10 relative">
            <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-950">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">👤</span> Profil de {selectedUserDetail.firstName || 'Anonyme'} {selectedUserDetail.lastName}
              </h2>
              <button onClick={() => setSelectedUserDetail(null)} className="text-slate-500 hover:text-white text-3xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Infos Gauche */}
              <div className="col-span-1 space-y-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Informations</h3>
                  <p className="text-sm text-slate-300 mb-1"><strong>Téléphone :</strong> {selectedUserDetail.phone}</p>
                  <p className="text-sm text-slate-300 mb-1"><strong>Email :</strong> {selectedUserDetail.email || 'N/A'}</p>
                  <p className="text-sm text-slate-300 mb-1"><strong>Inscription :</strong> {new Date(selectedUserDetail.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-slate-300 mt-3 flex items-center gap-2">
                    <strong>Rôle :</strong> 
                    <span className={`text-[10px] px-2 py-0.5 rounded font-black border ${selectedUserDetail.role === 'ADMIN' ? 'bg-red-900/30 text-red-500 border-red-800' : 'bg-blue-900/30 text-blue-500 border-blue-800'}`}>
                      {selectedUserDetail.role}
                    </span>
                  </p>
                  <p className="text-sm text-slate-300 mt-2 flex items-center gap-2">
                    <strong>Statut :</strong> 
                    <span className={`text-[10px] px-2 py-0.5 rounded font-black border uppercase ${selectedUserDetail.isBlocked ? 'bg-red-900/30 text-red-500 border-red-800' : 'bg-emerald-900/30 text-emerald-500 border-emerald-800'}`}>
                      {selectedUserDetail.isBlocked ? 'BLOQUÉ' : 'ACTIF'}
                    </span>
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Statut KYC</h3>
                  <div className="mb-3">
                    <span className={`px-2 py-1 text-xs font-black uppercase rounded ${
                      selectedUserDetail.kycStatus === 'VERIFIED' ? 'bg-emerald-900/30 text-emerald-500' : 
                      selectedUserDetail.kycStatus === 'REJECTED' ? 'bg-red-900/30 text-red-500' : 
                      'bg-yellow-900/30 text-yellow-500'
                    }`}>
                      {selectedUserDetail.kycStatus}
                    </span>
                  </div>
                  {selectedUserDetail.kycUrl && (
                    <a href={selectedUserDetail.kycUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm block mb-3">
                      📄 Voir le document
                    </a>
                  )}
                  {selectedUserDetail.kycStatus === 'PENDING' && (
                    <div className="flex gap-2">
                      <button onClick={async () => {
                        await authFetch(`/admin/users/${selectedUserDetail.id}/kyc`, 'POST', { status: 'VERIFIED' });
                        fetchUserDetails(selectedUserDetail.id);
                        fetchUsers();
                      }} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded">Valider</button>
                      <button onClick={async () => {
                        await authFetch(`/admin/users/${selectedUserDetail.id}/kyc`, 'POST', { status: 'REJECTED' });
                        fetchUserDetails(selectedUserDetail.id);
                        fetchUsers();
                      }} className="flex-1 bg-red-900/50 hover:bg-red-900 text-red-400 text-xs font-bold py-2 rounded border border-red-800">Rejeter</button>
                    </div>
                  )}
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Actions Rapides</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={async () => {
                        await authFetch(`/admin/users/${selectedUserDetail.id}/toggle-block`, 'POST');
                        fetchUserDetails(selectedUserDetail.id);
                        fetchUsers();
                      }} 
                      className={`w-full px-3 py-2 rounded text-xs font-bold border transition-colors ${selectedUserDetail.isBlocked ? 'bg-emerald-900/30 text-emerald-400 border-emerald-900 hover:bg-emerald-900/50' : 'bg-red-900/30 text-red-400 border-red-900 hover:bg-red-900/50'}`}
                    >
                      {selectedUserDetail.isBlocked ? '✅ Débloquer le compte' : '🚫 Bloquer le compte'}
                    </button>
                    
                    {selectedUserDetail.role !== "ADMIN" && (
                      <button 
                        onClick={async () => {
                          if(window.confirm("Promouvoir en Admin ?")) {
                            await authFetch(`/admin/users/${selectedUserDetail.id}/promote`, 'POST');
                            fetchUserDetails(selectedUserDetail.id);
                            fetchUsers();
                          }
                        }}
                        className="w-full px-3 py-2 rounded text-xs font-bold border bg-blue-900/30 text-blue-400 border-blue-900 hover:bg-blue-900/50"
                      >
                        ⭐ Promouvoir Administrateur
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Contenu Droite (Tables) */}
              <div className="col-span-1 md:col-span-2 space-y-6">
                
                {/* Collectes */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-64 overflow-y-auto">
                  <h3 className="text-sm font-bold text-slate-300 mb-3 sticky top-0 bg-slate-950 pb-2 border-b border-slate-800">Cagnottes Créées ({selectedUserDetail.collectes?.length || 0})</h3>
                  {selectedUserDetail.collectes?.length > 0 ? (
                    <div className="space-y-3">
                      {selectedUserDetail.collectes.map((c: any) => (
                        <div key={c.id} className="flex justify-between items-center text-sm border-b border-slate-800/50 pb-2">
                          <span className="text-white truncate max-w-[200px]">{c.title}</span>
                          <div className="text-right">
                            <span className="block text-emerald-400 font-bold">{formatXOF(c.collectedXof)} / {formatXOF(c.targetXof)}</span>
                            <span className="text-[10px] uppercase text-slate-500">{c.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-xs text-slate-500">Aucune collecte.</p>}
                </div>

                {/* Dons */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-64 overflow-y-auto">
                  <h3 className="text-sm font-bold text-slate-300 mb-3 sticky top-0 bg-slate-950 pb-2 border-b border-slate-800">Dons Effectués ({selectedUserDetail.dons?.length || 0})</h3>
                  {selectedUserDetail.dons?.length > 0 ? (
                    <div className="space-y-3">
                      {selectedUserDetail.dons.map((d: any) => (
                        <div key={d.id} className="flex justify-between items-center text-sm border-b border-slate-800/50 pb-2">
                          <div>
                            <span className="block text-emerald-400 font-bold">{formatXOF(d.amountXof)} XOF</span>
                            <span className="text-[10px] text-slate-500 truncate max-w-[200px] block">Pour : {d.collecte?.title}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] uppercase text-slate-500 block">{new Date(d.createdAt).toLocaleDateString()}</span>
                            <span className="text-[10px] uppercase text-slate-500 bg-slate-800 px-1 rounded">{d.method}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-xs text-slate-500">Aucun don.</p>}
                </div>

                {/* Retraits */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <h3 className="text-sm font-bold text-slate-300 mb-3 sticky top-0 bg-slate-950 pb-2 border-b border-slate-800">Demandes de Retraits ({selectedUserDetail.retraits?.length || 0})</h3>
                  {selectedUserDetail.retraits?.length > 0 ? (
                    <div className="space-y-3">
                      {selectedUserDetail.retraits.map((r: any) => (
                        <div key={r.id} className="flex justify-between items-center text-sm border-b border-slate-800/50 pb-2">
                          <span className="block text-white font-bold">{formatXOF(r.amountXof)} XOF</span>
                          <div className="text-right">
                            <span className={`text-[10px] uppercase font-bold px-1 rounded ${r.status === 'COMPLETED' ? 'text-emerald-500' : r.status === 'REJECTED' ? 'text-red-500' : 'text-yellow-500'}`}>{r.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-xs text-slate-500">Aucun retrait.</p>}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
