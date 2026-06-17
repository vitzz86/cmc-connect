import type { Locale } from "./types";

export const copy = {
  id: {
    nav: {
      how: "Cara Kerja",
      matches: "Matches",
      database: "Database",
      start: "Mulai Matchmaking"
    },
    steps: {
      profile: "Profil",
      processing: "Processing",
      matches: "Matches",
      detail: "Detail",
      database: "Database"
    },
    hero: {
      eyebrow: "Powered by CEO Masterclass x Kadin Indonesia",
      title: "Temukan partner dan supplier yang tepat untuk mempercepat bisnismu.",
      body: "CMC Connect membaca profil perusahaan dan deck kamu, lalu mencocokkan kebutuhan bisnis dengan database partner, supplier, dan pelaku industri dari ekosistem CMC.",
      primary: "Cari Partner Sekarang",
      secondary: "Lihat Database",
      statOne: "219",
      statOneLabel: "partner terkurasi",
      statTwo: "11",
      statTwoLabel: "industri utama",
      statThree: "Top 5",
      statThreeLabel: "rekomendasi prioritas"
    },
    form: {
      title: "Profil Perusahaan",
      subtitle: "Isi manual atau unggah deck agar AI membantu merangkum profilmu.",
      companyName: "Nama perusahaan",
      industry: "Industri",
      product: "Produk / layanan utama",
      needs: "Kebutuhan partner atau supplier",
      partnerType: "Tipe partner yang dicari",
      geography: "Area / lokasi prioritas",
      website: "Website",
      upload: "Upload deck",
      uploadHelp: "PDF atau PPTX dengan teks yang bisa dibaca.",
      extract: "Ekstrak dengan DeepSeek",
      matching: "Cari Match",
      reset: "Reset",
      placeholderCompany: "Contoh: PT Champion Nusantara",
      placeholderProduct: "Contoh: kopi premium, software inventory, jasa ekspor",
      placeholderNeeds: "Contoh: distributor nasional, supplier packaging, strategic partner",
      placeholderPartner: "Contoh: supplier, distributor, reseller, investor partner",
      placeholderGeo: "Contoh: Jabodetabek, Jawa Timur, Indonesia"
    },
    extraction: {
      title: "Review Hasil AI",
      body: "Edit ringkasan ini sebelum menjalankan matching.",
      summary: "Ringkasan",
      products: "Produk",
      needs: "Kebutuhan",
      keywords: "Kata kunci",
      confidence: "Confidence",
      warnings: "Catatan",
      empty: "Belum ada hasil ekstraksi."
    },
    results: {
      title: "Top 5 Partner / Supplier Matches",
      subtitle: "Skor dihitung dari kecocokan industri, produk, kebutuhan, lokasi, dan kata kunci deck.",
      noResults: "Isi profil perusahaan untuk melihat rekomendasi.",
      score: "Skor",
      viewDetail: "Lihat Detail",
      back: "Kembali",
      reasonCategory: "Kategori industri selaras",
      reasonKeyword: "Kata kunci bisnis cocok",
      reasonNeed: "Kebutuhan dan produk saling relevan",
      reasonLocation: "Lokasi/alamat relevan",
      contact: "Kontak",
      product: "Produk",
      brand: "Brand",
      address: "Alamat"
    },
    processing: {
      title: "Sedang memproses profilmu",
      body: "CMC Connect membaca input, menormalisasi industri, dan menghitung kecocokan terbaik dari database partner.",
      deck: "Mengekstrak deck dengan DeepSeek",
      matching: "Mencocokkan dengan database CMC",
      ranking: "Menyusun top 5 rekomendasi"
    },
    detail: {
      title: "Detail Match",
      adminTitle: "Ingin dihubungkan?",
      adminBody: "Hubungi admin CMC untuk meminta intro resmi ke partner ini. Untuk menjangkau partner lain di database, admin juga akan membantu proses kurasi dan follow-up.",
      adminCta: "Contact Admin",
      browseMore: "Lihat database lainnya"
    },
    database: {
      title: "Database Partner & Supplier",
      subtitle: "Jelajahi seluruh database dan filter berdasarkan industri.",
      search: "Cari perusahaan, produk, brand, atau lokasi",
      category: "Kategori",
      all: "Semua kategori",
      showing: "Menampilkan",
      of: "dari",
      entries: "partner"
    },
    status: {
      extracting: "Membaca deck dan mengekstrak profil...",
      missingKey: "DEEPSEEK_API_KEY belum tersedia. Kamu tetap bisa memakai form manual.",
      extractFailed: "Ekstraksi gagal. Coba file lain atau lanjut dengan form manual.",
      unsupported: "Format belum didukung. Gunakan PDF atau PPTX."
    }
  },
  en: {
    nav: {
      how: "How It Works",
      matches: "Matches",
      database: "Database",
      start: "Start Matching"
    },
    steps: {
      profile: "Profile",
      processing: "Processing",
      matches: "Matches",
      detail: "Detail",
      database: "Database"
    },
    hero: {
      eyebrow: "Powered by CEO Masterclass x Kadin Indonesia",
      title: "Find the right partners and suppliers to accelerate your business.",
      body: "CMC Connect reads your company profile and deck, then matches your needs with partners, suppliers, and industry players from the CMC ecosystem.",
      primary: "Find Partners",
      secondary: "Browse Database",
      statOne: "219",
      statOneLabel: "curated partners",
      statTwo: "11",
      statTwoLabel: "core industries",
      statThree: "Top 5",
      statThreeLabel: "priority recommendations"
    },
    form: {
      title: "Company Profile",
      subtitle: "Complete the form manually or upload a deck so AI can summarize your profile.",
      companyName: "Company name",
      industry: "Industry",
      product: "Main product / service",
      needs: "Partner or supplier needs",
      partnerType: "Partner type",
      geography: "Priority area / location",
      website: "Website",
      upload: "Upload deck",
      uploadHelp: "PDF or PPTX with readable text.",
      extract: "Extract with DeepSeek",
      matching: "Find Matches",
      reset: "Reset",
      placeholderCompany: "Example: PT Champion Nusantara",
      placeholderProduct: "Example: premium coffee, inventory software, export service",
      placeholderNeeds: "Example: national distributor, packaging supplier, strategic partner",
      placeholderPartner: "Example: supplier, distributor, reseller, investor partner",
      placeholderGeo: "Example: Greater Jakarta, East Java, Indonesia"
    },
    extraction: {
      title: "Review AI Extraction",
      body: "Edit this summary before running the match.",
      summary: "Summary",
      products: "Products",
      needs: "Needs",
      keywords: "Keywords",
      confidence: "Confidence",
      warnings: "Notes",
      empty: "No extraction result yet."
    },
    results: {
      title: "Top 5 Partner / Supplier Matches",
      subtitle: "Scores are based on industry, product, needs, location, and deck keyword fit.",
      noResults: "Complete your company profile to see recommendations.",
      score: "Score",
      viewDetail: "View Detail",
      back: "Back",
      reasonCategory: "Aligned industry category",
      reasonKeyword: "Matching business keywords",
      reasonNeed: "Needs and products are relevant",
      reasonLocation: "Relevant location/address",
      contact: "Contact",
      product: "Product",
      brand: "Brand",
      address: "Address"
    },
    processing: {
      title: "Processing your profile",
      body: "CMC Connect reads your inputs, normalizes the industry, and scores the strongest fits from the partner database.",
      deck: "Extracting deck with DeepSeek",
      matching: "Matching against the CMC database",
      ranking: "Ranking the top 5 recommendations"
    },
    detail: {
      title: "Match Detail",
      adminTitle: "Want an introduction?",
      adminBody: "Contact the CMC admin to request an official intro to this partner. To reach other partners in the database, admin will also support curation and follow-up.",
      adminCta: "Contact Admin",
      browseMore: "Browse other database entries"
    },
    database: {
      title: "Partner & Supplier Database",
      subtitle: "Browse the full database and filter by industry.",
      search: "Search company, product, brand, or location",
      category: "Category",
      all: "All categories",
      showing: "Showing",
      of: "of",
      entries: "partners"
    },
    status: {
      extracting: "Reading the deck and extracting profile...",
      missingKey: "DEEPSEEK_API_KEY is not configured. You can still use the manual form.",
      extractFailed: "Extraction failed. Try another file or continue with the manual form.",
      unsupported: "Unsupported format. Use PDF or PPTX."
    }
  }
} as const;

export function getCopy(locale: Locale) {
  return copy[locale];
}
