
import React, { useState } from 'react';
import { 
  PieChart, ChevronDown, Search, Filter, RotateCcw
} from 'lucide-react';
import { TopStatsBar } from '../../components/TopStatsBar';

export const LaporanUsiaFilter: React.FC<{ onBack: () => void }> = () => {
  const [minAge, setMinAge] = useState('14');
  const [maxAge, setMaxAge] = useState('20');

  const dummyData = [
    { noJem: '000009', nama: 'Buana', alamat: 'Jl. Argopuro 4567', hp: '-', tgl: '12 November 2003', usia: '19 Tahun' },
  ];

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <TopStatsBar />

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <PieChart size={24} /> Laporan Jemaat - Usia (Filter)
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          LAPORAN / <span className="text-blue-500">Jemaat - Usia (Filter)</span>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-100 text-sm font-bold text-slate-600 bg-slate-50/30">
          Data Jemaat - Usia (Filter)
        </div>

        <div className="p-6 space-y-8">
          {/* Age Range Filter Section */}
          <div className="bg-white p-6 rounded border border-slate-100 shadow-sm flex flex-wrap items-center gap-4 max-w-4xl">
            <div className="flex items-center gap-4 flex-1">
              <label className="text-xs font-bold text-slate-700 whitespace-nowrap min-w-[100px]">Dari Usia</label>
              <input 
                type="text" 
                value={minAge}
                onChange={e => setMinAge(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-4 flex-1">
              <label className="text-xs font-bold text-slate-700 whitespace-nowrap">s/d</label>
              <input 
                type="text" 
                value={maxAge}
                onChange={e => setMaxAge(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button className="bg-amber-500 text-white px-4 py-2 rounded text-xs font-bold shadow-md hover:bg-amber-600 transition-all flex items-center gap-2">
                <RotateCcw size={14} /> Reset
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-xs font-bold shadow-md hover:bg-blue-700 transition-all flex items-center gap-2">
                <Filter size={14} /> Filter
              </button>
            </div>
          </div>

          {/* Table Area */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Show</span>
                <select className="border border-slate-300 rounded px-1 py-1 font-bold outline-none">
                  <option>10</option>
                </select>
                <span>entries</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {['Excel', 'PDF', 'CSV', 'Copy', 'Print'].map(btn => (
                  <button key={btn} className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white text-[10px] font-bold rounded shadow-sm transition-all">{btn}</button>
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

            <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
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
