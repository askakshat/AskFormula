import { useEffect, useState, type ReactNode } from "react";
import { Frame, Glass, GlassContainer, LiquidCanvas } from "@liquid-dom/react";

interface LiquidGlassSurfaceProps {
  children: ReactNode;
  className?: string;
}

/**
 * Progressive enhancement wrapper for Liquid DOM. The CSS surface is always
 * available; the WebGPU glass pass is only mounted on capable browsers so the
 * marketing site never loses its navigation when the experimental canvas API
 * is unavailable.
 */
export function LiquidGlassSurface({ children, className = "" }: LiquidGlassSurfaceProps) {
  const [webGpuReady, setWebGpuReady] = useState(false);

  useEffect(() => {
    setWebGpuReady(typeof navigator !== "undefined" && "gpu" in navigator);
  }, []);

  return (
    <div className={`liquid-surface ${webGpuReady ? "liquid-surface-webgpu" : ""} ${className}`}>
      {webGpuReady && (
        <LiquidCanvas
          className="liquid-canvas"
          canvasClassName="liquid-canvas-layer"
          proposal={{ width: window.innerWidth > 800 ? 800 : window.innerWidth - 32, height: 72 }}
          maxDpr={1.5}
          frameloop="always"
          onError={() => setWebGpuReady(false)}
        >
          <GlassContainer
            blur={12}
            spacing={20}
            tint={{ r: 0.16, g: 0.2, b: 0.21, a: 0.58 }}
            specularStrength={0.35}
            shadowBlur={10}
          >
            <Frame width={typeof window !== "undefined" && window.innerWidth > 800 ? 800 : typeof window !== "undefined" ? window.innerWidth - 32 : 800} height={72}>
              <Glass cornerRadius={30} cornerSmoothing={0.7} />
            </Frame>
          </GlassContainer>
        </LiquidCanvas>
      )}
      <div className="liquid-content">{children}</div>
    </div>
  );
}
