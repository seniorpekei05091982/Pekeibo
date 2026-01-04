
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, ArrowLeft, Calendar, User, Droplets,
  CheckCircle2, AlertCircle, Home, MapPin
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
      <label className="sm:w-32 text-[10px] font-black uppercase text-slate-500 tracking-widest shrink-0">
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
  { id: '1', nomerKartu: 'BAP-001/2023', nomerJemaat: 'J-101', nama: 'Daniel Pratama', jenisKelamin: 'Laki-Laki', tempatLahir: 'Jakarta', tanggalLahir: '1998-05-10', tanggalBaptis: '2023-12-20', pendeta: 'Pdt. Abraham K', tempatBaptis: 'Gereja Pusat' },
  { id: '2', nomerKartu: 'BAP-002/2023', nomerJemaat: 'J-105', nama: 'Maria Selena', jenisKelamin: 'Perempuan', tempatLahir: 'Bandung', tanggalLahir: '2000-08-15', tanggalBaptis: '2023-12-20', pendeta: 'Pdt. Abraham K', tempatBaptis: 'Gereja Pusat' },
];

export const Baptisan: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [data, setData] = useState<BaptisanData[]>(INITIAL_BAPTISAN);
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<BaptisanData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<BaptisanData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.nomerKartu.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleAdd = () => {
    setSelected(null);
    setFormData({ jenisKelamin: 'Laki-Laki', tanggalBaptis: new Date().toISOString().split('T')[0] });
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
    if (!formData.nama || !formData.nomerKartu) return alert('Nama dan Nomer Kartu wajib diisi');

    if (selected) {
      setData(prev => prev.map(item => item.id === selected.id ? (formData as BaptisanData) : item));
    } else {
      setData(prev => [{ ...formData as BaptisanData, id: Date.now().toString() }, ...prev]);
    }
    setMode('list');
    setFormData({});
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data baptisan "${name}"?`)) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderListView = () => (
    <div className="p-6 space-y-4">
      <TopStatsBar />
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 shadow-sm"><Home size={18} /></button>
          <h1 className="text-2xl font-black text-slate-800 tracking-tighter flex items-center gap-2"><Droplets className="text-blue-500" /> BAPTISAN AIR</h1>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-blue-500/20 active:scale-95 transition-all"><Plus size={16} /> Registrasi Baptis</button>
      </div>
      
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 space-y-6">
        <div className="flex justify-between items-center">
           <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Database Baptisan Air</h3>
           <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari Nama / No. Kartu..."
              className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead className="bg-slate-50 text-slate-400 font-black uppercase tracking-widest">
              <tr>
                <th className="px-4 py-4 w-12 text-center">#</th>
                <th className="px-4 py-4">Nama Lengkap</th>
                <th className="px-4 py-4">Tgl Baptis</th>
                <th className="px-4 py-4">Tempat Baptis</th>
                <th className="px-4 py-4">Pendeta</th>
                <th className="px-4 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-bold text-slate-600">
              {filteredData.map((item, i) => (
                <tr key={item.id} className="hover:bg-blue-50/20 transition-all group">
                  <td className="px-4 py-6 text-center text-slate-300">{i+1}</td>
                  <td className="px-4 py-6">
                    <div className="font-black text-slate-800 uppercase text-xs">{item.nama}</div>
                    <div className="text-[9px] text-blue-500 tracking-widest mt-1">{item.nomerKartu}</div>
                  </td>
                  <td className="px-4 py-6 text-emerald-600">{item.tanggalBaptis}</td>
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-1"><MapPin size={10} /> {item.tempatBaptis}</div>
                  </td>
                  <td className="px-4 py-6 uppercase">{item.pendeta}</td>
                  <td className="px-4 py-6 text-center">
                     <div className="flex justify-center gap-2">
                       <button onClick={() => { setSelected(item); setIsDetailOpen(true); }} className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Eye size={14} /></button>
                       <button onClick={() => handleEdit(item)} className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm"><Edit size={14} /></button>
                       <button onClick={() => handleDelete(item.id, item.nama)} className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"><Trash2 size={14} /></button>
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
    <div className="p-8 bg-slate-50 min-h-full animate-in slide-in-from-right duration-500">
      <TopStatsBar />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{selected ? 'Edit' : 'Tambah'} Data Baptisan</h1>
        <button onClick={() => setMode('list')} className="bg-slate-700 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><ArrowLeft size={16} /> Kembali</button>
      </div>
      
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl p-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <FormField label="Nomer Kartu Baptis" required><input type="text" value={formData.nomerKartu || ''} onChange={e => setFormData({...formData, nomerKartu: e.target.value})} className="form-input" placeholder="BAP-XXX/20XX" /></FormField>
          <FormField label="Nama Lengkap Jemaat" required><input type="text" value={formData.nama || ''} onChange={e => setFormData({...formData, nama: e.target.value})} className="form-input" /></FormField>
          <FormField label="Jenis Kelamin">
            <select className="form-input bg-slate-50" value={formData.jenisKelamin} onChange={e => setFormData({...formData, jenisKelamin: e.target.value as any})}>
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </FormField>
          <FormField label="Tanggal Baptis" required><input type="date" value={formData.tanggalBaptis || ''} onChange={e => setFormData({...formData, tanggalBaptis: e.target.value})} className="form-input" /></FormField>
          <FormField label="Pendeta Pembaptis"><input type="text" value={formData.pendeta || ''} onChange={e => setFormData({...formData, pendeta: e.target.value})} className="form-input" placeholder="Nama Pendeta" /></FormField>
          <FormField label="Tempat Dibaptis"><input type="text" value={formData.tempatBaptis || ''} onChange={e => setFormData({...formData, tempatBaptis: e.target.value})} className="form-input" placeholder="Nama Gereja / Kolam Baptis" /></FormField>
          <div className="md:col-span-2">
             <FormField label="Keterangan Tambahan"><textarea rows={3} value={formData.keterangan || ''} onChange={e => setFormData({...formData, keterangan: e.target.value})} className="form-input" placeholder="Catatan tambahan..."></textarea></FormField>
          </div>
        </div>
        <div className="mt-12 flex justify-end gap-4 border-t border-slate-50 pt-8">
          <button onClick={() => setMode('list')} className="px-10 py-4 bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all">Batalkan</button>
          <button onClick={handleSave} className="px-16 py-4 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-3"><CheckCircle2 size={20} /> Simpan Data Baptis</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full">
      {mode === 'list' ? renderListView() : renderFormView()}
      
      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Detail Sertifikat Baptisan">
        {selected && (
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-blue-600 shadow-xl border-4 border-white"><Droplets size={40} /></div>
              <div>
                <h4 className="text-2xl font-black text-slate-800 uppercase tracking-tighter leading-none">{selected.nama}</h4>
                <p className="text-xs text-blue-600 font-black tracking-[0.3em] mt-2">{selected.nomerKartu}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <DetailItem label="Tanggal Baptis" value={selected.tanggalBaptis} highlight />
               <DetailItem label="Tempat" value={selected.tempatBaptis} />
               <DetailItem label="Pendeta" value={selected.pendeta} />
               <DetailItem label="Nomer Jemaat" value={selected.nomerJemaat} />
            </div>
          </div>
        )}
      </Modal>

      <style>{`.form-input { @apply w-full px-5 py-4 text-sm border border-slate-200 rounded-2xl outline-none focus:border-blue-500 bg-slate-50 font-bold transition-all; }`}</style>
    </div>
  );
};

const DetailItem = ({ label, value, highlight }: any) => (
  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`font-black text-sm uppercase ${highlight ? 'text-blue-600' : 'text-slate-700'}`}>{value}</p>
  </div>
);
