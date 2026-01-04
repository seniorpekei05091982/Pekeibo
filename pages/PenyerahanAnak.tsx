
import React, { useState } from 'react';
import { 
  Plus, Search, FileSpreadsheet, FileText, Copy, Printer, 
  ChevronDown, Edit, Eye, Trash2, ArrowLeft, Calendar, User,
  Droplets
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';

// Fixed: Moved helper components to the top and added proper React.FC typing to handle children
const UserPlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
  </svg>
);

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

interface ChildDedication {
  id: string;
  nomerKartu: string;
  namaAnak: string;
  jenisKelamin: 'Laki-Laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string;
  namaAyah: string;
  namaIbu: string;
  alamat: string;
  tanggalPenyerahan: string;
  namaPendeta?: string;
  namaGereja?: string;
  keterangan?: string;
}

const DUMMY_DATA: ChildDedication[] = [
  { id: '1', nomerKartu: '201/KPA/GRJ-A/X/2022', namaAnak: 'Joko', jenisKelamin: 'Laki-Laki', tempatLahir: 'Surabaya', tanggalLahir: '02 Oktober 2022', namaAyah: 'Bambang', namaIbu: 'Arti', alamat: 'Jl. Tidar 1234. Surabaya', tanggalPenyerahan: '23 Oktober 2022', namaPendeta: 'Pdt A', namaGereja: 'GBT A' },
  { id: '2', nomerKartu: '202/KPA/GRJ-A/X/2022', namaAnak: 'Mira AB', jenisKelamin: 'Perempuan', tempatLahir: 'Surabaya', tanggalLahir: '28 Agustus 2022', namaAyah: 'Arif', namaIbu: 'Rinda', alamat: 'Jl. Tunjungan, Surabaya', tanggalPenyerahan: '17 Oktober 2022' },
  { id: '3', nomerKartu: '203/KPA/GRJ-A/X/2022', namaAnak: 'Amir S', jenisKelamin: 'Laki-Laki', tempatLahir: 'Surabaya', tanggalLahir: '04 September 2022', namaAyah: 'Charles', namaIbu: 'Dini', alamat: 'Jl. Pemuda 10, Surabaya', tanggalPenyerahan: '11 Oktober 2022' },
  { id: '4', nomerKartu: '204/KPA/GRJ-A/X/2022', namaAnak: 'Doddy A', jenisKelamin: 'Laki-Laki', tempatLahir: 'Surabaya', tanggalLahir: '10 Oktober 2010', namaAyah: 'Abdul', namaIbu: 'Bunda', alamat: 'Jl. Semarang 1234', tanggalPenyerahan: '12 Februari 2023' },
];

