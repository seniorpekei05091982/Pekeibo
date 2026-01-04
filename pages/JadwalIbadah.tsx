
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, ArrowLeft, Calendar, Clock, MapPin, 
  RotateCcw, CheckCircle2, ChevronRight, FileText
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';

interface JadwalData {
  id: string;
  namaIbadah: string;
  hari: string;
  jamMulai: string;
  jamSelesai: string;
  lokasi: string;
  keterangan: string;
  dibuatOleh: string;
  dibuatTanggal: string;
  dibuatJam: string;
  diubahOleh?: string;
  diubahTanggal?: string;
  diubahJam?: string;
}

const INITIAL_DATA: JadwalData[] = [
  { 
    id: '1', 
    namaIbadah: 'Ibadah Raya 1', 
    hari: 'Minggu', 
    jamMulai: '06:00:00', 
    jamSelesai: '08:00:00', 
    lokasi: 'Lantai 1 & 2', 
    keterangan: '-',
    dibuatOleh: 'admin',
    dibuatTanggal: '14 November 2022',
    dibuatJam: '08:15:52am',
    diubahOleh: 'admin',
    diubahTanggal: '24 Maret 2023',
    diubahJam: '22:01:22pm'
  },
  { id: '2', namaIbadah: 'Ibadah Raya 2', hari: 'Minggu', jamMulai: '09:30:00', jamSelesai: '11:30:00', lokasi: 'Lantai 2', keterangan: '-', dibuatOleh: 'admin', dibuatTanggal: '14 November 2022', dibuatJam: '08:15:52am' },
  { id: '3', namaIbadah: 'Ibadah Raya 3', hari: 'Minggu', jamMulai: '16:00:00', jamSelesai: '18:00:00', lokasi: 'Lantai 2', keterangan: '-', dibuatOleh: 'admin', dibuatTanggal: '14 November 2022', dibuatJam: '08:15:52am' },
  { id: '4', namaIbadah: 'Doa Pagi', hari: 'Senin', jamMulai: '04:00:00', jamSelesai: '05:30:00', lokasi: 'Lantai 1', keterangan: '-', dibuatOleh: 'admin', dibuatTanggal: '14 November 2022', dibuatJam: '08:15:52am' },
  { id: '5', namaIbadah: 'Doa Malam', hari: 'Kamis', jamMulai: '18:00:00', jamSelesai: '19:30:00', lokasi: 'Lantai 2', keterangan: '-', dibuatOleh: 'admin', dibuatTanggal: '14 November 2022', dibuatJam: '08:15:52am' },
];

type ViewMode = 'list' | 'add' | 'edit' | 'detail';

