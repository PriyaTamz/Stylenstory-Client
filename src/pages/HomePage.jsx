import { Link } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import { useProducts } from "../context/ProductContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import BackGroundImage from "../assets/Stylen-bg.jpg";
import PromoBanner from "../assets/promo-banner-bg.png";
import Banner1 from "../assets/banner-bg-1.jpg";
import Banner2 from "../assets/banner-bg-2.jpg";
import Banner3 from "../assets/banner-bg-3.jpg";

const HomePage = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 8);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides data with different content for each
  const slides = [
    {
      bg:Banner1,
      title: "Unleash Effortless Style",
      subtitle:
        "Ultra-soft, trend-forward tees designed to elevate your everyday vibe.",
      cta: "Explore the Collection",
    },
    {
      bg: Banner2,
      title: "Fresh Drops Weekly",
      subtitle:
        "Stay ahead of the curve with new arrivals you won't find anywhere else.",
      cta: "Browse What's New",
    },
    {
      bg: Banner3,
      title: "Stand Out. Limited Run.",
      subtitle:
        "Bold designs. Rare prints. Crafted for those who dare to be different.",
      cta: "Claim Your Look",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah J.",
      role: "Fashion Blogger",
      content:
        "The quality of these tees is unmatched! I've washed them dozens of times and they still look brand new. My go-to for everyday comfort and style.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael T.",
      role: "Frequent Customer",
      content:
        "Finally found a brand that gets the fit just right. The oversized collection is perfect - not too baggy but still super comfortable.",
      rating: 4,
    },
    {
      id: 3,
      name: "Emma L.",
      role: "Stylist",
      content:
        "My clients love how versatile these pieces are. The neutral colors pair perfectly with everything in their wardrobes.",
      rating: 5,
    },
  ];

  // Benefits data
  const benefits = [
    {
      icon: "🚚",
      title: "Fast Shipping",
      description:
        "Get your order in 2-3 business days with our express delivery",
    },
    {
      icon: "♻️",
      title: "Eco-Friendly",
      description: "Sustainable materials and ethical production practices",
    },
    {
      icon: "🔄",
      title: "Easy Returns",
      description:
        "30-day hassle-free returns if you're not completely satisfied",
    },
    {
      icon: "✂️",
      title: "Premium Quality",
      description:
        "Durable fabrics that maintain their shape and color wash after wash",
    },
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const textVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="bg-white text-gray-800 ">
      {/* Hero Section - Normal Height */}
      <section className="relative overflow-hidden py-40 px-4">
        {/* Background carousel */}
        <div className="absolute inset-0 z-0 ">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000  ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `linear-gradient(to right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.8)), url(${slide.bg})`,
                backgroundBlendMode: "multiply",
              }}
            />
          ))}
        </div>

        {/* Content with different text for each slide */}
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h1
                variants={textVariants}
                className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A294F9] to-[#CDC1FF]">
                  {slides[currentSlide].title}
                </span>
              </motion.h1>

              <motion.p
                variants={textVariants}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              <motion.div variants={textVariants} transition={{ delay: 0.2 }}>
                <Link
                  to="/products"
                  className="inline-block bg-gradient-to-r from-[#C68EFD] to-[#E9A5F1] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {slides[currentSlide].cta}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel indicators */}
          <div className="flex justify-center mt-12 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? "bg-white w-6" : "bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content with Background Image */}
      <div
        className="bg-fixed bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BackGroundImage})` }}
      >
        {/* Categories Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center text-gray-900 mb-12"
            >
              Shop by Category
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
              {[
                {
                  name: "Classic Tees",
                  image:
                    "https://www.pngkit.com/png/full/70-707483_sublimation-t-shirt-printing-png.png",
                },
                {
                  name: "Oversized",
                  image:
                    "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lo9v24s4ru18e9",
                },
                {
                  name: "Polos",
                  image:
                    "https://tse4.mm.bing.net/th/id/OIP.-75JWfZHxd-1TZgtoAeY-wHaHa?pid=Api&P=0&h=180",
                },
                {
                  name: "Long Sleeve",
                  image:
                    "https://static.vecteezy.com/system/resources/previews/035/883/123/non_2x/ai-generated-man-long-sleeve-black-tshirt-isolated-on-transparent-background-free-png.png",
                },
                {
                  name: "Hoodies",
                  image:
                    "https://webstockreview.net/images/hoodie-clipart-design-12.png",
                },
              ].map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-3 p-5 rounded-lg border hover:shadow-md transition cursor-pointer bg-white/80"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-28 h-28 object-cover"
                  />
                  <div className="text-sm font-medium text-gray-800">
                    {cat.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center text-gray-900 mb-12"
            >
              Featured Products
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

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

        {/* Why Choose Us Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center text-gray-900 mb-12"
            >
              Why Choose Our Brand
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white/80 p-6 rounded-xl text-center shadow-sm"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative py-25 px-4 text-white overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={PromoBanner}
              alt="Promo Banner Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0   "></div>
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.h2
              className="text-3xl font-bold mb-4 "
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring" }}
              viewport={{ once: true }}
            >
              🎉 Summer Sale - 20% OFF!
            </motion.h2>

            <p className="text-lg md:text-xl mb-6">
              Limited time offer on all t-shirts. Use code{" "}
              <span className="font-bold bg-white/20 px-2 py-1 rounded">
                SUMMER20
              </span>
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
        </motion.section>

        {/* Testimonials Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center text-gray-900 mb-12"
            >
              What Our Customers Say
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 p-6 rounded-xl shadow-sm"
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "text-amber-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="font-medium">
                    <p className="text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
