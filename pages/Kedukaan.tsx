
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, ArrowLeft, Skull, User,
  CheckCircle2, AlertCircle, Calendar
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

interface KedukaanData {
  id: string;
  nomerLaporan: string;
  namaAlmarhum: string;
  jenisKelamin: 'Laki-Laki' | 'Perempuan';
  tanggalMeninggal: string;
  tempatMeninggal: string;
  tanggalPemakaman: string;
  lokasiPemakaman: string;
  pelayan: string;
  keterangan?: string;
}

const INITIAL_KEDUKAAN: KedukaanData[] = [
  { id: '1', nomerLaporan: 'DK-001/24', namaAlmarhum: 'Bp. Yohanes', jenisKelamin: 'Laki-Laki', tanggalMeninggal: '15/01/2024', tempatMeninggal: 'RS. Siloam', tanggalPemakaman: '17/01/2024', lokasiPemakaman: 'TPU Kembang Kuning', pelayan: 'Pdt. Lukas' },
  { id: '2', nomerLaporan: 'DK-002/24', namaAlmarhum: 'Ibu Sarah', jenisKelamin: 'Perempuan', tanggalMeninggal: '20/02/2024', tempatMeninggal: 'Kediaman', tanggalPemakaman: '22/02/2024', lokasiPemakaman: 'TPU Keputih', pelayan: 'Pdt. Abraham' },
];

