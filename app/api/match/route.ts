import { NextResponse } from "next/server";
import { getCopy } from "../../lib/i18n";
import { findMatches, validateMatchProfile } from "../../lib/matching";
import { getPartners } from "../../lib/partners";
import type { CompanyProfile, ExtractedProfile, Locale } from "../../lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    locale?: Locale;
    profile?: CompanyProfile;
    extracted?: ExtractedProfile | null;
  };

  if (!body.profile) {
    return NextResponse.json({ error: "Incomplete profile." }, { status: 400 });
  }

  const validity = validateMatchProfile(body.profile);
  if (!validity.industry || !validity.product || !validity.partnerType) {
    return NextResponse.json({ error: "Incomplete required fields.", fields: validity }, { status: 400 });
  }

  const t = getCopy(body.locale === "en" ? "en" : "id");
  const matches = findMatches(getPartners(), body.profile, body.extracted || null, {
    category: t.results.reasonCategory,
    subSector: t.results.reasonSubSector,
    partnerType: t.results.reasonPartnerType,
    keyword: t.results.reasonKeyword,
    location: t.results.reasonLocation,
    exportReady: t.results.reasonExport,
    dataQuality: t.results.reasonDataQuality
  });

  return NextResponse.json({ matches });
}
