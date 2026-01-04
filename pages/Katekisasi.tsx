
import React, { useState } from 'react';
import { 
  Plus, Search, FileSpreadsheet, FileText, Copy, Printer, 
  ChevronDown, Edit, Eye, Trash2, ArrowLeft, Calendar, User,
  BookOpen, CheckCircle
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';

// Fixed: Moved helper components to the top and added proper React.FC typing to handle children
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, children, required }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <label className="sm:w-32 text-xs font-bold text-slate-700">
      {label}{required && <span className="text-rose-500 ml-1">*</span>}
    </label>
    <div className="flex-1">
      {children}
    </div>
  </div>
);

type ViewMode = 'list' | 'add' | 'edit' | 'detail';

interface KatekisasiData {
  id: string;
  nomerKartu: string;
  nomerJemaat: string;
  namaPeserta: string;
  jenisKelamin: 'Laki-Laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  periode: string;
  pengajar: string;
  status: 'Aktif' | 'Lulus' | 'Tidak Lulus';
  keterangan?: string;
}

const DUMMY_KATEKISASI: KatekisasiData[] = [
  { id: '1', nomerKartu: '101/KAT/2023', nomerJemaat: 'J-001', namaPeserta: 'Andi Wijaya', jenisKelamin: 'Laki-Laki', tempatLahir: 'Surabaya', tanggalLahir: '12 Mei 2005', alamat: 'Jl. Pemuda No. 45', periode: 'Angkatan 2023/2024', pengajar: 'Pdt. Samuel', status: 'Aktif' },
  { id: '2', nomerKartu: '102/KAT/2023', nomerJemaat: 'J-024', namaPeserta: 'Siska Putri', jenisKelamin: 'Perempuan', tempatLahir: 'Sidoarjo', tanggalLahir: '20 Juli 2006', alamat: 'Perum Gading Fajar', periode: 'Angkatan 2023/2024', pengajar: 'Pdt. Samuel', status: 'Aktif' },
  { id: '3', nomerKartu: '098/KAT/2022', nomerJemaat: 'J-112', namaPeserta: 'Budi Darmawan', jenisKelamin: 'Laki-Laki', tempatLahir: 'Gresik', tanggalLahir: '05 Januari 2004', alamat: 'Driyorejo, Gresik', periode: 'Angkatan 2022/2023', pengajar: 'Pdt. Yohanes', status: 'Lulus' },
];

