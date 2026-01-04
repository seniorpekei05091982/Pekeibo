
import React from 'react';
import { Eye } from 'lucide-react';

interface DataTableProps {
  title: string;
  headers: string[];
  data: any[][];
  onViewDetails?: (rowData: any[]) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ title, headers, data, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-tight">{title}</h4>
        <button className="text-xs text-blue-600 hover:underline font-semibold">Lihat Semua</button>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-2 border-b border-slate-200">{h}</th>
              ))}
              {onViewDetails && <th className="px-4 py-2 border-b border-slate-200 text-right">Aksi</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-slate-600 font-medium">{cell}</td>
                ))}
                {onViewDetails && (
                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={() => onViewDetails(row)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors inline-flex items-center gap-1 font-semibold"
                      title="Lihat Detail"
                    >
                      <Eye size={14} /> Detail
                    </button>
                  </td>
                )}
              </tr>
            )) : (
              <tr>
                <td colSpan={headers.length + (onViewDetails ? 1 : 0)} className="px-4 py-12 text-center text-slate-400 italic">
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
