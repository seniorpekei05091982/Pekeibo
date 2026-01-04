
import React, { useState } from 'react';
import { UsersRound, ChevronDown, Search, Printer, Filter, FileSpreadsheet, Home, Star, Heart, Briefcase, Users } from 'lucide-react';
import { TopStatsBar } from '../../components/TopStatsBar';

interface LaporanKomisiProps {
  type: string;
  onBack: () => void;
}

export const LaporanKomisi: React.FC<LaporanKomisiProps> = ({ type, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRayon, setFilterRayon] = useState('Semua Rayon');

  // Logic to determine icon based on type
  const getIcon = () => {
    if (type.includes('Anak')) return <Star size={24} className="text-amber-500" />;
    if (type.includes('Perempuan')) return <Heart size={24} className="text-rose-500" />;
    if (type.includes('Laki-laki')) return <Briefcase size={24} className="text-blue-500" />;
    return <Users size={24} className="text-slate-500" />;
  };

  // Sample dynamic data based on commission type
  const dummyData = [
    { no: 1, noJem: '000001', nama: 'Yunus Kogoya', jabatan: 'Ketua', gender: 'Laki-Laki', status: 'Aktif', rayon: 'Rayon 1 Abepura' },
    { no: 2, noJem: '000015', nama: 'Maria Gobai', jabatan: 'Sekretaris', gender: 'Perempuan', status: 'Aktif', rayon: 'Rayon 2 Sentani Waena' },
    { no: 3, noJem: '000022', nama: 'Petrus Tebai', jabatan: 'Bendahara', gender: 'Laki-Laki', status: 'Aktif', rayon: 'Rayon 1 Abepura' },
    { no: 4, noJem: '000045', nama: 'Siska Yeimo', jabatan: 'Anggota', gender: 'Perempuan', status: 'Non-Aktif', rayon: 'Rayon 2 Sentani Waena' },
  ];

  const filteredData = dummyData.filter(d => {
    const matchesSearch = d.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRayon = filterRayon === 'Semua Rayon' || d.rayon === filterRayon;
    return matchesSearch && matchesRayon;
  });

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <TopStatsBar />

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 transition-all shadow-sm"
          >
            <Home size={18} />
          </button>
          <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
            {getIcon()} Laporan Komisi - {type}
          </h1>
        </div>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-right">
          LAPORAN / <span className="text-blue-500">Komisi</span> / {type}
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 text-sm font-bold text-slate-600 bg-slate-50/50 flex justify-between items-center">
          <span className="uppercase tracking-tighter">Daftar Keanggotaan {type}</span>
          <div className="flex gap-2">
             <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-[10px] font-bold flex items-center gap-2 shadow-sm transition-all">
               <FileSpreadsheet size={14} /> Export Excel
             </button>
             <button className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1.5 rounded text-[10px] font-bold flex items-center gap-2 shadow-sm transition-all">
               <Printer size={14} /> Cetak Laporan
             </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Rayon:</span>
                <select 
                  value={filterRayon}
                  onChange={(e) => setFilterRayon(e.target.value)}
                  className="border border-slate-200 rounded px-2 py-1 font-bold outline-none text-[10px] bg-slate-50 cursor-pointer"
                >
                  <option>Semua Rayon</option>
                  <option>Rayon 1 Abepura</option>
                  <option>Rayon 2 Sentani Waena</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs w-full max-w-sm">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full border border-slate-300 rounded-full pl-9 pr-4 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none text-[11px] bg-slate-50" 
                  placeholder="Cari nama anggota..."
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto border rounded border-slate-200">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-tighter">
                <tr>
                  <th className="px-4 py-3 border-r border-slate-200 text-center w-12">#</th>
                  <th className="px-4 py-3 border-r border-slate-200">No. Jemaat</th>
                  <th className="px-4 py-3 border-r border-slate-200">Nama Anggota</th>
                  <th className="px-4 py-3 border-r border-slate-200">Jabatan</th>
                  <th className="px-4 py-3 border-r border-slate-200">Rayon Pelayanan</th>
                  <th className="px-4 py-3 border-r border-slate-200">Gender</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/20 transition-colors group">
                    <td className="px-4 py-3 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}.</td>
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-600">{item.noJem}</td>
                    <td className="px-4 py-3 border-r border-slate-200 font-bold text-slate-800 uppercase">{item.nama}</td>
                    <td className="px-4 py-3 border-r border-slate-200 font-medium text-blue-600 uppercase">{item.jabatan}</td>
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-600">{item.rayon}</td>
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-600">{item.gender}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{item.status}</span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-slate-400 italic">Data anggota komisi tidak ditemukan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
             <span>Menampilkan {filteredData.length} Anggota</span>
             <span className="text-blue-500 italic">SIM GEREJA KINGMI PAPUA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
