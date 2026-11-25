import React, { useRef, useState } from 'react';

/**
 * Elastic Magnetic Wrapper for links and buttons on pointer devices.
 * Smoothly pulls element toward mouse within bounds and springs back on leave.
 */
export default function MagneticButton({
  as: Component = 'a',
  children,
  className = '',
  strength = 0.28,
  cursorLabel,
  ...props
}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;

    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={cursorLabel}
      style={{
        transform: `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)`,
        transition: hovered
          ? 'transform 0.12s cubic-bezier(0.22, 1, 0.36, 1)'
          : 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      {/* Gloss Shine Sweep Overlay */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
}

