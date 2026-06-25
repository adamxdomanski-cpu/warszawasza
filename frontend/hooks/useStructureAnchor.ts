"use client";

import { useEffect, useRef } from "react";
import { useSignalField } from "../app/components/SignalFieldProvider";

/** Bind a structural signal zone — white ● emerges when beetroot attention passes near. */
export function useStructureAnchor<T extends HTMLElement = HTMLDivElement>() {
  const { registerStructureAnchor } = useSignalField();
  const elRef = useRef<T | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    return registerStructureAnchor(el);
  }, [registerStructureAnchor]);

  return elRef;
}
