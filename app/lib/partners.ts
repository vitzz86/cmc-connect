import { gunzipSync } from "node:zlib";
import { compressedPartnerRows, partnerColumns } from "../data/partners-data";
import type { Partner } from "./types";

type PartnerColumn = (typeof partnerColumns)[number];
type PackedPartner = Record<PartnerColumn, string | number>;

let partnerCache: Partner[] | null = null;

function normalizeText(parts: Array<string | number | undefined | null>) {
  return parts
    .filter((part) => part !== undefined && part !== null && String(part).trim())
    .join(" ")
    .toLowerCase();
}

function hydratePartner(row: Array<string | number>): Partner {
  const packed = partnerColumns.reduce((record, column, index) => {
    record[column] = row[index] ?? "";
    return record;
  }, {} as PackedPartner);

  const matchTags = [
    packed.Category,
    packed.SubSector,
    packed.Role,
    packed.Province,
    packed.Keywords
  ]
    .filter(Boolean)
    .join(" | ");

  const partner = {
    ...packed,
    DataQuality: Number(packed.DataQuality || 0),
    MatchTags: matchTags,
    searchText: ""
  } as Partner;

  partner.searchText = normalizeText([
    partner.Company,
    partner.Address,
    partner.Product,
    partner.Brand,
    partner.Category,
    partner.IndustriID,
    partner.Province,
    partner.Role,
    partner.SubSector,
    partner.Keywords,
    partner.MatchTags
  ]);

  return partner;
}

export function getPartners() {
  if (!partnerCache) {
    const packed = JSON.parse(gunzipSync(Buffer.from(compressedPartnerRows, "base64")).toString("utf8")) as {
      rows: Array<Array<string | number>>;
    };

    partnerCache = packed.rows.map(hydratePartner);
  }

  return partnerCache;
}
