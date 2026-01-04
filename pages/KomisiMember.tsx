
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, ArrowLeft, 
  RotateCcw, CheckCircle2, FileText, UsersRound, 
  User, MapPin, Phone, Mail, Calendar, Briefcase, 
  ChevronRight, Filter, AlertCircle, Home
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';
import { Modal } from '../components/Modal';

interface MemberData {
  id: string;
  nama: string;
  jabatan: string;
  jenisKelamin: 'Laki-Laki' | 'Perempuan';
  alamat: string;
  nomerHP: string;
  status: 'Aktif' | 'Non-Aktif';
  foto?: string;
  tempatLahir?: string;
  tanggalLahir?: string;
  tanggalBergabung?: string;
  email?: string;
  keterangan?: string;
}

interface KomisiMemberProps {
  type: string;
  onBack: () => void;
}

type ViewMode = 'list' | 'form';

export const KomisiMember: React.FC<KomisiMemberProps> = ({ type, onBack }) => {
  const [data, setData] = useState<MemberData[]>([
    { id: '1', nama: 'Andi Pratama', jabatan: 'Ketua', jenisKelamin: 'Laki-Laki', alamat: 'Jl. Melati No. 12', nomerHP: '08123456789', status: 'Aktif', tempatLahir: 'Surabaya', tanggalLahir: '10/05/1995', tanggalBergabung: '12/01/2020', email: 'andi@gmail.com', foto: 'https://ui-avatars.com/api/?name=Andi+Pratama&background=random' },
    { id: '2', nama: 'Siska Amelia', jabatan: 'Sekretaris', jenisKelamin: 'Perempuan', alamat: 'Jl. Mawar No. 5', nomerHP: '08129876543', status: 'Aktif', tempatLahir: 'Jakarta', tanggalLahir: '22/08/1997', tanggalBergabung: '15/01/2021', email: 'siska@gmail.com', foto: 'https://ui-avatars.com/api/?name=Siska+Amelia&background=random' },
  ]);

  const [mode, setMode] = useState<ViewMode>('list');
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState<MemberData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Data Pribadi');
  
  // Form State
  const [formData, setFormData] = useState<Partial<MemberData>>({});

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.jabatan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleAdd = () => {
    setSelected(null);
    setFormData({
      jenisKelamin: 'Laki-Laki',
      status: 'Aktif',
      jabatan: 'Anggota',
      tanggalBergabung: new Date().toLocaleDateString('id-ID')
    });
    setIsEdit(false);
    setMode('form');
  };

  const handleEdit = (item: MemberData) => {
    setSelected(item);
    setFormData(item);
    setIsEdit(true);
    setMode('form');
  };

  const handleSave = () => {
    if (!formData.nama) {
      alert('Nama anggota wajib diisi!');
      return;
    }

    if (isEdit && selected) {
      setData(data.map(item => item.id === selected.id ? { ...item, ...formData } as MemberData : item));
      alert('Data anggota berhasil diperbarui.');
    } else {
      const newItem: MemberData = {
        ...(formData as MemberData),
        id: Date.now().toString(),
        foto: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.nama || '')}&background=random`
      };
      setData([newItem, ...data]);
      alert('Anggota baru berhasil ditambahkan.');
    }
    setMode('list');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus data anggota "${name}" dari ${type}?`)) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderTopNav = (title: string, currentAction?: string) => (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 transition-all shadow-sm"
        >
          <Home size={18} />
        </button>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
      </div>
      <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest text-right flex-1">
        MASTER DATA / KOMISI / <span className="text-blue-500">{type}</span> 
        {currentAction && <span className="text-slate-300"> / {currentAction}</span>}
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      {renderTopNav(type)}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-tighter">Daftar Keanggotaan {type}</h2>
          <button 
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Plus size={16} /> Tambah Anggota
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-slate-300 rounded-full pl-9 pr-4 py-1.5 text-xs outline-none focus:ring-1 focus:ring-blue-500" 
                placeholder="Cari nama atau jabatan..."
              />
            </div>
            <div className="flex gap-1">
               {['Excel', 'PDF', 'Printer'].map(btn => (
                 <button key={btn} className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white text-[10px] font-bold rounded shadow-sm transition-all">{btn}</button>
               ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase">
                <tr>
                  <th className="px-3 py-3 border-r border-slate-200 text-center w-12">#</th>
                  <th className="px-3 py-3 border-r border-slate-200">Nama Lengkap</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center">Jabatan</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center">No. HP</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center w-24">Status</th>
                  <th className="px-3 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-3 py-4 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}.</td>
                    <td className="px-3 py-4 border-r border-slate-200 font-bold text-slate-800 uppercase">{item.nama}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-center font-medium text-blue-600">{item.jabatan}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-center text-slate-600">{item.nomerHP}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => { setSelected(item); setIsDetailOpen(true); }} className="p-1.5 bg-emerald-500 text-white rounded"><Eye size={12} /></button>
                        <button onClick={() => handleEdit(item)} className="p-1.5 bg-amber-400 text-white rounded"><Edit size={12} /></button>
                        <button onClick={() => handleDelete(item.id, item.nama)} className="p-1.5 bg-rose-600 text-white rounded"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-3 py-10 text-center text-slate-400 italic">Data anggota tidak ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFormView = () => (
    <div className="p-6 bg-slate-100 min-h-full animate-in slide-in-from-right duration-300">
      <TopStatsBar />
      {renderTopNav(type, isEdit ? 'Edit Anggota' : 'Tambah Anggota')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-tighter">{isEdit ? 'Edit Data Anggota' : 'Tambah Data Anggota Baru'}</h2>
          <button onClick={() => setMode('list')} className="bg-slate-700 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2 transition-all">
            <ArrowLeft size={14} /> Kembali
          </button>
        </div>

        <div className="p-8">
          <div className="flex border-b border-slate-200 mb-8">
            {['Data Pribadi', 'Struktur Organisasi', 'Info Lain'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-xs font-bold border-t border-x rounded-t-md transition-all ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-blue-600 border-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 max-w-5xl">
            <div className="space-y-4">
              <FormField label="Nama Lengkap" required>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.nama || ''} 
                  onChange={e => setFormData({...formData, nama: e.target.value})} 
                  placeholder="Nama Lengkap Anggota" 
                />
              </FormField>
              <FormField label="Jabatan">
                <select className="form-input bg-white" value={formData.jabatan} onChange={e => setFormData({...formData, jabatan: e.target.value})}>
                  <option>Ketua</option>
                  <option>Sekretaris</option>
                  <option>Bendahara</option>
                  <option>Anggota</option>
                  <option>Koordinator</option>
                </select>
              </FormField>
              <FormField label="Jenis Kelamin">
                <select className="form-input bg-white" value={formData.jenisKelamin} onChange={e => setFormData({...formData, jenisKelamin: e.target.value as any})}>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </FormField>
            </div>
            <div className="space-y-4">
              <FormField label="No. Handphone">
                <input type="text" className="form-input" value={formData.nomerHP || ''} onChange={e => setFormData({...formData, nomerHP: e.target.value})} placeholder="08xxxx" />
              </FormField>
              <FormField label="Status Keanggotaan">
                <select className="form-input bg-white" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                  <option value="Aktif">Aktif</option>
                  <option value="Non-Aktif">Non-Aktif</option>
                </select>
              </FormField>
              <FormField label="Alamat Rumah">
                <textarea rows={2} className="form-input" value={formData.alamat || ''} onChange={e => setFormData({...formData, alamat: e.target.value})} placeholder="Alamat lengkap"></textarea>
              </FormField>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-100 flex justify-end gap-3">
            <button onClick={() => setMode('list')} className="px-6 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded">Batal</button>
            <button onClick={handleSave} className="px-10 py-2 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded shadow-lg flex items-center gap-2">
              <CheckCircle2 size={16} /> Simpan Anggota
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full">
      {mode === 'list' ? renderListView() : renderFormView()}
      
      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title={`Profil Anggota ${type}`}>
        {selected && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-20 h-20 rounded-xl bg-white p-1 shadow-lg overflow-hidden border border-slate-100">
                 <img src={selected.foto} alt="Profile" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{selected.nama}</h4>
                <p className="text-sm text-blue-600 font-bold uppercase tracking-widest">{selected.jabatan}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="Gender" value={selected.jenisKelamin} />
              <DetailItem label="Kontak" value={selected.nomerHP} />
              <DetailItem label="Tgl Bergabung" value={selected.tanggalBergabung} />
              <DetailItem label="Status" value={selected.status} highlight />
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Alamat Domisili</p>
               <p className="text-xs text-slate-700 font-medium italic">"{selected.alamat}"</p>
            </div>
          </div>
        )}
      </Modal>

      <style>{`.form-input { @apply w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-500 outline-none transition-all; }`}</style>
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

const DetailItem = ({ label, value, highlight }: { label: string, value: string | undefined, highlight?: boolean }) => (
  <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-lg">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
    <p className={`font-bold text-xs ${highlight ? 'text-blue-600' : 'text-slate-700'}`}>{value || '-'}</p>
  </div>
);
