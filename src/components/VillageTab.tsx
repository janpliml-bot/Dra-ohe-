import React, { useState } from 'react';
import { motion } from 'motion/react';

interface VillageTabProps {
  faithLevel: number;
  setFaithLevel: (val: number | ((prev: number) => number)) => void;
  harmonyLevel: number;
  setHarmonyLevel: (val: number | ((prev: number) => number)) => void;
  onNavigate: (tab: 'village' | 'diplomacy' | 'warroom' | 'shrine' | 'home' | 'history') => void;
}

export default function VillageTab({
  faithLevel,
  setFaithLevel,
  harmonyLevel,
  setHarmonyLevel,
  onNavigate
}: VillageTabProps) {
  // Local interaction states
  const [activeModal, setActiveModal] = useState<'hearth' | 'smithy' | 'spire' | null>(null);
  const [hearthFuel, setHearthFuel] = useState<number>(harmonyLevel);
  const [smithyShieldUnlocked, setSmithyShieldUnlocked] = useState(false);
  const [lastCommunion, setLastCommunion] = useState<string>('');

  const handleStokeHearth = () => {
    setHearthFuel(prev => {
      const next = Math.min(prev + 5, 100);
      setHarmonyLevel(next);
      return next;
    });
    setFaithLevel(p => p + 1);
  };

  const handleCommune = () => {
    const dialogues = [
      "The flames whisper of ancient ice on the northern horizon.",
      "The Great Dragon Aurelion grants you his warm gaze.",
      "A surge of mystical lava essence course through your veins.",
      "The embers of old ancestors spark in absolute harmony."
    ];
    const randomIndex = Math.floor(Math.random() * dialogues.length);
    setLastCommunion(dialogues[randomIndex]);
    setFaithLevel(p => p + 3);
  };

  return (
    <div className="space-y-gutter relative pb-12">
      {/* Hero Section: Village Overview */}
      <section className="relative h-[353px] w-full flex items-end justify-center overflow-hidden rounded-xl border border-orange-950/40">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover brightness-50 contrast-125"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjjpx6BWu3Lq2T3xLovolfJtu9poV1j8ryYKPgLXgLCicxcPZA_wPwH49QZH81MOKL14Misa1J3Gfauj_JJF-JVHztdCggWdcrGRevVyiGZi6RnsNrdq-NA5Dvl3MMT0jebP3Tj5txRqfcgQffmsJFosjs3ieBPamMfHbawZe43qF9Lpl6bJj8Npe_80xAgEK3cK2tRcepypoo5LrPQ5wPvGqt9VAyUWIS8riKTY4ZSM2cs7uSFGCVNZYbfw_FiYararuDcgZ8wAY"
            alt="Village Sanctuary"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>
        <div className="relative z-10 mb-8 text-center px-6">
          <p className="font-runic text-sm text-amber-500 uppercase tracking-[0.3em] mb-2">Ember-Forged Sanctuary</p>
          <h2 className="font-epilogue font-black text-3xl md:text-5xl text-slate-100 uppercase drop-shadow-[0_2px_10px_rgba(255,95,31,0.5)]">
            Ancestral Domain
          </h2>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-gutter mt-12">
        {/* Left Column: Key Locations Bento */}
        <div className="col-span-12 lg:col-span-8 space-y-gutter">
          <div className="flex items-center gap-4 mb-4">
            <span className="material-symbols-outlined text-orange-500" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <h3 className="font-epilogue font-bold text-2xl text-slate-100">Sacred Sites</h3>
            <div className="ash-streak flex-grow opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* The Great Hearth */}
            <div className="dragon-scale bg-neutral-900/60 border border-orange-900/30 rounded-lg p-6 relative overflow-hidden group transition-all duration-300 hover:border-orange-500/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                <span className="material-symbols-outlined text-6xl">fireplace</span>
              </div>
              <h4 className="font-epilogue font-bold text-xl text-amber-500 mb-2">The Great Hearth</h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                The eternal flame where village elders commune with the fire-spirits and forge the community's future.
              </p>
              <button
                onClick={() => setActiveModal('hearth')}
                className="hammered-bronze px-5 py-2.5 rounded-sm font-runic text-white uppercase tracking-widest text-[12px] flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Enter Sanctum
                <span className="material-symbols-outlined text-sm">local_fire_department</span>
              </button>
            </div>

            {/* The Scale-Smithy */}
            <div className="dragon-scale bg-neutral-900/60 border border-orange-900/30 rounded-lg p-6 relative overflow-hidden group transition-all duration-300 hover:border-orange-500/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                <span className="material-symbols-outlined text-6xl">hardware</span>
              </div>
              <h4 className="font-epilogue font-bold text-xl text-amber-500 mb-2">The Scale-Smithy</h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Where volcanic glass is tempered and dragonhide is stitched into armor for village guardians.
              </p>
              <button
                onClick={() => setActiveModal('smithy')}
                className="hammered-bronze px-5 py-2.5 rounded-sm font-runic text-white uppercase tracking-widest text-[12px] flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Visit Forge
                <span className="material-symbols-outlined text-sm">construction</span>
              </button>
            </div>

            {/* Ancestral Spire (Large) */}
            <div className="col-span-1 md:col-span-2 dragon-scale bg-neutral-900/60 border border-orange-900/30 rounded-lg p-6 relative overflow-hidden group transition-all duration-300 hover:border-orange-500/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/3 aspect-square rounded-lg overflow-hidden border border-orange-950/40 shadow-inner">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmY6AFRwHRqZrpKSCFZdO_r_JPWaGj5AFa247Y9h-ep_B7a1D_UavY_0rcTV8Iiz36HYA1e6Wfqz6jN-bfBDUgv5_P-T3Ykt5sxKs45OJtamYqsb-zO0AL2BlEotlRd2ymGAVjowfyZqG1Nr_ldt00YQxwWqK5iKsd6yEX-3sIm9OSP3yS7FzY-pq7jGk429Qc_Xm1S2QROiiTZ6ahM6NP0gvBJAoA_PsoWjbelELJNs8Hj4QGVtvGm2hkLtnslTbBJJyacFcXxBs"
                    alt="Ancestral Spire"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h4 className="font-epilogue font-bold text-xl text-amber-500 mb-2">Ancestral Spire</h4>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Rising high above the forest canopy, this spire houses the chronicles of the Flame-Walkers and the echoes of ancient dragons.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setActiveModal('spire')}
                      className="hammered-bronze px-5 py-2 rounded-sm font-runic text-white uppercase tracking-widest text-[11px] flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      Commune
                      <span className="material-symbols-outlined text-sm">auto_stories</span>
                    </button>
                    <button 
                      onClick={() => onNavigate('history')}
                      className="border border-orange-900/60 hover:border-orange-500/60 px-5 py-2 rounded-sm font-runic text-slate-300 uppercase tracking-widest text-[11px] hover:bg-orange-950/20 active:scale-95 transition-all cursor-pointer"
                    >
                      Read Lore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Profile */}
        <div className="col-span-12 lg:col-span-4 space-y-gutter">
          {/* Guardian Profile */}
          <div className="dragon-scale bg-neutral-900/60 border-2 border-orange-900/50 rounded-lg p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg bg-orange-950 border border-orange-600 flex items-center justify-center shadow-[0_0_12px_rgba(239,68,68,0.3)]">
                <span className="material-symbols-outlined text-3xl text-orange-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                  shield
                </span>
              </div>
              <div>
                <h5 className="font-epilogue font-bold text-lg text-orange-500 uppercase tracking-wide">Kruul Flame-Walker</h5>
                <p className="font-runic text-[11px] text-slate-400">Village Guardian • Level 42</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-end mb-1">
                <span className="font-runic text-[10px] text-slate-400">EMBER HARMONY</span>
                <span className="font-runic text-[10px] text-orange-500 font-bold">{harmonyLevel}%</span>
              </div>
              <div className="h-1.5 bg-neutral-950 rounded-full overflow-hidden">
                <div 
                  className="lava-flow h-full transition-all duration-500" 
                  style={{ width: `${harmonyLevel}%` }}
                ></div>
              </div>
            </div>

            {/* Quick interactive links */}
            <div className="space-y-2">
              <div 
                onClick={() => onNavigate('home')}
                className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-orange-950/40 to-transparent hover:from-orange-950/60 text-orange-400 border-l-4 border-orange-600 rounded-r-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm">home</span>
                  <span className="font-epilogue text-sm font-medium">Ancestral Hearth</span>
                </div>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </div>

              <div 
                onClick={() => onNavigate('warroom')}
                className="flex items-center justify-between py-3 px-4 hover:bg-neutral-800/40 text-slate-400 hover:text-orange-300 rounded-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm">security</span>
                  <span className="font-epilogue text-sm font-medium">War Council Console</span>
                </div>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </div>

              <div 
                onClick={() => onNavigate('shrine')}
                className="flex items-center justify-between py-3 px-4 hover:bg-neutral-800/40 text-slate-400 hover:text-orange-300 rounded-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm">local_fire_department</span>
                  <span className="font-epilogue text-sm font-medium">Alchemist Shrine</span>
                </div>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Environmental Warning */}
          <div className="bg-red-950/40 border border-red-500/40 p-6 rounded-lg relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-red-600/10 rounded-full blur-xl group-hover:bg-red-600/15 transition-all"></div>
            <div className="flex items-center gap-3 mb-3 text-red-500">
              <span className="material-symbols-outlined animate-pulse">warning</span>
              <h6 className="font-epilogue font-bold text-sm uppercase tracking-wider">Flame Alert</h6>
            </div>
            <p className="text-red-200/80 text-xs leading-relaxed">
              Volcanic activity in the West Sector is rising. Guardians are advised to equip fire-resistant scale mail and keep defensive wards active.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Modals */}
      {activeModal === 'hearth' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-stone-900 border border-orange-500/40 rounded-lg p-6 shadow-2xl space-y-4"
          >
            <div className="flex justify-between items-center pb-2 border-b border-orange-950">
              <h3 className="font-epilogue font-black text-lg text-amber-500 flex items-center gap-2 uppercase">
                <span className="material-symbols-outlined text-orange-500">fireplace</span>
                The Eternal Hearth Sanctum
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-100 text-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Feed volcanic embers to the Great Fire to increase village harmony and fuel Kruul's inner light.
            </p>
            <div className="bg-neutral-950 p-4 rounded-lg space-y-3">
              <div className="flex justify-between text-xs font-runic text-slate-400">
                <span>Current Harmony State:</span>
                <span className="text-orange-500 font-bold">{harmonyLevel}%</span>
              </div>
              <div className="h-2 bg-stone-900 rounded-full overflow-hidden">
                <div className="lava-flow h-full" style={{ width: `${hearthFuel}%` }}></div>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleStokeHearth}
                className="w-full hammered-bronze py-2.5 rounded text-white font-runic text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all"
              >
                STOKE THE HEARTH (+5%)
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {activeModal === 'smithy' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-stone-900 border border-orange-500/40 rounded-lg p-6 shadow-2xl space-y-4"
          >
            <div className="flex justify-between items-center pb-2 border-b border-orange-950">
              <h3 className="font-epilogue font-black text-lg text-amber-500 flex items-center gap-2 uppercase">
                <span className="material-symbols-outlined text-orange-500">construction</span>
                The Scale-Smithy Forge
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-100 text-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              The blacksmith stands ready. Pour obsidian elements to craft elite heat protection.
            </p>
            <div className="bg-neutral-950 p-4 rounded-md flex items-center justify-between">
              <div>
                <p className="font-runic text-xs text-orange-500 font-bold">Titan Dragon Scale Belt</p>
                <p className="text-[10px] text-slate-500">Requires Faith Mastery level 10+</p>
              </div>
              <button 
                onClick={() => {
                  setSmithyShieldUnlocked(true);
                  setFaithLevel(p => p + 5);
                }}
                disabled={smithyShieldUnlocked}
                className={`px-3 py-1.5 rounded text-[10px] uppercase font-runic transition-all ${
                  smithyShieldUnlocked 
                    ? "bg-stone-800 text-slate-500" 
                    : "hammered-bronze text-white hover:brightness-110 active:scale-95"
                }`}
              >
                {smithyShieldUnlocked ? 'Crafted' : 'Forge Gear'}
              </button>
            </div>
            {smithyShieldUnlocked && (
              <p className="text-green-500 text-[11px] text-center font-runic font-bold">
                ✓ Elite Scale belt forged successfully! Kruul gains fire defense.
              </p>
            )}
          </motion.div>
        </div>
      )}

      {activeModal === 'spire' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-stone-900 border border-orange-500/40 rounded-lg p-6 shadow-2xl space-y-4"
          >
            <div className="flex justify-between items-center pb-2 border-b border-orange-950">
              <h3 className="font-epilogue font-black text-lg text-amber-500 flex items-center gap-2 uppercase">
                <span className="material-symbols-outlined text-orange-500">auto_stories</span>
                Spire Communion
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-100 text-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Listen to the ancient dragon whispers through the runic volcanic obsidian interface.
            </p>
            <div className="bg-neutral-950 p-4 rounded-md min-h-[80px] flex items-center justify-center text-center">
              {lastCommunion ? (
                <p className="text-amber-400 font-serif italic text-sm">
                  "{lastCommunion}"
                </p>
              ) : (
                <span className="text-slate-500 text-xs italic">Tap below to open ancestral connection...</span>
              )}
            </div>
            <button 
              onClick={handleCommune}
              className="w-full hammered-bronze py-2 rounded text-white font-runic text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all"
            >
              Channel Spirent Echos
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
