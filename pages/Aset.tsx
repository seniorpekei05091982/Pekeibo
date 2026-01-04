
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, ArrowLeft, 
  RotateCcw, CheckCircle2, Box, Package
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';

interface AsetData {
  id: string;
  namaAset: string;
  kodeAset: string;
  lokasi: string;
  kondisi: 'Baik' | 'Rusak Ringan' | 'Rusak Berat';
  jumlah: number;
  keterangan: string;
  dibuatOleh: string;
  dibuatTanggal: string;
}

const INITIAL_DATA: AsetData[] = [
  { id: '1', namaAset: 'Kursi Lipat Chitose', kodeAset: 'AST-001', lokasi: 'Aula Utama', kondisi: 'Baik', jumlah: 150, keterangan: 'Pembelian 2022', dibuatOleh: 'admin', dibuatTanggal: '10 Januari 2023' },
  { id: '2', namaAset: 'Sound System Yamaha', kodeAset: 'AST-002', lokasi: 'Gereja', kondisi: 'Baik', jumlah: 1, keterangan: '-', dibuatOleh: 'admin', dibuatTanggal: '12 Januari 2023' },
  { id: '3', namaAset: 'Proyektor Epson', kodeAset: 'AST-003', lokasi: 'Ruang Rapat', kondisi: 'Rusak Ringan', jumlah: 2, keterangan: 'Satu unit butuh servis', dibuatOleh: 'admin', dibuatTanggal: '15 Januari 2023' },
  { id: '4', namaAset: 'Meja Altar', kodeAset: 'AST-004', lokasi: 'Gereja', kondisi: 'Baik', jumlah: 1, keterangan: 'Kayu Jati', dibuatOleh: 'admin', dibuatTanggal: '20 Januari 2023' },
];

type ViewMode = 'list' | 'add' | 'edit' | 'detail';

export const Aset: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [data, setData] = useState<AsetData[]>(INITIAL_DATA);
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<AsetData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.namaAset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kodeAset.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus data Aset "${name}"?`)) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderTopNav = (title: string, currentAction?: string) => (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <Box className="text-slate-800" size={28} />
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
      </div>
      <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest text-right flex-1">
        MASTER DATA / <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => setMode('list')}>Aset</span> 
        {currentAction && <span className="text-slate-300"> / {currentAction}</span>}
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      {renderTopNav('Aset Gereja')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700">Data Aset</h2>
          <button 
            onClick={() => { setSelected(null); setMode('add'); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus size={16} /> Add Aset
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-1">
              {['Excel', 'PDF', 'Print'].map(btn => (
                <button key={btn} className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white text-[11px] font-bold rounded shadow-sm">{btn}</button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-bold">Search:</span>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-slate-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none w-48 md:w-64" 
                placeholder="Cari nama atau kode..."
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="px-3 py-3 border-r border-slate-200 text-center w-12">#</th>
                  <th className="px-3 py-3 border-r border-slate-200">Kode Aset</th>
                  <th className="px-3 py-3 border-r border-slate-200">Nama Aset</th>
                  <th className="px-3 py-3 border-r border-slate-200">Lokasi</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center">Jumlah</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center">Kondisi</th>
                  <th className="px-3 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-3 py-4 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}.</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-blue-600 font-bold">{item.kodeAset}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-800 font-medium">{item.namaAset}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.lokasi}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-center">{item.jumlah}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        item.kondisi === 'Baik' ? 'bg-emerald-100 text-emerald-700' : 
                        item.kondisi === 'Rusak Ringan' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {item.kondisi}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => { setSelected(item); setMode('edit'); }} className="p-1.5 bg-amber-400 text-white rounded"><Edit size={12} /></button>
                        <button onClick={() => { setSelected(item); setMode('detail'); }} className="p-1.5 bg-emerald-500 text-white rounded"><Eye size={12} /></button>
                        <button onClick={() => handleDelete(item.id, item.namaAset)} className="p-1.5 bg-rose-600 text-white rounded"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
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
      {renderTopNav(isEdit ? 'Edit Aset' : 'Add Aset', isEdit ? 'Edit Aset' : 'Add Aset')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700">{isEdit ? 'Edit Data Aset' : 'Input Aset Baru'}</h2>
          <button onClick={() => setMode('list')} className="bg-slate-700 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2">
            <ArrowLeft size={14} /> Back
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 max-w-5xl">
            <FormField label="Nama Aset" required>
              <input type="text" className="form-input" defaultValue={selected?.namaAset} placeholder="Nama barang/aset" />
            </FormField>

            <FormField label="Kode Aset">
              <input type="text" className="form-input" defaultValue={selected?.kodeAset} placeholder="AST-XXXX" />
            </FormField>

            <FormField label="Lokasi">
              <select className="form-input bg-white" defaultValue={selected?.lokasi}>
                <option>Gereja Utama</option>
                <option>Aula</option>
                <option>Kantor</option>
                <option>Ruang Sekolah Minggu</option>
                <option>Gudang</option>
              </select>
            </FormField>

            <FormField label="Jumlah">
              <input type="number" className="form-input" defaultValue={selected?.jumlah || 1} />
            </FormField>

            <FormField label="Kondisi">
              <select className="form-input bg-white" defaultValue={selected?.kondisi}>
                <option value="Baik">Baik</option>
                <option value="Rusak Ringan">Rusak Ringan</option>
                <option value="Rusak Berat">Rusak Berat</option>
              </select>
            </FormField>

            <FormField label="Keterangan">
              <textarea rows={4} className="form-input" defaultValue={selected?.keterangan}></textarea>
            </FormField>
          </div>

          <div className="mt-8 pt-6 border-t flex justify-end gap-2">
            <button onClick={() => setMode('list')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded text-xs font-bold flex items-center gap-2">
              <CheckCircle2 size={16} /> Save Data
            </button>
            <button className="bg-slate-200 text-slate-700 px-6 py-2 rounded text-xs font-bold hover:bg-slate-300">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailView = () => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      {renderTopNav('Detail Aset', 'Detail Data Aset')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700">Detail Data Aset</h2>
          <button onClick={() => setMode('list')} className="bg-slate-700 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2">
            <ArrowLeft size={14} /> Back
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 gap-y-3 max-w-2xl">
            <DetailRow label="Kode Aset" value={selected?.kodeAset} />
            <DetailRow label="Nama Aset" value={selected?.namaAset} />
            <DetailRow label="Lokasi" value={selected?.lokasi} />
            <DetailRow label="Jumlah" value={selected?.jumlah?.toString()} />
            <DetailRow label="Kondisi" value={selected?.kondisi} />
            <DetailRow label="Keterangan" value={selected?.keterangan || '-'} />
            <div className="my-6 border-t border-slate-100"></div>
            <DetailRow label="Dibuat Oleh" value={selected?.dibuatOleh} />
            <DetailRow label="Dibuat Tanggal" value={selected?.dibuatTanggal} />
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
  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs">
    <label className="sm:w-48 font-bold text-slate-700 shrink-0">
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
