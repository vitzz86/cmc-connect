export type Locale = "id" | "en";

export type Partner = {
  id: string;
  Company: string;
  Address: string;
  CP: string;
  Phone: string;
  Email: string;
  Website: string;
  Product: string;
  Brand: string;
  Category: string;
  searchText: string;
};

export type CompanyProfile = {
  companyName: string;
  industry: string;
  product: string;
  needs: string;
  partnerType: string;
  geography: string;
  website: string;
};

export type ExtractedProfile = {
  summary: string;
  category: string;
  products: string[];
  needs: string[];
  keywords: string[];
  confidence: string;
  warnings: string[];
};

export type MatchResult = {
  partner: Partner;
  score: number;
  reasons: string[];
};
