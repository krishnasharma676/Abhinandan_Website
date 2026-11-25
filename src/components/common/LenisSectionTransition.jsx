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
 * Scroll-driven inter-section kinetic ribbon powered by Lenis velocity.
 * Zero horizontal tilt or side shrink; flows smoothly edge-to-edge.
 */
export function LenisVelocitySeam({
  text = 'HANDCRAFTED HAMPERS ✦ BY KDF NUTS ✦ PAN-INDIA DELIVERY ✦ BESPOKE GIFTING',
  bg = '#FAF7F2',
  accent = '#FB1443',
}) {
  const seamRef = useRef(null);
  const velocity = useLenisVelocity();
  const { scrollYProgress } = useScroll({
    target: seamRef,
    offset: ['start end', 'end start'],
  });

  const baseX = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const velocityBoostX = useTransform(velocity, [-15, 0, 15], [-28, 0, 28]);
  const lineScale = useTransform(scrollYProgress, [0.1, 0.55], [0.15, 1]);

  return (
    <div
      ref={seamRef}
      style={{ backgroundColor: bg }}
      className="relative overflow-hidden py-2.5 sm:py-3 border-y border-[#FB1443]/12 select-none pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        style={{ scaleX: lineScale }}
        className="w-full h-px bg-gradient-to-r from-transparent via-[#FB1443]/35 to-transparent mb-1.5 origin-center"
      />
      <motion.div style={{ x: baseX }} className="will-change-transform">
        <motion.div
          style={{ x: velocityBoostX }}
          className="flex items-center justify-center whitespace-nowrap gap-6 will-change-transform"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{ color: accent }}
              className="text-[10px] sm:text-[11px] font-bold tracking-[0.26em] uppercase opacity-75"
            >
              {text}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * Clean, straight, full-bleed (100% width — zero horizontal skew or side shrink)
 * Lenis scroll-driven section-to-section transitions.
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

  const velocity = useLenisVelocity();

  // Completes smoothly right as section top rises into bottom third -> clean level display
  const { scrollYProgress: enterProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start 72%'],
  });

  // 1. Curtain-split doors (no transform on section -> sticky safe)
  const leftDoorX = useTransform(enterProgress, [0, 0.92], ['0%', '-104%']);
  const rightDoorX = useTransform(enterProgress, [0, 0.92], ['0%', '104%']);
  const doorOpacity = useTransform(enterProgress, [0.7, 1], [1, 0]);

  // 2. Full-width vertical rise + horizontal seam thread draw (no side clipping)
  const seamLineScale = useTransform(enterProgress, [0.05, 0.95], [0, 1]);
  const archTopWipe = useTransform(
    enterProgress,
    [0, 0.92],
    ['inset(22px 0% 0% 0%)', 'inset(0px 0% 0% 0%)']
  );

  // 3. Level page glide + subtle Lenis vertical velocity parallax (zero horizontal tilt/skew!)
  const straightY = useTransform(enterProgress, [0, 1], [32, 0]);
  const velocityYShift = useTransform(velocity, [-15, 0, 15], [6, 0, -6]);
  const enterOpacity = useTransform(enterProgress, [0, 0.75], [0.72, 1]);

  // 4. Radial spotlight reveal (starts cleanly from full top center, zero slanted edges)
  const circleClip = useTransform(
    enterProgress,
    [0, 0.92],
    ['circle(26% at 50% 0%)', 'circle(185% at 50% 45%)']
  );

  // 5. Staggered 3-Ribbon Horizontal Silk Gate Unroll (level horizontal lines, zero skew)
  const ribbon1X = useTransform(enterProgress, [0, 0.85], ['0%', '-104%']);
  const ribbon2X = useTransform(enterProgress, [0.08, 0.92], ['0%', '104%']);
  const ribbon3X = useTransform(enterProgress, [0.16, 0.98], ['0%', '-104%']);
  const ribbonOpacity = useTransform(enterProgress, [0.78, 1], [1, 0]);

  // 6. Sticky-safe center-outward blush veil aperture
  const veilLeftX = useTransform(enterProgress, [0, 0.9], ['0%', '-104%']);
  const veilRightX = useTransform(enterProgress, [0, 0.9], ['0%', '104%']);
  const veilOpacity = useTransform(enterProgress, [0.75, 1], [0.95, 0]);

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
          className="pointer-events-none absolute top-0 left-0 w-1/2 h-24 sm:h-32 bg-gradient-to-r from-[#FEEAE6] to-[#FAF7F2] border-b border-r border-[#FB1443]/15 z-30 will-change-transform"
          aria-hidden="true"
        />
        <motion.div
          style={{ x: rightDoorX, opacity: doorOpacity }}
          className="pointer-events-none absolute top-0 right-0 w-1/2 h-24 sm:h-32 bg-gradient-to-l from-[#FEEAE6] to-[#FAF7F2] border-b border-l border-[#FB1443]/15 z-30 will-change-transform"
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
          className="pointer-events-none absolute top-0 left-0 w-1/2 h-24 sm:h-28 bg-gradient-to-r from-[#FEEAE6] to-[#FAF7F2] border-r border-[#FB1443]/20 z-30 will-change-transform"
          aria-hidden="true"
        />
        <motion.div
          style={{ x: veilRightX, opacity: veilOpacity }}
          className="pointer-events-none absolute top-0 right-0 w-1/2 h-24 sm:h-28 bg-gradient-to-l from-[#FEEAE6] to-[#FAF7F2] border-l border-[#FB1443]/20 z-30 will-change-transform"
          aria-hidden="true"
        />
        {children}
      </div>
    );
  }

  if (variant === 'arch-portal') {
    return (
      <div
        ref={containerRef}
        style={{ backgroundColor: backdropColor }}
        className={`relative overflow-x-clip ${className}`}
      >
        <motion.div
          style={{ scaleX: seamLineScale }}
          className="pointer-events-none relative z-30 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FB1443]/45 to-transparent origin-center"
          aria-hidden="true"
        />
        <motion.div style={{ clipPath: archTopWipe, y: straightY }} className="will-change-transform">
          {children}
        </motion.div>
      </div>
    );
  }

  if (variant === 'silk-fold') {
    return (
      <div
        ref={containerRef}
        style={{ backgroundColor: backdropColor }}
        className={`relative overflow-x-clip ${className}`}
      >
        <motion.div
          style={{ y: straightY, opacity: enterOpacity }}
          className="will-change-transform"
        >
          <motion.div style={{ y: velocityYShift }} className="will-change-transform">
            {children}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (variant === 'circle-bloom') {
    return (
      <div
        ref={containerRef}
        style={{ backgroundColor: backdropColor }}
        className={`relative overflow-x-clip ${className}`}
      >
        <motion.div style={{ clipPath: circleClip }} className="will-change-transform">
          {children}
        </motion.div>
      </div>
    );
  }

  if (variant === 'diagonal-slice' || variant === 'triple-ribbon') {
    return (
      <div
        ref={containerRef}
        style={{ backgroundColor: backdropColor }}
        className={`relative overflow-x-clip ${className}`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-36 z-30 overflow-hidden" aria-hidden="true">
          <motion.div
            style={{ x: ribbon1X, opacity: ribbonOpacity }}
            className="h-1/3 w-full bg-white border-b border-rose-100/80 will-change-transform"
          />
          <motion.div
            style={{ x: ribbon2X, opacity: ribbonOpacity }}
            className="h-1/3 w-full bg-[#FEEAE6] border-b border-[#FB1443]/15 will-change-transform"
          />
          <motion.div
            style={{ x: ribbon3X, opacity: ribbonOpacity }}
            className="h-1/3 w-full bg-white border-b border-rose-100/80 will-change-transform"
          />
        </div>
        <motion.div style={{ y: straightY, opacity: enterOpacity }} className="will-change-transform">
          {children}
        </motion.div>
      </div>
    );
  }

  // 'unveil-up' clean horizontal straight lift with glowing seam line
  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: backdropColor }}
      className={`relative overflow-x-clip ${className}`}
    >
      <motion.div
        style={{ scaleX: seamLineScale }}
        className="pointer-events-none relative z-30 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FB1443]/50 to-transparent origin-center"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: straightY, opacity: enterOpacity }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
