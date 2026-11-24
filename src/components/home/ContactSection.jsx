import React, { useState } from 'react';
import { BRAND_CONFIG } from '../../config/brand';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import Button from '../common/Button';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bespoke Hamper Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setErrorMsg('Please complete your name and phone number.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);

    const text = `*✨ ATELIER INQUIRY - ${BRAND_CONFIG.name.toUpperCase()}*
----------------------------------------
*Name:* ${form.name}
*Phone:* ${form.phone}
*Email:* ${form.email || 'Not provided'}
*Subject:* ${form.subject}
*Message:* ${form.message || 'Please share product catalog.'}
----------------------------------------`;

    const url = `https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Atelier Concierge</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Connect with Our Stylists
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            Need guidance selecting wedding favors, corporate Diwali hampers, or quick dispatch? We're available 6 days a week.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info (Col span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-serif text-base font-bold text-stone-900">
                Atelier Concierge Desk
              </h3>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block">Helpline & WhatsApp</span>
                    <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="hover:text-gold transition-colors">
                      {BRAND_CONFIG.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block">Corporate Desk</span>
                    <span>{BRAND_CONFIG.contact.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block">Production Location</span>
                    <span>Delhi NCR, India (Pan-India Shipping)</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Card */}
              <div className="p-3.5 rounded-xl bg-stone-900 text-white space-y-2">
                <div className="flex items-center gap-1.5 text-gold font-semibold text-xs">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Instant WhatsApp Support</span>
                </div>
                <p className="text-[10px] text-stone-300 leading-snug">
                  Chat directly with our team for immediate answers and bulk catalog PDF.
                </p>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                    BRAND_CONFIG.whatsapp.defaultMessage
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-3 py-1.5 rounded-md bg-gold hover:bg-gold-dark text-white text-xs font-semibold transition-colors"
                >
                  Chat with Concierge
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (Col span 7) */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                Send an Atelier Inquiry
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Fill in your details and our team will get in touch on WhatsApp promptly.
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-sm font-bold text-emerald-950">
                    Message Dispatched Successfully
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Thank you, {form.name}. Our gifting stylist is ready on WhatsApp.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    size="sm"
                  >
                    Send Another Note
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {errorMsg && (
                    <div className="p-2 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Meera Kapoor"
                        required
                        className="w-full px-3 py-2 text-xs rounded-lg bg-stone-50 border border-stone-300 focus:outline-none focus:ring-1 focus:ring-gold text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 99534 56311"
                        required
                        className="w-full px-3 py-2 text-xs rounded-lg bg-stone-50 border border-stone-300 focus:outline-none focus:ring-1 focus:ring-gold text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Occasion / Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-stone-50 border border-stone-300 focus:outline-none focus:ring-1 focus:ring-gold text-stone-900"
                    >
                      <option>Diwali Corporate Hamper</option>
                      <option>Wedding Trousseau & Favours</option>
                      <option>Custom Birthday/Anniversary Box</option>
                      <option>Door Toran & Favours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Requirements or Message
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Share estimated quantity, budget or delivery date..."
                      className="w-full px-3 py-2 text-xs rounded-lg bg-stone-50 border border-stone-300 focus:outline-none focus:ring-1 focus:ring-gold text-stone-900 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="md"
                    icon={Send}
                    className="w-full font-semibold shadow-sm"
                  >
                    Send to WhatsApp Concierge
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

