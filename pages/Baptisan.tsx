
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, ArrowLeft, Calendar, User, Droplets,
  CheckCircle2, AlertCircle, Home
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';
import { Modal } from '../components/Modal';

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
      <div className="flex-1 w-full">{children}</div>
    </div>
    {error && (
      <div className="sm:ml-32 text-[10px] text-rose-500 flex items-center gap-1 font-medium">
        <AlertCircle size={10} /> {error}
      </div>
    )}
  </div>
);

type ViewMode = 'list' | 'form';

interface BaptisanData {
  id: string;
  nomerKartu: string;
  nomerJemaat: string;
  nama: string;
  jenisKelamin: 'Laki-Laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string;
  tanggalBaptis: string;
  pendeta: string;
  tempatBaptis: string;
  keterangan?: string;
}

const INITIAL_BAPTISAN: BaptisanData[] = [
  { id: '1', nomerKartu: 'BAP-001/2023', nomerJemaat: 'J-101', nama: 'Daniel Pratama', jenisKelamin: 'Laki-Laki', tempatLahir: 'Jakarta', tanggalLahir: '10/05/1998', tanggalBaptis: '20/12/2023', pendeta: 'Pdt. Abraham', tempatBaptis: 'Gereja Pusat' },
  { id: '2', nomerKartu: 'BAP-002/2023', nomerJemaat: 'J-105', nama: 'Maria Selena', jenisKelamin: 'Perempuan', tempatLahir: 'Bandung', tanggalLahir: '15/08/2000', tanggalBaptis: '20/12/2023', pendeta: 'Pdt. Abraham', tempatBaptis: 'Gereja Pusat' },
  { id: '3', nomerKartu: 'BAP-003/2024', nomerJemaat: 'J-202', nama: 'Samuel Wijaya', jenisKelamin: 'Laki-Laki', tempatLahir: 'Surabaya', tanggalLahir: '22/11/1995', tanggalBaptis: '15/01/2024', pendeta: 'Pdt. Lukas', tempatBaptis: 'Kolam Baptis X' },
];

