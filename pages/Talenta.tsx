
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, ArrowLeft, 
  RotateCcw, CheckCircle2, Star, Home
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';
import { Modal } from '../components/Modal';

interface TalentaData {
  id: string;
  namaTalenta: string;
  keterangan: string;
  dibuatOleh: string;
  dibuatTanggal: string;
}

interface TalentaProps {
  data: TalentaData[];
  setData: React.Dispatch<React.SetStateAction<TalentaData[]>>;
  onBack: () => void;
}

type ViewMode = 'list' | 'form';

export const Talenta: React.FC<TalentaProps> = ({ data, setData, onBack }) => {
  const [mode, setMode] = useState<ViewMode>('list');
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState<TalentaData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<TalentaData>>({});

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.namaTalenta.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleAdd = () => {
    setSelected(null);
    setFormData({ namaTalenta: '', keterangan: '-' });
    setIsEdit(false);
    setMode('form');
  };

  const handleEdit = (item: TalentaData) => {
    setSelected(item);
    setFormData(item);
    setIsEdit(true);
    setMode('form');
  };

  const handleSave = () => {
    if (!formData.namaTalenta) {
      alert('Nama talenta wajib diisi!');
      return;
    }

    if (isEdit && selected) {
      setData(data.map(item => item.id === selected.id ? { ...item, ...formData } as TalentaData : item));
      alert('Data talenta berhasil diperbarui.');
    } else {
      const newItem: TalentaData = {
        ...(formData as TalentaData),
        id: Date.now().toString(),
        dibuatOleh: 'admin',
        dibuatTanggal: new Date().toLocaleDateString('id-ID')
      };
      setData([newItem, ...data]);
      alert('Talenta baru berhasil ditambahkan.');
    }
    setMode('list');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus data talenta "${name}"?`)) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderTopNav = (title: string, currentAction?: string) => (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 shadow-sm"
        >
          <Home size={18} />
        </button>
        <Star className="text-slate-800" size={28} />
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
      </div>
      <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest text-right flex-1">
        MASTER DATA / <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => setMode('list')}>Talenta</span> 
        {currentAction && <span className="text-slate-300"> / {currentAction}</span>}
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      {renderTopNav('Master Talenta')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-tighter">Database Jenis Talenta</h2>
          <button 
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Plus size={16} /> Tambah Jenis Talenta
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
                placeholder="Cari talenta..."
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase">
                <tr>
                  <th className="px-3 py-3 border-r border-slate-200 text-center w-12">#</th>
                  <th className="px-3 py-3 border-r border-slate-200">Nama Talenta</th>
                  <th className="px-3 py-3 border-r border-slate-200">Keterangan</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center">Dibuat Tgl</th>
                  <th className="px-3 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-3 py-4 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}.</td>
                    <td className="px-3 py-4 border-r border-slate-200 font-bold text-slate-800 uppercase">{item.namaTalenta}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.keterangan}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-center text-slate-500">{item.dibuatTanggal}</td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => handleEdit(item)} className="p-1.5 bg-amber-400 text-white rounded shadow-sm"><Edit size={12} /></button>
                        <button onClick={() => handleDelete(item.id, item.namaTalenta)} className="p-1.5 bg-rose-600 text-white rounded shadow-sm"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-3 py-10 text-center text-slate-400 italic">Data talenta tidak ditemukan</td>
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
      {renderTopNav(isEdit ? 'Edit Talenta' : 'Tambah Talenta')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden max-w-4xl mx-auto">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-tighter">{isEdit ? 'Edit Data Talenta' : 'Input Talenta Baru'}</h2>
          <button onClick={() => setMode('list')} className="bg-slate-700 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2">
            <ArrowLeft size={14} /> Kembali
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-slate-600 tracking-wider">Nama Talenta <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-500 outline-none" 
                value={formData.namaTalenta || ''} 
                onChange={e => setFormData({...formData, namaTalenta: e.target.value})} 
                placeholder="Contoh: Bermain Gitar, Desain Grafis, dll" 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-slate-600 tracking-wider">Keterangan</label>
              <textarea 
                rows={4} 
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-500 outline-none" 
                value={formData.keterangan || ''} 
                onChange={e => setFormData({...formData, keterangan: e.target.value})} 
                placeholder="Penjelasan singkat mengenai talenta"
              ></textarea>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
            <button onClick={() => setMode('list')} className="px-6 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded">Batal</button>
            <button onClick={handleSave} className="px-10 py-2 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded shadow-lg flex items-center gap-2">
              <CheckCircle2 size={16} /> Simpan Talenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full">
      {mode === 'list' ? renderListView() : renderFormView()}
    </div>
  );
};
