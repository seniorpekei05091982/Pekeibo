
import React, { useState, useEffect } from 'react';
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
import { Keuangan } from './pages/Keuangan';
import { Aset } from './pages/Aset';
import { Users } from './pages/Users';
import { ProfileGereja } from './pages/ProfileGereja';
import { Login } from './pages/Login';
import { BackupData } from './pages/BackupData';
import { Talenta } from './pages/Talenta';
import { Reports } from './pages/Reports';
import { UserRole, KlasisData, JemaatLokalData } from './types';

// Mock Pages for Remaining Modules
const MasterPlaceholder = ({ title, role }: any) => (
  <div className="p-12 text-center py-24 bg-white m-10 rounded-[3rem] border border-slate-100 shadow-2xl">
    <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tighter uppercase">{title}</h2>
    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-10">Data Master sedang dikomposisikan untuk level {role}.</p>
    <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">Impor Data CSV</button>
  </div>
);

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [userRole, setUserRole] = useState<UserRole>('Sinode');
  
  const [churchInfo, setChurchInfo] = useState({
    nama: 'SINODE KINGMI PAPUA',
    logo: 'https://ui-avatars.com/api/?name=KINGMI&background=fb923c&color=fff&size=128',
    alamat: 'Tanah Papua, Indonesia',
    telp: '0811-1234-5678',
    hp: '0811-1234-5678',
    email: 'admin@kingmipapua.org',
    gembala: 'Pdt. Dr. Benny Giyai',
    keterangan: 'Gereja Kemah Injil (KINGMI) Di Tanah Papua'
  });

  const [adminInfo, setAdminInfo] = useState({
    name: 'Yunus Kogoya',
    username: 'admin',
    photo: 'https://ui-avatars.com/api/?name=Yunus+Kogoya&background=334155&color=fff',
    role: userRole
  });

  const [jemaatData, setJemaatData] = useState<any[]>([]);
  const [talentaData, setTalentaData] = useState<any[]>([]);

  const onLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    setAdminInfo(prev => ({ ...prev, role: role }));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    if (window.confirm('Keluar dari SIM GEREJA KINGMI PAPUA?')) {
      setIsLoggedIn(false);
      setActiveMenu('dashboard');
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={onLoginSuccess} churchInfo={churchInfo} />;
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard onSelectMenu={setActiveMenu} jemaatData={jemaatData} userRole={userRole} />;
      case 'master-klasis': return <MasterPlaceholder title="Manajemen Daftar Klasis" role={userRole} />;
      case 'master-jemaat-lokal': return <MasterPlaceholder title="Manajemen Jemaat Lokal" role={userRole} />;
      case 'jemaat': return <Jemaat menuId={activeMenu} onBack={() => setActiveMenu('dashboard')} churchInfo={churchInfo} data={jemaatData} setData={setJemaatData} />;
      case 'talenta': return <Talenta data={talentaData} setData={setTalentaData} onBack={() => setActiveMenu('dashboard')} />;
      case 'pejabat-pelayanan': return <MasterPlaceholder title="Pejabat & Jabatan Struktural" role={userRole} />;
      case 'penyerahan': return <PenyerahanAnak onBack={() => setActiveMenu('dashboard')} />;
      case 'katekisasi': return <Katekisasi />;
      case 'baptisan': return <Baptisan onBack={() => setActiveMenu('dashboard')} />;
      case 'kedukaan': return <Kedukaan onBack={() => setActiveMenu('dashboard')} />;
      case 'keuangan': return <Keuangan onBack={() => setActiveMenu('dashboard')} />;
      case 'aset': return <Aset onBack={() => setActiveMenu('dashboard')} />;
      case 'jadwal': return <JadwalIbadah onBack={() => setActiveMenu('dashboard')} />;
      case 'laporan-pusat': return <Reports onBack={() => setActiveMenu('dashboard')} />;
      case 'unit-pelayanan': return <MasterPlaceholder title="Unit Pelayanan Kategorial" role={userRole} />;
      case 'lembaga-afiliasi': return <MasterPlaceholder title="Lembaga Afiliasi Sinode" role={userRole} />;
      case 'users': return <Users onBack={() => setActiveMenu('dashboard')} userRole={userRole} />;
      case 'profile-gereja': return <ProfileGereja churchData={churchInfo} setChurchData={setChurchInfo} onBack={() => setActiveMenu('dashboard')} userRole={userRole} />;
      case 'backup': return <BackupData onBack={() => setActiveMenu('dashboard')} />;
      default: return <Dashboard onSelectMenu={setActiveMenu} jemaatData={jemaatData} userRole={userRole} />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden font-inter transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <aside className="hidden lg:block shrink-0 z-40">
        <Sidebar onSelect={(id) => id === 'logout' ? handleLogout() : setActiveMenu(id)} activeId={activeMenu} churchInfo={churchInfo} adminInfo={adminInfo} />
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header adminInfo={adminInfo} theme={theme} setTheme={setTheme} />
        <main className={`flex-1 overflow-y-auto p-4`}>
          <div className="max-w-[1600px] mx-auto min-h-full flex flex-col">
            {renderContent()}
            <footer className="mt-auto py-10 px-8 border-t flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
               <span>© 2024 KINGMI PAPUA / ERA SISTEM MEDIA</span>
               <span className="text-blue-600">V4.0 Integrated Reports Edition</span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
