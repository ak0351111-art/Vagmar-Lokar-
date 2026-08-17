import React, { useState, useMemo } from 'react';
import { STITCH_DEFINITIONS, STITCH_PRESETS, NEEDLE_GAUGE_TABLE } from '../data/woolData';
import { StitchType } from '../types';
import { Grid, Calculator, BookOpen, Copy, RotateCcw, Sparkles, Check, Download } from 'lucide-react';

export const StudioView: React.FC = () => {
  // 8x8 Grid state
  const [grid, setGrid] = useState<StitchType[][]>(STITCH_PRESETS[0].grid);
  const [selectedTool, setSelectedTool] = useState<StitchType>('K');
  const [copiedPattern, setCopiedPattern] = useState(false);

  // Yardage Calculator State
  const [projectWidthCm, setProjectWidthCm] = useState<number>(120);
  const [projectLengthCm, setProjectLengthCm] = useState<number>(180);
  const [selectedYarnWeight, setSelectedYarnWeight] = useState<string>('worsted');
  const [gaugeDensity, setGaugeDensity] = useState<number>(18); // sts per 10cm

  const YARN_WEIGHT_PARAMS: Record<string, { label: string; metersPer100g: number; recommendedNeedle: string }> = {
    lace: { label: 'Lace / Cobweb', metersPer100g: 800, recommendedNeedle: '2.25 mm' },
    fingering: { label: 'Fingering / 4-Ply', metersPer100g: 400, recommendedNeedle: '3.00 mm' },
    sport: { label: 'Sport / 5-Ply', metersPer100g: 300, recommendedNeedle: '3.50 mm' },
    dk: { label: 'DK / Light Worsted', metersPer100g: 220, recommendedNeedle: '4.00 mm' },
    worsted: { label: 'Worsted / Afghan', metersPer100g: 190, recommendedNeedle: '4.50 mm' },
    bulky: { label: 'Chunky / Bulky', metersPer100g: 110, recommendedNeedle: '6.00 mm' },
    ghongadi: { label: 'Deccani Ghongadi Roving', metersPer100g: 85, recommendedNeedle: '8.00 mm' }
  };

  // Cell toggle / brush
  const handleCellClick = (rowIdx: number, colIdx: number) => {
    const newGrid = grid.map((row, r) =>
      row.map((cell, c) => {
        if (r === rowIdx && c === colIdx) {
          // If already selected tool, cycle to next stitch type
          if (cell === selectedTool) {
            const types: StitchType[] = ['K', 'P', 'YO', 'CL', 'CR', 'SL'];
            const nextIdx = (types.indexOf(cell) + 1) % types.length;
            return types[nextIdx];
          }
          return selectedTool;
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  const handleApplyPreset = (presetGrid: StitchType[][]) => {
    setGrid(presetGrid);
  };

  const handleResetGrid = () => {
    setGrid(Array(8).fill(null).map(() => Array(8).fill('K')));
  };

  // Generate Written Pattern
  const writtenPattern = useMemo(() => {
    return grid.map((row, r) => {
      const rowNum = 8 - r; // Knitting typically charts bottom to top
      const rowStitches: string[] = [];
      let currentStitch = row[0];
      let count = 0;

      row.forEach(st => {
        if (st === currentStitch) {
          count++;
        } else {
          rowStitches.push(`${currentStitch}${count}`);
          currentStitch = st;
          count = 1;
        }
      });
      if (count > 0) {
        rowStitches.push(`${currentStitch}${count}`);
      }

      return `Row ${rowNum} (RS): ${rowStitches.join(', ')} [8 sts repeat]`;
    }).reverse();
  }, [grid]);

  const handleCopyPattern = () => {
    const text = `--- VAGMAR LOKAR STITCH MOTIF ---\n` + writtenPattern.join('\n');
    navigator.clipboard.writeText(text);
    setCopiedPattern(true);
    setTimeout(() => setCopiedPattern(false), 2000);
  };

  // Calculate Yardage & Skeins
  const calculatedSpecs = useMemo(() => {
    const areaSqMeters = (projectWidthCm / 100) * (projectLengthCm / 100);
    const weightInfo = YARN_WEIGHT_PARAMS[selectedYarnWeight] || YARN_WEIGHT_PARAMS.worsted;
    
    // Empirical base factor: 1 sq meter in worsted ~ 450g
    let baseGramsPerSqM = 400;
    if (selectedYarnWeight === 'lace') baseGramsPerSqM = 150;
    else if (selectedYarnWeight === 'fingering') baseGramsPerSqM = 240;
    else if (selectedYarnWeight === 'sport') baseGramsPerSqM = 310;
    else if (selectedYarnWeight === 'dk') baseGramsPerSqM = 360;
    else if (selectedYarnWeight === 'worsted') baseGramsPerSqM = 440;
    else if (selectedYarnWeight === 'bulky') baseGramsPerSqM = 600;
    else if (selectedYarnWeight === 'ghongadi') baseGramsPerSqM = 850;

    const totalWeightGrams = Math.round(areaSqMeters * baseGramsPerSqM);
    const totalMeters = Math.round((totalWeightGrams / 100) * weightInfo.metersPer100g);
    const totalYards = Math.round(totalMeters * 1.09361);
    const skeinsNeeded = Math.ceil(totalWeightGrams / 100);

    return {
      areaSqMeters: areaSqMeters.toFixed(2),
      totalWeightGrams,
      totalMeters,
      totalYards,
      skeinsNeeded,
      recommendedNeedle: weightInfo.recommendedNeedle
    };
  }, [projectWidthCm, projectLengthCm, selectedYarnWeight]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Studio Header */}
      <div className="border-b border-[#E3D3C5] pb-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-[#E6EFF5] text-[#34596F]">
              <Grid className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#3B2519] font-display">
              Textile & Stitch Studio
            </h1>
          </div>
          <p className="text-xs text-[#8C7A6D] mt-1">
            Motif Matrix Designer, Row-by-Row Notation Generator & Yardage Estimator
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleResetGrid}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-[#D9C8BA] bg-white text-xs font-semibold text-[#6F5B4E] hover:bg-[#F4ECE4] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Grid</span>
          </button>
          <button
            onClick={handleCopyPattern}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#8C3E1F] text-white text-xs font-semibold hover:bg-[#733318] transition-colors shadow-xs"
          >
            {copiedPattern ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPattern ? 'Pattern Copied!' : 'Copy Written Pattern'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Stitch Designer Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive 8x8 Canvas */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E3D3C5] shadow-xs space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg font-bold text-[#3B2519] font-display flex items-center gap-2">
              <span>8 × 8 Stitch Matrix Canvas</span>
              <span className="text-xs font-normal text-[#8C7A6D]">(Click cells to apply active tool)</span>
            </h2>

            {/* Tool Selector Palette */}
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(STITCH_DEFINITIONS) as StitchType[]).map(type => {
                const info = STITCH_DEFINITIONS[type];
                const isActive = selectedTool === type;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedTool(type)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all border ${
                      isActive
                        ? `${info.colorClass} ring-2 ring-[#8C3E1F] scale-105 shadow-xs`
                        : 'bg-[#F9F5F0] text-[#6F5B4E] border-[#E5D8CC] hover:bg-[#EDE2D6]'
                    }`}
                    title={`${info.name}: ${info.description}`}
                  >
                    {info.code} ({info.symbol})
                  </button>
                );
              })}
            </div>
          </div>

          {/* 8x8 Visual Grid Container */}
          <div className="flex flex-col items-center justify-center p-4 bg-[#FAF6F2] rounded-2xl border border-[#E8DDD3]">
            <div className="grid grid-cols-8 gap-1.5 w-full max-w-[420px] aspect-square">
              {grid.map((row, r) =>
                row.map((stitch, c) => {
                  const info = STITCH_DEFINITIONS[stitch];
                  return (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`w-full h-full rounded-lg flex flex-col items-center justify-center font-bold text-xs font-mono transition-all border hover:scale-105 active:scale-95 shadow-2xs ${info.colorClass}`}
                    >
                      <span className="text-[14px] leading-none">{info.symbol}</span>
                      <span className="text-[9px] opacity-75 leading-none mt-0.5">{info.code}</span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="mt-4 flex items-center justify-between w-full max-w-[420px] text-[11px] text-[#8C7A6D]">
              <span>Columns: 1 → 8</span>
              <span>Rows: 1 (Bottom) → 8 (Top)</span>
            </div>
          </div>

          {/* Preset Motif Templates */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F5B4E] block mb-2">
              Traditional Presets & Heritage Motifs
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STITCH_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(preset.grid)}
                  className="p-2.5 text-left rounded-xl bg-[#FAF6F2] hover:bg-[#F2E8DF] border border-[#E5D8CC] transition-all text-xs"
                >
                  <div className="font-bold text-[#3B2519] leading-tight">{preset.name.split('(')[0]}</div>
                  <div className="text-[10px] text-[#8C7A6D] mt-1 font-marathi">
                    {preset.name.includes('(') ? preset.name.split('(')[1].replace(')', '') : ''}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Stitch Legend */}
          <div className="border-t border-[#EFE5DC] pt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(Object.values(STITCH_DEFINITIONS)).map(item => (
              <div key={item.code} className="flex items-center space-x-2 text-xs">
                <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] border font-mono ${item.colorClass}`}>
                  {item.code}
                </span>
                <span className="text-[#5A4537] truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Real-time Written Pattern Instructions & Gauge Chart */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pattern Output Box */}
          <div className="bg-white p-6 rounded-3xl border border-[#E3D3C5] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFE5DC] pb-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#8C3E1F]" />
                <h3 className="text-base font-bold text-[#3B2519] font-display">Row-by-Row Written Pattern</h3>
              </div>
              <span className="text-[11px] font-semibold text-[#8C3E1F] bg-[#FDF0E6] px-2 py-0.5 rounded-full">
                8-Stitch Repeat
              </span>
            </div>

            <div className="bg-[#FAF6F2] rounded-xl p-4 border border-[#EAE0D6] max-h-64 overflow-y-auto font-mono text-xs text-[#3B2519] space-y-1.5 leading-relaxed">
              {writtenPattern.map((rowText, idx) => (
                <div key={idx} className="hover:bg-white/80 px-1 py-0.5 rounded-sm transition-colors">
                  {rowText}
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#8C7A6D]">
              * Standard knitting notation: K=Knit, P=Purl, YO=Yarn Over, CL=Cable Left, CR=Cable Right, SL=Slip. Repeat across row count.
            </p>
          </div>

          {/* International Needle & Gauge Reference */}
          <div className="bg-white p-6 rounded-3xl border border-[#E3D3C5] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#3B2519] font-display">
              International Needle & Gauge Table
            </h3>

            <div className="overflow-x-auto max-h-60 overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E3D3C5] bg-[#F7F2EB] sticky top-0">
                    <th className="p-2 font-bold text-[#4A382C]">Metric</th>
                    <th className="p-2 font-bold text-[#4A382C]">US</th>
                    <th className="p-2 font-bold text-[#4A382C]">Yarn Grade</th>
                    <th className="p-2 font-bold text-[#4A382C]">10cm Gauge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE5DC]">
                  {NEEDLE_GAUGE_TABLE.map((row, i) => (
                    <tr key={i} className="hover:bg-[#FAF6F2]">
                      <td className="p-2 font-bold text-[#8C3E1F] font-mono">{row.metricMm}</td>
                      <td className="p-2 text-[#5A4537]">{row.usSize}</td>
                      <td className="p-2 text-[#5A4537]">{row.recommendedYarnWeight}</td>
                      <td className="p-2 text-[#8C7A6D]">{row.stitchesPer10Cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Yarn Yardage & Skein Estimation Calculator Section */}
      <section className="bg-gradient-to-br from-[#FAF6F2] via-[#F6EDE4] to-[#EFE2D5] rounded-3xl p-6 sm:p-8 border border-[#E3D3C5] shadow-xs space-y-6">
        <div className="flex items-center space-x-3 border-b border-[#DECFC2] pb-4">
          <div className="p-2.5 rounded-2xl bg-[#8C3E1F] text-white shadow-xs">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#3B2519] font-display">
              Yarn Yardage & Skein Estimator
            </h2>
            <p className="text-xs text-[#8C7A6D]">
              Compute exact meters, ounces, and 100g skeins needed based on project dimensions and fiber weight
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Inputs */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A382C] mb-1.5">
                Finished Width (cm)
              </label>
              <input
                type="number"
                min="10"
                max="500"
                value={projectWidthCm}
                onChange={e => setProjectWidthCm(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D9C8BA] rounded-xl font-semibold text-[#3B2519] focus:ring-2 focus:ring-[#8C3E1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A382C] mb-1.5">
                Finished Length (cm)
              </label>
              <input
                type="number"
                min="10"
                max="500"
                value={projectLengthCm}
                onChange={e => setProjectLengthCm(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D9C8BA] rounded-xl font-semibold text-[#3B2519] focus:ring-2 focus:ring-[#8C3E1F]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#4A382C] mb-1.5">
                Wool Weight / Classification
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(YARN_WEIGHT_PARAMS).map(([key, info]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedYarnWeight(key)}
                    className={`p-2 rounded-xl text-xs font-medium border text-left transition-all ${
                      selectedYarnWeight === key
                        ? 'bg-[#8C3E1F] text-white border-[#8C3E1F] shadow-xs'
                        : 'bg-white text-[#5A4537] border-[#D9C8BA] hover:bg-[#F4ECE4]'
                    }`}
                  >
                    <div className="font-bold leading-tight">{info.label.split('/')[0]}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{info.metersPer100g}m / 100g</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-[#D9C8BA] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8C7A6D] uppercase tracking-wider">Estimated Needs</span>
              <span className="text-xs px-2 py-0.5 bg-[#EAF3EC] text-[#2C6337] font-bold rounded-full">
                {calculatedSpecs.areaSqMeters} m² Fabric
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#FAF6F2] rounded-xl border border-[#EDE2D8]">
                <span className="text-[10px] text-[#8C7A6D] font-bold uppercase block">Total Skeins</span>
                <span className="text-2xl font-bold text-[#8C3E1F] font-display">
                  {calculatedSpecs.skeinsNeeded} <span className="text-xs font-sans font-normal text-[#5A4537]">skeins (100g)</span>
                </span>
              </div>

              <div className="p-3 bg-[#FAF6F2] rounded-xl border border-[#EDE2D8]">
                <span className="text-[10px] text-[#8C7A6D] font-bold uppercase block">Total Weight</span>
                <span className="text-2xl font-bold text-[#3B2519] font-display">
                  ~{calculatedSpecs.totalWeightGrams} <span className="text-xs font-sans font-normal text-[#5A4537]">grams</span>
                </span>
              </div>
            </div>

            <div className="text-xs text-[#5A4537] space-y-1.5 border-t border-[#EFE5DC] pt-3">
              <div className="flex justify-between">
                <span>Total Length:</span>
                <span className="font-bold text-[#3B2519] font-mono">{calculatedSpecs.totalMeters} m ({calculatedSpecs.totalYards} yds)</span>
              </div>
              <div className="flex justify-between">
                <span>Recommended Needles:</span>
                <span className="font-bold text-[#8C3E1F]">{calculatedSpecs.recommendedNeedle}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
