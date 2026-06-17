"use client";

import type { Dispatch, SetStateAction } from "react";
import { categories, categoryCopy } from "../lib/categories";
import type { CompanyProfile, Locale } from "../lib/types";

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink">{label}</span>
      <input
        className="h-12 w-full border border-ink/15 bg-white px-4 text-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink">{label}</span>
      <textarea
        className="min-h-24 w-full resize-y border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function IndustrySelect({
  locale,
  label,
  value,
  allLabel,
  onChange
}: {
  locale: Locale;
  label: string;
  value: string;
  allLabel: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink">{label}</span>
      <select
        className="h-12 w-full border border-ink/15 bg-white px-4 text-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">{allLabel}</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {categoryCopy[category][locale]}
          </option>
        ))}
      </select>
    </label>
  );
}

export function updateProfileField(
  setProfile: Dispatch<SetStateAction<CompanyProfile>>,
  key: keyof CompanyProfile,
  value: string
) {
  setProfile((current) => ({ ...current, [key]: value }));
}
