
import React, { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, Filter, Printer } from 'lucide-react';
import { TopStatsBar } from '../../components/TopStatsBar';

export const LaporanKeuanganReport: React.FC<{ onBack: () => void }> = () => {
  const [dateRange, setDateRange] = useState('Bulan Ini');

  const summary = {
    saldoAwal: 25000000,
    totalMasuk: 45000000,
    totalKeluar: 12500000,
    saldoAkhir: 57500000
  };

  const formatCurrency = (amt: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amt);

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <TopStatsBar />

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <Wallet size={24} className="text-emerald-600" /> Laporan Keuangan Gereja
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          LAPORAN / <span className="text-blue-500">Keuangan</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Saldo Awal" value={formatCurrency(summary.saldoAwal)} color="text-slate-600" />
        <StatCard label="Total Pemasukan" value={formatCurrency(summary.totalMasuk)} color="text-emerald-600" icon={<TrendingUp size={16} />} />
        <StatCard label="Total Pengeluaran" value={formatCurrency(summary.totalKeluar)} color="text-rose-600" icon={<TrendingDown size={16} />} />
        <StatCard label="Saldo Akhir" value={formatCurrency(summary.saldoAkhir)} color="text-blue-600" isBold />
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <h2 className="text-sm font-bold text-slate-600">Buku Besar Kas (Rekapitulasi)</h2>
          <div className="flex gap-2">
             <select className="text-[11px] font-bold border border-slate-300 rounded px-2 py-1 outline-none bg-white">
                <option>Januari 2024</option>
                <option>Februari 2024</option>
             </select>
             <button className="bg-slate-700 text-white p-1.5 rounded hover:bg-slate-800"><Printer size={14}/></button>
          </div>
        </div>

        <div className="p-4">
           <table className="w-full text-[11px] text-left border border-slate-200">
              <thead className="bg-slate-50 font-bold text-slate-700 border-b border-slate-200">
                 <tr>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Keterangan</th>
                    <th className="px-4 py-3 text-right">Debit (Masuk)</th>
                    <th className="px-4 py-3 text-right">Kredit (Keluar)</th>
                    <th className="px-4 py-3 text-right">Saldo</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                 <tr>
                    <td className="px-4 py-3">01/01/2024</td>
                    <td className="px-4 py-3 font-bold">Saldo Awal Bulan</td>
                    <td className="px-4 py-3 text-right">-</td>
                    <td className="px-4 py-3 text-right">-</td>
                    <td className="px-4 py-3 text-right font-bold">{formatCurrency(summary.saldoAwal)}</td>
                 </tr>
                 <tr>
                    <td className="px-4 py-3">05/01/2024</td>
                    <td className="px-4 py-3">Persembahan Ibadah Raya 1</td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-bold">{formatCurrency(5500000)}</td>
                    <td className="px-4 py-3 text-right">-</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(30500000)}</td>
                 </tr>
                 <tr>
                    <td className="px-4 py-3">07/01/2024</td>
                    <td className="px-4 py-3">Biaya Listrik & Air</td>
                    <td className="px-4 py-3 text-right">-</td>
                    <td className="px-4 py-3 text-right text-rose-600 font-bold">{formatCurrency(1250000)}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(29250000)}</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, icon, isBold }: any) => (
  <div className="bg-white p-4 rounded border border-slate-200 shadow-sm">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">{icon} {label}</p>
    <p className={`text-sm ${isBold ? 'text-lg font-black' : 'font-bold'} ${color}`}>{value}</p>
  </div>
);
