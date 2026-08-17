import React, { useState } from 'react';
import { X, Lock, Plus, Tag } from 'lucide-react';
import { LockerCategory, LockerItem } from '../types';

interface AddLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: LockerItem) => void;
}

export const AddLockerModal: React.FC<AddLockerModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<LockerCategory>('stash');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [yarnBrand, setYarnBrand] = useState('');
  const [colorway, setColorway] = useState('');
  const [quantitySkeins, setQuantitySkeins] = useState('');
  const [needleSize, setNeedleSize] = useState('');
  const [isLockedWithPin, setIsLockedWithPin] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newItem: LockerItem = {
      id: `item-${Date.now()}`,
      title: title.trim(),
      category,
      content: content.trim() || 'No additional details provided.',
      tags: tags.length > 0 ? tags : ['Artisanal'],
      yarnBrand: yarnBrand.trim() || undefined,
      colorway: colorway.trim() || undefined,
      quantitySkeins: quantitySkeins ? parseInt(quantitySkeins, 10) : undefined,
      needleSize: needleSize.trim() || undefined,
      isLockedWithPin,
      isFavorite: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onSave(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF6F2] border border-[#E0D2C5] rounded-2xl w-full max-w-lg p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#E8DDD3] pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-[#F2E5DA] text-[#8C3E1F]">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#3B2519] font-display">Add to Vagmar Locker</h3>
              <p className="text-xs text-[#8C7A6D]">Securely catalog stash, dye formulas, or pattern archives</p>
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
            <label className="block text-xs font-semibold text-[#4A382C] mb-1">Entry Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Kolhapur Indigo Ferment Batch #4"
              className="w-full px-3 py-2 text-sm bg-white border border-[#D9C8BA] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#8C3E1F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A382C] mb-1">Category</label>
            <div className="grid grid-cols-3 gap-2">
              {(['stash', 'formulas', 'patterns', 'logs', 'certificates'] as LockerCategory[]).map(cat => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium capitalize border transition-all ${
                    category === cat
                      ? 'bg-[#8C3E1F] text-white border-[#8C3E1F] shadow-xs'
                      : 'bg-white text-[#6F5B4E] border-[#D9C8BA] hover:bg-[#F4ECE4]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A382C] mb-1">
              {category === 'formulas' ? 'Dye Vat Ratios & Process Steps' : 'Description / Pattern Notes'}
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Detail ingredients, temperature, weights, or stitch counts..."
              className="w-full px-3 py-2 text-sm bg-white border border-[#D9C8BA] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#8C3E1F]"
            />
          </div>

          {category === 'stash' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#F4ECE4] rounded-xl border border-[#E3D3C5]">
              <div>
                <label className="block text-[11px] font-semibold text-[#5A4537] mb-1">Yarn Brand / Guild</label>
                <input
                  type="text"
                  value={yarnBrand}
                  onChange={e => setYarnBrand(e.target.value)}
                  placeholder="e.g. Dhangar Co-op"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D9C8BA] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#5A4537] mb-1">Colorway / Lot</label>
                <input
                  type="text"
                  value={colorway}
                  onChange={e => setColorway(e.target.value)}
                  placeholder="e.g. Natural Black"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D9C8BA] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#5A4537] mb-1">Skeins Count</label>
                <input
                  type="number"
                  min="1"
                  value={quantitySkeins}
                  onChange={e => setQuantitySkeins(e.target.value)}
                  placeholder="e.g. 6"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D9C8BA] rounded-lg"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#4A382C] mb-1">Tags (comma separated)</label>
            <div className="relative">
              <input
                type="text"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="Indigo, Wool, Ferment, Deccani"
                className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-[#D9C8BA] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#8C3E1F]"
              />
              <Tag className="w-4 h-4 text-[#A69385] absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#D9C8BA]">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-[#8C3E1F]" />
              <div>
                <div className="text-xs font-semibold text-[#3B2519]">Vault PIN Protection</div>
                <div className="text-[11px] text-[#8C7A6D]">Hide contents until unlocked with 4-digit PIN</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isLockedWithPin}
              onChange={e => setIsLockedWithPin(e.target.checked)}
              className="w-4 h-4 accent-[#8C3E1F] rounded cursor-pointer"
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
              className="px-5 py-2 text-xs font-semibold text-white bg-[#8C3E1F] hover:bg-[#733318] rounded-xl shadow-xs transition-colors"
            >
              Save to Locker
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
