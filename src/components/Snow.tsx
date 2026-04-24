import { useMemo } from "react";

interface SnowProps {
  count?: number;
}

/**
 * Falling snow effect using small white dots only — no snowflake symbols.
 * Pure CSS animation, no canvas.
 */
export default function Snow({ count = 90 }: SnowProps) {
  const flakes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const size = 1.5 + Math.random() * 3.5;
      const duration = 9 + Math.random() * 14;
      const delay = -Math.random() * duration;
      const drift = (Math.random() * 200 - 100).toFixed(0) + "px";
      const opacity = 0.4 + Math.random() * 0.55;
      return { i, left, size, duration, delay, drift, opacity };
    });
  }, [count]);

  return (
    <div className="snow-layer" aria-hidden="true">
      {flakes.map((f) => (
        <span
          key={f.i}
          className="snowflake"
          style={{
            left: `${f.left}vw`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            ["--drift" as string]: f.drift,
          }}
        />
      ))}
    </div>
  );
}
