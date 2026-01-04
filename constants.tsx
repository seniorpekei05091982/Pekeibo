
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
  ClipboardList,
  Layers,
  Map
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
    icon: <LayoutDashboard size={18} />
  },
  {
    id: 'header-sinode',
    label: 'ADMINISTRASI SINODE',
    isHeader: true,
    minRole: 'Sinode'
  },
  {
    id: 'master-klasis',
    label: 'Daftar Klasis',
    icon: <Map size={18} />,
    minRole: 'Sinode'
  },
  {
    id: 'header-klasis',
    label: 'ADMINISTRASI KLASIS',
    isHeader: true,
    minRole: 'Klasis'
  },
  {
    id: 'master-jemaat-lokal',
    label: 'Daftar Jemaat',
    icon: <Church size={18} />,
    minRole: 'Klasis'
  },
  {
    id: 'header-jemaat',
    label: 'DATA JEMAAT LOKAL',
    isHeader: true
  },
  {
    id: 'jemaat',
    label: 'Database Jemaat',
    icon: <Users size={18} />
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
    id: 'jadwal',
    label: 'Jadwal Ibadah',
    icon: <Calendar size={18} />
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
    id: 'header-finance',
    label: 'KEUANGAN & ASET',
    isHeader: true
  },
  {
    id: 'keuangan',
    label: 'Keuangan',
    icon: <Wallet size={18} />
  },
  {
    id: 'aset',
    label: 'Aset Inventaris',
    icon: <Box size={18} />
  },
  {
    id: 'header-settings',
    label: 'PENGATURAN',
    isHeader: true
  },
  {
    id: 'users',
    label: 'Hak Akses & User',
    icon: <ShieldCheck size={18} />
  },
  {
    id: 'profile-gereja',
    label: 'Profil Sinode/Klasis',
    icon: <Layers size={18} />
  },
  {
    id: 'logout',
    label: 'KELUAR SISTEM',
    icon: <LogOut size={18} className="text-rose-500" />
  }
];
