
import React from 'react';
import { Users, Calendar, List, UsersRound, Star, UserPlus, Droplets, Heart, Skull } from 'lucide-react';

interface StatBoxProps {
  label: string;
  count: number;
  color: string;
  icon: any;
}

// Fixed: Using React.FC to properly handle React props like 'key' in mapped collections
const StatBox: React.FC<StatBoxProps> = ({ label, count, color, icon: Icon }) => (
  <div className={`${color} text-white rounded p-2 flex items-center gap-3 shadow-sm min-w-[120px] relative overflow-hidden`}>
    <div className="bg-black/10 p-1.5 rounded">
      <Icon size={16} />
    </div>
    <div className="z-10">
      <p className="text-[10px] font-bold uppercase leading-none opacity-80">{label}</p>
      <p className="text-sm font-black">{count}</p>
    </div>
    <span className="absolute -right-1 -bottom-1 opacity-10">
      <Icon size={32} />
    </span>
    <div className="absolute top-0 right-0 bg-black/20 px-1 text-[8px] font-bold">{count}</div>
  </div>
);

export const TopStatsBar = () => {
  const stats = [
    { label: 'Jemaat', count: 19, color: 'bg-slate-600', icon: Users },
    { label: 'Jadwal Ibadah', count: 5, color: 'bg-emerald-600', icon: Calendar },
    { label: 'Daftar Pelayanan', count: 6, color: 'bg-rose-600', icon: List },
    { label: 'Komisi', count: 4, color: 'bg-amber-500', icon: UsersRound },
    { label: 'Talenta', count: 5, color: 'bg-teal-500', icon: Star },
    { label: 'Penyerahan Anak', count: 4, color: 'bg-slate-500', icon: UserPlus },
    { label: 'Baptisan Air', count: 5, color: 'bg-emerald-500', icon: Droplets },
    { label: 'Pernikahan', count: 3, color: 'bg-pink-600', icon: Heart },
    { label: 'Kedukaan', count: 2, color: 'bg-amber-600', icon: Skull },
  ];

  return (
    <div className="flex flex-wrap gap-1 mb-6">
      {stats.map((s, i) => <StatBox key={i} {...s} />)}
    </div>
  );
};
