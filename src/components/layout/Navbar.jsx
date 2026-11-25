import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [showNavItems, setShowNavItems] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let portalOpen = false;

    const evaluateNav = () => {
      const heroTrigger = ScrollTrigger.getById('hero-stage');
      if (heroTrigger) {
        setShowNavItems(portalOpen || heroTrigger.progress >= 0.54 || window.scrollY > heroTrigger.end);
      } else {
        setShowNavItems(portalOpen || window.scrollY > 650);
      }
    };

    const handlePortalEvent = (e) => {
      portalOpen = Boolean(e?.detail?.open);
      evaluateNav();
    };

    window.addEventListener('scroll', evaluateNav, { passive: true });
    window.addEventListener('resize', evaluateNav, { passive: true });
    window.addEventListener('abhinandan:portal', handlePortalEvent);
    ScrollTrigger.addEventListener('refresh', evaluateNav);
    evaluateNav();

    return () => {
      window.removeEventListener('scroll', evaluateNav);
      window.removeEventListener('resize', evaluateNav);
      window.removeEventListener('abhinandan:portal', handlePortalEvent);
      ScrollTrigger.removeEventListener('refresh', evaluateNav);
    };
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

  const handleLinkClick = (e, link) => {
    if (link.isExternal) return;
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (link.href === '#hero') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.45 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (link.href === '#hampers') {
      const heroTrigger = ScrollTrigger.getById('hero-stage');
      if (heroTrigger && window.__lenis) {
        window.__lenis.scrollTo(heroTrigger.end + 2, { duration: 1.45 });
        return;
      }
    }
    if (link.href === '#story') {
      const storyTrigger = ScrollTrigger.getById('story-journey-stage');
      if (storyTrigger && window.__lenis) {
        window.__lenis.scrollTo(storyTrigger.start + 2, { duration: 1.45 });
        return;
      }
    }
    const el = document.querySelector(link.href);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -76, duration: 1.45 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full h-[76px] flex items-center transition-all duration-300 bg-white ${
          showNavItems
            ? 'shadow-md border-b border-stone-200/80'
            : 'border-b border-transparent shadow-none'
        }`}
      >
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between gap-4 sm:gap-6">
            {/* Centered Prominent Logo initially & during hero scroll -> Glides smoothly Left at Second Section */}
            <div
              className={`flex items-center gap-1.5 sm:gap-3 shrink-0 transition-all duration-500 ${
                showNavItems ? 'relative' : 'mx-auto'
              }`}
            >
              {showNavItems && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-1.5 sm:p-2 rounded-lg text-stone-800 hover:bg-stone-100 transition-colors"
                  aria-label="Open mobile menu"
                >
                  <Menu className="w-6 h-6" />
                </motion.button>
              )}

              <motion.a
                layout
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                href="#hero"
                onClick={(e) => handleLinkClick(e, { href: '#hero' })}
                className="flex items-center gap-2 group shrink-0"
              >
                <img
                  src={BRAND_CONFIG.logo || '/assets/logo.png'}
                  alt={BRAND_CONFIG.name}
                  decoding="sync"
                  fetchPriority="high"
                  className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                    showNavItems ? 'h-9 sm:h-10 lg:h-12' : 'h-12 sm:h-14 lg:h-16'
                  }`}
                />
              </motion.a>
            </div>

            {/* Desktop Navigation Links (Reveals when reaching Second Section) */}
            {showNavItems && (
              <motion.nav
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-sans"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noreferrer' : undefined}
                    onClick={(e) => handleLinkClick(e, link)}
                    className="text-[13px] xl:text-sm font-medium tracking-wider text-[#212529]/90 hover:text-[#FB1443] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.nav>
            )}

            {/* Shop Now CTA (Reveals when reaching Second Section) */}
            {showNavItems && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
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
              </motion.div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <div data-lenis-prevent className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-luxury p-6 flex flex-col justify-between overflow-y-auto z-10">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <img
                    src={BRAND_CONFIG.logo || '/assets/logo.png'}
                    alt={BRAND_CONFIG.name}
                    className="h-10 w-auto object-contain"
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
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noreferrer' : undefined}
                      onClick={(e) => handleLinkClick(e, link)}
                      className="px-3 py-2 rounded-xl text-sm font-bold text-[#212529] hover:bg-[#FAF7F2] hover:text-[#FB1443] transition-colors"
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
      </AnimatePresence>
    </>
  );
}
