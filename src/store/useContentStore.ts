import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Brand {
  id: string;
  name: string;
  src: string;
}

export interface Product {
  id: string;
  name: string;
  desc: string;
  iconName: string;
}

export interface Reference {
  id: string;
  name: string;
  iconName: string;
}

export interface SiteContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutMission: string;
  aboutVision: string;
  aboutQuality: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  brands: Brand[];
  heroImages: string[];
  products: Product[];
  references: Reference[];
}

interface ContentStore {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  updateBrand: (id: string, brand: Partial<Brand>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  updateReference: (id: string, reference: Partial<Reference>) => void;
}

const defaultContent: SiteContent = {
  heroBadge: "Düzce & Çevresi",
  heroTitle: "Düzce'nin Toptan Gıda ve İhtiyaç",
  heroSubtitle: "Toptancısı",
  heroDescription: "Düzce ve çevre illerdeki işletmeniz için en güvenilir gıda toptancısı. Saltan Pazarlama olarak, taze gıda, atıştırmalık, temizlik ve ambalaj alanında toptan satış ve pazarlama ağı sunarak aradığınız kaliteyi kapınıza getiriyoruz.",
  aboutMission: "Yüksek standartlı ve kaliteli toptan gıda ürünleri sunarak bölgedeki işletmelerin ve perakendecilerin müşteri memnuniyetini en üst düzeye çıkartmak; güvenilir bir Düzce toptancısı olarak sorumluluklarımızı yerine getirmektir.",
  aboutVision: "Düzce genelinde toptan pazarlama sektörüne yön veren, pazarın dinamiklerine hakim bir gıda toptancısı olarak, güven duyulan yenilikçi ve öncü kurumlar arasında yer almak.",
  aboutQuality: "Müşterilerimizin yüksek verim alabilmesi için toptan gıda ve ihyiyaç malzemelerinde dünya standartları düzeyinde ürünler sunmak, dağıtım ile pazarlama ağımızı daima yenilemek ve 'Her şey Kalite için' ilkesiyle toptan hizmet vermektir.",
  contactAddress: "Yeni Mah. Yeni Sokak No:12/C Düzce / Merkez",
  contactPhone: "+90 542 452 81 81",
  contactEmail: "info@saltanpazarlama.com",
  brands: [
    { id: "1", name: "ELVAN", src: "https://placehold.co/400x200/ffffff/f59e0b?text=ELVAN" },
    { id: "2", name: "ATAMER KOLONYA", src: "https://placehold.co/400x200/ffffff/f59e0b?text=ATAMER" },
    { id: "3", name: "ERCİYES", src: "https://placehold.co/400x200/ffffff/f59e0b?text=ERCIYES" },
    { id: "4", name: "ASYEM", src: "https://placehold.co/400x200/ffffff/f59e0b?text=ASYEM" },
    { id: "5", name: "ZİRVE (DİPPO)", src: "https://placehold.co/400x200/ffffff/f59e0b?text=ZIRVE" },
    { id: "6", name: "HARİBO", src: "https://placehold.co/400x200/ffffff/f59e0b?text=HARIBO" },
  ],
  heroImages: [
    "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a71?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1628186175150-136de32bb5eb?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504642445831-2983c5098fc0?q=80&w=2070&auto=format&fit=crop",
  ],
  products: [
    { id: "1", name: "Gıda Ürünleri", iconName: "Package", desc: "Toptan atıştırmalık, şekerleme ve temel gıda." },
    { id: "2", name: "İş Eldivenleri", iconName: "ShieldCheck", desc: "Dayanıklı ve güvenli koruyucu iş eldivenleri." },
    { id: "3", name: "Evcil Hayvan Maması", iconName: "PawPrint", desc: "Kuş, kedi ve köpekler için besleyici mamalar." },
    { id: "4", name: "Elektrik & Aydınlatma", iconName: "Lightbulb", desc: "Uzun ömürlü LED ampüller ve enerji çözümleri." },
    { id: "5", name: "Günlük İhtiyaçlar", iconName: "Battery", desc: "Piller, çakmaklar ve çeşitli market ürünleri." },
    { id: "6", name: "Kırtasiye", iconName: "Box", desc: "Ofis ve okul için toptan kırtasiye malzemeleri." },
    { id: "7", name: "Haşerat İlaçları", iconName: "Bug", desc: "Etkili ve güvenli haşere kontrol çözümleri." },
  ],
  references: [
    { id: "1", name: "Düzce Süpermarket", iconName: "Building2" },
    { id: "2", name: "Akçakoca Toptan", iconName: "Store" },
    { id: "3", name: "Bolu Gıda Pazarı", iconName: "ShoppingBag" },
    { id: "4", name: "Kaynaşlı Marketleri", iconName: "ShoppingCart" },
    { id: "5", name: "Hendek Market", iconName: "Store" },
    { id: "6", name: "Yığılca Büfe", iconName: "Coffee" },
    { id: "7", name: "Gölyaka Tesisleri", iconName: "Building2" },
    { id: "8", name: "Gümüşova Gross", iconName: "ShoppingCart" }
  ]
};

export const useContentStore = create<ContentStore>()(
  persist(
    (set) => ({
      content: defaultContent,
      updateContent: (newContent) =>
        set((state) => ({ content: { ...state.content, ...newContent } })),
      updateBrand: (id, brandUpdate) =>
        set((state) => ({
          content: {
            ...state.content,
            brands: (state.content.brands || []).map((b) =>
              b.id === id ? { ...b, ...brandUpdate } : b
            ),
          },
        })),
      updateProduct: (id, productUpdate) =>
        set((state) => ({
          content: {
            ...state.content,
            products: (state.content.products || []).map((p) =>
              p.id === id ? { ...p, ...productUpdate } : p
            ),
          },
        })),
      updateReference: (id, referenceUpdate) =>
        set((state) => ({
          content: {
            ...state.content,
            references: (state.content.references || []).map((r) =>
              r.id === id ? { ...r, ...referenceUpdate } : r
            ),
          },
        })),
    }),
    {
      name: 'site-content-storage',
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        content: {
          ...currentState.content,
          ...(persistedState?.content || {}),
          products: persistedState?.content?.products || currentState.content.products,
          references: persistedState?.content?.references || currentState.content.references,
          brands: persistedState?.content?.brands || currentState.content.brands,
        }
      }),
    }
  )
);
