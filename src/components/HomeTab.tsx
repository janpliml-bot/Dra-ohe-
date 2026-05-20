import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeTabProps {
  faithLevel: number;
  setFaithLevel: (val: number | ((prev: number) => number)) => void;
  onNavigate: (tab: 'village' | 'diplomacy' | 'warroom' | 'shrine' | 'home' | 'history') => void;
}

export default function HomeTab({
  faithLevel,
  setFaithLevel,
  onNavigate
}: HomeTabProps) {
  const [pitIntensity, setPitIntensity] = useState<number>(85);
  const [praying, setPraying] = useState(false);
  const [activeFursDetail, setActiveFursDetail] = useState(false);

  const handleOfferPrayer = () => {
    setPraying(true);
    setFaithLevel(p => p + 1);
    setTimeout(() => {
      setPraying(false);
    }, 1500);
  };

  return (
    <div className="space-y-gutter pb-12 relative">
      {/* Prayer text confirmation animation */}
      <AnimatePresence>
        {praying && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-amber-500 border border-amber-600 text-stone-950 px-4 py-2 rounded-full shadow-lg font-runic text-xs font-bold flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm animate-spin">radial_expressive</span>
            <span>SPIRITUAL BURST DISPATCHED! (+1 FAITH)</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Living Space Overview */}
      <section className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-8 relative rounded-xl overflow-hidden h-[500px] shadow-2xl border border-orange-950/40">
          <img
            alt="Dragonborn Interior"
            className="w-full h-full object-cover brightness-75 hover:scale-102 transition-transform duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6AjHGGLsX1vycmG2_YP2Og82mUN1RqW14UUDMxM6zXpkN6Z0WK6L5vbBm9gSORuZaLUipaTzav3v-5ZM7FrgkmEhnFmUr6glq9hvUDHdmMpFlIh_RpzQQ1lRW1t6aU6KU_jH2jVVvsVrL4GIV4RbAdfgHO0ezemQQkiXFI7eGwy0rpGULOA-lmppROuRz4vK0SGoJolBM6U0aeS1VDdRx39aznwRZvHAjaQ1uY301hiU8HyZ0pW34bCWKNc3mikTO-ym-KskOQE4"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 pr-8">
            <span className="inline-block px-3 py-1 bg-orange-600 text-stone-955 font-runic font-bold text-xs rounded-full mb-4 uppercase tracking-wider">
              PERSONAL SANCTUARY
            </span>
            <h2 className="font-epilogue font-black text-2xl md:text-4xl text-slate-100 mb-2">Kruul's Hearth</h2>
            <p className="text-slate-300 text-xs md:text-sm max-w-lg leading-relaxed">
              A sanctuary carved from the living basalt of the Pyre-Mountain, where the fire never dies and the ancestors watch from the stone.
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-neutral-900 border border-orange-900/40 dragon-scale inner-fire rounded-lg p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="font-epilogue font-bold text-lg text-orange-500 mb-4 flex items-center gap-2 uppercase tracking-wide">
                <span className="material-symbols-outlined text-amber-500">auto_stories</span>
                Draconic Lineage
              </h3>
              <div className="space-y-4">
                <div className="bg-neutral-950 p-4 rounded-sm border-l-2 border-orange-500 shadow-md">
                  <p className="font-runic font-bold text-amber-500 text-xs tracking-wider">THE FIRST FORGE</p>
                  <p className="text-[11px] text-slate-400 mt-1">Etched stories of the great migration from the magma seas to the mountain peaks.</p>
                </div>
                <div className="bg-neutral-950 p-4 rounded-sm border-l-2 border-orange-500 shadow-md">
                  <p className="font-runic font-bold text-amber-500 text-xs tracking-wider">FLAME-WALKER DECREE</p>
                  <p className="text-[11px] text-slate-400 mt-1">The ancestral laws of the village guardian, carved into the south-facing pillar.</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-orange-950">
              <span className="font-runic text-[10px] text-slate-500 block uppercase">Faith Modifier active</span>
              <span className="font-epilogue text-slate-300 text-xs font-medium">Luminescent Lineage: level 1 active</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Dwelling Details */}
      <section className="grid grid-cols-12 gap-gutter mt-12 mb-12">
        {/* Central Fire Pit */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-stone-900/40 p-8 rounded-lg border border-orange-950/40 flex flex-col justify-between scoria-recess">
          <div>
            <span className="material-symbols-outlined text-4xl text-orange-500 mb-4 animate-pulse">local_fire_department</span>
            <h3 className="font-epilogue font-bold text-lg text-slate-100 mb-2">The Eternal Pit</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              The heart of the dwelling, fueled by a direct vein of volcanic heat. It provides warmth and a ritual space for meditation.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            <input 
              type="range" 
              min="20" 
              max="100" 
              value={pitIntensity}
              onChange={(e) => setPitIntensity(Number(e.target.value))}
              className="w-full accent-orange-500 h-1 bg-neutral-950 rounded-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between font-runic text-[10px] text-orange-500">
              <span className="font-bold">INTENSITY: {pitIntensity > 75 ? 'HIGH' : (pitIntensity > 40 ? 'MEDIUM' : 'LOW')}</span>
              <span>FUEL: {pitIntensity}% SUSTAINED</span>
            </div>
          </div>
        </div>

        {/* Sleeping Mats (Ashen Furs) */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 rounded-lg overflow-hidden group relative min-h-[220px]">
          <img
            alt="Fur Mats"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg4a6-bb0Ae1d7-KNbPRKAhgf88WLnlRc5eJDhmb7NOaTZOGVfNITeqNrnZeQD9TULhthWND5bYpfRLdJbpeIUJEM7TDu5y1XSjmCz88lGo6HIonHv3QwDhXSUpPPN4xuAfIBNkuyAfYKUOkYlu8PpH-jqk0NmCgWdwHlJX6Y7lhdm6cnVariV5taszdXouv_4w7VD-MV3s74Q4L5OkF6Xrn56qUSgzrFDoAxKeW3r3bcKrrqv60T2AfEJEEHTP9jPgzUNjBAc9uw"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-950/75 flex flex-col justify-end p-6 md:p-8">
            <h3 className="font-epilogue font-bold text-lg text-white">Ashen Furs</h3>
            <p className="text-xs text-slate-350 leading-relaxed mt-2">
              Woven from the hide of Great Salamanders, these mats remain cool even when the rock beneath glows.
            </p>
            <button 
              onClick={() => setActiveFursDetail(!activeFursDetail)}
              className="text-left font-runic text-[10px] text-orange-400 uppercase tracking-widest mt-3 hover:text-orange-300 font-bold cursor-pointer"
            >
              {activeFursDetail ? 'Hide insulated layers' : 'Read insulation records'}
            </button>
            {activeFursDetail && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-black/80 p-2.5 rounded mt-2 border border-orange-500/20 text-[9px] text-slate-400"
              >
                Provides 80% frost element insulation. Woven by elders inside Scale-smithy with volcanic seals.
              </motion.div>
            )}
          </div>
        </div>

        {/* Altar of the Fragment */}
        <div className="col-span-12 lg:col-span-4 bg-stone-900 border border-orange-500/20 rounded-lg p-6 flex flex-col items-center text-center justify-between dragon-scale">
          <div className="relative w-32 h-32 my-2">
            <div className="absolute inset-0 bg-orange-600/10 blur-2xl rounded-full"></div>
            <div className="relative bg-neutral-950 w-full h-full rounded-full flex items-center justify-center border-2 border-orange-500 shadow-[0_0_24px_rgba(249,115,22,0.3)]">
              <span className="material-symbols-outlined text-orange-500 text-5xl animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                egg
              </span>
            </div>
            {/* Pulsing indicator orbit */}
            <div className="absolute inset-0 border border-orange-500/30 rounded-full animate-ping pointer-events-none"></div>
          </div>

          <div className="space-y-2 mt-4">
            <h3 className="font-epilogue font-bold text-base text-slate-100">Ancestral Fragment</h3>
            <p className="text-[11px] text-slate-400 max-w-xs">
              A relic of the First Hatching. This altar serves as the spiritual anchor of the Kruul family line.
            </p>
          </div>

          <button
            onClick={handleOfferPrayer}
            className="w-full mt-6 py-3 hammered-bronze text-white font-runic text-xs font-bold rounded-sm active:scale-95 transition-all uppercase tracking-widest hover:brightness-110 cursor-pointer"
          >
            OFFER PRAYER
          </button>
        </div>
      </section>

      {/* Divider */}
      <div className="ash-streak my-12"></div>

      {/* Navigation Context: Return to Village */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 bg-neutral-900/40 p-6 md:p-8 rounded-xl border border-orange-900/20">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full border-2 border-orange-500 p-1 bg-stone-950 overflow-hidden shadow-[0_0_12px_rgba(239,68,68,0.2)]">
            <img 
              alt="Village Map" 
              className="w-full h-full object-cover rounded-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5i5ZJ4eQNjknKVbJZyBJCWWPNfb0Az70z4rcfUUaUCzVbznYISlDcSDapDxHy2GGa9MsMwDtwv5YumnblDqajwNWz9HSO-0NGfQE9o2NwSoJqO--YRSVsx_zSyjOy3Pg7mKLXXiIfjwLVfsSFGwmWvGiyriYjVFcCpMlfXMpa6e4dO3rF3ztKv3JKrXcpDI8DRvO-IqPavKkNwa8a3V58oCR6BSuzvRCbZo-hpNEIOyVjtTj_uYYg7oteX5oiY2mvRVitqeIRgsQ"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h4 className="font-epilogue font-bold text-base text-slate-100">Return to Village</h4>
            <p className="text-slate-400 text-xs">Step out from your sanctuary into the Obsidian Plaza.</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('village')}
          className="flex items-center gap-2 px-8 py-4 bg-neutral-900 border border-orange-500/30 text-orange-400 font-runic text-xs font-bold rounded-sm shadow-lg hover:bg-orange-950/20 active:scale-95 transition-all text-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          LEAVE DWELLING
        </button>
      </section>
    </div>
  );
}
