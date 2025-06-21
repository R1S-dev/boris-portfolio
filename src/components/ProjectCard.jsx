import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectCard({ id, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-gray-100 dark:bg-[#161b22] p-6 rounded-xl border border-gray-300 dark:border-gray-700 shadow-md"
    >
      <h4 className="text-xl font-bold mb-2 text-black dark:text-white">{title || `Projekat #${id}`}</h4>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {description || "Placeholder opis projekta sa tehnologijama i detaljima."}
      </p>
    </motion.div>
  );
}
