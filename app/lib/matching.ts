import { categories, inferCategory } from "./categories";
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
  "company"
]);

function tokenize(text: string) {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s&]/g, " ")
        .split(/\s+/)
        .map((token) => token.trim())
        .filter((token) => token.length > 2 && !stopWords.has(token))
    )
  );
}

function overlapScore(tokens: string[], text: string, weight: number) {
  if (!tokens.length) return { score: 0, matches: [] as string[] };
  const haystack = text.toLowerCase();
  const matches = tokens.filter((token) => haystack.includes(token));
  return {
    score: Math.min(weight, matches.length * Math.max(4, Math.round(weight / 5))),
    matches: matches.slice(0, 5)
  };
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
    keyword: string;
    need: string;
    location: string;
  }
): MatchResult[] {
  const profileText = buildProfileText(profile, extracted);
  const inferred = inferCategory(profile.industry || extracted?.category || profileText);
  const category = categories.find((item) => item === profile.industry) || inferred;
  const keywordTokens = tokenize(profileText);
  const needTokens = tokenize(`${profile.needs} ${profile.partnerType} ${extracted?.needs?.join(" ") || ""}`);
  const locationTokens = tokenize(profile.geography);

  return partners
    .map((partner) => {
      let score = 0;
      const reasons = new Set<string>();
      const partnerText = `${partner.Company} ${partner.Category} ${partner.Product} ${partner.Brand} ${partner.Address}`;

      if (category && partner.Category === category) {
        score += 38;
        reasons.add(reasonLabels.category);
      }

      const keyword = overlapScore(keywordTokens, partnerText, 34);
      score += keyword.score;
      if (keyword.matches.length) reasons.add(`${reasonLabels.keyword}: ${keyword.matches.join(", ")}`);

      const need = overlapScore(needTokens, `${partner.Product} ${partner.Brand} ${partner.Category}`, 18);
      score += need.score;
      if (need.matches.length) reasons.add(reasonLabels.need);

      const location = overlapScore(locationTokens, partner.Address, 10);
      score += location.score;
      if (location.matches.length) reasons.add(reasonLabels.location);

      return {
        partner,
        score: Math.min(100, score),
        reasons: Array.from(reasons).slice(0, 3)
      };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.partner.Company.localeCompare(b.partner.Company))
    .slice(0, 5);
}

export function emptyProfile(): CompanyProfile {
  return {
    companyName: "",
    industry: "",
    product: "",
    needs: "",
    partnerType: "",
    geography: "",
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
