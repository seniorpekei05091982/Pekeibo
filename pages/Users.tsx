
import React, { useState } from 'react';
import { 
  Plus, Search, Edit, Trash2, ArrowLeft, 
  RotateCcw, CheckCircle2, UserPlus, Users as UsersIcon,
  ChevronDown, ShieldAlert
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';
import { UserRole } from '../types';

interface UserData {
  id: string;
  username: string;
  name: string;
  address: string;
  level: string;
}

const INITIAL_USERS: UserData[] = [
  { id: '1', username: 'admin_sinode', name: 'Super Admin Sinode', address: 'Jayapura', level: 'Admin' },
  { id: '2', username: 'admin_klasis_abe', name: 'Admin Klasis Abe', address: 'Abepura', level: 'user' },
  { id: '3', username: 'pdt_jemaat_01', name: 'Gembala Jemaat Lokal', address: 'Sentani', level: 'user' },
];

type ViewMode = 'list' | 'add' | 'edit';

interface UsersProps {
  onBack: () => void;
  userRole: UserRole;
}

export const Users: React.FC<UsersProps> = ({ onBack, userRole }) => {
  const [data, setData] = useState<UserData[]>(INITIAL_USERS);
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<UserData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const isSinode = userRole === 'Sinode';

  const filteredData = data.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTopNav = (title: string, currentAction?: string) => (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <UserPlus className="text-slate-800" size={28} />
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
      </div>
      <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest text-right">
        SETTINGS / <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => setMode('list')}>Users</span> 
        {currentAction && <span className="text-slate-300"> / {currentAction}</span>}
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <TopStatsBar />
      {renderTopNav('Hak Akses & Pengguna')}
      
      {!isSinode && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center gap-4 mb-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
             <ShieldAlert size={20} />
          </div>
          <p className="text-xs font-bold text-blue-800 uppercase tracking-tight">Hanya Administrator Sinode yang dapat mengelola hak akses dan pendaftaran akun pengguna sistem.</p>
        </div>
      )}

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/30">
          <h2 className="text-sm font-bold text-slate-700">Database Pengguna Sistem</h2>
          {isSinode && (
            <button 
              onClick={() => { setSelected(null); setMode('add'); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Plus size={14} /> Tambah User Baru
            </button>
          )}
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span>Tampilkan</span>
              <select className="border border-slate-300 rounded px-2 py-1 bg-white font-bold outline-none">
                <option>10</option>
                <option>25</option>
              </select>
              <span>entri</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-bold">Cari :</span>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-slate-300 rounded-full px-4 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none w-48 md:w-64" 
              />
            </div>
          </div>

          <div className="overflow-x-auto border rounded border-slate-100">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="px-3 py-3 border-r border-slate-200 text-center w-12">#</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center uppercase tracking-tighter">Username</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center uppercase tracking-tighter">Nama Lengkap</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center uppercase tracking-tighter">Alamat / Wilayah</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center uppercase tracking-tighter">Level Akses</th>
                  {isSinode && <th className="px-3 py-3 text-center uppercase tracking-tighter">Tindakan</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((user, idx) => (
                  <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-3 py-4 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600 text-center font-bold text-blue-600">{user.username}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600 text-center font-black uppercase">{user.name}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600 text-center">{user.address}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-center">
                       <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold uppercase text-[9px]">{user.level}</span>
                    </td>
                    {isSinode && (
                      <td className="px-3 py-4 text-center whitespace-nowrap">
                        <div className="flex justify-center gap-1">
                          <button onClick={() => { setSelected(user); setMode('edit'); }} className="px-2 py-1 bg-amber-400 hover:bg-amber-500 text-white rounded shadow-sm text-[10px] font-bold flex items-center gap-1 transition-all"><Edit size={10} /> Ubah</button>
                          <button className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded shadow-sm text-[10px] font-bold flex items-center gap-1 transition-all"><Trash2 size={10} /> Hapus</button>
                        </div>
                      </td>
                    )}
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
    <div className="p-6 space-y-4 animate-in slide-in-from-right-4 duration-300">
      <TopStatsBar />
      {renderTopNav(isEdit ? 'Edit User' : 'Add User', isEdit ? 'Edit User' : 'Add User')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700">{isEdit ? 'Form Pembaruan Data User' : 'Form Pendaftaran User Baru'}</h2>
          <button 
            onClick={() => setMode('list')} 
            className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <ArrowLeft size={14} /> Kembali
          </button>
        </div>

        <div className="p-10 max-w-5xl mx-auto space-y-6">
          <FormField label="Nama Lengkap" required={!isEdit}>
            <input type="text" className="form-input" defaultValue={selected?.name} placeholder="Nama Lengkap" />
          </FormField>

          <FormField label="Username Login" required={!isEdit}>
            <input type="text" className="form-input" defaultValue={selected?.username} placeholder="Username" />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <FormField label="Kata Sandi" sublabel={isEdit ? "(Biarkan kosong jika tidak diganti)" : ""} required={!isEdit}>
              <input type="password" name="pass" className="form-input" placeholder="Password" />
            </FormField>
            <FormField label="Konfirmasi Kata Sandi" required={!isEdit}>
              <input type="password" name="pass_conf" className="form-input" placeholder="Konfirmasi Password" />
            </FormField>
          </div>

          <FormField label="Alamat Domisili">
            <textarea rows={4} className="form-input" defaultValue={selected?.address} placeholder="Alamat lengkap"></textarea>
          </FormField>

          <FormField label="Level Akses" required>
            <select className="form-input bg-white" defaultValue={selected?.level || '- Pilih Level -'}>
              <option disabled>- Pilih Level -</option>
              <option value="Admin">Admin Sinode (Super)</option>
              <option value="Operator">Admin Klasis</option>
              <option value="Operator">Admin Jemaat</option>
              <option value="Supervisor">Supervisor Pusat</option>
            </select>
          </FormField>

          <div className="flex gap-2 pt-10 border-t border-slate-100">
            <button onClick={() => setMode('list')} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-100 transition-all active:scale-95">
              <CheckCircle2 size={16} /> Simpan Akun
            </button>
            <button className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-10 py-3 rounded-xl text-xs font-bold transition-all">
              <RotateCcw size={16} /> Reset Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-full">
      {mode === 'list' ? renderListView() : renderFormView(mode === 'edit')}
      <style>{`
        .form-input {
          @apply w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 bg-slate-50;
        }
      `}</style>
    </div>
  );
};

const FormField: React.FC<{ label: string; sublabel?: string; children: React.ReactNode; required?: boolean }> = ({ label, sublabel, children, required }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-slate-700 flex items-center gap-1 uppercase tracking-tight">
      {label} {sublabel && <span className="font-normal text-slate-400 italic text-[10px] lowercase">{sublabel}</span>} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="w-full">{children}</div>
  </div>
);
