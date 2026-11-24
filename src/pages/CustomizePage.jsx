import React from 'react';
import { useHamperBuilder } from '../context/HamperBuilderContext';
import { BRAND_CONFIG } from '../config/brand';
import Step1ChooseBox from '../components/customization/Step1ChooseBox';
import Step2ChooseItems from '../components/customization/Step2ChooseItems';
import Step3ChoosePackaging from '../components/customization/Step3ChoosePackaging';
import Step4Personalization from '../components/customization/Step4Personalization';
import Step5Review from '../components/customization/Step5Review';
import HamperLivePreview from '../components/customization/HamperLivePreview';
import Button from '../components/common/Button';
import { Sparkles, ArrowLeft, ArrowRight, Check, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomizePage() {
  const {
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    totalHamperPrice,
    itemsCount,
    selectedBox
  } = useHamperBuilder();

  const navigate = useNavigate();

  const steps = [
    { num: 1, label: 'Box Style' },
    { num: 2, label: 'Curate Treats' },
    { num: 3, label: 'Packaging' },
    { num: 4, label: 'Personalize' },
    { num: 5, label: 'Review' },
  ];

  return (
    <div className="min-h-screen bg-cream-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-light border border-gold/30 shadow-soft">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
              Interactive Hamper Studio
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-chocolate tracking-tight">
            Design Your Bespoke Gift Hamper
          </h1>

          <p className="text-xs sm:text-sm text-chocolate/75 max-w-xl mx-auto leading-relaxed">
            Personalize every component of your gift. From the rigid keepsake chest and artisanal treats to the French satin ribbon and gold-stamped stationery.
          </p>
        </div>

        {/* Stepper Navigation Indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-cream-300 -translate-y-1/2 -z-0" />
            <div
              className="absolute top-1/2 left-6 h-[2px] bg-gold -translate-y-1/2 -z-0 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 90}%` }}
            />

            {steps.map((step) => {
              const isPassed = currentStep > step.num;
              const isCurrent = currentStep === step.num;

              return (
                <button
                  key={step.num}
                  onClick={() => {
                    // Only allow navigating backwards or if completed
                    if (step.num < currentStep) setCurrentStep(step.num);
                  }}
                  className={`flex flex-col items-center group relative z-10 focus:outline-none ${
                    step.num <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                  }`}
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 shadow-soft border-2 ${
                      isPassed
                        ? 'bg-gold border-gold text-white'
                        : isCurrent
                        ? 'bg-cream-50 border-gold text-burgundy ring-4 ring-gold/20 scale-110'
                        : 'bg-cream-200 border-cream-300 text-chocolate/50'
                    }`}
                  >
                    {isPassed ? <Check className="w-5 h-5 stroke-[3]" /> : step.num}
                  </div>
                  <span
                    className={`mt-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-center hidden sm:block ${
                      isCurrent ? 'text-burgundy font-bold' : 'text-chocolate/60'
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Workspace: Left Steps & Right Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Step Panel (Col span 7) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-cream-50 shadow-luxury border border-gold/25 min-h-[500px]">
              {currentStep === 1 && <Step1ChooseBox />}
              {currentStep === 2 && <Step2ChooseItems />}
              {currentStep === 3 && <Step3ChoosePackaging />}
              {currentStep === 4 && <Step4Personalization />}
              {currentStep === 5 && <Step5Review onFinish={() => navigate('/')} />}
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              {currentStep > 1 ? (
                <Button
                  onClick={prevStep}
                  variant="outline"
                  size="md"
                  icon={ArrowLeft}
                  className="shadow-sm"
                >
                  Previous Step
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 5 && (
                <Button
                  onClick={nextStep}
                  variant="gold"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="shadow-medium font-bold"
                >
                  Continue to Step {currentStep + 1}
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Live Interactive Hamper Preview (Col span 5) */}
          <div className="lg:col-span-5">
            <HamperLivePreview />
          </div>

        </div>

      </div>
    </div>
  );
}

