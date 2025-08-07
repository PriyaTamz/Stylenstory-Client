import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";

// Component & Asset Imports
import ProductCard from "../components/product/ProductCard";
import BackGroundImage from "../assets/stylen-bg.jpg";
import PromoBanner from "../assets/promo-banner-bg.png";
import Banner1 from "../assets/banner-bg-1.jpg";
import Banner2 from "../assets/banner-bg-2.jpg";
import Banner3 from "../assets/banner-bg-3.jpg";

// --- Performance Optimizations ---
// 1. Lazy load heavy components
// 2. Reduce animation complexity
// 3. Optimize image loading
// 4. Implement virtualization for product lists

// Static data moved outside component
const slidesData = [
  { bg: Banner1, title: "Unleash Effortless Style", subtitle: "Ultra-soft, trend-forward tees designed to elevate your everyday vibe.", cta: "Explore the Collection" },
  { bg: Banner2, title: "Fresh Drops Weekly", subtitle: "Stay ahead of the curve with new arrivals you won't find anywhere else.", cta: "Browse What's New" },
  { bg: Banner3, title: "Stand Out. Limited Run.", subtitle: "Bold designs. Rare prints. Crafted for those who dare to be different.", cta: "Claim Your Look" },
];

const categoriesData = [
  { name: "Classic Tees", image: "https://www.pngkit.com/png/full/70-707483_sublimation-t-shirt-printing-png.png" },
  { name: "Oversized", image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lo9v24s4ru18e9" },
  { name: "Polos", image: "https://tse4.mm.bing.net/th/id/OIP.-75JWfZHxd-1TZgtoAeY-wHaHa?pid=Api&P=0&h=180" },
  { name: "Long Sleeve", image: "https://static.vecteezy.com/system/resources/previews/035/883/123/non_2x/ai-generated-man-long-sleeve-black-tshirt-isolated-on-transparent-background-free-png.png" },
  { name: "Hoodies", image: "https://webstockreview.net/images/hoodie-clipart-design-12.png" },
];

const benefitsData = [
  { icon: "🚚", title: "Fast Shipping", description: "Get your order in 2-3 business days with our express delivery" },
  { icon: "♻️", title: "Eco-Friendly", description: "Sustainable materials and ethical production practices" },
  { icon: "🔄", title: "Easy Returns", description: "30-day hassle-free returns if you're not completely satisfied" },
  { icon: "✂️", title: "Premium Quality", description: "Durable fabrics that maintain their shape and color wash after wash" },
];

const testimonialsData = [
  { id: 1, name: "Sarah J.", role: "Fashion Blogger", content: "The quality of these tees is unmatched! I've washed them dozens of times and they still look brand new. My go-to for everyday comfort and style.", rating: 5 },
  { id: 2, name: "Michael T.", role: "Frequent Customer", content: "Finally found a brand that gets the fit just right. The oversized collection is perfect - not too baggy but still super comfortable.", rating: 4 },
  { id: 3, name: "Emma L.", role: "Stylist", content: "My clients love how versatile these pieces are. The neutral colors pair perfectly with everything in their wardrobes.", rating: 5 },
];

// Simplified animations
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// --- Optimized Components ---

const HeroSection = React.memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Preload all hero images
  useEffect(() => {
    slidesData.forEach(slide => {
      const img = new Image();
      img.src = slide.bg;
    });
  }, []);

  return (
    <section className="relative overflow-hidden py-40 px-4">
      <div className="absolute inset-0 z-0">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{ 
              backgroundImage: `linear-gradient(to right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.8)), url(${slide.bg})`,
              backgroundBlendMode: "multiply",
              willChange: "opacity" // Optimize for animation
            }}
            aria-hidden={index !== currentSlide}
          />
        ))}
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide} 
            initial="hidden" 
            animate="visible" 
            exit="hidden" 
            transition={{ duration: 0.5 }} 
            className="text-center"
          >
            <motion.h1 variants={textVariants} className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A294F9] to-[#CDC1FF]">{slidesData[currentSlide].title}</span>
            </motion.h1>
            <motion.p variants={textVariants} transition={{ delay: 0.1 }} className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {slidesData[currentSlide].subtitle}
            </motion.p>
            <motion.div variants={textVariants} transition={{ delay: 0.2 }}>
              <Link 
                to="/products" 
                className="inline-block bg-gradient-to-r from-[#C68EFD] to-[#E9A5F1] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {slidesData[currentSlide].cta}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center mt-12 gap-2">
          {slidesData.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentSlide(index)} 
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white w-6" : "bg-gray-400"}`} 
              aria-label={`Go to slide ${index + 1}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
});

const CategoriesSection = React.memo(() => (
  <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <motion.h2 
        initial="hidden" 
        whileInView="visible" 
        variants={fadeIn} 
        transition={{ duration: 0.6 }} 
        viewport={{ once: true, margin: "0px 0px -100px 0px" }} 
        className="text-3xl font-bold text-center text-gray-900 mb-12"
      >
        Shop by Category
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
        {categoriesData.map((cat, idx) => (
          <motion.div 
            key={idx} 
            initial="hidden" 
            whileInView="visible" 
            variants={textVariants} 
            transition={{ duration: 0.4, delay: idx * 0.1 }} 
            viewport={{ once: true, margin: "0px 0px -50px 0px" }} 
            whileHover={{ scale: 1.05 }} 
            className="flex flex-col items-center gap-3 p-5 rounded-lg border hover:shadow-md transition cursor-pointer bg-white/80"
          >
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="w-28 h-28 object-cover" 
              loading="lazy" 
              decoding="async" 
              width="112" 
              height="112"
            />
            <div className="text-sm font-medium text-gray-800">{cat.name}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

const ProductList = React.memo(({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          className="h-full" 
        />
      ))}
    </div>
  );
});

const FeaturedProductsSection = React.memo(({ products }) => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial="hidden" 
          whileInView="visible" 
          variants={fadeIn} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true, margin: "0px 0px -100px 0px" }} 
          className="text-3xl font-bold text-center text-gray-900 mb-12"
        >
          Featured Products
        </motion.h2>
        
        <LazyMotion features={domAnimation}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ staggerChildren: 0.1 }}
            className="w-full"
          >
            <ProductList products={products} />
          </motion.div>
        </LazyMotion>

        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ delay: 0.3 }} 
          viewport={{ once: true }} 
          className="text-center mt-12"
        >
          <Link 
            to="/products" 
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition shadow-md"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

const WhyChooseUsSection = React.memo(() => (
  <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <motion.h2 
        initial="hidden" 
        whileInView="visible" 
        variants={fadeIn} 
        transition={{ duration: 0.6 }} 
        viewport={{ once: true, margin: "0px 0px -100px 0px" }} 
        className="text-3xl font-bold text-center text-gray-900 mb-12"
      >
        Why Choose Our Brand
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefitsData.map((benefit, idx) => (
          <motion.div 
            key={idx} 
            initial="hidden" 
            whileInView="visible" 
            variants={textVariants} 
            transition={{ duration: 0.4, delay: idx * 0.1 }} 
            viewport={{ once: true, margin: "0px 0px -50px 0px" }} 
            whileHover={{ y: -5 }} 
            className="bg-white/80 p-6 rounded-xl text-center shadow-sm"
          >
            <div className="text-4xl mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

const PromoBannerSection = React.memo(() => {
  // Preload the promo banner image
  useEffect(() => {
    const img = new Image();
    img.src = PromoBanner;
  }, []);

  return (
    <section className="relative py-20 px-4 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={PromoBanner} 
          alt="Promo Banner Background" 
          className="w-full h-full object-cover" 
          loading="eager" 
          decoding="async" 
          width="1200" 
          height="400"
        />
        <div className="absolute inset-0 bg-purple-950/40"></div>
      </div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2 
          className="text-3xl font-bold mb-4" 
          initial={{ scale: 0.95 }} 
          whileInView={{ scale: 1 }} 
          transition={{ type: "spring" }} 
          viewport={{ once: true }}
        >
          🎉 Summer Sale - 20% OFF!
        </motion.h2>
        <p className="text-lg md:text-xl mb-6">
          Limited time offer on all t-shirts. Use code <span className="font-bold bg-white/20 px-2 py-1 rounded">SUMMER20</span>
        </p>
        <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
          <Link 
            to="/products" 
            className="inline-block bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Shop the Sale
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

const TestimonialsSection = React.memo(() => (
  <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <motion.h2 
        initial="hidden" 
        whileInView="visible" 
        variants={fadeIn} 
        transition={{ duration: 0.6 }} 
        viewport={{ once: true, margin: "0px 0px -100px 0px" }} 
        className="text-3xl font-bold text-center text-gray-900 mb-12"
      >
        What Our Customers Say
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonialsData.map((testimonial, idx) => (
          <motion.div 
            key={testimonial.id} 
            initial="hidden" 
            whileInView="visible" 
            variants={textVariants} 
            transition={{ duration: 0.4, delay: idx * 0.1 }} 
            viewport={{ once: true, margin: "0px 0px -50px 0px" }} 
            className="bg-white/80 p-6 rounded-xl shadow-sm"
          >
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < testimonial.rating ? "text-amber-400" : "text-gray-300"}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
            <div className="font-medium">
              <p className="text-gray-900">{testimonial.name}</p>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

// --- Main HomePage Component ---

const HomePage = () => {
  const { products } = useProducts();
  
  // Memoize featured products to prevent unnecessary re-renders
  const featuredProducts = useMemo(() => products.slice(0, 8), [products]);

  return (
    <div className="bg-white text-gray-800">
      <HeroSection />

      {/* Optimized background - removed bg-fixed which causes repaint issues */}
      <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${BackGroundImage})` }}>
        <CategoriesSection />
        <FeaturedProductsSection products={featuredProducts} />
        <WhyChooseUsSection />
        <PromoBannerSection />
        <TestimonialsSection />
      </div>
    </div>
  );
};

export default HomePage;