import React, { useState } from 'react';
import { LockerItem, LockerCategory } from '../types';
import { Lock, Unlock, Plus, Search, Star, Trash2, Copy, Shield, Tag, Sparkles, Check, FileText } from 'lucide-react';

interface LockerViewProps {
  items: LockerItem[];
  isVaultUnlocked: boolean;
  onRequestUnlock: () => void;
  onToggleFavorite: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onOpenAddModal: () => void;
}

export const LockerView: React.FC<LockerViewProps> = ({
  items,
  isVaultUnlocked,
  onRequestUnlock,
  onToggleFavorite,
  onDeleteItem,
  onOpenAddModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LockerCategory | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q)) ||
      (item.yarnBrand && item.yarnBrand.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const totalSkeins = items.reduce((acc, it) => acc + (it.quantitySkeins || 0), 0);
  const totalFormulas = items.filter(it => it.category === 'formulas').length;
  const totalProtected = items.filter(it => it.isLockedWithPin).length;

  const handleCopy = (item: LockerItem) => {
    navigator.clipboard.writeText(`${item.title}\n\n${item.content}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryBadgeClass = (category: LockerCategory) => {
    switch (category) {
      case 'formulas':
        return 'bg-[#FDF0E6] text-[#8C3E1F] border-[#F3DAC8]';
      case 'stash':
        return 'bg-[#FEF6E8] text-[#8C641F] border-[#F5E2C4]';
      case 'patterns':
        return 'bg-[#EBF2F7] text-[#2C5270] border-[#D0E2EE]';
      case 'logs':
        return 'bg-[#EAF3EC] text-[#2C6337] border-[#C5DEC9]';
      case 'certificates':
        return 'bg-[#F3EBF7] text-[#652C70] border-[#E3D0E8]';
      default:
        return 'bg-[#F4ECE4] text-[#5A4537] border-[#E3D3C5]';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E3D3C5] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-[#F7EBEB] text-[#8C1F1F]">
              <Lock className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#3B2519] font-display">
              Vagmar Digital Locker
            </h1>
          </div>
          <p className="text-xs text-[#8C7A6D] mt-1 font-marathi">
            सुरक्षित लोकर, नैसर्गिक रंग प्रक्रिया आणि गुप्त विणकाम सूत्रे
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onRequestUnlock}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isVaultUnlocked
                ? 'bg-[#EAF3EC] border-[#A2CCA9] text-[#2C6337] hover:bg-[#DDF0E0]'
                : 'bg-[#FDF0E6] border-[#E8C2A8] text-[#8C3E1F] hover:bg-[#FAE2D2]'
            }`}
          >
            {isVaultUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            <span>{isVaultUnlocked ? 'Vault Decrypted' : 'Unlock Encrypted Entries'}</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#8C3E1F] text-white text-xs font-semibold hover:bg-[#733318] transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Entry</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#E3D3C5] shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A6D]">Vault Entries</span>
          <div className="text-2xl font-bold text-[#3B2519] font-display mt-1">{items.length}</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#E3D3C5] shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A6D]">Skeins in Stash</span>
          <div className="text-2xl font-bold text-[#8C641F] font-display mt-1">{totalSkeins} <span className="text-xs font-sans text-[#7A6658]">skeins</span></div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#E3D3C5] shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A6D]">Secret Formulas</span>
          <div className="text-2xl font-bold text-[#8C3E1F] font-display mt-1">{totalFormulas}</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#E3D3C5] shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A6D]">PIN Protected</span>
          <div className="text-2xl font-bold text-[#2C6337] font-display mt-1">{totalProtected}</div>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8C7A6D] absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search notes, stash, lots, or tags..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9C8BA] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#8C3E1F]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full pb-1">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'stash', label: 'Yarn Stash' },
            { id: 'formulas', label: 'Dye Formulas' },
            { id: 'patterns', label: 'Patterns' },
            { id: 'logs', label: 'Logs' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#3B2519] text-white shadow-xs'
                  : 'bg-white text-[#6F5B4E] border border-[#E3D3C5] hover:bg-[#F2E8DF]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E3D3C5] space-y-3">
          <FileText className="w-10 h-10 text-[#C8B3A4] mx-auto" />
          <h3 className="text-base font-bold text-[#3B2519]">No locker items match your query</h3>
          <p className="text-xs text-[#8C7A6D]">Try searching for different keywords or add a new entry to the vault.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map(item => {
            const isMasked = item.isLockedWithPin && !isVaultUnlocked;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-[#E3D3C5] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#C5B0A0] transition-all"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${getCategoryBadgeClass(item.category)}`}>
                        {item.category}
                      </span>
                      {item.isLockedWithPin && (
                        <span className={`flex items-center space-x-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          isVaultUnlocked ? 'text-[#2C6337] bg-[#EAF3EC]' : 'text-[#8C3E1F] bg-[#FDF0E6]'
                        }`}>
                          {isVaultUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                          <span>{isVaultUnlocked ? 'Unlocked' : 'PIN'}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onToggleFavorite(item.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          item.isFavorite ? 'text-[#D97706] hover:bg-[#FEF3C7]' : 'text-[#A69385] hover:bg-[#F2E8DF]'
                        }`}
                        title="Toggle Favorite"
                      >
                        <Star className={`w-4 h-4 ${item.isFavorite ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-1.5 rounded-lg text-[#A69385] hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#3B2519] font-display mt-2">
                    {item.title}
                  </h3>

                  {/* Content or Masked Guard */}
                  {isMasked ? (
                    <div
                      onClick={onRequestUnlock}
                      className="mt-3 p-4 rounded-2xl bg-[#FAF6F2] border border-[#E8DDD3] cursor-pointer hover:bg-[#F4ECE4] transition-colors flex items-center justify-center space-x-2 text-center"
                    >
                      <Shield className="w-4 h-4 text-[#8C3E1F]" />
                      <span className="text-xs font-semibold text-[#8C3E1F]">
                        Confidential Entry. Click to enter PIN & decrypt formula.
                      </span>
                    </div>
                  ) : (
                    <div className="mt-3 space-y-3">
                      <p className="text-xs text-[#5A4537] whitespace-pre-line leading-relaxed bg-[#FAF6F2] p-3.5 rounded-xl border border-[#EDE2D8]">
                        {item.content}
                      </p>

                      {/* Stash metadata chips */}
                      {(item.yarnBrand || item.quantitySkeins || item.colorway) && (
                        <div className="flex flex-wrap gap-2 text-xs text-[#5A4537]">
                          {item.yarnBrand && (
                            <span className="px-2 py-0.5 bg-[#F2E8DF] rounded-md font-medium">
                              Brand: {item.yarnBrand}
                            </span>
                          )}
                          {item.colorway && (
                            <span className="px-2 py-0.5 bg-[#F2E8DF] rounded-md font-medium">
                              Colorway: {item.colorway}
                            </span>
                          )}
                          {item.quantitySkeins && (
                            <span className="px-2 py-0.5 bg-[#FEF6E8] text-[#8C641F] font-bold rounded-md">
                              {item.quantitySkeins} Skeins
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer with Tags and Copy Action */}
                <div className="flex items-center justify-between border-t border-[#F0E5DB] pt-3 text-xs">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] text-[#7A6658] bg-[#F4ECE4] px-1.5 py-0.5 rounded-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {!isMasked && (
                    <button
                      onClick={() => handleCopy(item)}
                      className="flex items-center space-x-1 text-[#8C3E1F] hover:text-[#733318] font-semibold text-[11px]"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-[#2C6337]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
