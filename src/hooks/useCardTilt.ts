import type React from "react";
import { useRef, useCallback, useEffect } from "react";

/**
 * Interactive 3D card tilt with smooth lerp damping.
 * Cards track mouse position with organic inertia rather than snapping.
 */
export function useCardTilt(maxAngle = 5) {
  const ref = useRef<HTMLDivElement | null>(null);
  const targetRotX = useRef(0);
  const targetRotY = useRef(0);
  const currentRotX = useRef(0);
  const currentRotY = useRef(0);
  const animId = useRef(0);
  const isHovering = useRef(false);

  // Smooth animation loop with lerp
  useEffect(() => {
    const lerp = (current: number, target: number, factor: number) =>
      current + (target - current) * factor;

    const animate = () => {
      const el = ref.current;
      if (!el) return;

      const dampFactor = isHovering.current ? 0.12 : 0.08;
      currentRotX.current = lerp(currentRotX.current, targetRotX.current, dampFactor);
      currentRotY.current = lerp(currentRotY.current, targetRotY.current, dampFactor);

      // Only update DOM when there's meaningful change
      const dx = Math.abs(currentRotX.current - targetRotX.current);
      const dy = Math.abs(currentRotY.current - targetRotY.current);

      if (dx > 0.01 || dy > 0.01) {
        el.style.transform = `perspective(1000px) rotateX(${currentRotX.current.toFixed(3)}deg) rotateY(${currentRotY.current.toFixed(3)}deg) scale3d(1.008, 1.008, 1.008)`;
      } else if (!isHovering.current && (dx > 0.001 || dy > 0.001)) {
        // Settling back to rest
        el.style.transform = `perspective(1000px) rotateX(${currentRotX.current.toFixed(3)}deg) rotateY(${currentRotY.current.toFixed(3)}deg) scale3d(1, 1, 1)`;
      }

      animId.current = requestAnimationFrame(animate);
    };

    animId.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animId.current);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      isHovering.current = true;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width - 0.5) * 2;
      const yPercent = (y / rect.height - 0.5) * 2;

      targetRotX.current = -yPercent * maxAngle;
      targetRotY.current = xPercent * maxAngle;
    },
    [maxAngle]
  );

  const onMouseLeave = useCallback(() => {
    isHovering.current = false;
    targetRotX.current = 0;
    targetRotY.current = 0;
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
