
import React, { useState, useMemo } from 'react';
import { 
  PieChart, ChevronDown, Search, Printer
} from 'lucide-react';
import { TopStatsBar } from '../../components/TopStatsBar';

interface JemaatData {
  id: string;
  nomerJemaat: string;
  nama: string;
  alamat: string;
  nomerHP: string;
  tanggalLahir: string;
}

export const LaporanUltah: React.FC<{ jemaatData: JemaatData[], onBack: () => void }> = ({ jemaatData }) => {
  const [activeTab, setActiveTab] = useState('Bulan Ini');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = ['Hari Ini', 'Bulan Ini', 'Bulan Depan', 'Semua'];

  const calculateAge = (birthDateStr: string) => {
    if (!birthDateStr) return 0;
    const birthDate = new Date(birthDateStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const filteredData = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    
    return jemaatData.filter(item => {
      if (!item.tanggalLahir) return false;
      const bDate = new Date(item.tanggalLahir);
      const bMonth = bDate.getMonth();
      const bDay = bDate.getDate();

      let matchesPeriod = false;
      if (activeTab === 'Hari Ini') matchesPeriod = bMonth === currentMonth && bDay === currentDay;
      else if (activeTab === 'Bulan Ini') matchesPeriod = bMonth === currentMonth;
      else if (activeTab === 'Bulan Depan') matchesPeriod = bMonth === (currentMonth + 1) % 12;
      else if (activeTab === 'Semua') matchesPeriod = true;

      const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesPeriod && matchesSearch;
    });
  }, [jemaatData, activeTab, searchTerm]);

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <TopStatsBar jemaatCount={jemaatData.length} />

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <PieChart size={24} className="text-blue-500" /> Laporan Jemaat - Ulang Tahun
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          LAPORAN / <span className="text-blue-500">Jemaat - Ulang Tahun</span>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 text-sm font-bold text-slate-600 bg-slate-50/50 flex justify-between items-center">
          <span>Data Jemaat - Ulang Tahun</span>
          <button className="bg-slate-700 text-white px-3 py-1 rounded text-[10px] font-black uppercase flex items-center gap-2"><Printer size={12}/> Cetak</button>
        </div>

        <div className="p-4">
          <div className="flex bg-blue-600 p-0.5 rounded-sm mb-6 w-fit">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-[10px] font-black uppercase transition-all rounded-sm ${
                  activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4 px-2 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Cari nama..."
                  className="w-full border border-slate-300 rounded-full pl-9 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 outline-none bg-slate-50" 
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left border-collapse border border-slate-200">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase tracking-tight">
                  <tr>
                    <th className="px-4 py-3 border-r border-slate-200 text-center w-12">No.</th>
                    <th className="px-4 py-3 border-r border-slate-200">Nomer Jemaat</th>
                    <th className="px-4 py-3 border-r border-slate-200">Nama</th>
                    <th className="px-4 py-3 border-r border-slate-200">Alamat</th>
                    <th className="px-4 py-3 border-r border-slate-200">Nomer HP</th>
                    <th className="px-4 py-3 border-r border-slate-200">Tanggal Lahir</th>
                    <th className="px-4 py-3">Usia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.length > 0 ? filteredData.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-blue-50/20 transition-colors">
                      <td className="px-4 py-3 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}.</td>
                      <td className="px-4 py-3 border-r border-slate-200 text-slate-600 font-medium">{item.nomerJemaat}</td>
                      <td className="px-4 py-3 border-r border-slate-200 font-bold text-slate-800 uppercase">{item.nama}</td>
                      <td className="px-4 py-3 border-r border-slate-200 text-slate-500 text-[10px] leading-tight">{item.alamat}</td>
                      <td className="px-4 py-3 border-r border-slate-200 text-slate-600">{item.nomerHP}</td>
                      <td className="px-4 py-3 border-r border-slate-200 text-slate-600 font-medium">{item.tanggalLahir}</td>
                      <td className="px-4 py-3 text-blue-700 font-black">{calculateAge(item.tanggalLahir)} THN</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-slate-400 italic font-medium bg-slate-50/10">Tidak ada data jemaat yang berulang tahun dalam periode ini</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
