// src/pages/admin/OfferManagement.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const OfferManagement = () => {
  const [formData, setFormData] = useState({
    isActive: true,
    campaignName: "Strawberry Chocolate Chikki - Limited Edition",
    headline: "STRAWBERRY CHOCOLATE CHIKKI",
    subheadline: "Premium Artisanal Batch",
    description: "Crafted with single-origin jaggery, premium roasted nuts, and freeze-dried strawberries.\nFinished with high-quality Belgian chocolate coating.",
    displayPrice: "₹199",
    ctaLabel: "Order Now – Limited Stock",
    offerEndDate: "2026-03-31",
    mobileBackgroundFile: null,
    desktopBackgroundFile: null,
    priceTagFile: null,
  });

  const [imagePreviews, setImagePreviews] = useState({
    mobileBackground: '/api/placeholder/360/640?text=Mobile+Banner',
    desktopBackground: '/api/placeholder/1200/500?text=Desktop+Banner',
    priceTag: '/api/placeholder/280/280?text=Price+Tag',
  });

  const [targetTimestamp, setTargetTimestamp] = useState(null);
  const [countdown, setCountdown] = useState({ d:0, h:0, m:0, s:0 });

  useEffect(() => {
    if (formData.offerEndDate) {
      setTargetTimestamp(new Date(formData.offerEndDate).getTime());
    }
  }, [formData.offerEndDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!targetTimestamp) return setCountdown({ d:0, h:0, m:0, s:0 });
      const diff = targetTimestamp - Date.now();
      if (diff <= 0) return setCountdown({ d:0, h:0, m:0, s:0 });
      setCountdown({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e, fieldName, previewKey) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, [fieldName]: file }));
    setImagePreviews(prev => ({ ...prev, [previewKey]: previewUrl }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.group('📦 Offer Campaign Update');
    console.log('Status:', formData.isActive ? 'Active' : 'Inactive');
    console.log('Files to upload:', {
      mobile: formData.mobileBackgroundFile?.name,
      desktop: formData.desktopBackgroundFile?.name,
      priceTag: formData.priceTagFile?.name
    });
    console.groupEnd();
    alert('Campaign settings have been saved successfully.');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-main)] mb-2">Limited Edition Campaign</h1>
          <p className="text-sm sm:text-lg text-[var(--text-muted)]">Manage campaign visibility, content, countdown, and visual assets with precision.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Campaign Status & Basics */}
          <div className="bg-[var(--bg-card)] shadow-md rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent)]/10 border-b border-[var(--accent)]/30">
              <h2 className="text-md sm:text-lg font-semibold text-[var(--primary)]">Campaign Status & Basics</h2>
            </div>
            <div className="p-5 space-y-5">

              {/* Toggle */}
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-700 text-sm sm:text-base">Campaign is active</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="sr-only peer" />
                  <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-300 rounded-full peer peer-checked:bg-[var(--primary)] transition-all"></div>
                  <div className="absolute left-0.5 top-0.5 sm:left-0.5 sm:top-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-md peer-checked:translate-x-5 transition-transform"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Internal Name</label>
                  <input type="text" name="campaignName" value={formData.campaignName} onChange={handleInputChange} className="block w-full rounded-xl border border-gray-300 bg-[var(--bg-soft)] px-3 py-2 sm:px-4 sm:py-2 focus:border-[var(--primary)] focus:ring-[var(--accent)] focus:ring-1 shadow-sm transition text-sm sm:text-base" />
                  <p className="mt-1 text-xs text-gray-400">Internal reference only</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Campaign End Date *</label>
                  <input type="date" name="offerEndDate" value={formData.offerEndDate} onChange={handleInputChange} required className="block w-full rounded-xl border border-gray-300 bg-[var(--bg-soft)] px-3 py-2 sm:px-4 sm:py-2 focus:border-[var(--primary)] focus:ring-[var(--accent)] focus:ring-1 shadow-sm transition text-sm sm:text-base" />
                </div>
              </div>
            </div>
          </div>

          {/* Display Content */}
          <div className="bg-[var(--bg-card)] shadow-md rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent)]/10 border-b border-[var(--accent)]/30">
              <h2 className="text-md sm:text-lg font-semibold text-[var(--primary)]">Display Content</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

              <div className="space-y-4">
                {['headline','subheadline','displayPrice'].map(field => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-600 mb-1">{field==='displayPrice'?'Display Price':field.charAt(0).toUpperCase()+field.slice(1)}</label>
                    <input type="text" name={field} value={formData[field]} onChange={handleInputChange} className="block w-full rounded-xl border border-gray-300 bg-[var(--bg-soft)] px-3 py-2 focus:border-[var(--primary)] focus:ring-[var(--accent)] focus:ring-1 shadow-sm transition text-sm sm:text-base" />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                  <textarea name="description" rows={5} value={formData.description} onChange={handleInputChange} className="block w-full rounded-xl border border-gray-300 bg-[var(--bg-soft)] px-3 py-2 focus:border-[var(--primary)] focus:ring-[var(--accent)] focus:ring-1 shadow-sm transition text-sm sm:text-base"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">CTA Button Text</label>
                  <input type="text" name="ctaLabel" value={formData.ctaLabel} onChange={handleInputChange} className="block w-full rounded-xl border border-gray-300 bg-[var(--bg-soft)] px-3 py-2 focus:border-[var(--primary)] focus:ring-[var(--accent)] focus:ring-1 shadow-sm transition text-sm sm:text-base" />
                </div>
              </div>
            </div>
          </div>

          {/* Visual Assets */}
          <div className="bg-[var(--bg-card)] shadow-md rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent)]/10 border-b border-[var(--accent)]/30">
              <h2 className="text-md sm:text-lg font-semibold text-[var(--primary)]">Visual Assets</h2>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {['mobileBackground','desktopBackground','priceTag'].map(key => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{key==='priceTag'?'Price Tag':key==='desktopBackground'?'Desktop Banner':'Mobile Banner'}</label>
                  <label className="relative block rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-[var(--primary)] cursor-pointer group transition-all">
                    <div className={`w-full ${key==='mobileBackground'?'aspect-[3/4] sm:aspect-[3/4]':key==='desktopBackground'?'aspect-[21/9] sm:aspect-[21/9]':'aspect-square'} bg-gray-100 rounded-2xl overflow-hidden`}>
                      <img src={imagePreviews[key]} alt="preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                        <span className="px-3 py-1 text-white text-xs sm:text-sm font-medium rounded-lg bg-black/50">Change Image</span>
                      </div>
                    </div>
                    <input type="file" accept="image/*" onChange={(e)=>handleFileChange(e, `${key}File`, key)} className="hidden" />
                  </label>
                  <p className="text-xs text-gray-400">{key==='mobileBackground'?'360×640':key==='desktopBackground'?'1920×800':'300×300'} px · max 2MB</p>
                </div>
              ))}
            </div>
          </div>

          {/* Countdown & Actions */}
          <div className="bg-[var(--bg-card)] shadow-md rounded-2xl border border-gray-200 p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 sm:gap-6 overflow-x-auto">
            <div className="flex gap-2 sm:gap-4">
              {Object.entries(countdown).map(([unit,value])=>(
                <div key={unit} className="text-center bg-[var(--accent)]/20 px-3 sm:px-4 py-2 rounded-xl min-w-[50px] sm:min-w-[64px]">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-[var(--primary)]">{value.toString().padStart(2,'0')}</div>
                  <div className="text-xs sm:text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mt-0.5">{unit}</div>
                </div>
              ))}
            </div>
            <div className="flex-shrink-0 mt-2 md:mt-0">
              <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}} type="submit" className="px-6 sm:px-8 py-2 sm:py-3 bg-[var(--primary)] text-white font-medium rounded-xl hover:bg-[var(--primary)]/90 transition text-sm sm:text-base w-full md:w-auto">Save Changes</motion.button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default OfferManagement;
