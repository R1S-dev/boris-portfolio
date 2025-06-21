import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { useSwipeable } from 'react-swipeable';
import { scroller } from 'react-scroll';

export default function About() {
  const { t } = useTranslation();
  const { darkMode } = useContext(ThemeContext);
  const fullText = t('about.text');

  const accentColor = darkMode ? '#ef4444' : '#3b82f6';
  const promptColor = darkMode ? 'text-red-500' : 'text-blue-600';
  const borderColor = darkMode ? 'border-neutral-800' : 'border-neutral-300';
  const textColor = darkMode ? 'text-white' : 'text-black';

  const [displayedText, setDisplayedText] = useState('');
  const [fixedHeight, setFixedHeight] = useState(null);
  const fullTextRef = useRef(null);
  const sectionRef = useRef(null);
  const wheelHandlerRef = useRef(null);

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    if (fullTextRef.current) {
      setFixedHeight(fullTextRef.current.offsetHeight);
    }
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (i > fullText.length) {
          clearInterval(interval);
          setFixedHeight(null);
          return fullText;
        }
        const next = fullText.slice(0, i);
        i++;
        return next;
      });
    }, 8);
    return () => clearInterval(interval);
  }, [fullText, i18n.language]);

  const renderStyledJson = () => {
    const lines = displayedText.split('\n');
    return lines.map((line, index) => {
      const match = line.match(/^(\s*"[^"]*"\s*:\s*)(.*)/);
      if (match) {
        return (
          <div key={index}>
            <span>{match[1]}</span>
            <span style={{ color: accentColor }}>{match[2]}</span>
          </div>
        );
      }
      return <div key={index}>{line}</div>;
    });
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => scroller.scrollTo('projects', { smooth: true, duration: 600, offset: -60 }),
    onSwipedDown: () => scroller.scrollTo('hero', { smooth: true, duration: 600, offset: -60 }),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  useEffect(() => {
    const el = sectionRef.current;

    const handleWheel = (e) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const fullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!fullyVisible) return;

      e.preventDefault();
      if (e.deltaY > 10) {
        scroller.scrollTo('projects', { smooth: true, duration: 600, offset: -60 });
      } else if (e.deltaY < -10) {
        scroller.scrollTo('hero', { smooth: true, duration: 600, offset: -60 });
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
    <section
      id="about"
      ref={sectionRef}
      {...swipeHandlers}
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`w-full rounded-2xl shadow-xl border ${borderColor} overflow-hidden backdrop-blur-sm bg-black/60 p-6 sm:p-8 font-mono`}
      >
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`mb-4 ${promptColor} select-none`}
        >
          {'> cat about.txt'}
        </motion.p>

        <pre
          ref={fullTextRef}
          className="absolute opacity-0 pointer-events-none whitespace-pre-wrap text-sm sm:text-base leading-relaxed"
        >
          {fullText}
        </pre>

        <pre
          className={`whitespace-pre-wrap text-sm sm:text-base ${textColor} leading-relaxed transition-all duration-300`}
          style={fixedHeight ? { minHeight: `${fixedHeight + 40}px` } : {}}
        >
          {renderStyledJson()}
          {displayedText.length === fullText.length && (
            <motion.span style={{ color: accentColor }} className="ml-1 animate-pulse">
              █
            </motion.span>
          )}
        </pre>
      </motion.div>
    </section>
  );
}
