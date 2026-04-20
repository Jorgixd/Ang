import React, { useState, useEffect } from "react";
import {
  Gift,
  Heart,
  Sparkles,
  Flower2,
  Book,
  Cloud,
  Trophy,
  Star,
  MousePointer2,
} from "lucide-react";

// --- COMPONENTE DE LLUVIA DE SAKURAS ---
const SakuraRain = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 10 + 8,
      duration: Math.random() * 8 + 7,
      delay: Math.random() * 5,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[100]">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-sakura-fall"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.8}px`,
            backgroundColor: "#D8B4FE", // Lila vibrante
            borderRadius: "100% 10% 100% 100%",
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            top: "-20px",
          }}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [step, setStep] = useState(0);
  const [currentMemory, setCurrentMemory] = useState(0);

  const memories = [
    {
      url: "/images/ride.jpg",
      text: "A veces, el reencuentro más esperado sucede bajo la lluvia...",
      anime: "Ao Haru Ride",
      ytId: "BdyvfbCcO0A",
    },
    {
      url: "/images/paradise.jpg",
      text: "En la frontera entre la vida y la muerte, el amor florece.",
      anime: "Hell's Paradise",
      ytId: "OFsDVrP3-J8",
    },
    {
      url: "/images/black.jpg",
      text: "La verdadera magia es nunca rendirse ante nada.",
      anime: "Black Clover",
      ytId: "MITGJPpixBk",
    },
    {
      url: "/images/haykiu.jpg",
      text: "No importa la altura de la red, siempre seguiremos volando.",
      anime: "Haikyuu!!",
      ytId: "PaG9c6NYHwg",
    },
  ];

  const nextMemory = () => {
    if (currentMemory < memories.length - 1) {
      setCurrentMemory(currentMemory + 1);
    } else {
      setStep(2);
    }
  };

  // --- PASO 0: INICIO ---
  if (step === 0) {
    return (
      <div className="min-h-screen bg-[#FDF4FF] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <SakuraRain />
        <div className="text-center z-10 relative">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-purple-900 mb-12 animate-bounce tracking-tight">
            Tengo una sorpresa para ti...
          </h1>
          <button
            onClick={() => setStep(1)}
            className="group relative transition-transform hover:scale-110 active:scale-95 duration-500"
          >
            <div className="w-56 h-56 bg-purple-400 rounded-3xl border-8 border-purple-500 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.5)] flex items-center justify-center relative overflow-hidden">
              <Gift className="text-white w-24 h-24 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <Sparkles className="absolute -top-6 -right-6 text-yellow-400 w-12 h-12 animate-pulse" />
          </button>
          <p className="mt-12 text-purple-700 italic text-lg">
            Haz clic en la caja para empezar 💜
          </p>
        </div>
      </div>
    );
  }

  // --- PASO 1: RECUERDOS ---
  if (step === 1) {
    return (
      <div
        onClick={nextMemory}
        className="min-h-screen bg-black flex items-center justify-center relative cursor-pointer overflow-hidden transition-all duration-1000"
      >
        <iframe
          key={memories[currentMemory].ytId}
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${memories[currentMemory].ytId}?autoplay=1&controls=0&mute=0&rel=0`}
          allow="autoplay; encrypted-media"
          className="hidden"
        ></iframe>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 blur-2xl scale-110 transition-all duration-700"
          style={{ backgroundImage: `url(${memories[currentMemory].url})` }}
        ></div>
        <SakuraRain />
        <div className="relative z-10 w-full max-w-2xl px-6 pointer-events-none text-center animate-fade-in">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
            <img
              src={memories[currentMemory].url}
              className="w-full aspect-[4/5] object-cover"
              alt={memories[currentMemory].anime}
            />
            <div className="p-10 bg-gradient-to-t from-black via-black/60 to-transparent">
              <span className="text-purple-400 font-bold uppercase tracking-[0.5em] text-[10px]">
                {memories[currentMemory].anime}
              </span>
              <p className="text-white text-3xl font-serif italic mt-3 leading-tight">
                "{memories[currentMemory].text}"
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 mt-10 px-4">
            {memories.map((_, i) => (
              <div
                key={i}
                className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full bg-purple-500 transition-all duration-500 ${i <= currentMemory ? "w-full" : "w-0"}`}
                ></div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center gap-2 text-white/40 animate-pulse">
            <span className="text-xs uppercase tracking-[0.3em] font-light"></span>
          </div>
        </div>
      </div>
    );
  }

  // --- PASO 2: PÁGINA FINAL ---
  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in pb-32 relative overflow-hidden">
      <iframe
        width="0"
        height="0"
        src="https://www.youtube.com/embed/RyyuuDNuKao?autoplay=1&loop=1&playlist=RyyuuDNuKao"
        allow="autoplay"
        className="hidden"
      ></iframe>

      <SakuraRain />

      <header className="py-28 text-center relative overflow-hidden z-10">
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4">
          <span className="text-purple-950">PARA </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 animate-gradient-x underline decoration-wavy underline-offset-[15px] decoration-purple-300">
            TI.
          </span>
        </h1>
        <p className="mt-12 text-purple-800 font-serif italic text-2xl tracking-wide opacity-80 px-4">
          Un rincón diseñado para tus historias favoritas 💜
        </p>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-40 mt-16 z-10 relative">
        {/* AO HARU RIDE */}
        <section className="relative group p-[2px] rounded-[3rem] bg-gradient-to-br from-purple-200 to-fuchsia-300 shadow-2xl transition-transform hover:scale-[1.02] duration-500">
          <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[2.9rem] flex flex-col items-center">
            <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
              <img
                src="/images/ride2.jpg"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Ride"
              />
            </div>
            <Cloud className="text-blue-400 mb-6 w-12 h-12 animate-bounce" />
            <h2 className="text-3xl font-black text-purple-900 mb-6 italic">
              Melancolía de Cerezo
            </h2>
            <div className="p-6 bg-purple-50 rounded-2xl border-l-8 border-purple-400 italic text-slate-700 text-lg leading-relaxed shadow-sm">
              "Esperar a que pare de llover es más fácil si es contigo. Cada
              momento cuenta."
            </div>
          </div>
        </section>

        {/* HELL'S PARADISE */}
        <section className="relative group p-[2px] rounded-[3rem] bg-gradient-to-br from-slate-700 to-purple-900 shadow-2xl transition-transform hover:scale-[1.02] duration-500">
          <div className="bg-slate-900/95 backdrop-blur-md p-8 md:p-12 rounded-[2.9rem] flex flex-col items-center text-white">
            <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-lg border-4 border-slate-800">
              <img
                src="/images/paradise2.jpg"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Paradise"
              />
            </div>
            <Flower2 className="text-pink-500 mb-6 w-12 h-12" />
            <h2 className="text-3xl font-black text-pink-200 mb-6 italic tracking-widest uppercase">
              Flores en el Caos
            </h2>
            <div className="p-6 bg-white/5 rounded-2xl border-l-8 border-pink-600 italic text-purple-100 text-lg leading-relaxed shadow-inner">
              "En la frontera entre la vida y la muerte, el amor florece. Es el
              único camino a la redención."
            </div>
          </div>
        </section>

        {/* BLACK CLOVER */}
        <section className="relative group p-[2px] rounded-[3rem] bg-gradient-to-br from-purple-500 to-indigo-700 shadow-2xl transition-transform hover:scale-[1.02] duration-500">
          <div className="bg-purple-800/95 backdrop-blur-md p-8 md:p-12 rounded-[2.9rem] flex flex-col items-center text-white">
            <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-lg border-4 border-purple-900/50">
              <img
                src="/images/black2.jpg"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Black Clover"
              />
            </div>
            <Book className="text-yellow-400 mb-6 w-12 h-12" />
            <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">
              Superando Límites
            </h2>
            <div className="p-6 bg-black/30 rounded-2xl border-l-8 border-yellow-400 italic text-purple-50 text-lg leading-relaxed shadow-inner">
              "¡Mi magia es nunca rendirse! Rompiendo el destino por lo que más
              queremos en este mundo."
            </div>
          </div>
        </section>

        {/* HAIKYUU */}
        <section className="relative group p-[2px] rounded-[3rem] bg-gradient-to-br from-orange-400 to-red-600 shadow-2xl transition-transform hover:scale-[1.02] duration-500 overflow-hidden">
          <div className="bg-orange-500/95 backdrop-blur-md p-8 md:p-12 rounded-[2.9rem] flex flex-col items-center text-white">
            <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-lg border-4 border-orange-600">
              <img
                src="/images/haykiu2.jpg"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Haikyuu"
              />
            </div>
            <Trophy className="text-yellow-200 mb-6 w-12 h-12" />
            <h2 className="text-3xl font-black text-white mb-6 uppercase italic tracking-tighter">
              ¡Vuela más Alto!
            </h2>
            <div className="p-6 bg-black/10 rounded-2xl border-l-8 border-white italic text-white text-xl font-bold leading-relaxed shadow-sm">
              "No importa qué tan alta sea la red, el balón aún no ha tocado el
              suelo. ¡El Karasuno siempre despega!"
            </div>
          </div>
        </section>

        <footer className="text-center space-y-10 pt-32 border-t border-purple-100 z-10 relative mt-20">
          <Heart
            className="mx-auto text-pink-500 animate-pulse w-16 h-16"
            fill="currentColor"
          />
          <div className="flex flex-col gap-3">
            <p className="text-purple-950 font-serif italic text-2xl px-6 max-w-lg mx-auto leading-relaxed">
              Espero que este rincón te haya sacado una sonrisa.
            </p>
            <div className="opacity-40 text-[11px] tracking-[0.7em] uppercase font-black text-purple-900 pt-10">
              Jorge
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
