
import React, { useMemo } from 'react';
import { 
  Users, TrendingUp, Box, Map, Church, ShieldAlert, BarChart3, PieChart, 
  ChevronRight, Calendar, UserCheck, LayoutPanelLeft, Clock, Heart, Star, Wallet
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';
import { UserRole } from '../types';

interface DashboardProps {
  onSelectMenu: (id: string) => void;
  jemaatData: any[];
  userRole: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectMenu, jemaatData, userRole }) => {
  const stats = useMemo(() => {
    if (userRole === 'Sinode') {
      return [
        { title: 'Total Klasis', value: 12, color: 'blue', icon: <Map size={48} />, menuId: 'master-klasis' },
        { title: 'Jemaat Lokal', value: 154, color: 'green', icon: <Church size={48} />, menuId: 'master-jemaat-lokal' },
        { title: 'Total Jiwa', value: 12500, color: 'yellow', icon: <Users size={48} />, menuId: 'jemaat' },
        { title: 'Aset Sinode', value: 45, color: 'red', icon: <Box size={48} />, menuId: 'aset' },
      ];
    }
    return [
      { title: 'Anggota Jemaat', value: jemaatData.length || 13, color: 'blue', icon: <Users size={48} />, menuId: 'jemaat' },
      { title: 'Kepala Keluarga', value: 120, color: 'green', icon: <BarChart3 size={48} />, menuId: 'jemaat' },
      { title: 'Unit Pelayanan', value: 6, color: 'pink', icon: <Star size={48} />, menuId: 'unit-pelayanan' },
      { title: 'Aset Lokal', value: 12, color: 'gray', icon: <Box size={48} />, menuId: 'aset' },
    ];
  }, [userRole, jemaatData.length]);

  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-700">
      {/* HEADER SECTION WITH VISION BOX */}
      <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between border-l-8 border-orange-500 pl-6 py-2">
        <div className="space-y-2 max-w-2xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Sistem Informasi Manajemen Gereja (SIM_GEREJA)</p>
          <h2 className="text-sm font-black text-slate-500 uppercase tracking-tighter">Selamat Datang di</h2>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-none uppercase">
            GEREJA KEMAH INJIL (KINGMI) <br/>
            <span className="text-blue-600">DI TANAH PAPUA</span>
          </h1>
          <div className="mt-4 inline-flex items-center gap-2 bg-blue-600 px-5 py-2 rounded-full shadow-lg shadow-blue-200">
             <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
             <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">"SATU DATA KINGMI PAPUA"</span>
          </div>
        </div>

        {/* CHURCH VISION BOX */}
        <div className="w-full xl:w-[450px] bg-slate-100 border-2 border-slate-200 rounded-[2.5rem] p-6 relative overflow-hidden group shadow-sm transition-all hover:border-orange-200">
           <div className="absolute -right-4 -bottom-4 text-orange-500/5 rotate-12 transition-transform group-hover:scale-125">
             <Church size={180} />
           </div>
           <div className="relative z-10 text-center">
             <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 italic">Visi Gereja KINGMI:</h4>
             <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight leading-tight">PAPUA DAMAI SEJAHTERA</h3>
             <div className="w-12 h-1 bg-orange-500 mx-auto my-3 rounded-full"></div>
             <p className="text-[11px] font-bold text-slate-600 italic leading-relaxed">
               Penginjilan, Penggembalaan Pendidikan dan Diakonia
             </p>
           </div>
        </div>
      </div>

      {/* STAT CARDS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <StatCard key={idx} {...s} onClick={() => onSelectMenu(s.menuId)} />
        ))}
      </div>

      {/* ADDITIONAL KEY METRICS BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5 shadow-sm hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><UserCheck size={28} /></div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Jemaat Aktif</p>
            <h4 className="text-2xl font-black text-slate-800">12,500 <span className="text-[10px] text-emerald-500 font-bold">+12% Bln ini</span></h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5 shadow-sm hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center"><Heart size={28} /></div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ultah Minggu Ini</p>
            <h4 className="text-2xl font-black text-slate-800">8 <span className="text-[10px] text-slate-400 font-bold italic">Jiwa</span></h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5 shadow-sm hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center"><Wallet size={28} /></div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Saldo Kas Terakhir</p>
            <h4 className="text-lg font-black text-slate-800">Rp 45.250.000</h4>
          </div>
        </div>
      </div>

      {/* VISUAL DASHBOARD SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col md:flex-row gap-10">
              <div className="w-full md:w-56 h-64 bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden flex flex-col justify-between group shadow-2xl">
                 <div className="absolute inset-0 opacity-20 pointer-events-none transform group-hover:scale-110 transition-transform duration-1000">
                   <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"><path fill="#FFF" d="M45,-75.6C59.3,-69.1,72.5,-58.3,80.1,-44.6C87.8,-31,89.8,-14.5,86.1,0.6C82.4,15.7,73.1,29.4,63.1,41C53,52.6,42.2,62,29.8,68.1C17.3,74.2,3.3,76.9,-11.1,75.4C-25.5,73.8,-40.3,68,-51.7,58.8C-63,49.6,-70.8,37.1,-75.4,23.5C-80,10,-81.4,-4.5,-77.3,-17.8C-73.3,-31.1,-63.7,-43.3,-51.9,-50.7C-40.2,-58.1,-26.3,-60.7,-12.8,-68C0.7,-75.4,14.2,-87.5,29.1,-87.4C44,-87.3,60.4,-75,45,-75.6Z" transform="translate(100 100)" /></svg>
                 </div>
                 <div className="relative z-10 flex flex-col gap-1">
                   <span className="text-5xl font-black tracking-tighter">13</span>
                   <p className="text-[11px] font-bold text-slate-400 leading-tight">Jemaat <br/> aktif</p>
                 </div>
                 <div className="relative z-10 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-xl font-bold">1</span>
                       <span className="text-[14px]">🎂</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <p className="text-[10px] font-bold text-slate-300">Berulang tahun <br/> bulan ini</p>
                       <button onClick={() => onSelectMenu('jemaat')} className="bg-white text-slate-900 px-3 py-1 rounded-full text-[9px] font-black uppercase hover:bg-orange-500 hover:text-white transition-colors">Lihat</button>
                    </div>
                 </div>
              </div>

              <div className="flex-1 flex flex-col items-center md:items-start">
                 <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-6">Statistik Jemaat berdasarkan <br/> <span className="text-blue-600">Jenis kelamin</span></h4>
                 <div className="flex items-center gap-8">
                    <div className="w-32 h-32 rounded-full border-[14px] border-blue-500 relative flex items-center justify-center">
                       <div className="absolute inset-0 border-[14px] border-rose-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 0% 0%, 0% 100%, 50% 100%)' }}></div>
                    </div>
                    <div className="space-y-3">
                       <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-blue-500"></div>
                          <span className="text-[10px] font-bold text-slate-600 uppercase">Laki-laki</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-rose-500"></div>
                          <span className="text-[10px] font-bold text-slate-600 uppercase">Perempuan</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-8">Statistik Jemaat berdasarkan <span className="text-blue-600">usia</span></h4>
              <div className="flex items-end justify-between gap-4 h-32 px-4">
                {[
                  { label: '0-5', val: 30, h: '30%' },
                  { label: '6-12', val: 60, h: '85%' },
                  { label: '13-20', val: 20, h: '45%' },
                  { label: '31-50', val: 10, h: '25%' },
                  { label: '51+', val: 10, h: '25%' }
                ].map((age, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                    <div className="w-full bg-blue-50 rounded-t-xl relative overflow-hidden transition-all duration-500 group-hover:bg-blue-100" style={{ height: age.h }}>
                       <div className="absolute bottom-0 left-0 right-0 bg-sky-400 group-hover:bg-blue-500 transition-colors h-full"></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase">{age.label}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Statistik Kehadiran</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Tahun 2025</p>
                 </div>
                 <button className="flex items-center gap-2 px-4 py-2 border border-slate-100 rounded-xl text-[9px] font-black uppercase text-slate-500 hover:bg-slate-50">
                    Pilih Ibadah <ChevronRight size={12} />
                 </button>
              </div>

              <div className="flex-1 py-4 relative">
                 <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
                    <div className="h-px bg-slate-900 w-full"></div>
                    <div className="h-px bg-slate-900 w-full"></div>
                    <div className="h-px bg-slate-900 w-full"></div>
                    <div className="h-px bg-slate-900 w-full"></div>
                 </div>
                 <div className="h-full w-full flex items-end">
                    <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                       <path d="M 0 30 Q 25 35 50 15 T 100 5 L 100 40 L 0 40 Z" fill="rgba(56, 189, 248, 0.1)" />
                       <path d="M 0 30 Q 25 35 50 15 T 100 5" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                       <circle cx="0" cy="30" r="1.5" fill="#0ea5e9" />
                       <circle cx="50" cy="15" r="1.5" fill="#0ea5e9" />
                       <circle cx="100" cy="5" r="1.5" fill="#0ea5e9" />
                    </svg>
                 </div>
                 <div className="flex justify-between mt-4 text-[8px] font-black text-slate-400 uppercase">
                    <span>2025-06-01</span>
                    <span>2025-06-01</span>
                    <span>2025-07-04</span>
                    <span>2025-08-01</span>
                 </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50">
                 <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-4">Ibadah dengan kehadiran terbanyak</h5>
                 <div className="space-y-2">
                    {[
                      { date: '2025-06-06', name: 'Ibadah Raya 1' },
                      { date: '2025-07-04', name: 'Ibadah Raya 1' },
                      { date: '2025-06-02', name: 'Ibadah Raya 1' }
                    ].map((top, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all cursor-pointer">
                         <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 shadow-sm"><UserCheck size={14} /></div>
                         <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight"><span className="text-slate-400">{top.date} -</span> {top.name}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        <div className="space-y-6">
           <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
             <BarChart3 size={18} className="text-blue-600" /> Rekapitulasi Statistik Wilayah
           </h3>
           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
             {[
               { label: 'Klasis Abepura', count: 1250, percent: 85 },
               { label: 'Klasis Sentani', count: 980, percent: 70 },
               { label: 'Klasis Wamena', count: 2100, percent: 95 },
               { label: 'Klasis Nabire', count: 1450, percent: 60 }
             ].map((item, i) => (
               <div key={i} className="space-y-2">
                 <div className="flex justify-between items-end">
                   <span className="text-xs font-black text-slate-700 uppercase">{item.label}</span>
                   <span className="text-[10px] font-bold text-blue-600">{item.count} JIWA</span>
                 </div>
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.percent}%` }}></div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
             <ShieldAlert size={18} className="text-rose-600" /> Log Aktivitas Master Data
           </h3>
           <DataTable 
             title="Update Master Terakhir" 
             headers={['Modul', 'User', 'Waktu']} 
             data={[
               ['Organisasi', 'admin_pusat', '2 Menit Lalu'],
               ['SDM (Anggota)', 'klasis_abe', '15 Menit Lalu'],
               ['Aset & Keuangan', 'jemaat_01', '1 Jam Lalu']
             ]} 
           />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
