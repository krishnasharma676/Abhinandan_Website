import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Send
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import Button from '../common/Button';

export default function CorporateGiftingSection() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    quantity: '50-100 units',
    budgetRange: '₹3,000 - ₹5,000 per hamper',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email || !formData.phone) {
      setFormError('Please fill in your company name, email, and contact number.');
      return;
    }

    setFormError('');
    setIsSubmitted(true);

    const text = `*💼 CORPORATE GIFTING QUOTE REQUEST - ${BRAND_CONFIG.name.toUpperCase()}*
----------------------------------------
*Company:* ${formData.companyName}
*Contact Person:* ${formData.contactPerson || 'Not provided'}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Estimated Quantity:* ${formData.quantity}
*Target Budget:* ${formData.budgetRange}
*Requirements:* ${formData.message || 'Please send corporate catalog & options.'}
----------------------------------------`;

    const waUrl = `https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-200/60" id="corporate-enquiry">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Highlights */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF3F6] border border-[#FFA6B6]/30 text-[#A31352]">
              <Building2 className="w-3.5 h-3.5 text-[#FFA6B6]" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Enterprise & Milestone Solutions
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 leading-tight">
              Thoughtful Gifting for Every Business Relationship.
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Strengthen client trust, honor loyalty, and celebrate employees with bespoke executive hampers tailored with your corporate branding by KDF NUTS.
            </p>

            {/* Corporate services bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {[
                "Employee Welcome & Onboarding Kits",
                "Tier-1 Client Appreciation Gifts",
                "Diwali & Festive Hampers",
                "Laser-Engraved Corporate Branding",
                "Volume Discounts & Dedicated Manager",
                "Pan-India Multi-Location Dispatch"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFA6B6] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-stone-100 flex items-center justify-between gap-4 max-w-sm">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#A31352] font-bold">
                  Corporate Concierge Desk
                </p>
                <p className="text-xs font-bold text-stone-800">
                  {BRAND_CONFIG.contact.corporateEmail}
                </p>
              </div>
              <a
                href={`tel:${BRAND_CONFIG.contact.phone}`}
                className="px-4 py-2 rounded-full bg-[#8A67B7] hover:bg-[#694DA1] text-white text-xs font-bold transition-colors shrink-0"
              >
                Call Desk
              </a>
            </div>
          </div>

          {/* Right Column: Quote Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8FC] border border-stone-100 shadow-soft">
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-normal text-stone-900">
                  Request a Corporate Quote
                </h3>
                <p className="text-xs text-stone-500 mt-1 font-sans">
                  Receive a customized digital catalog and quote within 4 business hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-base font-bold text-emerald-950">
                    Inquiry Transmitted Successfully
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Our Corporate Concierge has received your brief and is preparing custom options for {formData.companyName}.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    size="sm"
                    className="mt-1"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {formError && (
                    <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g. Acme Corp"
                        required
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-stone-300 focus:outline-none focus:ring-1 focus:ring-gold text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-stone-300 focus:outline-none focus:ring-1 focus:ring-gold text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="priya@company.com"
                        required
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-stone-300 focus:outline-none focus:ring-1 focus:ring-gold text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-stone-300 focus:outline-none focus:ring-1 focus:ring-gold text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Estimated Quantity
                      </label>
                      <select
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-stone-300 focus:outline-none focus:ring-1 focus:ring-gold text-stone-900"
                      >
                        <option>10 - 25 units</option>
                        <option>25 - 50 units</option>
                        <option>50 - 100 units</option>
                        <option>100+ units</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Budget Range
                      </label>
                      <select
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-stone-300 focus:outline-none focus:ring-1 focus:ring-gold text-stone-900"
                      >
                        <option>₹1,500 - ₹3,000</option>
                        <option>₹3,000 - ₹5,000</option>
                        <option>₹5,000 - ₹8,000</option>
                        <option>₹8,000+ (Ultra Luxury)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Event / Occasion Details
                    </label>
                    <textarea
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about the occasion..."
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-stone-300 focus:outline-none focus:ring-1 focus:ring-gold text-stone-900 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="md"
                    icon={Send}
                    className="w-full font-semibold shadow-sm"
                  >
                    Request Proposal & WhatsApp Catalog
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
