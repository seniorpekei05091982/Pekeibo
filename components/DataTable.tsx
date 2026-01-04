
import React from 'react';
import { Eye, ExternalLink } from 'lucide-react';

interface DataTableProps {
  title: string;
  headers: string[];
  data: any[][];
  onViewDetails?: (rowData: any[]) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ title, headers, data, onViewDetails }) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white">
        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
          {title}
        </h4>
        <button className="text-[10px] text-blue-600 hover:text-blue-700 font-black uppercase tracking-widest flex items-center gap-1 transition-colors">
          Lihat Semua <ExternalLink size={10} />
        </button>
      </div>
      <div className="overflow-x-auto flex-1 scrollbar-thin scrollbar-thumb-slate-200">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-8 py-5 font-black">{h}</th>
              ))}
              {onViewDetails && <th className="px-8 py-5 text-right font-black">Tindakan</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.length > 0 ? data.map((row, i) => (
              <tr key={i} className="hover:bg-blue-50/30 even:bg-slate-50/20 transition-all group">
                {row.map((cell, j) => (
                  <td key={j} className="px-8 py-5 text-xs text-slate-600 font-bold group-hover:text-slate-900 transition-colors uppercase tracking-tight">{cell}</td>
                ))}
                {onViewDetails && (
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => onViewDetails(row)}
                      className="p-3 text-blue-600 hover:bg-blue-600 hover:text-white rounded-2xl transition-all inline-flex items-center gap-2 font-black text-[9px] uppercase tracking-widest shadow-sm bg-white border border-slate-100 group-hover:shadow-lg"
                    >
                      <Eye size={12} /> Detail
                    </button>
                  </td>
                )}
              </tr>
            )) : (
              <tr>
                <td colSpan={headers.length + (onViewDetails ? 1 : 0)} className="px-8 py-24 text-center text-slate-300 italic font-black text-xs uppercase tracking-[0.4em]">
                  Data Belum Tersedia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