export const Baptisan: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [data, setData] = useState<BaptisanData[]>(INITIAL_BAPTISAN);
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<BaptisanData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [formData, setFormData] = useState<Partial<BaptisanData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.nomerKartu.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = filterGender === 'All' || item.jenisKelamin === filterGender;
      return matchesSearch && matchesGender;
    });
  }, [data, searchTerm, filterGender]);

  const handleAdd = () => {
    setSelected(null);
    setFormData({ jenisKelamin: 'Laki-Laki', tanggalBaptis: new Date().toLocaleDateString('id-ID') });
    setErrors({});
    setMode('form');
  };

  const handleEdit = (item: BaptisanData) => {
    setSelected(item);
    setFormData(item);
    setErrors({});
    setMode('form');
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nomerKartu) newErrors.nomerKartu = 'Nomer kartu wajib diisi';
    if (!formData.nama) newErrors.nama = 'Nama lengkap wajib diisi';
    if (!formData.tanggalBaptis) newErrors.tanggalBaptis = 'Tanggal baptis wajib diisi';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (selected) {
      setData(prev => prev.map(item => item.id === selected.id ? (formData as BaptisanData) : item));
    } else {
      setData(prev => [{ ...formData as BaptisanData, id: Date.now().toString() }, ...prev]);
    }
    setMode('list');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data baptisan "${name}"?`)) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderListView = () => (
    <div className="space-y-4">
      <TopStatsBar />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 transition-all shadow-sm"
            title="Kembali ke Dashboard"
          >
            <Home size={18} />
          </button>
          <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2"><Droplets className="text-blue-500" /> Baptisan Air</h1>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 shadow-sm"><Plus size={14} /> Add Baptisan</button>
      </div>
      
      <div className="bg-white rounded border border-slate-200 p-4 space-y-4">
        <div className="flex flex-wrap justify-between gap-4">
          <select 
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            className="border border-slate-200 rounded px-3 py-1.5 text-xs font-semibold outline-none bg-slate-50"
          >
            <option value="All">Semua Gender</option>
            <option value="Laki-Laki">Laki-Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari Nama / No. Kartu..."
              className="w-full border border-slate-300 rounded-full pl-9 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-y border-slate-200">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Nomer Kartu</th>
                <th className="px-3 py-2">Nama</th>
                <th className="px-3 py-2">Gender</th>
                <th className="px-3 py-2">Tgl Baptis</th>
                <th className="px-3 py-2">Pendeta</th>
                <th className="px-3 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item, i) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-3">{i+1}.</td>
                  <td className="px-3 py-3 font-bold text-slate-700">{item.nomerKartu}</td>
                  <td className="px-3 py-3 font-semibold">{item.nama}</td>
                  <td className="px-3 py-3">{item.jenisKelamin}</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{item.tanggalBaptis}</td>
                  <td className="px-3 py-3">{item.pendeta}</td>
                  <td className="px-3 py-3 text-center">
                     <div className="flex justify-center gap-1">
                       <button onClick={() => handleEdit(item)} className="p-1.5 bg-amber-400 text-white rounded shadow-sm"><Edit size={12} /></button>
                       <button onClick={() => { setSelected(item); setIsDetailOpen(true); }} className="p-1.5 bg-emerald-500 text-white rounded shadow-sm"><Eye size={12} /></button>
                       <button onClick={() => handleDelete(item.id, item.nama)} className="p-1.5 bg-rose-600 text-white rounded shadow-sm"><Trash2 size={12} /></button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFormView = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <TopStatsBar />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-700">{selected ? 'Edit' : 'Add'} Baptisan Air</h1>
        <button onClick={() => setMode('list')} className="bg-slate-500 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2"><ArrowLeft size={14} /> Back</button>
      </div>
      <div className="bg-white rounded border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <FormField label="Nomer Kartu" required error={errors.nomerKartu}><input type="text" value={formData.nomerKartu || ''} onChange={e => setFormData({...formData, nomerKartu: e.target.value})} className="form-input" /></FormField>
          <FormField label="Nama Lengkap" required error={errors.nama}><input type="text" value={formData.nama || ''} onChange={e => setFormData({...formData, nama: e.target.value})} className="form-input" /></FormField>
          <FormField label="Jenis Kelamin">
            <select className="form-input" value={formData.jenisKelamin} onChange={e => setFormData({...formData, jenisKelamin: e.target.value as any})}>
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </FormField>
          <FormField label="Tempat Lahir"><input type="text" value={formData.tempatLahir || ''} onChange={e => setFormData({...formData, tempatLahir: e.target.value})} className="form-input" /></FormField>
          <FormField label="Tanggal Lahir"><input type="text" value={formData.tanggalLahir || ''} onChange={e => setFormData({...formData, tanggalLahir: e.target.value})} className="form-input" placeholder="dd/mm/yyyy" /></FormField>
          <FormField label="Tanggal Baptis" required error={errors.tanggalBaptis}><input type="text" value={formData.tanggalBaptis || ''} onChange={e => setFormData({...formData, tanggalBaptis: e.target.value})} className="form-input" placeholder="dd/mm/yyyy" /></FormField>
          <FormField label="Nama Pendeta"><input type="text" value={formData.pendeta || ''} onChange={e => setFormData({...formData, pendeta: e.target.value})} className="form-input" /></FormField>
          <FormField label="Tempat Baptis"><input type="text" value={formData.tempatBaptis || ''} onChange={e => setFormData({...formData, tempatBaptis: e.target.value})} className="form-input" /></FormField>
        </div>
        <div className="mt-10 flex justify-end gap-3 border-t pt-6">
          <button onClick={() => setMode('list')} className="px-6 py-2 bg-slate-200 text-xs font-bold rounded">Batal</button>
          <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded shadow-lg shadow-blue-100 flex items-center gap-2"><CheckCircle2 size={16} /> Simpan Data</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-slate-100 min-h-full">
      {mode === 'list' ? renderListView() : renderFormView()}
      
      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Detail Baptisan Air">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shadow-sm"><User size={32} /></div>
              <div>
                <h4 className="text-xl font-bold text-slate-800 uppercase">{selected.nama}</h4>
                <p className="text-sm text-blue-600 font-bold">{selected.nomerKartu}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Jenis Kelamin</p>
                <p className="font-bold text-slate-700">{selected.jenisKelamin}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Tanggal Baptis</p>
                <p className="font-bold text-blue-600">{selected.tanggalBaptis}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Pendeta Pelayan</p>
                <p className="font-bold text-slate-700">{selected.pendeta}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Tempat Baptis</p>
                <p className="font-bold text-slate-700">{selected.tempatBaptis}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <style>{`.form-input { @apply w-full px-3 py-2 text-xs border border-slate-300 rounded outline-none focus:border-blue-500 bg-white transition-all; }`}</style>
    </div>
  );
};
