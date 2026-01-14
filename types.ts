
import React from 'react';

export type UserRole = 'Sinode' | 'Klasis' | 'Jemaat';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  path?: string;
  isHeader?: boolean;
  minRole?: UserRole;
}

export interface KlasisData {
  id: string;
  namaKlasis: string;
  wilayah: string;
  koordinator: string;
  alamat: string;
  kontak: string;
  legalitas?: string;
}

export interface JemaatLokalData {
  id: string;
  klasisId: string;
  namaJemaat: string;
  gembala: string;
  alamat: string;
  tahunBerdiri: string;
  jumlahAset?: number;
}

export interface AnggotaJemaatData {
  id: string;
  nik: string;
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: 'Laki-Laki' | 'Perempuan';
  pendidikan: string;
  pekerjaan: string;
  statusKeluarga: string;
  noKK: string;
  rayon: string;
}

export interface PejabatData {
  id: string;
  namaPejabat: string;
  jabatan: string; // Gembala, Ketua Majelis, Vikaris, dll
  periode: string;
  noSK: string;
  wilayahTugas: string;
}

export interface AfiliasiData {
  id: string;
  namaLembaga: string;
  jenis: 'Yayasan' | 'STT' | 'Kesehatan' | 'LSM';
  pimpinan: string;
  alamat: string;
}

export interface StatBox {
  id: string;
  title: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}
