import React, { createContext, useContext, useState } from 'react';
import { BUILDER_BOXES, BUILDER_PACKAGING_OPTIONS } from '../data/builderData';
import { BRAND_CONFIG } from '../config/brand';

const HamperBuilderContext = createContext();

export function HamperBuilderProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBox, setSelectedBox] = useState(BUILDER_BOXES[1]); // Default to Grand Luxe
  const [selectedBoxColor, setSelectedBoxColor] = useState(BUILDER_BOXES[1].colors[0]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedPackaging, setSelectedPackaging] = useState(BUILDER_PACKAGING_OPTIONS[0]);

  const [personalization, setPersonalization] = useState({
    recipientName: '',
    senderName: '',
    occasion: 'Birthday',
    cardMessage: '',
    customMonogram: '',
    deliveryDate: '',
    photoPlaceholder: null
  });

  const [validationErrors, setValidationErrors] = useState({});

  // Item selections handling
  const addItem = (product) => {
    setSelectedItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      const currentCount = prev.reduce((sum, i) => sum + i.quantity, 0);

      if (currentCount >= selectedBox.capacity) {
        return prev; // capacity reached
      }

      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeItem = (productId) => {
    setSelectedItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateItemQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeItem(productId);
      return;
    }

    setSelectedItems(prev => {
      const otherItemsCount = prev
        .filter(item => item.id !== productId)
        .reduce((sum, i) => sum + i.quantity, 0);

      const allowedQty = Math.min(qty, selectedBox.capacity - otherItemsCount);

      return prev.map(item =>
        item.id === productId ? { ...item, quantity: allowedQty } : item
      );
    });
  };

  // Switch box
  const selectBox = (box) => {
    setSelectedBox(box);
    setSelectedBoxColor(box.colors[0]);
    // trim items if exceeding capacity
    setSelectedItems(prev => {
      let count = 0;
      const trimmed = [];
      for (const item of prev) {
        if (count >= box.capacity) break;
        const addQty = Math.min(item.quantity, box.capacity - count);
        trimmed.push({ ...item, quantity: addQty });
        count += addQty;
      }
      return trimmed;
    });
  };

  // Step Validation
  const validateStep = (step) => {
    const errors = {};
    if (step === 1) {
      if (!selectedBox) errors.box = 'Please select a gift box';
    } else if (step === 2) {
      if (selectedItems.length === 0) {
        errors.items = 'Please select at least 2 items to curate your hamper';
      }
    } else if (step === 4) {
      if (!personalization.recipientName.trim()) {
        errors.recipientName = 'Recipient name is required';
      }
      if (!personalization.cardMessage.trim()) {
        errors.cardMessage = 'Please write a personalized note or blessing';
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Financial calculations
  const boxPrice = selectedBox ? selectedBox.price : 0;
  const itemsPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const packagingPrice = selectedPackaging ? selectedPackaging.price : 0;
  const totalHamperPrice = boxPrice + itemsPrice + packagingPrice;
  const itemsCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  // Reset Builder
  const resetBuilder = () => {
    setCurrentStep(1);
    setSelectedBox(BUILDER_BOXES[1]);
    setSelectedBoxColor(BUILDER_BOXES[1].colors[0]);
    setSelectedItems([]);
    setSelectedPackaging(BUILDER_PACKAGING_OPTIONS[0]);
    setPersonalization({
      recipientName: '',
      senderName: '',
      occasion: 'Birthday',
      cardMessage: '',
      customMonogram: '',
      deliveryDate: '',
      photoPlaceholder: null
    });
    setValidationErrors({});
  };

  // Export to WhatsApp
  const generateWhatsAppMessage = () => {
    const itemsList = selectedItems
      .map(i => `• ${i.name} (x${i.quantity}) - ₹${i.price * i.quantity}`)
      .join('\n');

    const msg = `*✨ BESPOKE HAMPER INQUIRY - ABHINANDAN GIFTING ✨*
----------------------------------------
*Box Style:* ${selectedBox.name} (${selectedBoxColor}) - ₹${selectedBox.price}
*Packaging Style:* ${selectedPackaging.name} - ₹${selectedPackaging.price}
*Occasion:* ${personalization.occasion}

*Curated Goodies:*
${itemsList}

*Personalization Details:*
• Recipient: ${personalization.recipientName || 'Not specified'}
• Sender: ${personalization.senderName || 'Not specified'}
• Custom Monogram: ${personalization.customMonogram || 'None'}
• Gift Note: "${personalization.cardMessage || 'None'}"

*Total Estimated Value:* ₹${totalHamperPrice}
----------------------------------------
Kindly confirm availability and courier timeline. Thank you!`;

    return encodeURIComponent(msg);
  };

  const exportToWhatsApp = () => {
    const encoded = generateWhatsAppMessage();
    const url = `https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <HamperBuilderContext.Provider value={{
      currentStep,
      setCurrentStep: goToStep,
      nextStep,
      prevStep,
      selectedBox,
      selectedBoxColor,
      setSelectedBoxColor,
      selectBox,
      selectedItems,
      addItem,
      removeItem,
      updateItemQuantity,
      selectedPackaging,
      setSelectedPackaging,
      personalization,
      setPersonalization,
      validationErrors,
      boxPrice,
      itemsPrice,
      packagingPrice,
      totalHamperPrice,
      itemsCount,
      resetBuilder,
      exportToWhatsApp
    }}>
      {children}
    </HamperBuilderContext.Provider>
  );
}

export function useHamperBuilder() {
  const context = useContext(HamperBuilderContext);
  if (!context) {
    throw new Error('useHamperBuilder must be used within HamperBuilderProvider');
  }
  return context;
}

