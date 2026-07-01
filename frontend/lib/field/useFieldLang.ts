"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import type { Lang } from "../i18n";
import { initialFieldLang } from "./initialFieldLang";

/** Field pages — lang switch is non-urgent (keeps INP low on LangNav). */
export function useFieldLang(): [Lang, (next: Lang) => void] {
  const [lang, setLangState] = useState<Lang>(() => initialFieldLang());
  const [, startTransition] = useTransition();

  const setLang = useCallback((next: Lang) => {
    startTransition(() => {
      setLangState((prev) => (prev === next ? prev : next));
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return [lang, setLang];
}
