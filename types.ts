
import React from 'react';

export type UserRole = 'Sinode' | 'Klasis' | 'Jemaat';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  path?: string;
  isHeader?: boolean;
  minRole?: UserRole; // Role minimal untuk melihat menu ini
}

export interface KlasisData {
  id: string;
  namaKlasis: string;
  wilayah: string;
  ketuaKlasis: string;
  alamat: string;
  kontak: string;
}

export interface JemaatLokalData {
  id: string;
  klasisId: string;
  namaJemaat: string;
  gembala: string;
  alamat: string;
  nomerTelepon: string;
}

export interface StatBox {
  id: string;
  title: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}
