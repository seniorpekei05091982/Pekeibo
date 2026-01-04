
import React from 'react';
import { Search, Bell, Maximize, User, Grid, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  adminInfo: { name: string; photo: string };
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
}

export const Header: React.FC<HeaderProps> = ({ adminInfo, theme, setTheme }) => {
  return (
    <header className={`h-14 border-b flex items-center justify-between px-4 sticky top-0 z-30 shadow-sm transition-colors ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
      <div className="flex items-center gap-4">
        <button className={`p-2 rounded transition-colors ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
           <Grid size={20} />
        </button>
        <div className="hidden md:flex items-center gap-6 ml-4">
           <a href="#" className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}>Beranda</a>
           <a href="#" className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}>Pelayanan</a>
           <a href="#" className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}>Laporan</a>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <div className={`flex items-center p-1 rounded-full border transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
          <button 
            onClick={() => setTheme('light')}
            className={`p-1.5 rounded-full transition-all flex items-center gap-2 px-3 text-[9px] font-black uppercase ${theme === 'light' ? 'bg-white text-orange-500 shadow-sm' : 'text-slate-500'}`}
          >
            <Sun size={14} /> <span className={theme === 'light' ? 'block' : 'hidden md:block'}>Terang</span>
          </button>
          <button 
            onClick={() => setTheme('dark')}
            className={`p-1.5 rounded-full transition-all flex items-center gap-2 px-3 text-[9px] font-black uppercase ${theme === 'dark' ? 'bg-slate-900 text-blue-400 shadow-sm' : 'text-slate-400'}`}
          >
            <Moon size={14} /> <span className={theme === 'dark' ? 'block' : 'hidden md:block'}>Gelap</span>
          </button>
        </div>

        <div className="h-8 w-px bg-slate-200 mx-2 opacity-20"></div>

        <div className="relative group hidden sm:block">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
           <input 
             type="text" 
             placeholder="Cari data..." 
             className={`pl-10 pr-4 py-1.5 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-xs w-48 md:w-64 font-bold ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'}`}
           />
        </div>

        <button className={`p-2 rounded-full relative transition-colors ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 mx-1 opacity-20"></div>

        <div className={`flex items-center gap-3 pl-2 pr-1 cursor-pointer py-1 rounded-lg transition-colors group ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}>
          <div className="text-right hidden sm:block">
            <p className={`text-[10px] font-black leading-tight uppercase ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{adminInfo.name}</p>
            <p className="text-[8px] text-blue-500 font-black uppercase tracking-widest leading-tight">Admin Utama</p>
          </div>
          <div className="w-9 h-9 bg-slate-200 rounded-full border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
            <img src={adminInfo.photo} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};
