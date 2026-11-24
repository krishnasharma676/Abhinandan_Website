import React from 'react';

export default function Badge({
  children,
  variant = 'gold', // 'gold' | 'burgundy' | 'blush' | 'outline' | 'ribbon'
  size = 'md',
  className = ''
}) {
  const baseStyles = "inline-flex items-center font-medium uppercase tracking-wider rounded-full";

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-sm",
  };

  const variantStyles = {
    gold: "bg-gold/15 text-gold-dark border border-gold/30",
    burgundy: "bg-burgundy text-white shadow-soft",
    blush: "bg-rose-pastel text-burgundy border border-rose-muted/20",
    outline: "bg-transparent text-chocolate/80 border border-cream-400",
    ribbon: "bg-gold text-white shadow-sm font-semibold",
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}