export const PenyerahanAnak: React.FC = () => {
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<ChildDedication | null>(null);

  const renderListView = () => (
    <div className="space-y-4">
      <TopStatsBar />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <UserPlusIcon /> Penyerahan Anak
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          MAIN MENU / Pelayanan Pastoral / <span className="text-blue-500">Penyerahan Anak</span>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-600">Data Penyerahan Anak</h2>
          <button 
            onClick={() => setMode('add')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus size={14} /> Add Penyerahan Anak
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* DataTables Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span>Show</span>
              <select className="border border-slate-200 rounded px-1 py-0.5 outline-none bg-slate-50 font-bold">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <button className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white rounded text-[11px] font-bold flex items-center gap-1 transition-colors">Excel</button>
              <button className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white rounded text-[11px] font-bold flex items-center gap-1 transition-colors">PDF</button>
              <button className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white rounded text-[11px] font-bold flex items-center gap-1 transition-colors">CSV</button>
              <button className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white rounded text-[11px] font-bold flex items-center gap-1 transition-colors">Copy</button>
              <button className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white rounded text-[11px] font-bold flex items-center gap-1 transition-colors">Print</button>
              <div className="relative group">
                <button className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white rounded text-[11px] font-bold flex items-center gap-1 transition-colors">
                  Column visibility <ChevronDown size={12} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium text-slate-500">Search:</span>
              <input type="text" className="border border-slate-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 outline-none w-48" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-600">
                <tr>
                  <th className="px-3 py-2 border-r border-slate-200 w-10 text-center">#</th>
                  <th className="px-3 py-2 border-r border-slate-200">Nomer Kartu</th>
                  <th className="px-3 py-2 border-r border-slate-200">Nama Anak</th>
                  <th className="px-3 py-2 border-r border-slate-200">Jenis Kelamin</th>
                  <th className="px-3 py-2 border-r border-slate-200">Tempat, Tanggal Lahir</th>
                  <th className="px-3 py-2 border-r border-slate-200">Nama Ayah</th>
                  <th className="px-3 py-2 border-r border-slate-200">Nama Ibu</th>
                  <th className="px-3 py-2 border-r border-slate-200">Alamat</th>
                  <th className="px-3 py-2 border-r border-slate-200">Tanggal Penyerahan</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DUMMY_DATA.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-3 py-3 border-r border-slate-200 text-center font-medium">{idx + 1}.</td>
                    <td className="px-3 py-3 border-r border-slate-200 font-bold text-slate-700">{item.nomerKartu}</td>
                    <td className="px-3 py-3 border-r border-slate-200 font-bold">{item.namaAnak}</td>
                    <td className="px-3 py-3 border-r border-slate-200">{item.jenisKelamin}</td>
                    <td className="px-3 py-3 border-r border-slate-200">{item.tempatLahir}, {item.tanggalLahir}</td>
                    <td className="px-3 py-3 border-r border-slate-200">{item.namaAyah}</td>
                    <td className="px-3 py-3 border-r border-slate-200">{item.namaIbu}</td>
                    <td className="px-3 py-3 border-r border-slate-200 italic text-slate-500">{item.alamat}</td>
                    <td className="px-3 py-3 border-r border-slate-200 font-bold">{item.tanggalPenyerahan}</td>
                    <td className="px-3 py-3 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-1">
                        <button 
                          onClick={() => { setSelected(item); setMode('edit'); }}
                          className="p-1.5 bg-amber-400 hover:bg-amber-500 text-white rounded shadow-sm" title="Edit Data"
                        >
                          <Edit size={12} />
                        </button>
                        <button 
                          onClick={() => { setSelected(item); setMode('detail'); }}
                          className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded shadow-sm" title="View Detail"
                        >
                          <Eye size={12} />
                        </button>
                        <button className="p-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded shadow-sm" title="Print Data">
                          <Printer size={12} />
                        </button>
                        <button className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded shadow-sm" title="Hapus Data">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500 pt-2">
            <div>Showing 1 to 4 of 4 entries</div>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-slate-200 rounded text-slate-400">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
              <button className="px-3 py-1 border border-slate-200 rounded text-slate-400">Next</button>
            </div>
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
          <Droplets className="text-slate-500" /> Penyerahan Anak
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase">
          MAIN MENU / Pelayanan Pastoral / Penyerahan Anak / <span className="text-blue-500">Detail</span>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-600 uppercase tracking-tight">Detail Data Penyerahan Anak</h2>
          <button 
            onClick={() => setMode('list')}
            className="bg-slate-500 hover:bg-slate-600 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-all"
          >
            <ArrowLeft size={14} /> Back
          </button>
        </div>
        
        <div className="p-8">
          <div className="max-w-3xl bg-slate-50/50 border border-slate-100 rounded-lg p-6 space-y-3">
            {[
              ['Nomer Kartu', selected?.nomerKartu],
              ['Nomer Jemaat', ''],
              ['Nama Anak', selected?.namaAnak],
              ['Alamat Rumah', selected?.alamat],
              ['Jenis Kelamin', selected?.jenisKelamin],
              ['Nomer HP', '08123456789'],
              ['Tempat, Tanggal Lahir', `${selected?.tempatLahir}, ${selected?.tanggalLahir}`],
              ['Nama Ayah', selected?.namaAyah],
              ['Nama Ibu', selected?.namaIbu],
              ['Waktu Penyerahan Anak', `Minggu, ${selected?.tanggalPenyerahan}`],
              ['Nama Pendeta', selected?.namaPendeta || '-'],
              ['Nama Gereja', selected?.namaGereja || '-'],
              ['Keterangan', selected?.keterangan || ''],
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
    </div>
  );

  const renderFormView = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <TopStatsBar />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <User className="text-blue-600" /> {mode === 'add' ? 'Add' : 'Edit'} Penyerahan Anak
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase">
          MAIN MENU / Pelayanan Pastoral / Penyerahan Anak / <span className="text-blue-500">{mode === 'add' ? 'Add' : 'Edit'}</span>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-600">{mode === 'add' ? 'Add' : 'Edit'} Penyerahan Anak</h2>
          <button 
            onClick={() => setMode('list')}
            className="bg-slate-500 hover:bg-slate-600 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-all"
          >
            <ArrowLeft size={14} /> Back
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Tabs */}
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
                <input type="text" className="form-input pr-10" placeholder="Nomer Jemaat" />
                <button className="absolute right-0 top-0 h-full px-3 bg-teal-500 text-white rounded-r">
                  <Search size={14} />
                </button>
              </div>
            </FormField>
            <FormField label="Nama Anak" required>
              <input type="text" defaultValue={selected?.namaAnak} className="form-input border-rose-200" placeholder="Nama Anak" />
            </FormField>
            <div className="hidden md:block"></div>

            <FormField label="Tempat Lahir">
              <input type="text" defaultValue={selected?.tempatLahir} className="form-input" placeholder="Tempat Lahir" />
            </FormField>
            <FormField label="Tanggal Lahir">
              <div className="relative">
                <input type="text" defaultValue={selected?.tanggalLahir} className="form-input" placeholder="dd/mm/yyyy" />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              </div>
            </FormField>

            <FormField label="Jenis Kelamin">
              <select className="form-input" defaultValue={selected?.jenisKelamin}>
                <option value="">- Pilih -</option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </FormField>
            <FormField label="Nomer HP Orang Tua">
              <input type="text" className="form-input" placeholder="Nomer HP Orang Tua" />
            </FormField>

            <FormField label="Nama Ayah">
              <input type="text" defaultValue={selected?.namaAyah} className="form-input" placeholder="Nama Ayah" />
            </FormField>
            <FormField label="Nama Ibu">
              <input type="text" defaultValue={selected?.namaIbu} className="form-input" placeholder="Nama Ibu" />
            </FormField>

            <FormField label="Alamat Rumah">
              <textarea rows={3} defaultValue={selected?.alamat} className="form-input" placeholder="Alamat Rumah"></textarea>
            </FormField>
            <div className="space-y-6">
              <FormField label="Kota">
                <input type="text" className="form-input" placeholder="Kota" />
              </FormField>
            </div>

            <FormField label="Hari Penyerahan">
              <select className="form-input">
                <option value="">- Pilih -</option>
                <option>Minggu</option>
              </select>
            </FormField>
            <FormField label="Tanggal Penyerahan">
              <div className="relative">
                <input type="text" defaultValue={selected?.tanggalPenyerahan} className="form-input" placeholder="dd/mm/yyyy" />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              </div>
            </FormField>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end gap-3">
             <button onClick={() => setMode('list')} className="px-6 py-2 bg-slate-200 text-slate-700 font-bold rounded text-xs hover:bg-slate-300 transition-colors">Batal</button>
             <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">Simpan Data</button>
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
