
import React, { useState } from 'react';
import { UsersRound, ChevronDown, Search } from 'lucide-react';
import { TopStatsBar } from '../../components/TopStatsBar';

interface LaporanKomisiProps {
  type: string;
  onBack: () => void;
}

export const LaporanKomisi: React.FC<LaporanKomisiProps> = ({ type }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const dummyData = [
    { no: 1, noJem: '000001', nama: 'Andi Pratama', jabatan: 'Ketua', gender: 'Laki-Laki', status: 'Aktif' },
    { no: 2, noJem: '000015', nama: 'Siska Amelia', jabatan: 'Sekretaris', gender: 'Perempuan', status: 'Aktif' },
    { no: 3, noJem: '000022', nama: 'Budi Santoso', jabatan: 'Anggota', gender: 'Laki-Laki', status: 'Non-Aktif' },
  ];

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <TopStatsBar />

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <UsersRound size={24} className="text-blue-600" /> Laporan Komisi - {type}
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          LAPORAN / <span className="text-blue-500">Komisi</span> / {type}
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-100 text-sm font-bold text-slate-600 bg-slate-50/30">
          Daftar Keanggotaan {type}
        </div>

        <div className="p-4 space-y-6">
          {/* Table Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Show</span>
              <select className="border border-slate-300 rounded px-1 py-1 font-bold outline-none"><option>10</option></select>
              <span>entries</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {['Excel', 'PDF', 'CSV', 'Print'].map(btn => (
                <button key={btn} className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white text-[10px] font-bold rounded transition-all shadow-sm">{btn}</button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-500">Search:</span>
              <input 
                type="text" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border border-slate-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none w-48" 
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse border border-slate-200">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase">
                <tr>
                  <th className="px-4 py-3 border-r border-slate-200 text-center w-10">No.</th>
                  <th className="px-4 py-3 border-r border-slate-200">No. Jemaat</th>
                  <th className="px-4 py-3 border-r border-slate-200">Nama Anggota</th>
                  <th className="px-4 py-3 border-r border-slate-200">Jabatan</th>
                  <th className="px-4 py-3 border-r border-slate-200">Gender</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dummyData.map((item) => (
                  <tr key={item.no} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 border-r border-slate-200 text-center font-medium text-slate-500">{item.no}.</td>
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-600">{item.noJem}</td>
                    <td className="px-4 py-3 border-r border-slate-200 font-bold text-slate-800 uppercase">{item.nama}</td>
                    <td className="px-4 py-3 border-r border-slate-200 font-medium text-blue-600">{item.jabatan}</td>
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-600">{item.gender}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
