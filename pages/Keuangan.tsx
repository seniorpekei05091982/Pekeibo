
import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Eye, Trash2, ArrowLeft, 
  RotateCcw, CheckCircle2, Wallet, TrendingUp, TrendingDown,
  Calendar, FileText, Download, Printer, Filter
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';

interface KeuanganData {
  id: string;
  nomerRef: string;
  tanggal: string;
  keterangan: string;
  kategori: string;
  jenis: 'Pemasukan' | 'Pengeluaran';
  jumlah: number;
  dibuatOleh: string;
  dibuatTanggal: string;
}

const INITIAL_DATA: KeuanganData[] = [
  { id: '1', nomerRef: 'FIN-2401-001', tanggal: '05/01/2024', keterangan: 'Persembahan Ibadah Raya 1', kategori: 'Persembahan Mingguan', jenis: 'Pemasukan', jumlah: 5500000, dibuatOleh: 'admin', dibuatTanggal: '05/01/2024' },
  { id: '2', nomerRef: 'FIN-2401-002', tanggal: '07/01/2024', keterangan: 'Pembayaran Tagihan Listrik', kategori: 'Operasional', jenis: 'Pengeluaran', jumlah: 1250000, dibuatOleh: 'admin', dibuatTanggal: '07/01/2024' },
  { id: '3', nomerRef: 'FIN-2401-003', tanggal: '10/01/2024', keterangan: 'Donasi Pembangunan Gedung', kategori: 'Donasi Khusus', jenis: 'Pemasukan', jumlah: 15000000, dibuatOleh: 'admin', dibuatTanggal: '10/01/2024' },
  { id: '4', nomerRef: 'FIN-2401-004', tanggal: '12/01/2024', keterangan: 'Bantuan Sosial Jemaat Sakit', kategori: 'Diakonia', jenis: 'Pengeluaran', jumlah: 750000, dibuatOleh: 'admin', dibuatTanggal: '12/01/2024' },
];

type ViewMode = 'list' | 'add' | 'edit' | 'detail';

