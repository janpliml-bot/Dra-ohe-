import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ShrineTabProps {
  faithLevel: number;
  setFaithLevel: (val: number | ((prev: number) => number)) => void;
  worshippers: number;
  setWorshippers: (val: number | ((prev: number) => number)) => void;
}

export default function ShrineTab({
  faithLevel,
  setFaithLevel,
  worshippers,
  setWorshippers,
}: ShrineTabProps) {
  const [showLore, setShowLore] = useState(false);
  const [activeRunes, setActiveRunes] = useState<Record<string, boolean>>({
    anchor: true,
    seal: true,
    core: false,
  });

  const [ritualActive, setRitualActive] = useState<string | null>(null);

  const toggleRune = (key: string) => {
    setActiveRunes(prev => {
      const next = { ...prev, [key]: !prev[key] };
      // Active runes change metadata stats!
      const activeCount = Object.values(next).filter(Boolean).length;
      setWorshippers(20 + activeCount * 7);
      return next;
    });
  };

  const handleOfferTribute = () => {
    setFaithLevel(p => p + 3);
  };

  const triggerRitual = (name: string, requiredFaith: number) => {
    if (faithLevel < requiredFaith) {
      alert(`Must reach Faith level ${requiredFaith}! Cultivate more prayers and tributes.`);
      return;
    }
    setRitualActive(name);
    setFaithLevel(p => p + 8);
    setTimeout(() => {
      setRitualActive(null);
    }, 4000);
  };

  return (
    <div className="space-y-gutter pb-12 relative">
      {/* Ritual fireworks active notification */}
      {ritualActive && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-xl text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-orange-600 border-2 border-amber-400 text-stone-950 p-6 rounded-xl shadow-2xl flex flex-col items-center gap-2"
          >
            <span className="material-symbols-outlined text-4xl animate-spin text-white">flare</span>
            <h3 className="font-epilogue font-black text-lg text-white uppercase tracking-wider">{ritualActive} IN PROGRESS</h3>
            <p className="text-xs text-white/95">Worshipper chanting elevates faith. Harmony spreading down valleys...</p>
          </motion.div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[600px] rounded-xl overflow-hidden border-2 border-orange-900/40 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
        <img
          alt="The Shrine of Eternal Flame"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAs8C-YKfSxVplEovhU04RwFK21uTxxWcsTKdNIyW8ElZULt8XBFPc5gqjH8j2jQ1FE2f3rr4V7EqpdOVbt83MlgaCoX0XvmD6OrCw_0q-RpXEryMKmlTQLtN_lHmKV5Hjts1U9S4Fbabfq4vA2I0RQCMycOZbvMWg1Z7atfFcMVQcEAhTsSHFWls-WjCkwE-qCGCeib-HcKiQx7aIeL-l0jybii5LeL9RnLN3C2o14bh0weUuT1ssnJ61BdW75AW61IQvFGeKnm8"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-0 left-0 p-6 md:p-12 z-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-950/60 border border-orange-500/30 rounded-sm mb-6">
            <span className="material-symbols-outlined text-orange-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
            <span className="font-runic text-orange-400 text-xs uppercase tracking-widest">Sacred Destination</span>
          </div>
          <h2 className="font-epilogue font-black text-3xl md:text-5xl text-orange-400 mb-4 drop-shadow-2xl">
            THE SHRINE OF ETERNAL FLAME
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
            Forged from the heart of the Great Volcanic Glass, the Eternal Shrine stands as the metaphysical anchor of our civilization. Here, the Ancestral Breath sustains the life-fires of every Dragonborn warrior.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleOfferTribute}
              className="hammered-bronze px-8 py-4 rounded-sm font-runic text-white font-bold tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              OFFER TRIBUTE (+3 FAITH)
            </button>
            <button
              onClick={() => setShowLore(!showLore)}
              className="bg-neutral-900 border border-orange-900/40 px-8 py-4 rounded-sm font-runic text-orange-400 font-bold tracking-widest text-xs hover:bg-stone-900 active:scale-95 transition-all text-center cursor-pointer"
            >
              {showLore ? 'HIDE COVENANT' : 'VIEW COVENANT LORE'}
            </button>
          </div>
        </div>
      </section>

      {/* Expanded Lore block (The Obsidian Covenant) */}
      {(showLore || true) && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Central Lore block */}
          <div className="md:col-span-8 dragon-scale p-8 border-2 border-orange-900/30 rounded-lg bg-stone-950 flex flex-col justify-between">
            <div>
              <h3 className="font-epilogue font-bold text-xl text-amber-500 mb-6 flex items-center gap-4">
                <span className="material-symbols-outlined text-orange-500">menu_book</span>
                The Obsidian Covenant
              </h3>
              <div className="space-y-6 text-slate-350 text-sm leading-relaxed">
                <p>
                  Legend speaks of the first patriarch, Ignis Veridian, who carved this statue from the cooling magma of the world-forge. The blue flame represents the cold discipline of the mind, while the orange flame embodies the raw, unbridled power of the draconic soul.
                </p>
                <p>
                  As long as the twin fires burn, the village remains invisible to the frost-wraiths of the Northern Wastes. The shrine acts as a thermal shield, keeping the perpetual wildfires of our valley contained and useful rather than destructive.
                </p>
                <div className="ash-streak my-8"></div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <span className="font-runic text-orange-500/70 text-[10px]">GUARDIAN STATUS</span>
                    <p className="font-epilogue font-bold text-lg text-orange-500">VIGILANT</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-runic text-orange-500/70 text-[10px]">EMBRACE LEVEL</span>
                    <p className="font-epilogue font-bold text-lg text-orange-500">MAXIMUM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Worship Counter and Active Runes */}
          <div className="md:col-span-4 flex flex-col gap-gutter">
            {/* Worship Card */}
            <div className="bg-neutral-900/30 p-6 border-2 border-orange-900/50 rounded-lg shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-600/10 rounded-full blur-2xl group-hover:bg-orange-600/20 transition-all"></div>
              <span className="font-runic text-orange-600/80 mb-2 block text-xs tracking-wider">CURRENT WORSHIPPERS</span>
              <div className="flex items-baseline gap-2">
                <span className="font-epilogue font-bold text-4xl text-orange-500">{worshippers}</span>
                <span className="text-slate-500 text-xs font-bold">ELDERS</span>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => setWorshippers(prev => Math.max(prev - 1, 0))}
                  className="bg-stone-900 hover:bg-stone-800 text-slate-300 w-8 h-8 rounded flex items-center justify-center font-bold text-sm cursor-pointer select-none"
                >
                  -
                </button>
                <button 
                  onClick={() => setWorshippers(prev => prev + 1)}
                  className="bg-stone-900 hover:bg-stone-800 text-slate-300 w-8 h-8 rounded flex items-center justify-center font-bold text-sm cursor-pointer select-none"
                >
                  +
                </button>
              </div>

              <div className="mt-6 w-full h-1.5 bg-neutral-950 rounded-full overflow-hidden">
                <div 
                  className="lava-flow h-full transition-all duration-300" 
                  style={{ width: `${Math.min((worshippers / 80) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-serif italic">Sanctuary Capacity: {Math.round((worshippers / 65) * 100)}%</p>
            </div>

            {/* Runes Card */}
            <div className="bg-neutral-950 p-6 border border-orange-950/40 rounded-lg flex-grow">
              <h4 className="font-epilogue font-bold text-sm text-slate-200 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                Active Runes (Click to toggle)
              </h4>
              <ul className="space-y-3 font-medium">
                <li 
                  onClick={() => toggleRune('anchor')}
                  className={`flex items-center gap-4 py-2 px-3 rounded cursor-pointer transition-all border ${
                    activeRunes.anchor 
                      ? 'border-orange-500/40 bg-orange-950/15 text-orange-300' 
                      : 'border-transparent text-slate-500'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">brightness_7</span>
                  <span className="text-xs">Thermal Anchor V</span>
                </li>

                <li 
                  onClick={() => toggleRune('seal')}
                  className={`flex items-center gap-4 py-2 px-3 rounded cursor-pointer transition-all border ${
                    activeRunes.seal 
                      ? 'border-orange-500/40 bg-orange-950/15 text-orange-300' 
                      : 'border-transparent text-slate-500'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">security</span>
                  <span className="text-xs">Wraith-Bane Seal</span>
                </li>

                <li 
                  onClick={() => toggleRune('core')}
                  className={`flex items-center gap-4 py-2 px-3 rounded cursor-pointer transition-all border ${
                    activeRunes.core 
                      ? 'border-orange-500/40 bg-orange-950/15 text-orange-300' 
                      : 'border-transparent text-slate-500'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  <span className="text-xs">Soul-Binding Core</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Ceremony Schedule Section */}
      <section className="space-y-6 pt-8">
        <h3 className="font-epilogue font-extrabold text-2xl text-orange-400 text-center uppercase tracking-wide">ANHYDROUS RITUALS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ritual Card 1 */}
          <div className="dragon-scale border border-orange-900/40 p-1 rounded-lg">
            <div className="bg-neutral-950 p-6 rounded-md flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-orange-950/40 rounded-sm border border-orange-600/20">
                    <span className="material-symbols-outlined text-orange-500">history_edu</span>
                  </div>
                  <span className="text-[10px] font-runic text-slate-500 uppercase tracking-widest">DAWN</span>
                </div>
                <h5 className="font-epilogue font-bold text-amber-500">The Kindling</h5>
                <p className="text-slate-400 text-xs leading-relaxed">Awakening the core fire through coordinated ancestral chants.</p>
              </div>
              <div>
                <div className="ash-streak my-4"></div>
                <button 
                  onClick={() => triggerRitual('THE KINDLING', 15)}
                  className="w-full bg-orange-950/20 hover:bg-orange-900/40 text-[10px] font-runic text-orange-400 py-1.5 rounded border border-orange-500/30 uppercase tracking-wider transition-all cursor-pointer"
                >
                  Trigger Kindling
                </button>
                <span className="text-orange-500/60 font-runic text-[9px] mt-2 block tracking-wider uppercase text-center">REQUIRED: LEVEL 15 FAITH</span>
              </div>
            </div>
          </div>

          {/* Ritual Card 2 */}
          <div className="dragon-scale border border-orange-900/40 p-1 rounded-lg transform md:scale-105 shadow-2xl z-10">
            <div className="bg-neutral-950 p-6 rounded-md border-t-2 border-orange-500 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-orange-950/40 rounded-sm border border-orange-500/40">
                    <span className="material-symbols-outlined text-orange-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                      fireplace
                    </span>
                  </div>
                  <span className="text-[10px] font-runic text-orange-500 uppercase tracking-widest font-bold">MIDDAY</span>
                </div>
                <h5 className="font-epilogue font-bold text-orange-500">Solar Convergence</h5>
                <p className="text-slate-450 text-xs leading-relaxed">Directing the peak mountain sun into the obsidian lenses.</p>
              </div>
              <div>
                <div className="ash-streak my-4"></div>
                <button 
                  onClick={() => triggerRitual('SOLAR CONVERGENCE', 25)}
                  className="w-full hammered-bronze text-[10px] font-runic text-white py-2 rounded uppercase tracking-widest transition-all cursor-pointer font-bold"
                >
                  Trigger Solar Lens
                </button>
                <span className="text-orange-400 font-runic text-[9px] mt-2 block tracking-wider uppercase text-center font-bold">EVENT: ACTIVE NOW (LVL 25)</span>
              </div>
            </div>
          </div>

          {/* Ritual Card 3 */}
          <div className="dragon-scale border border-orange-900/40 p-1 rounded-lg">
            <div className="bg-neutral-950 p-6 rounded-md flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-orange-950/40 rounded-sm border border-orange-600/20">
                    <span className="material-symbols-outlined text-orange-500">nights_stay</span>
                  </div>
                  <span className="text-[10px] font-runic text-slate-500 uppercase tracking-widest">DUSK</span>
                </div>
                <h5 className="font-epilogue font-bold text-amber-500">Ash Casting</h5>
                <p className="text-slate-400 text-xs leading-relaxed">Purifying the day's sins through the sacrificial pyre.</p>
              </div>
              <div>
                <div className="ash-streak my-4"></div>
                <button 
                  onClick={() => triggerRitual('ASH CASTING', 35)}
                  className="w-full bg-orange-950/20 hover:bg-orange-900/40 text-[10px] font-runic text-orange-400 py-1.5 rounded border border-orange-500/30 uppercase tracking-wider transition-all cursor-pointer"
                >
                  Trigger Ash Cast
                </button>
                <span className="text-orange-500/60 font-runic text-[9px] mt-2 block tracking-wider uppercase text-center">REQUIRED: LVL 35 FAITH</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
