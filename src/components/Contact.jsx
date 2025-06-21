import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function Contact() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="w-full px-6 py-16 text-center max-w-3xl mx-auto"
    >
      <h3 className="text-3xl font-semibold text-cyan-300 mb-4">{t('contact')}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Biće dodata kontakt forma ili informacije uskoro.
      </p>
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-cyan-500 text-black rounded-md hover:bg-cyan-400 transition"
      >
        {t('button')}
      </motion.button>
    </motion.section>
  );
}
