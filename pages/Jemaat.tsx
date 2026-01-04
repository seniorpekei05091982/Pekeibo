
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, Printer, ArrowLeft, 
  User, MapPin, Phone, Mail, Calendar, 
  Users, CheckCircle2, RotateCcw, Camera, Home, Heart, ShieldCheck, Star, Briefcase, Filter, AlertCircle, Upload
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
  
  // Filters
  const [filterRayon, setFilterRayon] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');

  // Form State
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    
    if (!formData.nama) newErrors.nama = 'Nama wajib diisi';
    if (!formData.nomerJemaat) newErrors.nomerJemaat = 'Nomer jemaat wajib diisi';

    if (!formData.tanggalLahir) {
      newErrors.tanggalLahir = 'Tanggal lahir wajib diisi';
    } else if (!dateRegex.test(formData.tanggalLahir)) {
      newErrors.tanggalLahir = 'Format harus DD/MM/YYYY';
    }

    if (formData.tanggalBergabung && !dateRegex.test(formData.tanggalBergabung)) {
      newErrors.tanggalBergabung = 'Format harus DD/MM/YYYY';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (!validate()) return;

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

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus data jemaat "${name}"?`)) {
      setData(data.filter(i => i.id !== id));
    }
  };

  const renderFormView = () => (
    <div className="p-8 bg-slate-50 min-h-full animate-in slide-in-from-right duration-500">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
            <div className="p-4 bg-slate-900 rounded-[2rem] text-white shadow-2xl">
              {mode === 'add' ? <Plus size={28} /> : <Edit size={28} />}
            </div>
            {mode === 'add' ? 'Registrasi Jemaat' : 'Modifikasi Profil'}
          </h1>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-2 ml-20 opacity-70">Church Database Management Module</p>
        </div>
        <button onClick={() => { setMode('list'); setErrors({}); }} className="bg-white hover:bg-slate-50 text-slate-800 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm border border-slate-200">
          <ArrowLeft size={16} /> Kembali ke List
        </button>
      </div>

      <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden max-w-7xl mx-auto">
        <div className="p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Column 1: Identity */}
            <div className="space-y-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600"><User size={16} /></div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Identitas Jemaat</h3>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-56 h-56 rounded-[3rem] bg-slate-50 border-4 border-white shadow-2xl overflow-hidden relative transition-transform duration-700 group-hover:scale-105">
                    {formData.foto ? (
                      <img src={formData.foto} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-200 bg-slate-50">
                        <User size={80} strokeWidth={1} />
                        <span className="text-[9px] font-black uppercase mt-3 tracking-widest">Image Vacant</span>
                      </div>
                    )}
                    <label className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-500 backdrop-blur-sm">
                      <Camera className="text-white mb-3" size={40} />
                      <span className="text-white text-[9px] font-black uppercase tracking-[0.3em]">Upload Profile</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl border-[6px] border-white group-hover:rotate-12 transition-transform duration-500">
                    <Upload size={24} />
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-6">
                <FormField label="Full Name / Nama Lengkap" required error={errors.nama}>
                  <input type="text" className="form-input" value={formData.nama || ''} onChange={e => setFormData({...formData, nama: e.target.value})} placeholder="Input Name" />
                </FormField>
                <div className="grid grid-cols-2 gap-5">
                  <FormField label="No. Anggota" required error={errors.nomerJemaat}>
                    <input type="text" className="form-input" value={formData.nomerJemaat || ''} onChange={e => setFormData({...formData, nomerJemaat: e.target.value})} placeholder="XXXX" />
                  </FormField>
                  <FormField label="No. KK">
                    <input type="text" className="form-input" value={formData.nomerKeluarga || ''} onChange={e => setFormData({...formData, nomerKeluarga: e.target.value})} placeholder="Optional" />
                  </FormField>
                </div>
              </div>
            </div>

            {/* Column 2: Membership */}
            <div className="space-y-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600/10 flex items-center justify-center text-orange-600"><ShieldCheck size={16} /></div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Data Keanggotaan</h3>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-5">
                  <FormField label="Tempat Lahir">
                    <input type="text" className="form-input" value={formData.tempatLahir || ''} onChange={e => setFormData({...formData, tempatLahir: e.target.value})} placeholder="City" />
                  </FormField>
                  <FormField label="Tgl Lahir (DD/MM/YYYY)" required error={errors.tanggalLahir}>
                    <input type="text" className="form-input" value={formData.tanggalLahir || ''} onChange={e => setFormData({...formData, tanggalLahir: e.target.value})} placeholder="15/08/1990" />
                  </FormField>
                </div>

                <FormField label="Gender / Jenis Kelamin">
                  <select className="form-input" value={formData.jenisKelamin || 'Laki-Laki'} onChange={e => setFormData({...formData, jenisKelamin: e.target.value as any})}>
                    <option value="Laki-Laki">Laki-Laki (Male)</option>
                    <option value="Perempuan">Perempuan (Female)</option>
                  </select>
                </FormField>

                <FormField label="Region / Rayon Pelayanan">
                  <select className="form-input" value={formData.rayon || 'Rayon 1 Abepura'} onChange={e => setFormData({...formData, rayon: e.target.value})}>
                    <option value="Rayon 1 Abepura">Rayon 1 Abepura</option>
                    <option value="Rayon 2 Sentani Waena">Rayon 2 Sentani Waena</option>
                  </select>
                </FormField>

                <FormField label="Membership Status">
                  <select className="form-input" value={formData.status || 'Tetap'} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Tetap">Jemaat Tetap</option>
                    <option value="Calon">Calon Jemaat</option>
                  </select>
                </FormField>

                <FormField label="Registration Date (DD/MM/YYYY)" error={errors.tanggalBergabung}>
                  <input type="text" className="form-input" value={formData.tanggalBergabung || ''} onChange={e => setFormData({...formData, tanggalBergabung: e.target.value})} placeholder="01/01/2024" />
                </FormField>
              </div>
            </div>

            {/* Column 3: Contact & Spirit */}
            <div className="space-y-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-600/10 flex items-center justify-center text-rose-600"><Heart size={16} /></div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Kontak & Rohani</h3>
              </div>
              
              <div className="space-y-6">
                <FormField label="Mobile / WhatsApp Number">
                  <input type="text" className="form-input" value={formData.nomerHP || ''} onChange={e => setFormData({...formData, nomerHP: e.target.value})} placeholder="08xxxxxxxxxx" />
                </FormField>
                
                <FormField label="Current Address / Alamat">
                  <textarea rows={3} className="form-input" value={formData.alamat || ''} onChange={e => setFormData({...formData, alamat: e.target.value})} placeholder="Full address details"></textarea>
                </FormField>

                <div className="grid grid-cols-2 gap-5">
                  <FormField label="Marital Status">
                    <select className="form-input" value={formData.statusKawin || 'Belum'} onChange={e => setFormData({...formData, statusKawin: e.target.value})}>
                      {['Belum', 'Sudah', 'Cerai', 'Duda', 'Janda'].map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Family Position">
                    <select className="form-input" value={formData.statusKeluarga || 'Kepala Keluarga'} onChange={e => setFormData({...formData, statusKeluarga: e.target.value})}>
                      {['Kepala Keluarga', 'Istri', 'Anak', 'Famili'].map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </FormField>
                </div>

                <div className="p-6 bg-blue-50/40 rounded-[2rem] border border-blue-100 space-y-4 shadow-inner">
                  <FormField label="Baptism Status">
                    <select className="form-input bg-white" value={formData.baptis || 'Belum'} onChange={e => setFormData({...formData, baptis: e.target.value as any})}>
                      <option value="Belum">Belum Baptis (Not Baptized)</option>
                      <option value="Sudah">Sudah Baptis (Baptized)</option>
                    </select>
                  </FormField>
                  {formData.baptis === 'Sudah' && (
                    <div className="animate-in slide-in-from-top-2 duration-500">
                      <FormField label="Baptizing Pastor">
                        <input type="text" className="form-input bg-white" value={formData.pendetaBaptis || ''} onChange={e => setFormData({...formData, pendetaBaptis: e.target.value})} placeholder="Pastor Name" />
                      </FormField>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-10 border-t border-slate-100 flex justify-end gap-5">
             <button onClick={() => { setMode('list'); setErrors({}); }} className="px-10 py-4 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95">Discard Changes</button>
             <button onClick={handleSave} className="px-16 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4 shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all active:scale-[0.98]">
                <CheckCircle2 size={20} /> Authorize & Save
             </button>
          </div>
        </div>
      </div>

      <style>{`
        .form-input { 
          @apply w-full px-5 py-4 text-sm border-2 border-slate-100 rounded-2xl bg-slate-50 text-slate-900 outline-none font-black transition-all placeholder:text-slate-200 placeholder:font-bold focus:bg-white focus:border-blue-500 focus:ring-[10px] focus:ring-blue-500/10; 
        }
      `}</style>
    </div>
  );

  const renderListView = () => (
    <div className="p-8 bg-slate-50 min-h-full">
      <TopStatsBar jemaatCount={data.length} />
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-[2px] w-12 bg-blue-600"></span>
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Master Database</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Jemaat <span className="text-slate-300">Registry</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold mt-4 uppercase tracking-widest flex items-center gap-2">
            Managing <span className="text-blue-600 font-black">{data.length} Total Soul</span> in the collection
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => { setFormData({ jenisKelamin: 'Laki-Laki', rayon: 'Rayon 1 Abepura', status: 'Tetap', baptis: 'Belum' }); setMode('add'); }} 
            className="bg-slate-900 hover:bg-blue-600 text-white px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 shadow-2xl transition-all active:scale-95 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> New Registration
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-[1.5rem] border border-slate-100 shadow-inner">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Filter Rayon:</span>
               <select value={filterRayon} onChange={e => setFilterRayon(e.target.value)} className="text-[11px] border-none rounded-xl px-4 py-2 outline-none font-black bg-white text-slate-700 cursor-pointer shadow-sm hover:text-blue-600 transition-colors">
                 <option value="Semua">All Rayons</option>
                 <option value="Rayon 1 Abepura">Abepura</option>
                 <option value="Rayon 2 Sentani Waena">Sentani</option>
               </select>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-[1.5rem] border border-slate-100 shadow-inner">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Status:</span>
               <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="text-[11px] border-none rounded-xl px-4 py-2 outline-none font-black bg-white text-slate-700 cursor-pointer shadow-sm hover:text-blue-600 transition-colors">
                 <option value="Semua">All Membership</option>
                 <option value="Tetap">Permanent</option>
                 <option value="Calon">Candidate</option>
               </select>
            </div>
          </div>

          <div className="relative w-full max-w-lg">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input 
               type="text" 
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
               className="w-full pl-16 pr-8 py-5 bg-slate-50 border-2 border-slate-50 rounded-[2rem] text-sm font-bold outline-none focus:bg-white focus:border-blue-500/20 focus:ring-[12px] focus:ring-blue-500/5 transition-all placeholder:text-slate-300" 
               placeholder="Search by name or member ID..." 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                <th className="px-8 py-6 text-center w-20">#</th>
                <th className="px-8 py-6">Avatar</th>
                <th className="px-8 py-6">Full Identity</th>
                <th className="px-8 py-6">Registry ID</th>
                <th className="px-8 py-6">Region</th>
                <th className="px-8 py-6 text-center">Status</th>
                <th className="px-8 py-6 text-center">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.length > 0 ? filteredData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-all duration-500 group">
                  <td className="px-8 py-8 text-center text-slate-300 font-black text-xs">{idx + 1}</td>
                  <td className="px-8 py-8 text-center">
                     <div className="w-14 h-14 rounded-[1.25rem] overflow-hidden border-4 border-white shadow-xl mx-auto transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <img src={item.foto} className="w-full h-full object-cover" alt="Profile" />
                     </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="font-black text-slate-900 uppercase text-sm tracking-tighter group-hover:text-blue-600 transition-colors">{item.nama}</div>
                    <div className="text-[10px] text-slate-400 font-black mt-1 tracking-widest opacity-60">{item.jenisKelamin}</div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="bg-slate-100 text-slate-900 font-black text-[10px] px-3 py-1 rounded-lg inline-block tracking-widest">#{item.nomerJemaat}</div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-wider">{item.rayon}</div>
                  </td>
                  <td className="px-8 py-8 text-center">
                     <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ${item.status === 'Tetap' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                       {item.status}
                     </span>
                  </td>
                  <td className="px-8 py-8 text-center">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => { setSelected(item); setMode('detail'); }} className="p-3 bg-white text-slate-400 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-slate-100 group-hover:shadow-lg"><Eye size={18} /></button>
                      <button onClick={() => { setSelected(item); setFormData(item); setMode('edit'); }} className="p-3 bg-white text-slate-400 rounded-2xl hover:bg-orange-500 hover:text-white transition-all shadow-sm border border-slate-100 group-hover:shadow-lg"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(item.id, item.nama)} className="p-3 bg-white text-slate-400 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm border border-slate-100 group-hover:shadow-lg"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center gap-6 opacity-20">
                       <Search size={80} className="text-slate-900" />
                       <p className="text-slate-900 font-black text-xl uppercase tracking-[0.5em]">Empty Recordset</p>
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
  <div className="flex flex-col gap-3">
    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2 flex items-center gap-2">
      {label}{required && <span className="text-rose-500 font-bold">*</span>}
    </label>
    <div className="w-full">{children}</div>
    {error && (
      <div className="flex items-center gap-2 text-[10px] font-black text-rose-600 uppercase tracking-tighter ml-2 bg-rose-50 p-2 rounded-xl border border-rose-100">
        <AlertCircle size={14} /> {error}
      </div>
    )}
  </div>
);
