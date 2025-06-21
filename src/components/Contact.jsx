import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function Contact() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true });

  const mailtoLink = `mailto:jankoovicbooris@gmail.com?subject=Kontakt%20sa%20portfolia&body=Pozdrav%2C%0A%0AŽelim da...`;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="w-full px-6 py-20 text-center max-w-3xl mx-auto"
    >
      <h3 className="text-4xl font-bold mb-6 font-orbitron bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-red-500 dark:to-rose-500 text-transparent bg-clip-text">
        {t('contact')}
      </h3>

      <p className="text-gray-700 dark:text-gray-400 mb-8 text-lg font-inter">
        Ako želiš da me kontaktiraš, klikni na dugme ispod i otvoriće ti se email klijent sa pripremljenom porukom.
      </p>

      <motion.a
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        href={mailtoLink}
        className="inline-block px-8 py-3 rounded-xl text-white font-semibold
        bg-blue-500 dark:bg-red-500 hover:bg-blue-400 dark:hover:bg-red-400
        transition-colors duration-300 shadow-md"
      >
        {t('button') || 'Pošalji poruku'}
      </motion.a>
    </motion.section>
  );
}
