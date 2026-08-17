import React, { useState } from 'react';
import { ActiveProject } from '../types';
import { Plus, CheckSquare, Minus, Trash2, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface TrackerViewProps {
  projects: ActiveProject[];
  onIncrementRow: (id: string) => void;
  onDecrementRow: (id: string) => void;
  onDeleteProject: (id: string) => void;
  onOpenAddModal: () => void;
}

export const TrackerView: React.FC<TrackerViewProps> = ({
  projects,
  onIncrementRow,
  onDecrementRow,
  onDeleteProject,
  onOpenAddModal
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredProjects = projects.filter(p => {
    if (filter === 'active') return !p.isCompleted;
    if (filter === 'completed') return p.isCompleted;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E3D3C5] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-[#EAF3EC] text-[#2C6337]">
              <CheckSquare className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#3B2519] font-display">
              Active Project & Row Tracker
            </h1>
          </div>
          <p className="text-xs text-[#8C7A6D] mt-1 font-marathi">
            विणकाम प्रगती, पंक्ती मोजणी आणि लोकर प्रकल्प व्यवस्थापक
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenAddModal}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#2C6337] text-white text-xs font-semibold hover:bg-[#204928] transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Craft Project</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2">
        {(['all', 'active', 'completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
              filter === tab
                ? 'bg-[#2C6337] text-white shadow-xs'
                : 'bg-white text-[#6F5B4E] border border-[#E3D3C5] hover:bg-[#F2E8DF]'
            }`}
          >
            {tab === 'all' ? 'All Projects' : tab}
          </button>
        ))}
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E3D3C5] space-y-3">
          <Sparkles className="w-10 h-10 text-[#C8B3A4] mx-auto" />
          <h3 className="text-base font-bold text-[#3B2519]">No craft projects in this view</h3>
          <p className="text-xs text-[#8C7A6D]">Click "New Craft Project" to set up target rows and track row-by-row progress.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="bg-white rounded-3xl p-6 border border-[#E3D3C5] shadow-xs space-y-5 flex flex-col justify-between hover:border-[#C5B0A0] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF2EB] text-[#8C3E1F] border border-[#EED7C8]">
                        {project.craftType}
                      </span>
                      {project.isCompleted && (
                        <span className="flex items-center space-x-1 text-[11px] font-bold text-[#2C6337] bg-[#EAF3EC] px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Finished</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-[#3B2519] font-display mt-1.5">
                      {project.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => onDeleteProject(project.id)}
                    className="p-1.5 rounded-lg text-[#A69385] hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Row Counter Controller Box */}
                <div className="p-4 bg-[#FAF6F2] rounded-2xl border border-[#EDE2D8] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8C7A6D] tracking-wider block">
                      Row Counter (ओळ मोजणी)
                    </span>
                    <div className="text-2xl font-bold text-[#3B2519] font-display mt-0.5">
                      Row {project.currentRows} <span className="text-xs font-sans text-[#7A6658]">/ {project.targetRows}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onDecrementRow(project.id)}
                      disabled={project.currentRows <= 0}
                      className="w-10 h-10 rounded-xl bg-white border border-[#D9C8BA] hover:bg-[#F4ECE4] active:bg-[#EAE0D6] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-[#3B2519] font-bold shadow-2xs transition-colors"
                      title="Minus 1 Row"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onIncrementRow(project.id)}
                      className="px-4 h-10 rounded-xl bg-[#2C6337] hover:bg-[#204928] active:bg-[#18381E] text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-colors"
                      title="Plus 1 Row"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+1 Row</span>
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-[#5A4537]">
                    <span>{(project.progressPercent * 100).toFixed(0)}% Completed</span>
                    <span>{Math.max(0, project.targetRows - project.currentRows)} rows remaining</span>
                  </div>
                  <div className="w-full bg-[#EDE2D8] h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        project.isCompleted ? 'bg-[#2C6337]' : 'bg-[#8C3E1F]'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(0, project.progressPercent * 100))}%` }}
                    />
                  </div>
                </div>

                {/* Specs Info */}
                <div className="grid grid-cols-2 gap-2 text-xs text-[#5A4537] bg-white p-3 rounded-xl border border-[#F0E5DB]">
                  <div>
                    <span className="text-[#8C7A6D] block text-[10px]">Fiber / Yarn:</span>
                    <span className="font-semibold">{project.yarnUsed}</span>
                  </div>
                  <div>
                    <span className="text-[#8C7A6D] block text-[10px]">Needles / Hook:</span>
                    <span className="font-semibold">{project.needleHook}</span>
                  </div>
                </div>

                {project.notes && (
                  <p className="text-xs text-[#7A6658] bg-[#FDFBF9] p-3 rounded-xl border border-[#EFE7E0] italic">
                    "{project.notes}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
