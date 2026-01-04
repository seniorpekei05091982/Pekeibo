
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, Printer, ArrowLeft, 
  ChevronDown, User, MapPin, Phone, Mail, Calendar, 
  Users, CheckCircle2, X, Download, FileText, Image as ImageIcon
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';
import { Modal } from '../components/Modal';

interface JemaatData {
  id: string;
  nomerJemaat: string;
  nomerKeluarga: string;
  nama: string;
  alamat: string;
  jenisKelamin: 'Laki-Laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string;
  nomerHP: string;
  komsel: string;
  foto?: string;
  // Detail fields
  golonganDarah?: string;
  statusPernikahan?: string;
  hubunganKeluarga?: string;
  pendidikan?: string;
  pekerjaan?: string;
  namaAyah?: string;
  namaIbu?: string;
  rt?: string;
  rw?: string;
  dusun?: string;
  kelurahan?: string;
  kecamatan?: string;
  kota?: string;
  provinsi?: string;
  kodePos?: string;
  email?: string;
  talenta?: string;
  ibadahDiikuti?: string;
  pelayanan?: string;
}

const INITIAL_DATA: JemaatData[] = [
  { id: '1', nomerJemaat: '000020', nomerKeluarga: '000001', nama: 'Amir', alamat: 'Jl. Rungkut Mejoyo 12345', jenisKelamin: 'Laki-Laki', tempatLahir: 'Surabaya', tanggalLahir: '08 Maret 1970', nomerHP: '08901234567', komsel: 'Paulus', foto: 'https://ui-avatars.com/api/?name=Amir&background=000&color=fff', golonganDarah: 'AB', statusPernikahan: 'Sudah Menikah', hubunganKeluarga: 'Suami', pendidikan: 'S1', pekerjaan: 'Swasta', namaAyah: 'Boby', namaIbu: 'Johana', rt: '06', rw: '18', dusun: 'Rungkut', kelurahan: 'Rungkut', kecamatan: 'Rungkut', kota: 'Surabaya', provinsi: 'Jawa Timur', kodePos: '60289', email: 'amir@gmail.com', talenta: 'Menyanyi', ibadahDiikuti: 'Ibadah Raya 1, Doa Pagi', pelayanan: 'Song Leader, Singer' },
  { id: '2', nomerJemaat: '000019', nomerKeluarga: '000001', nama: 'Buana', alamat: 'Jl. Tambaksari', jenisKelamin: 'Laki-Laki', tempatLahir: 'Surabaya', tanggalLahir: '06 Maret 1989', nomerHP: '081987654321', komsel: 'Belum Mengikuti', foto: 'https://ui-avatars.com/api/?name=Buana&background=000&color=fff' },
  { id: '3', nomerJemaat: '000018', nomerKeluarga: '', nama: 'Doddy A', alamat: 'Jl. Arjuno 1234', jenisKelamin: 'Laki-Laki', tempatLahir: '', tanggalLahir: '01 Maret 1956', nomerHP: '08123456790', komsel: 'Belum Mengikuti', foto: 'https://ui-avatars.com/api/?name=Doddy+A&background=000&color=fff' },
  { id: '4', nomerJemaat: '000017', nomerKeluarga: '', nama: 'Amir', alamat: 'Jl Sumatera 321', jenisKelamin: 'Laki-Laki', tempatLahir: 'Jakarta', tanggalLahir: '10 Maret 1997', nomerHP: '', komsel: 'Belum Mengikuti', foto: 'https://ui-avatars.com/api/?name=Amir+2&background=000&color=fff' },
];

type ViewMode = 'list' | 'add' | 'edit' | 'detail' | 'print';

