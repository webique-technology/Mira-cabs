"use client";

import { useEffect, useState } from "react";

/** Detects WebGL availability once on mount; defaults to unsupported until checked. */
export function useWebglSupport() {
  const [supported, setSupported] = useState(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
