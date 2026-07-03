"use client";

import { useState, useEffect } from "react";
import { API_URL, getCategoryLabel } from "@/lib/api";
import Link from "next/link";

export default function CreerCollectePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    category: "SANTE",
    description: "",
    targetXof: "",
    endDate: "",
    photoUrl: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("mbollopay_token");
    if (!token) {
      window.location.href = "/connexion?redirect=/creer";
    } else {
      setIsAuthChecking(false);
    }
  }, []);

  if (isAuthChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("L'image est trop lourde (max 2Mo)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateText = async () => {
    if (!formData.title.trim()) {
      alert("Veuillez d'abord saisir un titre pour que l'IA puisse s'en inspirer.");
      return;
    }
    
    setIsGeneratingText(true);
    try {
      const response = await fetch(`${API_URL}/ai/generate-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          targetXof: Number(formData.targetXof) || 500000
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, description: data.text });
      } else {
        alert("Erreur lors de la génération par l'IA (Côté serveur).");
      }
    } catch (e) {
      alert("Erreur de connexion avec l'IA.");
    } finally {
      setIsGeneratingText(false);
    }
  };

  const handleGenerateImage = () => {
    if (!formData.title.trim()) {
      alert("Veuillez donner un titre à votre collecte pour générer une image.");
      return;
    }
    setIsGeneratingImage(true);
    // Enhanced prompt for breathtaking, photorealistic images using the FLUX model
    const prompt = `A breathtaking, highly professional, award-winning photography for a crowdfunding campaign about: "${formData.title}", taking place in Senegal Africa. Warm cinematic lighting, optimistic, photorealistic, 4k resolution, highly detailed, beautiful faces, authentic.`;
    const randomSeed = Math.floor(Math.random() * 1000000);
    // Added model=flux to use the state-of-the-art Flux model instead of basic SD
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${randomSeed}&width=800&height=600&nologo=true&model=flux`;
    
    setFormData({ ...formData, photoUrl: imageUrl });
    setIsGeneratingImage(false);
  };

  const validateStep1 = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Veuillez remplir le titre et la description.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.targetXof || Number(formData.targetXof) < 5000) {
      alert("L'objectif financier doit être d'au moins 5 000 XOF.");
      return false;
    }
    if (!formData.endDate) {
      alert("Veuillez sélectionner une date de fin.");
      return false;
    }
    if (new Date(formData.endDate) <= new Date()) {
      alert("La date de fin doit être dans le futur.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 3) return;

    setLoading(true);
    const token = localStorage.getItem("mbollopay_token");
    if (!token) {
      alert("Veuillez vous connecter pour créer une collecte.");
      window.location.href = "/connexion";
      return;
    }

    try {
      let photoUrlToSave = formData.photoUrl;

      // 1. Upload de l'image si c'est une image en base64/fichier (commence par data:image)
      if (photoUrlToSave && photoUrlToSave.startsWith('data:image')) {
        // Convertir le base64 en File (Blob)
        const fetchResponse = await fetch(photoUrlToSave);
        const blob = await fetchResponse.blob();
        
        const uploadFormData = new FormData();
        uploadFormData.append('file', blob, 'collecte-cover.jpg');

        const uploadResponse = await fetch(`${API_URL}/upload/image`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          const error = await uploadResponse.json();
          throw new Error("Erreur lors de l'upload de l'image : " + error.message);
        }

        const uploadData = await uploadResponse.json();
        photoUrlToSave = uploadData.url; // L'URL publique renvoyée par le backend (Supabase)
      }

      // 2. Création de la collecte avec la vraie URL
      const response = await fetch(`${API_URL}/collectes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          photoUrl: photoUrlToSave,
          targetXof: Number(formData.targetXof),
        }),
      });

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        const error = await response.json();
        alert("Erreur: " + (error.message || "Impossible de créer la collecte."));
      }
    } catch (error) {
      console.error("Create collecte error:", error);
      alert("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative py-12 px-4 bg-slate-950 overflow-hidden font-sans">
      {/* Background Mesh Gradient */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 mt-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm mb-8 backdrop-blur-md shadow-2xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Création simplifiée et sécurisée
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white leading-tight">
            Donnez vie à votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Projet</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Mobilisez votre communauté en 3 étapes simples. Sans paperasse et avec 0% de commission sur vos dons.
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="flex items-center justify-center mb-16 max-w-2xl mx-auto">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all duration-500 z-10 ${step >= 1 ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-110 border-2 border-white/20' : 'bg-slate-800/50 text-slate-500 border border-white/5 backdrop-blur-md'}`}>1</div>
          <div className="flex-1 h-1.5 mx-[-10px] relative">
             <div className="absolute inset-0 bg-slate-800/50 rounded-full"></div>
             <div className={`absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-700 ease-out`} style={{ width: step >= 2 ? '100%' : '0%' }}></div>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all duration-500 z-10 ${step >= 2 ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-110 border-2 border-white/20' : 'bg-slate-800/50 text-slate-500 border border-white/5 backdrop-blur-md'}`}>2</div>
          <div className="flex-1 h-1.5 mx-[-10px] relative">
             <div className="absolute inset-0 bg-slate-800/50 rounded-full"></div>
             <div className={`absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-700 ease-out`} style={{ width: step >= 3 ? '100%' : '0%' }}></div>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all duration-500 z-10 ${step >= 3 ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-110 border-2 border-white/20' : 'bg-slate-800/50 text-slate-500 border border-white/5 backdrop-blur-md'}`}>3</div>
        </div>

        {/* Main Form Container - Glassmorphism */}
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/10 p-8 md:p-14 relative overflow-hidden">
          {/* Decorative subtle glow inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
          
          {/* STEP 1 : Informations */}
          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-2xl font-black mb-6">Informations générales</h2>
              
              <div>
                <label className="block font-bold mb-2">Titre de la collecte</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Soutien médical pour Ousmane"
                  className="input-base"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Catégorie</label>
                <select name="category" value={formData.category} onChange={handleChange} className="input-base">
                  <option value="SANTE">🏥 Santé & Médical</option>
                  <option value="EDUCATION">📚 Éducation</option>
                  <option value="RELIGION">🕌 Religion</option>
                  <option value="URGENCE">🚨 Urgence</option>
                  <option value="SPORT">⚽ Sport</option>
                  <option value="EVENEMENT">🎉 Événement</option>
                  <option value="COTISATION">👥 Cotisation</option>
                  <option value="CADEAU">🎁 Cadeau commun</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block font-bold">Histoire & Description</label>
                  <button 
                    type="button" 
                    onClick={handleGenerateText} 
                    disabled={isGeneratingText}
                    className="text-xs font-black px-3 py-1.5 bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 rounded-full border border-indigo-500/20 flex items-center gap-1 transition-all"
                  >
                    {isGeneratingText ? "✨ Réflexion..." : "✨ Rédiger avec l'IA"}
                  </button>
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Expliquez pourquoi vous collectez ces fonds. La transparence rassure les donateurs..."
                  className="input-base resize-none"
                />
              </div>

              <div className="pt-6 flex justify-end">
                <button type="button" onClick={handleNext} className="btn-premium">
                  Suivant : Objectif ➔
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 : Objectif */}
          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-2xl font-black mb-6">Objectif & Durée</h2>

              <div>
                <label className="block font-bold mb-2">Objectif financier (FCFA)</label>
                <div className="relative">
                  <input
                    type="number"
                    name="targetXof"
                    value={formData.targetXof}
                    onChange={handleChange}
                    placeholder="Ex: 500000"
                    className="input-base pr-16 text-xl font-bold"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">XOF</div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Mbolo Pay ne prend aucune commission sur vos dons.</p>
              </div>

              <div>
                <label className="block font-bold mb-2">Date de fin</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="input-base"
                />
              </div>

              <div className="pt-6 flex justify-between">
                <button type="button" onClick={() => setStep(1)} className="group flex items-center justify-center gap-3 px-6 py-3 rounded-2xl text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-500/20 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  </div>
                  <span className="font-bold text-sm tracking-wide">Retour</span>
                </button>
                <button type="button" onClick={handleNext} className="btn-premium">
                  Suivant : Photo & Aperçu ➔
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 : Photo & Aperçu */}
          {step === 3 && (
            <div className="animate-fade-in space-y-8">
              <h2 className="text-2xl font-black mb-6">Photo & Aperçu final</h2>

              <div>
                <label className="block font-bold mb-2">Photo de couverture</label>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 dark:border-slate-700 border-dashed rounded-2xl relative">
                  {formData.photoUrl ? (
                    <div className="relative w-full h-64">
                      <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                      <button 
                        type="button" 
                        onClick={() => setFormData({ ...formData, photoUrl: "" })}
                        className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="text-center w-full">
                      <div className="text-4xl mb-3">📸</div>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <label className="relative cursor-pointer text-primary font-bold hover:underline">
                          <span>Téléverser une image</span>
                          <input name="photoUrl" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                        </label>
                        <span className="text-slate-400 text-xs">OU</span>
                        <button 
                          type="button"
                          onClick={handleGenerateImage}
                          className="text-indigo-500 font-bold hover:underline flex items-center gap-1"
                        >
                          ✨ Créer avec l'IA
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">L'IA générera une image parfaite basée sur votre titre.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Aperçu Card */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                <h3 className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-4">Aperçu de votre collecte</h3>
                <div className="flex gap-4 items-start">
                  <div className="w-24 h-24 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                    {formData.photoUrl ? (
                      <img src={formData.photoUrl} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl opacity-20">📸</div>
                    )}
                  </div>
                  <div>
                    <span className="badge-category mb-2">{getCategoryLabel(formData.category).emoji} {getCategoryLabel(formData.category).label}</span>
                    <h4 className="font-bold text-lg leading-tight mb-1">{formData.title || "Titre de la collecte"}</h4>
                    <p className="text-sm text-primary font-black">{Number(formData.targetXof).toLocaleString()} XOF</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row justify-between gap-4">
                <button type="button" onClick={() => setStep(2)} className="group flex items-center justify-center gap-3 px-6 py-3 rounded-2xl text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-500/20 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  </div>
                  <span className="font-bold text-sm tracking-wide">Retour</span>
                </button>
                <button onClick={handleSubmit} disabled={loading} className="btn-premium bg-blue-600 hover:shadow-blue-600/30">
                  {loading ? "Publication en cours..." : "✅ Publier ma collecte"}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
