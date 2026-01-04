
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Handshake, 
  UsersRound, 
  Star, 
  Wallet, 
  Box, 
  Settings, 
  LogOut,
  UserPlus,
  BookOpen,
  Droplets,
  Heart,
  MessageCircle,
  Skull,
  Printer,
  UserCheck,
  Briefcase,
  PieChart,
  Database,
  Church,
  ShieldCheck,
  MapPin,
  ClipboardList
} from 'lucide-react';
import { NavItem } from './types';

export const SIDEBAR_MENU: NavItem[] = [
  {
    id: 'header-main',
    label: 'MENU UTAMA',
    isHeader: true
  },
  {
    id: 'dashboard',
    label: 'Beranda',
    icon: <LayoutDashboard size={18} />,
    path: '/'
  },
  {
    id: 'pastoral',
    label: 'Pelayanan Pastoral',
    icon: <Handshake size={18} />,
    children: [
      { id: 'penyerahan', label: 'Penyerahan Anak', icon: <UserPlus size={14} /> },
      { id: 'katekisasi', label: 'Katekisasi', icon: <BookOpen size={14} /> },
      { id: 'baptisan', label: 'Baptisan Air', icon: <Droplets size={14} /> },
      { id: 'kedukaan', label: 'Kedukaan', icon: <Skull size={14} /> },
      { id: 'konseling', label: 'Konseling', icon: <MessageCircle size={14} /> },
    ]
  },
  {
    id: 'header-master',
    label: 'DATA MASTER',
    isHeader: true
  },
  {
    id: 'jemaat',
    label: 'Data Jemaat',
    icon: <Users size={18} />
  },
  {
    id: 'jadwal',
    label: 'Jadwal Ibadah',
    icon: <Calendar size={18} />
  },
  {
    id: 'pelayanan',
    label: 'Daftar Pelayanan',
    icon: <UserCheck size={18} />
  },
  {
    id: 'komisi',
    label: 'Komisi-Komisi',
    icon: <UsersRound size={18} />,
    children: [
      { id: 'komisi-sm', label: 'Anak & Remaja (SM)', icon: <Star size={14} /> },
      { id: 'komisi-pemuda', label: 'Pemuda', icon: <Users size={14} /> },
      { id: 'komisi-perkawan', label: 'Perempuan (Perkawan)', icon: <Heart size={14} /> },
      { id: 'komisi-perkarya', label: 'Laki-laki (Perkarya)', icon: <Briefcase size={14} /> },
    ]
  },
  {
    id: 'talenta',
    label: 'Bakat & Talenta',
    icon: <Star size={18} />
  },
  {
    id: 'keuangan',
    label: 'Keuangan Gereja',
    icon: <Wallet size={18} />
  },
  {
    id: 'aset',
    label: 'Inventaris Aset',
    icon: <Box size={18} />
  },
  {
    id: 'header-laporan',
    label: 'LAPORAN & STATISTIK',
    isHeader: true
  },
  {
    id: 'laporan-jemaat',
    label: 'Laporan Jemaat',
    icon: <PieChart size={18} />,
    children: [
      { id: 'lap-ultah', label: 'Ulang Tahun', icon: <Calendar size={14} /> },
      { id: 'lap-usia', label: 'Kategori Usia', icon: <PieChart size={14} /> },
      { id: 'lap-usia-filter', label: 'Filter Usia Kustom', icon: <ClipboardList size={14} /> },
      { id: 'lap-jk', label: 'Jenis Kelamin', icon: <Users size={14} /> },
      { id: 'lap-pelayanan', label: 'Aktif Pelayanan', icon: <UserCheck size={14} /> },
    ]
  },
  {
    id: 'cetak-jemaat',
    label: 'Cetak Kartu Jemaat',
    icon: <Printer size={18} />
  },
  {
    id: 'header-settings',
    label: 'PENGATURAN',
    isHeader: true
  },
  {
    id: 'users-man',
    label: 'Manajemen User',
    icon: <Settings size={18} />,
    children: [
      { id: 'users', label: 'Daftar Pengguna', icon: <Users size={14} /> },
      { id: 'profile-user', label: 'Profil Saya', icon: <Settings size={14} /> },
    ]
  },
  {
    id: 'backup',
    label: 'Cadangkan Data (Backup)',
    icon: <Database size={18} />
  },
  {
    id: 'profile-gereja',
    label: 'Profil Gereja',
    icon: <Church size={18} />
  },
  {
    id: 'logout',
    label: 'KELUAR SISTEM',
    icon: <LogOut size={18} className="text-rose-500" />,
    path: '/logout'
  }
];
