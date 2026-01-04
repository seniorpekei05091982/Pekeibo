
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, Printer, ArrowLeft, 
  User, MapPin, Phone, Mail, Calendar, 
  Users, CheckCircle2, RotateCcw, Camera
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
  komsel: string;
  foto?: string;
  statusKeluarga?: string;
}

interface JemaatProps {
  onBack: () => void;
  churchInfo: { nama: string, logo: string, alamat: string, telp: string };
}

export const Jemaat: React.FC<JemaatProps> = ({ onBack, churchInfo }) => {
  const [data, setData] = useState<JemaatData[]>([
    { id: '1', nomerJemaat: '000020', nomerKeluarga: '000001', nama: 'Amir', alamat: 'Jl. Rungkut Mejoyo 12345', jenisKelamin: 'Laki-Laki', tempatLahir: 'Surabaya', tanggalLahir: '08 Maret 1970', nomerHP: '08901234567', komsel: 'Paulus', foto: 'https://ui-avatars.com/api/?name=Amir&background=000&color=fff' },
  ]);
  
  const [mode, setMode] = useState<'list' | 'add' | 'edit' | 'detail' | 'print'>('list');
  const [selected, setSelected] = useState<JemaatData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [formData, setFormData] = useState<Partial<JemaatData>>({});

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.nomerJemaat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleSave = () => {
    if (!formData.nama || !formData.nomerJemaat) {
      alert('Nama dan Nomer Jemaat wajib diisi!');
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
        komsel: formData.komsel || '',
        foto: formData.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.nama || '')}&background=random`
      };
      setData([newItem, ...data]);
      alert('Data Jemaat berhasil ditambahkan!');
    } else if (mode === 'edit' && selected) {
      setData(data.map(item => item.id === selected.id ? { ...item, ...formData } : item));
      alert('Data Jemaat berhasil diperbarui!');
    }
    
    setMode('list');
    setFormData({});
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus data jemaat "${name}"?`)) {
      setData(data.filter(i => i.id !== id));
    }
  };

  const renderPrintView = () => (
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
                  <p className="text-xs font-bold text-slate-500 uppercase">Status: Aktif</p>
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
                    ['Alamat', selected?.alamat],
                    ['Nomer HP', selected?.nomerHP],
                    ['Komsel', selected?.komsel],
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
           <div className="mb-4">
             <h3 className="text-white font-bold text-lg">Cetak Kartu</h3>
             <p className="text-slate-400 text-xs mt-1">Pastikan printer terhubung dan ukuran kertas sesuai.</p>
           </div>
           <button onClick={() => window.print()} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-3 rounded shadow-lg transition-all text-xs uppercase tracking-widest">Print Sekarang</button>
           <button onClick={() => setMode('list')} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded transition-all text-xs uppercase tracking-widest border border-slate-700">Kembali</button>
        </div>
      </div>
    </div>
  );

  const renderFormView = () => (
    <div className="p-6 bg-slate-100 min-h-full animate-in slide-in-from-right duration-300">
      <TopStatsBar />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          {mode === 'add' ? <Plus className="text-blue-600" /> : <Edit className="text-blue-600" />}
          {mode === 'add' ? 'Tambah Jemaat Baru' : 'Edit Data Jemaat'}
        </h1>
        <button onClick={() => setMode('list')} className="bg-slate-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm">
          <ArrowLeft size={14} /> Kembali ke Daftar
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden max-w-5xl">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
           <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
           <span className="text-[11px] font-black uppercase text-slate-500 tracking-widest">Informasi Identitas Jemaat</span>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="space-y-5">
              <FormField label="Nama Lengkap" required>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.nama || ''} 
                  onChange={e => setFormData({...formData, nama: e.target.value})}
                  placeholder="Masukkan nama lengkap" 
                />
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Nomer Anggota" required>
                  <input type="text" className="form-input" value={formData.nomerJemaat || ''} onChange={e => setFormData({...formData, nomerJemaat: e.target.value})} placeholder="Contoh: 0001" />
                </FormField>
                <FormField label="Nomer Keluarga">
                  <input type="text" className="form-input" value={formData.nomerKeluarga || ''} onChange={e => setFormData({...formData, nomerKeluarga: e.target.value})} placeholder="Opsional" />
                </FormField>
              </div>
              <FormField label="Jenis Kelamin">
                <select className="form-input" value={formData.jenisKelamin || 'Laki-Laki'} onChange={e => setFormData({...formData, jenisKelamin: e.target.value as any})}>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Tempat Lahir">
                  <input type="text" className="form-input" value={formData.tempatLahir || ''} onChange={e => setFormData({...formData, tempatLahir: e.target.value})} />
                </FormField>
                <FormField label="Tanggal Lahir">
                  <input type="text" className="form-input" value={formData.tanggalLahir || ''} onChange={e => setFormData({...formData, tanggalLahir: e.target.value})} placeholder="dd/mm/yyyy" />
                </FormField>
              </div>
            </div>

            <div className="space-y-5">
              <FormField label="Alamat Rumah">
                <textarea rows={3} className="form-input" value={formData.alamat || ''} onChange={e => setFormData({...formData, alamat: e.target.value})} placeholder="Alamat lengkap jemaat"></textarea>
              </FormField>
              <FormField label="Nomer Handphone">
                <input type="text" className="form-input" value={formData.nomerHP || ''} onChange={e => setFormData({...formData, nomerHP: e.target.value})} placeholder="08xx" />
              </FormField>
              <FormField label="Lingkungan / Komsel">
                <select className="form-input" value={formData.komsel || ''} onChange={e => setFormData({...formData, komsel: e.target.value})}>
                  <option value="">- Pilih Rayon/Komsel -</option>
                  <option value="Petrus">Petrus</option>
                  <option value="Paulus">Paulus</option>
                  <option value="Abraham">Abraham</option>
                </select>
              </FormField>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-100 flex justify-end gap-3">
             <button onClick={() => setMode('list')} className="px-6 py-2 bg-slate-100 text-slate-600 rounded text-xs font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors">
                <RotateCcw size={14} /> Batal
             </button>
             <button onClick={handleSave} className="px-10 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-100 transition-all">
                <CheckCircle2 size={14} /> Simpan Data
             </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailView = () => (
    <div className="p-6 bg-slate-100 min-h-full animate-in fade-in duration-500">
      <TopStatsBar />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2 uppercase tracking-tighter">
           <User className="text-blue-600" /> Profil Jemaat
        </h1>
        <button onClick={() => setMode('list')} className="bg-slate-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2">
          <ArrowLeft size={14} /> Kembali
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto">
        <div className="h-32 bg-blue-600 relative">
           <div className="absolute -bottom-16 left-10">
              <div className="w-32 h-32 rounded-2xl bg-white p-1 shadow-2xl border border-slate-100 overflow-hidden">
                 <img src={selected?.foto} alt="Profile" className="w-full h-full object-cover rounded-xl" />
              </div>
           </div>
        </div>
        
        <div className="pt-20 px-10 pb-10">
          <div className="flex justify-between items-start mb-10">
             <div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">{selected?.nama}</h2>
                <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">{selected?.nomerJemaat} • AKTIF</p>
             </div>
             <div className="flex gap-2">
                <button onClick={() => { setFormData(selected || {}); setMode('edit'); }} className="p-2 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200"><Edit size={18} /></button>
                <button onClick={() => setMode('print')} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"><Printer size={18} /></button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-6">
                <DetailItem icon={<MapPin size={16}/>} label="Alamat Rumah" value={selected?.alamat} />
                <DetailItem icon={<Phone size={16}/>} label="Kontak Telepon" value={selected?.nomerHP} />
                <DetailItem icon={<Users size={16}/>} label="Lingkungan / Komsel" value={selected?.komsel} />
             </div>
             <div className="space-y-6">
                <DetailItem icon={<Calendar size={16}/>} label="Tempat, Tanggal Lahir" value={`${selected?.tempatLahir}, ${selected?.tanggalLahir}`} />
                <DetailItem icon={<User size={16}/>} label="Jenis Kelamin" value={selected?.jenisKelamin} />
                <DetailItem icon={<Mail size={16}/>} label="Nomer Keluarga" value={selected?.nomerKeluarga} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <Users className="text-slate-700" size={28} />
          <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Daftar Jemaat</h1>
        </div>
        <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest text-right">
          {churchInfo.nama} <br/>
          <span className="text-blue-500">Master Data / Jemaat</span>
        </div>
      </div>
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700">Data Jemaat Aktif</h2>
          <button 
            onClick={() => { setFormData({ jenisKelamin: 'Laki-Laki' }); setMode('add'); }} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <Plus size={16} /> Tambah Jemaat
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
             <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                   type="text" 
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                   className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20" 
                   placeholder="Cari jemaat berdasarkan nama atau nomer..." 
                />
             </div>
             <p className="text-[10px] text-slate-400 font-bold uppercase">Total: {filteredData.length} Jemaat</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="px-4 py-3 border-r border-slate-200 text-center w-12">#</th>
                  <th className="px-4 py-3 border-r border-slate-200">Foto</th>
                  <th className="px-4 py-3 border-r border-slate-200">Nama Lengkap</th>
                  <th className="px-4 py-3 border-r border-slate-200">No. Jemaat</th>
                  <th className="px-4 py-3 border-r border-slate-200">Jenis Kelamin</th>
                  <th className="px-4 py-3 border-r border-slate-200">Komsel</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-4 border-r border-slate-200 text-center text-slate-500 font-medium">{idx + 1}.</td>
                    <td className="px-4 py-4 border-r border-slate-200 w-16">
                       <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-sm mx-auto">
                          <img src={item.foto} className="w-full h-full object-cover" />
                       </div>
                    </td>
                    <td className="px-4 py-4 border-r border-slate-200 font-bold text-slate-800 uppercase tracking-tighter">{item.nama}</td>
                    <td className="px-4 py-4 border-r border-slate-200 font-medium text-blue-600">{item.nomerJemaat}</td>
                    <td className="px-4 py-4 border-r border-slate-200">{item.jenisKelamin}</td>
                    <td className="px-4 py-4 border-r border-slate-200 font-bold text-slate-500">{item.komsel}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => { setSelected(item); setMode('detail'); }} className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Eye size={14} /></button>
                        <button onClick={() => { setSelected(item); setFormData(item); setMode('edit'); }} className="p-1.5 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-all shadow-sm"><Edit size={14} /></button>
                        <button onClick={() => handleDelete(item.id, item.nama)} className="p-1.5 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 h-full">
      <style>{`
        .form-input { @apply w-full px-3 py-2 text-xs border border-slate-200 rounded bg-slate-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all; }
      `}</style>
      {mode === 'list' && renderListView()}
      {mode === 'print' && renderPrintView()}
      {mode === 'detail' && renderDetailView()}
      {(mode === 'add' || mode === 'edit') && renderFormView()}
    </div>
  );
};

const FormField: React.FC<{ label: string; children: React.ReactNode; required?: boolean }> = ({ label, children, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-black uppercase text-slate-600 tracking-wider">
      {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
    <div className="w-full">{children}</div>
  </div>
);

const DetailItem = ({ icon, label, value }: any) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-slate-50 text-blue-500 rounded-lg shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-bold text-slate-700">{value || '-'}</p>
    </div>
  </div>
);
