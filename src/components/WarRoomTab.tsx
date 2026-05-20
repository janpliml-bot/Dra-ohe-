import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FieldReport } from '../types';

interface WarRoomTabProps {
  reports: FieldReport[];
  onAddReport: (report: FieldReport) => void;
}

export default function WarRoomTab({ reports, onAddReport }: WarRoomTabProps) {
  // Defensive status sliders
  const [thermalStability, setThermalStability] = useState<number>(45);
  const [frostEncroachment, setFrostEncroachment] = useState<number>(78);

  // Vulnerability states
  const [exploitedVulnerabilities, setExploitedVulnerabilities] = useState<Record<string, boolean>>({
    fire: false,
    traps: false,
    altitude: false,
    blight: false,
  });

  // Reporting state
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportSender, setReportSender] = useState('Scout ' + (reports.length + 1));
  const [reportText, setReportText] = useState('');

  const toggleVulnerability = (key: string) => {
    setExploitedVulnerabilities(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;

    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    const timeStr = new Date().toLocaleTimeString('en-US', options);

    onAddReport({
      id: Math.random().toString(),
      time: timeStr,
      sender: reportSender.toUpperCase(),
      text: reportText.trim()
    });

    setReportText('');
    setShowReportForm(false);
    // Tweak local factors dynamically!
    setThermalStability(prev => Math.min(prev + 10, 100));
    setFrostEncroachment(prev => Math.max(prev - 5, 0));
  };

  return (
    <div className="space-y-gutter pb-12">
      {/* Header Info */}
      <div className="flex items-center gap-4 mb-4 pb-2 border-b border-orange-950/40">
        <h2 className="font-epilogue font-black text-xl text-orange-500 uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-500 animate-pulse">security</span>
          WAR MANUAL: THE SURFERS
        </h2>
        <span className="ml-auto text-orange-500">
          <span className="material-symbols-outlined font-variation-FILL animate-bounce">warning</span>
        </span>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Profile Card */}
        <div className="lg:col-span-5 relative group">
          <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/20 to-orange-500/20 blur opacity-25"></div>
          <div className="relative bg-neutral-950/80 border border-orange-900/40 overflow-hidden rounded-lg dragon-scale p-1">
            <img 
              alt="Enemy Surfer" 
              className="w-full h-[500px] object-cover rounded mix-blend-lighten opacity-90 group-hover:scale-[1.02] transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbO9KnpzWnELe9h8DhaOwQ5GIhzmc4poVqVWfGxeFgOYp2bItCJFMDlwcEGUyjBEvGy_5EXTt4290byMajFxgcueNe-Bopr09HieCwJ3GVlvXh4I94nuVyGIjfFSn9wcsOdr2nZ1vIHn1inBnUwfo5_AnQuZ_nS3TE6BBjEs-NyCUf4o9zjuRN5heXqMoRU1vFfXu314n1VEXiAU2WPiGyXf-I5qjweVuVdCKmJ054rCrhkHqzX5MotO_jiwtXAH7X6mDQOPrX_Z4"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_#60a5fa]"></span>
                <span className="font-runic text-blue-400 uppercase text-[11px] tracking-widest">Class: Sub-Zero Marauder</span>
              </div>
              <h2 className="font-epilogue font-extrabold text-2xl text-white uppercase tracking-tighter">THE SURFERS</h2>
            </div>
          </div>
        </div>

        {/* Stats & Threats */}
        <div className="lg:col-span-7 space-y-8">
          {/* Threat level */}
          <div className="bg-stone-900/80 p-6 border border-red-900/30 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                skull
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-runic text-slate-400 uppercase text-xs">Threat Assessment</span>
              <div className="flex flex-wrap items-baseline gap-4 mt-2">
                <h3 className="font-epilogue font-black text-red-500 text-3xl tracking-tighter italic">EXTREME</h3>
                <div className="flex gap-1">
                  <span className="w-8 h-2 bg-red-600 rounded-full"></span>
                  <span className="w-8 h-2 bg-red-600 rounded-full"></span>
                  <span className="w-8 h-2 bg-red-600 rounded-full"></span>
                  <span className="w-8 h-2 bg-red-600 rounded-full"></span>
                  <span className="w-8 h-2 bg-neutral-800 rounded-full"></span>
                </div>
              </div>
            </div>
            <p className="text-slate-300 text-xs md:text-sm mt-4 leading-relaxed">
              These coastal invaders wield a profane fusion of oceanic currents and absolute zero temperature. They do not just invade; they extinguish the eternal embers.
            </p>
          </div>

          {/* Tactical analysis */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-px flex- grow bg-orange-950 flex-1"></div>
              <h4 className="font-runic text-orange-500 uppercase text-xs">Tactical Analysis</h4>
              <div className="h-px flex-grow bg-orange-950 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="ice-container p-6 bg-stone-900/60 rounded-r-lg border-y border-stone-850">
                <div className="flex items-center gap-2 mb-3 text-blue-400">
                  <span className="material-symbols-outlined animate-spin text-sm">ac_unit</span>
                  <h5 className="font-epilogue font-bold text-sm uppercase">Flame Quenching</h5>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  They deploy "Frost-Boards" that spray high-pressure mist, instantly lowering ambient temperatures and choking our sacred village braziers.
                </p>
              </div>

              <div className="ice-container p-6 bg-stone-900/60 rounded-r-lg border-y border-stone-850">
                <div className="flex items-center gap-2 mb-3 text-blue-400">
                  <span className="material-symbols-outlined text-sm">waves</span>
                  <h5 className="font-epilogue font-bold text-sm uppercase">Flash Freeze</h5>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Their spears inject liquid nitrogen directly into targets. Upon impact, the target's internal heat is sucked out to fuel the Surfer's speed.
                </p>
              </div>
            </div>
          </div>

          {/* Vulnerabilities (Interactive Bento) */}
          <div className="bg-neutral-900/50 p-6 rounded-lg dragon-scale border border-orange-900/20">
            <h4 className="font-epilogue font-bold text-slate-100 mb-4 flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-orange-500">local_fire_department</span>
              KNOWN WEAKNESSES (Click to deploy countermeasures)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => toggleVulnerability('fire')}
                className={`p-4 rounded flex items-center gap-4 transition-all text-left cursor-pointer ${
                  exploitedVulnerabilities.fire 
                    ? 'bg-amber-600 text-stone-950 border border-amber-400' 
                    : 'bg-neutral-950 border border-stone-800 hover:border-orange-500/45'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center">
                  <span className={`material-symbols-outlined ${exploitedVulnerabilities.fire ? 'text-black' : 'text-orange-500'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    fireplace
                  </span>
                </div>
                <div>
                  <span className="block font-runic text-xs font-bold uppercase">Pure Dragon-Fire</span>
                  <span className="text-[9px] opacity-70 block uppercase">
                    {exploitedVulnerabilities.fire ? '✓ DEPLOYED / ACTIVE' : 'Tap to dispatch'}
                  </span>
                </div>
              </button>

              <button 
                onClick={() => toggleVulnerability('traps')}
                className={`p-4 rounded flex items-center gap-4 transition-all text-left cursor-pointer ${
                  exploitedVulnerabilities.traps 
                    ? 'bg-amber-600 text-stone-950 border border-amber-400' 
                    : 'bg-neutral-950 border border-stone-800 hover:border-orange-500/45'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center">
                  <span className={`material-symbols-outlined ${exploitedVulnerabilities.traps ? 'text-black' : 'text-orange-500'}`}>
                    architecture
                  </span>
                </div>
                <div>
                  <span className="block font-runic text-xs font-bold uppercase">Obsidian Traps</span>
                  <span className="text-[9px] opacity-70 block uppercase">
                    {exploitedVulnerabilities.traps ? '✓ DEPLOYED / ACTIVE' : 'Tap to arm'}
                  </span>
                </div>
              </button>

              <button 
                onClick={() => toggleVulnerability('altitude')}
                className={`p-4 rounded flex items-center gap-4 transition-all text-left cursor-pointer ${
                  exploitedVulnerabilities.altitude 
                    ? 'bg-amber-600 text-stone-950 border border-amber-400' 
                    : 'bg-neutral-950 border border-stone-800 hover:border-orange-500/45'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center">
                  <span className={`material-symbols-outlined ${exploitedVulnerabilities.altitude ? 'text-black' : 'text-orange-500'}`}>
                    mountain_flag
                  </span>
                </div>
                <div>
                  <span className="block font-runic text-xs font-bold uppercase">Low Altitude Wards</span>
                  <span className="text-[9px] opacity-70 block uppercase">
                    {exploitedVulnerabilities.altitude ? '✓ DEPLOYED / ACTIVE' : 'Tap to trigger'}
                  </span>
                </div>
              </button>

              <button 
                onClick={() => toggleVulnerability('blight')}
                className={`p-4 rounded flex items-center gap-4 transition-all text-left cursor-pointer ${
                  exploitedVulnerabilities.blight 
                    ? 'bg-amber-600 text-stone-950 border border-amber-400' 
                    : 'bg-neutral-950 border border-stone-800 hover:border-orange-500/45'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center">
                  <span className={`material-symbols-outlined ${exploitedVulnerabilities.blight ? 'text-black' : 'text-orange-500'}`}>
                    swords
                  </span>
                </div>
                <div>
                  <span className="block font-runic text-xs font-bold uppercase">Cinder Blight</span>
                  <span className="text-[9px] opacity-70 block uppercase">
                    {exploitedVulnerabilities.blight ? '✓ DEPLOYED / ACTIVE' : 'Tap to infect'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Logs */}
      <section className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 bg-stone-900/60 rounded-lg p-6 border border-stone-850 overflow-hidden relative">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-epilogue font-bold text-slate-100 uppercase text-sm tracking-wide">Active Incursion Map</h4>
            <span className="text-[10px] font-runic bg-orange-600 px-2 py-1 rounded text-white font-bold animate-pulse">LIVE UPDATES</span>
          </div>

          <div className="h-64 w-full bg-neutral-950 rounded border border-orange-950 flex items-center justify-center relative overflow-hidden shadow-inner">
            <div 
              className="absolute inset-0 opacity-30 grayscale filter scale-105"
              style={{ 
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzTY5Ha-f_yvJJ0UoA58g8P0wm8UdDXFBqTFBoZYKNpB1NzubP3Fb-h7PZ4Zqhs4c1zmWfF5yerRyFZ0zlmCbaEDiHSWJoUxA34HG5ZcvB3V9QL1QYLCJslzj7bzRLggU2bxdVkKta8vmdYdC-TxRlAWGScWN92KW7R4DP6TqkKyh7Yt7m0DQzESaLti1cMZqiJakJeUNBcQHQB8E3FPO_ZChvruUGp_NQpqL1JLmV5iFZCCiqbJvVWMNo30owtLzsIHxW6Ds1IS0')",
                backgroundSize: 'cover'
              }}
            ></div>
            <div className="z-10 flex flex-col items-center select-none cursor-pointer">
              <span className="material-symbols-outlined text-orange-600 text-5xl animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
                location_on
              </span>
              <span className="font-runic text-white font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-xs uppercase bg-black/60 px-3 py-1 rounded border border-orange-500/30">
                COASTAL RIDGE B-4
              </span>
            </div>
          </div>

          {/* Slider controls */}
          <div className="mt-6 flex flex-col sm:flex-row gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Thermal Stability Factors</span>
                <span className="text-orange-500 font-bold">{thermalStability}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={thermalStability}
                onChange={(e) => setThermalStability(Number(e.target.value))}
                className="w-full accent-orange-500 h-1.5 bg-neutral-950 rounded-full appearance-none cursor-pointer"
              />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Frost Encroachment levels</span>
                <span className="text-blue-400 font-bold">{frostEncroachment}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={frostEncroachment}
                onChange={(e) => setFrostEncroachment(Number(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-neutral-950 rounded-full appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Latest Reports List */}
        <div className="bg-stone-900/60 rounded-lg p-6 border border-stone-850 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-epilogue font-bold text-slate-100 uppercase text-sm tracking-wide">Latest Reports</h4>
              <button 
                onClick={() => setShowReportForm(true)}
                className="text-[11px] font-runic text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">add</span> File Report
              </button>
            </div>

            <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
              {reports.slice().reverse().map((rep) => (
                <div key={rep.id} className="pb-4 border-b border-orange-950/40 last:border-0 last:pb-0">
                  <span className="text-[10px] font-runic text-orange-500 font-bold block">{rep.time} - {rep.sender}</span>
                  <p className="text-xs italic text-slate-300 mt-1">"{rep.text}"</p>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setShowReportForm(true)}
            className="w-full mt-4 hammered-bronze py-3 rounded font-runic text-white uppercase text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer"
          >
            Submit Field Report
          </button>
        </div>
      </section>

      {/* Field Report Form Dialog */}
      {showReportForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-stone-900 border border-orange-500/40 rounded-lg p-6 shadow-2xl space-y-4 text-left"
          >
            <div className="flex justify-between items-center pb-2 border-b border-orange-950">
              <h3 className="font-epilogue font-black text-lg text-amber-500 flex items-center gap-2 uppercase">
                <span className="material-symbols-outlined text-orange-500">campaign</span>
                Draft Tactical Signal
              </h3>
              <button onClick={() => setShowReportForm(false)} className="text-slate-400 hover:text-slate-100 text-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-4">
              <div>
                <label className="block text-[11px] font-runic text-slate-400 uppercase mb-1">Scout Tag / Callsign</label>
                <input 
                  type="text" 
                  value={reportSender}
                  onChange={(e) => setReportSender(e.target.value)}
                  className="w-full bg-neutral-950 border border-stone-800 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 text-white" 
                  placeholder="SCOUT ALPHA"
                />
              </div>

              <div>
                <label className="block text-[11px] font-runic text-slate-400 uppercase mb-1">Intelligence Details</label>
                <textarea 
                  rows={3}
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  className="w-full bg-neutral-950 border border-stone-800 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 text-white" 
                  placeholder="Identify enemy squads, thermal stability fluctuations or general status..."
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full hammered-bronze py-2.5 rounded text-white font-runic text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all"
                >
                  TRANSMIT TO HEARTH
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
