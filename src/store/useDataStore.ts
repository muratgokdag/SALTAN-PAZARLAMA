import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'dealer' | 'customer';
  status: 'active' | 'inactive';
  registrationDate: string;
}

interface DataState {
  products: Product[];
  customers: Customer[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Elvan Çikolata (Sütlü)', sku: 'ELV-001', price: 15, stock: 12, category: 'Çikolata', status: 'active' },
  { id: '2', name: 'Haribo Altın Ayıcık', sku: 'HRB-001', price: 25, stock: 145, category: 'Jelibon', status: 'active' },
  { id: '3', name: 'Toybox Sürpriz Kutu', sku: 'TYB-001', price: 35, stock: 80, category: 'Oyuncaklı', status: 'active' },
  { id: '4', name: 'Eti Burçak', sku: 'ETI-001', price: 10, stock: 300, category: 'Bisküvi', status: 'active' },
];

const mockCustomers: Customer[] = [
  { id: '1', name: 'Merkez Market', email: 'info@merkezmarket.com', phone: '0555 123 4567', type: 'customer', status: 'active', registrationDate: '2025-10-15' },
  { id: '2', name: 'Yıldız Kırtasiye', email: 'yildiz@gmail.com', phone: '0555 987 6543', type: 'customer', status: 'active', registrationDate: '2025-11-20' },
  { id: '3', name: 'Düzce Petshop', email: 'pet@duzce.com', phone: '0532 532 5353', type: 'customer', status: 'inactive', registrationDate: '2026-01-05' },
  { id: '4', name: 'Bölge Bayi Ltd.', email: 'bayi@bolge.com', phone: '0544 444 4444', type: 'dealer', status: 'active', registrationDate: '2025-08-10' },
];

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      products: mockProducts,
      customers: mockCustomers,
      addProduct: (p) => set((state) => ({ products: [...state.products, { ...p, id: Math.random().toString(36).substring(2, 9) }] })),
      updateProduct: (id, p) => set((state) => ({ products: state.products.map(prod => prod.id === id ? { ...prod, ...p } : prod) })),
      deleteProduct: (id) => set((state) => ({ products: state.products.filter(prod => prod.id !== id) })),
      addCustomer: (c) => set((state) => ({ customers: [...state.customers, { ...c, id: Math.random().toString(36).substring(2, 9) }] })),
      updateCustomer: (id, c) => set((state) => ({ customers: state.customers.map(cust => cust.id === id ? { ...cust, ...c } : cust) })),
      deleteCustomer: (id) => set((state) => ({ customers: state.customers.filter(cust => cust.id !== id) })),
    }),
    {
      name: 'admin-data-storage',
    }
  )
);
