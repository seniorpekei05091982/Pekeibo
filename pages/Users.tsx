
import React, { useState } from 'react';
import { 
  Plus, Search, Edit, Trash2, ArrowLeft, 
  RotateCcw, CheckCircle2, UserPlus, Users as UsersIcon,
  ChevronDown
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';

interface UserData {
  id: string;
  username: string;
  name: string;
  address: string;
  level: string;
}

const INITIAL_USERS: UserData[] = [
  { id: '1', username: 'admin', name: 'Era Sistem Media', address: 'Surabaya', level: 'Admin' },
  { id: '2', username: 'user', name: 'Era', address: 'Sidoarjo', level: 'user' },
  { id: '3', username: 'supervisor', name: 'Supervisor', address: 'Jl. Tunjungan 100, Surabaya', level: 'supervisor' },
  { id: '4', username: 'administrator', name: 'Administrator', address: 'Jl. Merak 1, Sidoarjo', level: 'administrator' },
  { id: '5', username: 'admin1', name: 'Admin 1', address: 'Jl. Cempaka 1, Surabaya', level: 'admin1' },
];

type ViewMode = 'list' | 'add' | 'edit';

export const Users: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [data, setData] = useState<UserData[]>(INITIAL_USERS);
  const [mode, setMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<UserData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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
      {renderTopNav('Users')}
      
      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/30">
          <h2 className="text-sm font-bold text-slate-700">Data Users</h2>
          <button 
            onClick={() => { setSelected(null); setMode('add'); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Plus size={14} /> Add User
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span>Show</span>
              <select className="border border-slate-300 rounded px-2 py-1 bg-white font-bold outline-none">
                <option>10</option>
                <option>25</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {['Excel', 'PDF', 'CSV', 'Copy', 'Print'].map(btn => (
                <button key={btn} className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white text-[10px] font-bold rounded shadow-sm transition-all">{btn}</button>
              ))}
              <button className="px-3 py-1 bg-slate-500 text-white text-[10px] font-bold rounded flex items-center gap-1 shadow-sm">Column visibility <ChevronDown size={10} /></button>
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
                  <th className="px-3 py-3 border-r border-slate-200 text-center uppercase tracking-tighter">Username</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center uppercase tracking-tighter">Name</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center uppercase tracking-tighter">Address</th>
                  <th className="px-3 py-3 border-r border-slate-200 text-center uppercase tracking-tighter">Level</th>
                  <th className="px-3 py-3 text-center uppercase tracking-tighter">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((user, idx) => (
                  <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-3 py-4 border-r border-slate-200 text-center font-medium text-slate-500">{idx + 1}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600 text-center">{user.username}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600 text-center font-bold">{user.name}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600 text-center">{user.address}</td>
                    <td className="px-3 py-4 border-r border-slate-200 text-slate-600 text-center font-medium">{user.level}</td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => { setSelected(user); setMode('edit'); }} className="px-2 py-1 bg-amber-400 hover:bg-amber-500 text-white rounded shadow-sm text-[10px] font-bold flex items-center gap-1 transition-all"><Edit size={10} /> Edit</button>
                        <button className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded shadow-sm text-[10px] font-bold flex items-center gap-1 transition-all"><Trash2 size={10} /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4 mt-2 font-medium">
            <div>Showing 1 to {filteredData.length} of {data.length} entries</div>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded font-bold shadow-md shadow-blue-100">1</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
            </div>
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
          <h2 className="text-sm font-bold text-slate-700">{isEdit ? 'Edit User' : 'Add User'}</h2>
          <button 
            onClick={() => setMode('list')} 
            className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <ArrowLeft size={14} /> Back
          </button>
        </div>

        <div className="p-10 max-w-5xl mx-auto space-y-6">
          <FormField label="Full Name" required={!isEdit}>
            <input type="text" className="form-input" defaultValue={selected?.name} placeholder="Full Name" />
          </FormField>

          <FormField label="Username" required={!isEdit}>
            <input type="text" className="form-input" defaultValue={selected?.username} placeholder="Username" />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <FormField label="Password" sublabel={isEdit ? "(Biarkan kosong jika tidak diganti)" : ""} required={!isEdit}>
              <input type="password" name="pass" className="form-input" placeholder="Password" />
            </FormField>
            <FormField label="Password Confirmation" required={!isEdit}>
              <input type="password" name="pass_conf" className="form-input" placeholder="Password Confirmation" />
            </FormField>
          </div>

          <FormField label="Address">
            <textarea rows={4} className="form-input" defaultValue={selected?.address} placeholder="Address"></textarea>
          </FormField>

          <FormField label="Level" required>
            <select className="form-input bg-white" defaultValue={selected?.level || '- Pilih Level -'}>
              <option disabled>- Pilih Level -</option>
              <option value="Admin">Admin</option>
              <option value="Operator">Operator</option>
              <option value="Supervisor">Supervisor</option>
            </select>
          </FormField>

          <div className="flex gap-2 pt-10 border-t border-slate-100">
            <button onClick={() => setMode('list')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-100 transition-all active:scale-95">
              <CheckCircle2 size={16} /> Save
            </button>
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-lg shadow-teal-100 transition-all">
              <RotateCcw size={16} /> Reset
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
          @apply w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300;
        }
      `}</style>
    </div>
  );
};

const FormField: React.FC<{ label: string; sublabel?: string; children: React.ReactNode; required?: boolean }> = ({ label, sublabel, children, required }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
      {label} {sublabel && <span className="font-normal text-slate-400 italic text-[10px]">{sublabel}</span>} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="w-full">{children}</div>
  </div>
);
