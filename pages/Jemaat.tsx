
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, ArrowLeft, 
  User, MapPin, Phone, Mail, Calendar, 
  // Added Droplets to lucide-react imports
  Users, CheckCircle2, RotateCcw, Camera, Home, Heart, ShieldCheck, Star, Briefcase, Filter, AlertCircle, Upload, Droplets
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';

interface JemaatData {
  id: string;
  nomerJemaat: string;
  nomerKeluarga: string;
  nama: string;
  alamat: string;
  jenisKelamin: 'Laki-Laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string;
  nomerHP: string;
  rayon: string;
  foto?: string;
  statusKeluarga: string;
  statusKawin: string;
  status: string;
  baptis: 'Belum' | 'Sudah';
  pendetaBaptis?: string;
  tempatBaptis?: string;
  pelayanan?: string;
  talenta?: string;
  tanggalBergabung?: string;
}

interface JemaatProps {
  menuId: string;
  onBack: () => void;
  churchInfo: { nama: string, logo: string, alamat: string, telp: string };
  data: JemaatData[];
  setData: React.Dispatch<React.SetStateAction<JemaatData[]>>;
}

export const Jemaat: React.FC<JemaatProps> = ({ menuId, onBack, churchInfo, data, setData }) => {
  const [mode, setMode] = useState<'list' | 'add' | 'edit' | 'detail' | 'print'>('list');
  const [selected, setSelected] = useState<JemaatData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [filterRayon, setFilterRayon] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const [formData, setFormData] = useState<Partial<JemaatData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.nomerJemaat.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRayon = filterRayon === 'Semua' || item.rayon === filterRayon;
      const matchesStatus = filterStatus === 'Semua' || item.status === filterStatus;
      
      return matchesSearch && matchesRayon && matchesStatus;
    });
  }, [data, searchTerm, filterRayon, filterStatus]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, foto: event.target?.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (!formData.nama) {
      setErrors({ nama: 'Nama lengkap wajib diisi' });
      return;
    }

    if (mode === 'add') {
      const newItem: JemaatData = {
        id: Date.now().toString(),
        nama: formData.nama || '',
        nomerJemaat: formData.nomerJemaat || '',
        nomerKeluarga: formData.nomerKeluarga || '',
        alamat: formData.alamat || '',
        jenisKelamin: formData.jenisKelamin as any || 'Laki-Laki',
        tempatLahir: formData.tempatLahir || '',
        tanggalLahir: formData.tanggalLahir || '',
        nomerHP: formData.nomerHP || '',
        rayon: formData.rayon || 'Rayon 1 Abepura',
        statusKeluarga: formData.statusKeluarga || 'Kepala Keluarga',
        statusKawin: formData.statusKawin || 'Belum',
        baptis: formData.baptis || 'Belum',
        pendetaBaptis: formData.pendetaBaptis || '',
        tempatBaptis: formData.tempatBaptis || '',
        pelayanan: formData.pelayanan || '',
        talenta: formData.talenta || '',
        status: formData.status || 'Tetap',
        tanggalBergabung: formData.tanggalBergabung || '',
        foto: formData.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.nama || '')}&background=random`
      };
      setData([newItem, ...data]);
    } else if (mode === 'edit' && selected) {
      setData(data.map(item => item.id === selected.id ? { ...item, ...formData } as JemaatData : item));
    }
    
    setMode('list');
    setFormData({});
    setErrors({});
  };

  // Added handleDelete implementation
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data jemaat "${name}"?`)) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const renderFormView = () => (
    <div className="p-8 bg-slate-50 min-h-full animate-in slide-in-from-right duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-xl">
              {mode === 'add' ? <Plus size={24} /> : <Edit size={24} />}
            </div>
            {mode === 'add' ? 'Registrasi Jemaat Baru' : 'Ubah Data Jemaat'}
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 ml-16">Silakan lengkapi data jemaat secara berurutan di bawah ini.</p>
        </div>
        <button onClick={() => { setMode('list'); setErrors({}); }} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm">
          <ArrowLeft size={16} /> Kembali ke Daftar
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-8 pb-20">
        {/* BAGIAN 1: IDENTITAS & FOTO */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><User size={16} /></div>
             <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Identitas Dasar & Foto</h3>
          </div>
          <div className="p-10 flex flex-col md:flex-row gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="w-48 h-48 rounded-[2.5rem] bg-slate-100 border-4 border-white shadow-2xl overflow-hidden relative">
                  {formData.foto ? (
                    <img src={formData.foto} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                      <User size={64} />
                      <span className="text-[9px] font-black uppercase mt-2">Belum Ada Foto</span>
                    </div>
                  )}
                  <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 backdrop-blur-sm">
                    <Camera className="text-white mb-2" size={32} />
                    <span className="text-white text-[9px] font-black uppercase tracking-widest">Unggah Foto</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg border-4 border-white">
                  <Upload size={20} />
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Nama Lengkap Jemaat" required error={errors.nama}>
                <input type="text" className="form-input" value={formData.nama || ''} onChange={e => setFormData({...formData, nama: e.target.value})} placeholder="Masukkan Nama Lengkap" />
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Nomer Jemaat">
                  <input type="text" className="form-input" value={formData.nomerJemaat || ''} onChange={e => setFormData({...formData, nomerJemaat: e.target.value})} placeholder="0001" />
                </FormField>
                <FormField label="Nomer Keluarga (KK)">
                  <input type="text" className="form-input" value={formData.nomerKeluarga || ''} onChange={e => setFormData({...formData, nomerKeluarga: e.target.value})} placeholder="0001" />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Tempat Lahir">
                  <input type="text" className="form-input" value={formData.tempatLahir || ''} onChange={e => setFormData({...formData, tempatLahir: e.target.value})} placeholder="Kota Kelahiran" />
                </FormField>
                <FormField label="Tanggal Lahir">
                  <input type="date" className="form-input" value={formData.tanggalLahir || ''} onChange={e => setFormData({...formData, tanggalLahir: e.target.value})} />
                </FormField>
              </div>
              <FormField label="Jenis Kelamin">
                <select className="form-input" value={formData.jenisKelamin || 'Laki-Laki'} onChange={e => setFormData({...formData, jenisKelamin: e.target.value as any})}>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </FormField>
            </div>
          </div>
        </div>

        {/* BAGIAN 2: DATA KEANGGOTAAN */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"><ShieldCheck size={16} /></div>
             <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Informasi Keanggotaan</h3>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField label="Rayon Pelayanan">
              <select className="form-input" value={formData.rayon || 'Rayon 1 Abepura'} onChange={e => setFormData({...formData, rayon: e.target.value})}>
                <option value="Rayon 1 Abepura">Rayon 1 Abepura</option>
                <option value="Rayon 2 Sentani Waena">Rayon 2 Sentani Waena</option>
              </select>
            </FormField>
            <FormField label="Status Keanggotaan">
              <select className="form-input" value={formData.status || 'Tetap'} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="Tetap">Jemaat Tetap</option>
                <option value="Calon">Calon Jemaat</option>
              </select>
            </FormField>
            <FormField label="Tanggal Registrasi">
              <input type="date" className="form-input" value={formData.tanggalBergabung || ''} onChange={e => setFormData({...formData, tanggalBergabung: e.target.value})} />
            </FormField>
          </div>
        </div>

        {/* BAGIAN 3: KONTAK & STATUS KELUARGA */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center"><Heart size={16} /></div>
             <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Kontak & Keluarga</h3>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <FormField label="Nomer HP / WhatsApp">
                <input type="text" className="form-input" value={formData.nomerHP || ''} onChange={e => setFormData({...formData, nomerHP: e.target.value})} placeholder="08xxxxxxxxxx" />
              </FormField>
              <FormField label="Alamat Domisili Sekarang">
                <textarea rows={3} className="form-input" value={formData.alamat || ''} onChange={e => setFormData({...formData, alamat: e.target.value})} placeholder="Alamat Lengkap"></textarea>
              </FormField>
            </div>
            <div className="space-y-6">
              <FormField label="Status Pernikahan">
                <select className="form-input" value={formData.statusKawin || 'Belum'} onChange={e => setFormData({...formData, statusKawin: e.target.value})}>
                  {['Belum Menikah', 'Menikah', 'Duda', 'Janda', 'Cerai'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </FormField>
              <FormField label="Hubungan Dalam Keluarga">
                <select className="form-input" value={formData.statusKeluarga || 'Kepala Keluarga'} onChange={e => setFormData({...formData, statusKeluarga: e.target.value})}>
                  {['Kepala Keluarga', 'Istri', 'Anak', 'Famili Lain'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </FormField>
            </div>
          </div>
        </div>

        {/* BAGIAN 4: DATA ROHANI */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><Droplets size={16} /></div>
             <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Informasi Rohani</h3>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <FormField label="Status Baptis Air">
                <select className="form-input" value={formData.baptis || 'Belum'} onChange={e => setFormData({...formData, baptis: e.target.value as any})}>
                  <option value="Belum">Belum Dibaptis</option>
                  <option value="Sudah">Sudah Dibaptis</option>
                </select>
              </FormField>
              {formData.baptis === 'Sudah' && (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-4 animate-in fade-in">
                  <FormField label="Nama Pendeta Pembaptis">
                    <input type="text" className="form-input bg-white" value={formData.pendetaBaptis || ''} onChange={e => setFormData({...formData, pendetaBaptis: e.target.value})} placeholder="Nama Pendeta" />
                  </FormField>
                  <FormField label="Tempat Dibaptis">
                    <input type="text" className="form-input bg-white" value={formData.tempatBaptis || ''} onChange={e => setFormData({...formData, tempatBaptis: e.target.value})} placeholder="Gereja/Lokasi" />
                  </FormField>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <FormField label="Bidang Pelayanan">
                <input type="text" className="form-input" value={formData.pelayanan || ''} onChange={e => setFormData({...formData, pelayanan: e.target.value})} placeholder="Contoh: Majelis, Multimedia, Musik" />
              </FormField>
              <FormField label="Bakat / Talenta">
                <input type="text" className="form-input" value={formData.talenta || ''} onChange={e => setFormData({...formData, talenta: e.target.value})} placeholder="Contoh: Bermain Alat Musik, Menyanyi" />
              </FormField>
            </div>
          </div>
        </div>

        {/* TOMBOL AKSI */}
        <div className="flex justify-end gap-4">
           <button onClick={() => setMode('list')} className="px-10 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">Batalkan</button>
           <button onClick={handleSave} className="px-16 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-4 shadow-2xl shadow-blue-500/20 transition-all active:scale-95">
              <CheckCircle2 size={20} /> Simpan Seluruh Data
           </button>
        </div>
      </div>

      <style>{`
        .form-input { 
          @apply w-full px-5 py-4 text-sm border border-slate-200 rounded-2xl bg-white text-slate-900 outline-none font-bold transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 placeholder:text-slate-300; 
        }
      `}</style>
    </div>
  );

  const renderListView = () => (
    <div className="p-8 bg-slate-50 min-h-full">
      <TopStatsBar jemaatCount={data.length} />
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-4">
            <Users className="text-blue-600" size={36} />
            {menuId === 'cetak-jemaat' ? 'Cetak Jemaat' : 'Database Jemaat'}
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2 ml-1">Kelola data seluruh jiwa di Gereja KINGMI PAPUA</p>
        </div>
        
        <button 
          onClick={() => { setFormData({ jenisKelamin: 'Laki-Laki', rayon: 'Rayon 1 Abepura', status: 'Tetap', baptis: 'Belum' }); setMode('add'); }} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-blue-500/20 transition-all active:scale-95"
        >
          <Plus size={20} /> Tambah Jemaat Baru
        </button>
      </div>
      
      <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center gap-6 bg-white">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Filter Rayon:</span>
               <select value={filterRayon} onChange={e => setFilterRayon(e.target.value)} className="text-[11px] border-none rounded-xl px-4 py-2 outline-none font-bold bg-white text-slate-700 cursor-pointer shadow-sm">
                 <option value="Semua">Semua Rayon</option>
                 <option value="Rayon 1 Abepura">Rayon 1 Abepura</option>
                 <option value="Rayon 2 Sentani Waena">Rayon 2 Sentani Waena</option>
               </select>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Status:</span>
               <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="text-[11px] border-none rounded-xl px-4 py-2 outline-none font-bold bg-white text-slate-700 cursor-pointer shadow-sm">
                 <option value="Semua">Semua Status</option>
                 <option value="Tetap">Jemaat Tetap</option>
                 <option value="Calon">Calon Jemaat</option>
               </select>
            </div>
          </div>

          <div className="relative w-full max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
               type="text" 
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
               className="w-full pl-14 pr-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-400" 
               placeholder="Cari nama jemaat atau nomor..." 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6 text-center w-20">No.</th>
                <th className="px-8 py-6">Profil</th>
                <th className="px-8 py-6">Nama Lengkap</th>
                <th className="px-8 py-6">Nomer Jemaat</th>
                <th className="px-8 py-6">Rayon Pelayanan</th>
                <th className="px-8 py-6 text-center">Status</th>
                <th className="px-8 py-6 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.length > 0 ? filteredData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-all duration-300 group">
                  <td className="px-8 py-8 text-center text-slate-400 font-bold text-xs">{idx + 1}</td>
                  <td className="px-8 py-8">
                     <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-lg mx-auto transform transition-transform group-hover:rotate-3 group-hover:scale-110">
                        <img src={item.foto} className="w-full h-full object-cover" alt="Profil" />
                     </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="font-black text-slate-900 uppercase text-sm tracking-tight">{item.nama}</div>
                    <div className="text-[10px] text-slate-400 font-bold mt-1 tracking-widest">{item.jenisKelamin}</div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="bg-blue-50 text-blue-600 font-black text-xs px-3 py-1 rounded-lg inline-block">#{item.nomerJemaat}</div>
                  </td>
                  <td className="px-8 py-8 font-bold text-slate-500 text-[10px] uppercase tracking-wider">{item.rayon}</td>
                  <td className="px-8 py-8 text-center">
                     <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${item.status === 'Tetap' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                       {item.status}
                     </span>
                  </td>
                  <td className="px-8 py-8 text-center">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => { setSelected(item); setMode('detail'); }} className="p-3 bg-white text-slate-400 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-slate-100"><Eye size={18} /></button>
                      <button onClick={() => { setSelected(item); setFormData(item); setMode('edit'); }} className="p-3 bg-white text-slate-400 rounded-2xl hover:bg-amber-500 hover:text-white transition-all shadow-sm border border-slate-100"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(item.id, item.nama)} className="p-3 bg-white text-slate-400 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm border border-slate-100"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-30">
                       <Search size={64} className="text-slate-900" />
                       <p className="text-slate-900 font-black text-lg uppercase tracking-[0.4em]">Data Tidak Ditemukan</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 h-full">
      {mode === 'list' && renderListView()}
      {(mode === 'add' || mode === 'edit') && renderFormView()}
    </div>
  );
};

const FormField: React.FC<{ label: string; children: React.ReactNode; required?: boolean; error?: string }> = ({ label, children, required, error }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-black uppercase text-slate-500 tracking-[0.15em] ml-1">
      {label}{required && <span className="text-rose-500 ml-1">*</span>}
    </label>
    <div className="w-full">{children}</div>
    {error && (
      <div className="flex items-center gap-1 text-[10px] font-bold text-rose-600 uppercase tracking-tighter ml-1">
        <AlertCircle size={12} /> {error}
      </div>
    )}
  </div>
);
