import { useEffect, useState } from 'react';
import api from '../services/api';
import MapView from '../components/MapView';
import socket from '../socket';
import useStore from '../store/store';
import { motion } from 'framer-motion';
import ProviderCard from '../components/ProviderCard';
import Notifications from '../components/Notifications'; // floating notification panel

export default function Home() {
  const { user } = useStore();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [providers, setProviders] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await api.get('/categories');
      const allCategories = [
        ...res.data,
        { _id: '13', name: 'Gardening' },
        { _id: '14', name: 'Pet Care' },
        { _id: '15', name: 'Home Decor' },
        { _id: '16', name: 'Fitness & Yoga' },
      ];
      setCategories(allCategories);
      setSelectedCategory(allCategories[0]?.name);
    };
    fetchCategories();
  }, []);

  // Fetch providers
  useEffect(() => {
    const fetchProviders = async () => {
      if (!selectedCategory) return;
      const res = await api.get(`/providers?category=${selectedCategory}`);
      setProviders(res.data);
    };
    fetchProviders();
  }, [selectedCategory]);

  return (
    <div className="bg-gradient-to-b from-teal-400 via-cyan-300 to-blue-200 min-h-screen">

      {/* ================= Navbar ================= */}
      <div className="bg-white/90 backdrop-blur-md p-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="h-10 w-10 rounded-full" />
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide">LocalHero</h1>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-1 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition">Sign In</button>
          <button className="px-4 py-1 rounded-lg font-semibold bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white hover:from-blue-500 hover:to-teal-500 transition">Sign Up</button>
        </div>
      </div>

      {/* ================= Notifications ================= */}
      <Notifications />

      {/* ================= Problem Statement ================= */}
      <div className="px-6 py-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Got a Problem at Home?</h2>
        <p className="text-gray-800 text-lg max-w-2xl mx-auto">
          Finding trusted service providers for electricity, plumbing, cleaning, or other home tasks can be frustrating.  
          You never know who is reliable, who arrives on time, or who charges fairly.
        </p>
      </div>

      {/* ================= Easy Solution ================= */}
      <div className="px-6 py-12 text-center bg-white/80 backdrop-blur-md rounded-2xl mx-6 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">LocalHero Makes it Easy</h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          Choose your problem category, browse verified nearby providers, book instantly or schedule a service, and track them live on the map.  
          Chat directly with the provider and enjoy hassle-free home solutions!
        </p>
      </div>

      {/* ================= Top Four Cards ================= */}
      <div className="px-6 py-10 grid md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-teal-300 via-cyan-200 to-blue-300 hover:shadow-2xl transition">
          <h3 className="font-bold text-xl mb-2 text-gray-900">Verified Providers</h3>
          <p className="text-gray-800">All providers are verified for quality and reliability.</p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-yellow-200 via-green-200 to-teal-200 hover:shadow-2xl transition">
          <h3 className="font-bold text-xl mb-2 text-gray-900">Real-time Tracking</h3>
          <p className="text-gray-800">See exactly where your provider is and when they’ll arrive.</p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 hover:shadow-2xl transition">
          <h3 className="font-bold text-xl mb-2 text-gray-900">24/7 Support</h3>
          <p className="text-gray-800">We are available anytime to help you with bookings or issues.</p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-blue-200 via-cyan-200 to-teal-200 hover:shadow-2xl transition">
          <h3 className="font-bold text-xl mb-2 text-gray-900">Easy Booking</h3>
          <p className="text-gray-800">Instantly book or schedule services with just a few clicks.</p>
        </div>
      </div>

      {/* ================= Categories Horizontal Scroll ================= */}
      <div className="flex overflow-x-auto gap-4 py-4 px-6">
        {categories.map(c => (
          <motion.div
            key={c._id}
            className={`flex-shrink-0 px-6 py-3 rounded-full cursor-pointer font-semibold transition
              ${selectedCategory === c.name ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white shadow-lg' 
                : 'bg-white/70 backdrop-blur-md text-gray-900 hover:shadow-md'}`}
            onClick={() => setSelectedCategory(c.name)}
            whileHover={{ scale: 1.05 }}
          >
            {c.name}
          </motion.div>
        ))}
      </div>

      {/* ================= Map ================= */}
      <div className="w-full h-[60vh] md:h-[80vh] px-6">
        <MapView category={selectedCategory} />
      </div>

      {/* ================= Nearby Providers ================= */}
      <div className="px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Nearby Providers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.length === 0 && <p className="text-gray-600">No providers found</p>}
          {providers.map(p => <ProviderCard key={p._id} provider={p} />)}
        </div>
      </div>

      {/* ================= Footer ================= */}
      <div className="py-6 text-center text-gray-700">
        &copy; {new Date().getFullYear()} LocalHero. All rights reserved.
      </div>

    </div>
  );
}