
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, FileSpreadsheet, FileText, Copy, Printer, 
  ChevronDown, Edit, Eye, Trash2, ArrowLeft, Calendar, User,
  Droplets, Filter, CheckCircle2, AlertCircle, Home
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';
import { Modal } from '../components/Modal';

// Helper Components
const UserPlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
  </svg>
);

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, children, required, error }) => (
  <div className="flex flex-col gap-1">
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <label className="sm:w-32 text-xs font-bold text-slate-700 shrink-0">
        {label}{required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
    {error && (
      <div className="sm:ml-32 text-[10px] text-rose-500 flex items-center gap-1 font-medium">
        <AlertCircle size={10} /> {error}
      </div>
    )}
  </div>
);

type ViewMode = 'list' | 'form';

interface ChildDedication {
  id: string;
  nomerKartu: string;
  namaAnak: string;
  jenisKelamin: 'Laki-Laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string;
  namaAyah: string;
  namaIbu: string;
  alamat: string;
  tanggalPenyerahan: string;
  namaPendeta?: string;
  namaGereja?: string;
  keterangan?: string;
}

const INITIAL_DATA: ChildDedication[] = [
  { id: '1', nomerKartu: '201/KPA/2022', namaAnak: 'Joko', jenisKelamin: 'Laki-Laki', tempatLahir: 'Surabaya', tanggalLahir: '02/10/2022', namaAyah: 'Bambang', namaIbu: 'Arti', alamat: 'Jl. Tidar 123', tanggalPenyerahan: '23/10/2022', namaPendeta: 'Pdt. Abraham', namaGereja: 'GBT Pusat' },
  { id: '2', nomerKartu: '202/KPA/2022', namaAnak: 'Mira AB', jenisKelamin: 'Perempuan', tempatLahir: 'Surabaya', tanggalLahir: '28/08/2022', namaAyah: 'Arif', namaIbu: 'Rinda', alamat: 'Jl. Tunjungan', tanggalPenyerahan: '17/10/2022' },
  { id: '3', nomerKartu: '203/KPA/2022', namaAnak: 'Amir S', jenisKelamin: 'Laki-Laki', tempatLahir: 'Surabaya', tanggalLahir: '04/09/2022', namaAyah: 'Charles', namaIbu: 'Dini', alamat: 'Jl. Pemuda 10', tanggalPenyerahan: '11/10/2022' },
];

export const PenyerahanAnak: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [data, setData] = useState<ChildDedication[]>(INITIAL_DATA);
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<ChildDedication | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [filterDate, setFilterDate] = useState('All');

  // Form State
  const [formData, setFormData] = useState<Partial<ChildDedication>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.namaAnak.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nomerKartu.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGender = filterGender === 'All' || item.jenisKelamin === filterGender;
      const matchesDate = filterDate === 'All' || item.tanggalPenyerahan === filterDate;

      return matchesSearch && matchesGender && matchesDate;
    });
  }, [data, searchTerm, filterGender, filterDate]);

  const uniqueDates = useMemo(() => {
    return Array.from(new Set(data.map(item => item.tanggalPenyerahan))).sort();
  }, [data]);

  const handleAdd = () => {
    setSelected(null);
    setFormData({
      jenisKelamin: 'Laki-Laki',
      tanggalPenyerahan: new Date().toLocaleDateString('id-ID'),
    });
    setErrors({});
    setMode('form');
  };

  const handleEdit = (item: ChildDedication) => {
    setSelected(item);
    setFormData(item);
    setErrors({});
    setMode('form');
  };

  const handleView = (item: ChildDedication) => {
    setSelected(item);
    setIsDetailOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data penyerahan anak "${name}"?`)) {
      setData(prev => prev.filter(item => item.id !== id));
      alert('Data berhasil dihapus.');
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nomerKartu) newErrors.nomerKartu = 'Nomer kartu wajib diisi';
    if (!formData.namaAnak) newErrors.namaAnak = 'Nama anak wajib diisi';
    if (!formData.tanggalLahir) newErrors.tanggalLahir = 'Tanggal lahir wajib diisi';
    if (!formData.tanggalPenyerahan) newErrors.tanggalPenyerahan = 'Tanggal penyerahan wajib diisi';
    
    // Simple date format check (dd/mm/yyyy)
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (formData.tanggalLahir && !dateRegex.test(formData.tanggalLahir)) {
      newErrors.tanggalLahir = 'Format tanggal harus dd/mm/yyyy';
    }
    if (formData.tanggalPenyerahan && !dateRegex.test(formData.tanggalPenyerahan)) {
      newErrors.tanggalPenyerahan = 'Format tanggal harus dd/mm/yyyy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    if (selected) {
      // Update
      setData(prev => prev.map(item => item.id === selected.id ? (formData as ChildDedication) : item));
      alert('Data berhasil diperbarui.');
    } else {
      // Create
      const newItem: ChildDedication = {
        ...(formData as ChildDedication),
        id: Math.random().toString(36).substr(2, 9),
      };
      setData(prev => [newItem, ...prev]);
      alert('Data baru berhasil ditambahkan.');
    }
    setMode('list');
  };

  const renderListView = () => (
    <div className="space-y-4">
      <TopStatsBar />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 transition-all shadow-sm"
            title="Kembali ke Dashboard"
          >
            <Home size={18} />
          </button>
          <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
            <UserPlusIcon /> Penyerahan Anak
          </h1>
        </div>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          MAIN MENU / Pelayanan Pastoral / <span className="text-blue-500">Penyerahan Anak</span>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-600">Data Penyerahan Anak</h2>
          <button 
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus size={14} /> Add Penyerahan Anak
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Controls & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Filter:</span>
                <select 
                  value={filterGender}
                  onChange={(e) => setFilterGender(e.target.value)}
                  className="border border-slate-200 rounded px-2 py-1 text-[11px] font-semibold outline-none bg-slate-50"
                >
                  <option value="All">Semua Gender</option>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                <select 
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="border border-slate-200 rounded px-2 py-1 text-[11px] font-semibold outline-none bg-slate-50"
                >
                  <option value="All">Semua Tanggal</option>
                  {uniqueDates.map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs flex-1 max-w-xs ml-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Nama / No. Kartu..."
                  className="w-full border border-slate-300 rounded-full pl-9 pr-4 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-600">
                <tr>
                  <th className="px-3 py-2 border-r border-slate-200 w-10 text-center">#</th>
                  <th className="px-3 py-2 border-r border-slate-200">Nomer Kartu</th>
                  <th className="px-3 py-2 border-r border-slate-200">Nama Anak</th>
                  <th className="px-3 py-2 border-r border-slate-200">Jenis Kelamin</th>
                  <th className="px-3 py-2 border-r border-slate-200">Tgl Lahir</th>
                  <th className="px-3 py-2 border-r border-slate-200">Orang Tua</th>
                  <th className="px-3 py-2 border-r border-slate-200">Tgl Penyerahan</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-3 py-3 border-r border-slate-200 text-center font-medium">{idx + 1}.</td>
                    <td className="px-3 py-3 border-r border-slate-200 font-bold text-slate-700">{item.nomerKartu}</td>
                    <td className="px-3 py-3 border-r border-slate-200 font-bold">{item.namaAnak}</td>
                    <td className="px-3 py-3 border-r border-slate-200">{item.jenisKelamin}</td>
                    <td className="px-3 py-3 border-r border-slate-200">{item.tanggalLahir}</td>
                    <td className="px-3 py-3 border-r border-slate-200">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Ayah: {item.namaAyah}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Ibu: {item.namaIbu}</div>
                    </td>
                    <td className="px-3 py-3 border-r border-slate-200 font-bold text-blue-600">{item.tanggalPenyerahan}</td>
                    <td className="px-3 py-3 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => handleEdit(item)} className="p-1.5 bg-amber-400 hover:bg-amber-500 text-white rounded shadow-sm"><Edit size={12} /></button>
                        <button onClick={() => handleView(item)} className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded shadow-sm"><Eye size={12} /></button>
                        <button onClick={() => handleDelete(item.id, item.namaAnak)} className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded shadow-sm"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="px-3 py-10 text-center text-slate-400 italic font-medium bg-slate-50/20">
                      Tidak ada data penyerahan anak yang sesuai pencarian.
                    </td>
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
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <TopStatsBar />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          {selected ? <Edit className="text-blue-600" /> : <Plus className="text-blue-600" />} 
          {selected ? 'Edit' : 'Add'} Penyerahan Anak
        </h1>
        <button onClick={() => setMode('list')} className="bg-slate-500 hover:bg-slate-600 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-all">
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6">
          <div className="flex border-b border-slate-200 mb-6">
            <button className="px-6 py-2 bg-blue-600 text-white font-bold text-xs rounded-t-md">Informasi Data</button>
            <button className="px-6 py-2 bg-slate-100 text-slate-500 font-bold text-xs border-x border-t border-slate-200 rounded-t-md opacity-50 cursor-not-allowed">Lampiran Dokumen</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl">
            <FormField label="Nomer Kartu" required error={errors.nomerKartu}>
              <input 
                type="text" 
                value={formData.nomerKartu || ''} 
                onChange={e => setFormData({...formData, nomerKartu: e.target.value})}
                className={`form-input ${errors.nomerKartu ? 'border-rose-400 bg-rose-50/30' : ''}`} 
                placeholder="Contoh: 201/KPA/2024" 
              />
            </FormField>
            
            <FormField label="Nomer Jemaat">
              <div className="relative">
                <input type="text" className="form-input pr-10" placeholder="Pencarian Jemaat (Opsional)" />
                <button className="absolute right-0 top-0 h-full px-3 bg-teal-500 text-white rounded-r">
                  <Search size={14} />
                </button>
              </div>
            </FormField>

            <FormField label="Nama Anak" required error={errors.namaAnak}>
              <input 
                type="text" 
                value={formData.namaAnak || ''} 
                onChange={e => setFormData({...formData, namaAnak: e.target.value})}
                className={`form-input ${errors.namaAnak ? 'border-rose-400 bg-rose-50/30' : ''}`} 
                placeholder="Nama Lengkap Anak" 
              />
            </FormField>

            <FormField label="Jenis Kelamin">
              <select 
                className="form-input" 
                value={formData.jenisKelamin || 'Laki-Laki'}
                onChange={e => setFormData({...formData, jenisKelamin: e.target.value as any})}
              >
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </FormField>

            <FormField label="Tempat Lahir">
              <input 
                type="text" 
                value={formData.tempatLahir || ''} 
                onChange={e => setFormData({...formData, tempatLahir: e.target.value})}
                className="form-input" 
                placeholder="Kota Kelahiran" 
              />
            </FormField>

            <FormField label="Tanggal Lahir" required error={errors.tanggalLahir}>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.tanggalLahir || ''} 
                  onChange={e => setFormData({...formData, tanggalLahir: e.target.value})}
                  className={`form-input ${errors.tanggalLahir ? 'border-rose-400 bg-rose-50/30' : ''}`} 
                  placeholder="dd/mm/yyyy" 
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              </div>
            </FormField>

            <FormField label="Nama Ayah">
              <input 
                type="text" 
                value={formData.namaAyah || ''} 
                onChange={e => setFormData({...formData, namaAyah: e.target.value})}
                className="form-input" 
                placeholder="Nama Ayah" 
              />
            </FormField>

            <FormField label="Nama Ibu">
              <input 
                type="text" 
                value={formData.namaIbu || ''} 
                onChange={e => setFormData({...formData, namaIbu: e.target.value})}
                className="form-input" 
                placeholder="Nama Ibu" 
              />
            </FormField>

            <FormField label="Alamat Rumah">
              <textarea 
                rows={2} 
                value={formData.alamat || ''} 
                onChange={e => setFormData({...formData, alamat: e.target.value})}
                className="form-input" 
                placeholder="Alamat Lengkap"
              ></textarea>
            </FormField>

            <FormField label="Tgl Penyerahan" required error={errors.tanggalPenyerahan}>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.tanggalPenyerahan || ''} 
                  onChange={e => setFormData({...formData, tanggalPenyerahan: e.target.value})}
                  className={`form-input ${errors.tanggalPenyerahan ? 'border-rose-400 bg-rose-50/30' : ''}`} 
                  placeholder="dd/mm/yyyy" 
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              </div>
            </FormField>

            <FormField label="Pendeta">
              <input 
                type="text" 
                value={formData.namaPendeta || ''} 
                onChange={e => setFormData({...formData, namaPendeta: e.target.value})}
                className="form-input" 
                placeholder="Nama Pendeta Pelayan" 
              />
            </FormField>

            <FormField label="Keterangan">
              <input 
                type="text" 
                value={formData.keterangan || ''} 
                onChange={e => setFormData({...formData, keterangan: e.target.value})}
                className="form-input" 
                placeholder="Catatan tambahan" 
              />
            </FormField>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end gap-3">
             <button onClick={() => setMode('list')} className="px-6 py-2 bg-slate-200 text-slate-700 font-bold rounded text-xs hover:bg-slate-300 transition-colors">Batal</button>
             <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2">
               <CheckCircle2 size={16} /> Simpan Data
             </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-slate-100 min-h-full">
      {mode === 'list' ? renderListView() : renderFormView()}

      {/* View Detail Modal */}
      <Modal 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        title="Detail Penyerahan Anak"
      >
        {selected && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 ring-4 ring-white shadow-sm">
                <User size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800 uppercase tracking-tight">{selected.namaAnak}</h4>
                <p className="text-sm text-blue-600 font-bold tracking-wider">{selected.nomerKartu}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="Jenis Kelamin" value={selected.jenisKelamin} />
              <DetailItem label="Tempat, Tgl Lahir" value={`${selected.tempatLahir}, ${selected.tanggalLahir}`} />
              <DetailItem label="Nama Ayah" value={selected.namaAyah} />
              <DetailItem label="Nama Ibu" value={selected.namaIbu} />
              <DetailItem label="Tgl Penyerahan" value={selected.tanggalPenyerahan} highlight />
              <DetailItem label="Pendeta Pelayan" value={selected.namaPendeta || '-'} />
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Alamat Rumah</p>
              <p className="text-xs text-slate-700 font-medium leading-relaxed italic">"{selected.alamat || 'Alamat tidak tersedia'}"</p>
            </div>

            {selected.keterangan && (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1">Catatan Keterangan</p>
                <p className="text-xs text-amber-700 font-medium">{selected.keterangan}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      <style>{`
        .form-input {
          @apply w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 bg-white;
        }
      `}</style>
    </div>
  );
};

const DetailItem = ({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) => (
  <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-lg">
    <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider mb-0.5">{label}</p>
    <p className={`font-bold text-xs ${highlight ? 'text-blue-600' : 'text-slate-700'}`}>{value}</p>
  </div>
);
