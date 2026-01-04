
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
import { ProfileGereja } from './pages/ProfileGereja';
import { Login } from './pages/Login';
import { LaporanGeneric } from './pages/laporan/LaporanGeneric';
import { LaporanUltah } from './pages/laporan/LaporanUltah';
import { LaporanUsia } from './pages/laporan/LaporanUsia';
import { LaporanUsiaFilter } from './pages/laporan/LaporanUsiaFilter';
import { LaporanKomisi } from './pages/laporan/LaporanKomisi';
import { LaporanKeuanganReport } from './pages/laporan/LaporanKeuanganReport';
import { LaporanAsetReport } from './pages/laporan/LaporanAsetReport';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  
  // Shared Global States
  const [jemaatData, setJemaatData] = useState<any[]>([
    { 
      id: '1', 
      nomerJemaat: '000020', 
      nomerKeluarga: '000001', 
      nama: 'Amir', 
      alamat: 'Jl. Rungkut Mejoyo 12345', 
      jenisKelamin: 'Laki-Laki', 
      tempatLahir: 'Surabaya', 
      tanggalLahir: '1970-03-08', 
      nomerHP: '08901234567', 
      rayon: 'Rayon 1 Abepura', 
      status: 'Tetap',
      statusKawin: 'Sudah',
      statusKeluarga: 'Kepala Keluarga',
      baptis: 'Sudah',
      pendetaBaptis: 'Pdt. Samuel',
      tempatBaptis: 'Gereja Pusat',
      pelayanan: 'Majelis',
      talenta: 'Menyanyi',
      foto: 'https://ui-avatars.com/api/?name=Amir&background=000&color=fff' 
    }
  ]);

  const [jadwalData, setJadwalData] = useState<any[]>([
    { id: '1', namaIbadah: 'Ibadah Raya 1', hari: 'Minggu', jamMulai: '06:00:00', jamSelesai: '08:00:00', lokasi: 'Lantai 1 & 2', keterangan: '-' }
  ]);

  const [pelayananData, setPelayananData] = useState<any[]>([
    { id: '1', namaPelayanan: 'Majelis', keterangan: '-' }
  ]);

  const [asetData, setAsetData] = useState<any[]>([
    { id: '1', namaAset: 'Kursi Lipat', kodeAset: 'AST-001', lokasi: 'Aula Utama', kondisi: 'Baik', jumlah: 150 }
  ]);

  const [talentaData, setTalentaData] = useState<any[]>([
    { id: '1', namaTalenta: 'Menyanyi', keterangan: '-', dibuatOleh: 'admin', dibuatTanggal: '04/12/2024' }
  ]);

  const [keuanganData, setKeuanganData] = useState<any[]>([]);

  // Church & Admin Profile
  const [churchInfo, setChurchInfo] = useState({
    nama: 'GEREJA KINGMI PAPUA',
    logo: 'https://ui-avatars.com/api/?name=KINGMI&background=fb923c&color=fff&size=128',
    alamat: 'Tanah Papua',
    telp: '0811-XXXX-XXXX'
  });

  const [adminInfo, setAdminInfo] = useState({
    name: 'Admin User',
    username: 'admin',
    gender: 'Laki-Laki',
    photo: 'https://ui-avatars.com/api/?name=Admin+User&background=334155&color=fff'
  });

  const handleLogout = () => {
    const confirmLogout = window.confirm('Apakah Anda yakin ingin keluar dari sistem?');
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

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} churchInfo={churchInfo} />;
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <Dashboard 
            onSelectMenu={setActiveMenu} 
            jemaatData={jemaatData}
            jadwalData={jadwalData}
            pelayananData={pelayananData}
            asetData={asetData}
            keuanganData={keuanganData}
          />
        );
      case 'jemaat':
      case 'cetak-jemaat':
        return <Jemaat menuId={activeMenu} onBack={() => setActiveMenu('dashboard')} churchInfo={churchInfo} data={jemaatData} setData={setJemaatData} />;
      case 'jadwal':
        return <JadwalIbadah onBack={() => setActiveMenu('dashboard')} data={jadwalData} setData={setJadwalData} />;
      case 'pelayanan':
        return <DaftarPelayanan onBack={() => setActiveMenu('dashboard')} data={pelayananData} setData={setPelayananData} />;
      case 'komsel':
        return <Komsel onBack={() => setActiveMenu('dashboard')} />;
      
      // Commissions
      case 'komisi-sm':
        return <KomisiMember type="Pelayanan Anak & Remaja (SM)" onBack={() => setActiveMenu('dashboard')} />;
      case 'komisi-pemuda':
        return <KomisiMember type="Pelayanan Pemuda" onBack={() => setActiveMenu('dashboard')} />;
      case 'komisi-perkawan':
        return <KomisiMember type="Pelayanan Perempuan (Perkawan)" onBack={() => setActiveMenu('dashboard')} />;
      case 'komisi-perkarya':
        return <KomisiMember type="Pelayanan Laki-laki (Perkarya)" onBack={() => setActiveMenu('dashboard')} />;

      case 'talenta':
        return <Talenta data={talentaData} setData={setTalentaData} onBack={() => setActiveMenu('dashboard')} />;
      case 'keuangan':
        return <Keuangan onBack={() => setActiveMenu('dashboard')} data={keuanganData} setData={setKeuanganData} />;
      case 'aset':
        return <Aset onBack={() => setActiveMenu('dashboard')} />;
      
      case 'profile-user':
        return <ProfileUser adminInfo={adminInfo} setAdminInfo={setAdminInfo} onBack={() => setActiveMenu('dashboard')} />;
      case 'profile-gereja':
        return <ProfileGereja churchData={churchInfo} setChurchData={setChurchInfo} onBack={() => setActiveMenu('dashboard')} />;
      case 'users':
        return <Users onBack={() => setActiveMenu('dashboard')} />;
      case 'backup':
        return <BackupData onBack={() => setActiveMenu('dashboard')} />;
      
      case 'penyerahan': return <PenyerahanAnak onBack={() => setActiveMenu('dashboard')} />;
      case 'katekisasi': return <Katekisasi />;
      case 'baptisan': return <Baptisan onBack={() => setActiveMenu('dashboard')} />;
      case 'kedukaan': return <Kedukaan onBack={() => setActiveMenu('dashboard')} />;
      case 'konseling': return <Konseling onBack={() => setActiveMenu('dashboard')} />;
      
      case 'lap-ultah': return <LaporanUltah jemaatData={jemaatData} onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-usia': return <LaporanUsia jemaatData={jemaatData} onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-usia-filter': return <LaporanUsiaFilter jemaatData={jemaatData} onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-jk': return <LaporanGeneric type="Jenis Kelamin" jemaatData={jemaatData} churchInfo={churchInfo} onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-talenta': return <LaporanGeneric type="Talenta" jemaatData={jemaatData} churchInfo={churchInfo} onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-keluarga': return <LaporanGeneric type="Keluarga" jemaatData={jemaatData} churchInfo={churchInfo} onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-pelayanan': return <LaporanGeneric type="Pelayanan" jemaatData={jemaatData} churchInfo={churchInfo} onBack={() => setActiveMenu('dashboard')} />;
      case 'lap-ibadah': return <LaporanGeneric type="Ibadah" jemaatData={jemaatData} churchInfo={churchInfo} onBack={() => setActiveMenu('dashboard')} />;
      
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
    <div className="flex h-screen overflow-hidden bg-slate-100 font-inter">
      <aside className="hidden lg:block shrink-0">
        <Sidebar onSelect={handleMenuSelect} activeId={activeMenu} churchInfo={churchInfo} adminInfo={adminInfo} />
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header adminInfo={adminInfo} />
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300">
          {renderContent()}
          <footer className="p-6 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between items-center border-t border-slate-200 mt-auto bg-white/50">
            <span>Copyright &copy; 2024 <strong className="text-slate-500 font-bold">GEREJA KINGMI PAPUA</strong> | Era Sistem Media. All rights reserved.</span>
            <span className="mt-2 sm:mt-0 font-semibold text-rose-600 uppercase tracking-tighter">Sistem Informasi Gereja Version 2.0</span>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
