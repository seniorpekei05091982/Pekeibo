
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import Dashboard from './pages/Dashboard';
import { PenyerahanAnak } from './pages/PenyerahanAnak';
import { Katekisasi } from './pages/Katekisasi';
import { Baptisan } from './pages/Baptisan';
import { Kedukaan } from './pages/Kedukaan';
import { Konseling } from './pages/Konseling';
import { UserPlus, Trash2, Mail, Phone, MapPin, User as UserIcon, Save } from 'lucide-react';

interface JemaatEntry {
  id: string;
  nama: string;
  alamat: string;
  telepon: string;
  email: string;
}

const App: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [jemaatList, setJemaatList] = useState<JemaatEntry[]>([
    { id: '1', nama: 'Agustina Siahaan', alamat: 'Jl. Merdeka No. 10', telepon: '081234567890', email: 'agustina@email.com' },
    { id: '2', nama: 'Budi Santoso', alamat: 'Jl. Thamrin No. 5', telepon: '081311112222', email: 'budi@email.com' },
  ]);

  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    telepon: '',
    email: ''
  });

  const handleAddJemaat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama) return alert('Nama wajib diisi!');
    
    const newEntry: JemaatEntry = {
      id: Date.now().toString(),
      ...formData
    };
    
    setJemaatList([newEntry, ...jemaatList]);
    setFormData({ nama: '', alamat: '', telepon: '', email: '' });
    alert('Jemaat berhasil ditambahkan!');
  };

  const handleDeleteJemaat = (id: string, name: string) => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus data jemaat "${name}"? Tindakan ini tidak dapat dibatalkan.`);
    if (confirmDelete) {
      setJemaatList(jemaatList.filter(item => item.id !== id));
      alert('Data telah dihapus.');
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard onSelectMenu={setActiveMenu} />;
      case 'penyerahan':
        return <PenyerahanAnak onBack={() => setActiveMenu('dashboard')} />;
      case 'katekisasi':
        return <Katekisasi onBack={() => setActiveMenu('dashboard')} />;
      case 'baptisan':
        return <Baptisan onBack={() => setActiveMenu('dashboard')} />;
      case 'kedukaan':
        return <Kedukaan onBack={() => setActiveMenu('dashboard')} />;
      case 'konseling':
        return <Konseling onBack={() => setActiveMenu('dashboard')} />;
      case 'jemaat':
        return (
          <div className="p-6 max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveMenu('dashboard')}
                  className="p-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-600 transition-colors"
                  title="Kembali ke Dashboard"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Master Data Jemaat</h1>
                  <p className="text-slate-500 text-sm font-medium mt-1">Kelola informasi seluruh jemaat gereja secara terpusat.</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Total: {jemaatList.length} Jemaat
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <form onSubmit={handleAddJemaat} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-5 sticky top-20">
                  <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-2">
                    <UserPlusIcon /> Tambah Jemaat Baru
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nama Lengkap</label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input 
                          type="text" 
                          required
                          value={formData.nama}
                          onChange={(e) => setFormData({...formData, nama: e.target.value})}
                          placeholder="Contoh: Budi Santoso"
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Alamat</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-slate-300" size={16} />
                        <textarea 
                          rows={2}
                          value={formData.alamat}
                          onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                          placeholder="Alamat domisili saat ini..."
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">No. Telepon</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input 
                          type="tel"
                          value={formData.telepon}
                          onChange={(e) => setFormData({...formData, telepon: e.target.value})}
                          placeholder="08xx-xxxx-xxxx"
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Alamat Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input 
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="nama@email.com"
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={18} /> Simpan Jemaat
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-200">
                    <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">Daftar Jemaat</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {jemaatList.length > 0 ? jemaatList.map((j) => (
                      <div key={j.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                            <UserIcon size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">{j.nama}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold uppercase">
                                <Phone size={10} /> {j.telepon || '-'}
                              </span>
                              <span className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold uppercase">
                                <Mail size={10} /> {j.email || '-'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-1 italic">{j.alamat || 'Alamat tidak tersedia'}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteJemaat(j.id, j.nama)}
                          className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                          title="Hapus Jemaat"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )) : (
                      <div className="p-12 text-center">
                        <p className="text-slate-400 italic">Data jemaat masih kosong.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-8 text-center">
            <div className="max-w-md mx-auto py-20">
              <div className="mb-4 text-blue-500 opacity-20 flex justify-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"/></svg>
              </div>
              <h2 className="text-xl font-bold text-slate-700 mb-2">Modul "{activeMenu}"</h2>
              <p className="text-slate-500 text-sm">Modul ini sedang dalam pengembangan atau integrasi database sistem.</p>
              <button 
                onClick={() => setActiveMenu('dashboard')}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className="hidden lg:block">
        <Sidebar onSelect={setActiveMenu} activeId={activeMenu} />
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
          {renderContent()}
          <footer className="p-6 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center border-t border-slate-200 mt-auto bg-white/50">
            <span>Copyright &copy; 2024 <strong className="text-slate-500">Era Sistem Media</strong>. All rights reserved.</span>
            <span className="mt-2 sm:mt-0 font-semibold text-blue-600 uppercase tracking-tighter">Sistem Informasi Gereja Pro v2.0</span>
          </footer>
        </main>
      </div>
    </div>
  );
};

const UserPlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
  </svg>
);

const ArrowLeft = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

export default App;
