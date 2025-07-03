import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="w-full h-[40vh] bg-gradient-to-r from-blue-100 via-white to-pink-100 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            About <span className="text-red-500">Stylenstory</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Redefining everyday fashion with premium-quality T-shirts designed for comfort, sustainability, and style.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Founded in 2023, Stylenstore started with one simple idea: create the perfect T-shirt. After years of trying to find the right fit, fabric, and price — we decided to build it ourselves.
        </p>
        <p className="text-gray-700 leading-relaxed">
          From our humble beginnings to a growing online community, we remain committed to ethical practices, sustainable materials, and great design.
        </p>
      </div>

      {/* Our Materials Section */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Materials</h2>
          <p className="text-lg text-gray-600">
            All our T-shirts are made from 100% organic cotton, carefully sourced and designed to last. No harsh chemicals. No fast fashion shortcuts. Just quality you can feel.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Mission</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold mb-2 text-blue-500">Premium Quality</h3>
            <p className="text-gray-600">
              Every product is crafted with care, tested for durability, and designed for all-day comfort.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold mb-2 text-green-500">Ethical Manufacturing</h3>
            <p className="text-gray-600">
              We partner with fair-trade facilities that ensure safety, respect, and fair wages for workers.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold mb-2 text-yellow-500">Fair Pricing</h3>
            <p className="text-gray-600">
              No middlemen. No markups. Just high-quality basics at prices that make sense.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
