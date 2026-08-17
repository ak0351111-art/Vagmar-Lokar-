import React from 'react';
import { Compass, Grid, Lock, CheckSquare } from 'lucide-react';
import { NavSection } from '../types';

interface NavigationProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
}

export const MobileNav: React.FC<NavigationProps> = ({ activeSection, onSelectSection }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBF8F5]/95 backdrop-blur-md border-t border-[#E8DDD3] px-2 py-1.5 flex justify-around items-center">
      <button
        onClick={() => onSelectSection('heritage')}
        className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
          activeSection === 'heritage'
            ? 'text-[#8C3E1F] font-bold'
            : 'text-[#8C7A6D]'
        }`}
      >
        <Compass className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">Heritage</span>
      </button>

      <button
        onClick={() => onSelectSection('studio')}
        className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
          activeSection === 'studio'
            ? 'text-[#8C3E1F] font-bold'
            : 'text-[#8C7A6D]'
        }`}
      >
        <Grid className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">Studio</span>
      </button>

      <button
        onClick={() => onSelectSection('locker')}
        className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
          activeSection === 'locker'
            ? 'text-[#8C3E1F] font-bold'
            : 'text-[#8C7A6D]'
        }`}
      >
        <Lock className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">Locker</span>
      </button>

      <button
        onClick={() => onSelectSection('tracker')}
        className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
          activeSection === 'tracker'
            ? 'text-[#8C3E1F] font-bold'
            : 'text-[#8C7A6D]'
        }`}
      >
        <CheckSquare className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">Tracker</span>
      </button>
    </div>
  );
};
