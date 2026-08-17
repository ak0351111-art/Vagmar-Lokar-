import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { ActiveProject } from '../types';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: ActiveProject) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [craftType, setCraftType] = useState<ActiveProject['craftType']>('Knitting');
  const [targetRows, setTargetRows] = useState('180');
  const [yarnUsed, setYarnUsed] = useState('Deccani 100% Raw Wool (DK weight)');
  const [needleHook, setNeedleHook] = useState('5.0 mm Needles');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const total = parseInt(targetRows, 10) || 100;
    const newProj: ActiveProject = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      craftType,
      targetRows: total,
      currentRows: 0,
      yarnUsed: yarnUsed.trim() || 'Undyed Wool',
      needleHook: needleHook.trim() || 'Standard Needles',
      notes: notes.trim(),
      progressPercent: 0,
      isCompleted: false
    };

    onSave(newProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF6F2] border border-[#E0D2C5] rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-[#E8DDD3] pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-[#EAF3EC] text-[#2C6337]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#3B2519] font-display">New Woolcraft Project</h3>
              <p className="text-xs text-[#8C7A6D]">Set target rows, gauge, and yarn specs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8C7A6D] hover:bg-[#EFE4D8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#4A382C] mb-1">Project Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Traditional Pastoral Ghongadi Shawl"
              className="w-full px-3 py-2 text-sm bg-white border border-[#D9C8BA] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#8C3E1F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A382C] mb-1">Craft Modality</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Knitting', 'Crochet', 'Pit Loom / Handloom', 'Felting'] as const).map(type => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setCraftType(type)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                    craftType === type
                      ? 'bg-[#2C6337] text-white border-[#2C6337] shadow-xs'
                      : 'bg-white text-[#6F5B4E] border-[#D9C8BA] hover:bg-[#F4ECE4]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#4A382C] mb-1">Target Rows / Repeats</label>
              <input
                type="number"
                min="1"
                required
                value={targetRows}
                onChange={e => setTargetRows(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D9C8BA] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#8C3E1F]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A382C] mb-1">Needle / Hook Size</label>
              <input
                type="text"
                value={needleHook}
                onChange={e => setNeedleHook(e.target.value)}
                placeholder="e.g. 5.5 mm"
                className="w-full px-3 py-2 text-sm bg-white border border-[#D9C8BA] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#8C3E1F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A382C] mb-1">Yarn / Fiber Details</label>
            <input
              type="text"
              value={yarnUsed}
              onChange={e => setYarnUsed(e.target.value)}
              placeholder="e.g. 100% Deccani 2-ply Handspun"
              className="w-full px-3 py-2 text-sm bg-white border border-[#D9C8BA] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#8C3E1F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A382C] mb-1">Initial Milestone / Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Cast on 120 sts with seed stitch border..."
              className="w-full px-3 py-2 text-sm bg-white border border-[#D9C8BA] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#8C3E1F]"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#6F5B4E] hover:bg-[#EFE4D8] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#2C6337] hover:bg-[#204928] rounded-xl shadow-xs transition-colors"
            >
              Start Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
