import React from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-100 via-white to-blue-100 py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Contact <span className="text-primary">Stylenstore</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Have a question or want to reach out about our latest T-shirt collection? We'd love to hear from you!
        </p>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form className="space-y-6 shadow-xl p-8 rounded-2xl border border-gray-200 bg-white">
          <h2 className="text-2xl font-semibold text-gray-800">Send Us a Message</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <FiPhone className="text-2xl text-primary" />
            <div>
              <p className="text-sm text-gray-500">Call Us</p>
              <p className="font-semibold text-gray-800">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FiMail className="text-2xl text-primary" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800">support@stylenstore.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FiMapPin className="text-2xl text-primary" />
            <div>
              <p className="text-sm text-gray-500">Visit Us</p>
              <p className="font-semibold text-gray-800">123 T-Shirt Street, Fashion City, IN</p>
            </div>
          </div>

          {/* Embedded map or store image placeholder */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://source.unsplash.com/600x300/?clothing-store"
              alt="Store location"
              className="w-full h-60 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
