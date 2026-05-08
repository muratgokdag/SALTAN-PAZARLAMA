import { motion } from "motion/react";
import { Package, TrendingUp, Users, AlertCircle, ShoppingCart } from "lucide-react";
import { useDataStore } from "../../store/useDataStore";

export default function Dashboard() {
  const { products, customers } = useDataStore();

  const activeDealers = customers.filter(c => c.type === 'dealer' && c.status === 'active').length;
  const totalProducts = products.length;
  
  // Simulated stats based on real data length
  const stats = [
    { title: "Toplam Ürün", value: totalProducts.toString(), change: "+12", icon: <Package size={24} />, color: "bg-blue-100 text-blue-600" },
    { title: "Aktif Bayiler", value: activeDealers.toString(), change: "+3", icon: <Users size={24} />, color: "bg-amber-100 text-amber-600" },
    { title: "Aylık Sipariş", value: "1,204", change: "+18%", icon: <ShoppingCart size={24} />, color: "bg-emerald-100 text-emerald-600" },
    { title: "Aylık Ciro", value: "₺450.2K", change: "+8%", icon: <TrendingUp size={24} />, color: "bg-purple-100 text-purple-600" },
  ];

  const lowStockProducts = products.filter(p => p.stock < 20);
  const recentProducts = [...products].reverse().slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Özeti</h1>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 text-sm font-medium">
          Rapor İndir
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-sm font-medium text-emerald-500 bg-emerald-50 px-2 flex py-1 rounded-md">
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Orders Overview placeholder */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Son Siparişler</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">Sipariş No</th>
                  <th className="pb-3 font-medium">Müşteri/Bayi</th>
                  <th className="pb-3 font-medium">Tutar</th>
                  <th className="pb-3 font-medium">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { id: "#ORD-001", client: "Merkez Market", total: "₺4,500", status: "Tamamlandı", statusColor: "bg-emerald-100 text-emerald-700" },
                  { id: "#ORD-002", client: "Yıldız Kırtasiye", total: "₺1,250", status: "Hazırlanıyor", statusColor: "bg-amber-100 text-amber-700" },
                  { id: "#ORD-003", client: "Düzce Petshop", total: "₺8,900", status: "Kargoda", statusColor: "bg-blue-100 text-blue-700" },
                  { id: "#ORD-004", client: "Yeni Mahalle Bakkalı", total: "₺850", status: "İptal", statusColor: "bg-red-100 text-red-700" },
                ].map((order, i) => (
                  <tr key={i}>
                    <td className="py-3 font-medium text-gray-900">{order.id}</td>
                    <td className="py-3 text-gray-600">{order.client}</td>
                    <td className="py-3 font-medium">{order.total}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Sistem Uyarıları</h2>
          <div className="space-y-4">
            {lowStockProducts.map(p => (
              <div key={`low-stock-${p.id}`} className="flex gap-3 items-start p-3 bg-amber-50 rounded-xl">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="text-sm font-medium text-amber-900">Stok Uyarısı</h4>
                  <p className="text-xs text-amber-700 mt-1">{p.name} stok seviyesi kritik düzeyde ({p.stock} adet kaldı).</p>
                </div>
              </div>
            ))}
            {recentProducts.slice(0, 1).map(p => (
              <div key={`new-product-${p.id}`} className="flex gap-3 items-start p-3 bg-blue-50 rounded-xl">
                <Package className="text-blue-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">En Son Eklenen Ürün</h4>
                  <p className="text-xs text-blue-700 mt-1">Sisteme yeni ürün eklendi: {p.name}</p>
                </div>
              </div>
            ))}
            {lowStockProducts.length === 0 && recentProducts.length === 0 && (
              <p className="text-sm text-gray-500">Sistem uyarısı bulunmamaktadır.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
