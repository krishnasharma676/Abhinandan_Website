import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  MessageCircle
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'HAMPERS', href: '#hampers' },
    { label: 'CUSTOMIZE', href: '#customize' },
    { label: 'OUR STORY', href: '#story' },
    { label: 'INSTAGRAM', href: '#instagram' },
    {
      label: 'CONTACT',
      href: `https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
        BRAND_CONFIG.whatsapp.defaultMessage
      )}`,
      isExternal: true,
    },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-white ${
          isScrolled
            ? 'shadow-md border-b border-stone-200/80 py-3'
            : 'border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 sm:gap-6">

            {/* Left Group on Mobile: Hamburger Toggle + Brand Logo directly to its right. On Desktop: Only Brand Logo */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg text-stone-800 hover:bg-stone-100 transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Brand Logo - Official Logo Image (Just right to toggle on mobile, leftmost on desktop) */}
              <a href="#hero" className="flex items-center gap-2 group shrink-0">
                <img
                  src={BRAND_CONFIG.logo || '/assets/logo.png'}
                  alt={BRAND_CONFIG.name}
                  className="h-8 sm:h-9 lg:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </a>
            </div>

            {/* Clean, Refined Desktop Navigation Links (Lighter Medium Weight) */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-sans">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.isExternal ? '_blank' : undefined}
                  rel={link.isExternal ? 'noreferrer' : undefined}
                  className="text-[13px] xl:text-sm font-medium tracking-wider text-[#212529]/90 hover:text-[#FB1443] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center">
              {/* Brand Logo Color Pill Button (#FB1443) */}
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                  BRAND_CONFIG.whatsapp.defaultMessage
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 sm:px-8 py-2.5 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#FB1443]/20 transition-all duration-200 hover:scale-105 active:scale-95 inline-block text-center"
              >
                Shop Now
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-luxury p-6 flex flex-col justify-between overflow-y-auto z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <img
                  src={BRAND_CONFIG.logo || '/assets/logo.png'}
                  alt={BRAND_CONFIG.name}
                  className="h-9 w-auto object-contain"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-700"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-3 font-sans">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-xl text-sm font-bold text-[#212529] hover:bg-[#FAF8FC] hover:text-[#FFA6B6] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-stone-100 space-y-3">
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                  BRAND_CONFIG.whatsapp.defaultMessage
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-xs uppercase tracking-wider text-center block shadow-md shadow-[#FB1443]/20 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Shop Now on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
