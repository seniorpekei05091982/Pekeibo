
import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  path?: string;
  isHeader?: boolean;
}

export interface StatBox {
  id: string;
  title: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}

export interface SummaryTable {
  id: string;
  title: string;
  headers: string[];
  rows: any[][];
}
