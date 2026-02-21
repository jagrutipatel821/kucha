// admin/types.ts

export interface Product {
  _id?: string;
  name: string;
  description: string;
  category: string;
  brand?: string;
  stock: number;
  image?: string;
  featured: boolean;
  status: 'active' | 'inactive';
}

export interface Category {
  _id?: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  productCount: number;
}

export interface Order {
  _id?: string;
  orderNumber: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'pending' | 'approved' | 'blocked';
}

export interface Offer {
  _id?: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  bgColor?: string;
  startDate: string;
  endDate: string;
  active: boolean;
}
