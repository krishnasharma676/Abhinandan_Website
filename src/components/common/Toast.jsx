import React from 'react';
import { useCart } from '../../context/CartContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none animate-bounce">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-chocolate-dark/95 text-cream-50 shadow-elevated border border-gold/40 backdrop-blur-md max-w-md">
        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0 text-gold">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-gold-light font-semibold">Hamper Concierge</p>
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      </div>
    </div>
  );
}

