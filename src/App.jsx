import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { scroller } from 'react-scroll';
import { useSwipeable } from 'react-swipeable';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StarsCanvas from './components/StarsCanvas';
import { ThemeContext } from './context/ThemeContext';
import { motion } from 'framer-motion';

const sections = ['hero', 'about', 'projects', 'contact'];

export default function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('sr');
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const toggleLang = () => {
    const newLang = lang === 'sr' ? 'en' : 'sr';
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (index) => {
    if (index < 0 || index >= sections.length || isScrolling) return;

    setIsScrolling(true);
    setActiveIndex(index);
    scroller.scrollTo(sections[index], {
      duration: 700,
      smooth: true,
      offset: -60,
    });

    setTimeout(() => setIsScrolling(false), 800);
  };

  // Global wheel navigation
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 10 && activeIndex < sections.length - 1) {
        scrollToSection(activeIndex + 1);
      } else if (e.deltaY < -10 && activeIndex > 0) {
        scrollToSection(activeIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeIndex, isScrolling]);

  // Swipe navigation (mobile)
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => scrollToSection(activeIndex + 1),
    onSwipedDown: () => scrollToSection(activeIndex - 1),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  // Lock scroll on mobile
  useEffect(() => {
    const lockScroll = () => {
      if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
      } else {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
    };
    lockScroll();
    window.addEventListener('resize', lockScroll);
    return () => window.removeEventListener('resize', lockScroll);
  }, []);

  return (
    <>
      <Header
        lang={lang}
        toggleLang={toggleLang}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
      />
      <StarsCanvas darkMode={darkMode} />

      <motion.div
        {...swipeHandlers}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 font-inter text-black dark:text-white select-none overflow-x-hidden"
      >
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
