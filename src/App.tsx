import React, { useState, useEffect } from 'react';
import { NavSection, LockerItem, ActiveProject } from './types';
import { INITIAL_LOCKER_ITEMS, INITIAL_PROJECTS } from './data/woolData';
import { Header } from './components/Header';
import { MobileNav } from './components/Navigation';
import { HeritageView } from './components/HeritageView';
import { StudioView } from './components/StudioView';
import { LockerView } from './components/LockerView';
import { TrackerView } from './components/TrackerView';
import { PinModal } from './components/PinModal';
import { AddLockerModal } from './components/AddLockerModal';
import { AddProjectModal } from './components/AddProjectModal';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>('heritage');

  // Locker & Security State
  const [isVaultUnlocked, setIsVaultUnlocked] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [masterPin] = useState<string>('1234');

  // Modals
  const [isAddLockerModalOpen, setIsAddLockerModalOpen] = useState<boolean>(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState<boolean>(false);

  // Locker Items State with LocalStorage persistence
  const [lockerItems, setLockerItems] = useState<LockerItem[]>(() => {
    try {
      const saved = localStorage.getItem('vagmar_locker_items');
      return saved ? JSON.parse(saved) : INITIAL_LOCKER_ITEMS;
    } catch {
      return INITIAL_LOCKER_ITEMS;
    }
  });

  // Projects State with LocalStorage persistence
  const [projects, setProjects] = useState<ActiveProject[]>(() => {
    try {
      const saved = localStorage.getItem('vagmar_active_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vagmar_locker_items', JSON.stringify(lockerItems));
    } catch (e) {
      console.error(e);
    }
  }, [lockerItems]);

  useEffect(() => {
    try {
      localStorage.setItem('vagmar_active_projects', JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  // Vault Security Handlers
  const handleToggleVaultLock = () => {
    if (isVaultUnlocked) {
      setIsVaultUnlocked(false);
    } else {
      setIsPinModalOpen(true);
    }
  };

  const handleUnlockSuccess = () => {
    setIsVaultUnlocked(true);
    setIsPinModalOpen(false);
  };

  // Locker Items Handlers
  const handleToggleFavorite = (id: string) => {
    setLockerItems(prev =>
      prev.map(item => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
    );
  };

  const handleDeleteLockerItem = (id: string) => {
    setLockerItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveLockerItem = (newItem: LockerItem) => {
    setLockerItems(prev => [newItem, ...prev]);
  };

  // Projects Handlers
  const handleIncrementRow = (id: string) => {
    setProjects(prev =>
      prev.map(proj => {
        if (proj.id === id) {
          const next = proj.currentRows + 1;
          const progress = proj.targetRows > 0 ? Math.min(1, next / proj.targetRows) : 0;
          return {
            ...proj,
            currentRows: next,
            progressPercent: progress,
            isCompleted: next >= proj.targetRows
          };
        }
        return proj;
      })
    );
  };

  const handleDecrementRow = (id: string) => {
    setProjects(prev =>
      prev.map(proj => {
        if (proj.id === id && proj.currentRows > 0) {
          const next = proj.currentRows - 1;
          const progress = proj.targetRows > 0 ? Math.min(1, next / proj.targetRows) : 0;
          return {
            ...proj,
            currentRows: next,
            progressPercent: progress,
            isCompleted: false
          };
        }
        return proj;
      })
    );
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleSaveProject = (newProject: ActiveProject) => {
    setProjects(prev => [newProject, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F5] text-[#2C2724] pb-20 md:pb-8">
      {/* Top Header */}
      <Header
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        isVaultUnlocked={isVaultUnlocked}
        onToggleVaultLock={handleToggleVaultLock}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeSection === 'heritage' && (
          <HeritageView
            onNavigateToStudio={() => setActiveSection('studio')}
            onNavigateToLocker={() => setActiveSection('locker')}
          />
        )}

        {activeSection === 'studio' && <StudioView />}

        {activeSection === 'locker' && (
          <LockerView
            items={lockerItems}
            isVaultUnlocked={isVaultUnlocked}
            onRequestUnlock={() => setIsPinModalOpen(true)}
            onToggleFavorite={handleToggleFavorite}
            onDeleteItem={handleDeleteLockerItem}
            onOpenAddModal={() => setIsAddLockerModalOpen(true)}
          />
        )}

        {activeSection === 'tracker' && (
          <TrackerView
            projects={projects}
            onIncrementRow={handleIncrementRow}
            onDecrementRow={handleDecrementRow}
            onDeleteProject={handleDeleteProject}
            onOpenAddModal={() => setIsAddProjectModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[#E8DDD3] py-6 text-center text-xs text-[#8C7A6D]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="font-bold text-[#3B2519]">Vagmar Lokar (वाघमारे लोकर)</span> — Pastoral Wool & Craft Studio
          </div>
          <div>Preserving Himalayan & Deccani nomadic textile heritages</div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <MobileNav activeSection={activeSection} onSelectSection={setActiveSection} />

      {/* Modals */}
      <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={handleUnlockSuccess}
        expectedPin={masterPin}
      />

      <AddLockerModal
        isOpen={isAddLockerModalOpen}
        onClose={() => setIsAddLockerModalOpen(false)}
        onSave={handleSaveLockerItem}
      />

      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        onSave={handleSaveProject}
      />
    </div>
  );
};
