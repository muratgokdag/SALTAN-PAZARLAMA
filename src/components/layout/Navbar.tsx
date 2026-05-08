import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Store } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Hakkımızda", href: "#hakkimizda" },
    { name: "Markalarımız", href: "#markalar" },
    { name: "Ürünler", href: "#urunler" },
    { name: "Referanslar", href: "#referanslar" },
    { name: "İletişim", href: "#iletisim" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-900 text-white p-2 rounded-lg">
              <Store size={24} />
            </div>
            <span className={`text-xl font-bold tracking-tight ${scrolled ? "text-gray-900" : "text-white drop-shadow-md"}`}>
              SALTAN <span className="text-amber-500">PAZARLAMA</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.href.startsWith("/") ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-amber-500 ${
                    scrolled ? "text-gray-600" : "text-white drop-shadow-sm"
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-amber-500 ${
                    scrolled ? "text-gray-600" : "text-white drop-shadow-sm"
                  }`}
                >
                  {link.name}
                </a>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled ? "text-gray-900" : "text-white"}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-4 shadow-xl">
              {navLinks.map((link) => (
                 link.href.startsWith("/") ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-800 hover:text-amber-500 font-medium"
                  >
                    {link.name}
                  </Link>
                 ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-800 hover:text-amber-500 font-medium"
                  >
                    {link.name}
                  </a>
                 )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
