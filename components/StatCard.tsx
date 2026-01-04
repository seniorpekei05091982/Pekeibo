
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, color, icon }) => {
  const colorMap: Record<string, string> = {
    gray: 'bg-slate-500',
    green: 'bg-emerald-500',
    red: 'bg-rose-500',
    yellow: 'bg-amber-500',
    teal: 'bg-teal-500',
    blue: 'bg-sky-500',
    slate: 'bg-slate-400',
    pink: 'bg-pink-500',
  };

  const selectedColor = colorMap[color] || 'bg-blue-500';

  return (
    <div className={`${selectedColor} text-white rounded shadow-sm overflow-hidden flex flex-col relative`}>
      <div className="p-5 flex justify-between items-start">
        <div className="z-10">
          <h3 className="text-4xl font-bold mb-1">{value}</h3>
          <p className="text-sm font-medium opacity-90">{title}</p>
        </div>
        <div className="absolute top-2 right-2 opacity-20 transform scale-150">
          {icon}
        </div>
      </div>
      <button className="bg-black/10 hover:bg-black/20 w-full py-1 text-xs font-medium flex items-center justify-center gap-2 transition-colors">
        More info <ArrowRight size={14} />
      </button>
    </div>
  );
};