export const Katekisasi: React.FC = () => {
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<KatekisasiData | null>(null);

  const renderListView = () => (
    <div className="space-y-4">
      <TopStatsBar />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <BookOpen className="text-blue-600" size={24} /> Katekisasi
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          MAIN MENU / Pelayanan Pastoral / <span className="text-blue-500">Katekisasi</span>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-600">Data Katekisasi</h2>
          <button 
            onClick={() => setMode('add')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus size={14} /> Add Katekisasi
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span>Show</span>
              <select className="border border-slate-200 rounded px-1 py-0.5 outline-none bg-slate-50 font-bold">
                <option>10</option>
                <option>25</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <button className="px-3 py-1 bg-slate-500 text-white rounded text-[11px] font-bold">Excel</button>
              <button className="px-3 py-1 bg-slate-500 text-white rounded text-[11px] font-bold">PDF</button>
              <button className="px-3 py-1 bg-slate-500 text-white rounded text-[11px] font-bold">Print</button>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium text-slate-500">Search:</span>
              <input type="text" className="border border-slate-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 outline-none w-48" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-600">
                <tr>
                  <th className="px-3 py-2 border-r border-slate-200 w-10 text-center">#</th>
                  <th className="px-3 py-2 border-r border-slate-200">Nomer Kartu</th>
                  <th className="px-3 py-2 border-r border-slate-200">Nama Peserta</th>
                  <th className="px-3 py-2 border-r border-slate-200">Jenis Kelamin</th>
                  <th className="px-3 py-2 border-r border-slate-200">Tempat, Tgl Lahir</th>
                  <th className="px-3 py-2 border-r border-slate-200">Periode</th>
                  <th className="px-3 py-2 border-r border-slate-200">Status</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DUMMY_KATEKISASI.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-3 py-3 border-r border-slate-200 text-center">{idx + 1}.</td>
                    <td className="px-3 py-3 border-r border-slate-200 font-bold text-slate-700">{item.nomerKartu}</td>
                    <td className="px-3 py-3 border-r border-slate-200 font-bold">{item.namaPeserta}</td>
                    <td className="px-3 py-3 border-r border-slate-200">{item.jenisKelamin}</td>
                    <td className="px-3 py-3 border-r border-slate-200">{item.tempatLahir}, {item.tanggalLahir}</td>
                    <td className="px-3 py-3 border-r border-slate-200">{item.periode}</td>
                    <td className="px-3 py-3 border-r border-slate-200">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'Lulus' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => { setSelected(item); setMode('edit'); }} className="p-1.5 bg-amber-400 text-white rounded"><Edit size={12} /></button>
                        <button onClick={() => { setSelected(item); setMode('detail'); }} className="p-1.5 bg-emerald-500 text-white rounded"><Eye size={12} /></button>
                        <button className="p-1.5 bg-sky-500 text-white rounded"><Printer size={12} /></button>
                        <button className="p-1.5 bg-rose-600 text-white rounded"><Trash2 size={12} /></button>
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

  const renderDetailView = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <TopStatsBar />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <BookOpen className="text-blue-600" /> Detail Katekisasi
        </h1>
        <button onClick={() => setMode('list')} className="bg-slate-500 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2">
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 p-8">
        <div className="max-w-3xl bg-slate-50 border border-slate-100 rounded-lg p-6 space-y-3">
          {[
            ['Nomer Kartu', selected?.nomerKartu],
            ['Nomer Jemaat', selected?.nomerJemaat],
            ['Nama Peserta', selected?.namaPeserta],
            ['Jenis Kelamin', selected?.jenisKelamin],
            ['Tempat, Tanggal Lahir', `${selected?.tempatLahir}, ${selected?.tanggalLahir}`],
            ['Alamat Rumah', selected?.alamat],
            ['Periode Katekisasi', selected?.periode],
            ['Nama Pengajar', selected?.pengajar],
            ['Status', selected?.status],
            ['Keterangan', selected?.keterangan || '-'],
          ].map(([label, value], i) => (
            <div key={i} className="flex border-b border-slate-200 pb-2">
              <span className="w-1/3 font-bold text-slate-700 text-xs">{label}</span>
              <span className="w-4 text-center">:</span>
              <span className="flex-1 text-xs text-slate-600">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFormView = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <TopStatsBar />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <Plus className="text-blue-600" /> {mode === 'add' ? 'Add' : 'Edit'} Katekisasi
        </h1>
        <button onClick={() => setMode('list')} className="bg-slate-500 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2">
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200">
        <div className="p-6">
          <div className="flex border-b border-slate-200 mb-6">
            <button className="px-6 py-2 bg-blue-600 text-white font-bold text-xs rounded-t-md">Data</button>
            <button className="px-6 py-2 bg-slate-100 text-slate-500 font-bold text-xs border-x border-t border-slate-200 rounded-t-md">Info</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl">
            <FormField label="Nomer Kartu">
              <input type="text" defaultValue={selected?.nomerKartu} className="form-input" placeholder="Nomer Kartu" />
            </FormField>
            <FormField label="Nomer Jemaat">
              <div className="relative">
                <input type="text" defaultValue={selected?.nomerJemaat} className="form-input pr-10" placeholder="Cari Jemaat..." />
                <button className="absolute right-0 top-0 h-full px-3 bg-teal-500 text-white rounded-r">
                  <Search size={14} />
                </button>
              </div>
            </FormField>
            <FormField label="Nama Peserta" required>
              <input type="text" defaultValue={selected?.namaPeserta} className="form-input border-blue-200" placeholder="Nama Lengkap" />
            </FormField>
            <FormField label="Jenis Kelamin">
              <select className="form-input" defaultValue={selected?.jenisKelamin}>
                <option value="">- Pilih -</option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </FormField>
            <FormField label="Tempat Lahir">
              <input type="text" defaultValue={selected?.tempatLahir} className="form-input" placeholder="Kota Kelahiran" />
            </FormField>
            <FormField label="Tanggal Lahir">
              <div className="relative">
                <input type="text" defaultValue={selected?.tanggalLahir} className="form-input" placeholder="dd/mm/yyyy" />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              </div>
            </FormField>
            <FormField label="Alamat">
              <textarea rows={2} defaultValue={selected?.alamat} className="form-input" placeholder="Alamat Lengkap"></textarea>
            </FormField>
            <FormField label="Periode">
              <input type="text" defaultValue={selected?.periode} className="form-input" placeholder="Contoh: Angkatan 2024" />
            </FormField>
            <FormField label="Nama Pengajar">
              <input type="text" defaultValue={selected?.pengajar} className="form-input" placeholder="Nama Pendeta / Pengajar" />
            </FormField>
            <FormField label="Status">
              <select className="form-input" defaultValue={selected?.status}>
                <option value="Aktif">Aktif</option>
                <option value="Lulus">Lulus</option>
                <option value="Tidak Lulus">Tidak Lulus</option>
              </select>
            </FormField>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end gap-3">
             <button onClick={() => setMode('list')} className="px-6 py-2 bg-slate-200 text-slate-700 font-bold rounded text-xs">Batal</button>
             <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded text-xs shadow-lg shadow-blue-100">Simpan Katekisasi</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-slate-100 min-h-full">
      {mode === 'list' && renderListView()}
      {mode === 'detail' && renderDetailView()}
      {(mode === 'add' || mode === 'edit') && renderFormView()}

      <style>{`
        .form-input {
          @apply w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300;
        }
      `}</style>
    </div>
  );
};
