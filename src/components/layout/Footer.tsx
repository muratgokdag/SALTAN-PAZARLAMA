import { Store, Phone, MapPin, Mail } from "lucide-react";
import { useContentStore } from "../../store/useContentStore";

export function Footer() {
  const { content } = useContentStore();
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-amber-500 text-gray-900 p-2 rounded-lg">
                <Store size={24} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                SALTAN <span className="text-amber-500">PAZARLAMA</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {content.heroDescription.substring(0, 150)}...
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Hızlı Bağlantılar</h3>
            <ul className="space-y-3">
              <li><a href="#hakkimizda" className="hover:text-amber-500 transition-colors">Hakkımızda</a></li>
              <li><a href="#markalar" className="hover:text-amber-500 transition-colors">Markalarımız</a></li>
              <li><a href="#urunler" className="hover:text-amber-500 transition-colors">Ürünlerimiz</a></li>
              <li><a href="#referanslar" className="hover:text-amber-500 transition-colors">Referanslarımız</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-amber-500 shrink-0 mt-1" size={20} />
                <span>{(content.contactAddress || "").split(',').map((line, i) => <span key={i}>{line}<br/></span>)}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-amber-500 shrink-0" size={20} />
                <a href={`tel:${(content.contactPhone || "").replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {content.contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-amber-500 shrink-0" size={20} />
                <a href={`mailto:${content.contactEmail}`} className="hover:text-white transition-colors">
                  {content.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Saltan Pazarlama. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
