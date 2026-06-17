export const categories = [
  "Manufacturing",
  "Retail & Commerce",
  "Services",
  "Commodities & Export",
  "Healthcare",
  "Finance & Banking",
  "Energy",
  "Technology",
  "Education",
  "Real Estate",
  "Food & Beverage"
] as const;

export type Category = (typeof categories)[number];

export const categoryCopy: Record<Category, { id: string; en: string; cues: string[] }> = {
  Manufacturing: {
    id: "Manufaktur",
    en: "Manufacturing",
    cues: ["manufacturing", "factory", "furniture", "production", "rattan", "industrial", "packaging", "pabrik", "produksi"]
  },
  "Retail & Commerce": {
    id: "Ritel & Perdagangan",
    en: "Retail & Commerce",
    cues: ["retail", "commerce", "fashion", "batik", "store", "marketplace", "trade", "ritel", "perdagangan"]
  },
  Services: {
    id: "Jasa",
    en: "Services",
    cues: ["service", "consulting", "agency", "logistics", "training", "jasa", "layanan", "konsultan"]
  },
  "Commodities & Export": {
    id: "Komoditas & Ekspor",
    en: "Commodities & Export",
    cues: ["export", "commodity", "agriculture", "spice", "pepper", "palm", "ekspor", "komoditas", "pertanian", "rempah"]
  },
  Healthcare: {
    id: "Kesehatan",
    en: "Healthcare",
    cues: ["health", "medical", "herbal", "personal care", "spa", "clinic", "kesehatan", "alkes", "herbal"]
  },
  "Finance & Banking": {
    id: "Keuangan & Perbankan",
    en: "Finance & Banking",
    cues: ["finance", "bank", "payment", "funding", "insurance", "keuangan", "bank", "pendanaan"]
  },
  Energy: {
    id: "Energi",
    en: "Energy",
    cues: ["energy", "biofuel", "bricket", "solar", "palm kernel", "energi", "bahan bakar", "briket"]
  },
  Technology: {
    id: "Teknologi",
    en: "Technology",
    cues: ["technology", "software", "robotic", "machine", "system", "digital", "teknologi", "aplikasi", "mesin"]
  },
  Education: {
    id: "Pendidikan",
    en: "Education",
    cues: ["education", "school", "learning", "course", "robotics", "pendidikan", "sekolah", "pelatihan"]
  },
  "Real Estate": {
    id: "Properti",
    en: "Real Estate",
    cues: ["real estate", "property", "land", "rental", "housing", "properti", "lahan", "sewa"]
  },
  "Food & Beverage": {
    id: "Makanan & Minuman",
    en: "Food & Beverage",
    cues: ["food", "beverage", "coffee", "halal", "snack", "processed food", "makanan", "minuman", "kopi"]
  }
};

export function inferCategory(text: string) {
  const normalized = text.toLowerCase();
  let best: Category = categories[0];
  let bestScore = 0;

  for (const category of categories) {
    const score = categoryCopy[category].cues.reduce((total, cue) => {
      return normalized.includes(cue) ? total + cue.split(" ").length : total;
    }, normalized.includes(category.toLowerCase()) ? 3 : 0);

    if (score > bestScore) {
      best = category;
      bestScore = score;
    }
  }

  return bestScore > 0 ? best : "";
}
