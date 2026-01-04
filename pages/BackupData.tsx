
import React, { useState, useEffect } from 'react';
import { DownloadCloud, Database, Info } from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';

export const BackupData: React.FC<{ onBack: () => void }> = () => {
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    // Generate automatic backup filename like in screenshot: sigereja_13062023083246
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(2, '0');
    
    setFileName(`sigereja_${day}${month}${year}${hours}${minutes}${seconds}${milliseconds}`);
  }, []);

  const handleBackup = () => {
    alert(`Memulai proses backup ke direktori D:/sigereja dengan nama file ${fileName}. Silakan tunggu sebentar...`);
  };

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <TopStatsBar />

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2 uppercase tracking-tighter">
           <DownloadCloud className="text-blue-600" size={24} /> Backup Data
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          SETTINGS / <span className="text-blue-500">Backup Data</span>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 font-bold text-slate-600 bg-slate-50/30 text-sm">
          Backup Data
        </div>

        <div className="p-10 space-y-8 max-w-4xl">
          {/* Information Banner */}
          <div className="flex gap-4 p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
            <Info className="text-blue-500 shrink-0" size={20} />
            <p className="text-xs text-slate-600 leading-relaxed">
              Gunakan fitur ini untuk mencadangkan seluruh data sistem (Jemaat, Keuangan, Aset, dll) ke dalam storage eksternal. 
              Pastikan direktori tujuan tersedia dan dapat diakses oleh sistem.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-800 uppercase tracking-tight">Direktori Backup :</label>
              <div className="relative max-w-md">
                <input 
                  type="text" 
                  value="D:/sigereja" 
                  readOnly
                  className="w-full bg-slate-100 border border-slate-200 text-slate-500 px-3 py-2.5 rounded text-xs font-bold outline-none cursor-not-allowed"
                />
                <Database className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-800 uppercase tracking-tight">Nama File Backup :</label>
              <div className="max-w-md">
                <input 
                  type="text" 
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-600 px-3 py-2.5 rounded text-xs font-bold outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleBackup}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded text-xs font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center gap-2"
              >
                Backup
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info specifically for backup page */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
              <CheckCircle size={16} />
           </div>
           <div>
              <p className="text-[10px] font-bold text-emerald-600 uppercase">Status Sistem</p>
              <p className="text-xs font-bold text-slate-700">Database SI GEREJA Online & Siap di-backup</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const CheckCircle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
