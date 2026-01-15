
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, ArrowLeft, 
  CheckCircle2, Star, Home, User, AlertCircle
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';
import { Modal } from '../components/Modal';

interface TalentaMember {
  id: string;
  namaAnggota: string;
  nomerJemaat: string;
  bidangTalenta: string;
  tingkatKeahlian: 'Pemula' | 'Menengah' | 'Ahli';
  keterangan: string;
  tanggalInput: string;
}

interface TalentaProps {
  data: TalentaMember[];
  setData: React.Dispatch<React.SetStateAction<TalentaMember[]>>;
  onBack: () => void;
}

type ViewMode = 'list' | 'form';

export const Talenta: React.FC<TalentaProps> = ({ data, setData, onBack }) => {
  const [mode, setMode] = useState<ViewMode>('list');
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState<TalentaMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<TalentaMember>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.namaAnggota.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bidangTalenta.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.namaAnggota) newErrors.namaAnggota = 'Nama anggota wajib diisi';
    if (!formData.bidangTalenta) newErrors.bidangTalenta = 'Bidang talenta wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    setSelected(null);
    setFormData({ tingkatKeahlian: 'Pemula', keterangan: '-' });
    setErrors({});
    setIsEdit(false);
    setMode('form');
  };

  const handleEdit = (item: TalentaMember) => {
    setSelected(item);
    setFormData(item);
    setErrors({});
    setIsEdit(true);
    setMode('form');
  };

  const handleSave = () => {
    if (!validate()) return;

    if (isEdit && selected) {
      setData(data.map(item => item.id === selected.id ? { ...item, ...formData } as TalentaMember : item));
    } else {
      const newItem: TalentaMember = {
        ...(formData as TalentaMember),
        id: Date.now().toString(),
        tanggalInput: new Date().toLocaleDateString('id-ID')
      };
      setData([newItem, ...data]);
    }
    setMode('list');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus catatan talenta jemaat "${name}"? Tindakan ini tidak dapat dibatalkan.`)) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderListView = () => (
    <div className="p-8 min-h-full animate-in fade-in duration-500">
      <TopStatsBar />
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
        <div>
           <h1 className="text-4xl font-black tracking-tighter uppercase flex items-center gap-4">
             <Star className="text-amber-500" size={36} /> Manajemen Talenta Jemaat
           </h1>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2 ml-1">Pemetaan keahlian dan potensi anggota untuk pelayanan</p>
        </div>
        <button 
          onClick={handleAdd} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Plus size={20} /> Input Talenta Baru
        </button>
      </div>
      
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest">Database Bakat & Keahlian</h2>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-8 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/5" 
              placeholder="Cari nama anggota atau jenis talenta..." 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6 text-center w-20">#</th>
                <th className="px-8 py-6">Nama Anggota</th>
                <th className="px-8 py-6">Bidang Talenta</th>
                <th className="px-8 py-6 text-center">Level Keahlian</th>
                <th className="px-8 py-6">Keterangan</th>
                <th className="px-8 py-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.length > 0 ? filteredData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-all group">
                  <td className="px-8 py-8 text-center text-slate-300 font-bold">{idx + 1}</td>
                  <td className="px-8 py-8">
                    <div className="font-black text-slate-800 uppercase text-xs tracking-tight">{item.namaAnggota}</div>
                    <div className="text-[9px] text-blue-500 font-bold mt-1 uppercase">ID: {item.nomerJemaat}</div>
                  </td>
                  <td className="px-8 py-8">
                    <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{item.bidangTalenta}</span>
                  </td>
                  <td className="px-8 py-8 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      item.tingkatKeahlian === 'Ahli' ? 'bg-amber-100 text-amber-700' :
                      item.tingkatKeahlian === 'Menengah' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.tingkatKeahlian}
                    </span>
                  </td>
                  <td className="px-8 py-8 text-slate-500 text-[10px] leading-relaxed font-bold uppercase">{item.keterangan}</td>
                  <td className="px-8 py-8 text-center">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleEdit(item)} className="p-3 bg-white text-slate-400 rounded-2xl hover:bg-amber-500 hover:text-white transition-all shadow-sm border border-slate-100"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(item.id, item.namaAnggota)} className="p-3 bg-white text-slate-400 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm border border-slate-100"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-8 py-32 text-center text-slate-300 italic font-black text-xs uppercase tracking-[0.4em]">Belum ada data talenta yang diinput</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFormView = () => (
    <div className="p-10 bg-slate-50 min-h-full animate-in slide-in-from-right duration-500">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{isEdit ? 'Ubah' : 'Input'} Data Talenta Anggota</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Pastikan identitas anggota sudah terdaftar di database.</p>
        </div>
        <button onClick={() => setMode('list')} className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all hover:bg-blue-600 shadow-xl">
          <ArrowLeft size={20} /> Kembali ke Daftar
        </button>
      </div>
      
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl p-16 max-w-4xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <FormField label="Nama Anggota (Relasi Jemaat)" required error={errors.namaAnggota}>
              <div className="relative">
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.namaAnggota || ''} 
                  onChange={e => setFormData({...formData, namaAnggota: e.target.value})} 
                  placeholder="Ketik Nama Anggota..." 
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              </div>
           </FormField>
           
           <FormField label="ID Nomer Jemaat">
              <input type="text" className="form-input bg-slate-50" value={formData.nomerJemaat || ''} onChange={e => setFormData({...formData, nomerJemaat: e.target.value})} placeholder="000x" />
           </FormField>

           <FormField label="Bidang Talenta / Keahlian" required error={errors.bidangTalenta}>
              <select className="form-input" value={formData.bidangTalenta || ''} onChange={e => setFormData({...formData, bidangTalenta: e.target.value})}>
                <option value="">- Pilih Bidang -</option>
                <option value="Musik (Keyboard/Gitar/Drum)">Musik (Keyboard/Gitar/Drum)</option>
                <option value="Vokal (Singer/Worship Leader)">Vokal (Singer/Worship Leader)</option>
                <option value="Multimedia & Operator LCD">Multimedia & Operator LCD</option>
                <option value="Admin & Tata Usaha Gereja">Admin & Tata Usaha Gereja</option>
                <option value="Pengajaran (Guru Sekolah Minggu)">Pengajaran (Guru Sekolah Minggu)</option>
                <option value="Konstruksi & Teknik (Pemeliharaan)">Konstruksi & Teknik (Pemeliharaan)</option>
              </select>
           </FormField>

           <FormField label="Tingkat Keahlian">
              <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                 {['Pemula', 'Menengah', 'Ahli'].map(lvl => (
                   <button 
                     key={lvl} 
                     onClick={() => setFormData({...formData, tingkatKeahlian: lvl as any})}
                     className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${formData.tingkatKeahlian === lvl ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                   >
                     {lvl}
                   </button>
                 ))}
              </div>
           </FormField>
        </div>

        <FormField label="Keterangan Spesifik / Pengalaman">
          <textarea rows={5} className="form-input" value={formData.keterangan || ''} onChange={e => setFormData({...formData, keterangan: e.target.value})} placeholder="Contoh: Sertifikasi musik tingkat lanjut, Pengalaman pelayanan 5 tahun, dll."></textarea>
        </FormField>

        <div className="pt-10 border-t border-slate-50 flex justify-end gap-4">
           <button onClick={() => setMode('list')} className="px-10 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Batalkan</button>
           <button onClick={handleSave} className="px-16 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-4 shadow-2xl shadow-blue-500/20 active:scale-95 transition-all">
              <CheckCircle2 size={20} /> Simpan Data Talenta
           </button>
        </div>
      </div>

      <style>{`
        .form-input { 
          @apply w-full px-6 py-4 text-sm border border-slate-200 rounded-2xl bg-white text-slate-900 outline-none font-bold transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 placeholder:text-slate-300; 
        }
      `}</style>
    </div>
  );

  return (
    <div className="h-full">
      {mode === 'list' ? renderListView() : renderFormView()}
    </div>
  );
};

const FormField: React.FC<{ label: string; children: React.ReactNode; required?: boolean; error?: string }> = ({ label, children, required, error }) => (
  <div className="flex flex-col gap-3">
    <label className="text-[11px] font-black uppercase text-slate-500 tracking-[0.15em] ml-1 flex justify-between">
      <span>{label}{required && <span className="text-rose-500 ml-1">*</span>}</span>
      {error && <span className="text-rose-600 lowercase italic normal-case tracking-tight font-bold flex items-center gap-1"><AlertCircle size={10}/> {error}</span>}
    </label>
    <div className={`w-full ${error ? 'animate-shake' : ''}`}>{children}</div>
  </div>
);
