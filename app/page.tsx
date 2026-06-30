"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, FileUp, RotateCcw } from "lucide-react";
import { AppHeader } from "./components/AppHeader";
import { Field, IndustrySelect, PartnerTypeSelect, ProvinceSelect, TextArea, updateProfileField } from "./components/FormFields";
import { allCategoryValue } from "./lib/categories";
import { useFlow } from "./lib/flow-context";
import { emptyExtraction, isMatchProfileValid, validateMatchProfile } from "./lib/matching";
import type { ExtractedProfile } from "./lib/types";

export default function Home() {
  const router = useRouter();
  const { locale, t, profile, setProfile, deck, setDeck, setExtracted, status, setStatus, resetFlow } = useFlow();
  const validity = validateMatchProfile(profile);
  const formValid = isMatchProfileValid(profile);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formValid) return;
    router.push("/processing");
  }

  async function handleDeckSelected(file: File | null) {
    setDeck(file);
    if (!file) return;

    setStatus(t.status.extracting);
    const formData = new FormData();
    formData.append("deck", file);
    formData.append("context", JSON.stringify(profile));

    try {
      const response = await fetch("/api/extract-deck", {
        method: "POST",
        body: formData
      });
      const payload = await response.json();

      if (!response.ok) {
        setStatus(payload.code === "extraction_setup_missing" ? t.status.missingKey : t.status.extractFailed);
        return;
      }

      const next = { ...emptyExtraction(), ...payload } as ExtractedProfile;
      setExtracted(next);
      setProfile((current) => ({
        ...current,
        industry: !current.industry || current.industry === allCategoryValue ? next.category || current.industry : current.industry,
        product: current.product || next.products.join(", "),
        needs: current.needs || next.needs.join(", ")
      }));
      setStatus("");
    } catch {
      setStatus(t.status.extractFailed);
    }
  }

  return (
    <main className="min-h-screen bg-ivory text-ink">
      <AppHeader minimal />

      <section className="mx-auto grid min-h-[calc(100vh-74px)] max-w-6xl items-center gap-10 px-5 py-10 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-gold">{t.hero.eyebrow}</p>
          <h1 className="font-display text-4xl font-black leading-[1.03] text-balance sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 text-base leading-8 text-ink/68">{t.hero.body}</p>
          <div className="mt-8 border-l-4 border-gold bg-white/70 p-5 text-sm font-semibold leading-7 text-ink/70">
            {locale === "id"
              ? "Isi profil singkat, upload deck jika ada, lalu CMC Connect akan memproses dan menampilkan rekomendasi partner di halaman berikutnya."
              : "Fill a short profile, upload a deck if available, then CMC Connect will process it and show partner recommendations on the next page."}
          </div>
        </div>

        <form className="border border-ink/10 bg-[#fffdf8] p-5 shadow-editorial sm:p-7" onSubmit={submitForm}>
          <div className="mb-6">
            <h2 className="font-display text-3xl font-black">{t.form.title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/58">{t.form.subtitle}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label={t.form.companyName} value={profile.companyName} onChange={(value) => updateProfileField(setProfile, "companyName", value)} placeholder={t.form.placeholderCompany} />
            <IndustrySelect
              locale={locale}
              label={t.form.industry}
              value={profile.industry}
              allLabel={t.database.all}
              onChange={(value) => updateProfileField(setProfile, "industry", value)}
              required
              error={!validity.industry ? t.validation.industry : ""}
            />
            <div className="md:col-span-2">
              <TextArea
                label={t.form.product}
                value={profile.product}
                onChange={(value) => updateProfileField(setProfile, "product", value)}
                placeholder={t.form.placeholderProduct}
                required
                error={!validity.product ? t.validation.product : ""}
              />
            </div>
            <div className="md:col-span-2">
              <TextArea label={t.form.needs} value={profile.needs} onChange={(value) => updateProfileField(setProfile, "needs", value)} placeholder={t.form.placeholderNeeds} />
            </div>
            <PartnerTypeSelect
              locale={locale}
              label={t.form.partnerType}
              value={profile.partnerType}
              placeholder={t.form.placeholderPartner}
              onChange={(value) => updateProfileField(setProfile, "partnerType", value)}
              required
              error={!validity.partnerType ? t.validation.partnerType : ""}
            />
            <ProvinceSelect label={t.form.geography} value={profile.geography} allLabel={locale === "id" ? "Semua" : "All"} onChange={(value) => updateProfileField(setProfile, "geography", value)} />
            <div className="md:col-span-2">
              <Field label={t.form.website} value={profile.website} onChange={(value) => updateProfileField(setProfile, "website", value)} placeholder="https://" />
            </div>
          </div>

          <div className="mt-6 border border-dashed border-ink/20 bg-ivory/70 p-4">
            <label className="flex flex-col gap-3 text-sm font-bold text-ink">
              <span className="flex items-center gap-2">
                <FileUp size={17} />
                {t.form.upload}
              </span>
              <input
                className="block w-full text-sm file:mr-4 file:border-0 file:bg-ink file:px-4 file:py-3 file:text-sm file:font-black file:text-white"
                type="file"
                accept=".pdf,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                onChange={(event) => handleDeckSelected(event.target.files?.[0] || null)}
              />
            </label>
            <p className="mt-2 text-xs font-semibold text-ink/55">{deck ? deck.name : t.form.uploadHelp}</p>
            {status ? <p className="mt-3 text-xs font-semibold text-gold">{status}</p> : null}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              className="inline-flex flex-1 items-center justify-center gap-2 bg-ink px-5 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-45"
              type="submit"
              disabled={!formValid}
            >
              {t.form.matching}
              <ArrowRight size={18} />
            </button>
            <button className="inline-flex items-center justify-center gap-2 border border-ink/15 px-5 py-4 text-sm font-black text-ink/70" type="button" onClick={resetFlow}>
              <RotateCcw size={18} />
              {t.form.reset}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
