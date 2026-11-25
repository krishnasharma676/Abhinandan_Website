import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotionValue, useSpring } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

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
 * Scroll-driven Lenis + GSAP ScrollTrigger section transitions.
 * Runs cleanly after Hero (+1620px) & StoryToJourney (+680px) pin-spacers using
 * ScrollTrigger's native refresh order (never stale Framer Motion scroll offsets).
 */
export default function LenisSectionTransition({
  children,
  variant = 'silk-fold',
  backdropColor = '#FFFFFF',
  className = '',
}) {
  const containerRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const archCardRef = useRef(null);
  const archCrestRef = useRef(null);
  const seamRef = useRef(null);
  const contentRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (variant === 'curtain-split' || variant === 'depth-curtain') {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            end: 'top 42%',
            scrub: 0.15,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          leftDoorRef.current,
          { xPercent: 0, opacity: 1 },
          { xPercent: -104, opacity: 0, ease: 'power2.inOut', duration: 1 },
          0
        ).fromTo(
          rightDoorRef.current,
          { xPercent: 0, opacity: 1 },
          { xPercent: 104, opacity: 0, ease: 'power2.inOut', duration: 1 },
          0
        );
        return;
      }

      if (variant === 'arch-unfold' || variant === 'pleat-unseal') {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 96%',
            end: 'top 28%',
            scrub: 0.15,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          archCardRef.current,
          {
            scale: 0.84,
            y: 40,
            borderTopLeftRadius: 64,
            borderTopRightRadius: 64,
            opacity: 0.52,
          },
          {
            scale: 1,
            y: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 1,
          },
          0
        )
          .fromTo(
            archCrestRef.current,
            { scaleX: 0.16, opacity: 0.95 },
            { scaleX: 1, opacity: 0.9, ease: 'power2.out', duration: 0.8 },
            0
          )
          .to(
            archCrestRef.current,
            { opacity: 0, duration: 0.2, ease: 'power1.out' },
            0.8
          );
        return;
      }

      // Default / 'circle-bloom' / 'unveil-up': Crimson ribbon draw + elevation reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 96%',
          end: 'top 50%',
          scrub: 0.15,
          invalidateOnRefresh: true,
        },
      });

      if (seamRef.current) {
        tl.fromTo(
          seamRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: 'power2.out', duration: 0.9 },
          0
        );
      }
      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { y: 34, scale: 0.96, opacity: 0.65 },
          { y: 0, scale: 1, opacity: 1, ease: 'power2.out', duration: 1 },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [variant, reducedMotion]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Sticky-safe overlay shutters (zero transform/clip on wrapper -> preserves child sticky!)
  if (variant === 'curtain-split' || variant === 'depth-curtain') {
    const isDepth = variant === 'depth-curtain';
    return (
      <div
        ref={containerRef}
        style={{ backgroundColor: backdropColor }}
        className={`relative overflow-x-clip ${className}`}
      >
        <div
          ref={leftDoorRef}
          className={`pointer-events-none absolute top-0 left-0 w-1/2 ${
            isDepth
              ? 'h-20 sm:h-24 bg-white border-b border-r border-[#FB1443]/25'
              : 'h-24 sm:h-32 bg-[#FAF7F2] border-b border-r border-stone-200'
          } z-30 will-change-transform`}
          aria-hidden="true"
        />
        <div
          ref={rightDoorRef}
          className={`pointer-events-none absolute top-0 right-0 w-1/2 ${
            isDepth
              ? 'h-20 sm:h-24 bg-white border-b border-l border-[#FB1443]/25'
              : 'h-24 sm:h-32 bg-[#FAF7F2] border-b border-l border-stone-200'
          } z-30 will-change-transform`}
          aria-hidden="true"
        />
        {children}
      </div>
    );
  }

  // Unobstructed 3D Arched Sheet Card Unfold (triggers as #how-it-works ends)
  if (variant === 'arch-unfold' || variant === 'pleat-unseal') {
    return (
      <div
        ref={containerRef}
        style={{ backgroundColor: backdropColor }}
        className={`relative overflow-x-clip ${className}`}
      >
        <div
          ref={archCardRef}
          className="relative bg-white shadow-[0_-14px_40px_-10px_rgba(28,25,23,0.08)] overflow-hidden will-change-transform origin-top"
        >
          {/* Tracing Crimson Arch Crest Thread that spreads across top as card expands flat */}
          <div
            ref={archCrestRef}
            className="pointer-events-none absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#FB1443] to-transparent origin-center z-30 will-change-transform"
            aria-hidden="true"
          />
          {children}
        </div>
      </div>
    );
  }

  // GPU-friendly 'circle-bloom' / 'unveil-up' / default: Crisp seam draw + elevation
  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: backdropColor }}
      className={`relative overflow-x-clip ${className}`}
    >
      <div
        ref={seamRef}
        className="pointer-events-none relative z-30 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FB1443]/65 to-transparent origin-center will-change-transform"
        aria-hidden="true"
      />
      <div ref={contentRef} className="will-change-transform origin-top">
        {children}
      </div>
    </div>
  );
}
