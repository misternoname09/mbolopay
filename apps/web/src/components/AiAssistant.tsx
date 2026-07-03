"use client";

import { useState, useEffect, useRef } from "react";

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Bonjour ! Je suis Mbolo AI. Je peux maintenant vous écouter et vous parler. Comment puis-je vous aider ?" }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Speech Synthesis (Speak)
  const speak = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      window.speechSynthesis.speak(utterance);
    }
  };

  // Speech Recognition (Listen)
  const toggleListening = () => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("La reconnaissance vocale n'est pas supportée par votre navigateur.");
        return;
      }

      if (isListening) {
        setIsListening(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "fr-FR";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
      };

      recognition.start();
    }
  };

  const handleSend = (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg = { role: "user", text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate AI thinking
    setTimeout(() => {
      let botResponse = "Je ne suis pas sûr de comprendre, mais vous pouvez contacter notre support au +221 77 123 45 67.";
      
      const lower = textToSend.toLowerCase();
      if (lower.includes("don") || lower.includes("payer")) {
        botResponse = "Pour faire un don, choisissez une collecte sur la page d'accueil et utilisez Wave ou Orange Money.";
      } else if (lower.includes("frais") || lower.includes("gratuit")) {
        botResponse = "Mbolo Pay est 100% gratuit pour les causes sociales. Aucun frais de commission n'est prélevé.";
      } else if (lower.includes("retrait") || lower.includes("argent")) {
        botResponse = "Vous pouvez retirer vos fonds depuis votre Dashboard une fois votre identité vérifiée (KYC).";
      } else if (lower.includes("sécurité") || lower.includes("sûr")) {
        botResponse = "Nous utilisons un cryptage de niveau bancaire et chaque transaction est surveillée par notre moteur de fraude.";
      }

      setMessages(prev => [...prev, { role: "bot", text: botResponse }]);
      speak(botResponse); // Speak the response
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary rounded-full shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-all active:scale-95 relative"
      >
        {isOpen ? "✕" : "🤖"}
        {!isOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-300">
          <div className="bg-primary p-6 text-white flex justify-between items-center">
            <div>
              <h3 className="font-black text-xl tracking-tighter">Mbolo AI <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full ml-2">VOICE</span></h3>
              <p className="text-xs opacity-70">Assistant vocal intelligent</p>
            </div>
            <div className="flex gap-2">
               <button onClick={toggleListening} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 animate-pulse' : 'bg-white/20 hover:bg-white/30'}`}>
                 {isListening ? "⏹️" : "🎤"}
               </button>
            </div>
          </div>

          <div ref={scrollRef} className="h-80 overflow-y-auto p-6 space-y-4 bg-slate-50 dark:bg-slate-950/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${
                  m.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm border border-slate-100 dark:border-slate-800 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2 bg-white dark:bg-slate-900">
            <input 
              type="text" 
              placeholder="Posez votre question..." 
              className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-primary"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={() => handleSend()}
              className="bg-primary text-white p-2 rounded-xl"
            >
              🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