export const Jemaat: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [data, setData] = useState<JemaatData[]>(INITIAL_DATA);
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<JemaatData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Data Pribadi');

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.nomerJemaat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus data Jemaat "${name}"?`)) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const handlePrint = (item: JemaatData) => {
    setSelected(item);
    setMode('print');
  };

  const renderTopNav = (title: string) => (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <Users className="text-slate-700" size={28} />
        <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">{title}</h1>
      </div>
      <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
        MASTER DATA / <span className="text-blue-500">Jemaat</span> {mode !== 'list' && <span className="text-blue-500">/ {title}</span>}
      </div>
    </div>
  );

  const renderTabs = () => (
    <div className="flex flex-wrap gap-1 mb-6 border-b border-slate-200">
      {['Data Pribadi', 'Ibadah', 'Pelayanan', 'Talenta', 'Data Penyerahan Anak', 'Data Baptisan Air', 'Data Pernikahan', 'Info'].map(tab => (
        <button 
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-xs font-bold transition-all border-b-2 ${
            activeTab === tab 
              ? 'bg-blue-600 text-white border-blue-600 rounded-t-md' 
              : 'text-blue-600 hover:bg-slate-50 border-transparent'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      {renderTopNav('Jemaat')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-700">Data Jemaat</h2>
          <button 
            onClick={() => { setSelected(null); setMode('add'); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Plus size={16} /> Add Jemaat
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span>Show</span>
              <select className="border border-slate-300 rounded px-2 py-1 bg-slate-50 font-bold outline-none">
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
                  <th className="px-3 py-3 border-r border-slate-200 text-center w-10">#</th>
                  <th className="px-3 py-3 border-r border-slate-200">Nomer Jemaat</th>
                  <th className="px-3 py-3 border-r border-slate-200">Nomer Keluarga</th>
                  <th className="px-3 py-3 border-r border-slate-200">Nama</th>
                  <th className="px-3 py-3 border-r border-slate-200">Alamat</th>
                  <th className="px-3 py-3 border-r border-slate-200">Jenis Kelamin</th>
                  <th className="px-3 py-3 border-r border-slate-200">Tempat, Tanggal Lahir</th>
                  <th className="px-3 py-3 border-r border-slate-200">Nomer HP</th>
                  <th className="px-3 py-3 border-r border-slate-200">Komsel</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center">Foto</th>
                  <th className="px-3 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 transition-colors group">
                    <td className="px-3 py-4 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}.</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.nomerJemaat}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.nomerKeluarga || '-'}</td>
                    <td className="px-3 py-4 border-r border-slate-200 font-bold text-slate-800">{item.nama}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.alamat}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.jenisKelamin}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.tempatLahir ? `${item.tempatLahir}, ` : ''}{item.tanggalLahir}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600">{item.nomerHP || '-'}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600 font-medium">{item.komsel}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-center">
                      <div className="w-10 h-12 bg-black rounded mx-auto overflow-hidden shadow-inner flex items-center justify-center">
                        {item.foto ? <img src={item.foto} className="w-full h-full object-cover" /> : <ImageIcon className="text-white/20" size={16} />}
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-0.5">
                        <button onClick={() => { setSelected(item); setMode('edit'); }} className="p-1.5 bg-amber-400 hover:bg-amber-500 text-white rounded shadow-sm" title="Edit Data"><Edit size={12} /></button>
                        <button onClick={() => { setSelected(item); setMode('detail'); }} className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded shadow-sm" title="View Detail"><Eye size={12} /></button>
                        <button onClick={() => handlePrint(item)} className="p-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded shadow-sm" title="Print Data"><Printer size={12} /></button>
                        <button onClick={() => handleDelete(item.id, item.nama)} className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded shadow-sm" title="Hapus Data"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={11} className="px-3 py-20 text-center text-slate-400 italic">No matching records found</td>
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <Users className="text-blue-600" /> {isEdit ? 'Edit Jemaat' : 'Add Jemaat'}
        </h1>
        <button onClick={() => setMode('list')} className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 shadow-sm">
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 p-6 overflow-hidden">
        <h2 className="text-sm font-bold text-slate-600 mb-6 pb-2 border-b border-slate-100">{isEdit ? 'Edit Jemaat' : 'Add Jemaat'}</h2>
        
        {renderTabs()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-6xl">
          <div className="space-y-4">
            <FormField label="Nomer Jemaat">
              <input type="text" className="form-input" defaultValue={selected?.nomerJemaat} placeholder="000000" />
            </FormField>
            <FormField label="Nama" required>
              <input type="text" className="form-input" defaultValue={selected?.nama} placeholder="Nama Lengkap" />
            </FormField>
            <FormField label="Alamat">
              <textarea rows={3} className="form-input" defaultValue={selected?.alamat} placeholder="Alamat"></textarea>
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="RT">
                <input type="text" className="form-input" defaultValue={selected?.rt} placeholder="RT" />
              </FormField>
              <FormField label="RW">
                <input type="text" className="form-input" defaultValue={selected?.rw} placeholder="RW" />
              </FormField>
            </div>
            <FormField label="Kelurahan (Desa)">
              <input type="text" className="form-input" defaultValue={selected?.kelurahan} placeholder="Kelurahan" />
            </FormField>
            <FormField label="Kota (Kabupaten)">
              <input type="text" className="form-input" defaultValue={selected?.kota} placeholder="Kota" />
            </FormField>
            <FormField label="Kodepos">
              <input type="text" className="form-input" defaultValue={selected?.kodePos} placeholder="Kodepos" />
            </FormField>
            <FormField label="Tempat Lahir">
              <input type="text" className="form-input" defaultValue={selected?.tempatLahir} placeholder="Tempat Lahir" />
            </FormField>
          </div>

          <div className="space-y-4">
            <FormField label="Nomer Keluarga">
              <input type="text" className="form-input" defaultValue={selected?.nomerKeluarga} placeholder="000000" />
            </FormField>
            <div className="mt-[2.75rem]"></div>
            <FormField label="Dusun (Kampung)">
              <input type="text" className="form-input" defaultValue={selected?.dusun} placeholder="Dusun" />
            </FormField>
            <FormField label="Kecamatan (Distrik)">
              <input type="text" className="form-input" defaultValue={selected?.kecamatan} placeholder="Kecamatan" />
            </FormField>
            <FormField label="Provinsi">
              <input type="text" className="form-input" defaultValue={selected?.provinsi} placeholder="Provinsi" />
            </FormField>
            <FormField label="Email">
              <input type="email" className="form-input" defaultValue={selected?.email} placeholder="Email" />
            </FormField>
            <FormField label="Tanggal Lahir">
              <div className="relative">
                <input type="text" className="form-input" defaultValue={selected?.tanggalLahir} placeholder="dd/mm/yyyy" />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              </div>
            </FormField>
          </div>
        </div>

        <div className="mt-12 flex justify-end gap-3 pt-6 border-t border-slate-100">
           <button onClick={() => setMode('list')} className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded shadow-sm transition-all">Cancel</button>
           <button onClick={() => setMode('list')} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow-lg transition-all flex items-center gap-2">
             <CheckCircle2 size={16} /> {isEdit ? 'Update Data' : 'Save Data'}
           </button>
        </div>
      </div>
    </div>
  );

  const renderDetailView = () => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <Users className="text-blue-600" /> Detail Jemaat
        </h1>
        <button onClick={() => setMode('list')} className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 shadow-sm">
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 p-6 overflow-hidden">
        <h2 className="text-sm font-bold text-slate-600 mb-6 pb-2 border-b border-slate-100">Detail Jemaat</h2>
        
        {renderTabs()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-6xl">
          <div className="space-y-4">
            <DetailItem label="Nomer Jemaat" value={selected?.nomerJemaat} />
            <DetailItem label="Nama" value={selected?.nama} isRequired />
            <DetailItem label="Alamat" value={selected?.alamat} />
            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="RT" value={selected?.rt} />
              <DetailItem label="RW" value={selected?.rw} />
            </div>
            <DetailItem label="Kelurahan (Desa)" value={selected?.kelurahan} />
            <DetailItem label="Kota (Kabupaten)" value={selected?.kota} />
            <DetailItem label="Kodepos" value={selected?.kodePos} />
            <DetailItem label="Tempat Lahir" value={selected?.tempatLahir} />
          </div>

          <div className="space-y-4">
            <DetailItem label="Nomer Keluarga" value={selected?.nomerKeluarga} />
            <div className="mt-[2.4rem]"></div>
            <DetailItem label="Dusun (Kampung)" value={selected?.dusun} />
            <DetailItem label="Kecamatan (Distrik)" value={selected?.kecamatan} />
            <DetailItem label="Provinsi" value={selected?.provinsi} />
            <DetailItem label="Email" value={selected?.email} />
            <DetailItem label="Tanggal Lahir" value={selected?.tanggalLahir} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrintView = () => (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-[1000px] flex shadow-2xl rounded-lg overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Paper Content */}
        <div className="flex-1 bg-white p-12 overflow-y-auto max-h-[90vh]">
          <div className="border border-slate-300 p-8 min-h-[1100px] font-sans text-[11px] leading-tight">
             {/* Header */}
             <div className="flex justify-between items-start mb-10 border-b border-slate-300 pb-4">
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white text-[10px] text-center p-1 uppercase">LOGO GEREJA</div>
                  <div>
                    <h2 className="text-base font-bold text-slate-800 uppercase">Gereja ABC</h2>
                    <p className="text-[10px] text-slate-500">Jl. Surabaya, 031-5555555</p>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-base font-bold text-slate-800 uppercase tracking-widest mb-2">DATA JEMAAT</h2>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                    <span className="text-slate-400">Nomer Anggota</span>
                    <span className="font-bold">: {selected?.nomerJemaat}</span>
                    <span className="text-slate-400">Nomer Keluarga</span>
                    <span className="font-bold">: {selected?.nomerKeluarga}</span>
                  </div>
                </div>
             </div>

             {/* Personal Info */}
             <div className="flex gap-8 mb-8">
                <div className="w-32 h-40 bg-black flex items-center justify-center shadow-md">
                   {selected?.foto ? <img src={selected.foto} className="w-full h-full object-cover" /> : <User className="text-white/20" size={48} />}
                </div>
                <div className="flex-1 space-y-px">
                  {[
                    ['Nama', selected?.nama],
                    ['Alamat', selected?.alamat],
                    ['Tempat, Tanggal Lahir', `${selected?.tempatLahir}, ${selected?.tanggalLahir}`],
                    ['Jenis Kelamin', selected?.jenisKelamin],
                    ['Nomer Telepon / HP', `0315555555 / ${selected?.nomerHP}`],
                  ].map(([label, val], idx) => (
                    <div key={idx} className="flex border-b border-slate-100 py-1.5">
                      <span className="w-32 font-bold text-slate-700">{label}</span>
                      <span className="w-4 text-center">:</span>
                      <span className="flex-1 text-slate-600">{val}</span>
                    </div>
                  ))}
                </div>
             </div>

             <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Data Pelengkap */}
                <div className="space-y-2">
                  <h3 className="bg-slate-50 border-b border-slate-200 px-2 py-1 font-bold text-slate-700 uppercase tracking-tighter">Data Pelengkap</h3>
                  {[
                    ['Golongan Darah', selected?.golonganDarah],
                    ['Status Pernikahan', selected?.statusPernikahan],
                    ['Hubungan Keluarga', selected?.hubunganKeluarga],
                    ['Pendidikan', selected?.pendidikan],
                    ['Pekerjaan', selected?.pekerjaan],
                    ['Komsel', selected?.komsel],
                    ['Nama Ayah', selected?.namaAyah],
                    ['Nama Ibu', selected?.namaIbu],
                  ].map(([label, val], idx) => (
                    <div key={idx} className="flex border-b border-slate-100 py-1">
                      <span className="w-24 font-bold text-slate-500">{label}</span>
                      <span className="w-4 text-center">:</span>
                      <span className="flex-1 text-slate-600">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Info Alamat */}
                <div className="space-y-2">
                   <h3 className="bg-slate-50 border-b border-slate-200 px-2 py-1 font-bold text-slate-700 uppercase tracking-tighter">Info Alamat</h3>
                   {[
                    ['RT / RW', `${selected?.rt} / ${selected?.rw}`],
                    ['Dusun (Kampung)', selected?.dusun],
                    ['Kelurahan (Desa)', selected?.kelurahan],
                    ['Kecamatan (Distrik)', selected?.kecamatan],
                    ['Kota (Kabupaten)', selected?.kota],
                    ['Provinsi', selected?.provinsi],
                    ['Kode Pos', selected?.kodePos],
                    ['Email', selected?.email],
                  ].map(([label, val], idx) => (
                    <div key={idx} className="flex border-b border-slate-100 py-1">
                      <span className="w-28 font-bold text-slate-500">{label}</span>
                      <span className="w-4 text-center">:</span>
                      <span className="flex-1 text-slate-600">{val}</span>
                    </div>
                  ))}
                </div>
             </div>

             <div className="space-y-2 mb-8">
                <h3 className="bg-slate-50 border-b border-slate-200 px-2 py-1 font-bold text-slate-700 uppercase tracking-tighter">Data Kerohanian</h3>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    ['Talenta', selected?.talenta],
                    ['Ibadah yang Diikuti', selected?.ibadahDiikuti],
                    ['Pelayanan', selected?.pelayanan],
                  ].map(([label, val], idx) => (
                    <div key={idx} className="flex border-b border-slate-100 py-1">
                      <span className="w-32 font-bold text-slate-500">{label}</span>
                      <span className="w-4 text-center">:</span>
                      <span className="flex-1 text-slate-600">{val}</span>
                    </div>
                  ))}
                </div>
             </div>

             <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <h3 className="bg-slate-50 border-b border-slate-200 px-2 py-1 font-bold text-slate-700 uppercase tracking-tighter">Data Penyerahan Anak</h3>
                  <div className="grid grid-cols-2 gap-y-1 text-slate-500 font-bold">
                    <span>Nomer Kartu</span><span>: 201/KPA/GRI-A/X/2022</span>
                    <span>Tanggal Penyerahan</span><span>: 23 Oktober 2022</span>
                    <span>Dilayani Oleh</span><span>: Pdt A</span>
                    <span>Di Gereja</span><span>: GBT A</span>
                  </div>
                </div>
                <div className="space-y-2">
                   <h3 className="bg-slate-50 border-b border-slate-200 px-2 py-1 font-bold text-slate-700 uppercase tracking-tighter">Data Baptisan Air</h3>
                   <div className="grid grid-cols-2 gap-y-1 text-slate-500 font-bold">
                    <span>Nomer Kartu Baptisan</span><span>: 1000/KBA/GRI-A/XI/2022</span>
                    <span>Tanggal Baptisan Air</span><span>: 06 November 2022</span>
                    <span>Dilayani Oleh</span><span>: Pdt A</span>
                    <span>Di Gereja</span><span>: GBT A</span>
                  </div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                   <h3 className="bg-slate-50 border-b border-slate-200 px-2 py-1 font-bold text-slate-700 uppercase tracking-tighter">Data Pernikahan</h3>
                   <div className="grid grid-cols-2 gap-y-1 text-slate-500 font-bold">
                    <span>Nomer Surat Nikah</span><span>: 203/SNG/GRI-A/XI/2023</span>
                    <span>Tanggal Pernikahan</span><span>: 06 November 2023</span>
                    <span>Dilayani Oleh</span><span>: Pdt AB</span>
                    <span>Di Gereja</span><span>: GRIA</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="w-[300px] bg-slate-50 p-8 border-l border-slate-200">
           <h3 className="text-xl font-bold text-slate-800 mb-6">Print</h3>
           <p className="text-xs text-slate-500 mb-8">1 sheet of paper</p>
           
           <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Destination</label>
                <div className="relative">
                  <select className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs outline-none">
                    <option>EPSON L310 Series</option>
                    <option>Save as PDF</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pages</label>
                <select className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs outline-none">
                  <option>All</option>
                  <option>Custom</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Copies</label>
                <input type="number" defaultValue={1} className="w-20 bg-white border border-slate-300 rounded px-3 py-2 text-xs outline-none" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Color</label>
                <select className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs outline-none">
                  <option>Color</option>
                  <option>Black & White</option>
                </select>
              </div>

              <button className="flex items-center justify-between w-full py-2 border-b border-slate-200 text-xs font-bold text-slate-600 hover:text-blue-600">
                More settings <ChevronDown size={14} />
              </button>
           </div>

           <div className="mt-12 flex gap-3">
              <button onClick={() => window.print()} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded shadow-lg shadow-blue-200 transition-all text-sm">Print</button>
              <button onClick={() => setMode('list')} className="flex-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-600 font-bold py-2 rounded transition-all text-sm">Cancel</button>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500">
      {mode === 'list' && renderListView()}
      {mode === 'add' && renderFormView(false)}
      {mode === 'edit' && renderFormView(true)}
      {mode === 'detail' && renderDetailView()}
      {mode === 'print' && renderPrintView()}

      <style>{`
        .form-input {
          @apply w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-300 bg-slate-50/30;
        }
      `}</style>
    </div>
  );
};

const FormField: React.FC<{ label: string; children: React.ReactNode; required?: boolean }> = ({ label, children, required }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <label className="sm:w-32 text-xs font-black text-slate-700 shrink-0">
      {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
    <div className="flex-1 w-full">{children}</div>
  </div>
);

const DetailItem: React.FC<{ label: string; value: any; isRequired?: boolean }> = ({ label, value, isRequired }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <label className="sm:w-32 text-xs font-black text-slate-700 shrink-0">
      {label}{isRequired && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
    <div className="flex-1 w-full bg-slate-100/50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-600 font-medium min-h-[34px]">
      {value || '-'}
    </div>
  </div>
);
