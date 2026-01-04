
import React, { useState, useMemo } from 'react';
import { 
  Plus, MessageCircle, Edit, Trash2, ArrowLeft, Search, UserCheck,
  CheckCircle2, AlertCircle, Calendar, Eye
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

interface KonselingData {
  id: string;
  nomer: string;
  namaKonseli: string;
  tanggal: string;
  konselor: string;
  topik: 'Keluarga' | 'Pekerjaan' | 'Spiritual' | 'Lainnya';
  status: 'Proses' | 'Selesai' | 'Dirujuk';
  keterangan?: string;
}

const INITIAL_KONSELING: KonselingData[] = [
  { id: '1', nomer: 'K-24/001', namaKonseli: 'Santi Maria', tanggal: '10/01/2024', konselor: 'Pdt. Samuel', topik: 'Keluarga', status: 'Selesai' },
  { id: '2', nomer: 'K-24/002', namaKonseli: 'Budi Santoso', tanggal: '15/01/2024', konselor: 'Pdt. Abraham', topik: 'Pekerjaan', status: 'Proses' },
  { id: '3', nomer: 'K-24/003', namaKonseli: 'Indah Kusuma', tanggal: '20/01/2024', konselor: 'Pdt. Samuel', topik: 'Spiritual', status: 'Dirujuk' },
];

export const Konseling: React.FC = () => {
  const [data, setData] = useState<KonselingData[]>(INITIAL_KONSELING);
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<KonselingData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [formData, setFormData] = useState<Partial<KonselingData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.namaKonseli.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.nomer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, filterStatus]);

  const handleAdd = () => {
    setSelected(null);
    setFormData({ topik: 'Keluarga', status: 'Proses', tanggal: new Date().toLocaleDateString('id-ID') });
    setErrors({});
    setMode('form');
  };

  const handleEdit = (item: KonselingData) => {
    setSelected(item);
    setFormData(item);
    setErrors({});
    setMode('form');
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nomer) newErrors.nomer = 'Nomer wajib diisi';
    if (!formData.namaKonseli) newErrors.namaKonseli = 'Nama konseli wajib diisi';
    if (!formData.tanggal) newErrors.tanggal = 'Tanggal wajib diisi';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (selected) {
      setData(prev => prev.map(item => item.id === selected.id ? (formData as KonselingData) : item));
    } else {
      setData(prev => [{ ...formData as KonselingData, id: Date.now().toString() }, ...prev]);
    }
    setMode('list');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus data konseling "${name}"?`)) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderListView = () => (
    <div className="space-y-4">
      <TopStatsBar />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2"><MessageCircle className="text-teal-600" /> Konseling Pastoral</h1>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 shadow-sm"><Plus size={14} /> Add Konseling</button>
      </div>

      <div className="bg-white rounded border border-slate-200 p-4 space-y-4">
        <div className="flex flex-wrap justify-between gap-4">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-slate-200 rounded px-3 py-1.5 text-xs font-semibold bg-slate-50"
          >
            <option value="All">Semua Status</option>
            <option value="Proses">Proses</option>
            <option value="Selesai">Selesai</option>
            <option value="Dirujuk">Dirujuk</option>
          </select>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari Nama / No..."
              className="w-full border border-slate-300 rounded-full pl-9 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-y border-slate-200">
              <tr>
                <th className="px-3 py-2">Nomer</th>
                <th className="px-3 py-2">Nama Konseli</th>
                <th className="px-3 py-2">Tanggal</th>
                <th className="px-3 py-2">Topik</th>
                <th className="px-3 py-2 text-center">Status</th>
                <th className="px-3 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-3 font-bold text-slate-700">{item.nomer}</td>
                  <td className="px-3 py-3 font-semibold">{item.namaKonseli}</td>
                  <td className="px-3 py-3">{item.tanggal}</td>
                  <td className="px-3 py-3 font-medium text-slate-500">{item.topik}</td>
                  <td className="px-3 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : 
                      item.status === 'Proses' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>{item.status}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex justify-center gap-1">
                      <button onClick={() => handleEdit(item)} className="p-1.5 bg-amber-400 text-white rounded"><Edit size={12} /></button>
                      <button onClick={() => { setSelected(item); setIsDetailOpen(true); }} className="p-1.5 bg-emerald-500 text-white rounded"><Eye size={12} /></button>
                      <button onClick={() => handleDelete(item.id, item.namaKonseli)} className="p-1.5 bg-rose-600 text-white rounded"><Trash2 size={12} /></button>
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
        <h1 className="text-xl font-bold text-slate-700">{selected ? 'Edit' : 'Add'} Konseling</h1>
        <button onClick={() => setMode('list')} className="bg-slate-500 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2"><ArrowLeft size={14} /> Back</button>
      </div>
      <div className="bg-white rounded border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <FormField label="Nomer" required error={errors.nomer}><input type="text" value={formData.nomer || ''} onChange={e => setFormData({...formData, nomer: e.target.value})} className="form-input" placeholder="K-YY/XXX" /></FormField>
          <FormField label="Nama Konseli" required error={errors.namaKonseli}><input type="text" value={formData.namaKonseli || ''} onChange={e => setFormData({...formData, namaKonseli: e.target.value})} className="form-input" /></FormField>
          <FormField label="Tanggal" required error={errors.tanggal}><input type="text" value={formData.tanggal || ''} onChange={e => setFormData({...formData, tanggal: e.target.value})} className="form-input" placeholder="dd/mm/yyyy" /></FormField>
          <FormField label="Konselor"><input type="text" value={formData.konselor || ''} onChange={e => setFormData({...formData, konselor: e.target.value})} className="form-input" /></FormField>
          <FormField label="Topik"><select className="form-input" value={formData.topik} onChange={e => setFormData({...formData, topik: e.target.value as any})}><option>Keluarga</option><option>Pekerjaan</option><option>Spiritual</option><option>Lainnya</option></select></FormField>
          <FormField label="Status"><select className="form-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}><option>Proses</option><option>Selesai</option><option>Dirujuk</option></select></FormField>
          <FormField label="Keterangan"><textarea className="form-input" rows={3} value={formData.keterangan || ''} onChange={e => setFormData({...formData, keterangan: e.target.value})} placeholder="Ringkasan atau hasil konseling..."></textarea></FormField>
        </div>
        <div className="mt-10 flex justify-end gap-3 border-t pt-6">
          <button onClick={() => setMode('list')} className="px-6 py-2 bg-slate-200 text-xs font-bold rounded">Batal</button>
          <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded shadow-lg flex items-center gap-2"><CheckCircle2 size={16} /> Simpan Data</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-slate-100 min-h-full">
      {mode === 'list' ? renderListView() : renderFormView()}
      
      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Detail Konseling Pastoral">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl border border-teal-100">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-teal-600 shadow-sm"><MessageCircle size={32} /></div>
              <div>
                <h4 className="text-xl font-bold text-slate-800 uppercase">{selected.namaKonseli}</h4>
                <p className="text-sm text-teal-600 font-bold tracking-tight">{selected.nomer}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Tanggal</p>
                <p className="font-bold text-slate-700">{selected.tanggal}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Topik</p>
                <p className="font-bold text-slate-700">{selected.topik}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Konselor</p>
                <p className="font-bold text-slate-700">{selected.konselor}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Status</p>
                <p className="font-bold text-emerald-600">{selected.status}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
               <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Catatan Konseling</p>
               <p className="text-xs text-slate-600 leading-relaxed italic">"{selected.keterangan || 'Belum ada catatan detail.'}"</p>
            </div>
          </div>
        )}
      </Modal>

      <style>{`.form-input { @apply w-full px-3 py-2 text-xs border border-slate-300 rounded outline-none focus:border-blue-500 bg-white; }`}</style>
    </div>
  );
};
