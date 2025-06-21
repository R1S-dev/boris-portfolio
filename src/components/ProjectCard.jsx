import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectCard({ id, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="relative bg-white dark:bg-[#0f1117] p-6 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-md hover:shadow-lg transition-all group"
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none
        border-2 border-transparent group-hover:border-blue-400
        dark:group-hover:border-red-500 transition-all duration-300"
      />

      <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white font-orbitron">
        {title || `Projekat #${id}`}
      </h4>

      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {description || 'Placeholder opis projekta sa tehnologijama i detaljima.'}
      </p>
    </motion.div>
  );
}
