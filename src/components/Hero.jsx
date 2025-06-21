import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import StarsCanvas from './StarsCanvas';
import { Github, Mail, Instagram, ChevronUp } from 'lucide-react';
import { scroller } from 'react-scroll';
import { useSwipeable } from 'react-swipeable';
import MaskImage from '../assets/mask.png';

export default function Hero() {
  const { t } = useTranslation();
  const { darkMode } = useContext(ThemeContext);

  const accentColor = darkMode ? '#ef4444' : '#3b82f6';
  const accentGradient = darkMode
    ? 'from-red-500 via-red-400 to-rose-500'
    : 'from-blue-500 via-cyan-400 to-sky-500';

  const swipeHandlers = useSwipeable({
    onSwipedUp: () =>
      scroller.scrollTo('about', { smooth: true, duration: 600, offset: -60 }),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  return (
    <section
      id="hero"
      {...swipeHandlers}
      className="relative w-full min-h-screen -mt-20 flex items-center justify-center px-6 sm:px-10 overflow-hidden"
    >
      <StarsCanvas darkMode={darkMode} />

      <div className="absolute top-[50%] left-[50%] w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px] bg-accentLight dark:bg-accentDark opacity-[0.04] z-0" />

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-10 items-center pt-10 sm:pt-20">
        <div className="text-center sm:text-left">
          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${accentGradient} font-orbitron drop-shadow break-words`}
          >
            Ad astra.
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-inter">
            {t('hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap justify-center sm:justify-start gap-4">
            <a
              href="https://github.com/R1S-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 sm:w-16 sm:h-16 p-4 sm:p-5 rounded-xl transition hover:scale-110 border"
              style={{
                color: accentColor,
                borderColor: `${accentColor}44`,
                backgroundColor: `${accentColor}11`,
              }}
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>

            <a
              href="mailto:jankoovicbooris@gmail.com"
              className="w-14 h-14 sm:w-16 sm:h-16 p-4 sm:p-5 rounded-xl transition hover:scale-110 border"
              style={{
                color: accentColor,
                borderColor: `${accentColor}44`,
                backgroundColor: `${accentColor}11`,
              }}
              aria-label="Email"
            >
              <Mail size={22} />
            </a>

            <a
              href="https://instagram.com/boris.rs"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 sm:w-16 sm:h-16 p-4 sm:p-5 rounded-xl transition hover:scale-110 border"
              style={{
                color: accentColor,
                borderColor: `${accentColor}44`,
                backgroundColor: `${accentColor}11`,
              }}
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm aspect-square flex items-center justify-center">
          <div className={`p-[3px] rounded-2xl bg-gradient-to-br ${accentGradient}`}>
            <img
              src={MaskImage}
              alt="Hero mask"
              className="w-full h-auto object-contain rounded-2xl bg-transparent"
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 sm:hidden flex flex-col items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 0], y: [10, 0, -10] }}
            transition={{
              delay: i * 0.2,
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-6 h-6"
          >
            <ChevronUp size={28} style={{ color: accentColor }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
