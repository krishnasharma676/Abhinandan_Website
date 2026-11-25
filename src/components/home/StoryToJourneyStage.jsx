import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChelyArchedStorySection from './ChelyArchedStorySection';
import ChelyJourneyScallopSection from './ChelyJourneyScallopSection';

gsap.registerPlugin(ScrollTrigger);

/**
 * Unique lateral book-page / crimson-blade sweep transition (no zoom, no center split).
 * Entering Story holds cleanly interactive at 100%; scrolling further sweeps
 * ChelyJourneyScallopSection smoothly in from Right -> Left across the viewport.
 */
export default function StoryToJourneyStage() {
  const stageRef = useRef(null);
  const storyLayerRef = useRef(null);
  const journeyLayerRef = useRef(null);
  const bladeRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onMq = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onMq);

    const stageEl = stageRef.current;
    if (!stageEl || mq.matches) {
      return () => mq.removeEventListener('change', onMq);
    }

    const syncPointerState = (progress) => {
      const sweptPastHalf = progress >= 0.48;
      if (storyLayerRef.current) {
        storyLayerRef.current.style.pointerEvents = sweptPastHalf ? 'none' : 'auto';
      }
      if (journeyLayerRef.current) {
        journeyLayerRef.current.style.pointerEvents = sweptPastHalf ? 'auto' : 'none';
      }
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'story-journey-stage',
          trigger: stageEl,
          start: 'top 76px',
          end: () => (window.innerWidth < 768 ? '+=760' : '+=920'),
          pin: true,
          pinSpacing: true,
          scrub: 0.45,
          anticipatePin: 1,
          refreshPriority: 7,
          invalidateOnRefresh: true,
          onUpdate: (self) => syncPointerState(self.progress),
          onLeave: () => syncPointerState(1),
          onLeaveBack: () => syncPointerState(0),
        },
      });

      // Keep Story crisp at 0.00 -> 0.10, then sweep Journey Right -> Left with GPU crimson ribbon
      tl.fromTo(
        journeyLayerRef.current,
        { clipPath: 'inset(0% 0% 0% 100%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.82, ease: 'power2.inOut' },
        0.1
      )
        .fromTo(
          bladeRef.current,
          { x: 0 },
          {
            x: () => -(stageRef.current?.offsetWidth || window.innerWidth),
            duration: 0.82,
            ease: 'power2.inOut',
          },
          0.1
        )
        .fromTo(
          bladeRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.06, ease: 'power1.out' },
          0.1
        )
        .to(
          bladeRef.current,
          { opacity: 0, duration: 0.08, ease: 'power1.out' },
          0.86
        )
        .to(
          storyLayerRef.current,
          { xPercent: -14, opacity: 0.4, duration: 0.82, ease: 'power2.inOut' },
          0.1
        );
    }, stageRef);

    ScrollTrigger.sort();
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      mq.removeEventListener('change', onMq);
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  if (reducedMotion) {
    return (
      <>
        <ChelyArchedStorySection />
        <ChelyJourneyScallopSection />
      </>
    );
  }

  return (
    <div
      id="story-journey-stage"
      ref={stageRef}
      className="relative w-full min-h-[calc(100vh-76px)] grid grid-cols-1 overflow-x-clip bg-[#FAF7F2]"
    >
      {/* BASE LAYER (z-10): Personalized Gift Hampers Story */}
      <div
        ref={storyLayerRef}
        className="col-start-1 row-start-1 relative z-10 h-full will-change-transform"
      >
        <ChelyArchedStorySection />
      </div>

      {/* SWEEP LAYER (z-20): Journey Scallop Section sweeps in laterally Right -> Left */}
      <div
        ref={journeyLayerRef}
        className="col-start-1 row-start-1 relative z-20 h-full pointer-events-none will-change-[clip-path]"
        style={{ clipPath: 'inset(0% 0% 0% 100%)' }}
      >
        <ChelyJourneyScallopSection />
      </div>

      {/* VERTICAL SILK SWEEP RIBBON (z-30): Travels along moving edge from Right -> Left */}
      <div
        ref={bladeRef}
        className="pointer-events-none absolute top-0 bottom-0 right-0 -mr-3.5 z-30 flex flex-col items-center justify-center opacity-0 will-change-transform"
        aria-hidden="true"
      >
        <div className="w-[2px] h-full bg-gradient-to-b from-[#FB1443]/20 via-[#FB1443] to-[#FB1443]/20 shadow-sm" />
        <span className="absolute w-7 h-7 rounded-full bg-white border-2 border-[#FB1443] text-[#FB1443] text-xs font-bold flex items-center justify-center shadow-[0_6px_18px_rgba(251,20,67,0.35)]">
          ✦
        </span>
      </div>
    </div>
  );
}
