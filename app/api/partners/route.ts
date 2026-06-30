import { NextResponse } from "next/server";
import { getPartners } from "../../lib/partners";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const partners = getPartners();

  if (id) {
    return NextResponse.json({ partner: partners.find((partner) => partner.id === id) || null });
  }

  return NextResponse.json({ partners });
}
