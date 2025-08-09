import React from 'react';

export default function Hero() {
  return (
    <section className="bg-white text-center py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Vind de beste deal voor jouw favoriete beautyproducten.
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Vergelijk prijzen van alle grote webshops en mis nooit meer een aanbieding.
        </p>
        {/* De zoekbalk wordt nu centraal beheerd in de Header */}
      </div>
    </section>
  );
}
