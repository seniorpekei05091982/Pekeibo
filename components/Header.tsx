
import React from 'react';
import { Search, Bell, Maximize, User, Grid } from 'lucide-react';

interface HeaderProps {
  adminInfo: { name: string; photo: string };
}

export const Header: React.FC<HeaderProps> = ({ adminInfo }) => {
  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 rounded text-slate-500">
           <Grid size={20} />
        </button>
        <div className="hidden md:flex items-center gap-6 ml-4">
           <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600">Home</a>
           <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600">Pelayanan Pastoral</a>
           <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600">Laporan</a>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative group hidden sm:block">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
           <input 
             type="text" 
             placeholder="Search data..." 
             className="pl-10 pr-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm w-48 md:w-64"
           />
        </div>

        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
          <Maximize size={18} />
        </button>

        <div className="h-8 w-px bg-slate-200 mx-1"></div>

        <div className="flex items-center gap-3 pl-2 pr-1 cursor-pointer hover:bg-slate-50 py-1 rounded-lg transition-colors group">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-700 leading-tight truncate max-w-[120px]">{adminInfo.name}</p>
            <p className="text-[10px] text-slate-400 font-semibold leading-tight">SUPER ADMIN</p>
          </div>
          <div className="w-9 h-9 bg-slate-200 rounded-full border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
            <img src={adminInfo.photo} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};
