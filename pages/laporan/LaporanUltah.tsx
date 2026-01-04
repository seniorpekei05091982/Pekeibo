
import React, { useState } from 'react';
import { 
  PieChart, ChevronDown, Search
} from 'lucide-react';
import { TopStatsBar } from '../../components/TopStatsBar';

export const LaporanUltah: React.FC<{ onBack: () => void }> = () => {
  const [activeTab, setActiveTab] = useState('Hari Ini');

  const tabs = ['Hari Ini', '7 Hari', 'Bulan Ini', 'Bulan Depan'];

  const dummyData = [
    { noJem: '000019', nama: 'Buana', alamat: 'Jl. Tambaksari', hp: '081987654321', tgl: '10 Juni 1989', usia: '34' },
    { noJem: '000020', nama: 'Amir', alamat: 'Jl. Rungkut Mejoyo 12345', hp: '08901234567', tgl: '10 Juni 1970', usia: '53' },
  ];

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <TopStatsBar />

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <PieChart size={24} /> Laporan Jemaat - Ulang Tahun
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          LAPORAN / <span className="text-blue-500">Jemaat - Ulang Tahun</span>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-100 text-sm font-bold text-slate-600 bg-slate-50/30">
          Data Jemaat - Ulang Tahun
        </div>

        <div className="p-4">
          {/* Tab Menu */}
          <div className="flex bg-blue-600 p-0.5 rounded-sm mb-8 w-fit">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-xs font-bold transition-all rounded-sm ${
                  activeTab === tab ? 'bg-white text-blue-600' : 'text-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <h2 className="text-lg font-bold text-slate-700 mb-6 px-2">Data Jemaat yang Berulang Tahun {activeTab}</h2>

          <div className="space-y-4 px-2 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Show</span>
                <select className="border border-slate-300 rounded px-1 py-1 font-bold outline-none">
                  <option>10</option>
                </select>
                <span>entries</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {['Excel', 'PDF', 'CSV', 'Copy', 'Print'].map(btn => (
                  <button key={btn} className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white text-[10px] font-bold rounded shadow-sm">{btn}</button>
                ))}
                <button className="px-3 py-1 bg-slate-600 text-white text-[10px] font-bold rounded flex items-center gap-1">Column visibility <ChevronDown size={10} /></button>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-500">Search:</span>
                <input type="text" className="border border-slate-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none w-48" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left border-collapse border border-slate-200">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold">
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
                  {dummyData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-4 py-3 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}.</td>
                      <td className="px-4 py-3 border-r border-slate-200 text-slate-600">{item.noJem}</td>
                      <td className="px-4 py-3 border-r border-slate-200 font-bold text-slate-800">{item.nama}</td>
                      <td className="px-4 py-3 border-r border-slate-200 text-slate-600">{item.alamat}</td>
                      <td className="px-4 py-3 border-r border-slate-200 text-slate-600">{item.hp}</td>
                      <td className="px-4 py-3 border-r border-slate-200 text-slate-600 font-medium">{item.tgl}</td>
                      <td className="px-4 py-3 text-slate-700 font-bold">{item.usia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="pt-4 flex justify-between items-center text-xs text-slate-500">
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
    </div>
  );
};
