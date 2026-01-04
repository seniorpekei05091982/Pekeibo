
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
import { Talenta } from './pages/Talenta';
import { Aset } from './pages/Aset';
import { Keuangan } from './pages/Keuangan';
import { Users } from './pages/Users';
import { ProfileUser } from './pages/ProfileUser';
import { BackupData } from './pages/BackupData';
import { LaporanGeneric } from './pages/laporan/LaporanGeneric';
import { LaporanUltah } from './pages/laporan/LaporanUltah';
import { LaporanUsia } from './pages/laporan/LaporanUsia';
import { LaporanUsiaFilter } from './pages/laporan/LaporanUsiaFilter';
import { LaporanKomisi } from './pages/laporan/LaporanKomisi';
import { LaporanKeuanganReport } from './pages/laporan/LaporanKeuanganReport';
import { LaporanAsetReport } from './pages/laporan/LaporanAsetReport';

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
      case 'talenta':
        return <Talenta onBack={() => setActiveMenu('dashboard')} />;
      case 'keuangan':
        return <Keuangan onBack={() => setActiveMenu('dashboard')} />;
      case 'aset':
        return <Aset onBack={() => setActiveMenu('dashboard')} />;
      
      // Settings / User Management
      case 'users':
        return <Users onBack={() => setActiveMenu('dashboard')} />;
      case 'profile-user':
        return <ProfileUser onBack={() => setActiveMenu('dashboard')} />;
      case 'backup':
        return <BackupData onBack={() => setActiveMenu('dashboard')} />;

      // Reports
      case 'lap-ultah': return <LaporanUltah onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-usia': return <LaporanUsia onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-usia-filter': return <LaporanUsiaFilter onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-jk': return <LaporanGeneric type="Jenis Kelamin" onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-ibadah': return <LaporanGeneric type="Ibadah" onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-pelayanan': return <LaporanGeneric type="Pelayanan" onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-talenta': return <LaporanGeneric type="Talenta" onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-keluarga': return <LaporanGeneric type="Keluarga" onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-komisi-sm': return <LaporanKomisi type="Pelayanan Anak & Remaja (SM)" onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-komisi-pemuda': return <LaporanKomisi type="Pelayanan Pemuda" onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-komisi-perkawan': return <LaporanKomisi type="Pelayanan Perempuan (Perkawan)" onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-komisi-perkarya': return <LaporanKomisi type="Pelayanan Laki-laki (Perkarya)" onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-keuangan': return <LaporanKeuanganReport onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-aset': return <LaporanAsetReport onBack={() => setActiveMenu('dashboard')} />;

      case 'komisi-sm': return <KomisiMember type="Pelayanan Anak & Remaja (SM)" onBack={() => setActiveMenu('dashboard')} />;
      case 'komisi-pemuda': return <KomisiMember type="Pelayanan Pemuda" onBack={() => setActiveMenu('dashboard')} />;
      case 'komisi-perkawan': return <KomisiMember type="Pelayanan Perempuan (Perkawan)" onBack={() => setActiveMenu('dashboard')} />;
      case 'komisi-perkarya': return <KomisiMember type="Pelayanan Laki-laki (Perkarya)" onBack={() => setActiveMenu('dashboard')} />;
      case 'penyerahan': return <PenyerahanAnak onBack={() => setActiveMenu('dashboard')} />;
      case 'katekisasi': return <Katekisasi onBack={() => setActiveMenu('dashboard')} />;
      case 'baptisan': return <Baptisan onBack={() => setActiveMenu('dashboard')} />;
      case 'kedukaan': return <Kedukaan onBack={() => setActiveMenu('dashboard')} />;
      case 'konseling': return <Konseling onBack={() => setActiveMenu('dashboard')} />;
      default:
        return (
          <div className="p-8 text-center py-20 bg-white m-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-700 mb-2">Modul "{activeMenu}"</h2>
            <p className="text-slate-500 text-sm">Halaman sedang dalam pengembangan.</p>
            <button onClick={() => setActiveMenu('dashboard')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Kembali ke Dashboard</button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <aside className="hidden lg:block shrink-0">
        <Sidebar onSelect={setActiveMenu} activeId={activeMenu} />
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300">
          {renderContent()}
          <footer className="p-6 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between items-center border-t border-slate-200 mt-auto bg-white/50">
            <span>Copyright &copy; 2023 <strong className="text-slate-500 font-bold">Era Sistem Media</strong>. All rights reserved.</span>
            <span className="mt-2 sm:mt-0 font-semibold text-rose-600 uppercase tracking-tighter">Sistem Informasi Gereja Version 2.0</span>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
