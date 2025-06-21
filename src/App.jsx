import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { ThemeContext } from './context/ThemeContext';
import { motion } from 'framer-motion';

export default function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('sr');
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
      {showLoader && <Loader />}

      <Header
        lang={lang}
        toggleLang={toggleLang}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="min-h-screen relative font-inter text-black dark:text-white overflow-x-hidden select-none"
      >
        {/* Pozadina */}
        <div className={`absolute inset-0 -z-10 ${
          darkMode
            ? 'bg-gradient-to-b from-[#0c0c0c] via-[#1a1a1a] to-black'
            : 'bg-gradient-to-br from-white via-blue-50 to-sky-100'
        }`} />

        {/* CONTENT */}
        <Hero lang={lang} />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </motion.div>
    </>
  );
}
