
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SIDEBAR_MENU } from '../constants';
import { NavItem } from '../types';

interface SidebarProps {
  onSelect: (id: string) => void;
  activeId: string;
}

// Helper to check if any child (recursively) matches the activeId
const isSectionActive = (item: NavItem, activeId: string): boolean => {
  if (item.id === activeId) return true;
  if (item.children) {
    return item.children.some(child => isSectionActive(child, activeId));
  }
  return false;
};

// Helper to find which header "owns" the current activeId
const isHeaderActive = (headerId: string, activeId: string): boolean => {
  const findHeaderIndex = SIDEBAR_MENU.findIndex(m => m.id === headerId);
  if (findHeaderIndex === -1) return false;
  
  // Search subsequent items until the next header
  for (let i = findHeaderIndex + 1; i < SIDEBAR_MENU.length; i++) {
    const item = SIDEBAR_MENU[i];
    if (item.isHeader) break;
    if (isSectionActive(item, activeId)) return true;
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
    const isActive = isHeaderActive(item.id, activeId);
    return (
      <div className={`px-4 py-3 mt-4 text-[11px] font-bold tracking-widest uppercase transition-colors duration-300 ${
        isActive ? 'bg-blue-600/10 text-blue-400 border-l-4 border-blue-500' : 'text-slate-500 bg-[#1a2226]/50 border-l-4 border-transparent'
      }`}>
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
          if (hasChildren) {
            setIsOpen(!isOpen);
          } else {
            onSelect(item.id);
          }
        }}
        className={`flex items-center w-full px-4 py-2 text-sm transition-all duration-200 border-l-4 ${
          isActive 
            ? 'bg-slate-700 text-white border-blue-500' 
            : isChildActive 
              ? 'bg-slate-700/30 text-blue-100 border-blue-500/50'
              : 'text-slate-400 border-transparent hover:bg-slate-700/50 hover:text-white'
        } ${depth > 0 ? 'pl-10 text-xs' : ''}`}
      >
        {item.icon && <span className={`mr-3 ${isActive || isChildActive ? 'text-blue-400' : 'text-slate-400'}`}>{item.icon}</span>}
        <span className={`flex-1 text-left ${isActive || isChildActive ? 'font-bold' : 'font-medium'}`}>
          {item.label}
        </span>
        {hasChildren && (
          <span className="ml-2">
            {(isOpen || isChildActive) ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </span>
        )}
      </button>
      {hasChildren && (isOpen || isChildActive) && (
        <div className="bg-[#1e282c]">
          {item.children?.map((child) => (
            <NavMenuItem 
              key={child.id} 
              item={child} 
              depth={depth + 1} 
              onSelect={onSelect}
              activeId={activeId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ onSelect, activeId }) => {
  return (
    <div className="h-full bg-[#222d32] text-white flex flex-col w-64 shadow-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
      {/* Brand Header */}
      <div className="p-4 bg-orange-600 flex items-center gap-3 border-b border-orange-700/50 sticky top-0 z-10 shadow-md">
        <div className="w-9 h-9 bg-white rounded shadow-inner flex items-center justify-center text-orange-600 font-extrabold text-xl">
          G
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-tight leading-tight uppercase">SIM GEREJA</h1>
          <p className="text-[10px] font-medium opacity-80 leading-none">Integrated System</p>
        </div>
      </div>
      
      {/* User Info Section */}
      <div className="p-4 flex items-center gap-3 bg-[#1a2226]">
        <div className="w-10 h-10 rounded-full bg-slate-600 border border-slate-500 overflow-hidden ring-2 ring-slate-700">
          <img src="https://ui-avatars.com/api/?name=Admin+User&background=334155&color=fff" alt="Admin" />
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-bold truncate">Admin User</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Online</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 pb-10">
        {SIDEBAR_MENU.map((item) => (
          <NavMenuItem 
            key={item.id} 
            item={item} 
            depth={0} 
            onSelect={onSelect} 
            activeId={activeId}
          />
        ))}
      </nav>
      
      <div className="p-4 text-[10px] text-slate-500 text-center border-t border-slate-800 bg-slate-900/50">
        SIM GEREJA v2.0-Pro <br/>
        &copy; 2024 ERA SISTEM MEDIA
      </div>
    </div>
  );
};
