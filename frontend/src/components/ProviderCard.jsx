import { motion } from 'framer-motion';

export default function ProviderCard({ provider }) {
  return (
    <motion.div
      className="p-4 rounded-2xl shadow-lg backdrop-blur-md bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 transition cursor-pointer hover:shadow-2xl hover:scale-105"
      whileHover={{ scale: 1.05 }}
    >
      {/* Provider Name */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{provider.name}</h3>

      {/* Services */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{provider.services.join(', ')}</p>

      {/* Rating Badge */}
      <div className="mt-2 inline-flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 shadow-md">
          ⭐ {provider.rating || 'N/A'}
        </span>
      </div>

      {/* Book Button */}
      <motion.button
        className="mt-4 w-full py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shadow-lg hover:from-pink-400 hover:via-purple-400 hover:to-blue-400 transition"
        whileHover={{ scale: 1.05 }}
      >
        Book Now
      </motion.button>
    </motion.div>
  );
}