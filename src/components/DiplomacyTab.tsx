import React, { useState } from 'react';
import { motion } from 'motion/react';

interface DiplomacyTabProps {
  faithLevel: number;
  setFaithLevel: (val: number | ((prev: number) => number)) => void;
  lang: 'cs' | 'en';
}

export default function DiplomacyTab({ faithLevel, setFaithLevel, lang }: DiplomacyTabProps) {
  const [signalActive, setSignalActive] = useState(false);
  const [coalitionLevel, setCoalitionLevel] = useState(65);
  const [selectedPatrolSec, setSelectedPatrolSec] = useState<'alpha' | 'beta'>('alpha');

  const handleSendSignal = () => {
    setSignalActive(true);
    setCoalitionLevel(prev => Math.min(prev + 10, 100));
    setFaithLevel(p => p + 5);
    setTimeout(() => {
      setSignalActive(false);
    }, 4500);
  };

  // Translations
  const t = {
    cs: {
      missionBadge: "MISIA: SPOJENECTVÍ",
      missionTitle: "Spasitelé z Výšin: Aliance s Chrliči",
      clanTitle: "Klan Kamenného Křídla",
      clanDesc: "V nejvyšších patrech našich sopečných vrcholů, tam kde se kouř setkává s mrazem z okolních plání, sídlí strážci horní klenby. Klan Kamenného Křídla nejsou jen bytosti z oživlého bazaltu; jsou to oči našeho království, které nikdy nespí.",
      supervision: "Dohled",
      supervisionDesc: "360° perimetr kolem vesnice.",
      defenseLabel: "Obrana",
      defenseDesc: "Kamenná kůže odolná mrazu.",
      aerialPatrol: "Letecká Hlídka",
      patrolDesc: "Když se ze severu přivalí ledové mlhy Surfařů, my dole v údolí jsme slepí. Chrliči krouží nad mraky a jejich runové oči protnou i tu nejhustší inverzi. Každé zachvění chladu hlásí ohnivými signály.",
      bullet1: "Detekce mrazivých anomálií",
      bullet2: "Rychlé varování vesnice",
      pactTitle: "Pakt Věčného Ohně",
      card1Title: "Teplo",
      card1Desc: "Dragonborn dodávají magmatické esence do chrličích hnízd.",
      card2Title: "Flexibilita",
      card2Desc: "Magma udržuje jejich kamenné klouby tekuté a připravené k letu.",
      card3Title: "Věrnost",
      card3Desc: "Výměnou za teplo získáváme věčnou ochranu shora.",
      ctaTitle: "V hloubi noci, ve stínu křídel.",
      ctaDesc: "V případě blížícího se mrazu aktivuj signální výheň. Chrliči sestoupí z výšin okamžitě.",
      ctaBtn: "Vyslat Signál",
      signalSent: "SIGNÁL VYSILÁN! Chrliči se stahují na ochranu sektoru...",
    },
    en: {
      missionBadge: "MISSION: ALLIANCE",
      missionTitle: "Saviors from Heights: Gargoyle Alliance",
      clanTitle: "Clan of the Stone Wing",
      clanDesc: "On the highest peaks of our volcanic volcanoes, where the smoke meets the frost from surrounding plains, dwell the guardians of the high vault. The Clan of the Stone Wing are not merely beings of living basalt; they are the eyes of our kingdom that never sleep.",
      supervision: "Supervision",
      supervisionDesc: "360° perimeter around the village.",
      defenseLabel: "Defense",
      defenseDesc: "Frost-proof stone skin.",
      aerialPatrol: "Aerial Patrol",
      patrolDesc: "When frozen mists of the Surfers roll in from the north, we in the valley are blind. Gargoyles circle above the clouds, writing warning signs with eternal fire to cut through the inversion.",
      bullet1: "Detection of freezing anomalies",
      bullet2: "Instant village alerts",
      pactTitle: "Pact of Eternal Fire",
      card1Title: "Warmth",
      card1Desc: "Dragonborn supply magmatic essences to the gargoyle nests.",
      card2Title: "Flexibility",
      card2Desc: "Magma ensures stone joints remain fluid and ready to fly.",
      card3Title: "Loyalty",
      card3Desc: "In exchange for heat, we receive eternal protection from above.",
      ctaTitle: "In deep night, under the shadow of wings.",
      ctaDesc: "In case of approaching freeze, activate the signal forge. The gargoyles will descend instantly.",
      ctaBtn: "Send Signal",
      signalSent: "SIGNAL DISPATCHED! Gargoyles are descending to secure the coordinates...",
    }
  }[lang];

  return (
    <div className="space-y-gutter relative pb-12">
      {/* Alert Banner if signal dispatched */}
      {signalActive && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-xl">
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-amber-500 border border-amber-600 text-stone-950 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 border-l-8 border-orange-700"
          >
            <span className="material-symbols-outlined text-3xl animate-bounce">flare</span>
            <div>
              <p className="font-runic font-bold uppercase tracking-wider text-sm">{t.signalSent}</p>
              <p className="text-xs opacity-90">Ember Resonance: +10% Coalition Power</p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative w-full h-[530px] flex items-end overflow-hidden rounded-xl border border-orange-950/40">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
        <img
          alt="Stone Gargoyle"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 transform hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoYgB6id_aU-Dm3GeZAhiHks0p41U5YV_XHU4ePp78_qKQGL525L1fFK4EIxd5gDDmU3ldNPKsRjUBqWl9TIYYqfPT-KoLdAbgLwWx2Ci4k5R6BIy8DnWgCK9NXpDyVmOg8UiuhE-JDozoWNdud6hTayuoY16XBoBEzYVeXaOMwEoi4DgTLRJlhWBXLRLJfkvPTrD5ouGzrpNRFSCyNH5il7IbVgSbtuEmZvLmmv33j7cMaV1bZvKsYrQqtZ1JTaTtGbyjxZQwL_Y"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-20 px-6 md:px-margin pb-8">
          <div className="inline-block px-3 py-1 mb-4 bg-orange-600/20 border border-orange-500/40 rounded text-orange-400 font-runic text-xs">
            {t.missionBadge}
          </div>
          <h2 className="font-epilogue font-black text-3xl md:text-5xl text-white uppercase italic tracking-tighter leading-tight drop-shadow-2xl">
            {t.missionTitle.split(': ')[0]}: <br />
            <span className="text-orange-500">{t.missionTitle.split(': ')[1] || ''}</span>
          </h2>
        </div>
      </section>

      {/* Clan of the Stone Wing */}
      <section className="px-6 md:px-margin py-12 dragon-scale bg-neutral-900/40 border-y border-stone-800/60 rounded-xl">
        <div className="max-w-container-max mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-orange-500/50"></span>
            <h3 className="font-epilogue font-bold text-2xl text-slate-100 uppercase">{t.clanTitle}</h3>
          </div>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 max-w-4xl">
            {t.clanDesc}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <div className="p-4 bg-neutral-950 border border-stone-800/80 rounded-lg shadow-inner flex items-start gap-4">
              <span className="material-symbols-outlined text-orange-500 mt-1">visibility</span>
              <div>
                <h4 className="font-runic font-bold text-slate-200 uppercase text-xs tracking-wide">{t.supervision}</h4>
                <p className="text-xs text-slate-500 mt-1">{t.supervisionDesc}</p>
              </div>
            </div>
            <div className="p-4 bg-neutral-950 border border-stone-800/80 rounded-lg shadow-inner flex items-start gap-4">
              <span className="material-symbols-outlined text-orange-500 mt-1">shield</span>
              <div>
                <h4 className="font-runic font-bold text-slate-200 uppercase text-xs tracking-wide">{t.defenseLabel}</h4>
                <p className="text-xs text-slate-500 mt-1">{t.defenseDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aerial Patrol interactive check */}
      <section className="px-6 md:px-margin py-12">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg blur opacity-25 group-hover:opacity-45 transition duration-1000"></div>
            <div className="relative bg-neutral-900 rounded-lg overflow-hidden border border-stone-800">
              <img
                alt="Aerial Patrol View"
                className="w-full aspect-video object-cover opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIkVNEgcUPy0AffFC-r8Npp3TUi6B_rro0lQFpQ-8p7Neo53n9QYhTZ5Ilx0L1msybf9XBrMLlxyMPu0x8eZ9jFEyudruX0gG5lg541ySW948lkjvk8ew-r5LTqn0SVgGy1XFzjNi2HNMViFAOPx4RlsrLQmQHBfbWL5VMGXko480-CwiDUkzoD62d2IcYceAYJT70A_Q3D-BkItQnnTH5OWnGk27I9wUxQw4oFfH3unqbRIl7bWUOWnlnK0YssiIaBmAlJPFiL3c"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-neutral-950/85 px-3 py-1 rounded text-[11px] font-runic text-orange-500 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                LIVE PATROL STATUS: ON SCHEDULE
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-4">
            <h3 className="font-epilogue font-bold text-2xl text-white">{t.aerialPatrol}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t.patrolDesc}
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-orange-400 text-sm font-medium">
                <span className="material-symbols-outlined text-[18px]">verified</span> 
                {t.bullet1}
              </li>
              <li className="flex items-center gap-3 text-orange-400 text-sm font-medium">
                <span className="material-symbols-outlined text-[18px]">verified</span> 
                {t.bullet2}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pact of Eternal Fire */}
      <section className="px-6 md:px-margin py-16 bg-neutral-900/20 rounded-xl relative overflow-hidden border border-orange-950/20">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-stone-800 to-transparent"></div>
        <div className="max-w-container-max mx-auto text-center space-y-8">
          <h3 className="font-epilogue font-bold text-2xl text-amber-500 uppercase tracking-widest">{t.pactTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="flex flex-col items-center text-center p-6 bg-neutral-950 border-b-2 border-orange-500/20 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-orange-950/30 flex items-center justify-center border border-orange-900/50 mb-4 shadow-[0_0_12px_rgba(249,115,22,0.15)]">
                <span className="material-symbols-outlined text-3xl text-orange-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
              </div>
              <h4 className="font-epilogue font-bold text-slate-100 mb-2">{t.card1Title}</h4>
              <p className="text-xs text-slate-400 max-w-xs">{t.card1Desc}</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-neutral-950 border-b-2 border-orange-500/20 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-orange-950/30 flex items-center justify-center border border-orange-900/50 mb-4 shadow-[0_0_12px_rgba(249,115,22,0.15)]">
                <span className="material-symbols-outlined text-3xl text-orange-500">fitness_center</span>
              </div>
              <h4 className="font-epilogue font-bold text-slate-100 mb-2">{t.card2Title}</h4>
              <p className="text-xs text-slate-400 max-w-xs">{t.card2Desc}</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-neutral-950 border-b-2 border-orange-500/20 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-orange-950/30 flex items-center justify-center border border-orange-900/50 mb-4 shadow-[0_0_12px_rgba(249,115,22,0.15)]">
                <span className="material-symbols-outlined text-3xl text-orange-500">handshake</span>
              </div>
              <h4 className="font-epilogue font-bold text-slate-100 mb-2">{t.card3Title}</h4>
              <p className="text-xs text-slate-400 max-w-xs">{t.card3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-margin py-16 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-24 h-1 bg-orange-600/30 mb-4"></div>
        <h3 className="font-epilogue font-bold text-2xl text-white">{t.ctaTitle}</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          {t.ctaDesc}
        </p>

        {/* Coalition meter representation */}
        <div className="w-full max-w-sm bg-neutral-900 border border-stone-800 p-4 rounded-lg flex items-center justify-between text-left">
          <div>
            <span className="text-[10px] font-runic text-slate-500 block uppercase">COALITION RESONANCE</span>
            <span className="font-epilogue font-bold text-orange-400 text-sm">{coalitionLevel}% Strength</span>
          </div>
          <div className="w-32 h-1 bg-mineral-800 rounded-full overflow-hidden">
            <div className="lava-flow h-full" style={{ width: `${coalitionLevel}%` }}></div>
          </div>
        </div>

        <button
          onClick={handleSendSignal}
          className="hammered-bronze px-10 py-4 rounded-lg border border-orange-500 flex items-center gap-4 transition-all duration-300 active:scale-95 group cursor-pointer"
        >
          <span className="font-epilogue font-bold text-white uppercase tracking-widest text-sm">{t.ctaBtn}</span>
          <span className="material-symbols-outlined text-white group-hover:translate-x-1 transition-transform animate-pulse">
            flare
          </span>
        </button>
      </section>
    </div>
  );
}
