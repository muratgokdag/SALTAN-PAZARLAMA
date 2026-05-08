import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import * as LucideIcons from "lucide-react";
import { 
  Building2, Users, ShieldCheck, Target, Award,
  Package, Lightbulb, PawPrint, Battery, Box, Bug, ChevronRight, Phone, Store, ShoppingBag, ShoppingCart, Coffee, CheckCircle2, Loader2
} from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useContentStore } from "../store/useContentStore";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function HomePage() {
  const { content } = useContentStore();
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!content.heroImages || content.heroImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % content.heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [content.heroImages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => {
      setFormState("success");
      setTimeout(() => setFormState("idle"), 5000);
    }, 1500);
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-amber-200">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-amber-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
        
        {/* Animated Background Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 0.4, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 1.5 },
                scale: { duration: 10, ease: "linear" } 
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={content.heroImages?.[currentImageIndex] || "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a71?q=80&w=2070&auto=format&fit=crop"} 
                alt="Hero Background" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/60 to-gray-900 z-10"></div>
        </div>

        <motion.div 
          style={{ y: heroY, opacity: opacityHero }}
          className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-amber-300 text-sm font-semibold tracking-wider mb-6 backdrop-blur-md">
              {content.heroBadge || "Düzce & Çevresi"}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              {content.heroTitle} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 drop-shadow-sm">
                {content.heroSubtitle}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow-md">
              {content.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#urunler" className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold rounded-full transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                Ürünleri İncele <ChevronRight size={20} />
              </a>
              <a href="#iletisim" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold border border-white/30 rounded-full transition-all flex items-center justify-center backdrop-blur-sm">
                İletişime Geç
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 cursor-pointer"
          onClick={() => document.getElementById("hakkimizda")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-gray-300 text-xs uppercase tracking-widest mb-2 font-medium">Aşağı Kaydır</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-1"
          >
            <div className="w-1.5 h-2 bg-amber-400 rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT SECTION (Mission, Vision, Quality) */}
      <section id="hakkimizda" className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Blob */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-50 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm mb-4 block">Hakkımızda</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Neden Biz?</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Düzce ve çevresinde yılların getirdiği tecrübe ile en kaliteli gıda ve ihtiyaç maddelerini işletmenize güvenle ulaştırıyoruz. Geniş dağıtım ağımız ve müşteri odaklı vizyonumuzla, hızlı ve kesintisiz hizmetin garantisiyiz.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
                  <div className="text-sm text-gray-500 font-medium tracking-wide">Yıllık Tecrübe</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
                  <div className="text-sm text-gray-500 font-medium tracking-wide">Güvenilir Marka</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="space-y-6"
            >
            {[
              {
                title: "Misyonumuz",
                icon: <Target className="w-8 h-8 text-amber-500" />,
                desc: content.aboutMission
              },
              {
                title: "Vizyonumuz",
                icon: <Users className="w-8 h-8 text-amber-500" />,
                desc: content.aboutVision
              },
              {
                title: "Kalite Politikamız",
                icon: <Award className="w-8 h-8 text-amber-500" />,
                desc: content.aboutQuality
              }
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeIn} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-300 relative overflow-hidden group flex gap-6 items-start">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-150 duration-500">
                  {item.icon}
                </div>
                <div className="bg-amber-50/50 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* BRANDS SECTION */}
      <section id="markalar" className="py-20 bg-gray-900 text-white overflow-hidden border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <motion.h2 
             initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
             className="text-2xl font-semibold text-gray-400 tracking-wider uppercase text-sm"
          >
            Güvenilir İş Ortaklarımız & Bayiliklerimiz
          </motion.h2>
        </div>
          
        <div className="relative flex overflow-hidden group">
          {/* Fading Edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            className="flex gap-8 whitespace-nowrap pl-8"
            style={{ width: "fit-content" }}
          >
            {/* Double the array for seamless infinite scroll */}
            {([...(content.brands || []), ...(content.brands || [])]).map((brand, index) => (
              <div 
                key={`${brand.id}-${index}`}
                className="w-[280px] h-36 flex-shrink-0 flex items-center justify-center p-6 bg-white rounded-2xl border border-white/10 hover:border-amber-400 transition-all group shadow-xl"
                title={brand.name}
              >
                <img 
                  src={brand.src || `https://placehold.co/400x200/ffffff/f59e0b?text=${brand.name}`}
                  alt={`${brand.name} Logo`} 
                  className="w-full h-full object-contain filter grayscale opacity-70 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/400x200/ffffff/ef4444?text=Error`; }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="urunler" className="py-24 bg-white relative">
         {/* Decorative background element */}
         <div className="absolute top-0 left-0 w-full h-1/2 bg-gray-50 rounded-b-[100px] -z-10"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ürün Kategorilerimiz</h2>
                <div className="w-24 h-1 bg-amber-500 rounded-full"></div>
              </motion.div>
            </div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(content.products || []).map((category, i) => {
                const IconComponent = LucideIcons[category.iconName as keyof typeof LucideIcons] as any || LucideIcons.Box;
                return (
                <motion.div 
                  key={i} 
                  variants={fadeIn}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-amber-400 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all text-amber-500">
                    <ChevronRight size={24} />
                  </div>
                  <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">{category.name}</h3>
                  <p className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">{category.desc}</p>
                </motion.div>
                );
              })}
            </motion.div>
         </div>
      </section>

      {/* REFERENCES SECTION */}
      <section id="referanslar" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Referanslarımız</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
              Bölgedeki yüzlerce işletmenin güvenilir toptan tedarikçisi olmaktan gurur duyuyoruz.
            </p>
          </motion.div>

          <motion.div
             initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
             variants={staggerContainer}
             className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70"
          >
             {(content.references || []).map((ref, idx) => {
                const IconComponent = LucideIcons[ref.iconName as keyof typeof LucideIcons] as any || LucideIcons.Building2;
                return (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-gray-50 border border-gray-200 px-6 py-8 rounded-xl w-full flex flex-col items-center justify-center hover:bg-white hover:shadow-xl hover:border-amber-300 hover:text-amber-500 transition-all cursor-default grayscale hover:grayscale-0 shadow-sm text-gray-500 group"
                >
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 mb-2" />
                  </div>
                  <span className="font-bold text-sm sm:text-base text-center mt-2 group-hover:text-gray-900 transition-colors">{ref.name}</span>
                </motion.div>
                );
             })}
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="iletisim" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">İletişime Geçin</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Sipariş vermek, bayiliklerimiz hakkında bilgi almak veya genel sorularınız için bize ulaşın. Size en kısa sürede dönüş yapacağız.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Merkez Ofis</h4>
                    <p className="text-gray-600 text-sm">{(content.contactAddress || "").split(',').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Telefon</h4>
                    <a href={`tel:${content.contactPhone.replace(/\s+/g, '')}`} className="text-blue-600 hover:underline text-sm">{content.contactPhone}</a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Adınız</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all hover:border-amber-300 bg-gray-50 focus:bg-white" placeholder="Ahmet Yılmaz" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Telefon</label>
                    <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all hover:border-amber-300 bg-gray-50 focus:bg-white" placeholder="05XX XXX XX XX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">E-Posta</label>
                  <input required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all hover:border-amber-300 bg-gray-50 focus:bg-white" placeholder={content.contactEmail} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Mesajınız</label>
                  <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none hover:border-amber-300 bg-gray-50 focus:bg-white" placeholder="Nasıl yardımcı olabiliriz?"></textarea>
                </div>
                <button 
                  disabled={formState !== "idle"}
                  className="w-full py-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formState === "submitting" ? (
                    <><Loader2 className="animate-spin" size={20} /> Gönderiliyor...</>
                  ) : formState === "success" ? (
                    <><CheckCircle2 className="text-amber-400" size={20} /> Mesajınız İletildi</>
                  ) : (
                    "Mesaj Gönder"
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 w-full h-[450px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative group"
          >
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193322.99615591322!2d31.026131332812497!3d40.83548549999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409d705c9cdbb6e3%3A0xe655f2425cbce169!2zRMO8emNl!5e0!3m2!1str!2str!4v1715086021671!5m2!1str!2str" 
               width="100%" 
               height="100%" 
               style={{border: 0}} 
               allowFullScreen={true} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Google Maps Location"
               className="grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
             ></iframe>
             <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
          </motion.div>
        </div>
      </section>

      {/* WHATSAPP BUTTON */}
      <a 
        href={`https://wa.me/${content.contactPhone.replace(/[\s+]/g, '')}`} 
        target="_blank" 
        rel="noopener noreferrer"
        title="WhatsApp'tan Yazın"
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/30 hover:-translate-y-1 transition-all z-[90]"
      >
        <span className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20"></span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-8 h-8 relative z-10">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 413.6c-33.1 0-65.5-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.3l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.4-186.6 184.4zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      </a>

      <Footer />
    </div>
  );
}
