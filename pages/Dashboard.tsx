
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
  MessageCircle,
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
  keuanganData 
}) => {
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterRayon, setFilterRayon] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const filteredJemaat = useMemo(() => {
    return jemaatData.filter(row => {
      const statusMatch = filterStatus === 'Semua' || row.status === filterStatus;
      const rayonMatch = filterRayon === 'Semua' || row.komsel === filterRayon;
      return statusMatch && rayonMatch;
    });
  }, [jemaatData, filterStatus, filterRayon]);

  const stats = [
    { title: 'Jemaat', value: jemaatData.length, color: 'gray', icon: <Users size={48} />, menuId: 'jemaat' },
    { title: 'Jadwal Ibadah', value: jadwalData.length, color: 'green', icon: <Calendar size={48} />, menuId: 'jadwal' },
    { title: 'Daftar Pelayanan', value: pelayananData.length, color: 'red', icon: <List size={48} />, menuId: 'pelayanan' },
    { title: 'Komisi', value: 4, color: 'yellow', icon: <UsersRound size={48} />, menuId: 'komisi' },
    { title: 'Penyerahan Anak', value: 4, color: 'slate', icon: <UserPlus size={48} />, menuId: 'penyerahan' },
    { title: 'Baptisan Air', value: 5, color: 'green', icon: <Droplets size={48} />, menuId: 'baptisan' },
    { title: 'Kedukaan', value: 2, color: 'yellow', icon: <Skull size={48} />, menuId: 'kedukaan' },
    { title: 'Aset Gereja', value: asetData.length, color: 'gray', icon: <Box size={48} />, menuId: 'aset' },
  ];

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
           <TrendingUp className="text-blue-500" /> Dashboard
        </h1>
        <div className="text-xs text-slate-500 font-bold bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 uppercase tracking-wider">
          MAIN MENU / Dashboard
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors duration-500"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col items-start space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Selamat Datang</span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight uppercase tracking-tight">
            Gereja Kemah Injil (KINGMI) Di Tanah Papua
          </h3>
          <p className="text-xs md:text-sm font-bold text-blue-600/70 uppercase tracking-widest pt-2 border-t border-slate-100 w-full max-w-xl mt-1">
            Sistem Informasi Manajemen Gereja Terintegrasi
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {stats.map((s, idx) => (
          <StatCard 
            key={idx} 
            {...s} 
            onClick={() => onSelectMenu(s.menuId)}
          />
        ))}
      </div>

      {/* Dynamic Data Tables */}
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Filter size={14} className="text-blue-500" /> Filter Jemaat:
          </div>
          <div className="flex gap-4 items-center">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-[10px] font-black uppercase bg-slate-50 border border-slate-200 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 tracking-wider text-slate-600 cursor-pointer"
            >
              <option value="Semua">Status: Semua</option>
              <option value="Tetap">Tetap</option>
              <option value="Calon">Calon</option>
            </select>
            <select 
              value={filterRayon}
              onChange={(e) => setFilterRayon(e.target.value)}
              className="text-[10px] font-black uppercase bg-slate-50 border border-slate-200 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 tracking-wider text-slate-600 cursor-pointer"
            >
              <option value="Semua">Lingkungan: Semua</option>
              <option value="Petrus">Petrus</option>
              <option value="Paulus">Paulus</option>
              <option value="Abraham">Abraham</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataTable 
            title="Tabel Jemaat Baru" 
            headers={['Nama', 'Lingkungan', 'Status']} 
            data={filteredJemaat.slice(0, 5).map(r => [r.nama, r.komsel, r.status || 'Tetap'])}
            onViewDetails={(row) => {
              const fullData = jemaatData.find(d => d.nama === row[0]);
              setSelectedItem(fullData);
            }}
          />
          <DataTable 
            title="Jadwal Ibadah Terdekat" 
            headers={['Ibadah', 'Waktu', 'Ruang']} 
            data={jadwalData.slice(0, 5).map(j => [j.namaIbadah, `${j.hari} ${j.jamMulai.substring(0,5)}`, j.lokasi])}
          />
        </div>
      </div>

      <Modal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        title="Detail Jemaat"
      >
        {selectedItem && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 overflow-hidden">
                {selectedItem.foto ? <img src={selectedItem.foto} alt="Avatar" className="w-full h-full object-cover" /> : <Users size={32} />}
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">{selectedItem.nama}</h4>
                <p className="text-sm text-slate-500 font-medium">{selectedItem.nomerJemaat} - {selectedItem.komsel}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-slate-400 font-bold text-[10px] uppercase">Jenis Kelamin</p>
                <p className="font-semibold text-slate-700">{selectedItem.jenisKelamin || '-'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-slate-400 font-bold text-[10px] uppercase">Telepon</p>
                <p className="font-semibold text-slate-700">{selectedItem.nomerHP || '-'}</p>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-slate-400 font-bold text-[10px] uppercase">Alamat</p>
              <p className="text-slate-700 leading-relaxed italic">"{selectedItem.alamat || '-'}"</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
