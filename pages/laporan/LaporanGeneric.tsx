
import React, { useState } from 'react';
import { 
  Search, Star, PieChart, Users, ChevronDown, 
  FileSpreadsheet, FileText, Copy, Printer, Filter
} from 'lucide-react';
import { TopStatsBar } from '../../components/TopStatsBar';

interface LaporanGenericProps {
  type: 'Talenta' | 'Pelayanan' | 'Ibadah' | 'Jenis Kelamin' | 'Keluarga' | 'Komsel';
  onBack: () => void;
}

export const LaporanGeneric: React.FC<LaporanGenericProps> = ({ type }) => {
  const [filterValue, setFilterValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Pre-defined headers based on type (matching screenshots)
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

  const getOptions = () => {
    switch (type) {
      case 'Talenta': return ['Menyanyi', 'Memasak', 'Multimedia', 'Main Musik', 'Tamborin'];
      case 'Pelayanan': return ['Singer', 'Penerima Tamu', 'Song Leader', 'Pemusik', 'Kolektan'];
      case 'Ibadah': return ['Ibadah Raya 1', 'Ibadah Raya 2', 'Ibadah Raya 3', 'Doa Pagi', 'Doa Malam'];
      case 'Jenis Kelamin': return ['Laki-Laki', 'Perempuan'];
      default: return [];
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
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          LAPORAN / <span className="text-blue-500">Jemaat - {type}</span>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-100 text-sm font-bold text-slate-600 bg-slate-50/30">
          Data Jemaat - {type}
        </div>

        <div className="p-4 space-y-6">
          {/* Filter Section */}
          <div className="bg-white p-6 rounded border border-slate-100 shadow-sm flex items-center gap-4 max-w-2xl">
            <label className="text-xs font-bold text-slate-700 whitespace-nowrap min-w-[100px]">
              {type === 'Keluarga' ? 'Nomer Keluarga' : type}
            </label>
            {type === 'Keluarga' ? (
              <input 
                type="text" 
                className="flex-1 border border-slate-300 rounded px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="000002"
              />
            ) : (
              <select className="flex-1 border border-slate-300 rounded px-3 py-1.5 text-xs outline-none bg-white">
                <option value="">Pilih {type}</option>
                {getOptions().map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            )}
            <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-xs font-bold shadow-md hover:bg-blue-700 transition-all flex items-center gap-2">
              Tampilkan Data
            </button>
          </div>

          {/* Table Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Show</span>
              <select className="border border-slate-300 rounded px-1 py-1 font-bold outline-none">
                <option>10</option><option>25</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {['Excel', 'PDF', 'CSV', 'Copy', 'Print'].map(btn => (
                <button key={btn} className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white text-[10px] font-bold rounded transition-all shadow-sm">{btn}</button>
              ))}
              <button className="px-3 py-1 bg-slate-600 text-white text-[10px] font-bold rounded flex items-center gap-1">Column visibility <ChevronDown size={10} /></button>
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
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold">
                <tr>
                  {getHeaders().map((h, i) => (
                    <th key={i} className={`px-4 py-3 border-r border-slate-200 ${i === 0 ? 'text-center w-10' : ''}`}>
                      {h}
                    </th>
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

          <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
            <p>Showing 1 to {dummyData.length} of {dummyData.length} entries</p>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 border border-slate-200 rounded opacity-50 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded font-bold">1</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded opacity-50 cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
