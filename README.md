# CMC Connect

CMC Connect is a bilingual Indonesian/English matchmaking demo for CEO Masterclass participants. Users can fill a company profile, upload a PDF/PPTX deck for profile summarization, and review the top five partner/supplier matches from the supplied database.

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add the configured extraction key to `.env.local`:

```bash
DEEPSEEK_API_KEY=...
```

Then open `http://127.0.0.1:3000`.

## What Is Included

- Bilingual UI toggle: Bahasa Indonesia and English.
- Static partner database generated from the Excel attachment.
- Top 5 matching engine based on category, needs, keywords, product fit, and location.
- Deck extraction API route for PDF/PPTX files.
- CEO Masterclass and Kadin logo treatment inspired by the supplied PDF.
