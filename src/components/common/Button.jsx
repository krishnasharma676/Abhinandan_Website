import React from 'react';

export default function Button({
  children,
  variant = 'pink', // 'pink' | 'purple' | 'burgundy' | 'outline' | 'ghost' | 'soft' | 'gold'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-xs sm:text-sm",
    lg: "px-8 py-3.5 text-sm sm:text-base shadow-md",
  };

  const variantStyles = {
    pink: "bg-[#FFA6B6] text-white hover:bg-[#FF8E9E] shadow-sm",
    gold: "bg-[#FFA6B6] text-white hover:bg-[#FF8E9E] shadow-sm",
    purple: "bg-[#8A67B7] text-white hover:bg-[#694DA1] shadow-sm",
    burgundy: "bg-[#A31352] text-white hover:bg-[#800D3E] shadow-sm",
    outline: "bg-white text-[#A31352] border-2 border-[#FFA6B6] hover:bg-[#FFA6B6] hover:text-white shadow-sm",
    ghost: "bg-transparent text-stone-800 hover:bg-stone-100",
    soft: "bg-[#F5F2F9] text-[#8A67B7] hover:bg-[#E4E0ED]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.pink} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 mr-1.5 transition-transform duration-200 group-hover:scale-110" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </button>
  );
}
