import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArchiveLore } from '../types';

interface HistoryTabProps {
  lores: ArchiveLore[];
  onAddLore: (lore: ArchiveLore) => void;
  faithLevel: number;
  setFaithLevel: (val: number | ((prev: number) => number)) => void;
}

export default function HistoryTab({ lores, onAddLore, faithLevel, setFaithLevel }: HistoryTabProps) {
  const [translationActive, setTranslationActive] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // New lore form inputs
  const [loreTitle, setLoreTitle] = useState('');
  const [loreContent, setLoreContent] = useState('');
  const [loreAuthor, setLoreAuthor] = useState('');

  const handleCreateLore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loreTitle.trim() || !loreContent.trim()) return;

    onAddLore({
      id: Math.random().toString(),
      title: loreTitle.trim(),
      author: loreAuthor.trim() || 'UNKNOWN GUARDIAN',
      content: loreContent.trim(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });

    setLoreTitle('');
    setLoreContent('');
    setLoreAuthor('');
    setShowSubmitModal(false);
    setFaithLevel(p => p + 6);
  };

  return (
    <div className="space-y-gutter pb-12 text-left relative">
      {/* Hero Header */}
      <section className="relative h-96 rounded-xl overflow-hidden border-2 border-orange-900/40 scorched-edge">
        <img 
          className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEcKxj7t_f2mrkG0ClePgQLMeCH7EAnqQhSADf3F2twdASKVLVJCehxx44JkdolHv0X_MlAXv05gYLG6cKUhsEyAr-tTvNXuSo0XB0YT1TJYanGrfwpVc6Q8NUYkOYktypG4uzirL_aoVgADyjTmDLepqUfJU_MeFbe8TQ0RjExAjve_xNZjXRhoPVzy_FUzorl5BmCkmR6Z8CczGcbCO_5I5NqsFBd6n9TqeFNGX8on6-33tfKlPMxgtdxFQKxM1sOH7NIFhO4nk"
          alt="The Chronicles of Flame banner"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="absolute bottom-8 left-8">
          <p className="font-runic text-amber-500 uppercase mb-2 tracking-widest text-xs">Sacred Archives</p>
          <h2 className="font-epilogue font-black text-2xl md:text-4xl text-slate-100">The Chronicles of Flame</h2>
        </div>
      </section>

      {/* Bento Grid Lore Sections */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mt-8">
        {/* The Great Migration */}
        <div className="col-span-12 lg:col-span-7 bg-stone-900/80 rounded-lg border border-orange-900/35 overflow-hidden shadow-2xl">
          <div className="p-8 relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_stories
              </span>
            </div>
            <h3 className="font-epilogue font-bold text-xl text-amber-500 mb-6 pb-2 border-b border-orange-950/40 uppercase">
              The Great Migration
            </h3>
            <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
              <p>When the Frost-Wurm blight consumed the Northern Peaks, our ancestors saw the stars turn to ice. The sky, once a tapestry of indigo, became a frozen shroud. We had no choice but to carry the Eternal Ember in heavy bronze censers and begin the descent.</p>
              <p className="font-serif italic text-amber-600 border-l-2 border-orange-500/40 pl-4 py-1 text-sm bg-orange-950/10">
                "Footsteps in ash, breath like steam, we sought the warmth of the living core."
              </p>
              <p>The journey spanned seven solar cycles. Thousands were lost to the biting winds, yet the fire never died. It was the glow of the Flaming Forest on the horizon that finally promised salvation—a sanctuary where the cold could never reach.</p>
            </div>
            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => {
                  setShowMapModal(true);
                  setFaithLevel(p => p + 1);
                }}
                className="hammered-bronze px-6 py-2.5 rounded-sm font-runic text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                EXPLORE MAPS
              </button>
            </div>
          </div>
        </div>

        {/* Draconic Script Card */}
        <div className="col-span-12 lg:col-span-5 bg-stone-950/80 rounded-lg border-2 border-orange-600/10 flex flex-col items-center justify-center p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-950/20 via-transparent to-transparent"></div>
          <img 
            className="w-full h-64 object-cover rounded shadow-2xl mb-6 grayscale hover:grayscale-0 transition-all duration-500" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6VyjOCJrUVXjlZiClUUEmozOR9DAZAYsig4arZb1jeElLYHg_1PfIdRK-4ARHteb3-mRCiK35O7M8lK6AwxAbws8NymVm6gTvzuJO5Or-EXdALqJENCVbr-LLKnU_7gZJJ331RSP2ksr1QB3RCaumVpdy1pBtrmyYZiUbiPEerjUxcvAwZciaRQnk6GnEycTFYB3kO2ehHjPRZNRmjynja40EF5vfEQDok-zowcWg_RKuOpaSj-3k0Y9R-M7ZMJVyfh26adxxBTU"
            alt="Original rock inscription"
            referrerPolicy="no-referrer"
          />
          <div className="text-center space-y-3">
            <h4 className="font-runic text-orange-500 text-xs font-bold uppercase tracking-wider">Original Inscription</h4>
            
            <AnimatePresence mode="wait">
              {translationActive ? (
                <motion.p 
                  key="english"
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-amber-400 font-serif italic text-sm"
                >
                  "We are the eternal flame, our spirits burn forever."
                </motion.p>
              ) : (
                <motion.p 
                  key="draconic"
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-slate-300 font-serif italic text-base font-bold"
                >
                  "Vahriis kahl-om, ignis aeternum."
                </motion.p>
              )}
            </AnimatePresence>

            <button 
              onClick={() => setTranslationActive(!translationActive)}
              className="text-[10px] font-runic text-orange-400 hover:text-orange-300 tracking-widest uppercase border border-orange-500/20 rounded px-2.5 py-1 hover:bg-orange-950/20 active:scale-95 transition-all text-center cursor-pointer mt-2 inline-block font-bold"
            >
              {translationActive ? 'VIEW ORIGINAL RUNES' : 'DECRYPT TEXT'}
            </button>
          </div>
        </div>

        {/* Legend of the Gold Dragon */}
        <div className="col-span-12 lg:col-span-5 bg-stone-900/40 rounded-lg border border-orange-900/30 overflow-hidden flex flex-col justify-between p-8">
          <div className="space-y-4">
            <h3 className="font-epilogue font-bold text-xl text-amber-500">The Legend of Aurelion</h3>
            <div className="text-slate-300 space-y-4 text-xs md:text-sm leading-relaxed">
              <p>Aurelion, the Gilded One, was not born of flesh but of the sun's first reflection upon a lake of molten gold. When the migration reached the forest edge, it was Aurelion who breathed the dragon-fire that wove the protective veil around our village.</p>
              
              <div className="space-y-1 mt-4">
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-600 to-amber-400 w-3/4 shadow-[0_0_10px_rgba(255,95,31,0.5)]"></div>
                </div>
                <div className="flex justify-between font-runic text-[9px] text-orange-500/60">
                  <span>MYTHIC LEVEL</span>
                  <span>75% TRANSCRIBED</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-orange-950/25 border border-orange-500/20 rounded">
            <p className="text-xs text-orange-300 italic">"His scales were the shields of our fathers."</p>
          </div>
        </div>

        {/* The Pact of the Flame */}
        <div className="col-span-12 lg:col-span-7 bg-stone-900/80 rounded-lg border border-orange-900/35 overflow-hidden">
          <div className="p-8 space-y-6">
            <h3 className="font-epilogue font-bold text-xl text-amber-500 pb-2 border-b border-orange-950/40 uppercase">
              The Pact of the Flame
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="text-slate-300 text-xs md:text-sm leading-relaxed">
                <p>To enter the forest, we traded the silence of the mountains for the roar of the fire. The pact requires that we maintain the Forge-Fires of Ember-Forged Village night and day.</p>
              </div>
              <div className="bg-black/40 p-4 rounded border border-orange-900/20">
                <ul className="space-y-4 font-runic text-[10px] tracking-wide text-slate-350">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-orange-500 text-sm">local_fire_department</span> 
                    NEVER EXTINGUISH THE HEARTH
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-orange-500 text-sm">shield</span> 
                    PROTECT THE WHELPING GROUNDS
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-orange-500 text-sm">auto_stories</span> 
                    RECORD THE ANCESTRAL NAMES
                  </li>
                </ul>
              </div>
            </div>
            
            <img 
              className="w-full h-40 object-cover mt-4 rounded border-2 border-orange-950 contrast-125 hover:brightness-110 transition-all duration-300" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrfzw8aEtpyFxdDGiQvXt0Tisz7v4e8ZITLZ_J0VovAPEPMar2-KshzM31xsdtffpU0NE3cLz4PzzthGpzl0CFC59VreManB7FFHzNyRoL7GnLEdWbt7xUMCyFvJBKQXV5sPbeVnlyT8uttHWPBPeQ16WBze4xXJ0IVjFS5RnRc5WwHL624liOdAp9ydmZE6roeJbdbYDCTgN72_L_Ht1M8z_qdtyYqJW06PbhDyznvmJ9IO6plBrinNe0lXwRHa-Kpru4V1i4TUg"
              alt="Golden dragon over volcano"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Submissions Card list if lores are submitted */}
      {lores.length > 0 && (
        <div className="mt-12 space-y-6">
          <h3 className="font-epilogue font-bold text-lg text-orange-500 uppercase tracking-widest pb-1 border-b border-orange-950">
            Contributed Guardian Chronicles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lores.map((lore) => (
              <div key={lore.id} className="bg-stone-900 border border-orange-500/20 p-6 rounded-lg shadow-xl relative overflow-hidden group">
                <span className="absolute top-3 right-3 text-[9px] font-runic text-slate-500 uppercase">{lore.date}</span>
                <h4 className="font-epilogue font-bold text-amber-500 text-base">{lore.title}</h4>
                <span className="text-[10px] font-runic text-slate-400 block mt-1 uppercase">TRANSMITTED BY: {lore.author}</span>
                <p className="text-slate-350 text-xs leading-relaxed mt-4 whitespace-pre-line bg-black/20 p-3 rounded border border-orange-950/30 font-serif italic">
                  "{lore.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action Contribution */}
      <section className="mt-12 p-12 bg-gradient-to-r from-orange-950/40 to-slate-900 border-2 border-orange-500/30 rounded-xl text-center relative overflow-hidden">
        <div className="absolute inset-0 dragon-scale opacity-10"></div>
        <h2 className="font-epilogue font-bold text-xl text-orange-500 mb-4 uppercase tracking-widest">Contribute to the Archives</h2>
        <p className="text-slate-300 text-xs md:text-sm mb-8 max-w-2xl mx-auto">
          Have you discovered a relic or an untold tale from the migration? Submit your findings to the Alchemist Forge for validation.
        </p>
        <button 
          onClick={() => setShowSubmitModal(true)}
          className="hammered-bronze px-10 py-4 rounded font-runic text-white font-bold tracking-widest text-xs uppercase hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer"
        >
          SUBMIT LORE KEY
        </button>
      </section>

      {/* Explore path map model dial */}
      {showMapModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-xl bg-stone-900 border border-orange-500/40 rounded-lg p-6 shadow-2xl space-y-4 text-left"
          >
            <div className="flex justify-between items-center pb-2 border-b border-orange-950">
              <h3 className="font-epilogue font-black text-lg text-amber-500 flex items-center gap-2 uppercase">
                <span className="material-symbols-outlined text-orange-500">map</span>
                The Great Migration Path Projection
              </h3>
              <button onClick={() => setShowMapModal(false)} className="text-slate-400 hover:text-slate-100 text-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <p className="text-slate-300 text-xs leading-relaxed">
              Below is the ancestral pathway projection preserved in the Sacred Archives, showing the descent through frozen lakes to the molten forest edge.
            </p>

            <div className="h-64 rounded-md border border-orange-500/30 overflow-hidden relative shadow-inner">
              <img 
                className="w-full h-full object-cover grayscale brightness-75 contrast-125" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5i5ZJ4eQNjknKVbJZyBJCWWPNfb0Az70z4rcfUUaUCzVbznYISlDcSDapDxHy2GGa9MsMwDtwv5YumnblDqajwNWz9HSO-0NGfQE9o2NwSoJqO--YRSVsx_zSyjOy3Pg7mKLXXiIfjwLVfsSFGwmWvGiyriYjVFcCpMlfXMpa6e4dO3rF3ztKv3JKrXcpDI8DRvO-IqPavKkNwa8a3V58oCR6BSuzvRCbZo-hpNEIOyVjtTj_uYYg7oteX5oiY2mvRVitqeIRgsQ"
                alt="Migration flow coordinates"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/80 px-2.5 py-1 text-[9px] text-orange-400 font-runic rounded border border-orange-500/20">
                MAP PROJECTED STATUS: UNLOCKED via Faith Lvl {faithLevel}
              </div>
            </div>

            <p className="text-slate-400 text-[10px] italic">
              * Note: Deep valley maps from Seven Cycle migration are recorded using draconic basalt runes.
            </p>
          </motion.div>
        </div>
      )}

      {/* Submit Lore Data Form Dialog */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-stone-900 border border-orange-500/40 rounded-lg p-6 shadow-2xl space-y-4"
          >
            <div className="flex justify-between items-center pb-2 border-b border-orange-950">
              <h3 className="font-epilogue font-black text-lg text-amber-500 flex items-center gap-2 uppercase">
                <span className="material-symbols-outlined text-orange-500">campaign</span>
                Draft Lore Deposit
              </h3>
              <button onClick={() => setShowSubmitModal(false)} className="text-slate-400 hover:text-slate-100 text-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateLore} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-runic text-slate-400 uppercase mb-1">Chronicle Title</label>
                <input 
                  type="text" 
                  value={loreTitle}
                  onChange={(e) => setLoreTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-stone-800 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 text-white" 
                  placeholder="e.g. The Battle of Frost Ridge"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-runic text-slate-400 uppercase mb-1">Author / Scholar</label>
                <input 
                  type="text" 
                  value={loreAuthor}
                  onChange={(e) => setLoreAuthor(e.target.value)}
                  className="w-full bg-neutral-950 border border-stone-800 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 text-white" 
                  placeholder="e.g. KRUUL FLAME-WALKER"
                />
              </div>

              <div>
                <label className="block text-[11px] font-runic text-slate-400 uppercase mb-1">Scholastic Content</label>
                <textarea 
                  rows={4}
                  value={loreContent}
                  onChange={(e) => setLoreContent(e.target.value)}
                  className="w-full bg-neutral-950 border border-stone-800 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 text-white" 
                  placeholder="Enter the secrets, findings, relics or tales discovered inside Pyre mountains..."
                  required
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full hammered-bronze py-2.5 rounded text-white font-runic text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all font-bold"
                >
                  TRANSMIT CHRONICLE
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
