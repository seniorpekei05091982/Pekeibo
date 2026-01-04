
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import Dashboard from './pages/Dashboard';
import { Jemaat } from './pages/Jemaat';
import { PenyerahanAnak } from './pages/PenyerahanAnak';
import { Katekisasi } from './pages/Katekisasi';
import { Baptisan } from './pages/Baptisan';
import { Kedukaan } from './pages/Kedukaan';
import { Konseling } from './pages/Konseling';
import { JadwalIbadah } from './pages/JadwalIbadah';
import { DaftarPelayanan } from './pages/DaftarPelayanan';
import { Komsel } from './pages/Komsel';
import { KomisiMember } from './pages/KomisiMember';

const App: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard onSelectMenu={setActiveMenu} />;
      case 'jemaat':
      case 'cetak-jemaat':
        return <Jemaat onBack={() => setActiveMenu('dashboard')} />;
      case 'jadwal':
        return <JadwalIbadah onBack={() => setActiveMenu('dashboard')} />;
      case 'pelayanan':
        return <DaftarPelayanan onBack={() => setActiveMenu('dashboard')} />;
      case 'komsel':
        return <Komsel onBack={() => setActiveMenu('dashboard')} />;
      case 'komisi-sm':
        return <KomisiMember type="Pelayanan Anak & Remaja (SM)" onBack={() => setActiveMenu('dashboard')} />;
      case 'komisi-pemuda':
        return <KomisiMember type="Pelayanan Pemuda" onBack={() => setActiveMenu('dashboard')} />;
      case 'komisi-perkawan':
        return <KomisiMember type="Pelayanan Perempuan (Perkawan)" onBack={() => setActiveMenu('dashboard')} />;
      case 'komisi-perkarya':
        return <KomisiMember type="Pelayanan Laki-laki (Perkarya)" onBack={() => setActiveMenu('dashboard')} />;
      case 'penyerahan':
        return <PenyerahanAnak onBack={() => setActiveMenu('dashboard')} />;
      case 'katekisasi':
        return <Katekisasi onBack={() => setActiveMenu('dashboard')} />;
      case 'baptisan':
        return <Baptisan onBack={() => setActiveMenu('dashboard')} />;
      case 'kedukaan':
        return <Kedukaan onBack={() => setActiveMenu('dashboard')} />;
      case 'konseling':
        return <Konseling onBack={() => setActiveMenu('dashboard')} />;
      default:
        return (
          <div className="p-8 text-center">
            <div className="max-w-md mx-auto py-20">
              <div className="mb-4 text-blue-500 opacity-20 flex justify-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"/></svg>
              </div>
              <h2 className="text-xl font-bold text-slate-700 mb-2">Modul "{activeMenu}"</h2>
              <p className="text-slate-500 text-sm">Modul ini sedang dalam pengembangan atau integrasi database sistem.</p>
              <button 
                onClick={() => setActiveMenu('dashboard')}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className="hidden lg:block">
        <Sidebar onSelect={setActiveMenu} activeId={activeMenu} />
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
          {renderContent()}
          <footer className="p-6 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center border-t border-slate-200 mt-auto bg-white/50">
            <span>Copyright &copy; 2023 <strong className="text-slate-500 font-bold">Era Sistem Media</strong>. All rights reserved.</span>
            <span className="mt-2 sm:mt-0 font-semibold text-rose-600 uppercase tracking-tighter">Sistem Informasi Gereja Version 2.0</span>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
