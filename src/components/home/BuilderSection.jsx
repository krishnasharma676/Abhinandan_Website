import React from 'react';
import { useHamperBuilder } from '../../context/HamperBuilderContext';
import { BRAND_CONFIG } from '../../config/brand';
import Step1ChooseBox from '../customization/Step1ChooseBox';
import Step2ChooseItems from '../customization/Step2ChooseItems';
import Step3ChoosePackaging from '../customization/Step3ChoosePackaging';
import Step4Personalization from '../customization/Step4Personalization';
import Step5Review from '../customization/Step5Review';
import HamperLivePreview from '../customization/HamperLivePreview';
import Button from '../common/Button';
import { Sparkles, ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function BuilderSection() {
  const {
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
  } = useHamperBuilder();

  const steps = [
    { num: 1, label: 'Box Style' },
    { num: 2, label: 'Curate Treats' },
    { num: 3, label: 'Packaging' },
    { num: 4, label: 'Personalize' },
    { num: 5, label: 'Review & Send' },
  ];

  return (
    <section id="customize" className="py-16 sm:py-24 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title - Chely Style */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FAF3F6] border border-[#FFA6B6]/30 text-[#A31352]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFA6B6]" />
            <span className="text-xs font-bold uppercase tracking-wider font-sans">
              Interactive Hamper Studio
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Design Your Bespoke Hamper
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed font-sans">
            Select your basket style, golden potlis, dry fruit jars, and pearl embellishments. Get instant estimates and confirm via WhatsApp.
          </p>
        </div>

        {/* Stepper Navigation Indicator */}
        <div className="max-w-3xl mx-auto mb-10 font-sans">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-[#FAF8FC] -translate-y-1/2 -z-0" />
            <div
              className="absolute top-1/2 left-6 h-[2px] bg-[#FFA6B6] -translate-y-1/2 -z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 88}%` }}
            />

            {steps.map((step) => {
              const isDone = currentStep > step.num;
              const isCurrent = currentStep === step.num;

              return (
                <button
                  key={step.num}
                  onClick={() => isDone && setCurrentStep(step.num)}
                  disabled={!isDone && !isCurrent}
                  className={`flex flex-col items-center group relative z-10 ${
                    isDone ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 border-2 ${
                      isCurrent
                        ? 'bg-[#FFA6B6] text-white border-[#FFA6B6] ring-4 ring-[#FFA6B6]/20 scale-110 shadow-sm'
                        : isDone
                        ? 'bg-[#8A67B7] text-white border-[#8A67B7]'
                        : 'bg-white text-stone-400 border-stone-200 group-hover:border-stone-300'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-2 transition-colors ${
                      isCurrent
                        ? 'text-[#FFA6B6]'
                        : isDone
                        ? 'text-[#8A67B7]'
                        : 'text-stone-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Builder Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Step Controls (Col span 7) */}
          <div className="lg:col-span-7 bg-[#FAF8FC] rounded-3xl p-5 sm:p-7 border border-stone-100 shadow-soft">
            <div className="min-h-[420px]">
              {currentStep === 1 && <Step1ChooseBox />}
              {currentStep === 2 && <Step2ChooseItems />}
              {currentStep === 3 && <Step3ChoosePackaging />}
              {currentStep === 4 && <Step4Personalization />}
              {currentStep === 5 && <Step5Review />}
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="mt-8 pt-5 border-t border-stone-200/60 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-6 py-2.5 rounded-full bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider border border-stone-200 shadow-sm transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 && (
                <button
                  onClick={nextStep}
                  className="px-7 py-2.5 rounded-full bg-[#FFA6B6] hover:bg-[#FF8E9E] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Live Hamper Preview (Col span 5) */}
          <div className="lg:col-span-5 sticky top-24">
            <HamperLivePreview />
          </div>

        </div>

      </div>
    </section>
  );
}
