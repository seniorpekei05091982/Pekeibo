
import React from 'react';
import { 
  X, User, MapPin, Settings as SettingsIcon, Home, CheckCircle
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';

export const ProfileUser: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <TopStatsBar />

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
           <User className="text-blue-600" size={24} /> Profile User
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          SETTINGS / <span className="text-blue-500">Profile User</span>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden max-w-5xl">
        <div className="p-4 border-b border-slate-100 font-bold text-slate-600 bg-slate-50/30 text-sm">
          Profile User
        </div>

        <div className="p-12">
          <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-8 flex flex-col md:flex-row gap-12 relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            {/* Left Content */}
            <div className="flex-1 space-y-8 relative z-10">
              <div className="space-y-2">
                <h3 className="text-amber-500 font-black text-2xl tracking-tight">Sistem Informasi Gereja</h3>
                <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Era Sistem Media</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 group/item">
                  <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center text-blue-500">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Address</p>
                    <p className="text-sm font-bold text-slate-700">Surabaya</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group/item">
                  <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center text-blue-500">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Username</p>
                    <p className="text-sm font-bold text-slate-700">admin</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group/item">
                  <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center text-blue-500">
                    <SettingsIcon size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Level</p>
                    <p className="text-sm font-bold text-slate-700">Admin</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Avatar Content */}
            <div className="shrink-0 flex flex-col items-center justify-center relative">
              <div className="w-64 h-64 bg-white rounded shadow-2xl border-4 border-white overflow-hidden relative group">
                <img 
                  src="https://ui-avatars.com/api/?name=Admin+User&background=f1f5f9&color=64748b&size=512" 
                  alt="Avatar" 
                  className="w-full h-full object-cover grayscale opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <div className="w-24 h-24 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center text-slate-800 border-4 border-slate-100 transform scale-100 group-hover:scale-110 transition-transform duration-500">
                    <CheckCircle size={48} className="text-slate-800" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={onBack}
                className="mt-8 px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-rose-100 transition-all active:scale-95"
              >
                <X size={14} /> Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
