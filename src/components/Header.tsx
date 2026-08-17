import React from 'react';
import { Sparkles, Shield, Compass, Grid, Lock, CheckSquare } from 'lucide-react';
import { NavSection } from '../types';

interface HeaderProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  isVaultUnlocked: boolean;
  onToggleVaultLock: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  isVaultUnlocked,
  onToggleVaultLock,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF8F5]/90 backdrop-blur-md border-b border-[#E8DDD3] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectSection('heritage')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A8583B] to-[#73351F] flex items-center justify-center text-white shadow-sm ring-2 ring-[#EAD7CA]">
              <Sparkles className="w-5 h-5 text-[#FEE8D6]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-[#3B2519] tracking-tight font-display">VAGMAR LOKAR</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#EFE3D8] text-[#73351F] font-medium font-marathi">
                  वाघमारे लोकर
                </span>
              </div>
              <p className="text-xs text-[#8C6D58] hidden sm:block">
                Pastoral Woolcraft Intelligence & Artisanal Vault
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-[#F2E8DF] p-1.5 rounded-2xl border border-[#E3D3C5]">
            <button
              onClick={() => onSelectSection('heritage')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeSection === 'heritage'
                  ? 'bg-white text-[#3B2519] shadow-xs font-semibold'
                  : 'text-[#6F5B4E] hover:text-[#3B2519] hover:bg-white/50'
              }`}
            >
              <Compass className="w-4 h-4 text-[#A8583B]" />
              <span>Heritage Compendium</span>
            </button>

            <button
              onClick={() => onSelectSection('studio')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeSection === 'studio'
                  ? 'bg-white text-[#3B2519] shadow-xs font-semibold'
                  : 'text-[#6F5B4E] hover:text-[#3B2519] hover:bg-white/50'
              }`}
            >
              <Grid className="w-4 h-4 text-[#436474]" />
              <span>Textile Studio</span>
            </button>

            <button
              onClick={() => onSelectSection('locker')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeSection === 'locker'
                  ? 'bg-white text-[#3B2519] shadow-xs font-semibold'
                  : 'text-[#6F5B4E] hover:text-[#3B2519] hover:bg-white/50'
              }`}
            >
              <Lock className="w-4 h-4 text-[#93526B]" />
              <span>Digital Locker</span>
            </button>

            <button
              onClick={() => onSelectSection('tracker')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeSection === 'tracker'
                  ? 'bg-white text-[#3B2519] shadow-xs font-semibold'
                  : 'text-[#6F5B4E] hover:text-[#3B2519] hover:bg-white/50'
              }`}
            >
              <CheckSquare className="w-4 h-4 text-[#4E7358]" />
              <span>Row Tracker</span>
            </button>
          </nav>

          {/* Quick Lock Action Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleVaultLock}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isVaultUnlocked
                  ? 'bg-[#EAF3EC] border-[#A2CCA9] text-[#2C6337] hover:bg-[#DDF0E0]'
                  : 'bg-[#FDF1E8] border-[#E8C2A8] text-[#8C3E1F] hover:bg-[#FAE2D2]'
              }`}
              title={isVaultUnlocked ? 'Locker Vault is Unlocked (Click to lock)' : 'Vault is Encrypted (Click to enter PIN)'}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isVaultUnlocked ? 'Vault Open' : 'Vault Locked'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
