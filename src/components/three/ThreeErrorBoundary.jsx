"use client";

import { Component } from "react";

/**
 * Isolates the 3D canvas from the rest of the page.
 *
 * The hero scene is decorative — if WebGL, three.js or the R3F renderer fails
 * for any reason (driver quirks, a version mismatch, a blocked context), the
 * homepage must still render. Without this, such a failure bubbles up to the
 * route-level error boundary and replaces the entire page with an error screen.
 */
export class ThreeErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Surfaced in development so the underlying 3D problem is still visible,
    // without letting it break the page for the user.
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Mira] 3D hero scene failed, falling back to static poster:",
        error.message,
      );
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
