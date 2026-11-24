import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('success');
    setMessage('Thank you for subscribing! Your ₹500 welcome voucher code has been emailed to you.');
    setEmail('');
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-200/60">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 mb-3 text-stone-700">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-800">
            Exclusive Privilege
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
          Join The Abhinandan Gifting Society
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans max-w-md mx-auto mb-6">
          Subscribe for early access to festive collections and a <strong>₹500 welcome voucher</strong> toward your first bespoke custom hamper.
        </p>

        {status === 'success' ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 max-w-sm mx-auto text-emerald-800 text-xs font-medium flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-stone-50 border border-stone-300 focus:outline-none focus:ring-1 focus:ring-gold text-stone-900 placeholder:text-stone-400"
                />
              </div>

              <Button
                type="submit"
                variant="gold"
                size="sm"
                className="shrink-0"
              >
                Claim ₹500
              </Button>
            </div>

            {status === 'error' && (
              <p className="text-[11px] text-red-600 font-medium">{message}</p>
            )}

            <p className="text-[10px] text-stone-400 pt-0.5">
              No spam. Only heartfelt gifting inspiration. Unsubscribe anytime.
            </p>
          </form>
        )}

      </div>
    </section>
  );
}
