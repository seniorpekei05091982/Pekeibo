
import React from 'react';
import { Users, Calendar, List, UsersRound, Star, UserPlus, Droplets, Heart, Skull } from 'lucide-react';

interface StatBoxProps {
  label: string;
  count: number;
  color: string;
  icon: any;
  active?: boolean;
}

const StatBox: React.FC<StatBoxProps> = ({ label, count, color, icon: Icon, active }) => (
  <div className={`${color} text-white rounded p-1.5 flex items-center gap-2 shadow-sm min-w-[100px] relative overflow-hidden flex-1 group hover:brightness-110 cursor-pointer transition-all ${active ? 'ring-2 ring-white ring-offset-1 scale-105 z-10' : ''}`}>
    <div className="bg-black/10 p-1 rounded group-hover:bg-black/20 transition-colors">
      <Icon size={14} />
    </div>
    <div className="z-10 overflow-hidden">
      <p className="text-[9px] font-bold uppercase leading-tight opacity-90 truncate">{label}</p>
      <p className="text-sm font-black leading-tight">{count}</p>
    </div>
    <div className="absolute top-0 right-0 bg-black/30 px-1 py-0.5 text-[7px] font-black leading-none rounded-bl min-w-[14px] text-center">
      {count}
    </div>
  </div>
);

interface TopStatsBarProps {
  jemaatCount?: number;
  jadwalCount?: number;
  pelayananCount?: number;
  asetCount?: number;
}

export const TopStatsBar: React.FC<TopStatsBarProps> = ({ jemaatCount = 1, jadwalCount = 2, pelayananCount = 2, asetCount = 1 }) => {
  const stats = [
    { label: 'Jemaat', count: jemaatCount, color: 'bg-slate-600', icon: Users, active: true },
    { label: 'Jadwal', count: jadwalCount, color: 'bg-emerald-600', icon: Calendar },
    { label: 'Daftar', count: pelayananCount, color: 'bg-rose-600', icon: List },
    { label: 'Komsel', count: 4, color: 'bg-amber-500', icon: UsersRound },
    { label: 'Talenta', count: 4, color: 'bg-teal-500', icon: Star },
    { label: 'Aset', count: asetCount, color: 'bg-slate-400', icon: UserPlus },
    { label: 'Baptisan Air', count: 5, color: 'bg-emerald-500', icon: Droplets },
    { label: 'Pernikahan', count: 5, color: 'bg-rose-500', icon: Heart },
    { label: 'Kedukaan', count: 2, color: 'bg-amber-600', icon: Skull },
  ];

  return (
    <div className="flex flex-wrap gap-1 mb-6">
      {stats.map((s, i) => <StatBox key={i} {...s} />)}
    </div>
  );
};
