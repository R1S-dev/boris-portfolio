import React, { useEffect, useState } from 'react';
import { Moon, Sun, Mail, Github } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

export default function Header({ lang, toggleLang, toggleTheme, darkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const accentColor = darkMode ? '#ef4444' : '#3b82f6';

  return (
    <div className="sticky top-0 z-[999]">
      <motion.header
        initial={false}
        animate={{
          height: scrolled ? '60px' : '80px',
          backgroundColor: darkMode ? '#0d1117dd' : '#ffffffcc',
          boxShadow: scrolled ? '0 6px 20px rgba(0,0,0,0.2)' : 'none',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="w-full backdrop-blur-lg border-b border-neutral-300 dark:border-neutral-800"
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 md:px-8">
          {/* Leva strana - Ime + kontakt */}
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-[1.2rem] md:text-[1.8rem] font-exo font-bold tracking-wide select-none whitespace-nowrap"
              style={{ color: accentColor }}
            >
              Boris Janković
            </motion.h1>

            <div className="hidden sm:flex items-center gap-2 ml-2">
              <a
                href="mailto:jankoovicbooris@gmail.com"
                className="p-2 rounded-full transition hover:bg-opacity-20"
                style={{ color: accentColor, backgroundColor: `${accentColor}22` }}
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://github.com/R1S-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition hover:bg-opacity-20"
                style={{ color: accentColor, backgroundColor: `${accentColor}22` }}
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Desna strana - jezik i tema */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="w-9 h-9 rounded-full transition relative"
              style={{ color: accentColor, backgroundColor: `${accentColor}22` }}
              aria-label="Toggle Language"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={lang}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex items-center justify-center text-lg"
                >
                  {lang === 'sr' ? '🇷🇸' : '🇬🇧'}
                </motion.div>
              </AnimatePresence>
            </button>

            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full transition relative"
              style={{ color: accentColor, backgroundColor: `${accentColor}22` }}
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? 'moon' : 'sun'}
                  initial={{ opacity: 0, rotate: 180, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -180, scale: 0.6 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Linija ispod headera + progress bar */}
        <div className="relative">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ opacity: scrolled ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            style={{
              height: '2px',
              background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
            }}
          />
          <motion.div
            style={{ scaleX: scrollX, backgroundColor: accentColor }}
            className="h-[3px] origin-left absolute top-0 left-0 right-0"
          />
        </div>
      </motion.header>
    </div>
  );
}