export const Kedukaan: React.FC = () => {
  const [data, setData] = useState<KedukaanData[]>(INITIAL_KEDUKAAN);
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<KedukaanData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<KedukaanData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.namaAlmarhum.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.nomerLaporan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleAdd = () => {
    setSelected(null);
    setFormData({ jenisKelamin: 'Laki-Laki', tanggalMeninggal: new Date().toLocaleDateString('id-ID') });
    setErrors({});
    setMode('form');
  };

  const handleEdit = (item: KedukaanData) => {
    setSelected(item);
    setFormData(item);
    setErrors({});
    setMode('form');
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nomerLaporan) newErrors.nomerLaporan = 'Nomer laporan wajib diisi';
    if (!formData.namaAlmarhum) newErrors.namaAlmarhum = 'Nama almarhum wajib diisi';
    if (!formData.tanggalMeninggal) newErrors.tanggalMeninggal = 'Tanggal meninggal wajib diisi';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (selected) {
      setData(prev => prev.map(item => item.id === selected.id ? (formData as KedukaanData) : item));
    } else {
      setData(prev => [{ ...formData as KedukaanData, id: Date.now().toString() }, ...prev]);
    }
    setMode('list');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus laporan kedukaan "${name}"?`)) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderListView = () => (
    <div className="space-y-4">
      <TopStatsBar />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2"><Skull className="text-amber-600" /> Pelayanan Kedukaan</h1>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 shadow-sm"><Plus size={14} /> Add Laporan</button>
      </div>

      <div className="bg-white rounded border border-slate-200 p-4 space-y-4">
        <div className="flex justify-end">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari Nama / No. Laporan..."
              className="w-full border border-slate-300 rounded-full pl-9 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-y border-slate-200">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">No. Laporan</th>
                <th className="px-3 py-2">Nama Almarhum/ah</th>
                <th className="px-3 py-2">Tgl Meninggal</th>
                <th className="px-3 py-2">Tgl Pemakaman</th>
                <th className="px-3 py-2">Pelayan</th>
                <th className="px-3 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item, i) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-3">{i+1}.</td>
                  <td className="px-3 py-3 font-bold text-slate-700">{item.nomerLaporan}</td>
                  <td className="px-3 py-3 font-bold">{item.namaAlmarhum}</td>
                  <td className="px-3 py-3 text-rose-600 font-semibold">{item.tanggalMeninggal}</td>
                  <td className="px-3 py-3">{item.tanggalPemakaman}</td>
                  <td className="px-3 py-3">{item.pelayan}</td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex justify-center gap-1">
                      <button onClick={() => handleEdit(item)} className="p-1.5 bg-amber-400 text-white rounded"><Edit size={12} /></button>
                      <button onClick={() => { setSelected(item); setIsDetailOpen(true); }} className="p-1.5 bg-emerald-500 text-white rounded"><Eye size={12} /></button>
                      <button onClick={() => handleDelete(item.id, item.namaAlmarhum)} className="p-1.5 bg-rose-600 text-white rounded"><Trash2 size={12} /></button>
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
        <h1 className="text-xl font-bold text-slate-700">{selected ? 'Edit' : 'Add'} Laporan Kedukaan</h1>
        <button onClick={() => setMode('list')} className="bg-slate-500 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2"><ArrowLeft size={14} /> Back</button>
      </div>
      <div className="bg-white rounded border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <FormField label="No. Laporan" required error={errors.nomerLaporan}><input type="text" value={formData.nomerLaporan || ''} onChange={e => setFormData({...formData, nomerLaporan: e.target.value})} className="form-input" placeholder="DK-XXX/YY" /></FormField>
          <FormField label="Nama Almarhum" required error={errors.namaAlmarhum}><input type="text" value={formData.namaAlmarhum || ''} onChange={e => setFormData({...formData, namaAlmarhum: e.target.value})} className="form-input" /></FormField>
          <FormField label="Jenis Kelamin">
            <select className="form-input" value={formData.jenisKelamin} onChange={e => setFormData({...formData, jenisKelamin: e.target.value as any})}>
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </FormField>
          <FormField label="Tgl Meninggal" required error={errors.tanggalMeninggal}><input type="text" value={formData.tanggalMeninggal || ''} onChange={e => setFormData({...formData, tanggalMeninggal: e.target.value})} className="form-input" placeholder="dd/mm/yyyy" /></FormField>
          <FormField label="Tempat Wafat"><input type="text" value={formData.tempatMeninggal || ''} onChange={e => setFormData({...formData, tempatMeninggal: e.target.value})} className="form-input" placeholder="RS / Kediaman" /></FormField>
          <FormField label="Tgl Pemakaman"><input type="text" value={formData.tanggalPemakaman || ''} onChange={e => setFormData({...formData, tanggalPemakaman: e.target.value})} className="form-input" placeholder="dd/mm/yyyy" /></FormField>
          <FormField label="Lokasi Makam"><input type="text" value={formData.lokasiPemakaman || ''} onChange={e => setFormData({...formData, lokasiPemakaman: e.target.value})} className="form-input" /></FormField>
          <FormField label="Pendeta Pelayan"><input type="text" value={formData.pelayan || ''} onChange={e => setFormData({...formData, pelayan: e.target.value})} className="form-input" /></FormField>
        </div>
        <div className="mt-10 flex justify-end gap-3 border-t pt-6">
          <button onClick={() => setMode('list')} className="px-6 py-2 bg-slate-200 text-xs font-bold rounded">Batal</button>
          <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded shadow-lg flex items-center gap-2"><CheckCircle2 size={16} /> Simpan Laporan</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-slate-100 min-h-full">
      {mode === 'list' ? renderListView() : renderFormView()}
      
      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Detail Kedukaan Jemaat">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-amber-600 shadow-sm"><Skull size={32} /></div>
              <div>
                <h4 className="text-xl font-bold text-slate-800 uppercase">{selected.namaAlmarhum}</h4>
                <p className="text-sm text-amber-600 font-bold tracking-widest">{selected.nomerLaporan}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Tanggal Meninggal</p>
                <p className="font-bold text-rose-600">{selected.tanggalMeninggal}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Lokasi Wafat</p>
                <p className="font-bold text-slate-700">{selected.tempatMeninggal}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Tanggal Pemakaman</p>
                <p className="font-bold text-slate-700">{selected.tanggalPemakaman}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Pendeta Pelayan</p>
                <p className="font-bold text-slate-700">{selected.pelayan}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <style>{`.form-input { @apply w-full px-3 py-2 text-xs border border-slate-300 rounded outline-none focus:border-blue-500 bg-white; }`}</style>
    </div>
  );
};
