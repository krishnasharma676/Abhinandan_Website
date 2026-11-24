import React from 'react';
import { useHamperBuilder } from '../../context/HamperBuilderContext';
import { OCCASIONS_DATA } from '../../data/categories';
import { PenTool, Heart, Sparkles, Upload, AlertCircle } from 'lucide-react';

export default function Step4Personalization() {
  const { personalization, setPersonalization, validationErrors } = useHamperBuilder();

  const handleChange = (e) => {
    setPersonalization({
      ...personalization,
      [e.target.name]: e.target.value
    });
  };

  const sampleMessages = [
    "Wishing you a year filled with infinite joy, laughter, and sweet indulgences. Happy Birthday!",
    "Happy Anniversary! May each passing year deepen the love, wonder, and friendship you share.",
    "With deepest gratitude for your partnership and leadership. Warm wishes for continued success."
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl font-bold text-chocolate">
          Step 4: Personalization & Blessing Note
        </h3>
        <p className="text-xs sm:text-sm text-chocolate/70 mt-1">
          Every Abhinandan hamper includes a hand-lettered gold-foiled stationery note card printed on heavy 300 GSM textured Italian cardstock.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-cream-50 border border-gold/30 shadow-soft space-y-5">
        
        {/* Recipient and Sender Names */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-chocolate mb-1.5">
              Recipient Name *
            </label>
            <input
              type="text"
              name="recipientName"
              value={personalization.recipientName}
              onChange={handleChange}
              placeholder="e.g. Radhika Roy"
              required
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-cream-100 border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold text-chocolate"
            />
            {validationErrors.recipientName && (
              <p className="text-[11px] text-red-600 font-semibold mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationErrors.recipientName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-chocolate mb-1.5">
              Sender Name (From)
            </label>
            <input
              type="text"
              name="senderName"
              value={personalization.senderName}
              onChange={handleChange}
              placeholder="e.g. Sameer & Family"
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-cream-100 border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold text-chocolate"
            />
          </div>
        </div>

        {/* Occasion and Monogram Initials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-chocolate mb-1.5">
              Occasion
            </label>
            <select
              name="occasion"
              value={personalization.occasion}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-cream-100 border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold text-chocolate"
            >
              {OCCASIONS_DATA.map((occ) => (
                <option key={occ.id} value={occ.title}>
                  {occ.title}
                </option>
              ))}
              <option value="Just Because">Just Because & Love</option>
              <option value="Festive Blessing">Festive Blessing</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-chocolate mb-1.5">
              Custom Monogram / Wax Seal Initials (Optional)
            </label>
            <input
              type="text"
              name="customMonogram"
              maxLength={3}
              value={personalization.customMonogram}
              onChange={handleChange}
              placeholder="e.g. RR (up to 3 letters)"
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-cream-100 border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold text-chocolate uppercase"
            />
          </div>
        </div>

        {/* Gift Card Message */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-chocolate">
              Personalized Blessing Note *
            </label>
            <span className="text-[11px] text-chocolate/50">
              {personalization.cardMessage.length}/350 chars
            </span>
          </div>

          <textarea
            name="cardMessage"
            rows={4}
            maxLength={350}
            value={personalization.cardMessage}
            onChange={handleChange}
            placeholder="Write your heartfelt blessing, memories, or wishes here. Our calligrapher will hand-letter or foil-stamp this onto your card..."
            className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-cream-100 border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold text-chocolate resize-none"
          />

          {validationErrors.cardMessage && (
            <p className="text-[11px] text-red-600 font-semibold mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {validationErrors.cardMessage}
            </p>
          )}

          {/* Message Prompts / Ideas */}
          <div className="mt-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-dark block mb-1.5">
              Inspiration Prompts (Click to Use):
            </span>
            <div className="flex flex-col gap-1.5">
              {sampleMessages.map((msg, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPersonalization({ ...personalization, cardMessage: msg })}
                  className="text-left text-xs p-2 rounded-lg bg-cream-200/60 hover:bg-gold/15 text-chocolate/80 hover:text-chocolate transition-colors border border-cream-300/60"
                >
                  "{msg}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Optional Custom Photo upload placeholder */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-chocolate mb-1.5">
            Optional Commemorative Photo for Memory Card
          </label>
          <div className="border-2 border-dashed border-gold/40 rounded-2xl p-4 text-center bg-cream-100 hover:bg-cream-200 transition-colors cursor-pointer">
            <Upload className="w-6 h-6 text-gold mx-auto mb-1" />
            <p className="text-xs text-chocolate/80 font-medium">
              Click to browse or drop an image file
            </p>
            <p className="text-[10px] text-chocolate/50 mt-0.5">
              JPG or PNG up to 10MB (We print high-res 4x6 polaroid-style keepsake inserts)
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

