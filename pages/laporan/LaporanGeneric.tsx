
import React, { useState } from 'react';
import { 
  Search, Star, PieChart, Users, ChevronDown, 
  FileSpreadsheet, FileText, Copy, Printer, Filter
} from 'lucide-react';
import { TopStatsBar } from '../../components/TopStatsBar';

interface LaporanGenericProps {
  type: 'Talenta' | 'Pelayanan' | 'Ibadah' | 'Jenis Kelamin' | 'Keluarga' | 'Komsel';
  churchInfo: { nama: string, logo: string };
  onBack: () => void;
}

export const LaporanGeneric: React.FC<LaporanGenericProps> = ({ type, churchInfo }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getHeaders = () => {
    switch (type) {
      case 'Talenta': return ['No.', 'Nomer Jemaat', 'Nama', 'Alamat', 'Nomer HP', 'Talenta'];
      case 'Pelayanan': return ['No.', 'Nomer Jemaat', 'Nama', 'Alamat', 'Nomer HP', 'Pelayanan'];
      case 'Ibadah': return ['No.', 'Nomer Jemaat', 'Nama', 'Alamat', 'Nomer HP', 'Ibadah'];
      case 'Jenis Kelamin': return ['No.', 'Nomer Jemaat', 'Nama', 'Alamat', 'Nomer HP', 'Jenis Kelamin'];
      case 'Keluarga': return ['No.', 'Nomer Jemaat', 'Nomer Keluarga', 'Nama', 'Alamat', 'Nomer HP', 'Hubungan Keluarga'];
      default: return ['No.', 'Nomer Jemaat', 'Nama', 'Alamat', 'Nomer HP', type];
    }
  };

  const dummyData = [
    { id: '1', noJem: '000001', noKel: '000002', nama: 'Doddy A', alamat: 'Jl. Semarang 1234, Surabaya', hp: '0812345679', extra: type === 'Keluarga' ? 'Suami' : 'Menyanyi' },
    { id: '2', noJem: '000015', noKel: '000002', nama: 'Ana', alamat: 'Jl. Semarang 1234, Surabaya', hp: '-', extra: type === 'Keluarga' ? 'Istri' : 'Singer' },
  ];

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <TopStatsBar />

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          {type === 'Talenta' ? <Star size={24} /> : <PieChart size={24} />} 
          Laporan Jemaat - {type}
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-right">
          {churchInfo.nama} <br/>
          <span className="text-blue-500">Laporan Jemaat - {type}</span>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
               <img src={churchInfo.logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold text-slate-600 uppercase">Data Jemaat - {type}</span>
          </div>
          <button className="bg-slate-700 text-white px-3 py-1 rounded text-[10px] font-bold flex items-center gap-2">
            <Printer size={12} /> Cetak Laporan
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-500">Search:</span>
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="border border-slate-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none w-48" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse border border-slate-200">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold">
                <tr>
                  {getHeaders().map((h, i) => (
                    <th key={i} className={`px-4 py-3 border-r border-slate-200 ${i === 0 ? 'text-center w-10' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dummyData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}</td>
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-600">{item.noJem}</td>
                    {type === 'Keluarga' && <td className="px-4 py-3 border-r border-slate-200 text-slate-600">{item.noKel}</td>}
                    <td className="px-4 py-3 border-r border-slate-200 font-bold text-slate-800">{item.nama}</td>
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-600">{item.alamat}</td>
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-600">{item.hp}</td>
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-600 font-medium">{item.extra}</td>
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
