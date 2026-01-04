
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
import { DaftarPelayanan } from './pages/DaftarPelayanan';
import { Komsel } from './pages/Komsel';
import { KomisiMember } from './pages/KomisiMember';
import { Talenta } from './pages/Talenta';
import { Aset } from './pages/Aset';
import { Keuangan } from './pages/Keuangan';
import { Users } from './pages/Users';
import { ProfileUser } from './pages/ProfileUser';
import { BackupData } from './pages/BackupData';
import { ProfileGereja } from './pages/ProfileGereja';
import { Login } from './pages/Login';
import { LaporanGeneric } from './pages/laporan/LaporanGeneric';
import { LaporanUltah } from './pages/laporan/LaporanUltah';
import { LaporanUsia } from './pages/laporan/LaporanUsia';
import { LaporanUsiaFilter } from './pages/laporan/LaporanUsiaFilter';
import { LaporanKomisi } from './pages/laporan/LaporanKomisi';
import { LaporanKeuanganReport } from './pages/laporan/LaporanKeuanganReport';
import { LaporanAsetReport } from './pages/laporan/LaporanAsetReport';
import { UserRole, KlasisData, JemaatLokalData } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [userRole, setUserRole] = useState<UserRole>('Sinode');
  
  // Levels Data
  const [klasisData, setKlasisData] = useState<KlasisData[]>([]);
  const [jemaatLokalData, setJemaatLokalData] = useState<JemaatLokalData[]>([]);

  // Shared Global States
  const [jemaatData, setJemaatData] = useState<any[]>([
    { 
      id: '1', 
      nomerJemaat: '000020', 
      nomerKeluarga: '000001', 
      nama: 'Amir Kogoya', 
      alamat: 'Jl. Raya Abepura No. 12', 
      jenisKelamin: 'Laki-Laki', 
      tempatLahir: 'Jayapura', 
      tanggalLahir: '1990-05-15', 
      nomerHP: '081234567890', 
      rayon: 'Rayon 1 Abepura', 
      status: 'Tetap',
      statusKawin: 'Belum Menikah',
      statusKeluarga: 'Kepala Keluarga',
      jalurMasuk: 'PI (Penginjilan)',
      baptis: 'Sudah',
      pendetaBaptis: 'Pdt. Samuel K',
      tempatBaptis: 'Gereja Pusat',
      pelayanan: 'Majelis',
      talenta: 'Menyanyi',
      tanggalBergabung: '2020-11-10',
      foto: 'https://ui-avatars.com/api/?name=Amir+K&background=000&color=fff' 
    }
  ]);

  const [jadwalData, setJadwalData] = useState<any[]>([
    { id: '1', namaIbadah: 'Ibadah Raya 1', hari: 'Minggu', jamMulai: '06:00:00', jamSelesai: '08:00:00', lokasi: 'Lantai 1 & 2', keterangan: '-' }
  ]);

  const [pelayananData, setPelayananData] = useState<any[]>([
    { id: '1', namaPelayanan: 'Majelis', unitPelayanan: 'Pastoral', keterangan: '-' }
  ]);

  const [asetData, setAsetData] = useState<any[]>([
    { id: '1', namaAset: 'Kursi Lipat', kodeAset: 'AST-001', lokasi: 'Aula Utama', kondisi: 'Baik', jumlah: 150 }
  ]);

  const [talentaData, setTalentaData] = useState<any[]>([
    { id: '1', namaTalenta: 'Menyanyi', keterangan: '-', dibuatOleh: 'admin', dibuatTanggal: '04/12/2024' }
  ]);

  const [keuanganData, setKeuanganData] = useState<any[]>([]);

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
    gender: 'Laki-Laki',
    photo: 'https://ui-avatars.com/api/?name=Yunus+Kogoya&background=334155&color=fff',
    role: userRole
  });

  const handleLogout = () => {
    const confirmLogout = window.confirm('Apakah Anda yakin ingin keluar dari sistem SIM GEREJA KINGMI PAPUA?');
    if (confirmLogout) {
      setIsLoggedIn(false);
      setActiveMenu('dashboard');
    }
  };

  const handleMenuSelect = (id: string) => {
    if (id === 'logout') {
      handleLogout();
    } else {
      setActiveMenu(id);
    }
  };

  const onLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    setAdminInfo(prev => ({ ...prev, role: role }));
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={onLoginSuccess} churchInfo={churchInfo} />;
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard onSelectMenu={setActiveMenu} jemaatData={jemaatData} jadwalData={jadwalData} pelayananData={pelayananData} asetData={asetData} keuanganData={keuanganData} userRole={userRole} />;
      case 'jemaat':
      case 'cetak-jemaat':
        return <Jemaat menuId={activeMenu} onBack={() => setActiveMenu('dashboard')} churchInfo={churchInfo} data={jemaatData} setData={setJemaatData} />;
      case 'jadwal':
        return <JadwalIbadah onBack={() => setActiveMenu('dashboard')} data={jadwalData} setData={setJadwalData} />;
      case 'pelayanan':
        return <DaftarPelayanan onBack={() => setActiveMenu('dashboard')} data={pelayananData} setData={setPelayananData} />;
      case 'komsel':
        return <Komsel onBack={() => setActiveMenu('dashboard')} />;
      case 'komisi-sm':
        return <KomisiMember type="Anak & Remaja (SM)" onBack={() => setActiveMenu('dashboard')} />;
      case 'komisi-pemuda':
        return <KomisiMember type="Pemuda" onBack={() => setActiveMenu('dashboard')} />;
      case 'komisi-perkawan':
        return <KomisiMember type="Perempuan (Perkawan)" onBack={() => setActiveMenu('dashboard')} />;
      case 'komisi-perkarya':
        return <KomisiMember type="Laki-laki (Perkarya)" onBack={() => setActiveMenu('dashboard')} />;
      case 'talenta':
        return <Talenta data={talentaData} setData={setTalentaData} onBack={() => setActiveMenu('dashboard')} />;
      case 'keuangan':
        return <Keuangan onBack={() => setActiveMenu('dashboard')} data={keuanganData} setData={setKeuanganData} />;
      case 'aset':
        return <Aset onBack={() => setActiveMenu('dashboard')} />;
      case 'profile-user':
        return <ProfileUser adminInfo={adminInfo} setAdminInfo={setAdminInfo} onBack={() => setActiveMenu('dashboard')} />;
      case 'profile-gereja':
        return <ProfileGereja churchData={churchInfo} setChurchData={setChurchInfo} onBack={() => setActiveMenu('dashboard')} userRole={userRole} />;
      case 'users':
        return <Users onBack={() => setActiveMenu('dashboard')} userRole={userRole} />;
      case 'backup':
        return <BackupData onBack={() => setActiveMenu('dashboard')} />;
      case 'penyerahan': return <PenyerahanAnak onBack={() => setActiveMenu('dashboard')} />;
      case 'katekisasi': return <Katekisasi />;
      case 'baptisan': return <Baptisan onBack={() => setActiveMenu('dashboard')} />;
      case 'kedukaan': return <Kedukaan onBack={() => setActiveMenu('dashboard')} />;
      case 'konseling': return <Konseling onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-ultah': return <LaporanUltah jemaatData={jemaatData} onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-usia': return <LaporanUsia jemaatData={jemaatData} onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-usia-filter': return <LaporanUsiaFilter onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-jk': return <LaporanGeneric type="Jenis Kelamin" jemaatData={jemaatData} churchInfo={churchInfo} onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-pelayanan': return <LaporanGeneric type="Pelayanan" jemaatData={jemaatData} churchInfo={churchInfo} onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-keuangan': return <LaporanKeuanganReport onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-aset': return <LaporanAsetReport onBack={() => setActiveMenu('dashboard')} />;
      default:
        return (
          <div className="p-12 text-center py-24 bg-white m-10 rounded-[3rem] border border-slate-100 shadow-2xl">
            <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tighter uppercase">Modul Dalam Pengembangan</h2>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-10">Modul "{activeMenu}" sedang disesuaikan untuk level {userRole}.</p>
            <button onClick={() => setActiveMenu('dashboard')} className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-blue-600 transition-colors">Kembali ke Beranda</button>
          </div>
        );
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden font-inter transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <aside className="hidden lg:block shrink-0 z-40">
        <Sidebar onSelect={handleMenuSelect} activeId={activeMenu} churchInfo={churchInfo} adminInfo={adminInfo} />
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header adminInfo={adminInfo} theme={theme} setTheme={setTheme} />
        <main className={`flex-1 overflow-y-auto scrollbar-thin ${theme === 'dark' ? 'scrollbar-thumb-slate-800' : 'scrollbar-thumb-slate-200'} p-2 md:p-4`}>
          <div className="max-w-[1600px] mx-auto min-h-full flex flex-col">
            {renderContent()}
            <footer className={`px-8 py-10 text-[10px] flex flex-col sm:flex-row justify-between items-center border-t mt-auto rounded-t-[3rem] transition-colors ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800 text-slate-500' : 'bg-white/30 border-slate-100 text-slate-300'}`}>
              <span className="font-bold tracking-widest">© 2024 <strong className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-900'} font-black`}>SINODE KINGMI PAPUA</strong> / ERA SISTEM MEDIA.</span>
              <span className="mt-4 sm:mt-0 font-black text-blue-600 uppercase tracking-[0.3em] bg-blue-50/10 px-4 py-1.5 rounded-full">INTEGRATED SYNOD SYSTEM V3.0</span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
