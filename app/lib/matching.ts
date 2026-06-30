import { allCategoryValue, allProvinceValue, categories, roleIntentMatrix, scoreWeights } from "./categories";
import type { CompanyProfile, ExtractedProfile, MatchResult, Partner } from "./types";

const stopWords = new Set([
  "and",
  "atau",
  "dan",
  "the",
  "for",
  "with",
  "yang",
  "untuk",
  "dengan",
  "produk",
  "product",
  "service",
  "layanan",
  "partner",
  "supplier",
  "perusahaan",
  "company",
  "find",
  "cari"
]);

function tokenize(text: string) {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s&/]/g, " ")
        .split(/[\s,/]+/)
        .map((token) => token.trim())
        .filter((token) => token.length > 2 && !stopWords.has(token))
    )
  );
}

function keywordFit(tokens: string[], text: string) {
  if (!tokens.length) return { score: 0, matches: [] as string[] };
  const haystack = text.toLowerCase();
  const matches = tokens.filter((token) => haystack.includes(token));
  const denominator = Math.min(Math.max(tokens.length, 1), 5);

  return {
    score: Math.min(1, matches.length / denominator),
    matches: matches.slice(0, 5)
  };
}

function isNeutralCategory(value: string) {
  return !value || value === allCategoryValue;
}

function isNeutralProvince(value: string) {
  return !value || value === allProvinceValue;
}

export function validateMatchProfile(profile: CompanyProfile) {
  return {
    partnerType: Boolean(profile.partnerType),
    industry: Boolean(profile.industry),
    product: Boolean(profile.product.trim())
  };
}

export function isMatchProfileValid(profile: CompanyProfile) {
  const validity = validateMatchProfile(profile);
  return validity.partnerType && validity.industry && validity.product;
}

export function buildProfileText(profile: CompanyProfile, extracted?: ExtractedProfile | null) {
  return [
    profile.companyName,
    profile.industry,
    profile.product,
    profile.needs,
    profile.partnerType,
    profile.geography,
    extracted?.summary,
    extracted?.category,
    extracted?.products?.join(" "),
    extracted?.needs?.join(" "),
    extracted?.keywords?.join(" ")
  ]
    .filter(Boolean)
    .join(" ");
}

export function findMatches(
  partners: Partner[],
  profile: CompanyProfile,
  extracted: ExtractedProfile | null,
  reasonLabels: {
    category: string;
    subSector: string;
    partnerType: string;
    keyword: string;
    location: string;
    exportReady: string;
    dataQuality: string;
  }
): MatchResult[] {
  const productTokens = tokenize(`${profile.product} ${extracted?.products?.join(" ") || ""}`);
  const contextTokens = tokenize(buildProfileText(profile, extracted));

  return partners
    .map((partner) => {
      const partnerText = [
        partner.Company,
        partner.Product,
        partner.Brand,
        partner.Category,
        partner.IndustriID,
        partner.Province,
        partner.Role,
        partner.SubSector,
        partner.Keywords,
        partner.MatchTags
      ].join(" ");

      const categoryScore = isNeutralCategory(profile.industry) ? 0 : partner.IndustriID === profile.industry ? 1 : 0;
      const subSector = keywordFit(productTokens, partner.SubSector || "");
      const keyword = keywordFit(contextTokens, partnerText);
      const partnerTypeScore = roleIntentMatrix[partner.Role]?.[profile.partnerType] || 0;
      const locationScore = isNeutralProvince(profile.geography) ? 0 : partner.Province === profile.geography ? 1 : 0;
      const exportScore = partner.ExportReady === "Yes" ? 1 : 0;
      const qualityScore = Math.max(0, Math.min(1, Number(partner.DataQuality || 0) / 100));

      const score =
        categoryScore * scoreWeights.category +
        subSector.score * scoreWeights.subSector +
        partnerTypeScore * scoreWeights.partnerType +
        locationScore * scoreWeights.location +
        keyword.score * scoreWeights.keywords +
        exportScore * scoreWeights.exportReady +
        qualityScore * scoreWeights.dataQuality;

      const reasons = new Set<string>();
      if (partnerTypeScore >= 1) reasons.add(reasonLabels.partnerType);
      if (categoryScore) reasons.add(reasonLabels.category);
      if (subSector.score > 0) reasons.add(reasonLabels.subSector);
      if (keyword.matches.length) reasons.add(`${reasonLabels.keyword}: ${keyword.matches.join(", ")}`);
      if (locationScore) reasons.add(reasonLabels.location);
      if (exportScore) reasons.add(reasonLabels.exportReady);
      if (qualityScore >= 0.9) reasons.add(reasonLabels.dataQuality);

      return {
        partner,
        score: Math.round(score),
        reasons: Array.from(reasons).slice(0, 4),
        signals: {
          category: categoryScore,
          subSector: subSector.score,
          partnerType: partnerTypeScore,
          location: locationScore,
          keywords: keyword.score,
          exportReady: exportScore,
          dataQuality: qualityScore
        }
      };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => {
      return (
        b.score - a.score ||
        (b.signals?.dataQuality || 0) - (a.signals?.dataQuality || 0) ||
        a.partner.Company.localeCompare(b.partner.Company)
      );
    })
    .slice(0, 5);
}

export function emptyProfile(): CompanyProfile {
  return {
    companyName: "",
    industry: allCategoryValue,
    product: "",
    needs: "",
    partnerType: "",
    geography: allProvinceValue,
    website: ""
  };
}

export function emptyExtraction(): ExtractedProfile {
  return {
    summary: "",
    category: "",
    products: [],
    needs: [],
    keywords: [],
    confidence: "",
    warnings: []
  };
}

export { categories };
