"use client";

import type { Dispatch, SetStateAction } from "react";
import { allCategoryValue, allProvinceValue, categories, categoryCopy, partnerTypeCopy, partnerTypes, provinces } from "../lib/categories";
import type { CompanyProfile, Locale } from "../lib/types";

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  error
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </span>
      <input
        className={`h-12 w-full border bg-white px-4 text-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10 ${
          error ? "border-red-500" : "border-ink/15"
        }`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <p className="mt-2 text-xs font-semibold text-red-600">{error}</p> : null}
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  required,
  error
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </span>
      <textarea
        className={`min-h-24 w-full resize-y border bg-white px-4 py-3 text-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10 ${
          error ? "border-red-500" : "border-ink/15"
        }`}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <p className="mt-2 text-xs font-semibold text-red-600">{error}</p> : null}
    </label>
  );
}

export function IndustrySelect({
  locale,
  label,
  value,
  allLabel,
  onChange,
  required,
  error
}: {
  locale: Locale;
  label: string;
  value: string;
  allLabel: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </span>
      <select
        className={`h-12 w-full border bg-white px-4 text-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10 ${
          error ? "border-red-500" : "border-ink/15"
        }`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value={allCategoryValue}>{allLabel}</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {categoryCopy[category][locale]}
          </option>
        ))}
      </select>
      {error ? <p className="mt-2 text-xs font-semibold text-red-600">{error}</p> : null}
    </label>
  );
}

export function PartnerTypeSelect({
  locale,
  label,
  value,
  placeholder,
  onChange,
  required,
  error
}: {
  locale: Locale;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </span>
      <select
        className={`h-12 w-full border bg-white px-4 text-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10 ${
          error ? "border-red-500" : "border-ink/15"
        }`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">{placeholder}</option>
        {partnerTypes.map((partnerType) => (
          <option key={partnerType} value={partnerType}>
            {partnerTypeCopy[partnerType][locale]}
          </option>
        ))}
      </select>
      {error ? <p className="mt-2 text-xs font-semibold text-red-600">{error}</p> : null}
    </label>
  );
}

export function ProvinceSelect({
  label,
  value,
  allLabel,
  onChange
}: {
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
        <option value={allProvinceValue}>{allLabel}</option>
        {provinces.map((province) => (
          <option key={province} value={province}>
            {province}
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
