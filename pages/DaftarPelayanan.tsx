
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, ArrowLeft, 
  RotateCcw, CheckCircle2, FileText, UserCheck
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';

interface PelayananData {
  id: string;
  namaPelayanan: string;
  unitPelayanan: string;
  keterangan: string;
  dibuatOleh: string;
  dibuatTanggal: string;
  dibuatJam: string;
  diubahOleh?: string;
  diubahTanggal?: string;
  diubahJam?: string;
}

const INITIAL_DATA: PelayananData[] = [
  { 
    id: '1', 
    namaPelayanan: 'Ketua Majelis', 
    unitPelayanan: 'Pastoral',
    keterangan: '-',
    dibuatOleh: 'admin',
    dibuatTanggal: '26 November 2022',
    dibuatJam: '00:03:10am',
    diubahOleh: 'admin',
    diubahTanggal: '02 Desember 2022',
    diubahJam: '21:17:22pm'
  },
  { id: '2', namaPelayanan: 'Pemain Keyboard', unitPelayanan: 'Musik & Pujian', keterangan: '-', dibuatOleh: 'admin', dibuatTanggal: '26 November 2022', dibuatJam: '00:03:10am' },
];

type ViewMode = 'list' | 'add' | 'edit' | 'detail';

export const DaftarPelayanan: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [data, setData] = useState<PelayananData[]>(INITIAL_DATA);
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<PelayananData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Daftar Pelayanan');

  const [formData, setFormData] = useState<Partial<PelayananData>>({});

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.namaPelayanan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unitPelayanan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus data Daftar Pelayanan "${name}"?`)) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.namaPelayanan) return alert('Nama Pelayanan wajib diisi');
    
    if (mode === 'edit' && selected) {
      setData(data.map(d => d.id === selected.id ? { ...d, ...formData } as PelayananData : d));
    } else {
      const newItem: PelayananData = {
        ...formData as PelayananData,
        id: Date.now().toString(),
        dibuatOleh: 'admin',
        dibuatTanggal: new Date().toLocaleDateString('id-ID'),
        dibuatJam: new Date().toLocaleTimeString('id-ID'),
      };
      setData([newItem, ...data]);
    }
    setMode('list');
    setFormData({});
  };

  const renderListView = () => (
    <div className="p-6 min-h-full">
      <TopStatsBar />
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <UserCheck className="text-slate-800" size={28} />
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Daftar Pelayanan</h1>
        </div>
        <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest text-right flex-1">
          MASTER DATA / <span className="text-blue-500">Daftar Pelayanan</span>
        </div>
      </div>
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700">Database Bidang Pelayanan</h2>
          <button 
            onClick={() => { setSelected(null); setFormData({ unitPelayanan: 'Pastoral' }); setMode('add'); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus size={16} /> Tambah Pelayanan
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-slate-300 rounded-full pl-9 pr-4 py-1.5 text-xs outline-none focus:ring-1 focus:ring-blue-500" 
                placeholder="Cari pelayanan atau unit..."
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase">
                <tr>
                  <th className="px-3 py-4 border-r border-slate-200 text-center w-12">#</th>
                  <th className="px-3 py-4 border-r border-slate-200">Nama Pelayanan</th>
                  <th className="px-3 py-4 border-r border-slate-200">Unit Pelayanan</th>
                  <th className="px-3 py-4 border-r border-slate-200">Keterangan</th>
                  <th className="px-3 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-3 py-4 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}.</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-800 font-black uppercase">{item.namaPelayanan}</td>
                    <td className="px-3 py-4 border-r border-slate-200">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-bold text-[9px] uppercase">{item.unitPelayanan}</span>
                    </td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.keterangan}</td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => { setSelected(item); setFormData(item); setMode('edit'); }} className="p-1.5 bg-amber-400 hover:bg-amber-500 text-white rounded shadow-sm"><Edit size={12} /></button>
                        <button onClick={() => handleDelete(item.id, item.namaPelayanan)} className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded shadow-sm"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-3 py-20 text-center text-slate-400 italic font-bold">Data pelayanan tidak ditemukan</td>
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
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">{mode === 'edit' ? 'Ubah' : 'Tambah'} Pelayanan</h1>
        <button onClick={() => setMode('list')} className="bg-slate-700 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2">
          <ArrowLeft size={14} /> Kembali
        </button>
      </div>
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden max-w-4xl">
        <div className="p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nama Pelayanan</label>
              <input type="text" className="form-input" value={formData.namaPelayanan || ''} onChange={e => setFormData({...formData, namaPelayanan: e.target.value})} placeholder="Contoh: Song Leader, Multimedia" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Unit Pelayanan</label>
              <select className="form-input bg-white" value={formData.unitPelayanan || ''} onChange={e => setFormData({...formData, unitPelayanan: e.target.value})}>
                <option value="Pastoral">Pastoral</option>
                <option value="Musik & Pujian">Musik & Pujian</option>
                <option value="Multimedia">Multimedia</option>
                <option value="Sekolah Minggu">Sekolah Minggu</option>
                <option value="Diakonia">Diakonia</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Keterangan Tambahan</label>
            <textarea rows={4} className="form-input" value={formData.keterangan || ''} onChange={e => setFormData({...formData, keterangan: e.target.value})} placeholder="Penjelasan singkat tugas pelayanan"></textarea>
          </div>

          <div className="flex gap-2 pt-6 border-t border-slate-50">
            <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg transition-all active:scale-95">
              <CheckCircle2 size={16} /> Simpan Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 h-full">
      {mode === 'list' ? renderListView() : renderFormView()}
      <style>{`.form-input { @apply w-full px-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 outline-none font-bold focus:bg-white focus:border-blue-500 transition-all; }`}</style>
    </div>
  );
};
