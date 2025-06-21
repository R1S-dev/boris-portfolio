import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { scroller } from 'react-scroll';

export default function Contact() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const wheelHandlerRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true });

  const handlers = useSwipeable({
    onSwipedDown: () =>
      scroller.scrollTo('projects', { duration: 600, smooth: true, offset: -60 }),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  useEffect(() => {
    const el = sectionRef.current;

    const handleWheel = (e) => {
      if (e.deltaY < -10) {
        e.preventDefault();
        scroller.scrollTo('projects', { duration: 600, smooth: true, offset: -60 });
      }
    };

    wheelHandlerRef.current = handleWheel;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('wheel', wheelHandlerRef.current, { passive: false });
        } else {
          window.removeEventListener('wheel', wheelHandlerRef.current);
        }
      },
      { threshold: 0.6 }
    );

    if (el) observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', wheelHandlerRef.current);
    };
  }, []);

  return (
    <div
      id="contact"
      ref={sectionRef}
      {...handlers}
      style={{ touchAction: 'pan-y' }}
    >
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="min-h-screen w-full px-6 pt-16 pb-24 text-center max-w-3xl mx-auto flex flex-col justify-between"
      >
        <div className="flex-grow flex flex-col justify-center items-center">
          <h3 className="text-4xl font-bold mb-6 font-orbitron bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-red-500 dark:to-rose-500 text-transparent bg-clip-text">
            {t('contact')}
          </h3>

          <p className="text-gray-700 dark:text-gray-400 mb-10 text-lg font-inter max-w-xl">
            Ako želiš da me kontaktiraš, klikni na dugme ispod i otvoriće ti se email klijent sa pripremljenom porukom.
          </p>

          <motion.a
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            href="mailto:jankoovicbooris@gmail.com?subject=Kontakt%20sa%20portfolia&body=Pozdrav%2C%0A%0AŽelim da..."
            className="inline-block px-8 py-3 rounded-xl text-white font-semibold
            bg-blue-500 dark:bg-red-500 hover:bg-blue-400 dark:hover:bg-red-400
            transition-colors duration-300 shadow-md"
          >
            {t('button') || 'Pošalji poruku'}
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
