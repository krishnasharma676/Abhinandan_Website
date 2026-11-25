import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_CONFIG } from '../../config/brand';

export default function PreloaderIntro() {
  const [stage, setStage] = useState('loading'); // 'loading' | 'splitting' | 'done'

  useEffect(() => {
    const splitTimer = setTimeout(() => {
      setStage('splitting');
      window.__abhinandanPreloaderSplit = true;
      window.dispatchEvent(new Event('abhinandan:preloader-split'));
    }, 780);
    const doneTimer = setTimeout(() => {
      setStage('done');
      window.__abhinandanPreloaderDone = true;
      window.dispatchEvent(new Event('abhinandan:preloader-done'));
    }, 1480);

    return () => {
      clearTimeout(splitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (stage === 'done') return null;

  return (
    <AnimatePresence>
      <div
        className={`fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden ${
          stage === 'splitting' ? 'pointer-events-none' : ''
        }`}
        aria-hidden="true"
      >
        {/* Top Silk Curtain Panel */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: stage === 'splitting' ? '-105%' : 0 }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          className="relative w-full h-1/2 bg-[#FAF7F2] border-b border-[#FB1443]/20 flex items-end justify-center pb-5"
        >
          <motion.img
            src={BRAND_CONFIG.logo || '/assets/logo.png'}
            alt={BRAND_CONFIG.name}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{
              opacity: stage === 'splitting' ? 0 : 1,
              scale: stage === 'splitting' ? 1.15 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-14 sm:h-16 w-auto object-contain"
          />
        </motion.div>

        {/* Crimson Ribbon Seam Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{
            scaleX: 1,
            opacity: stage === 'splitting' ? 0 : 1,
          }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0.5 }}
          className="fixed top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 bg-gradient-to-r from-[#FEEAE6] via-[#FB1443] to-[#FEEAE6] z-30 shadow-[0_0_16px_rgba(251,20,67,0.45)]"
        />

        {/* Bottom Silk Curtain Panel */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: stage === 'splitting' ? '105%' : 0 }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          className="relative w-full h-1/2 bg-[#FEEAE6] border-t border-[#FB1443]/20"
        />
      </div>
    </AnimatePresence>
  );
}
