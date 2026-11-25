import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const progress = Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3.5px] bg-transparent z-[80] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#FB1443] via-[#FFA6B6] to-[#FFE885] transition-[width] duration-75 ease-out shadow-[0_0_12px_rgba(251,20,67,0.65)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
