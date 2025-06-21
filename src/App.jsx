import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StarsCanvas from './components/StarsCanvas';
import { ThemeContext } from './context/ThemeContext';
import { motion } from 'framer-motion';

export default function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('sr');
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const toggleLang = () => {
    const newLang = lang === 'sr' ? 'en' : 'sr';
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Header
        lang={lang}
        toggleLang={toggleLang}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
      />

      {/* Pravilno pozicioniran canvas za zvezdice */}
      <StarsCanvas darkMode={darkMode} />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="min-h-screen relative z-10 font-inter text-black dark:text-white select-none overflow-x-hidden"
      >
        {/* Gradient pozadina */}
        <div
          className={`absolute inset-0 -z-10 pointer-events-none ${
            darkMode
              ? 'bg-gradient-to-b from-[#0c0c0c] via-[#1a1a1a] to-black'
              : 'bg-gradient-to-br from-white via-blue-50 to-sky-100'
          }`}
        />

        <Hero lang={lang} />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </motion.div>
    </>
  );
}
