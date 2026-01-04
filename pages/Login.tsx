
import React, { useState } from 'react';
import { User, Lock, LogIn, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  churchInfo: { nama: string; logo: string };
}

export const Login: React.FC<LoginProps> = ({ onLogin, churchInfo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin();
    } else {
      alert('Silakan masukkan nama pengguna dan kata sandi.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ornamen Latar Belakang */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-[420px] bg-white rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="p-8 text-center bg-slate-50 border-b border-slate-100">
          <div className="w-24 h-24 bg-white rounded-3xl border-4 border-white shadow-xl mx-auto flex items-center justify-center overflow-hidden mb-4">
            <img src={churchInfo.logo} alt="Logo Gereja" className="w-full h-full object-cover" />
          </div>
          
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-1">
            SIM GEREJA <span className="text-orange-500">PRO</span>
          </h1>
          <p className="text-slate-500 font-bold text-[9px] uppercase tracking-[0.4em]">Sistem Manajemen Terpadu</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Akses Keamanan</h2>
            <p className="text-slate-500 text-xs font-medium">Silakan masuk untuk mengelola data gereja.</p>
          </div>
          
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Pengguna (Username)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nama Pengguna"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-100 border border-slate-200 text-slate-900 rounded-2xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kata Sandi (Password)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-100 border border-slate-200 text-slate-900 rounded-2xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <ShieldCheck size={18} /> Masuk ke Sistem
          </button>

          <div className="pt-2 text-center">
             <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">© 2024 ERA SISTEM MEDIA PAPUA</p>
          </div>
        </form>
      </div>
    </div>
  );
};
