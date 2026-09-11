"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { ThreeFallback } from "@/components/three/ThreeFallback";
import { ThreeErrorBoundary } from "@/components/three/ThreeErrorBoundary";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useWebglSupport } from "@/hooks/use-webgl-support";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePageVisibility } from "@/hooks/use-page-visibility";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// Dynamically imported so the 3D canvas + three.js/R3F/Drei never ship in
// the initial JS bundle and never block first paint or LCP.
const CabHeroScene = dynamic(() => import("@/components/three/CabHeroScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Chooses and mounts the configured 3D hero experience on the client only,
 * with graceful degradation: disabled config, no-WebGL, reduced-motion
 * preference, or a hidden tab all fall back to a static poster instead of
 * running the render loop. A runtime failure inside the canvas is caught by
 * ThreeErrorBoundary so it degrades to the poster rather than breaking the page.
 */
export function ThreeSceneLoader({ className }) {
  const reducedMotion = useReducedMotion();
  const webglSupported = useWebglSupport();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const pageVisible = usePageVisibility();
  const [canMount3D, setCanMount3D] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Let the page become interactive first, then mount the 3D canvas.
    const onIdle = () => setCanMount3D(true);
    const withIdleCallback = window;

    if (withIdleCallback.requestIdleCallback) {
      const idleId = withIdleCallback.requestIdleCallback(onIdle, {
        timeout: 1200,
      });
      return () => withIdleCallback.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(onIdle, 300);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const shouldRender3D =
    siteConfig.enable3D &&
    siteConfig.threeDMode === "lightweight-hero" &&
    webglSupported !== false &&
    !reducedMotion &&
    !isMobile &&
    canMount3D;

  if (!shouldRender3D) {
    return <ThreeFallback className={className} />;
  }

  return (
    <div className={cn("h-full w-full", className)}>
      <ThreeErrorBoundary fallback={<ThreeFallback className={className} />}>
        <Suspense fallback={<ThreeFallback className={className} />}>
          {pageVisible ? (
            <CabHeroScene reducedMotion={reducedMotion} lowPower={isMobile} />
          ) : (
            <ThreeFallback className={className} />
          )}
        </Suspense>
      </ThreeErrorBoundary>
    </div>
  );
}
