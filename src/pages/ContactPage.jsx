import React, { useState } from 'react';
import { BRAND_CONFIG } from '../config/brand';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import Button from '../components/common/Button';

export default function ContactPage() {
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
    if (!form.name || !form.email || !form.message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);

    const text = `*✨ CONCIERGE CONTACT - ${BRAND_CONFIG.name.toUpperCase()}*
----------------------------------------
*Name:* ${form.name}
*Email:* ${form.email}
*Phone:* ${form.phone || 'Not provided'}
*Subject:* ${form.subject}
*Message:* ${form.message}
----------------------------------------`;

    const url = `https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-cream-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-dark">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Dedicated Atelier Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-chocolate">
            Connect with Our Stylists
          </h1>
          <p className="text-xs sm:text-sm text-chocolate/75 leading-relaxed font-sans">
            Whether you seek guidance selecting anniversary treats, wedding favors, or corporate quotes, our concierge is at your service.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Details (Col span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-cream-50 border border-gold/30 shadow-luxury space-y-6">
              <h3 className="font-serif text-xl font-bold text-chocolate">
                Atelier Concierge Desk
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-chocolate/85">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-chocolate block">Helpline & WhatsApp</span>
                    <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="hover:text-gold transition-colors">
                      {BRAND_CONFIG.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-chocolate block">Email Inquiries</span>
                    <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="hover:text-gold transition-colors">
                      {BRAND_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-chocolate block">Studio Location</span>
                    <p className="text-chocolate/70 leading-relaxed">
                      {BRAND_CONFIG.contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-chocolate block">Consultation Hours</span>
                    <p className="text-chocolate/70">
                      {BRAND_CONFIG.contact.workingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Concierge Card */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Gifting Assistance</span>
                </div>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  Have a quick question about box dimensions or urgent same-day delivery? Chat with our stylist in real time.
                </p>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                    BRAND_CONFIG.whatsapp.defaultMessage
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Start Live Chat
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (Col span 7) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-cream-50 border border-gold/30 shadow-luxury">
              <h3 className="font-serif text-2xl font-bold text-chocolate mb-2">
                Send an Atelier Inquiry
              </h3>
              <p className="text-xs text-chocolate/70 mb-6">
                Fill in your details and our senior gifting advisor will reply within 2 to 4 business hours.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-emerald-900">
                    Message Dispatched Successfully
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you, {form.name}. We have logged your request and our gifting concierge is preparing details.
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-chocolate mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Meera Kapoor"
                        required
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-cream-100 border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold text-chocolate"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-chocolate mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="meera@example.com"
                        required
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-cream-100 border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold text-chocolate"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-chocolate mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-cream-100 border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold text-chocolate"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-chocolate mb-1">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-cream-100 border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold text-chocolate"
                      >
                        <option>Bespoke Hamper Inquiry</option>
                        <option>Wedding Trousseau Consultation</option>
                        <option>Corporate Bulk Order</option>
                        <option>Order Status & Dispatch</option>
                        <option>Other Custom Gesture</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-chocolate mb-1">
                      Message / Requirement *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Share your recipient's passions, occasion date, budget, or custom requirements..."
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-cream-100 border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold text-chocolate resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="md"
                    icon={Send}
                    className="w-full shadow-medium font-semibold"
                  >
                    Send Message to Concierge
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

