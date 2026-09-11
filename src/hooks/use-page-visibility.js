"use client";

import { useEffect, useState } from "react";

/** Tracks document visibility so 3D scenes can pause their render loop on hidden tabs. */
export function usePageVisibility() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState === "visible");
    onChange();
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  return visible;
}
