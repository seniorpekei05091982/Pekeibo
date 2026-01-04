
import React from 'react';
import { Users, Calendar, List, UsersRound, Star, Box } from 'lucide-react';

interface StatBoxProps {
  label: string;
  count: number;
  color: string;
  icon: any;
  active?: boolean;
}

const StatBox: React.FC<StatBoxProps> = ({ label, count, color, icon: Icon, active }) => (
  <div className={`${color} text-white rounded-[2rem] p-6 flex items-center gap-5 shadow-2xl min-w-[160px] relative overflow-hidden flex-1 group hover:scale-[1.02] cursor-pointer transition-all duration-500 border-b-8 border-black/10`}>
    <div className="bg-white/20 p-4 rounded-3xl group-hover:bg-white/40 transition-colors shadow-inner backdrop-blur-md">
      <Icon size={24} strokeWidth={2.5} />
    </div>
    <div className="z-10 overflow-hidden">
      <p className="text-[10px] font-black uppercase leading-tight opacity-60 truncate tracking-[0.2em] mb-1.5">{label}</p>
      <p className="text-3xl font-black leading-tight tracking-tighter drop-shadow-sm">{count}</p>
    </div>
    {/* Decorative Glow */}
    <div className="absolute top-[-50%] left-[-50%] w-full h-full bg-white/5 rounded-full blur-3xl group-hover:translate-x-1/2 transition-transform duration-1000"></div>
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
    { label: 'Congregation', count: jemaatCount, color: 'bg-blue-600', icon: Users, active: true },
    { label: 'Schedule', count: jadwalCount, color: 'bg-emerald-600', icon: Calendar },
    { label: 'Service', count: pelayananCount, color: 'bg-rose-600', icon: List },
    { label: 'Commission', count: 4, color: 'bg-orange-500', icon: UsersRound },
    { label: 'Talents', count: 4, color: 'bg-indigo-600', icon: Star },
    { label: 'Inventory', count: asetCount, color: 'bg-slate-700', icon: Box },
  ];

  return (
    <div className="flex flex-wrap gap-6 mb-12 animate-in fade-in slide-in-from-top-6 duration-1000">
      {stats.map((s, i) => <StatBox key={i} {...s} />)}
    </div>
  );
};
