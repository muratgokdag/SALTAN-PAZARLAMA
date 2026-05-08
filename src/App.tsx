import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import SiteSettings from "./pages/admin/SiteSettings";
import Login from "./pages/admin/Login";
import Products from "./pages/admin/Products";
import Customers from "./pages/admin/Customers";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />
        
        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<SiteSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
