"use client";

import { useEffect } from "react";
import { STUDIO_CONSOLE_TRACE } from "../../lib/studioAnchor";

/** One plain console trace on mount — no styling, no UI. */
export default function StudioOriginTrace() {
  useEffect(() => {
    console.log(STUDIO_CONSOLE_TRACE);
  }, []);

  return null;
}
