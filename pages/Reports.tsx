
import React, { useState } from 'react';
import { 
  FileBarChart, Printer, FileText, FileSpreadsheet, 
  Filter, Calendar, Search, ArrowLeft, Download, Eye, Home
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';

type ReportType = 'Jemaat' | 'Talenta' | 'Keuangan' | 'Aset' | 'Komisi';

export const Reports: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [reportType, setReportType] = useState<ReportType>('Jemaat');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 1000);
  };

  const renderFilterSection = () => (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-10 space-y-8 animate-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
         <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg"><Filter size={20} /></div>
         <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Konfigurasi Laporan</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Tentukan parameter data yang ingin Anda ekspor</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tipe Laporan Utama</label>
           <select 
             value={reportType} 
             onChange={(e) => setReportType(e.target.value as ReportType)}
             className="w-full px-5 py-4 text-sm border border-slate-200 rounded-2xl outline-none font-bold focus:border-blue-500 bg-slate-50 transition-all"
           >
             <option value="Jemaat">Laporan Database Jemaat</option>
             <option value="Talenta">Laporan Bakat & Talenta</option>
             <option value="Keuangan">Laporan Arus Kas Keuangan</option>
             <option value="Aset">Laporan Inventaris Aset</option>
             <option value="Komisi">Laporan Anggota Komisi</option>
           </select>
        </div>

        <div className="space-y-2">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Rentang Awal</label>
           <div className="relative">
              <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} className="w-full px-5 py-4 text-sm border border-slate-200 rounded-2xl outline-none font-bold focus:border-blue-500 bg-slate-50" />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
           </div>
        </div>

        <div className="space-y-2">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Rentang Akhir</label>
           <div className="relative">
              <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} className="w-full px-5 py-4 text-sm border border-slate-200 rounded-2xl outline-none font-bold focus:border-blue-500 bg-slate-50" />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
           </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
         <button 
           onClick={handleGenerate}
           disabled={isGenerating}
           className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-3"
         >
           {isGenerating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Eye size={18} />}
           Tampilkan Laporan
         </button>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
       <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100"><FileText size={28} /></div>
             <div>
                <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">Pratinjau: Laporan {reportType}</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Dihasilkan pada {new Date().toLocaleString('id-ID')}</p>
             </div>
          </div>
          <div className="flex gap-2">
             <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50 transition-all"><Printer size={16} /> Cetak</button>
             <button className="bg-emerald-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all"><FileSpreadsheet size={16} /> Excel</button>
             <button className="bg-rose-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-rose-500/20 hover:bg-rose-700 transition-all"><FileText size={16} /> PDF</button>
          </div>
       </div>

       <div className="overflow-x-auto">
          <table className="w-full text-left">
             <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <tr>
                   <th className="px-8 py-6 text-center w-20">#</th>
                   <th className="px-8 py-6">ID Referensi</th>
                   <th className="px-8 py-6">Nama / Keterangan</th>
                   <th className="px-8 py-6">Kategori</th>
                   <th className="px-8 py-6 text-right">Nilai / Status</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-50 text-xs font-bold text-slate-600">
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-all">
                     <td className="px-8 py-6 text-center text-slate-300">{i}</td>
                     <td className="px-8 py-6 text-blue-600 tracking-widest">REP-000{i}-2024</td>
                     <td className="px-8 py-6 font-black text-slate-800 uppercase tracking-tight">Data Transaksi {reportType} Ke-{i}</td>
                     <td className="px-8 py-6 uppercase">{reportType} Utama</td>
                     <td className="px-8 py-6 text-right font-black uppercase text-slate-900">Rp 150.000,00</td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
       <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Halaman 1 dari 1 - Dokumen Resmi Gereja Kingmi Papua</p>
       </div>
    </div>
  );

  return (
    <div className="p-8 space-y-10 min-h-full">
      <TopStatsBar />
      
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-4">
        <div>
           <h1 className="text-4xl font-black tracking-tighter uppercase flex items-center gap-4">
             <div className="p-4 bg-orange-600 rounded-[2rem] text-white shadow-2xl shadow-orange-500/20"><FileBarChart size={32} /></div>
             Pusat Laporan Strategis
           </h1>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-3 ml-2">Modul Pelaporan Terintegrasi untuk Seluruh Departemen</p>
        </div>
        <button 
          onClick={onBack}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all hover:bg-blue-600 shadow-xl"
        >
          <Home size={18} /> Beranda Dashboard
        </button>
      </div>

      {renderFilterSection()}
      {showResults && renderResults()}
    </div>
  );
};
