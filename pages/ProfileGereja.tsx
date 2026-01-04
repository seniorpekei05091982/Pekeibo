
import React, { useState } from 'react';
import { 
  Edit, ArrowLeft, RotateCcw, CheckCircle2, 
  Church, ChevronDown, Camera
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';

interface ChurchData {
  nama: string;
  alamat: string;
  telp: string;
  hp: string;
  email: string;
  gembala: string;
  keterangan: string;
  logo: string;
}

interface ProfileGerejaProps {
  churchData: ChurchData;
  setChurchData: React.Dispatch<React.SetStateAction<ChurchData>>;
  onBack: () => void;
}

export const ProfileGereja: React.FC<ProfileGerejaProps> = ({ churchData, setChurchData, onBack }) => {
  const [mode, setMode] = useState<'list' | 'edit'>('list');
  const [activeTab, setActiveTab] = useState('Data');
  const [tempData, setTempData] = useState(churchData);

  const handleSave = () => {
    setChurchData(tempData);
    setMode('list');
    alert('Informasi Gereja berhasil diperbarui dan disinkronkan ke seluruh sistem!');
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTempData({ ...tempData, logo: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const renderTopNav = (title: string, currentAction?: string) => (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <Church className="text-slate-800" size={28} />
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
      </div>
      <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest text-right flex-1">
        SETTINGS / <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => setMode('list')}>Profile Gereja</span> 
        {currentAction && <span className="text-slate-300"> / {currentAction}</span>}
      </div>
    </div>
  );

  if (mode === 'list') {
    return (
      <div className="p-6 space-y-4 animate-in fade-in duration-500">
        <TopStatsBar />
        {renderTopNav('Profil Gereja')}
        
        <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-sm font-bold text-slate-700">Identitas Resmi Gereja</h2>
          </div>

          <div className="p-4 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left border-collapse">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase tracking-tighter">
                  <tr>
                    <th className="px-3 py-3 border-r border-slate-200 text-center">Nama Gereja</th>
                    <th className="px-3 py-3 border-r border-slate-200 text-center">Alamat</th>
                    <th className="px-3 py-3 border-r border-slate-200 text-center">Telepon</th>
                    <th className="px-3 py-3 border-r border-slate-200 text-center">Email</th>
                    <th className="px-3 py-3 border-r border-slate-200 text-center">Logo</th>
                    <th className="px-3 py-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-3 py-6 border-r border-slate-200 text-center font-black text-slate-800 max-w-[200px] leading-tight">{churchData.nama}</td>
                    <td className="px-3 py-6 border-r border-slate-200 text-center text-slate-600">{churchData.alamat}</td>
                    <td className="px-3 py-6 border-r border-slate-200 text-center text-slate-600">{churchData.telp}</td>
                    <td className="px-3 py-6 border-r border-slate-200 text-center text-slate-600">{churchData.email}</td>
                    <td className="px-3 py-6 border-r border-slate-200 text-center">
                      <div className="w-16 h-16 rounded-full bg-white border-2 border-orange-500 shadow-sm mx-auto overflow-hidden p-1">
                         <img src={churchData.logo} alt="Logo" className="w-full h-full object-cover rounded-full" />
                      </div>
                    </td>
                    <td className="px-3 py-6 text-center">
                      <button 
                        onClick={() => { setTempData(churchData); setMode('edit'); }}
                        className="p-1.5 bg-amber-400 hover:bg-amber-500 text-white rounded shadow-sm transition-all"
                      >
                        <Edit size={14} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 animate-in slide-in-from-right-4 duration-300">
      <TopStatsBar />
      {renderTopNav('Edit Profil Gereja', 'Pembaruan Identitas')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700 uppercase">Form Pengaturan Profil Gereja</h2>
          <button onClick={() => setMode('list')} className="bg-slate-700 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2">
            <ArrowLeft size={14} /> Kembali
          </button>
        </div>

        <div className="p-10 max-w-6xl flex flex-col md:flex-row gap-12">
          {/* Logo Upload Section */}
          <div className="w-full md:w-64 shrink-0 flex flex-col items-center">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Logo Gereja</p>
             <div className="w-48 h-48 rounded-full border-4 border-slate-100 shadow-xl overflow-hidden relative group">
                <img src={tempData.logo} alt="Logo Preview" className="w-full h-full object-cover" />
                <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                   <Camera className="text-white mb-1" size={24} />
                   <span className="text-white text-[9px] font-bold uppercase">Unggah Logo</span>
                   <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                </label>
             </div>
             <p className="mt-4 text-[10px] text-slate-400 italic text-center leading-tight">Gunakan gambar resolusi tinggi (PNG/JPG) untuk hasil cetak laporan terbaik.</p>
          </div>

          <div className="flex-1">
            <div className="flex border-b border-slate-200 mb-8">
              <button onClick={() => setActiveTab('Data')} className={`px-6 py-2 text-xs font-bold rounded-t ${activeTab === 'Data' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>Data Inti</button>
              <button onClick={() => setActiveTab('Info')} className={`px-6 py-2 text-xs font-bold rounded-t ${activeTab === 'Info' ? 'bg-blue-600 text-white' : 'bg-slate-50/30 text-slate-500 opacity-60'}`}>Info Tambahan</button>
            </div>

            <div className="space-y-6">
              <FormField label="Nama Gereja" required>
                <input 
                  type="text" 
                  value={tempData.nama} 
                  onChange={e => setTempData({...tempData, nama: e.target.value})}
                  className="form-input font-bold text-slate-800" 
                  placeholder="Gereja Kemah Injil (KINGMI) Di Tanah Papua" 
                />
              </FormField>

              <FormField label="Alamat Resmi">
                <textarea 
                  rows={4} 
                  className="form-input" 
                  value={tempData.alamat} 
                  onChange={e => setTempData({...tempData, alamat: e.target.value})}
                ></textarea>
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Telepon Kantor">
                  <input type="text" className="form-input" value={tempData.telp} onChange={e => setTempData({...tempData, telp: e.target.value})} />
                </FormField>
                <FormField label="Email Resmi">
                  <input type="email" className="form-input" value={tempData.email} onChange={e => setTempData({...tempData, email: e.target.value})} />
                </FormField>
              </div>

              <FormField label="Nama Gembala / Pimpinan">
                <input type="text" className="form-input" value={tempData.gembala} onChange={e => setTempData({...tempData, gembala: e.target.value})} />
              </FormField>

              <div className="flex gap-2 pt-10 border-t border-slate-100">
                <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95">
                  <CheckCircle2 size={16} /> Simpan & Sinkronisasi
                </button>
                <button onClick={() => setTempData(churchData)} className="bg-slate-200 text-slate-600 px-8 py-2 rounded text-xs font-bold flex items-center gap-2">
                  <RotateCcw size={16} /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormField: React.FC<{ label: string; children: React.ReactNode; required?: boolean }> = ({ label, children, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-tighter">
      {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
    <div className="w-full">{children}</div>
  </div>
);
