
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
    // Regex for DD/MM/YYYY
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    
    if (!formData.nama) newErrors.nama = 'Nama wajib diisi';
    if (!formData.nomerJemaat) newErrors.nomerJemaat = 'Nomer jemaat wajib diisi';

    if (!formData.tanggalLahir) {
      newErrors.tanggalLahir = 'Tanggal lahir wajib diisi';
    } else if (!dateRegex.test(formData.tanggalLahir)) {
      newErrors.tanggalLahir = 'Format harus DD/MM/YYYY (Contoh: 15/08/1995)';
    }

    if (formData.tanggalBergabung && !dateRegex.test(formData.tanggalBergabung)) {
      newErrors.tanggalBergabung = 'Format harus DD/MM/YYYY (Contoh: 01/01/2024)';
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
    <div className="p-6 bg-slate-100 min-h-full animate-in slide-in-from-right duration-300">
      <TopStatsBar jemaatCount={data.length} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          {mode === 'add' ? <Plus className="text-blue-600" /> : <Edit className="text-blue-600" />}
          {mode === 'add' ? 'Tambah Jemaat Baru' : 'Edit Data Jemaat'}
        </h1>
        <button onClick={() => { setMode('list'); setErrors({}); }} className="bg-slate-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm">
          <ArrowLeft size={14} /> Kembali ke Daftar
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden max-w-6xl mx-auto">
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {/* Kolom 1: Data Identitas & Foto */}
            <div className="space-y-5">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 border-b pb-2"><User size={14}/> Identitas & Foto</h3>
              
              <div className="flex flex-col items-center gap-4 p-4 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 group">
                <div className="w-32 h-32 rounded-lg bg-white shadow-sm border border-slate-200 overflow-hidden relative">
                  {formData.foto ? (
                    <img src={formData.foto} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <User size={48} />
                    </div>
                  )}
                  <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <Upload className="text-white" size={24} />
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Klik untuk upload foto</p>
              </div>

              <FormField label="Nama Lengkap" required error={errors.nama}>
                <input type="text" className={`form-input ${errors.nama ? 'border-rose-500 bg-rose-50' : ''}`} value={formData.nama || ''} onChange={e => setFormData({...formData, nama: e.target.value})} placeholder="Masukkan nama lengkap" />
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Nomer Anggota" required error={errors.nomerJemaat}>
                  <input type="text" className={`form-input ${errors.nomerJemaat ? 'border-rose-500 bg-rose-50' : ''}`} value={formData.nomerJemaat || ''} onChange={e => setFormData({...formData, nomerJemaat: e.target.value})} placeholder="0001" />
                </FormField>
                <FormField label="Nomer Keluarga">
                  <input type="text" className="form-input" value={formData.nomerKeluarga || ''} onChange={e => setFormData({...formData, nomerKeluarga: e.target.value})} placeholder="Opsional" />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Tempat Lahir">
                  <input type="text" className="form-input" value={formData.tempatLahir || ''} onChange={e => setFormData({...formData, tempatLahir: e.target.value})} />
                </FormField>
                <FormField label="Tanggal Lahir (DD/MM/YYYY)" required error={errors.tanggalLahir}>
                  <input type="text" className={`form-input ${errors.tanggalLahir ? 'border-rose-500 bg-rose-50' : ''}`} value={formData.tanggalLahir || ''} onChange={e => setFormData({...formData, tanggalLahir: e.target.value})} placeholder="DD/MM/YYYY" />
                </FormField>
              </div>
            </div>

            {/* Kolom 2: Status & Lokasi */}
            <div className="space-y-5">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 border-b pb-2"><Heart size={14}/> Status & Lokasi</h3>
              <FormField label="Jenis Kelamin">
                <select className="form-input" value={formData.jenisKelamin || 'Laki-Laki'} onChange={e => setFormData({...formData, jenisKelamin: e.target.value as any})}>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </FormField>
              <FormField label="Tanggal Bergabung (DD/MM/YYYY)" error={errors.tanggalBergabung}>
                <input type="text" className={`form-input ${errors.tanggalBergabung ? 'border-rose-500 bg-rose-50' : ''}`} value={formData.tanggalBergabung || ''} onChange={e => setFormData({...formData, tanggalBergabung: e.target.value})} placeholder="DD/MM/YYYY" />
              </FormField>
              <FormField label="Status Kawin">
                <select className="form-input" value={formData.statusKawin || 'Belum'} onChange={e => setFormData({...formData, statusKawin: e.target.value})}>
                  {['Belum', 'Sudah', 'Cerai', 'Duda', 'Janda', 'Yatim Piatu'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </FormField>
              <FormField label="Status Keluarga">
                <select className="form-input" value={formData.statusKeluarga || 'Kepala Keluarga'} onChange={e => setFormData({...formData, statusKeluarga: e.target.value})}>
                  {['Kepala Keluarga', 'Istri', 'Anak', 'Famili lain'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </FormField>
              <FormField label="Rayon Pelayanan">
                <select className="form-input" value={formData.rayon || 'Rayon 1 Abepura'} onChange={e => setFormData({...formData, rayon: e.target.value})}>
                  <option value="Rayon 1 Abepura">Rayon 1 Abepura</option>
                  <option value="Rayon 2 Sentani Waena">Rayon 2 Sentani Waena</option>
                </select>
              </FormField>
              <FormField label="Status Keanggotaan">
                <select className="form-input" value={formData.status || 'Tetap'} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="Tetap">Tetap</option>
                  <option value="Calon">Calon</option>
                </select>
              </FormField>
            </div>

            {/* Kolom 3: Rohani & Bakat */}
            <div className="space-y-5">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 border-b pb-2"><ShieldCheck size={14}/> Rohani & Bakat</h3>
              <FormField label="Alamat Rumah">
                <textarea rows={2} className="form-input" value={formData.alamat || ''} onChange={e => setFormData({...formData, alamat: e.target.value})} placeholder="Alamat lengkap"></textarea>
              </FormField>
              <FormField label="Nomer HP">
                 <input type="text" className="form-input" value={formData.nomerHP || ''} onChange={e => setFormData({...formData, nomerHP: e.target.value})} placeholder="08xxxx" />
              </FormField>
              <FormField label="Sudah Baptis?">
                <select className="form-input" value={formData.baptis || 'Belum'} onChange={e => setFormData({...formData, baptis: e.target.value as any})}>
                  <option value="Belum">Belum</option>
                  <option value="Sudah">Sudah</option>
                </select>
              </FormField>
              {formData.baptis === 'Sudah' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <FormField label="Pendeta Pembaptis">
                    <input type="text" className="form-input" value={formData.pendetaBaptis || ''} onChange={e => setFormData({...formData, pendetaBaptis: e.target.value})} placeholder="Nama Pendeta" />
                  </FormField>
                  <FormField label="Tempat Dibaptis">
                    <input type="text" className="form-input" value={formData.tempatBaptis || ''} onChange={e => setFormData({...formData, tempatBaptis: e.target.value})} placeholder="Nama Gereja/Tempat" />
                  </FormField>
                </div>
              )}
              <FormField label="Pelayanan">
                   <input type="text" className="form-input" value={formData.pelayanan || ''} onChange={e => setFormData({...formData, pelayanan: e.target.value})} placeholder="Contoh: Song Leader, Multimedia" />
              </FormField>
              <FormField label="Talenta">
                   <input type="text" className="form-input" value={formData.talenta || ''} onChange={e => setFormData({...formData, talenta: e.target.value})} placeholder="Contoh: Bermain Musik, Desain" />
              </FormField>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-slate-100 flex justify-end gap-3">
             <button onClick={() => { setMode('list'); setErrors({}); }} className="px-6 py-2 bg-slate-100 text-slate-600 rounded text-xs font-bold flex items-center gap-2">Batal</button>
             <button onClick={handleSave} className="px-10 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg transition-all active:scale-95">
                <CheckCircle2 size={14} /> Simpan Data Jemaat
             </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar jemaatCount={data.length} />
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <Users className="text-slate-700" size={28} />
          <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">
            {menuId === 'cetak-jemaat' ? 'Cetak Jemaat' : 'Daftar Jemaat'}
          </h1>
        </div>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-right flex-1">
          MASTER DATA / <span className="text-blue-500">{menuId === 'cetak-jemaat' ? 'CETAK JEMAAT' : 'JEMAAT'}</span>
        </div>
      </div>
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-slate-700">Database Jemaat Aktif</h2>
            <div className="flex items-center gap-2 border-l pl-4 border-slate-300">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter:</span>
               <select value={filterRayon} onChange={e => setFilterRayon(e.target.value)} className="text-[10px] border border-slate-200 rounded px-2 py-1 outline-none font-bold bg-white cursor-pointer">
                 <option value="Semua">Rayon: Semua</option>
                 <option value="Rayon 1 Abepura">Rayon 1 Abepura</option>
                 <option value="Rayon 2 Sentani Waena">Rayon 2 Sentani Waena</option>
               </select>
               <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="text-[10px] border border-slate-200 rounded px-2 py-1 outline-none font-bold bg-white cursor-pointer">
                 <option value="Semua">Status: Semua</option>
                 <option value="Tetap">Tetap</option>
                 <option value="Calon">Calon</option>
               </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => { setFormData({ jenisKelamin: 'Laki-Laki', rayon: 'Rayon 1 Abepura', status: 'Tetap', baptis: 'Belum' }); setMode('add'); }} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Plus size={16} /> Tambah Jemaat
            </button>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                 type="text" 
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
                 className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20" 
                 placeholder="Cari nama atau no. jemaat..." 
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase tracking-tight">
                <tr>
                  <th className="px-4 py-3 border-r border-slate-200 text-center w-12">#</th>
                  <th className="px-4 py-3 border-r border-slate-200">Foto</th>
                  <th className="px-4 py-3 border-r border-slate-200">Nama Lengkap</th>
                  <th className="px-4 py-3 border-r border-slate-200">No. Jemaat</th>
                  <th className="px-4 py-3 border-r border-slate-200">Rayon</th>
                  <th className="px-4 py-3 border-r border-slate-200 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-4 border-r border-slate-200 text-center text-slate-500 font-medium">{idx + 1}.</td>
                    <td className="px-4 py-4 border-r border-slate-200 text-center">
                       <div className="w-10 h-10 rounded overflow-hidden border border-slate-200 mx-auto bg-white shadow-sm">
                          <img src={item.foto} className="w-full h-full object-cover" alt="Profile" />
                       </div>
                    </td>
                    <td className="px-4 py-4 border-r border-slate-200 font-bold text-slate-800 uppercase">{item.nama}</td>
                    <td className="px-4 py-4 border-r border-slate-200 font-medium text-blue-600">{item.nomerJemaat}</td>
                    <td className="px-4 py-4 border-r border-slate-200 font-bold text-slate-500">{item.rayon}</td>
                    <td className="px-4 py-4 border-r border-slate-200 text-center">
                       <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${item.status === 'Tetap' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                         {item.status}
                       </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => { setSelected(item); setMode('detail'); }} className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 transition-colors"><Eye size={14} /></button>
                        <button onClick={() => { setSelected(item); setFormData(item); setMode('edit'); }} className="p-1.5 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-600 transition-colors"><Edit size={14} /></button>
                        <button onClick={() => { setSelected(item); setMode('print'); }} className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-600 transition-colors"><Printer size={14} /></button>
                        <button onClick={() => handleDelete(item.id, item.nama)} className="p-1.5 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-600 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-20 text-center text-slate-400 italic">Data jemaat tidak ditemukan berdasarkan filter saat ini.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailView = () => (
    <div className="p-6 bg-slate-100 min-h-full animate-in fade-in duration-500">
      <TopStatsBar jemaatCount={data.length} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2 uppercase tracking-tighter">
           <User className="text-blue-600" /> Profil Jemaat Lengkap
        </h1>
        <button onClick={() => setMode('list')} className="bg-slate-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2">
          <ArrowLeft size={14} /> Kembali
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden max-w-5xl mx-auto">
        <div className="h-40 bg-gradient-to-r from-blue-700 to-blue-500 relative">
           <div className="absolute -bottom-20 left-10">
              <div className="w-40 h-40 rounded-2xl bg-white p-1.5 shadow-2xl border border-slate-100 overflow-hidden">
                 <img src={selected?.foto} alt="Profile" className="w-full h-full object-cover rounded-xl" />
              </div>
           </div>
           <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={() => { setFormData(selected || {}); setMode('edit'); }} className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-lg backdrop-blur-md transition-all"><Edit size={18} /></button>
              <button onClick={() => setMode('print')} className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-lg backdrop-blur-md transition-all"><Printer size={18} /></button>
           </div>
        </div>
        <div className="pt-24 px-10 pb-12">
          <div className="flex justify-between items-start mb-12">
             <div>
                <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase leading-none">{selected?.nama}</h2>
                <div className="flex gap-2 mt-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest">{selected?.nomerJemaat}</span>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest">{selected?.status}</span>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rayon Pelayanan</p>
                <p className="text-lg font-bold text-blue-600 uppercase tracking-tighter">{selected?.rayon}</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             <div className="space-y-6">
                <DetailItem icon={<MapPin size={16}/>} label="Alamat Domisili" value={selected?.alamat} />
                <DetailItem icon={<Phone size={16}/>} label="Nomer Handphone" value={selected?.nomerHP} />
                <DetailItem icon={<Calendar size={16}/>} label="Tempat, Tgl Lahir" value={`${selected?.tempatLahir}, ${selected?.tanggalLahir}`} />
                <DetailItem icon={<Calendar size={16}/>} label="Tanggal Bergabung" value={selected?.tanggalBergabung} />
             </div>
             <div className="space-y-6">
                <DetailItem icon={<Heart size={16}/>} label="Status Kawin" value={selected?.statusKawin} />
                <DetailItem icon={<Users size={16}/>} label="Hubungan Keluarga" value={selected?.statusKeluarga} />
                <DetailItem icon={<Mail size={16}/>} label="Nomer Keluarga" value={selected?.nomerKeluarga} />
             </div>
             <div className="space-y-6">
                <ShieldCheck size={16} className="hidden" />
                <DetailItem icon={<ShieldCheck size={16}/>} label="Status Baptis" value={selected?.baptis} highlight={selected?.baptis === 'Sudah'} />
                {selected?.baptis === 'Sudah' && (
                  <>
                    <DetailItem icon={<User size={14}/>} label="Pendeta Pembaptis" value={selected?.pendetaBaptis} />
                    <DetailItem icon={<Home size={14}/>} label="Tempat Baptis" value={selected?.tempatBaptis} />
                  </>
                )}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-4">
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Pelayanan</p>
                    <p className="text-xs font-bold text-slate-700">{selected?.pelayanan || '-'}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Talenta</p>
                    <p className="text-xs font-bold text-slate-700">{selected?.talenta || '-'}</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 h-full">
      <style>{`
        .form-input { @apply w-full px-3 py-2 text-xs border border-slate-200 rounded bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all; }
      `}</style>
      {mode === 'list' && renderListView()}
      {mode === 'print' && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-[900px] flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex-1 bg-white p-12 overflow-y-auto max-h-[90vh]">
              <div className="border-2 border-slate-800 p-8 min-h-[800px] relative font-serif">
                 <div className="flex justify-between items-start mb-10 border-b-2 border-slate-800 pb-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-white border border-orange-500 rounded-full flex items-center justify-center overflow-hidden">
                        <img src={churchInfo.logo} alt="Logo" className="w-full h-full object-cover" />
                      </div>
                      <div className="max-w-[400px]">
                        <h2 className="text-base font-black text-slate-900 uppercase leading-tight">{churchInfo.nama}</h2>
                        <p className="text-[10px] text-slate-700 mt-1">{churchInfo.alamat}, {churchInfo.telp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-1">KARTU JEMAAT</h2>
                      <p className="text-xs font-bold text-slate-500 uppercase">Status: {selected?.status}</p>
                    </div>
                 </div>
    
                 <div className="flex flex-col md:flex-row gap-10">
                    <div className="w-40 h-52 bg-slate-100 border-2 border-slate-800 flex items-center justify-center overflow-hidden shadow-sm">
                       {selected?.foto ? <img src={selected.foto} className="w-full h-full object-cover" alt="Foto" /> : <User className="text-slate-300" size={64} />}
                    </div>
                    <div className="flex-1 space-y-4">
                      {[
                        ['Nama Lengkap', selected?.nama],
                        ['Nomer Jemaat', selected?.nomerJemaat],
                        ['Nomer Keluarga', selected?.nomerKeluarga],
                        ['Jenis Kelamin', selected?.jenisKelamin],
                        ['TTL', `${selected?.tempatLahir}, ${selected?.tanggalLahir}`],
                        ['Status Kawin', selected?.statusKawin],
                        ['Status Keluarga', selected?.statusKeluarga],
                        ['Rayon', selected?.rayon],
                        ['Alamat', selected?.alamat],
                        ['Baptis', selected?.baptis],
                        ['Pelayanan', selected?.pelayanan],
                        ['Talenta', selected?.talenta],
                      ].map(([label, val], idx) => (
                        <div key={idx} className="flex border-b border-slate-200 py-1 items-baseline">
                          <span className="w-32 font-bold text-slate-800 text-[11px] uppercase tracking-tight">{label}</span>
                          <span className="w-4 text-center text-slate-400">:</span>
                          <span className="flex-1 text-slate-700 text-sm font-medium">{val || '-'}</span>
                        </div>
                      ))}
                    </div>
                 </div>
    
                 <div className="absolute bottom-10 right-10 text-center">
                    <p className="text-[10px] text-slate-500 mb-12">Dicetak pada: {new Date().toLocaleDateString('id-ID')}</p>
                    <div className="w-32 h-px bg-slate-800 mx-auto"></div>
                    <p className="text-[10px] font-bold text-slate-800 mt-1 uppercase">Sekretariat Gereja</p>
                 </div>
              </div>
            </div>
            <div className="w-full md:w-[250px] bg-slate-900 p-8 flex flex-col gap-4">
               <button onClick={() => window.print()} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-3 rounded shadow-lg transition-all text-xs uppercase tracking-widest">Print Sekarang</button>
               <button onClick={() => setMode('list')} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded transition-all text-xs uppercase tracking-widest border border-slate-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      {mode === 'detail' && renderDetailView()}
      {(mode === 'add' || mode === 'edit') && renderFormView()}
    </div>
  );
};

const FormField: React.FC<{ label: string; children: React.ReactNode; required?: boolean; error?: string }> = ({ label, children, required, error }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-black uppercase text-slate-600 tracking-wider">
      {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
    <div className="w-full">{children}</div>
    {error && (
      <div className="flex items-center gap-1 text-[9px] font-bold text-rose-600 uppercase tracking-tighter">
        <AlertCircle size={10} /> {error}
      </div>
    )}
  </div>
);

const DetailItem = ({ icon, label, value, highlight }: any) => (
  <div className="flex items-start gap-3">
    <div className={`p-2 rounded-lg shrink-0 ${highlight ? 'bg-blue-600 text-white' : 'bg-slate-50 text-blue-500'}`}>
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-bold text-slate-700 leading-tight">{value || '-'}</p>
    </div>
  </div>
);
