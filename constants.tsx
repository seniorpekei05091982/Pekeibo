
import React from 'react';
import { 
  LayoutDashboard, Users, Calendar, Handshake, UsersRound, Star, Wallet, Box, 
  Settings, LogOut, UserPlus, BookOpen, Droplets, Heart, MessageCircle, 
  Skull, UserCheck, Briefcase, PieChart, Database, Church, ShieldCheck, 
  MapPin, Layers, Map, Landmark, Building2, ClipboardCheck, FileBarChart
} from 'lucide-react';
import { NavItem } from './types';

export const SIDEBAR_MENU: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard Pusat', icon: <LayoutDashboard size={18} /> },

  { id: 'h1', label: 'I. STRUKTUR ORGANISASI', isHeader: true },
  { id: 'master-klasis', label: 'Daftar Klasis', icon: <Map size={18} />, minRole: 'Sinode' },
  { id: 'master-jemaat-lokal', label: 'Jemaat Lokal', icon: <Church size={18} /> },

  { id: 'h2', label: 'II. SUMBER DAYA MANUSIA', isHeader: true },
  { id: 'jemaat', label: 'Database Anggota', icon: <Users size={18} /> },
  { id: 'talenta', label: 'Manajemen Talenta', icon: <Star size={18} /> },
  { id: 'pejabat-pelayanan', label: 'Pejabat & Jabatan', icon: <UserCheck size={18} /> },
  { id: 'pastoral', label: 'Pelayanan Pastoral', icon: <Handshake size={18} />,
    children: [
      { id: 'penyerahan', label: 'Penyerahan Anak', icon: <UserPlus size={14} /> },
      { id: 'katekisasi', label: 'Katekisasi', icon: <BookOpen size={14} /> },
      { id: 'baptisan', label: 'Baptisan Air', icon: <Droplets size={14} /> },
      { id: 'kedukaan', label: 'Kedukaan', icon: <Skull size={14} /> },
    ]
  },

  { id: 'h3', label: 'III. ADMINISTRASI & ASET', isHeader: true },
  { id: 'keuangan', label: 'Keuangan Jemaat', icon: <Wallet size={18} /> },
  { id: 'aset', label: 'Aset Inventaris', icon: <Box size={18} /> },
  { id: 'jadwal', label: 'Jadwal Ibadah', icon: <Calendar size={18} /> },

  { id: 'h4', label: 'IV. EKOSISTEM PELAYANAN', isHeader: true },
  { id: 'unit-pelayanan', label: 'Unit Pelayanan', icon: <Star size={18} /> },
  { id: 'lembaga-afiliasi', label: 'Lembaga Afiliasi', icon: <Landmark size={18} /> },

  { id: 'h5', label: 'PUSAT LAPORAN & SISTEM', isHeader: true },
  { id: 'laporan-pusat', label: 'Laporan Utama', icon: <FileBarChart size={18} /> },
  { id: 'users', label: 'Hak Akses User', icon: <ShieldCheck size={18} />, minRole: 'Sinode' },
  { id: 'profile-gereja', label: 'Profil Institusi', icon: <Building2 size={18} /> },
  { id: 'backup', label: 'Cadangkan Data', icon: <Database size={18} />, minRole: 'Sinode' },
  
  { id: 'logout', label: 'KELUAR SISTEM', icon: <LogOut size={18} className="text-rose-500" /> }
];
