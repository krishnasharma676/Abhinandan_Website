import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

/**
 * Live hook synced directly to the global Lenis instance (`window.__lenis`).
 * Drives GPU transform springs from scroll velocity without triggering React re-renders.
 */
export function useLenisVelocity() {
  const rawVelocity = useMotionValue(0);
  const smoothVelocity = useSpring(rawVelocity, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

  useEffect(() => {
    let attachedLenis = null;
    let pollTimer = null;

    const handleScroll = ({ velocity }) => {
      const clamped = Math.max(-18, Math.min(18, velocity || 0));
      rawVelocity.set(clamped);
    };

    const attach = () => {
      if (window.__lenis) {
        attachedLenis = window.__lenis;
        attachedLenis.on('scroll', handleScroll);
        return true;
      }
      return false;
    };

    if (!attach()) {
      pollTimer = setInterval(() => {
        if (attach() && pollTimer) {
          clearInterval(pollTimer);
          pollTimer = null;
        }
      }, 180);
    }

    return () => {
      if (pollTimer) clearInterval(pollTimer);
      if (attachedLenis) {
        attachedLenis.off('scroll', handleScroll);
      }
    };
  }, [rawVelocity]);

  return smoothVelocity;
}

/**
 * Crisp, hardware-accelerated (iOS/Android 60-120Hz safe) Lenis section transitions.
 * Pure white & warm ivory separation panels with subtle Logo Crimson hairline accents — zero pink fog.
 */
export default function LenisSectionTransition({
  children,
  variant = 'silk-fold',
  backdropColor = '#FFFFFF',
  className = '',
}) {
  const containerRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const { scrollYProgress: enterProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start 72%'],
  });

  // Longer scrubbed travel for the unobstructed 3D Arched Sheet Unfold after #how-it-works
  const { scrollYProgress: archProgress } = useScroll({
    target: containerRef,
    offset: ['start 96%', 'start 30%'],
  });

  // 1. Sticky-safe Curtain Split (White & Ivory doors open cleanly left/right)
  const leftDoorX = useTransform(enterProgress, [0, 0.92], ['0%', '-104%']);
  const rightDoorX = useTransform(enterProgress, [0, 0.92], ['0%', '104%']);
  const doorOpacity = useTransform(enterProgress, [0.7, 1], [1, 0]);

  // 2. Crimson center-out seam thread + crisp GPU lift
  const seamLineScale = useTransform(enterProgress, [0.05, 0.92], [0, 1]);
  const straightY = useTransform(enterProgress, [0, 1], [24, 0]);
  const enterOpacity = useTransform(enterProgress, [0, 0.72], [0.8, 1]);

  // 3. Staggered Triple-Ribbon Silk Unroll (Ivory/White bands — zero pink wash)
  const ribbon1X = useTransform(enterProgress, [0, 0.85], ['0%', '-104%']);
  const ribbon2X = useTransform(enterProgress, [0.08, 0.92], ['0%', '104%']);
  const ribbon3X = useTransform(enterProgress, [0.16, 0.98], ['0%', '-104%']);
  const ribbonOpacity = useTransform(enterProgress, [0.78, 1], [1, 0]);

  // 4. Sticky-safe split veil aperture (White/Ivory crisp split)
  const veilLeftX = useTransform(enterProgress, [0, 0.9], ['0%', '-104%']);
  const veilRightX = useTransform(enterProgress, [0, 0.9], ['0%', '104%']);
  const veilOpacity = useTransform(enterProgress, [0.75, 1], [0.95, 0]);

  // 5. Unique Unobstructed 3D Arched Card Unfold (scales 0.88 -> 1, rounds flatten 52px -> 0, crest ribbon spreads)
  const archScale = useTransform(archProgress, [0, 1], [0.88, 1]);
  const archY = useTransform(archProgress, [0, 1], [28, 0]);
  const archRadius = useTransform(archProgress, [0, 0.9], [48, 0]);
  const archOpacity = useTransform(archProgress, [0, 0.45], [0.55, 1]);
  const archCrestScaleX = useTransform(archProgress, [0.05, 0.88], [0.18, 1]);
  const archCrestOpacity = useTransform(archProgress, [0, 0.82, 1], [0.9, 0.85, 0]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Sticky-safe overlay variants (zero transform/clip on wrapper -> preserves child sticky!)
  if (variant === 'curtain-split') {
    return (
      <div
        ref={containerRef}
        style={{ backgroundColor: backdropColor }}
        className={`relative overflow-x-clip ${className}`}
      >
        <motion.div
          style={{ x: leftDoorX, opacity: doorOpacity }}
          className="pointer-events-none absolute top-0 left-0 w-1/2 h-20 sm:h-28 bg-[#FAF7F2] border-b border-r border-stone-200 z-30 will-change-transform"
          aria-hidden="true"
        />
        <motion.div
          style={{ x: rightDoorX, opacity: doorOpacity }}
          className="pointer-events-none absolute top-0 right-0 w-1/2 h-20 sm:h-28 bg-[#FAF7F2] border-b border-l border-stone-200 z-30 will-change-transform"
          aria-hidden="true"
        />
        {children}
      </div>
    );
  }

  if (variant === 'depth-curtain') {
    return (
      <div
        ref={containerRef}
        style={{ backgroundColor: backdropColor }}
        className={`relative overflow-x-clip ${className}`}
      >
        <motion.div
          style={{ x: veilLeftX, opacity: veilOpacity }}
          className="pointer-events-none absolute top-0 left-0 w-1/2 h-20 sm:h-24 bg-white border-b border-r border-[#FB1443]/25 z-30 will-change-transform"
          aria-hidden="true"
        />
        <motion.div
          style={{ x: veilRightX, opacity: veilOpacity }}
          className="pointer-events-none absolute top-0 right-0 w-1/2 h-20 sm:h-24 bg-white border-b border-l border-[#FB1443]/25 z-30 will-change-transform"
          aria-hidden="true"
        />
        {children}
      </div>
    );
  }

  if (variant === 'arch-unfold' || variant === 'pleat-unseal') {
    return (
      <div
        ref={containerRef}
        style={{ backgroundColor: backdropColor }}
        className={`relative overflow-x-clip ${className}`}
      >
        <motion.div
          style={{
            scale: archScale,
            y: archY,
            borderTopLeftRadius: archRadius,
            borderTopRightRadius: archRadius,
            opacity: archOpacity,
          }}
          className="relative bg-white shadow-[0_-14px_40px_-10px_rgba(28,25,23,0.08)] overflow-hidden will-change-transform origin-top"
        >
          {/* Tracing Crimson Arch Crest Thread that spreads across top as card flattens into full width */}
          <motion.div
            style={{ scaleX: archCrestScaleX, opacity: archCrestOpacity }}
            className="pointer-events-none absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#FB1443] to-transparent origin-center z-30 will-change-transform"
            aria-hidden="true"
          />
          {children}
        </motion.div>
      </div>
    );
  }

  if (variant === 'triple-ribbon' || variant === 'diagonal-slice') {
    return (
      <div
        ref={containerRef}
        style={{ backgroundColor: backdropColor }}
        className={`relative overflow-x-clip ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-32 z-30 overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            style={{ x: ribbon1X, opacity: ribbonOpacity }}
            className="h-1/3 w-full bg-[#FAF7F2] border-b border-stone-200/80 will-change-transform"
          />
          <motion.div
            style={{ x: ribbon2X, opacity: ribbonOpacity }}
            className="h-1/3 w-full bg-white border-b border-[#FB1443]/20 will-change-transform"
          />
          <motion.div
            style={{ x: ribbon3X, opacity: ribbonOpacity }}
            className="h-1/3 w-full bg-[#FAF7F2] border-b border-stone-200/80 will-change-transform"
          />
        </div>
        <motion.div style={{ y: straightY, opacity: enterOpacity }} className="will-change-transform">
          {children}
        </motion.div>
      </div>
    );
  }

  // GPU-friendly 'circle-bloom' / 'unveil-up' / default: Crisp seam draw + smooth elevation
  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: backdropColor }}
      className={`relative overflow-x-clip ${className}`}
    >
      <motion.div
        style={{ scaleX: seamLineScale }}
        className="pointer-events-none relative z-30 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FB1443]/60 to-transparent origin-center"
        aria-hidden="true"
      />
      <motion.div style={{ y: straightY, opacity: enterOpacity }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
