// FeaturesSection.jsx
import React from 'react';

export default function FeaturesSection() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 lg:gap-32">
          {/* Free Shipping */}
          <div className="flex items-start gap-4 max-w-xs">
            <svg className="w-10 h-10 text-orange-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 6h-4.278a2.5 2.5 0 0 0-4.944 0H3a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1zM12 3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6 12.5v-5h12v5H6z"/>
            </svg>
            <div>
              <h3 className="text-gray-900 font-semibold text-lg">Free Shipping</h3>
              <p className="text-gray-600 text-base mt-1">Free shipping for order above $180</p>
            </div>
          </div>

          {/* Flexible Payment */}
          <div className="flex items-start gap-4 max-w-xs">
            <svg className="w-10 h-10 text-orange-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1 .9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 10H5c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1z"/>
              <path d="M19 13h-4c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1z"/>
            </svg>
            <div>
              <h3 className="text-gray-900 font-semibold text-lg">Flexible Payment</h3>
              <p className="text-gray-600 text-base mt-1">Multiple secure payment options</p>
            </div>
          </div>

          {/* 24x7 Support */}
          <div className="flex items-start gap-4 max-w-xs">
            <svg className="w-10 h-10 text-orange-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v2c0 .55.45 1 1 1h.5c.25 0 .5-.12.68-.33l2.15-2.67H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-9 13H9v-2h2v2zm2-4H9V5h6v6z"/>
            </svg>
            <div>
              <h3 className="text-gray-900 font-semibold text-lg">24x7 Support</h3>
              <p className="text-gray-600 text-base mt-1">We support online all days.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}