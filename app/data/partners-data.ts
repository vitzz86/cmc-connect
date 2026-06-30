import { chunk00 } from "./partner-chunks/chunk00";
import { chunk01 } from "./partner-chunks/chunk01";
import { chunk02 } from "./partner-chunks/chunk02";
import { chunk03 } from "./partner-chunks/chunk03";
import { chunk04 } from "./partner-chunks/chunk04";
import { chunk05 } from "./partner-chunks/chunk05";
import { chunk06 } from "./partner-chunks/chunk06";
import { chunk07 } from "./partner-chunks/chunk07";
import { chunk08 } from "./partner-chunks/chunk08";
import { chunk09 } from "./partner-chunks/chunk09";
import { chunk10 } from "./partner-chunks/chunk10";
import { chunk11 } from "./partner-chunks/chunk11";
import { chunk12 } from "./partner-chunks/chunk12";
import { chunk13 } from "./partner-chunks/chunk13";
import { chunk14 } from "./partner-chunks/chunk14";
import { chunk15 } from "./partner-chunks/chunk15";

export const partnerColumns = ["No","Company","Address","CP","Phone","Email","Website","Product","Brand","Category","Province","Role","SubSector","Keywords","ExportReady","DataQuality","IndustriID","id"] as const;

export const compressedPartnerRows = [
  chunk00,
  chunk01,
  chunk02,
  chunk03,
  chunk04,
  chunk05,
  chunk06,
  chunk07,
  chunk08,
  chunk09,
  chunk10,
  chunk11,
  chunk12,
  chunk13,
  chunk14,
  chunk15
].join("");
