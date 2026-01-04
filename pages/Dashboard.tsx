
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
  MessageCircle
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';

const INITIAL_JEMAAT_DATA = [
  ['Agustina Siahaan', 'Rayon 1', 'Tetap', 'Wanita', '0812-3456-7890'],
  ['Budi Santoso', 'Rayon 3', 'Tetap', 'Pria', '0813-1111-2222'],
  ['Santi Maria', 'Rayon 2', 'Calon', 'Wanita', '0819-8888-7777'],
  ['Daud Wijaya', 'Rayon 1', 'Tetap', 'Pria', '0852-1234-5678'],
  ['Marta Zai', 'Rayon 3', 'Calon', 'Wanita', '0821-5555-4444'],
];

interface DashboardProps {
  onSelectMenu: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectMenu }) => {
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterRayon, setFilterRayon] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState<any[] | null>(null);

  const filteredJemaat = useMemo(() => {
    return INITIAL_JEMAAT_DATA.filter(row => {
      const statusMatch = filterStatus === 'Semua' || row[2] === filterStatus;
      const rayonMatch = filterRayon === 'Semua' || row[1] === filterRayon;
      return statusMatch && rayonMatch;
    });
  }, [filterStatus, filterRayon]);

  const stats = [
    { title: 'Jemaat', value: INITIAL_JEMAAT_DATA.length, color: 'gray', icon: <Users size={48} />, menuId: 'jemaat' },
    { title: 'Jadwal Ibadah', value: 5, color: 'green', icon: <Calendar size={48} />, menuId: 'jadwal' },
    { title: 'Daftar Pelayanan', value: 6, color: 'red', icon: <List size={48} />, menuId: 'pelayanan' },
    { title: 'Komisi', value: 4, color: 'yellow', icon: <UsersRound size={48} />, menuId: 'komisi' },
    { title: 'Penyerahan Anak', value: 4, color: 'slate', icon: <UserPlus size={48} />, menuId: 'penyerahan' },
    { title: 'Baptisan Air', value: 5, color: 'green', icon: <Droplets size={48} />, menuId: 'baptisan' },
    { title: 'Kedukaan', value: 2, color: 'yellow', icon: <Skull size={48} />, menuId: 'kedukaan' },
    { title: 'Konseling', value: 3, color: 'blue', icon: <MessageCircle size={48} />, menuId: 'konseling' },
    { title: 'Katekisasi', value: 12, color: 'teal', icon: <Star size={48} />, menuId: 'katekisasi' },
    { title: 'Aset Gereja', value: 8, color: 'gray', icon: <List size={48} />, menuId: 'aset' },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
           <TrendingUp className="text-blue-500" /> Dashboard SIM GEREJA
        </h1>
        <div className="text-sm text-slate-500 font-medium bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200">
          MAIN MENU / Dashboard
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

      {/* Dynamic Jemaat Table with Filters */}
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm font-bold uppercase tracking-wider">
            <Filter size={16} className="text-blue-500" /> Filter Jemaat:
          </div>
          <div className="flex gap-4 items-center">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-2 py-1.5 outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Semua">Status: Semua</option>
              <option value="Tetap">Tetap</option>
              <option value="Calon">Calon</option>
            </select>
            <select 
              value={filterRayon}
              onChange={(e) => setFilterRayon(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-2 py-1.5 outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Semua">Lingkungan: Semua</option>
              <option value="Rayon 1">Rayon 1</option>
              <option value="Rayon 2">Rayon 2</option>
              <option value="Rayon 3">Rayon 3</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataTable 
            title="Tabel Jemaat Baru" 
            headers={['Nama', 'Lingkungan', 'Status']} 
            data={filteredJemaat.map(r => [r[0], r[1], r[2]])}
            onViewDetails={(row) => {
              const fullData = INITIAL_JEMAAT_DATA.find(d => d[0] === row[0]);
              setSelectedItem(fullData || row);
            }}
          />
          <DataTable 
            title="Jadwal Ibadah Terdekat" 
            headers={['Ibadah', 'Waktu', 'Ruang']} 
            data={[
              ['Ibadah Raya 1', 'Minggu 08:00', 'Gereja'],
              ['Sekolah Minggu', 'Minggu 08:00', 'Aula'],
              ['Persekutuan Doa', 'Rabu 18:00', 'Gereja'],
            ]}
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Users size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">{selectedItem[0]}</h4>
                <p className="text-sm text-slate-500 font-medium">{selectedItem[2]} - {selectedItem[1]}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-slate-400 font-bold text-[10px] uppercase">Jenis Kelamin</p>
                <p className="font-semibold text-slate-700">{selectedItem[3] || '-'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-slate-400 font-bold text-[10px] uppercase">Telepon</p>
                <p className="font-semibold text-slate-700">{selectedItem[4] || '-'}</p>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-slate-400 font-bold text-[10px] uppercase">Catatan Pelayanan</p>
              <p className="text-slate-700 leading-relaxed italic">"Jemaat aktif dalam kegiatan Rayon dan rutin mengikuti ibadah minggu."</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
