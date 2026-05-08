import React, { useState } from "react";
import { Save, Image as ImageIcon, Type, Link as LinkIcon, Trash2, Plus } from "lucide-react";
import { useContentStore } from "../../store/useContentStore";

export default function SiteSettings() {
  const { content, updateContent, updateBrand, updateProduct, updateReference } = useContentStore();
  const [activeTab, setActiveTab] = useState<"general" | "about" | "brands" | "products" | "references">("general");

  const [formData, setFormData] = useState({
    heroBadge: content.heroBadge || "Düzce & Çevresi",
    heroTitle: content.heroTitle,
    heroSubtitle: content.heroSubtitle,
    heroDescription: content.heroDescription,
    aboutMission: content.aboutMission,
    aboutVision: content.aboutVision,
    aboutQuality: content.aboutQuality,
    contactAddress: content.contactAddress,
    contactPhone: content.contactPhone,
    contactEmail: content.contactEmail,
    heroImages: content.heroImages || [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateContent(formData);
    alert("Değişiklikler başarıyla kaydedildi!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Site İçerik Yönetimi</h1>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-amber-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-amber-400 font-bold shadow-sm transition-colors"
        >
          <Save size={20} />
          Kaydet
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab("general")}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "general" ? "border-b-2 border-amber-500 text-amber-600" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            Ana Sayfa & İletişim
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "about" ? "border-b-2 border-amber-500 text-amber-600" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            Hakkımızda Metinleri
          </button>
          <button
            onClick={() => setActiveTab("brands")}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "brands" ? "border-b-2 border-amber-500 text-amber-600" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            Markalar & Logolar
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "products" ? "border-b-2 border-amber-500 text-amber-600" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            Ürün Kategorileri
          </button>
          <button
            onClick={() => setActiveTab("references")}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "references" ? "border-b-2 border-amber-500 text-amber-600" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            Referanslar
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8">
          {activeTab === "general" && (
            <div className="space-y-8 max-w-3xl">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Type size={20} className="text-blue-500" />
                  Hero (Üst) Bölümü
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Küçük Başlık (Badge)</label>
                    <input 
                      type="text" name="heroBadge" value={formData.heroBadge} onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ana Başlık</label>
                    <input 
                      type="text" name="heroTitle" value={formData.heroTitle} onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık (Vurgulu)</label>
                    <input 
                      type="text" name="heroSubtitle" value={formData.heroSubtitle} onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama Metni</label>
                    <textarea 
                      name="heroDescription" rows={3} value={formData.heroDescription} onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none resize-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Arka Plan Görselleri (Görseller sırayla değişecektir)</label>
                    <div className="space-y-3">
                      {formData.heroImages.map((img, index) => (
                        <div key={index} className="flex gap-2">
                          <input 
                            type="text" 
                            value={img} 
                            onChange={(e) => {
                              const newImages = [...formData.heroImages];
                              newImages[index] = e.target.value;
                              setFormData({ ...formData, heroImages: newImages });
                            }}
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" 
                            placeholder="Görsel Linki (URL)"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              const newImages = formData.heroImages.filter((_, i) => i !== index);
                              setFormData({ ...formData, heroImages: newImages });
                            }}
                            className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                      <button 
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, heroImages: [...formData.heroImages, ""] });
                        }}
                        className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium"
                      >
                        <Plus size={16} /> Yeni Görsel Ekle
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <LinkIcon size={20} className="text-emerald-500" />
                  İletişim Bilgileri
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                    <input 
                      type="text" name="contactAddress" value={formData.contactAddress} onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefon Numarası</label>
                      <input 
                        type="text" name="contactPhone" value={formData.contactPhone} onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-Posta</label>
                      <input 
                        type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">Misyonumuz</label>
                <textarea 
                  name="aboutMission" rows={4} value={formData.aboutMission} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none resize-none bg-gray-50" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">Vizyonumuz</label>
                <textarea 
                  name="aboutVision" rows={4} value={formData.aboutVision} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none resize-none bg-gray-50" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">Kalite Politikamız</label>
                <textarea 
                  name="aboutQuality" rows={4} value={formData.aboutQuality} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none resize-none bg-gray-50" 
                />
              </div>
            </div>
          )}

          {activeTab === "brands" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600 text-sm">Markalarınızın isimlerini ve logo resim bağlantılarını buradan güncelleyebilirsiniz.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(content.brands || []).map((brand) => (
                  <div key={brand.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                    <div className="flex items-center justify-center h-32 bg-gray-800 rounded-lg mb-4 overflow-hidden pattern-dots">
                       <img src={brand.src} alt={brand.name} className="max-h-24 max-w-[80%] object-contain" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x200/ffffff/ef4444?text=Error'; }} />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Marka Adı</label>
                        <input 
                          type="text" value={brand.name} 
                          onChange={(e) => updateBrand(brand.id, { name: e.target.value })}
                          className="w-full px-3 py-1.5 text-sm rounded border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1 flex justify-between">
                          <span>Logo Görsel Linki (URL)</span>
                        </label>
                        <div className="flex gap-2">
                          <input 
                            type="text" value={brand.src} 
                            onChange={(e) => updateBrand(brand.id, { src: e.target.value })}
                            className="flex-1 px-3 py-1.5 text-sm rounded border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" 
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600 text-sm">Ürün kategorilerini ve ikonlarını (Lucide ikon isimleri) güncelleyebilirsiniz.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(content.products || []).map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
                     <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Kategori Adı</label>
                        <input 
                          type="text" value={product.name} 
                          onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                          className="w-full px-3 py-1.5 text-sm rounded border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Açıklama</label>
                        <input 
                          type="text" value={product.desc} 
                          onChange={(e) => updateProduct(product.id, { desc: e.target.value })}
                          className="w-full px-3 py-1.5 text-sm rounded border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">İkon (Lucide adı örn: Package)</label>
                        <input 
                          type="text" value={product.iconName} 
                          onChange={(e) => updateProduct(product.id, { iconName: e.target.value })}
                          className="w-full px-3 py-1.5 text-sm rounded border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" 
                        />
                      </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "references" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600 text-sm">Referansları ve ikonlarını güncelleyebilirsiniz.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(content.references || []).map((reference) => (
                  <div key={reference.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
                     <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Referans Adı</label>
                        <input 
                          type="text" value={reference.name} 
                          onChange={(e) => updateReference(reference.id, { name: e.target.value })}
                          className="w-full px-3 py-1.5 text-sm rounded border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">İkon Adı</label>
                        <input 
                          type="text" value={reference.iconName} 
                          onChange={(e) => updateReference(reference.id, { iconName: e.target.value })}
                          className="w-full px-3 py-1.5 text-sm rounded border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" 
                        />
                      </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
