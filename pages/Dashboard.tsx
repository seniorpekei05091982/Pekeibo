
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Calendar, 
  List, 
  UsersRound, 
  Star, 
  UserPlus, 
  Droplets, 
  Heart, 
  Skull,
  TrendingUp,
  Filter,
  Box
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';

interface DashboardProps {
  onSelectMenu: (id: string) => void;
  jemaatData: any[];
  jadwalData: any[];
  pelayananData: any[];
  asetData: any[];
  keuanganData: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ 
  onSelectMenu, 
  jemaatData, 
  jadwalData, 
  pelayananData, 
  asetData,
}) => {
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterRayon, setFilterRayon] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const filteredJemaat = useMemo(() => {
    return jemaatData.filter(row => {
      const statusMatch = filterStatus === 'Semua' || row.status === filterStatus;
      const rayonMatch = filterRayon === 'Semua' || row.rayon === filterRayon;
      return statusMatch && rayonMatch;
    });
  }, [jemaatData, filterStatus, filterRayon]);

  const stats = [
    { title: 'Data Jemaat', value: jemaatData.length, color: 'blue', icon: <Users size={48} />, menuId: 'jemaat' },
    { title: 'Jadwal Ibadah', value: jadwalData.length, color: 'green', icon: <Calendar size={48} />, menuId: 'jadwal' },
    { title: 'Daftar Pelayan', value: pelayananData.length, color: 'red', icon: <List size={48} />, menuId: 'pelayanan' },
    { title: 'Jumlah Komisi', value: 4, color: 'yellow', icon: <UsersRound size={48} />, menuId: 'komisi' },
    { title: 'Aset Gereja', value: asetData.length, color: 'gray', icon: <Box size={48} />, menuId: 'aset' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3 uppercase">
           <TrendingUp className="text-blue-600" size={32} /> Beranda Utama
        </h1>
        <div className="text-[10px] text-slate-400 font-black bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 uppercase tracking-[0.2em]">
          Menu Utama / Beranda
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-slate-900 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group border-b-[12px] border-orange-500">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-start space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-12 bg-orange-500 rounded-full"></div>
            <span className="text-[11px] font-black text-orange-400 uppercase tracking-[0.4em]">Panel Kendali Sistem</span>
          </div>
          
          <h3 className="text-3xl md:text-5xl font-black text-white leading-none uppercase tracking-tighter">
            Gereja Kemah Injil (KINGMI) <br/><span className="text-blue-500">Di Tanah Papua</span>
          </h3>
          <p className="text-sm md:text-base font-bold text-slate-400 uppercase tracking-widest max-w-2xl leading-relaxed">
            Selamat datang di Sistem Informasi Manajemen Gereja Terintegrasi (SIM GEREJA PRO).
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {stats.map((s, idx) => (
          <StatCard 
            key={idx} 
            {...s} 
            onClick={() => onSelectMenu(s.menuId)}
          />
        ))}
      </div>

      {/* Dynamic Data Tables */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3 text-xs font-black text-slate-500 uppercase tracking-widest">
            <Filter size={16} className="text-blue-600" /> Filter Jemaat Cepat:
          </div>
          <div className="flex gap-4 items-center">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-[10px] font-black uppercase bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-500/5 tracking-wider text-slate-600 cursor-pointer shadow-inner"
            >
              <option value="Semua">Semua Status</option>
              <option value="Tetap">Jemaat Tetap</option>
              <option value="Calon">Calon Jemaat</option>
            </select>
            <select 
              value={filterRayon}
              onChange={(e) => setFilterRayon(e.target.value)}
              className="text-[10px] font-black uppercase bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-500/5 tracking-wider text-slate-600 cursor-pointer shadow-inner"
            >
              <option value="Semua">Semua Rayon</option>
              <option value="Rayon 1 Abepura">Rayon 1 Abepura</option>
              <option value="Rayon 2 Sentani Waena">Rayon 2 Sentani Waena</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DataTable 
            title="Pendaftaran Jemaat Terbaru" 
            headers={['Nama', 'Rayon', 'Status']} 
            data={filteredJemaat.slice(0, 5).map(r => [r.nama, r.rayon, r.status || 'Tetap'])}
            onViewDetails={(row) => {
              const fullData = jemaatData.find(d => d.nama === row[0]);
              setSelectedItem(fullData);
            }}
          />
          <DataTable 
            title="Jadwal Ibadah Minggu Ini" 
            headers={['Ibadah', 'Waktu', 'Lokasi']} 
            data={jadwalData.slice(0, 5).map(j => [j.namaIbadah, `${j.hari}, ${j.jamMulai.substring(0,5)}`, j.lokasi])}
          />
        </div>
      </div>

      <Modal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        title="Detail Ringkas Jemaat"
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-blue-600 overflow-hidden shadow-xl border-4 border-white">
                {selectedItem.foto ? <img src={selectedItem.foto} alt="Foto" className="w-full h-full object-cover" /> : <Users size={40} />}
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{selectedItem.nama}</h4>
                <p className="text-xs text-blue-600 font-black tracking-widest mt-1">ID: {selectedItem.nomerJemaat} • {selectedItem.rayon}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-slate-400 font-black text-[9px] uppercase tracking-widest mb-1">Jenis Kelamin</p>
                <p className="font-bold text-slate-800 text-sm">{selectedItem.jenisKelamin || '-'}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-slate-400 font-black text-[9px] uppercase tracking-widest mb-1">Nomor Telepon</p>
                <p className="font-bold text-slate-800 text-sm">{selectedItem.nomerHP || '-'}</p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl">
              <p className="text-slate-400 font-black text-[9px] uppercase tracking-widest mb-1">Alamat Terdaftar</p>
              <p className="text-slate-800 font-medium leading-relaxed italic">"{selectedItem.alamat || 'Alamat tidak tersedia'}"</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
