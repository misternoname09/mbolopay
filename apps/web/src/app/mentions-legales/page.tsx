"use client";

import Link from "next/link";

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-4 relative overflow-hidden font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <Link href="/" className="inline-block mb-6 p-3 rounded-full bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 transition-colors text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Mentions Légales & <span className="text-primary">CGU</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
            Dernière mise à jour : 12 Novembre 2026
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/50 dark:border-slate-800/50 relative z-10 animate-slide-up space-y-12 prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-a:text-primary hover:prose-a:text-primary-dark prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed" style={{ animationDelay: "100ms" }}>
          
          <section>
            <h2 className="text-2xl text-slate-900 dark:text-white flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl">🏢</span>
              1. Éditeur du Site
            </h2>
            <p>
              Le site <strong>MboloPay</strong> (ci-après "le Site") est édité par la société MboloPay, SARL au capital de 1 000 000 FCFA, immatriculée au Registre du Commerce et du Crédit Mobilier (RCCM) de Dakar sous le numéro SN-DKR-2023-B-XXXX.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600 dark:text-slate-400">
              <li><strong>Siège social :</strong> Dakar, Sénégal</li>
              <li><strong>NINEA :</strong> 787956265</li>
              <li><strong>Email :</strong> contact@mbolopay.com</li>
              <li><strong>Directeur de la publication :</strong> Équipe MboloPay</li>
            </ul>
          </section>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

          <section>
            <h2 className="text-2xl text-slate-900 dark:text-white flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-xl">⚖️</span>
              2. Conditions Générales d'Utilisation (CGU)
            </h2>
            <p>
              MboloPay est une plateforme technologique permettant la création de cagnottes en ligne. En utilisant notre service, vous acceptez de vous conformer aux présentes conditions.
            </p>
            <h3 className="text-xl mt-6 mb-3 text-slate-800 dark:text-slate-200">2.1. Création de Cagnottes</h3>
            <p>
              L'utilisateur certifie que les fonds collectés seront utilisés à des fins légales et conformes à l'ordre public. MboloPay se réserve le droit de bloquer toute cagnotte suspectée de fraude, blanchiment d'argent ou financement du terrorisme.
            </p>
            <h3 className="text-xl mt-6 mb-3 text-slate-800 dark:text-slate-200">2.2. Modèle Économique (Frais)</h3>
            <p>
              Contrairement aux plateformes traditionnelles, <strong>MboloPay ne prélève aucune commission sur la cagnotte du créateur.</strong> 
              Les frais de fonctionnement (estimés à environ 4%) sont ajoutés au montant de la contribution du donateur lors du paiement, de manière totalement transparente.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 p-6 rounded-2xl mt-4">
              <p className="text-blue-800 dark:text-blue-300 m-0 font-medium text-sm">
                Exemple : Si un donateur souhaite offrir 10 000 XOF, il paiera 10 400 XOF (incluant les frais de plateforme et opérateurs mobiles). Le créateur de la cagnotte recevra exactement 10 000 XOF.
              </p>
            </div>
          </section>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

          <section>
            <h2 className="text-2xl text-slate-900 dark:text-white flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-xl">💳</span>
              3. Prestataires de Paiement
            </h2>
            <p>
              Les transactions financières sont sécurisées et opérées par nos partenaires agréés (ex: PayDunya, Wave, Orange Money). MboloPay ne stocke aucune coordonnée bancaire sur ses serveurs.
            </p>
          </section>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

          <section>
            <h2 className="text-2xl text-slate-900 dark:text-white flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 text-xl">🛡️</span>
              4. Données Personnelles et KYC
            </h2>
            <p>
              Conformément à la législation sur la protection des données personnelles (CDP au Sénégal), vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
            </p>
            <p>
              <strong>Procédure KYC (Know Your Customer) :</strong> Afin de garantir la sécurité des fonds et de lutter contre la fraude, une pièce d'identité valide est requise pour tout retrait de fonds collectés. Ces données sont chiffrées et stockées de manière sécurisée.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
