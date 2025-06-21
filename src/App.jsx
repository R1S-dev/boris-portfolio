import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeContext } from './context/ThemeContext';
import { motion } from 'framer-motion';
import StarsCanvas from './components/StarsCanvas';

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
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen relative font-inter text-black dark:text-white overflow-x-hidden select-none"
    >
      {/* ⭐ DARK / LIGHT MODE BACKGROUND + STARS */}
      {darkMode ? (
        <>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a0a1e] via-[#0f0f28] to-[#000000]" />
          <StarsCanvas darkMode={true} />
        </>
      ) : (
        <>
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-blue-50 to-sky-100" />
          <StarsCanvas darkMode={false} />
        </>
      )}

      {/* CONTENT */}
      <Header
        lang={lang}
        toggleLang={toggleLang}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
      />
      <Hero lang={lang} />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </motion.div>
  );
}
