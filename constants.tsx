
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
  FileText, 
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
  PieChart
} from 'lucide-react';
import { NavItem } from './types';

export const SIDEBAR_MENU: NavItem[] = [
  {
    id: 'header-main',
    label: 'MAIN MENU',
    isHeader: true
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
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
    label: 'MASTER DATA',
    isHeader: true
  },
  {
    id: 'jemaat',
    label: 'Jemaat',
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
    label: 'Komisi',
    icon: <UsersRound size={18} />,
    children: [
      { id: 'komisi-sm', label: 'Pelayanan Anak & Remaja (SM)' },
      { id: 'komisi-pemuda', label: 'Pelayanan Pemuda' },
      { id: 'komisi-perkawan', label: 'Pelayanan Perempuan (Perkawan)' },
      { id: 'komisi-perkarya', label: 'Pelayanan Laki-laki (Perkarya)' },
    ]
  },
  {
    id: 'talenta',
    label: 'Talenta',
    icon: <Star size={18} />
  },
  {
    id: 'keuangan',
    label: 'Keuangan',
    icon: <Wallet size={18} />
  },
  {
    id: 'aset',
    label: 'Aset',
    icon: <Box size={18} />
  },
  {
    id: 'header-laporan',
    label: 'LAPORAN',
    isHeader: true
  },
  {
    id: 'laporan-jemaat',
    label: 'Laporan Jemaat',
    icon: <PieChart size={18} />,
    children: [
      { id: 'lap-ultah', label: 'Ulang Tahun' },
      { id: 'lap-usia', label: 'Usia' },
      { id: 'lap-usia-filter', label: 'Usia (Filter)' },
      { id: 'lap-jk', label: 'Jenis Kelamin' },
      { id: 'lap-ibadah', label: 'Ibadah' },
      { id: 'lap-pelayanan', label: 'Pelayanan' },
      { id: 'lap-talenta', label: 'Talenta' },
      { id: 'lap-keluarga', label: 'Keluarga' },
    ]
  },
  {
    id: 'laporan-komisi',
    label: 'Laporan Komisi',
    icon: <UsersRound size={18} />,
    children: [
      { id: 'lap-komisi-sm', label: 'Pelayanan Anak & Remaja' },
      { id: 'lap-komisi-pemuda', label: 'Pelayanan Pemuda' },
      { id: 'lap-komisi-perkawan', label: 'Pelayanan Perempuan' },
      { id: 'lap-komisi-perkarya', label: 'Pelayanan Laki-laki' },
    ]
  },
  {
    id: 'lap-keu-aset',
    label: 'Keuangan & Aset',
    icon: <Briefcase size={18} />,
    children: [
      { id: 'lap-keuangan', label: 'Laporan Keuangan' },
      { id: 'lap-aset', label: 'Laporan Aset' },
    ]
  },
  {
    id: 'cetak-jemaat',
    label: 'Cetak Jemaat',
    icon: <Printer size={18} />
  },
  {
    id: 'header-settings',
    label: 'SETTINGS',
    isHeader: true
  },
  {
    id: 'users-man',
    label: 'Users',
    icon: <Settings size={18} />,
    children: [
      { id: 'users', label: 'Daftar Users' },
      { id: 'profile-user', label: 'Profile User' },
    ]
  },
  {
    id: 'backup',
    label: 'Backup Data',
    icon: <Box size={18} />
  },
  {
    id: 'profile-gereja',
    label: 'Profile Gereja',
    icon: <LayoutDashboard size={18} />
  },
  {
    id: 'logout',
    label: 'LOGOUT',
    icon: <LogOut size={18} />,
    path: '/logout'
  }
];
