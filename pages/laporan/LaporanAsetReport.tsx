
import React from 'react';
import { Box, Package, ClipboardList, Printer } from 'lucide-react';
import { TopStatsBar } from '../../components/TopStatsBar';

export const LaporanAsetReport: React.FC<{ onBack: () => void }> = () => {
  const assets = [
    { nama: 'Kursi Lipat Chitose', kode: 'AST-001', lokasi: 'Aula Utama', kondisi: 'Baik', jumlah: 150 },
    { nama: 'Sound System Yamaha', kode: 'AST-002', lokasi: 'Gereja', kondisi: 'Baik', jumlah: 1 },
    { nama: 'Proyektor Epson', kode: 'AST-003', lokasi: 'Ruang Rapat', kondisi: 'Rusak Ringan', jumlah: 2 },
  ];

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <TopStatsBar />

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <Box size={24} className="text-amber-600" /> Laporan Inventaris Aset
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          LAPORAN / <span className="text-blue-500">Aset</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded border border-slate-200 shadow-sm flex items-center justify-between">
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Jenis Aset</p>
              <p className="text-xl font-black text-slate-800">45 Item</p>
           </div>
           <Package className="text-blue-500 opacity-20" size={32} />
        </div>
        <div className="bg-white p-5 rounded border border-slate-200 shadow-sm flex items-center justify-between">
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Kondisi Baik</p>
              <p className="text-xl font-black text-emerald-600">42 Item</p>
           </div>
           <ClipboardList className="text-emerald-500 opacity-20" size={32} />
        </div>
        <div className="bg-white p-5 rounded border border-slate-200 shadow-sm flex items-center justify-between">
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Perlu Perbaikan</p>
              <p className="text-xl font-black text-rose-600">3 Item</p>
           </div>
           <ClipboardList className="text-rose-500 opacity-20" size={32} />
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-600 uppercase">Rekapitulasi Fisik Aset</h2>
          <button className="bg-slate-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-2"><Printer size={14}/> Print Rekap</button>
        </div>

        <div className="p-4">
           <table className="w-full text-[11px] text-left border-collapse border border-slate-200">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase">
                <tr>
                  <th className="px-4 py-3 border-r border-slate-200">Kode</th>
                  <th className="px-4 py-3 border-r border-slate-200">Nama Barang</th>
                  <th className="px-4 py-3 border-r border-slate-200">Lokasi</th>
                  <th className="px-4 py-3 border-r border-slate-200 text-center">Jumlah</th>
                  <th className="px-4 py-3 text-center">Kondisi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assets.map((a, i) => (
                  <tr key={i} className="hover:bg-amber-50/30 transition-colors">
                    <td className="px-4 py-3 border-r border-slate-200 font-mono text-blue-600 font-bold">{a.kode}</td>
                    <td className="px-4 py-3 border-r border-slate-200 font-bold">{a.nama}</td>
                    <td className="px-4 py-3 border-r border-slate-200">{a.lokasi}</td>
                    <td className="px-4 py-3 border-r border-slate-200 text-center font-bold">{a.jumlah}</td>
                    <td className="px-4 py-3 text-center">
                       <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${a.kondisi === 'Baik' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{a.kondisi}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};
