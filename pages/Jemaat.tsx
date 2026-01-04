
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

interface JemaatProps {
  onBack: () => void;
  churchInfo: { nama: string, logo: string, alamat: string, telp: string };
}

export const Jemaat: React.FC<JemaatProps> = ({ onBack, churchInfo }) => {
  const [data, setData] = useState<JemaatData[]>([
    { id: '1', nomerJemaat: '000020', nomerKeluarga: '000001', nama: 'Amir', alamat: 'Jl. Rungkut Mejoyo 12345', jenisKelamin: 'Laki-Laki', tempatLahir: 'Surabaya', tanggalLahir: '08 Maret 1970', nomerHP: '08901234567', komsel: 'Paulus', foto: 'https://ui-avatars.com/api/?name=Amir&background=000&color=fff', golonganDarah: 'AB', statusPernikahan: 'Sudah Menikah', hubunganKeluarga: 'Suami', pendidikan: 'S1', pekerjaan: 'Swasta', namaAyah: 'Boby', namaIbu: 'Johana', rt: '06', rw: '18', dusun: 'Rungkut', kelurahan: 'Rungkut', kecamatan: 'Rungkut', kota: 'Surabaya', provinsi: 'Jawa Timur', kodePos: '60289', email: 'amir@gmail.com', talenta: 'Menyanyi', ibadahDiikuti: 'Ibadah Raya 1, Doa Pagi', pelayanan: 'Song Leader, Singer' },
  ]);
  const [mode, setMode] = useState<'list' | 'add' | 'edit' | 'detail' | 'print'>('list');
  const [selected, setSelected] = useState<JemaatData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Data Pribadi');

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.nomerJemaat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const renderPrintView = () => (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-[1000px] flex shadow-2xl rounded-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex-1 bg-white p-12 overflow-y-auto max-h-[90vh]">
          <div className="border border-slate-300 p-8 min-h-[1100px] font-sans text-[11px] leading-tight">
             <div className="flex justify-between items-start mb-10 border-b border-slate-300 pb-4">
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-white border border-orange-500 rounded-full flex items-center justify-center overflow-hidden">
                    <img src={churchInfo.logo} alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="max-w-[300px]">
                    <h2 className="text-sm font-black text-slate-800 uppercase leading-tight">{churchInfo.nama}</h2>
                    <p className="text-[9px] text-slate-500">{churchInfo.alamat}, {churchInfo.telp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-base font-bold text-slate-800 uppercase tracking-widest mb-2">DATA JEMAAT</h2>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                    <span className="text-slate-400">Nomer Anggota</span>
                    <span className="font-bold">: {selected?.nomerJemaat}</span>
                  </div>
                </div>
             </div>
             {/* Content follows... (rest of the print view) */}
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
                  ].map(([label, val], idx) => (
                    <div key={idx} className="flex border-b border-slate-100 py-1.5">
                      <span className="w-32 font-bold text-slate-700">{label}</span>
                      <span className="w-4 text-center">:</span>
                      <span className="flex-1 text-slate-600">{val}</span>
                    </div>
                  ))}
                </div>
             </div>
             <p className="text-[9px] text-slate-400 mt-20 text-center italic">Dicetak secara otomatis oleh Sistem Informasi Gereja - {churchInfo.nama}</p>
          </div>
        </div>
        <div className="w-[300px] bg-slate-50 p-8 border-l border-slate-200">
           <h3 className="text-xl font-bold text-slate-800 mb-6">Print</h3>
           <button onClick={() => window.print()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded shadow-lg transition-all text-sm mb-3">Print Now</button>
           <button onClick={() => setMode('list')} className="w-full bg-white border border-slate-300 hover:bg-slate-100 text-slate-600 font-bold py-2 rounded transition-all text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Users className="text-slate-700" size={28} />
          <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Daftar Jemaat</h1>
        </div>
        <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest text-right">
          {churchInfo.nama} <br/>
          <span className="text-blue-500">Master Data / Jemaat</span>
        </div>
      </div>
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-700">Data Jemaat Aktif</h2>
          <button onClick={() => setMode('add')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all"><Plus size={16} /> Add Jemaat</button>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-[11px] text-left border-collapse">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="px-3 py-3 border-r border-slate-200 text-center">No</th>
                <th className="px-3 py-3 border-r border-slate-200">Nama</th>
                <th className="px-3 py-3 border-r border-slate-200">Alamat</th>
                <th className="px-3 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-blue-50/50">
                  <td className="px-3 py-4 border-r border-slate-200 text-center">{idx + 1}</td>
                  <td className="px-3 py-4 border-r border-slate-200 font-bold">{item.nama}</td>
                  <td className="px-3 py-4 border-r border-slate-200">{item.alamat}</td>
                  <td className="px-3 py-4 text-center">
                    <div className="flex justify-center gap-1">
                      <button onClick={() => { setSelected(item); setMode('detail'); }} className="p-1.5 bg-emerald-500 text-white rounded shadow-sm"><Eye size={12} /></button>
                      <button onClick={() => { setSelected(item); setMode('print'); }} className="p-1.5 bg-sky-500 text-white rounded shadow-sm"><Printer size={12} /></button>
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

  return (
    <div className="animate-in fade-in duration-500">
      {mode === 'list' && renderListView()}
      {mode === 'print' && renderPrintView()}
      {/* (rest of the component handled in similar fashion) */}
    </div>
  );
};