export const JadwalIbadah: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [data, setData] = useState<JadwalData[]>(INITIAL_DATA);
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<JadwalData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Jadwal Ibadah');

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.namaIbadah.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus data Jadwal Ibadah "${name}"?`)) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderBreadcrumb = (currentAction?: string) => (
    <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest text-right flex-1">
      MASTER DATA / <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => setMode('list')}>Jadwal Ibadah</span> 
      {currentAction && <span className="text-slate-300"> / {currentAction}</span>}
    </div>
  );

  const renderTopNav = (title: string, currentAction?: string) => (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <FileText className="text-slate-800" size={28} />
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
      </div>
      {renderBreadcrumb(currentAction)}
    </div>
  );

  const renderListView = () => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      {renderTopNav('Jadwal Ibadah')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-700">Data Jadwal Ibadah</h2>
          <button 
            onClick={() => { setSelected(null); setMode('add'); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Plus size={16} /> Add Jadwal Ibadah
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
                  <th className="px-3 py-3 border-r border-slate-200">Nama Ibadah</th>
                  <th className="px-3 py-3 border-r border-slate-200">Hari</th>
                  <th className="px-3 py-3 border-r border-slate-200">Jam Mulai</th>
                  <th className="px-3 py-3 border-r border-slate-200">Jam Selesai</th>
                  <th className="px-3 py-3 border-r border-slate-200">Lokasi</th>
                  <th className="px-3 py-3 border-r border-slate-200">Keterangan</th>
                  <th className="px-3 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-3 py-4 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}.</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.namaIbadah}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.hari}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.jamMulai}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.jamSelesai}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.lokasi}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.keterangan}</td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => { setSelected(item); setMode('edit'); }} className="p-1.5 bg-amber-400 hover:bg-amber-500 text-white rounded shadow-sm" title="Edit Data"><Edit size={12} /></button>
                        <button onClick={() => { setSelected(item); setMode('detail'); }} className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded shadow-sm" title="View Detail"><Eye size={12} /></button>
                        <button onClick={() => handleDelete(item.id, item.namaIbadah)} className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded shadow-sm" title="Hapus Data"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="px-3 py-20 text-center text-slate-400 italic">No matching records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4 mt-2">
            <div>Showing 1 to {filteredData.length} of {filteredData.length} entries</div>
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
      {renderTopNav(isEdit ? 'Edit Jadwal Ibadah' : 'Add Jadwal Ibadah', isEdit ? 'Edit Jadwal Ibadah' : 'Add Jadwal Ibadah')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-700">{isEdit ? 'Edit Jadwal Ibadah' : 'Add Jadwal Ibadah'}</h2>
          <button 
            onClick={() => setMode('list')} 
            className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <ArrowLeft size={14} /> Back
          </button>
        </div>

        <div className="p-6">
          <div className="flex border-b border-slate-200 mb-8">
            {['Jadwal Ibadah', 'Info'].map(tab => (
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
            <FormField label="Nama Ibadah" required>
              <input type="text" className="form-input" defaultValue={selected?.namaIbadah} placeholder="Nama Ibadah" />
            </FormField>

            <FormField label="Hari">
              <select className="form-input bg-white" defaultValue={selected?.hari || '- Pilih -'}>
                <option disabled>- Pilih -</option>
                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </FormField>

            <FormField label="Jam Mulai">
              <div className="relative">
                <input type="text" className="form-input" defaultValue={selected?.jamMulai || '00:00'} />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              </div>
            </FormField>

            <FormField label="Jam Selesai">
              <div className="relative">
                <input type="text" className="form-input" defaultValue={selected?.jamSelesai || '00:00'} />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              </div>
            </FormField>

            <FormField label="Lokasi">
              <select className="form-input bg-white" defaultValue={selected?.lokasi || '- Pilih -'}>
                <option disabled>- Pilih -</option>
                <option>Lantai 1</option>
                <option>Lantai 2</option>
                <option>Lantai 1 & 2</option>
                <option>Aula</option>
              </select>
            </FormField>

            <FormField label="Keterangan">
              <textarea rows={4} className="form-input" defaultValue={selected?.keterangan} placeholder="Keterangan"></textarea>
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
      {renderTopNav('Detail Data Jadwal Ibadah', 'Detail Data Jadwal Ibadah')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-700">Detail Data Jadwal Ibadah</h2>
          <button 
            onClick={() => setMode('list')} 
            className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <ArrowLeft size={14} /> Back
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 gap-y-3 max-w-2xl">
            <DetailRow label="Nama Ibadah" value={selected?.namaIbadah} />
            <DetailRow label="Hari" value={selected?.hari} />
            <DetailRow label="Jam Mulai" value={selected?.jamMulai} />
            <DetailRow label="Jam Selesai" value={selected?.jamSelesai} />
            <DetailRow label="Lokasi" value={selected?.lokasi} />
            <DetailRow label="Keterangan" value={selected?.keterangan || '-'} />
            
            <div className="my-6 border-t border-slate-100"></div>
            
            <DetailRow label="Dibuat Oleh" value={selected?.dibuatOleh} />
            <DetailRow label="Dibuat Tanggal" value={selected?.dibuatTanggal} />
            <DetailRow label="Dibuat Jam" value={selected?.dibuatJam} />
            
            {selected?.diubahOleh && (
              <>
                <div className="my-6 border-t border-slate-100"></div>
                <DetailRow label="Diubah Oleh" value={selected?.diubahOleh} />
                <DetailRow label="Diubah Tanggal" value={selected?.diubahTanggal} />
                <DetailRow label="Diubah Jam" value={selected?.diubahJam} />
              </>
            )}
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