export const Keuangan: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [data, setData] = useState<KeuanganData[]>(INITIAL_DATA);
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<KeuanganData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterJenis, setFilterJenis] = useState<'All' | 'Pemasukan' | 'Pengeluaran'>('All');

  const totals = useMemo(() => {
    const pemasukan = data.filter(d => d.jenis === 'Pemasukan').reduce((acc, curr) => acc + curr.jumlah, 0);
    const pengeluaran = data.filter(d => d.jenis === 'Pengeluaran').reduce((acc, curr) => acc + curr.jumlah, 0);
    return { pemasukan, pengeluaran, saldo: pemasukan - pengeluaran };
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.keterangan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.nomerRef.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesJenis = filterJenis === 'All' || item.jenis === filterJenis;
      return matchesSearch && matchesJenis;
    });
  }, [data, searchTerm, filterJenis]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const handleDelete = (id: string, ref: string) => {
    if (window.confirm(`Hapus transaksi keuangan dengan referensi "${ref}"?`)) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderTopNav = (title: string, currentAction?: string) => (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <Wallet className="text-slate-800" size={28} />
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
      </div>
      <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest text-right flex-1">
        MASTER DATA / <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => setMode('list')}>Keuangan</span> 
        {currentAction && <span className="text-slate-300"> / {currentAction}</span>}
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="p-6 bg-slate-100 min-h-full">
      <TopStatsBar />
      {renderTopNav('Manajemen Keuangan')}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Saldo Kas</p>
            <h3 className="text-xl font-black text-slate-800">{formatCurrency(totals.saldo)}</h3>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Wallet size={20} />
          </div>
        </div>
        <div className="bg-white p-5 rounded border border-slate-200 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-colors">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Pemasukan</p>
            <h3 className="text-xl font-black text-emerald-600">{formatCurrency(totals.pemasukan)}</h3>
          </div>
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <TrendingUp size={20} />
          </div>
        </div>
        <div className="bg-white p-5 rounded border border-slate-200 shadow-sm flex items-center justify-between group hover:border-rose-200 transition-colors">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Pengeluaran</p>
            <h3 className="text-xl font-black text-rose-600">{formatCurrency(totals.pengeluaran)}</h3>
          </div>
          <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
            <TrendingDown size={20} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700">Histori Transaksi Keuangan</h2>
          <button 
            onClick={() => { setSelected(null); setMode('add'); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus size={16} /> Input Transaksi Baru
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Filter size={14} className="text-blue-500" />
                <span className="font-bold">Jenis:</span>
                <select 
                  value={filterJenis}
                  onChange={(e) => setFilterJenis(e.target.value as any)}
                  className="border border-slate-300 rounded px-2 py-1 bg-white outline-none"
                >
                  <option value="All">Semua</option>
                  <option value="Pemasukan">Pemasukan</option>
                  <option value="Pengeluaran">Pengeluaran</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {['Excel', 'PDF', 'Printer'].map(btn => (
                <button key={btn} className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white text-[11px] font-bold rounded shadow-sm transition-all">{btn}</button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 w-full md:w-auto">
              <span className="font-bold">Search:</span>
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari nomer referensi / keterangan..."
                  className="w-full border border-slate-300 rounded-full pl-9 pr-4 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none" 
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-3 border-r border-slate-200 text-center w-12">#</th>
                  <th className="px-3 py-3 border-r border-slate-200">Ref / Tanggal</th>
                  <th className="px-3 py-3 border-r border-slate-200">Keterangan / Kategori</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-right">Pemasukan (D)</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-right">Pengeluaran (K)</th>
                  <th className="px-3 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-3 py-4 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}.</td>
                    <td className="px-3 py-4 border-r border-slate-200">
                      <div className="font-bold text-slate-700">{item.nomerRef}</div>
                      <div className="text-slate-400 text-[10px]">{item.tanggal}</div>
                    </td>
                    <td className="px-3 py-4 border-r border-slate-200">
                      <div className="font-medium text-slate-700">{item.keterangan}</div>
                      <div className="text-blue-500 text-[10px] font-bold">{item.kategori}</div>
                    </td>
                    <td className="px-3 py-4 border-r border-slate-200 text-right">
                      {item.jenis === 'Pemasukan' ? (
                        <span className="font-bold text-emerald-600">{formatCurrency(item.jumlah)}</span>
                      ) : '-'}
                    </td>
                    <td className="px-3 py-4 border-r border-slate-200 text-right">
                      {item.jenis === 'Pengeluaran' ? (
                        <span className="font-bold text-rose-600">({formatCurrency(item.jumlah)})</span>
                      ) : '-'}
                    </td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => { setSelected(item); setMode('edit'); }} className="p-1.5 bg-amber-400 hover:bg-amber-500 text-white rounded shadow-sm" title="Edit Data"><Edit size={12} /></button>
                        <button onClick={() => { setSelected(item); setMode('detail'); }} className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded shadow-sm" title="View Detail"><Eye size={12} /></button>
                        <button onClick={() => handleDelete(item.id, item.nomerRef)} className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded shadow-sm" title="Hapus Data"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-3 py-20 text-center text-slate-400 italic">Data transaksi tidak ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4 mt-2">
            <div>Menampilkan {filteredData.length} transaksi</div>
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
      {renderTopNav(isEdit ? 'Edit Transaksi Keuangan' : 'Input Transaksi Keuangan', isEdit ? 'Edit Transaksi' : 'Input Baru')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700">{isEdit ? 'Form Edit Transaksi' : 'Form Input Transaksi Baru'}</h2>
          <button 
            onClick={() => setMode('list')} 
            className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <ArrowLeft size={14} /> Kembali
          </button>
        </div>

        <div className="p-6">
          <div className="max-w-4xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Nomer Referensi" required>
                <input type="text" className="form-input bg-slate-100" defaultValue={selected?.nomerRef || 'FIN-' + new Date().getTime().toString().substr(-6)} readOnly />
              </FormField>

              <FormField label="Tanggal Transaksi" required>
                <div className="relative">
                  <input type="text" className="form-input" defaultValue={selected?.tanggal || new Date().toLocaleDateString('id-ID')} placeholder="dd/mm/yyyy" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                </div>
              </FormField>

              <FormField label="Jenis Transaksi" required>
                <select className="form-input bg-white" defaultValue={selected?.jenis || 'Pemasukan'}>
                  <option value="Pemasukan">Pemasukan (Kas Masuk)</option>
                  <option value="Pengeluaran">Pengeluaran (Kas Keluar)</option>
                </select>
              </FormField>

              <FormField label="Kategori Transaksi" required>
                <select className="form-input bg-white" defaultValue={selected?.kategori || ''}>
                  <option value="" disabled>- Pilih Kategori -</option>
                  <option>Persembahan Mingguan</option>
                  <option>Persembahan Syukur</option>
                  <option>Donasi Khusus</option>
                  <option>Operasional Kantor</option>
                  <option>Gaji & Tunjangan</option>
                  <option>Listrik, Air & Internet</option>
                  <option>Pemeliharaan Gedung</option>
                  <option>Diakonia / Sosial</option>
                </select>
              </FormField>

              <FormField label="Jumlah (Rp)" required>
                <input type="number" className="form-input font-bold text-blue-600" defaultValue={selected?.jumlah || 0} placeholder="0" />
              </FormField>
            </div>

            <FormField label="Keterangan Transaksi" required>
              <textarea rows={4} className="form-input" defaultValue={selected?.keterangan} placeholder="Rincian keterangan transaksi..."></textarea>
            </FormField>

            <div className="flex gap-2 pt-6 border-t border-slate-100">
              <button onClick={() => setMode('list')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95">
                <CheckCircle2 size={16} /> Simpan Transaksi
              </button>
              <button className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded text-xs font-bold flex items-center gap-2 transition-all">
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
      {renderTopNav('Detail Transaksi Keuangan', 'Rincian Transaksi')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700 uppercase">Ringkasan Transaksi {selected?.nomerRef}</h2>
          <div className="flex gap-2">
            <button className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors" title="Download PDF"><Download size={16} /></button>
            <button className="p-1.5 bg-slate-50 text-slate-600 rounded hover:bg-slate-100 transition-colors" title="Print"><Printer size={16} /></button>
            <button 
              onClick={() => setMode('list')} 
              className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              <ArrowLeft size={14} /> Kembali
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3 p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                selected?.jenis === 'Pemasukan' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
              }`}>
                {selected?.jenis === 'Pemasukan' ? <TrendingUp size={40} /> : <TrendingDown size={40} />}
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Nominal</p>
              <h3 className={`text-2xl font-black ${
                selected?.jenis === 'Pemasukan' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {selected?.jenis === 'Pengeluaran' ? '-' : ''}{formatCurrency(selected?.jumlah || 0)}
              </h3>
              <div className={`mt-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                selected?.jenis === 'Pemasukan' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
              }`}>
                {selected?.jenis}
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 gap-y-4">
              <DetailRow label="Nomer Referensi" value={selected?.nomerRef} />
              <DetailRow label="Tanggal Transaksi" value={selected?.tanggal} />
              <DetailRow label="Kategori" value={selected?.kategori} isHighlight />
              <DetailRow label="Keterangan" value={selected?.keterangan} />
              
              <div className="my-4 border-t border-slate-100"></div>
              
              <div className="grid grid-cols-2 gap-4">
                <DetailRow label="Dibuat Oleh" value={selected?.dibuatOleh} />
                <DetailRow label="Input Tanggal" value={selected?.dibuatTanggal} />
              </div>

              <div className="mt-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <FileText size={12} /> Audit Trail
                </p>
                <p className="text-[11px] text-slate-600 font-medium">
                  Transaksi ini telah dicatat dan masuk ke dalam buku besar gereja pada tanggal {selected?.dibuatTanggal}. Segala perubahan akan dicatat dalam histori log sistem.
                </p>
              </div>
            </div>
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
          @apply w-full px-3 py-2 text-[11px] border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 bg-white;
        }
      `}</style>
    </div>
  );
};

const FormField: React.FC<{ label: string; children: React.ReactNode; required?: boolean }> = ({ label, children, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
      {label}{required && <span className="text-rose-500">*</span>}
    </label>
    <div className="w-full">{children}</div>
  </div>
);

const DetailRow: React.FC<{ label: string; value: string | undefined; isHighlight?: boolean }> = ({ label, value, isHighlight }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
    <span className={`text-xs font-bold ${isHighlight ? 'text-blue-600' : 'text-slate-700'}`}>
      {value || '-'}
    </span>
  </div>
);
