import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import StarsCanvas from './StarsCanvas';
import { ChevronDown, Github, Mail } from 'lucide-react';
import { Link } from 'react-scroll';
import MaskImage from '../assets/mask.png'; // izmeni ako ti je drugačije

export default function Hero() {
  const { t } = useTranslation();
  const { darkMode } = useContext(ThemeContext);

  const accentColor = darkMode ? '#ef4444' : '#3b82f6';
  const accentGradient = darkMode
    ? 'from-red-500 via-red-400 to-rose-500'
    : 'from-blue-500 via-cyan-400 to-sky-500';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <section className="relative w-full min-h-screen -mt-20 flex items-center justify-center px-6 sm:px-10 overflow-hidden">
      <StarsCanvas darkMode={darkMode} />

      {/* Aura pozadina */}
      <div className="absolute top-[50%] left-[50%] w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px] bg-accentLight dark:bg-accentDark opacity-[0.04] z-0" />

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-10 items-center pt-10 sm:pt-20">
        {/* Leva strana */}
        <div className="text-center sm:text-left">
          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${accentGradient} font-orbitron drop-shadow break-words`}
          >
            Ad astra.
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-inter">
            {t('hero.subtitle')}
          </p>

          {/* Dugmići */}
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
          </div>
        </div>

        {/* Desna strana – SAMO BORDER oko slike, bez pozadine */}
        <div className="relative mx-auto w-full max-w-sm aspect-square flex items-center justify-center">
          <div
            className={`p-[3px] rounded-2xl bg-gradient-to-br ${accentGradient}`}
          >
            <img
              src={MaskImage}
              alt="Hero mask"
              className="w-full h-auto object-contain rounded-2xl bg-transparent"
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll dugme - pomereno gore */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-20 z-10"
      >
        <Link to="about" smooth={true} duration={800} offset={-120} className="cursor-pointer">
          <div
            className="w-16 h-16 rounded-full border flex items-center justify-center hover:scale-105 transition"
            style={{
              borderColor: darkMode ? '#555' : '#ccc',
            }}
          >
            <ChevronDown
              className="transition"
              style={{ color: darkMode ? '#aaa' : '#555' }}
              size={28}
            />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
