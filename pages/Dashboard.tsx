
import React, { useState, useMemo } from 'react';
import { 
  Users, Calendar, List, UsersRound, TrendingUp, Filter, Box, Map, Church, ShieldAlert
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';
import { UserRole } from '../types';

interface DashboardProps {
  onSelectMenu: (id: string) => void;
  jemaatData: any[];
  jadwalData: any[];
  pelayananData: any[];
  asetData: any[];
  keuanganData: any[];
  userRole: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  onSelectMenu, 
  jemaatData, 
  jadwalData, 
  pelayananData, 
  asetData,
  userRole
}) => {
  const stats = useMemo(() => {
    if (userRole === 'Sinode') {
      return [
        { title: 'Total Klasis', value: 12, color: 'blue', icon: <Map size={48} />, menuId: 'master-klasis' },
        { title: 'Total Jemaat', value: 154, color: 'green', icon: <Church size={48} />, menuId: 'master-jemaat-lokal' },
        { title: 'Total Jiwa (Sinode)', value: 12500, color: 'yellow', icon: <Users size={48} />, menuId: 'jemaat' },
        { title: 'User Online', value: 24, color: 'red', icon: <ShieldAlert size={48} />, menuId: 'users' },
      ];
    }
    if (userRole === 'Klasis') {
      return [
        { title: 'Jemaat Wilayah', value: 14, color: 'blue', icon: <Church size={48} />, menuId: 'master-jemaat-lokal' },
        { title: 'Total Jiwa (Klasis)', value: 1250, color: 'green', icon: <Users size={48} />, menuId: 'jemaat' },
        { title: 'Pelayanan Aktif', value: 45, color: 'yellow', icon: <List size={48} />, menuId: 'pelayanan' },
      ];
    }
    return [
      { title: 'Data Jemaat', value: jemaatData.length, color: 'blue', icon: <Users size={48} />, menuId: 'jemaat' },
      { title: 'Jadwal Ibadah', value: jadwalData.length, color: 'green', icon: <Calendar size={48} />, menuId: 'jadwal' },
      { title: 'Daftar Pelayan', value: pelayananData.length, color: 'red', icon: <List size={48} />, menuId: 'pelayanan' },
      { title: 'Aset Gereja', value: asetData.length, color: 'gray', icon: <Box size={48} />, menuId: 'aset' },
    ];
  }, [userRole, jemaatData.length, jadwalData.length, pelayananData.length, asetData.length]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3 uppercase">
           <TrendingUp className="text-blue-600" size={32} /> Beranda {userRole}
        </h1>
        <div className="text-[10px] text-slate-400 font-black bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 uppercase tracking-[0.2em]">
          DASHBOARD TERPADU / {userRole} ACCESS
        </div>
      </div>

      <div className="bg-slate-900 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group border-b-[12px] border-orange-500">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 flex flex-col items-start space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-12 bg-orange-500 rounded-full"></div>
            <span className="text-[11px] font-black text-orange-400 uppercase tracking-[0.4em]">KOMANDO PUSAT SINODE KINGMI PAPUA</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-white leading-none uppercase tracking-tighter">
            Sistem Informasi <br/><span className="text-blue-500 text-4xl md:text-6xl">Satu Data Kingmi</span>
          </h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest max-w-2xl">
            Pusat kendali data dan administrasi gereja dari tingkat Sinode, Klasis, hingga ke Jemaat Lokal di seluruh Tanah Papua.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <StatCard key={idx} {...s} onClick={() => onSelectMenu(s.menuId)} />
        ))}
      </div>

      {userRole === 'Sinode' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <DataTable 
             title="Aktifitas Klasis Terbaru" 
             headers={['Klasis', 'Wilayah', 'Update']} 
             data={[
               ['Abepura', 'Kota Jayapura', '12 Jan 2024'],
               ['Sentani', 'Kab. Jayapura', '11 Jan 2024'],
               ['Wamena', 'Pegunungan Tengah', '10 Jan 2024']
             ]} 
           />
           <DataTable 
             title="Login Terakhir Pengguna" 
             headers={['User', 'Level', 'Waktu']} 
             data={[
               ['admin_abepura', 'Klasis', '5 Menit Lalu'],
               ['pdt_samuel', 'Jemaat', '10 Menit Lalu'],
               ['yunus_kogoya', 'Sinode', 'Sekarang']
             ]} 
           />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
