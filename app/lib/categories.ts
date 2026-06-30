import taxonomy from "../data/taxonomy.json";

export const allCategoryValue = "Semua kategori";
export const allProvinceValue = "Semua";

export const categories = taxonomy.categories;

export type Category = (typeof categories)[number];

export const categoryCopy = taxonomy.categoryLabels as Record<string, { id: string; en: string }>;

const categoryCues: Record<string, string[]> = {
  Manufaktur: ["manufacturing", "factory", "furniture", "production", "rattan", "industrial", "packaging", "pabrik", "produksi"],
  "Ritel & Perdagangan": ["retail", "commerce", "fashion", "batik", "store", "marketplace", "trade", "ritel", "perdagangan"],
  Jasa: ["service", "consulting", "agency", "logistics", "training", "jasa", "layanan", "konsultan"],
  "Komoditas & Ekspor": ["export", "commodity", "agriculture", "spice", "pepper", "palm", "ekspor", "komoditas", "pertanian", "rempah"],
  Kesehatan: ["health", "medical", "herbal", "personal care", "spa", "clinic", "kesehatan", "alkes", "herbal"],
  "Keuangan & Perbankan": ["finance", "bank", "payment", "funding", "insurance", "keuangan", "bank", "pendanaan"],
  Energi: ["energy", "biofuel", "bricket", "solar", "palm kernel", "energi", "bahan bakar", "briket"],
  Teknologi: ["technology", "software", "robotic", "machine", "system", "digital", "teknologi", "aplikasi", "mesin"],
  Pendidikan: ["education", "school", "learning", "course", "robotics", "pendidikan", "sekolah", "pelatihan"],
  Properti: ["real estate", "property", "land", "rental", "housing", "properti", "lahan", "sewa"],
  "Makanan & Minuman": ["food", "beverage", "coffee", "halal", "snack", "processed food", "makanan", "minuman", "kopi"]
};

export const partnerTypes = taxonomy.partnerTypes;
export const partnerTypeCopy = taxonomy.partnerTypeLabels as Record<string, { id: string; en: string }>;
export const provinces = taxonomy.provinces;
export const roleIntentMatrix = taxonomy.roleIntentMatrix as Record<string, Record<string, number>>;
export const scoreWeights = taxonomy.weights;

export function inferCategory(text: string) {
  const normalized = text.toLowerCase();
  let best: string = categories[0];
  let bestScore = 0;

  for (const category of categories) {
    const score = (categoryCues[category] || []).reduce((total, cue) => {
      return normalized.includes(cue) ? total + cue.split(" ").length : total;
    }, normalized.includes(category.toLowerCase()) || normalized.includes((categoryCopy[category]?.en || "").toLowerCase()) ? 3 : 0);

    if (score > bestScore) {
      best = category;
      bestScore = score;
    }
  }

  return bestScore > 0 ? best : "";
}
