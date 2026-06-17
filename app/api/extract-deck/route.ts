import { NextResponse } from "next/server";
import OpenAI from "openai";
import JSZip from "jszip";
import pdfParse from "pdf-parse";
import { categories } from "@/app/lib/categories";
import type { ExtractedProfile } from "@/app/lib/types";

export const runtime = "nodejs";

async function extractPdf(buffer: Buffer) {
  const parsed = await pdfParse(buffer);
  return parsed.text;
}

async function extractPptx(buffer: Buffer) {
  const zip = await JSZip.loadAsync(buffer);
  const slideFiles = Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const chunks = await Promise.all(
    slideFiles.map(async (name) => {
      const xml = await zip.files[name].async("text");
      return xml
        .replace(/<a:br\/>/g, "\n")
        .replace(/<[^>]+>/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/\s+/g, " ")
        .trim();
    })
  );

  return chunks.join("\n");
}

function normalizeExtraction(value: Partial<ExtractedProfile>): ExtractedProfile {
  return {
    summary: String(value.summary || ""),
    category: String(value.category || ""),
    products: Array.isArray(value.products) ? value.products.map(String).slice(0, 8) : [],
    needs: Array.isArray(value.needs) ? value.needs.map(String).slice(0, 8) : [],
    keywords: Array.isArray(value.keywords) ? value.keywords.map(String).slice(0, 16) : [],
    confidence: String(value.confidence || "medium"),
    warnings: Array.isArray(value.warnings) ? value.warnings.map(String).slice(0, 5) : []
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("deck");
    const context = String(formData.get("context") || "");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No deck file provided." }, { status: 400 });
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json({ error: "DEEPSEEK_API_KEY is not configured." }, { status: 500 });
    }

    const fileName = file.name.toLowerCase();
    const buffer = Buffer.from(await file.arrayBuffer());
    let deckText = "";

    if (fileName.endsWith(".pdf")) {
      deckText = await extractPdf(buffer);
    } else if (fileName.endsWith(".pptx")) {
      deckText = await extractPptx(buffer);
    } else {
      return NextResponse.json({ error: "Unsupported file format." }, { status: 415 });
    }

    deckText = deckText.replace(/\s+/g, " ").trim().slice(0, 18000);

    if (!deckText) {
      return NextResponse.json({ error: "No readable text found in deck." }, { status: 422 });
    }

    const client = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: "https://api.deepseek.com"
    });

    const completion = await client.chat.completions.create({
      model: "deepseek-v4-flash",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You extract company matchmaking profiles from business decks. Return strict json only. Use bilingual-friendly concise wording. The category must be one of: ${categories.join(", ")}. JSON shape: {"summary":"", "category":"", "products":[], "needs":[], "keywords":[], "confidence":"low|medium|high", "warnings":[]}.`
        },
        {
          role: "user",
          content: `Manual form context:\n${context || "-"}\n\nDeck text:\n${deckText}`
        }
      ],
      max_tokens: 1400,
      temperature: 0.2
    });

    const content = completion.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(content) as Partial<ExtractedProfile>;

    return NextResponse.json(normalizeExtraction(parsed));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Extraction failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
