import React, { useEffect, useRef, useState } from 'react';

/**
 * Custom Magnetic Interactive Cursor for fine-pointer desktop screens.
 * Smooth 60fps rAF lerping with zero state churn on mousemove.
 * Morphs into action pill badges whenever hovering nodes with data-cursor="LABEL".
 */
export default function MagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [isPointerInteractive, setIsPointerInteractive] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches || reducedMotion.matches) return;

    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;
    let visible = false;
    let rafId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
        if (glowRef.current) glowRef.current.style.opacity = '1';
      }

      const target = e.target;
      if (target && target.closest) {
        const labelEl = target.closest('[data-cursor]');
        const interactiveEl = target.closest('a, button, [role="button"], input, summary');
        setCursorLabel(labelEl ? labelEl.getAttribute('data-cursor') || '' : '');
        setIsPointerInteractive(Boolean(interactiveEl || labelEl));
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => {
      visible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${
          isPressed ? 0.65 : 1
        })`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${
          isPressed ? 0.88 : 1
        })`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX.toFixed(1)}px, ${glowY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isPressed]);

  if (!enabled) return null;

  return (
    <>
      {/* Subtle Ambient Rose Spotlight Glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-72 h-72 rounded-full pointer-events-none z-[5] opacity-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle, rgba(251,20,67,0.07) 0%, rgba(255,166,182,0.04) 45%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      {/* Outer Ring / Label Badge */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[90] opacity-0 transition-[width,height,background-color,border-color,opacity] duration-200 flex items-center justify-center rounded-full ${
          cursorLabel
            ? 'px-3.5 h-8 min-w-[74px] bg-[#FB1443] text-white shadow-lg shadow-[#FB1443]/30 border border-white/60'
            : isPointerInteractive
            ? 'w-11 h-11 bg-[#FB1443]/10 border-2 border-[#FB1443]/70'
            : 'w-9 h-9 bg-transparent border border-[#FB1443]/45'
        }`}
        aria-hidden="true"
      >
        {cursorLabel && (
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest whitespace-nowrap">
            {cursorLabel}
          </span>
        )}
      </div>

      {/* Inner Crisp Crimson Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FB1443] pointer-events-none z-[91] opacity-0 transition-opacity duration-150 ${
          cursorLabel ? '!opacity-0' : ''
        }`}
        aria-hidden="true"
      />
    </>
  );
}

