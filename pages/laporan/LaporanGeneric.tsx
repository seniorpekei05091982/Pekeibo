
import React, { useState, useMemo } from 'react';
import { 
  Search, Star, PieChart, Users, ChevronDown, 
  FileSpreadsheet, FileText, Copy, Printer, Filter
} from 'lucide-react';
import { TopStatsBar } from '../../components/TopStatsBar';

interface JemaatData {
  id: string;
  nomerJemaat: string;
  nomerKeluarga: string;
  nama: string;
  alamat: string;
  jenisKelamin: string;
  nomerHP: string;
  talenta: string;
  pelayanan: string;
  statusKeluarga: string;
  rayon: string;
}

interface LaporanGenericProps {
  type: 'Talenta' | 'Pelayanan' | 'Ibadah' | 'Jenis Kelamin' | 'Keluarga' | 'Komsel';
  jemaatData: JemaatData[];
  churchInfo: { nama: string, logo: string };
  onBack: () => void;
}

export const LaporanGeneric: React.FC<LaporanGenericProps> = ({ type, jemaatData, churchInfo }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getHeaders = () => {
    switch (type) {
      case 'Talenta': return ['No.', 'Nomer Jemaat', 'Nama', 'Alamat', 'Nomer HP', 'Talenta'];
      case 'Pelayanan': return ['No.', 'Nomer Jemaat', 'Nama', 'Alamat', 'Nomer HP', 'Pelayanan'];
      case 'Ibadah': return ['No.', 'Nomer Jemaat', 'Nama', 'Alamat', 'Nomer HP', 'Rayon'];
      case 'Jenis Kelamin': return ['No.', 'Nomer Jemaat', 'Nama', 'Alamat', 'Nomer HP', 'Jenis Kelamin'];
      case 'Keluarga': return ['No.', 'Nomer Jemaat', 'Nomer Keluarga', 'Nama', 'Alamat', 'Nomer HP', 'Status Keluarga'];
      default: return ['No.', 'Nomer Jemaat', 'Nama', 'Alamat', 'Nomer HP', type];
    }
  };

  const filteredData = useMemo(() => {
    return jemaatData.filter(item => 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.nomerJemaat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jemaatData, searchTerm]);

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <TopStatsBar jemaatCount={jemaatData.length} />

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          {type === 'Talenta' ? <Star size={24} className="text-amber-500" /> : <PieChart size={24} className="text-blue-500" />} 
          Laporan Jemaat - {type}
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-right">
          {churchInfo.nama} <br/>
          <span className="text-blue-500">Laporan Jemaat - {type}</span>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-white">
               <img src={churchInfo.logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">Data Jemaat - {type}</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1.5 rounded text-[10px] font-bold flex items-center gap-2 transition-all shadow-sm">
              <Printer size={12} /> Cetak Laporan
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                className="w-full border border-slate-300 rounded-full pl-9 pr-4 py-1.5 text-xs outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50" 
                placeholder={`Cari jemaat di laporan ${type.toLowerCase()}...`}
              />
            </div>
            <div className="flex gap-1">
              {['Excel', 'PDF'].map(btn => (
                <button key={btn} className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white text-[10px] font-bold rounded shadow-sm transition-all">{btn}</button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse border border-slate-200">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase tracking-tight">
                <tr>
                  {getHeaders().map((h, i) => (
                    <th key={i} className={`px-4 py-3 border-r border-slate-200 ${i === 0 ? 'text-center w-10' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-4 py-3 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}</td>
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-600 font-medium">{item.nomerJemaat}</td>
                    {type === 'Keluarga' && <td className="px-4 py-3 border-r border-slate-200 text-blue-600 font-bold">{item.nomerKeluarga}</td>}
                    <td className="px-4 py-3 border-r border-slate-200 font-bold text-slate-800 uppercase">{item.nama}</td>
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-500 text-[10px] leading-tight">{item.alamat}</td>
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-600">{item.nomerHP}</td>
                    <td className="px-4 py-3 border-r border-slate-200 font-bold text-slate-700">
                      {type === 'Keluarga' ? item.statusKeluarga : 
                       type === 'Talenta' ? (item.talenta || '-') : 
                       type === 'Pelayanan' ? (item.pelayanan || '-') : 
                       type === 'Jenis Kelamin' ? item.jenisKelamin : 
                       type === 'Ibadah' ? item.rayon : '-'}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={getHeaders().length} className="px-4 py-10 text-center text-slate-400 italic font-medium">Data tidak ditemukan atau jemaat belum menginput {type.toLowerCase()}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
