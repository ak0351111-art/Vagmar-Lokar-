import React, { useState } from 'react';
import { WOOL_FIBERS } from '../data/woolData';
import { WoolFiber, NavSection } from '../types';
import { ShieldCheck, Droplets, Flame, Feather, Sparkles, SlidersHorizontal, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface HeritageViewProps {
  onNavigateToStudio: () => void;
  onNavigateToLocker: () => void;
}

export const HeritageView: React.FC<HeritageViewProps> = ({ onNavigateToStudio, onNavigateToLocker }) => {
  const [selectedFiber, setSelectedFiber] = useState<WoolFiber>(WOOL_FIBERS[0]);
  const [filterCommunity, setFilterCommunity] = useState<string>('all');
  const [compareFiberId, setCompareFiberId] = useState<string | null>(null);

  const filteredFibers = WOOL_FIBERS.filter(f => {
    if (filterCommunity === 'all') return true;
    if (filterCommunity === 'deccan') return f.id.includes('ghongadi');
    if (filterCommunity === 'himalayan') return f.id.includes('pashmina') || f.id.includes('yak');
    if (filterCommunity === 'desert') return f.id.includes('marwari');
    if (filterCommunity === 'hills') return f.id.includes('nilgiri');
    return true;
  });

  const compareFiber = WOOL_FIBERS.find(f => f.id === compareFiberId);

  const renderStars = (score: number, max = 5) => {
    return (
      <div className="flex space-x-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              i < score ? 'bg-[#8C3E1F]' : 'bg-[#E5D5C8]'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4A2818] via-[#633621] to-[#361B0F] text-white p-8 sm:p-10 shadow-lg border border-[#80462D]/40">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium text-[#FCE6D8]">
            <Sparkles className="w-3.5 h-3.5 text-[#E6A074]" />
            <span>Living Woolcraft & Nomadic Wisdom</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF3ED] font-display">
            The Pastoral Fiber Compendium
          </h1>

          <p className="text-sm sm:text-base text-[#DFCEC1] leading-relaxed">
            From the water-repellent, lanolin-dense fleece of the Deccan Plateau to the microscopic 12-micron warmth of Ladakh’s Changpa high-altitude nomads. Explore physical grades, micron ratings, natural mordants, and traditional weaving heritages.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onNavigateToStudio}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#E08A56] hover:bg-[#D47A43] text-[#291206] font-semibold text-xs transition-colors shadow-xs"
            >
              <span>Launch Stitch Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToLocker}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#FCE6D8]" />
              <span>Open Vault & Recipes</span>
            </button>
          </div>
        </div>

        {/* Decorative Graphic Element */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
          <svg width="400" height="400" viewBox="0 0 200 200" fill="currentColor">
            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="6" fill="none" />
            <path d="M50 100 Q100 20 150 100 T250 100" stroke="white" strokeWidth="6" fill="none" />
            <path d="M50 120 Q100 40 150 120 T250 120" stroke="white" strokeWidth="6" fill="none" />
          </svg>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E3D3C5] pb-4">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-[#8C3E1F]" />
          <h2 className="text-xl font-bold text-[#3B2519] font-display">Indigenous Wool Varieties</h2>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
          {[
            { id: 'all', label: 'All Heritage Wools' },
            { id: 'deccan', label: 'Deccan & Ghongadi' },
            { id: 'himalayan', label: 'Himalayan & Pashmina' },
            { id: 'desert', label: 'Thar & Desi' },
            { id: 'hills', label: 'Western Ghats' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCommunity(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterCommunity === tab.id
                  ? 'bg-[#8C3E1F] text-white shadow-xs'
                  : 'bg-white text-[#6F5B4E] border border-[#E3D3C5] hover:bg-[#F2E8DF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Fiber Cards & Detail Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Fiber Selection Cards */}
        <div className="lg:col-span-5 space-y-4">
          {filteredFibers.map(fiber => {
            const isSelected = selectedFiber.id === fiber.id;
            return (
              <div
                key={fiber.id}
                onClick={() => setSelectedFiber(fiber)}
                className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                  isSelected
                    ? 'bg-white border-[#8C3E1F] shadow-md ring-2 ring-[#8C3E1F]/15 translate-x-1'
                    : 'bg-[#FCFAF8] border-[#E8DDD3] hover:border-[#D5C2B2] hover:bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F4ECE4] text-[#78391F] mb-1.5">
                      {fiber.badge}
                    </span>
                    <h3 className="text-base font-bold text-[#3B2519] font-display">{fiber.name}</h3>
                    <p className="text-xs text-[#8C7A6D] font-marathi">{fiber.marathiName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#8C3E1F] bg-[#FDF0E6] px-2 py-1 rounded-md border border-[#F3DAC8]">
                      {fiber.micronCount}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-[#6F5B4E] border-t border-[#F0E5DB] pt-3">
                  <span>{fiber.origin.split('(')[0]}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-[#A69385]">{fiber.grade.split(' ')[0]} Grade</span>
                    <span className="text-[#8C3E1F] font-bold">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: In-Depth Fiber Dossier & Characteristics */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D3C5] shadow-xs space-y-6">
          <div className="border-b border-[#EFE5DC] pb-5">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8C3E1F]/10 text-[#8C3E1F]">
                {selectedFiber.badge}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCompareFiberId(compareFiberId === selectedFiber.id ? null : selectedFiber.id)}
                  className={`text-xs px-3 py-1 rounded-lg border font-semibold transition-colors ${
                    compareFiberId === selectedFiber.id
                      ? 'bg-[#2C6337] text-white border-[#2C6337]'
                      : 'bg-[#F4ECE4] text-[#5A4537] border-[#D9C8BA] hover:bg-[#EAE0D6]'
                  }`}
                >
                  {compareFiberId === selectedFiber.id ? '✓ Pin in Matrix' : '+ Pin to Compare'}
                </button>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#3B2519] font-display">
              {selectedFiber.name}
            </h2>
            <div className="text-sm font-marathi text-[#8C3E1F] font-semibold mt-0.5">
              {selectedFiber.marathiName} • {selectedFiber.pastoralCommunity}
            </div>
            <p className="text-xs text-[#8C7A6D] mt-1">{selectedFiber.origin}</p>
          </div>

          {/* Physical Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#FAF6F2] rounded-xl border border-[#EDE2D8]">
              <span className="text-[10px] uppercase tracking-wider text-[#8C7A6D] font-bold block">Micron Range</span>
              <span className="text-sm font-bold text-[#8C3E1F] font-mono">{selectedFiber.micronCount}</span>
            </div>
            <div className="p-3 bg-[#FAF6F2] rounded-xl border border-[#EDE2D8]">
              <span className="text-[10px] uppercase tracking-wider text-[#8C7A6D] font-bold block">Staple Length</span>
              <span className="text-sm font-bold text-[#3B2519]">{selectedFiber.stapleLength}</span>
            </div>
            <div className="p-3 bg-[#FAF6F2] rounded-xl border border-[#EDE2D8]">
              <span className="text-[10px] uppercase tracking-wider text-[#8C7A6D] font-bold block">Lanolin Wax</span>
              <span className="text-xs font-semibold text-[#3B2519]">{selectedFiber.lanolinContent.split('(')[0]}</span>
            </div>
            <div className="p-3 bg-[#FAF6F2] rounded-xl border border-[#EDE2D8]">
              <span className="text-[10px] uppercase tracking-wider text-[#8C7A6D] font-bold block">Recommended Tool</span>
              <span className="text-xs font-semibold text-[#8C3E1F]">{selectedFiber.bestNeedleSizes.split('(')[0]}</span>
            </div>
          </div>

          {/* Qualitative Radar/Score Bars */}
          <div className="bg-[#FAF6F2] p-5 rounded-2xl border border-[#EAE0D6] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6F5B4E]">Performance Properties</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#5A4537] flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-[#5B7E98]" /> Water Repellency
                </span>
                {renderStars(selectedFiber.waterRepellency)}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#5A4537] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#D16538]" /> Thermal Warmth
                </span>
                {renderStars(selectedFiber.thermalWarmth)}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#5A4537] flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-[#8C6D58]" /> Softness (Next-to-skin)
                </span>
                {renderStars(selectedFiber.softnessScore)}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#5A4537] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4E7358]" /> Tensile Durability
                </span>
                {renderStars(selectedFiber.durabilityScore)}
              </div>
            </div>
          </div>

          {/* Regional Heritage Narrative */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6F5B4E] mb-2">Pastoral History & Grazing</h4>
            <p className="text-sm text-[#4A382C] leading-relaxed bg-[#FFFDFB] p-4 rounded-xl border border-[#EFE7E0]">
              {selectedFiber.regionDescription}
            </p>
          </div>

          {/* Traditional Uses & Dye Affinities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F8F4EE] rounded-xl border border-[#E9DFD4]">
              <h5 className="text-xs font-bold text-[#3B2519] mb-2 flex items-center gap-1.5">
                <span>Traditional Pastoral Applications</span>
              </h5>
              <ul className="text-xs text-[#5A4537] space-y-1.5 list-disc list-inside">
                {selectedFiber.traditionalUses.map((use, i) => (
                  <li key={i}>{use}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-[#F8F4EE] rounded-xl border border-[#E9DFD4]">
              <h5 className="text-xs font-bold text-[#3B2519] mb-2 flex items-center gap-1.5">
                <span>Natural Botanical Mordants & Dyes</span>
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {selectedFiber.primaryDyeAffinities.map((dye, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 bg-white rounded-md border border-[#DDD0C2] text-[#6F5B4E]">
                    {dye}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Washing and Maintenance Tip */}
          <div className="p-4 rounded-xl bg-[#EAF3EC] border border-[#C5DEC9] text-xs text-[#204928] space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <span>Pastoral Maintenance & Washing Protocol</span>
            </div>
            <p>{selectedFiber.careInstructions}</p>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix (If pinned) */}
      {compareFiber && compareFiber.id !== selectedFiber.id && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#8C3E1F]/30 shadow-md">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#EFE5DC]">
            <div>
              <h3 className="text-xl font-bold text-[#3B2519] font-display">Side-by-Side Fiber Matrix</h3>
              <p className="text-xs text-[#8C7A6D]">Direct structural comparison of selected pastoral fibers</p>
            </div>
            <button
              onClick={() => setCompareFiberId(null)}
              className="text-xs text-red-700 hover:underline font-semibold"
            >
              Clear Comparison
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E3D3C5] bg-[#F7F2EB]">
                  <th className="p-3 font-bold text-[#4A382C]">Feature</th>
                  <th className="p-3 font-bold text-[#8C3E1F]">{selectedFiber.name}</th>
                  <th className="p-3 font-bold text-[#2C6337]">{compareFiber.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE5DC]">
                <tr>
                  <td className="p-3 font-medium text-[#7A6658]">Micron Fineness</td>
                  <td className="p-3 font-mono font-bold text-[#8C3E1F]">{selectedFiber.micronCount}</td>
                  <td className="p-3 font-mono font-bold text-[#2C6337]">{compareFiber.micronCount}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-[#7A6658]">Staple Length</td>
                  <td className="p-3">{selectedFiber.stapleLength}</td>
                  <td className="p-3">{compareFiber.stapleLength}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-[#7A6658]">Water Repellency</td>
                  <td className="p-3">{renderStars(selectedFiber.waterRepellency)}</td>
                  <td className="p-3">{renderStars(compareFiber.waterRepellency)}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-[#7A6658]">Thermal Barrier</td>
                  <td className="p-3">{renderStars(selectedFiber.thermalWarmth)}</td>
                  <td className="p-3">{renderStars(compareFiber.thermalWarmth)}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-[#7A6658]">Pastoral Heritage</td>
                  <td className="p-3">{selectedFiber.pastoralCommunity}</td>
                  <td className="p-3">{compareFiber.pastoralCommunity}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};
