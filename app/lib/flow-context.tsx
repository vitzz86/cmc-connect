"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { getCopy } from "./i18n";
import { emptyProfile } from "./matching";
import type { CompanyProfile, ExtractedProfile, Locale, MatchResult } from "./types";

type FlowContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof getCopy>;
  profile: CompanyProfile;
  setProfile: Dispatch<SetStateAction<CompanyProfile>>;
  deck: File | null;
  setDeck: Dispatch<SetStateAction<File | null>>;
  extracted: ExtractedProfile | null;
  setExtracted: Dispatch<SetStateAction<ExtractedProfile | null>>;
  matches: MatchResult[];
  setMatches: Dispatch<SetStateAction<MatchResult[]>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  resetFlow: () => void;
};

const FlowContext = createContext<FlowContextValue | null>(null);

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const value = window.sessionStorage.getItem(key) || window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function FlowProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");
  const [profile, setProfile] = useState<CompanyProfile>(emptyProfile());
  const [deck, setDeck] = useState<File | null>(null);
  const [extracted, setExtracted] = useState<ExtractedProfile | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("cmc-locale");
    if (storedLocale === "id" || storedLocale === "en") setLocaleState(storedLocale);
    setProfile(readStored("cmc-profile", emptyProfile()));
    setExtracted(readStored("cmc-extracted", null));
    setMatches(readStored("cmc-matches", []));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("cmc-profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (extracted) window.sessionStorage.setItem("cmc-extracted", JSON.stringify(extracted));
  }, [extracted]);

  useEffect(() => {
    window.sessionStorage.setItem("cmc-matches", JSON.stringify(matches));
  }, [matches]);

  function setLocale(next: Locale) {
    setLocaleState(next);
    window.localStorage.setItem("cmc-locale", next);
    document.documentElement.lang = next;
  }

  function resetFlow() {
    setProfile(emptyProfile());
    setDeck(null);
    setExtracted(null);
    setMatches([]);
    setStatus("");
    window.sessionStorage.removeItem("cmc-profile");
    window.sessionStorage.removeItem("cmc-extracted");
    window.sessionStorage.removeItem("cmc-matches");
  }

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: getCopy(locale),
      profile,
      setProfile,
      deck,
      setDeck,
      extracted,
      setExtracted,
      matches,
      setMatches,
      status,
      setStatus,
      resetFlow
    }),
    [locale, profile, deck, extracted, matches, status]
  );

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow() {
  const context = useContext(FlowContext);
  if (!context) throw new Error("useFlow must be used within FlowProvider");
  return context;
}
