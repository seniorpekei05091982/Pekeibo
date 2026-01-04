
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
      alert('Silakan masukkan username dan password.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-[440px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="p-8 text-center bg-slate-50 border-b border-slate-100 relative">
          <div className="w-24 h-24 bg-white rounded-3xl border-4 border-white shadow-2xl mx-auto flex items-center justify-center overflow-hidden mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <img src={churchInfo.logo} alt="Church Logo" className="w-full h-full object-cover" />
          </div>
          
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-1">
            SIM GEREJA <span className="text-orange-500">PRO</span>
          </h1>
          <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.4em]">Integrated Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Security Access</h2>
            <p className="text-slate-500 text-xs font-medium">Identify yourself to access the command center.</p>
          </div>
          
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-600 transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-300 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-300 font-bold"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
          >
            <ShieldCheck size={18} className="group-hover:animate-pulse" /> Authorize Session
          </button>

          <div className="pt-4 flex items-center justify-between opacity-40 grayscale hover:grayscale-0 transition-all">
             <span className="h-px bg-slate-200 flex-1"></span>
             <span className="mx-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">KINGMI PAPUA SYSTEM</span>
             <span className="h-px bg-slate-200 flex-1"></span>
          </div>
        </form>
      </div>
    </div>
  );
};
