
import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] bg-white rounded shadow-sm border-t-4 border-blue-500 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 text-center border-b border-slate-100">
          <h1 className="text-xl font-bold text-blue-600 mb-6 tracking-tight uppercase">Sistem Informasi Gereja</h1>
          
          <div className="w-24 h-24 bg-white rounded-full border-4 border-orange-500 shadow-sm mx-auto flex items-center justify-center overflow-hidden mb-3">
            <img src={churchInfo.logo} alt="Church Logo" className="w-full h-full object-cover" />
          </div>
          
          <h2 className="text-base font-black text-slate-800 tracking-tighter uppercase leading-tight px-4">{churchInfo.nama}</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <p className="text-center text-xs text-slate-500 font-medium">Masukkan Username dan Password</p>
          
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <User size={16} />
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Lock size={16} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button 
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-bold shadow-md shadow-blue-100 transition-all active:scale-95"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
