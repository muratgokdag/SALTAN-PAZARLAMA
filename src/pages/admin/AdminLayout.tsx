import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Package, Users, Settings, LogOut, 
  Store, Menu, X, Bell
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Ürün Yönetimi", href: "/admin/products", icon: <Package size={20} /> },
    { name: "Müşteriler & Bayiler", href: "/admin/customers", icon: <Users size={20} /> },
    { name: "Ayarlar", href: "/admin/settings", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-blue-900 text-white w-64 transform transition-transform duration-300 z-30 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-blue-800">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <div className="bg-amber-500 text-blue-900 p-1.5 rounded text-sm">
                <Store size={18} />
              </div>
              <span className="text-white">SALTAN <span className="text-amber-500">PANEL</span></span>
            </Link>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? "bg-blue-800 text-amber-400 font-medium" 
                      : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-blue-800 space-y-2">
            <Link to="/" className="flex items-center gap-3 px-4 py-3 text-blue-200 hover:text-white transition-colors rounded-xl hover:bg-blue-800/50">
               Siteye Dön
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:text-white hover:bg-red-500/20 transition-colors rounded-xl">
              <LogOut size={20} />
              Çıkış Yap
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 z-20">
          <button 
            className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="ml-auto flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                A
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin Kullanıcısı</span>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
