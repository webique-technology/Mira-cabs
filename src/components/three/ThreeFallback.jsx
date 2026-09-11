import { cn } from "@/lib/utils";

/**
 * Static poster shown before the 3D canvas mounts, when WebGL is
 * unavailable, or when the user prefers reduced motion. Pure CSS/SVG so it
 * never needs a network image request.
 */
export function ThreeFallback({ className }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-hero",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 260"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f2c4d" />
            <stop offset="100%" stopColor="#0b1226" />
          </linearGradient>
        </defs>
        <rect width="400" height="260" fill="url(#skyGrad)" />
        {[40, 70, 100, 130, 160, 190, 220, 250, 280, 310, 340].map((x, i) => (
          <rect
            key={x}
            x={x}
            y={260 - (40 + (i % 4) * 22)}
            width="18"
            height={40 + (i % 4) * 22}
            fill="#141d38"
            opacity={0.9}
          />
        ))}
        <rect x="0" y="205" width="400" height="55" fill="#0f172a" />
        <line
          x1="0"
          y1="232"
          x2="400"
          y2="232"
          stroke="#f5a623"
          strokeWidth="3"
          strokeDasharray="18 14"
          opacity="0.85"
        />
        <g transform="translate(150,178)">
          <rect x="0" y="10" width="110" height="30" rx="10" fill="#f5a623" />
          <rect x="18" y="-10" width="70" height="26" rx="8" fill="#fbbf24" />
          <circle cx="24" cy="42" r="12" fill="#0b1226" />
          <circle cx="86" cy="42" r="12" fill="#0b1226" />
        </g>
      </svg>
    </div>
  );
}
