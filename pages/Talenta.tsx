
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, ArrowLeft, 
  RotateCcw, CheckCircle2, Star, User
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';

interface TalentaData {
  id: string;
  namaTalenta: string;
  keterangan: string;
  dibuatOleh: string;
  dibuatTanggal: string;
  dibuatJam: string;
  diubahOleh?: string;
  diubahTanggal?: string;
  diubahJam?: string;
}

const INITIAL_DATA: TalentaData[] = [
  { 
    id: '1', 
    namaTalenta: 'Menyanyi', 
    keterangan: '-',
    dibuatOleh: 'admin',
    dibuatTanggal: '04 Desember 2022',
    dibuatJam: '22:52:45pm',
    diubahOleh: '-',
    diubahTanggal: '04 Desember 2022',
    diubahJam: '22:52:45pm'
  },
  { id: '2', namaTalenta: 'Memasak', keterangan: '-', dibuatOleh: 'admin', dibuatTanggal: '04 Desember 2022', dibuatJam: '22:52:45pm' },
  { id: '3', namaTalenta: 'Multimedia', keterangan: '-', dibuatOleh: 'admin', dibuatTanggal: '04 Desember 2022', dibuatJam: '22:52:45pm' },
  { id: '4', namaTalenta: 'Main Musik', keterangan: '-', dibuatOleh: 'admin', dibuatTanggal: '04 Desember 2022', dibuatJam: '22:52:45pm' },
  { id: '5', namaTalenta: 'Tamborin', keterangan: '-', dibuatOleh: 'admin', dibuatTanggal: '04 Desember 2022', dibuatJam: '22:52:45pm' },
];

type ViewMode = 'list' | 'add' | 'edit' | 'detail';

export const Talenta: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [data, setData] = useState<TalentaData[]>(INITIAL_DATA);
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<TalentaData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Talenta');

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.namaTalenta.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus data Talenta "${name}"?`)) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderTopNav = (title: string, currentAction?: string) => (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
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
      {renderTopNav('Talenta')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-700">Data Talenta</h2>
          <button 
            onClick={() => { setSelected(null); setMode('add'); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Plus size={16} /> Add Talenta
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span>Show</span>
              <select className="border border-slate-300 rounded px-2 py-1 bg-white font-bold outline-none">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {['Excel', 'PDF', 'CSV', 'Copy', 'Print'].map(btn => (
                <button key={btn} className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white text-[11px] font-bold rounded shadow-sm transition-all">{btn}</button>
              ))}
              <select className="bg-slate-500 text-white text-[11px] font-bold px-3 py-1 rounded shadow-sm outline-none">
                <option>Column visibility</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-bold">Search:</span>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-slate-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none w-48 md:w-64" 
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="px-3 py-3 border-r border-slate-200 text-center w-12">#</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center">Nama Talenta</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center">Keterangan</th>
                  <th className="px-3 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-3 py-4 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}.</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600 text-center">{item.namaTalenta}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600 text-center">{item.keterangan}</td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => { setSelected(item); setMode('edit'); }} className="p-1.5 bg-amber-400 hover:bg-amber-500 text-white rounded shadow-sm" title="Edit Data"><Edit size={12} /></button>
                        <button onClick={() => { setSelected(item); setMode('detail'); }} className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded shadow-sm" title="View Detail"><Eye size={12} /></button>
                        <button onClick={() => handleDelete(item.id, item.namaTalenta)} className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded shadow-sm" title="Hapus Data"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-3 py-20 text-center text-slate-400 italic">No matching records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFormView = (isEdit: boolean) => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      {renderTopNav(isEdit ? 'Edit Talenta' : 'Add Talenta', isEdit ? 'Edit Talenta' : 'Add Talenta')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700">{isEdit ? 'Edit Talenta' : 'Add Talenta'}</h2>
          <button 
            onClick={() => setMode('list')} 
            className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <ArrowLeft size={14} /> Back
          </button>
        </div>

        <div className="p-6">
          <div className="flex border-b border-slate-200 mb-8">
            {['Talenta', 'Info'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-xs font-bold border-t border-x rounded-t-md transition-all ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-blue-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="max-w-4xl space-y-5">
            <FormField label="Nama Talenta" required>
              <input type="text" className="form-input" defaultValue={selected?.namaTalenta} placeholder="Nama Talenta" />
            </FormField>

            <FormField label="Keterangan">
              <textarea rows={6} className="form-input" defaultValue={selected?.keterangan} placeholder="Keterangan"></textarea>
            </FormField>

            <div className="flex gap-2 pt-6">
              <button onClick={() => setMode('list')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all">
                <CheckCircle2 size={16} /> Save
              </button>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all">
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailView = () => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      {renderTopNav('Detail Data Talenta', 'Detail Data Talenta')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700">Detail Data Talenta</h2>
          <button 
            onClick={() => setMode('list')} 
            className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <ArrowLeft size={14} /> Back
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 gap-y-3 max-w-2xl">
            <DetailRow label="Nama Talenta" value={selected?.namaTalenta} />
            <DetailRow label="Keterangan" value={selected?.keterangan || '-'} />
            
            <div className="my-6 border-t border-slate-100"></div>
            
            <DetailRow label="Dibuat Oleh" value={selected?.dibuatOleh} />
            <DetailRow label="Dibuat Tanggal" value={selected?.dibuatTanggal} />
            <DetailRow label="Dibuat Jam" value={selected?.dibuatJam} />
            
            <div className="my-6 border-t border-slate-100"></div>
            
            <DetailRow label="Diubah Oleh" value={selected?.diubahOleh || '-'} />
            <DetailRow label="Diubah Tanggal" value={selected?.diubahTanggal || selected?.dibuatTanggal} />
            <DetailRow label="Diubah Jam" value={selected?.diubahJam || selected?.dibuatJam} />
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
          @apply w-full px-3 py-2 text-[11px] border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300;
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

const DetailRow: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
  <div className="flex gap-4 text-xs">
    <span className="w-32 font-bold text-slate-700">{label}</span>
    <span className="text-slate-400">:</span>
    <span className="flex-1 text-slate-600 font-medium">{value}</span>
  </div>
);
