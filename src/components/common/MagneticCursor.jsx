import React, { useEffect, useRef, useState } from 'react';

/**
 * Custom Magnetic Interactive Cursor for fine-pointer desktop screens.
 * Disabled automatically on touch devices (iOS / Android) with zero event overhead.
 */
export default function MagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pressedRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
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
    let visible = false;
    let rafId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      const target = e.target;
      if (target && target.closest) {
        const labelEl = target.closest('[data-cursor]');
        const interactiveEl = target.closest('a, button, [role="button"], input, summary');
        setCursorLabel(labelEl ? labelEl.getAttribute('data-cursor') || '' : '');
        setIsPointerInteractive(Boolean(interactiveEl || labelEl));
      }
    };

    const handleMouseDown = () => {
      pressedRef.current = true;
    };
    const handleMouseUp = () => {
      pressedRef.current = false;
    };
    const handleMouseLeave = () => {
      visible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      const pressed = pressedRef.current;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${
          pressed ? 0.65 : 1
        })`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${
          pressed ? 0.88 : 1
        })`;
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
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[90] opacity-0 transition-[width,height,background-color,border-color,opacity] duration-200 flex items-center justify-center rounded-full ${
          cursorLabel
            ? 'px-3.5 h-8 min-w-[74px] bg-[#FB1443] text-white shadow-sm border border-white/60'
            : isPointerInteractive
            ? 'w-10 h-10 bg-stone-900/5 border-2 border-[#FB1443]/70'
            : 'w-8 h-8 bg-transparent border border-[#FB1443]/40'
        }`}
        aria-hidden="true"
      >
        {cursorLabel && (
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest whitespace-nowrap">
            {cursorLabel}
          </span>
        )}
      </div>

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
