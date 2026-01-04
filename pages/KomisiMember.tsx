
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, ArrowLeft, 
  RotateCcw, CheckCircle2, FileText, UsersRound, 
  User, MapPin, Phone, Mail, Calendar, Briefcase, 
  ChevronRight, Filter, AlertCircle
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

type ViewMode = 'list' | 'add' | 'edit' | 'detail';

export const KomisiMember: React.FC<KomisiMemberProps> = ({ type, onBack }) => {
  const [data, setData] = useState<MemberData[]>([
    { id: '1', nama: 'Andi Pratama', jabatan: 'Ketua', jenisKelamin: 'Laki-Laki', alamat: 'Jl. Melati No. 12', nomerHP: '08123456789', status: 'Aktif', tempatLahir: 'Surabaya', tanggalLahir: '10/05/1995', tanggalBergabung: '12/01/2020', email: 'andi@gmail.com' },
    { id: '2', nama: 'Siska Amelia', jabatan: 'Sekretaris', jenisKelamin: 'Perempuan', alamat: 'Jl. Mawar No. 5', nomerHP: '08129876543', status: 'Aktif', tempatLahir: 'Jakarta', tanggalLahir: '22/08/1997', tanggalBergabung: '15/01/2021', email: 'siska@gmail.com' },
    { id: '3', nama: 'Budi Santoso', jabatan: 'Anggota', jenisKelamin: 'Laki-Laki', alamat: 'Jl. Anggrek No. 8', nomerHP: '08561234432', status: 'Non-Aktif', tempatLahir: 'Malang', tanggalLahir: '05/12/1994', tanggalBergabung: '20/02/2022' },
  ]);

  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<MemberData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Data Pribadi');

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.jabatan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus data anggota "${name}" dari ${type}?`)) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderTopNav = (title: string, currentAction?: string) => (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <UsersRound className="text-slate-800" size={28} />
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
      </div>
      <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest text-right flex-1">
        MASTER DATA / KOMISI / <span className="text-blue-500">{type}</span> 
        {currentAction && <span className="text-slate-300"> / {currentAction}</span>}
      </div>
    </div>
  );

  const renderTabs = () => (
    <div className="flex flex-wrap gap-1 mb-6 border-b border-slate-200">
      {['Data Pribadi', 'Struktur Organisasi', 'Aktivitas & Pelayanan', 'Info'].map(tab => (
        <button 
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-xs font-bold transition-all border-b-2 ${
            activeTab === tab 
              ? 'bg-blue-600 text-white border-blue-600 rounded-t-md' 
              : 'text-blue-600 hover:bg-slate-50 border-transparent'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      {renderTopNav(type)}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700">Daftar Anggota {type}</h2>
          <button 
            onClick={() => { setSelected(null); setMode('add'); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Plus size={16} /> Tambah Anggota
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Filter size={14} className="text-blue-500" />
              <span>Show</span>
              <select className="border border-slate-300 rounded px-2 py-1 bg-white font-bold outline-none">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 w-full md:w-auto">
              <span className="font-bold">Search:</span>
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-slate-300 rounded-full pl-9 pr-4 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none" 
                  placeholder="Cari nama atau jabatan..."
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="px-3 py-3 border-r border-slate-200 text-center w-12">#</th>
                  <th className="px-3 py-3 border-r border-slate-200">Nama Anggota</th>
                  <th className="px-3 py-3 border-r border-slate-200">Jabatan</th>
                  <th className="px-3 py-3 border-r border-slate-200">Gender</th>
                  <th className="px-3 py-3 border-r border-slate-200">Alamat</th>
                  <th className="px-3 py-3 border-r border-slate-200">No. HP</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center">Status</th>
                  <th className="px-3 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-3 py-4 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}.</td>
                    <td className="px-3 py-4 border-r border-slate-200 font-bold text-slate-800">{item.nama}</td>
                    <td className="px-3 py-4 border-r border-slate-200 font-medium text-blue-600">{item.jabatan}</td>
                    <td className="px-3 py-4 border-r border-slate-200">{item.jenisKelamin}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.alamat}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.nomerHP}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => { setSelected(item); setMode('edit'); }} className="p-1.5 bg-amber-400 hover:bg-amber-500 text-white rounded shadow-sm" title="Edit Data"><Edit size={12} /></button>
                        <button onClick={() => { setSelected(item); setMode('detail'); }} className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded shadow-sm" title="Lihat Detail"><Eye size={12} /></button>
                        <button onClick={() => handleDelete(item.id, item.nama)} className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded shadow-sm" title="Hapus Data"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="px-3 py-20 text-center text-slate-400 italic">Data anggota tidak ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4 mt-2">
            <div>Menampilkan 1 sampai {filteredData.length} dari {filteredData.length} data</div>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded font-bold">1</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFormView = (isEdit: boolean) => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      {renderTopNav(type, isEdit ? 'Edit Anggota' : 'Tambah Anggota')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700">{isEdit ? 'Edit Data Anggota' : 'Tambah Data Anggota Baru'}</h2>
          <button 
            onClick={() => setMode('list')} 
            className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <ArrowLeft size={14} /> Kembali
          </button>
        </div>

        <div className="p-6">
          {renderTabs()}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 max-w-5xl">
            <div className="space-y-4">
              <FormField label="Nama Lengkap" required>
                <input type="text" className="form-input" defaultValue={selected?.nama} placeholder="Masukkan nama lengkap" />
              </FormField>

              <FormField label="Jabatan">
                <select className="form-input bg-white" defaultValue={selected?.jabatan || 'Anggota'}>
                  <option>Ketua</option>
                  <option>Wakil Ketua</option>
                  <option>Sekretaris</option>
                  <option>Bendahara</option>
                  <option>Anggota</option>
                  <option>Pendamping</option>
                </select>
              </FormField>

              <FormField label="Jenis Kelamin">
                <div className="flex items-center gap-4 mt-1">
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input type="radio" name="jk" defaultChecked={selected?.jenisKelamin === 'Laki-Laki' || !selected} /> Laki-Laki
                  </label>
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input type="radio" name="jk" defaultChecked={selected?.jenisKelamin === 'Perempuan'} /> Perempuan
                  </label>
                </div>
              </FormField>

              <FormField label="Tempat Lahir">
                <input type="text" className="form-input" defaultValue={selected?.tempatLahir} placeholder="Kota lahir" />
              </FormField>

              <FormField label="Tanggal Lahir">
                <div className="relative">
                  <input type="text" className="form-input" defaultValue={selected?.tanggalLahir} placeholder="dd/mm/yyyy" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                </div>
              </FormField>
            </div>

            <div className="space-y-4">
              <FormField label="No. Handphone">
                <input type="text" className="form-input" defaultValue={selected?.nomerHP} placeholder="0812xxxx" />
              </FormField>

              <FormField label="Email">
                <input type="email" className="form-input" defaultValue={selected?.email} placeholder="alamat@email.com" />
              </FormField>

              <FormField label="Alamat">
                <textarea rows={3} className="form-input" defaultValue={selected?.alamat} placeholder="Alamat lengkap"></textarea>
              </FormField>

              <FormField label="Tanggal Bergabung">
                <div className="relative">
                  <input type="text" className="form-input" defaultValue={selected?.tanggalBergabung} placeholder="dd/mm/yyyy" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                </div>
              </FormField>

              <FormField label="Status">
                <select className="form-input bg-white" defaultValue={selected?.status || 'Aktif'}>
                  <option>Aktif</option>
                  <option>Non-Aktif</option>
                </select>
              </FormField>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-100 flex justify-end gap-3">
            <button onClick={() => setMode('list')} className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded shadow-sm transition-all flex items-center gap-2">
              <RotateCcw size={14} /> Batal
            </button>
            <button onClick={() => setMode('list')} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow-lg transition-all flex items-center gap-2">
              <CheckCircle2 size={16} /> Simpan Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailView = () => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      {renderTopNav(type, 'Detail Anggota')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700">Profil Anggota</h2>
          <button 
            onClick={() => setMode('list')} 
            className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <ArrowLeft size={14} /> Kembali
          </button>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Foto Profil */}
            <div className="w-full md:w-48 shrink-0 flex flex-col items-center">
              <div className="w-48 h-56 bg-slate-200 rounded-lg border-2 border-white shadow-md overflow-hidden flex items-center justify-center text-slate-400 relative group">
                {selected?.foto ? (
                  <img src={selected.foto} className="w-full h-full object-cover" alt={selected.nama} />
                ) : (
                  <User size={64} className="opacity-20" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-sm">
                    <FileText size={16} />
                  </button>
                </div>
              </div>
              <div className={`mt-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                selected?.status === 'Aktif' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
              }`}>
                {selected?.status}
              </div>
            </div>

            {/* Informasi Detail */}
            <div className="flex-1">
              <h3 className="text-2xl font-black text-slate-800 mb-1">{selected?.nama}</h3>
              <p className="text-blue-600 font-bold text-sm mb-6 flex items-center gap-2">
                <Briefcase size={16} /> {selected?.jabatan} - {type}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 border-t border-slate-100 pt-6">
                <DetailRow icon={<User size={14} />} label="Jenis Kelamin" value={selected?.jenisKelamin} />
                <DetailRow icon={<MapPin size={14} />} label="Tempat Lahir" value={selected?.tempatLahir} />
                <DetailRow icon={<Calendar size={14} />} label="Tanggal Lahir" value={selected?.tanggalLahir} />
                <DetailRow icon={<Phone size={14} />} label="No. Handphone" value={selected?.nomerHP} />
                <DetailRow icon={<Mail size={14} />} label="Email" value={selected?.email || '-'} />
                <DetailRow icon={<Calendar size={14} />} label="Bergabung Sejak" value={selected?.tanggalBergabung} />
                <div className="col-span-1 md:col-span-2">
                  <DetailRow icon={<MapPin size={14} />} label="Alamat Lengkap" value={selected?.alamat} />
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50/50 rounded-lg border border-blue-100 flex items-start gap-3">
                <AlertCircle className="text-blue-400 shrink-0" size={18} />
                <div>
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Catatan Keaktifan</p>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                    "Anggota aktif dalam kegiatan mingguan dan berkontribusi dalam tim kepanitiaan hari raya."
                  </p>
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
      {mode === 'list' && renderListView()}
      {mode === 'add' && renderFormView(false)}
      {mode === 'edit' && renderFormView(true)}
      {mode === 'detail' && renderDetailView()}

      <style>{`
        .form-input {
          @apply w-full px-3 py-2 text-[11px] border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 bg-slate-50/30;
        }
      `}</style>
    </div>
  );
};

const FormField: React.FC<{ label: string; children: React.ReactNode; required?: boolean }> = ({ label, children, required }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
    <label className="sm:w-48 text-[11px] font-bold text-slate-700 shrink-0">
      {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
    <div className="flex-1 w-full">{children}</div>
  </div>
);

const DetailRow: React.FC<{ icon: React.ReactNode, label: string; value: string | undefined }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 text-xs py-2 group">
    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-blue-100 group-hover:text-blue-500 transition-colors">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="font-bold text-slate-700">{value || '-'}</p>
    </div>
  </div>
);
