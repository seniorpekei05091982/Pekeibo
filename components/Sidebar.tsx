
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Circle, LogOut } from 'lucide-react';
import { SIDEBAR_MENU } from '../constants';
import { NavItem } from '../types';

interface SidebarProps {
  onSelect: (id: string) => void;
  activeId: string;
  churchInfo: { nama: string, logo: string };
  adminInfo: { name: string, photo: string };
}

const isSectionActive = (item: NavItem, activeId: string): boolean => {
  if (item.id === activeId) return true;
  if (item.children) {
    return item.children.some(child => isSectionActive(child, activeId));
  }
  return false;
};

const NavMenuItem: React.FC<{ 
  item: NavItem; 
  depth: number; 
  onSelect: (id: string) => void;
  activeId: string;
}> = ({ item, depth, onSelect, activeId }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (item.isHeader) {
    return (
      <div className="px-6 py-5 mt-6 text-[9px] font-black tracking-[0.3em] uppercase text-slate-600 border-t border-slate-900/50">
        {item.label}
      </div>
    );
  }

  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeId === item.id;
  const isChildActive = hasChildren && isSectionActive(item, activeId);

  return (
    <div className="w-full">
      <button
        onClick={() => {
          if (hasChildren) setIsOpen(!isOpen);
          else onSelect(item.id);
        }}
        className={`flex items-center w-full px-6 py-3.5 text-xs transition-all duration-300 relative group ${
          isActive 
            ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/10' 
            : isChildActive 
              ? 'text-white bg-slate-900/50'
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
        } ${depth > 0 ? 'pl-14 py-2.5 opacity-80' : ''}`}
      >
        {isActive && !hasChildren && (
          <div className="absolute left-0 top-1 bottom-1 w-1 bg-white rounded-r-full shadow-[0_0_10px_white]"></div>
        )}

        {item.icon && (
          <span className={`mr-4 transition-all duration-300 transform group-hover:scale-110 ${
            isActive ? 'text-white' : isChildActive ? 'text-blue-400' : 'text-slate-600 group-hover:text-blue-400'
          }`}>
            {item.icon}
          </span>
        )}
        
        <span className={`flex-1 text-left uppercase tracking-wider ${isActive || isChildActive ? 'font-black' : 'font-bold'}`}>
          {item.label}
        </span>

        {hasChildren && (
          <span className={`ml-2 transition-transform duration-300 ${(isOpen || isChildActive) ? 'rotate-0' : '-rotate-90'}`}>
            <ChevronDown size={14} className={isChildActive || isActive ? 'text-blue-400' : 'text-slate-700'} />
          </span>
        )}
      </button>

      {hasChildren && (isOpen || isChildActive) && (
        <div className="bg-slate-950/40 border-l-2 border-slate-900 ml-8 my-1 rounded-bl-xl">
          {item.children?.map((child) => (
            <NavMenuItem key={child.id} item={child} depth={depth + 1} onSelect={onSelect} activeId={activeId} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ onSelect, activeId, churchInfo, adminInfo }) => {
  return (
    <div className="h-full bg-slate-950 text-white flex flex-col w-64 shadow-[10px_0_30px_rgba(0,0,0,0.2)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-900 border-r border-slate-900">
      {/* Brand Header */}
      <div className="p-6 bg-orange-600/90 backdrop-blur-md sticky top-0 z-30 flex items-center gap-4 border-b border-orange-500/20">
        <div className="w-12 h-12 bg-white rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden shrink-0 border-2 border-white/20 transform hover:scale-110 transition-transform duration-500">
          <img src={churchInfo.logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <div className="overflow-hidden">
          <h1 className="font-black text-[11px] tracking-tighter leading-none uppercase truncate text-white drop-shadow-sm">{churchInfo.nama}</h1>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-orange-100">Live Dashboard</p>
          </div>
        </div>
      </div>
      
      {/* Profile Card */}
      <div className="mx-4 mt-8 mb-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-inner group cursor-pointer hover:bg-slate-900 transition-colors">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 p-0.5 border-2 border-slate-800 overflow-hidden shadow-2xl group-hover:rotate-6 transition-transform">
              <img src={adminInfo.photo} alt="Admin" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full"></div>
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-black truncate text-slate-100 uppercase tracking-tight">{adminInfo.name}</p>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Super Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 pb-24">
        {SIDEBAR_MENU.map((item) => (
          <NavMenuItem key={item.id} item={item} depth={0} onSelect={onSelect} activeId={activeId} />
        ))}
      </nav>
      
      {/* Support Footer */}
      <div className="mt-auto p-6 bg-slate-950 border-t border-slate-900 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-[1px] bg-slate-800"></div>
          <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Support v2.0</p>
          <div className="w-6 h-[1px] bg-slate-800"></div>
        </div>
        <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">&copy; 2024 ERA SISTEM MEDIA PAPUA</p>
      </div>
    </div>
  );
};
