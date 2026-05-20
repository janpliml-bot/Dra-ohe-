import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents
import VillageTab from './components/VillageTab';
import DiplomacyTab from './components/DiplomacyTab';
import WarRoomTab from './components/WarRoomTab';
import ShrineTab from './components/ShrineTab';
import HomeTab from './components/HomeTab';
import HistoryTab from './components/HistoryTab';

// Types
import { TabType, FieldReport, ArchiveLore } from './types';

// Default initial reports for realistic state loading
const DEFAULT_REPORTS: FieldReport[] = [
  { id: '1', time: '04:22 AM', sender: 'SCOUT 7', text: 'They moved like shadows on the water... the fire just died as they passed.' },
  { id: '2', time: '01:15 AM', sender: 'DEFENDER', text: 'Lost the West Outpost. The walls turned to brittle glass and shattered.' },
  { id: '3', time: 'YESTERDAY', sender: 'ARCHIVIST', text: 'Their frost magic is getting stronger. The obsidian traps are only slowing them.' }
];

export default function App() {
  // Global persistent states (persisted via localStorage)
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const saved = localStorage.getItem('ember_active_tab');
    return (saved as TabType) || 'village';
  });

  const [faithLevel, setFaithLevel] = useState<number>(() => {
    const saved = localStorage.getItem('ember_faith_level');
    return saved ? parseInt(saved, 10) : 42;
  });

  const [harmonyLevel, setHarmonyLevel] = useState<number>(() => {
    const saved = localStorage.getItem('ember_harmony_level');
    return saved ? parseInt(saved, 10) : 85;
  });

  const [worshippers, setWorshippers] = useState<number>(() => {
    const saved = localStorage.getItem('ember_worshippers_count');
    return saved ? parseInt(saved, 10) : 42;
  });

  const [reports, setReports] = useState<FieldReport[]>(() => {
    const saved = localStorage.getItem('ember_field_reports');
    return saved ? JSON.parse(saved) : DEFAULT_REPORTS;
  });

  const [lores, setLores] = useState<ArchiveLore[]>(() => {
    const saved = localStorage.getItem('ember_archive_lores');
    return saved ? JSON.parse(saved) : [];
  });

  const [language, setLanguage] = useState<'cs' | 'en'>('cs');

  // Side-effects to sync with localStorage
  useEffect(() => {
    localStorage.setItem('ember_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('ember_faith_level', faithLevel.toString());
  }, [faithLevel]);

  useEffect(() => {
    localStorage.setItem('ember_harmony_level', harmonyLevel.toString());
  }, [harmonyLevel]);

  useEffect(() => {
    localStorage.setItem('ember_worshippers_count', worshippers.toString());
  }, [worshippers]);

  useEffect(() => {
    localStorage.setItem('ember_field_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('ember_archive_lores', JSON.stringify(lores));
  }, [lores]);

  // Handle scout/lore updates helper functions
  const handleAddNewReport = (newRep: FieldReport) => {
    setReports(prev => [...prev, newRep]);
  };

  const handleAddNewLore = (newLore: ArchiveLore) => {
    setLores(prev => [...prev, newLore]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-all selection:bg-orange-700/40">
      
      {/* 1. STICKY PREMIUM NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-orange-950/40 px-6 py-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        
        {/* Left Side: Domain branding and avatar */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full border border-orange-500 p-0.5 bg-neutral-900 shadow-[0_0_12px_rgba(239,68,68,0.25)] select-none pointer-events-none">
            <img 
              alt="Ember Logo" 
              className="w-full h-full object-cover rounded-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB--bKRjuHl08EvaD6GrIqYj_jCZhtqt7tS2hsus16jeCTYwI6kCdxAcBPX032eeGPZ1sTqi7zv3VUk-n3G8pAatctTZnY1x8knvwe8SR5cs_KAnSeFvDVL-qCD6e8wilk32JMvoigcnmKnXmjWcy3G4VO-7Y6HGKx3ThJyREKONmH_bPpvBf2Ex57sc-4BqMYoxGQvHxXlbz6-0qd8jZc9KuJCojExObYgDISeAaZCQvPrGfglnpfZArIXqmTJZVR5zC4b8YhZhtM"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-600 rounded-full border border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
            </div>
          </div>
          <div>
            <h1 className="font-epilogue font-black text-slate-100 tracking-tight leading-none text-base uppercase">
              Ember-Forged Sanctuary
            </h1>
            <p className="font-runic text-[10px] text-orange-500 uppercase tracking-widest mt-0.5 font-bold">
              Dragonborn Tactical Console
            </p>
          </div>
        </div>

        {/* Middle/Right: Global indicators & Controls */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Faith indicator */}
          <div 
            onClick={() => setFaithLevel(p => p + 1)}
            className="flex items-center gap-3 bg-neutral-900/60 hover:bg-neutral-900 border border-orange-900/30 px-4 py-2 rounded-lg cursor-pointer transition-all active:scale-95"
            title="Click to offer prayer & increase Faith!"
          >
            <span className="material-symbols-outlined text-orange-500 animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <div className="hidden sm:block">
              <span className="block text-[8px] font-runic text-slate-500 uppercase">FAITH LEVEL</span>
              <span className="block text-xs font-bold text-slate-100 uppercase">{faithLevel} Mastery</span>
            </div>
            <div className="w-12 h-1 bg-stone-950 rounded-full overflow-hidden ml-2">
              <div 
                className="lava-flow h-full transition-all duration-300" 
                style={{ width: `${Math.min((faithLevel / 100) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Czech / English toggle */}
          <div className="flex border border-stone-800 rounded bg-stone-950 p-0.5">
            <button 
              onClick={() => setLanguage('cs')}
              className={`px-2 py-1 text-[10px] font-runic font-bold rounded transition-all cursor-pointer ${
                language === 'cs' ? 'bg-orange-600 text-stone-950' : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              CZ
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-[10px] font-runic font-bold rounded transition-all cursor-pointer ${
                language === 'en' ? 'bg-orange-600 text-stone-950' : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* 2. SUB-TABS NAVIGATION CONTROLLER */}
      <nav className="bg-slate-900/50 border-b border-orange-950/20 px-6 py-2 overflow-x-auto">
        <div className="flex space-x-1 min-w-max md:justify-center">
          <button
            onClick={() => setActiveTab('village')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded font-runic text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'village' 
                ? 'bg-orange-950/30 text-orange-400 border border-orange-500/30 shadow-[inset_0_0_10px_rgba(249,115,22,0.1)]' 
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-sm">home_app_logo</span>
            Village Overview
          </button>

          <button
            onClick={() => setActiveTab('diplomacy')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded font-runic text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'diplomacy' 
                ? 'bg-orange-950/30 text-orange-400 border border-orange-500/30 shadow-[inset_0_0_10px_rgba(249,115,22,0.1)]' 
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-sm">gargoyle</span>
            Diplomacy
          </button>

          <button
            onClick={() => setActiveTab('warroom')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded font-runic text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'warroom' 
                ? 'bg-orange-950/30 text-orange-400 border border-orange-500/30 shadow-[inset_0_0_10px_rgba(249,115,22,0.1)]' 
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-sm">security</span>
            War Council
          </button>

          <button
            onClick={() => setActiveTab('shrine')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded font-runic text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'shrine' 
                ? 'bg-orange-950/30 text-orange-400 border border-orange-500/30 shadow-[inset_0_0_10px_rgba(249,115,22,0.1)]' 
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-sm">local_fire_department</span>
            Eternal Shrine
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded font-runic text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'home' 
                ? 'bg-orange-950/30 text-orange-400 border border-orange-500/30 shadow-[inset_0_0_10px_rgba(249,115,22,0.1)]' 
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-sm">fireplace</span>
            Kruul's Hearth
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded font-runic text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'history' 
                ? 'bg-orange-950/30 text-orange-400 border border-orange-500/30 shadow-[inset_0_0_10px_rgba(249,115,22,0.1)]' 
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-sm">auto_stories</span>
            Archives
          </button>
        </div>
      </nav>

      {/* 3. DYNAMIC CONTENT VIEWER */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'village' && (
              <VillageTab 
                faithLevel={faithLevel}
                setFaithLevel={setFaithLevel}
                harmonyLevel={harmonyLevel}
                setHarmonyLevel={setHarmonyLevel}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'diplomacy' && (
              <DiplomacyTab 
                faithLevel={faithLevel}
                setFaithLevel={setFaithLevel}
                lang={language}
              />
            )}

            {activeTab === 'warroom' && (
              <WarRoomTab 
                reports={reports}
                onAddReport={handleAddNewReport}
              />
            )}

            {activeTab === 'shrine' && (
              <ShrineTab 
                faithLevel={faithLevel}
                setFaithLevel={setFaithLevel}
                worshippers={worshippers}
                setWorshippers={setWorshippers}
              />
            )}

            {activeTab === 'home' && (
              <HomeTab 
                faithLevel={faithLevel}
                setFaithLevel={setFaithLevel}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'history' && (
              <HistoryTab 
                lores={lores}
                onAddLore={handleAddNewLore}
                faithLevel={faithLevel}
                setFaithLevel={setFaithLevel}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-8 border-t border-orange-950/20 text-center">
        <p className="text-[10px] font-runic text-slate-500 uppercase tracking-widest">
          SYSTEM STACK SECURED • ANCESTRAL EMBER SUSTAINED ONLINE
        </p>
      </footer>
    </div>
  );
}
