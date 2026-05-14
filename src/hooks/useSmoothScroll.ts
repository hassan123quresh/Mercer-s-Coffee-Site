import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function useSmoothScroll() {
  useEffect(() => {
    // Expo ease-out — the exact curve Framer Motion uses internally
    const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

    const lenis = new Lenis({
      duration: 1.4,
      easing,
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisInstance = lenis;

    // Integrate with requestAnimationFrame
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

/** Call this to programmatically scroll to an element (e.g. anchor links) */
export function scrollTo(target: string | HTMLElement, options?: { offset?: number }) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: options?.offset ?? 0 });
  }
}
